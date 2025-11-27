-- ============================================
-- Script de inicialização do banco de dados
-- Executado automaticamente na primeira vez
-- ============================================

-- Criar extensão para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Tabela: operators (Operadores B2B)
-- ============================================
CREATE TABLE IF NOT EXISTS operators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    api_key VARCHAR(64) UNIQUE NOT NULL,
    api_secret VARCHAR(128) NOT NULL,
    webhook_url VARCHAR(500),
    webhook_secret VARCHAR(128),
    is_active BOOLEAN DEFAULT true,
    balance_callback_url VARCHAR(500),
    debit_callback_url VARCHAR(500),
    credit_callback_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Tabela: game_sessions (Sessões de jogo)
-- ============================================
CREATE TABLE IF NOT EXISTS game_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_token VARCHAR(128) UNIQUE NOT NULL,
    operator_id UUID REFERENCES operators(id),
    player_id VARCHAR(100) NOT NULL,
    player_currency VARCHAR(3) DEFAULT 'BRL',
    game_code VARCHAR(50) NOT NULL,
    -- Saldo é mantido na plataforma do operador
    -- Aqui apenas cache para performance
    cached_balance DECIMAL(18, 2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active', -- active, expired, closed
    ip_address VARCHAR(45),
    user_agent TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '24 hours')
);

-- ============================================
-- Tabela: game_rounds (Rodadas/Spins)
-- ============================================
CREATE TABLE IF NOT EXISTS game_rounds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    round_id VARCHAR(64) UNIQUE NOT NULL, -- ID externo para reconciliação
    session_id UUID REFERENCES game_sessions(id),
    operator_id UUID REFERENCES operators(id),
    player_id VARCHAR(100) NOT NULL,
    game_code VARCHAR(50) NOT NULL,

    -- Valores da aposta
    bet_amount DECIMAL(18, 2) NOT NULL,
    win_amount DECIMAL(18, 2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'BRL',

    -- Estado da rodada
    status VARCHAR(20) DEFAULT 'pending', -- pending, completed, cancelled, error

    -- Detalhes do jogo (para auditoria)
    rng_seed VARCHAR(128), -- Seed usado no RNG
    request_data JSONB, -- Dados da requisição
    result_data JSONB, -- Resultado completo do spin

    -- Símbolos e paylines (para análise)
    grid_symbols JSONB, -- [[1,2,3],[4,5,6],[7,8,9]]
    winning_lines JSONB, -- [{line: 1, symbols: [1,1,1], payout: 10}]

    -- Free spins
    is_free_spin BOOLEAN DEFAULT false,
    free_spins_remaining INT DEFAULT 0,
    free_spins_total_win DECIMAL(18, 2) DEFAULT 0,
    parent_round_id UUID REFERENCES game_rounds(id), -- Rodada que originou free spins

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,

    -- Webhook status
    debit_webhook_sent BOOLEAN DEFAULT false,
    credit_webhook_sent BOOLEAN DEFAULT false,
    webhook_errors JSONB DEFAULT '[]'
);

