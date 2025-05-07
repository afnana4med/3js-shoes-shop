<?php
// Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Include database and product model using absolute paths
$base_path = dirname(dirname(dirname(__FILE__)));
include_once $base_path . '/config/database.php';
include_once $base_path . '/models/Product.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->getConnection();

// Instantiate product object
$product = new Product($db);

// Get ID from URL
$product->id = isset($_GET['id']) ? $_GET['id'] : die();

// Get product
if($product->getSingleProduct()) {
    // Create array
    $product_arr = array(
        'id' => $product->id,
        'name' => $product->name,
        'price' => (float)$product->price,
        'modelPath' => $product->modelPath,
        'color' => $product->color,
        'availableColors' => $product->availableColors,
        'category' => $product->category,
        'description' => $product->description,
        'features' => $product->features,
        'rating' => (float)$product->rating,
        'reviews' => (int)$product->reviews,
        'inStock' => $product->inStock,
        'date' => $product->date
    );
    
    // Add shoeScale if it exists
    if(isset($product->shoeScale)) {
        $product_arr['shoeScale'] = (float)$product->shoeScale;
    }
    
    // Set response code - 200 OK
    http_response_code(200);
    
    // Make JSON
    echo json_encode($product_arr);
} else {
    // Set response code - 404 Not found
    http_response_code(404);
    
    // Tell the user product does not exist
    echo json_encode(array('message' => 'Product not found.'));
}
?>