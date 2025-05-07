<?php
class Database {
    private $db_file;
    private $conn;

    public function __construct() {
        // Use absolute path for SQLite database to ensure consistency
        $this->db_file = realpath(dirname(__DIR__) . '/data/products.sqlite');
        if (!$this->db_file) {
            // If database doesn't exist, create the directory and set the path
            $dir = dirname(__DIR__) . '/data';
            if (!is_dir($dir)) {
                mkdir($dir, 0777, true);
            }
            $this->db_file = dirname(__DIR__) . '/data/products.sqlite';
        }
        $this->connect();
    }

    private function connect() {
        try {
            // Check if PDO SQLite driver is available
            if (!in_array('sqlite', PDO::getAvailableDrivers())) {
                throw new Exception("SQLite PDO driver is not enabled. Please enable the pdo_sqlite extension in your PHP configuration.");
            }
            
            // Use a stricter connection string to ensure the database is created if it doesn't exist
            $this->conn = new PDO("sqlite:" . $this->db_file);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            $this->initializeDatabase();
        } catch(PDOException $e) {
            echo "Connection Error: " . $e->getMessage();
            $this->conn = null;
        } catch(Exception $e) {
            echo "Error: " . $e->getMessage();
            $this->conn = null;
        }
    }

    private function initializeDatabase() {
        // Create products table if it doesn't exist
        $query = "CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            modelPath TEXT NOT NULL,
            color TEXT NOT NULL,
            availableColors TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT NOT NULL,
            features TEXT NOT NULL,
            rating REAL NOT NULL,
            reviews INTEGER NOT NULL,
            inStock INTEGER NOT NULL,
            date TEXT NOT NULL,
            shoeScale REAL
        )";
        
        $this->conn->exec($query);
    }

    public function getConnection() {
        return $this->conn;
    }
}
?>