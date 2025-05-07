<?php
// Include database and product model using absolute paths
$base_path = dirname(dirname(__FILE__));
include_once $base_path . '/config/database.php';
include_once $base_path . '/models/Product.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->getConnection();

// Debug output
echo "Database connection: " . ($db ? "SUCCESS" : "FAILED") . "\n";

// Check if database file exists
$dbFile = $base_path . '/data/products.sqlite';
echo "Database file exists: " . (file_exists($dbFile) ? "YES" : "NO") . "\n";
echo "Database file path: " . $dbFile . "\n";

// Clear existing products
if ($db) {
    $db->exec("DELETE FROM products");
    echo "Deleted existing products\n";
    
    // For debugging, let's make sure the table exists
    $checkTable = $db->query("SELECT name FROM sqlite_master WHERE type='table' AND name='products'");
    if ($checkTable->fetch()) {
        echo "Products table exists\n";
    } else {
        echo "Products table does not exist!\n";
    }

    // Initialize with product data
    $productDatabase = [
        [
            'id' => '1', 
            'name' => 'Red Runner', 
            'price' => 129.99,
            'modelPath' => '/shoe1.glb',
            'color' => 'red',
            'availableColors' => ['red', 'blue', 'black'],
            'category' => 'running',
            'description' => 'Premium comfort with stylish design. Made with the highest quality materials for durability and performance. Features advanced cushioning for all-day comfort.',
            'features' => [
                'Breathable mesh upper',
                'Responsive cushioning',
                'Durable rubber outsole',
                'Reflective details for visibility',
                'Antimicrobial lining'
            ],
            'rating' => 4.8,
            'reviews' => 124,
            'inStock' => true,
            'date' => '2025-01-15'
        ],
        [
            'id' => '2', 
            'name' => 'Blue Sprinter', 
            'price' => 149.99,
            'modelPath' => '/shoe2.glb',
            'color' => 'blue',
            'availableColors' => ['blue', 'black', 'green'],
            'category' => 'running',
            'description' => 'Lightweight performance for every step. Designed for serious runners who demand the best in comfort and responsiveness.',
            'features' => [
                'Ultralight knit construction',
                'Carbon fiber plate for energy return',
                'Heel stabilizer technology',
                'High-traction outsole pattern',
                'Sweat-wicking inner lining'
            ],
            'rating' => 4.9,
            'reviews' => 86,
            'inStock' => true,
            'date' => '2025-02-10',
            'shoeScale' => 0.125
        ],
        [
            'id' => '3', 
            'name' => 'Green Trail', 
            'price' => 169.99,
            'modelPath' => '/shoe3.glb',
            'color' => 'green',
            'availableColors' => ['green', 'black', 'red'],
            'category' => 'hiking',
            'description' => 'Durable design for all terrain adventures. Waterproof and rugged.',
            'features' => [
                'Waterproof membrane',
                'Aggressive tread pattern',
                'Ankle support system',
                'Reinforced toe cap',
                'Quick-lace system'
            ],
            'rating' => 4.7,
            'reviews' => 59,
            'inStock' => true,
            'date' => '2025-03-01'
        ]
    ];

    // Insert products
    $product = new Product($db);
    $success = 0;

    foreach($productDatabase as $productData) {
        // Set product properties
        $product->id = $productData['id'];
        $product->name = $productData['name'];
        $product->price = $productData['price'];
        $product->modelPath = $productData['modelPath'];
        $product->color = $productData['color'];
        $product->availableColors = $productData['availableColors'];
        $product->category = $productData['category'];
        $product->description = $productData['description'];
        $product->features = $productData['features'];
        $product->rating = $productData['rating'];
        $product->reviews = $productData['reviews'];
        $product->inStock = $productData['inStock'];
        $product->date = $productData['date'];
        
        // Add shoeScale if it exists
        if (isset($productData['shoeScale'])) {
            $product->shoeScale = $productData['shoeScale'];
        } else {
            $product->shoeScale = null;
        }
        
        // Create product
        if($product->create()) {
            $success++;
            echo "Added product: {$productData['name']}\n";
        } else {
            echo "Failed to add product: {$productData['name']}\n";
        }
    }

    echo "Database initialized with $success products\n";
    
    // Debug: Verify products were added
    $stmt = $db->query("SELECT COUNT(*) as count FROM products");
    if ($stmt) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        echo "Products count in database: {$row['count']}\n";
    } else {
        echo "Failed to count products\n";
    }
} else {
    echo "Failed to connect to the database. Check if SQLite PDO driver is enabled.";
}
?>