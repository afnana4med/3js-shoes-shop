<?php
// Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Include database and product model using absolute paths
$base_path = dirname(dirname(dirname(__FILE__)));
include_once $base_path . '/config/database.php';
include_once $base_path . '/models/Product.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->getConnection();

// Check if database connection was successful
if (!$db) {
    http_response_code(500);
    echo json_encode(['message' => 'Database connection failed']);
    exit;
}

// Instantiate product object
$product = new Product($db);

// Product query
$stmt = $product->getProducts();

// Check if query was successful
if ($stmt === false) {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to retrieve products']);
    exit;
}

// Get all rows directly without relying on rowCount()
$products_arr = array();
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    
    $product_item = array(
        'id' => $id,
        'name' => $name,
        'price' => (float)$price,
        'modelPath' => $modelPath,
        'color' => $color,
        'availableColors' => json_decode($availableColors),
        'category' => $category,
        'description' => $description,
        'features' => json_decode($features),
        'rating' => (float)$rating,
        'reviews' => (int)$reviews,
        'inStock' => (bool)(int)$inStock,
        'date' => $date
    );

    // Add shoeScale if it exists
    if(isset($shoeScale)) {
        $product_item['shoeScale'] = (float)$shoeScale;
    }
    
    array_push($products_arr, $product_item);
}

// Check if any products were found
if(!empty($products_arr)) {
    // Set response code - 200 OK
    http_response_code(200);
    
    // Turn to JSON & output
    echo json_encode($products_arr);
} else {
    // Set response code - 404 Not found
    http_response_code(404);
    
    // Tell the user no products found
    echo json_encode(
        array('message' => 'No products found')
    );
}
?>