-- ============================================
-- Tabela: transactions (Transações financeiras)
-- ============================================
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id VARCHAR(64) UNIQUE NOT NULL, -- ID externo
    round_id UUID REFERENCES game_rounds(id),
    session_id UUID REFERENCES game_sessions(id),
    operator_id UUID REFERENCES operators(id),
    player_id VARCHAR(100) NOT NULL,

    type VARCHAR(20) NOT NULL, -- debit, credit, refund
    amount DECIMAL(18, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'BRL',

    -- Status do webhook
    status VARCHAR(20) DEFAULT 'pending', -- pending, success, failed, timeout
    webhook_url VARCHAR(500),
    webhook_response JSONB,
    webhook_attempts INT DEFAULT 0,
    last_webhook_attempt TIMESTAMP WITH TIME ZONE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- Tabela: rng_audit (Auditoria de RNG)
-- ============================================
CREATE TABLE IF NOT EXISTS rng_audit (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    round_id UUID REFERENCES game_rounds(id),
    seed VARCHAR(128) NOT NULL,
    sequence_index INT NOT NULL, -- Posição na sequência
    random_values JSONB NOT NULL, -- Array de valores gerados
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Índices para performance
-- ============================================

-- game_sessions
CREATE INDEX IF NOT EXISTS idx_sessions_token ON game_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_sessions_player ON game_sessions(player_id);
CREATE INDEX IF NOT EXISTS idx_sessions_operator ON game_sessions(operator_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON game_sessions(status);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON game_sessions(expires_at);

-- game_rounds
CREATE INDEX IF NOT EXISTS idx_rounds_session ON game_rounds(session_id);
CREATE INDEX IF NOT EXISTS idx_rounds_player ON game_rounds(player_id);
CREATE INDEX IF NOT EXISTS idx_rounds_operator ON game_rounds(operator_id);
CREATE INDEX IF NOT EXISTS idx_rounds_game ON game_rounds(game_code);
CREATE INDEX IF NOT EXISTS idx_rounds_created ON game_rounds(created_at);
CREATE INDEX IF NOT EXISTS idx_rounds_status ON game_rounds(status);
CREATE INDEX IF NOT EXISTS idx_rounds_round_id ON game_rounds(round_id);

-- transactions
CREATE INDEX IF NOT EXISTS idx_transactions_round ON transactions(round_id);
CREATE INDEX IF NOT EXISTS idx_transactions_player ON transactions(player_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);

-- ============================================
-- Funções auxiliares
-- ============================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_operators_updated_at
    BEFORE UPDATE ON operators
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
    BEFORE UPDATE ON game_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Dados iniciais para desenvolvimento
-- ============================================

-- Operador de teste (para desenvolvimento)
INSERT INTO operators (name, api_key, api_secret, webhook_url, is_active)
VALUES (
    'Test Operator',
    'test_api_key_12345',
    'test_api_secret_67890',
    'http://localhost:8000/api/webhook/game',
    true
) ON CONFLICT (api_key) DO NOTHING;

-- ============================================
-- Views úteis
-- ============================================

-- View: Resumo de rodadas por jogador
CREATE OR REPLACE VIEW player_stats AS
SELECT
    player_id,
    game_code,
    COUNT(*) as total_rounds,
    SUM(bet_amount) as total_bet,
    SUM(win_amount) as total_win,
    SUM(win_amount) - SUM(bet_amount) as net_result,
    CASE
        WHEN SUM(bet_amount) > 0
        THEN (SUM(win_amount) / SUM(bet_amount)) * 100
        ELSE 0
    END as rtp_actual,
    MAX(created_at) as last_played
FROM game_rounds
WHERE status = 'completed'
GROUP BY player_id, game_code;

-- View: Métricas por operador
CREATE OR REPLACE VIEW operator_metrics AS
SELECT
    o.id as operator_id,
    o.name as operator_name,
    COUNT(DISTINCT gs.player_id) as unique_players,
    COUNT(gr.id) as total_rounds,
    COALESCE(SUM(gr.bet_amount), 0) as total_bets,
    COALESCE(SUM(gr.win_amount), 0) as total_wins,
    COALESCE(SUM(gr.bet_amount) - SUM(gr.win_amount), 0) as gross_revenue
FROM operators o
LEFT JOIN game_sessions gs ON o.id = gs.operator_id
LEFT JOIN game_rounds gr ON gs.id = gr.session_id AND gr.status = 'completed'
GROUP BY o.id, o.name;

COMMENT ON TABLE operators IS 'Operadores B2B que integram com o Game Provider';
COMMENT ON TABLE game_sessions IS 'Sessões de jogo dos jogadores';
COMMENT ON TABLE game_rounds IS 'Cada spin/rodada individual';
COMMENT ON TABLE transactions IS 'Transações financeiras (debit/credit)';
COMMENT ON TABLE rng_audit IS 'Auditoria de geração de números aleatórios';
