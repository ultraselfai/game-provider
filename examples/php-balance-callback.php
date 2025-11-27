<?php
/**
 * Game Provider - Balance Callback
 * 
 * Endpoint para consulta de saldo do jogador
 */

// Configuração
define('DB_HOST', 'localhost');
define('DB_NAME', 'minha_plataforma');
define('DB_USER', 'root');
define('DB_PASS', '');

// Headers
header('Content-Type: application/json');

// Ler payload
$payload = json_decode(file_get_contents('php://input'), true);

if (!$payload || !isset($payload['playerId'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing playerId'
    ]);
    exit;
}

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
    echo json_encode([
        'success' => false,
        'error' => 'Database error'
    ]);
    exit;
}

// Buscar saldo do jogador
$stmt = $pdo->prepare('SELECT balance FROM players WHERE external_id = ?');
$stmt->execute([$payload['playerId']]);
$player = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$player) {
    http_response_code(404);
    echo json_encode([
        'success' => false,
        'error' => 'Player not found'
    ]);
    exit;
}

// Retornar saldo
echo json_encode([
    'success' => true,
    'credit' => (float) $player['balance']
]);
