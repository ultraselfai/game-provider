<?php
/**
 * Game Provider - Webhook Handler
 * 
 * Exemplo de implementação do webhook no lado do operador
 */

// Configuração
define('WEBHOOK_SECRET', 'seu-webhook-secret-aqui');
define('DB_HOST', 'localhost');
define('DB_NAME', 'minha_plataforma');
define('DB_USER', 'root');
define('DB_PASS', '');

// Headers
header('Content-Type: application/json');

// Validar secret
$secret = $_SERVER['HTTP_X_WEBHOOK_SECRET'] ?? '';
if ($secret !== WEBHOOK_SECRET) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid webhook secret']);
    exit;
}

// Ler payload
$payload = json_decode(file_get_contents('php://input'), true);

if (!$payload) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload']);
    exit;
}

// Log para debug
error_log('Webhook received: ' . json_encode($payload));

// Conectar ao banco
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Verificar idempotência (transação já processada?)
$stmt = $pdo->prepare('SELECT id, balance_after FROM transactions WHERE external_id = ?');
$stmt->execute([$payload['transactionId']]);
$existing = $stmt->fetch(PDO::FETCH_ASSOC);

if ($existing) {
    // Retornar mesma resposta (idempotência)
    echo json_encode([
        'success' => true,
        'transactionId' => $existing['id'],
        'balance' => (float) $existing['balance_after']
    ]);
    exit;
}

// Processar por tipo
switch ($payload['type']) {
    case 'DEBIT':
        handleDebit($pdo, $payload);
        break;
    
    case 'CREDIT':
        handleCredit($pdo, $payload);
        break;
    
    case 'REFUND':
        handleRefund($pdo, $payload);
        break;
    
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Unknown transaction type']);
        exit;
}

/**
 * Processa DEBIT (aposta)
 */
function handleDebit(PDO $pdo, array $payload): void
{
    $playerId = $payload['playerId'];
    $amount = (float) $payload['amount'];
    
    // Iniciar transação
    $pdo->beginTransaction();
    
    try {
        // Buscar jogador com lock
        $stmt = $pdo->prepare('SELECT id, balance FROM players WHERE external_id = ? FOR UPDATE');
        $stmt->execute([$playerId]);
        $player = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$player) {
            $pdo->rollBack();
            http_response_code(404);
            echo json_encode(['error' => 'Player not found', 'success' => false]);
            exit;
        }
        
        $currentBalance = (float) $player['balance'];
        
        // Verificar saldo
        if ($currentBalance < $amount) {
            $pdo->rollBack();
            echo json_encode([
                'success' => false,
                'error' => 'INSUFFICIENT_FUNDS',
                'balance' => $currentBalance
            ]);
            exit;
        }
        
        // Debitar saldo
        $newBalance = $currentBalance - $amount;
        $stmt = $pdo->prepare('UPDATE players SET balance = ? WHERE id = ?');
        $stmt->execute([$newBalance, $player['id']]);
        
        // Registrar transação
        $stmt = $pdo->prepare('
            INSERT INTO transactions 
            (external_id, player_id, type, amount, balance_before, balance_after, game_code, round_id, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        ');
        $stmt->execute([
            $payload['transactionId'],
            $player['id'],
            'debit',
            $amount,
            $currentBalance,
            $newBalance,
            $payload['gameCode'],
            $payload['roundId']
        ]);
        
        $txId = $pdo->lastInsertId();
        
        $pdo->commit();
        
        echo json_encode([
            'success' => true,
            'transactionId' => $txId,
            'balance' => $newBalance
        ]);
        
    } catch (Exception $e) {
        $pdo->rollBack();
        error_log('Debit error: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Internal error', 'success' => false]);
    }
}

/**
 * Processa CREDIT (ganho)
 */
function handleCredit(PDO $pdo, array $payload): void
{
    $playerId = $payload['playerId'];
    $amount = (float) $payload['amount'];
    
    $pdo->beginTransaction();
    
    try {
        // Buscar jogador
        $stmt = $pdo->prepare('SELECT id, balance FROM players WHERE external_id = ? FOR UPDATE');
        $stmt->execute([$playerId]);
        $player = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$player) {
            $pdo->rollBack();
            http_response_code(404);
            echo json_encode(['error' => 'Player not found', 'success' => false]);
            exit;
        }
        
        $currentBalance = (float) $player['balance'];
        $newBalance = $currentBalance + $amount;
        
        // Creditar saldo
        $stmt = $pdo->prepare('UPDATE players SET balance = ? WHERE id = ?');
        $stmt->execute([$newBalance, $player['id']]);
        
        // Registrar transação
        $stmt = $pdo->prepare('
            INSERT INTO transactions 
            (external_id, player_id, type, amount, balance_before, balance_after, game_code, round_id, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        ');
        $stmt->execute([
            $payload['transactionId'],
            $player['id'],
            'credit',
            $amount,
            $currentBalance,
            $newBalance,
            $payload['gameCode'],
            $payload['roundId']
        ]);
        
        $txId = $pdo->lastInsertId();
        
        $pdo->commit();
        
        echo json_encode([
            'success' => true,
            'transactionId' => $txId,
            'balance' => $newBalance
        ]);
        
    } catch (Exception $e) {
        $pdo->rollBack();
        error_log('Credit error: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Internal error', 'success' => false]);
    }
}

/**
 * Processa REFUND (estorno)
 */
function handleRefund(PDO $pdo, array $payload): void
{
    // Similar ao CREDIT - adiciona o valor de volta
    handleCredit($pdo, $payload);
}
