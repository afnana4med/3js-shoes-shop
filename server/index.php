<?php
// Set headers to allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Just return headers for OPTIONS request
    exit(0);
}

// Simple API router
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = rtrim($path, '/');

// For debugging purposes, let's print which path is being requested
// echo "Requested Path: " . $path . "\n";

// Check for DB initialization
if ($path === '/init') {
    include_once './data/init.php';
    exit(0);
} 

// Handle direct API access
if ($path === '/api/products/read.php') {
    include_once './api/products/read.php';
    exit(0);
}

if ($path === '/api/products/read_single.php') {
    include_once './api/products/read_single.php';
    exit(0);
}

// Simple endpoint to test if API is working
if ($path === '/api/status') {
    echo json_encode(['status' => 'API is working', 'time' => date('Y-m-d H:i:s')]);
    exit(0);
}

// If no specific routes matched, show welcome message
echo json_encode([
    'message' => 'Welcome to the Shoe Shop API',
    'endpoints' => [
        '/api/products/read.php' => 'Get all products',
        '/api/products/read_single.php?id={id}' => 'Get a single product by ID',
        '/init' => 'Initialize the database with sample products'
    ]
]);
?>