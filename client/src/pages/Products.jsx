import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import ProductCard from '../components/ProductCard/ProductCard';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Products = () => {
  // State for filters and products
  const [filters, setFilters] = useState({
    category: 'all',
    color: 'all',
    price: 'all',
    sortBy: 'newest'
  });
  
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [data, setData] = useState([]);

  const fetchproducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products/read.php');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  
  // Initialize with dummy product data
  useEffect(() => {
    const products = [
      { 
        id: 1, 
        name: 'Red Runner', 
        price: 129.99, 
        modelPath: '/shoe1.glb', // Use the same model path
        color: 'red',
        category: 'running',
        description: 'Premium comfort with stylish design',
        date: '2025-01-15',
        shoeScale: 1.3
      },
      { 
        id: 2, 
        name: 'Blue Sprinter', 
        price: 149.99, 
        modelPath: '/shoe2.glb',
        color: 'blue',
        category: 'running',
        description: 'Lightweight performance for every step',
        date: '2025-02-10',
        shoeScale: 0.125
      },
      { 
        id: 3, 
        name: 'Green Trail', 
        price: 169.99, 
        modelPath: '/shoe3.glb',
        color: 'green',
        category: 'hiking',
        description: 'Durable design for all terrain adventures',
        date: '2025-03-05',
        shoeScale: 1.3
      }
    ];
    
    setAllProducts(products);
    setFilteredProducts(products);
    
    window.scrollTo(0, 0);
  }, []);
  
  // Filter and sort products when filters change
  useEffect(() => {
    let result = [...allProducts];
    
    // Apply category filter
    if (filters.category !== 'all') {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Apply color filter
    if (filters.color !== 'all') {
      result = result.filter(product => product.color === filters.color);
    }
    
    // Apply price filter
    if (filters.price !== 'all') {
      switch (filters.price) {
        case 'under-100':
          result = result.filter(product => product.price < 100);
          break;
        case '100-150':
          result = result.filter(product => product.price >= 100 && product.price <= 150);
          break;
        case 'over-150':
          result = result.filter(product => product.price > 150);
          break;
        default:
          break;
      }
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [filters, allProducts]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-40">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Collection
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-100 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our premium selection of 3D-designed shoes, crafted for style and performance
          </motion.p>
        </div>
      </section>
      
      {/* Filter and Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Filters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="running">Running</option>
                  <option value="hiking">Hiking</option>
                  <option value="casual">Casual</option>
                </select>
              </div>
              
              {/* Color Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <select
                  name="color"
                  value={filters.color}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Colors</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="black">Black</option>
                  <option value="brown">Brown</option>
                  <option value="silver">Silver</option>
                </select>
              </div>
              
              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <select
                  name="price"
                  value={filters.price}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Prices</option>
                  <option value="under-100">Under $100</option>
                  <option value="100-150">$100 - $150</option>
                  <option value="over-150">Over $150</option>
                </select>
              </div>
              
              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </motion.div>
          
          {/* Product Grid */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              {filteredProducts.length} Products
            </h3>
          </div>
          
          {filteredProducts.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              // initial="hidden"
              animate="visible"
            >
              {filteredProducts.map(data => (
                <ProductCard key={data.id} product={data} variants={fadeIn} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-16 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl">No products match your current filters.</p>
              <button 
                onClick={() => setFilters({
                  category: 'all',
                  color: 'all',
                  price: 'all',
                  sortBy: 'newest'
                })}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
      
    </div>
  );
};

export default Products;