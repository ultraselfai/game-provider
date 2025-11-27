-- Schema do banco de dados do lado do OPERADOR
-- Para integração com Game Provider

-- Tabela de jogadores
CREATE TABLE players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    external_id VARCHAR(255) NOT NULL UNIQUE COMMENT 'ID usado na integração',
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(3) NOT NULL DEFAULT 'BRL',
    status ENUM('active', 'blocked', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_external_id (external_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de transações com o Game Provider
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    external_id VARCHAR(255) NOT NULL UNIQUE COMMENT 'ID da transação do Game Provider',
    player_id INT NOT NULL,
    type ENUM('debit', 'credit', 'refund') NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    balance_before DECIMAL(15, 2) NOT NULL,
    balance_after DECIMAL(15, 2) NOT NULL,
    game_code VARCHAR(100) NOT NULL,
    round_id VARCHAR(255) NULL,
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (player_id) REFERENCES players(id),
    INDEX idx_external_id (external_id),
    INDEX idx_player_id (player_id),
    INDEX idx_type (type),
    INDEX idx_game_code (game_code),
    INDEX idx_round_id (round_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- View para relatório de GGR por jogo
CREATE VIEW game_ggr AS
SELECT 
    game_code,
    DATE(created_at) as date,
    SUM(CASE WHEN type = 'debit' THEN amount ELSE 0 END) as total_bets,
    SUM(CASE WHEN type = 'credit' THEN amount ELSE 0 END) as total_wins,
    SUM(CASE WHEN type = 'debit' THEN amount ELSE 0 END) - 
    SUM(CASE WHEN type = 'credit' THEN amount ELSE 0 END) as ggr,
    COUNT(DISTINCT round_id) as rounds,
    COUNT(DISTINCT player_id) as unique_players
FROM transactions
WHERE status = 'completed'
GROUP BY game_code, DATE(created_at);

-- View para relatório de jogadores
CREATE VIEW player_stats AS
SELECT 
    p.id,
    p.external_id,
    p.name,
    p.balance,
    COUNT(DISTINCT t.round_id) as total_rounds,
    SUM(CASE WHEN t.type = 'debit' THEN t.amount ELSE 0 END) as total_bet,
    SUM(CASE WHEN t.type = 'credit' THEN t.amount ELSE 0 END) as total_won,
    MAX(t.created_at) as last_activity
FROM players p
LEFT JOIN transactions t ON p.id = t.player_id
GROUP BY p.id;

-- Exemplo: Inserir jogador de teste
INSERT INTO players (external_id, email, name, balance, currency)
VALUES ('player-123', 'jogador@teste.com', 'Jogador Teste', 1000.00, 'BRL');

-- Exemplo: Consultar GGR dos últimos 7 dias
SELECT * FROM game_ggr 
WHERE date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
ORDER BY date DESC, game_code;
