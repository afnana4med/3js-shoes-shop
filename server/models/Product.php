<?php
class Product {
    private $conn;
    private $table_name = "products";

    public $id;
    public $name;
    public $price;
    public $modelPath;
    public $color;
    public $availableColors;
    public $category;
    public $description;
    public $features;
    public $rating;
    public $reviews;
    public $inStock;
    public $date;
    public $shoeScale;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all products
    public function getProducts() {
        try {
            // Since we've verified the table exists and has data, let's simplify this method
            // and use a direct query to fetch all products
            $query = "SELECT * FROM " . $this->table_name;
            
            // Use direct query execution instead of prepare for simpler approach
            $stmt = $this->conn->query($query);
            
            if ($stmt === false) {
                error_log("Query execution failed in getProducts()");
                return false;
            }
            
            return $stmt;
        } catch (PDOException $e) {
            error_log("PDO Exception in getProducts(): " . $e->getMessage());
            return false;
        }
    }

    // Get single product
    public function getSingleProduct() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if($row) {
            $this->name = $row['name'];
            $this->price = $row['price'];
            $this->modelPath = $row['modelPath'];
            $this->color = $row['color'];
            $this->availableColors = json_decode($row['availableColors']);
            $this->category = $row['category'];
            $this->description = $row['description'];
            $this->features = json_decode($row['features']);
            $this->rating = $row['rating'];
            $this->reviews = $row['reviews'];
            $this->inStock = (bool) $row['inStock'];
            $this->date = $row['date'];
            $this->shoeScale = $row['shoeScale'];
            return true;
        }
        
        return false;
    }

    // Create product
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
            (id, name, price, modelPath, color, availableColors, category, description, features, rating, reviews, inStock, date, shoeScale) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $this->conn->prepare($query);

        // Convert arrays to JSON strings for storage
        $availableColorsJson = json_encode($this->availableColors);
        $featuresJson = json_encode($this->features);
        $inStockValue = $this->inStock ? 1 : 0;

        // Bind values
        $stmt->bindParam(1, $this->id);
        $stmt->bindParam(2, $this->name);
        $stmt->bindParam(3, $this->price);
        $stmt->bindParam(4, $this->modelPath);
        $stmt->bindParam(5, $this->color);
        $stmt->bindParam(6, $availableColorsJson);
        $stmt->bindParam(7, $this->category);
        $stmt->bindParam(8, $this->description);
        $stmt->bindParam(9, $featuresJson);
        $stmt->bindParam(10, $this->rating);
        $stmt->bindParam(11, $this->reviews);
        $stmt->bindParam(12, $inStockValue);
        $stmt->bindParam(13, $this->date);
        $stmt->bindParam(14, $this->shoeScale);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>