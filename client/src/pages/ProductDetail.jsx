import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import ShoeScene from '../components/ShoeModel/ShoeScene';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  // Color mapping for our 3D model
  const colorMap = {
    'red': '#FF4040',
    'blue': '#4040FF',
    'green': '#40A040',
    'black': '#202020',
    'purple': '#8040FF'
  };
  
  const availableSizes = [7, 8, 9, 10, 11, 12];
  
  // Fetch product data
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // In a real app, you would use fetch() or axios to get data from an API
    // For this prototype, we'll simulate API fetching
    const fetchProductData = async () => {
      try {
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock product database
        const productDatabase = [
          { 
            id: '1', 
            name: 'Red Runner', 
            price: 129.99,
            modelPath: '/shoe1.glb',
            color: 'red',
            availableColors: ['red', 'blue', 'black'],
            category: 'running',
            description: 'Premium comfort with stylish design. Made with the highest quality materials for durability and performance. Features advanced cushioning for all-day comfort.',
            features: [
              'Breathable mesh upper',
              'Responsive cushioning',
              'Durable rubber outsole',
              'Reflective details for visibility',
              'Antimicrobial lining'
            ],
            rating: 4.8,
            reviews: 124,
            inStock: true,
            date: '2025-01-15'
          },
          { 
            id: '2', 
            name: 'Blue Sprinter', 
            price: 149.99,
            modelPath: '/shoe2.glb',
            color: 'blue',
            availableColors: ['blue', 'black', 'green'],
            category: 'running',
            description: 'Lightweight performance for every step. Designed for serious runners who demand the best in comfort and responsiveness.',
            features: [
              'Ultralight knit construction',
              'Carbon fiber plate for energy return',
              'Heel stabilizer technology',
              'High-traction outsole pattern',
              'Sweat-wicking inner lining'
            ],
            rating: 4.9,
            reviews: 86,
            inStock: true,
            date: '2025-02-10',
            shoeScale: 0.125
          },
          { 
            id: '3', 
            name: 'Green Trail', 
            price: 169.99,
            modelPath: '/shoe3.glb',
            color: 'green',
            availableColors: ['green', 'black', 'red'],
            category: 'hiking',
            description: 'Durable design for all terrain adventures. Waterproof and rugged.',
            features: [
              'Waterproof membrane',
              'Aggressive tread pattern',
              'Ankle support system',
              'Reinforced toe cap',
              'Quick-lace system'
            ],
            rating: 4.7,
            reviews: 59,
            inStock: true,
            date: '2025-03-01'

          }
        ];
        
        const foundProduct = productDatabase.find(p => p.id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedColor(foundProduct.color);
          setSelectedSize(availableSizes[2]); // Default to middle size
        } else {
          setError('Product not found');
          // Redirect to products page after a delay if product not found
          setTimeout(() => navigate('/products'), 2000);
        }
        
      } catch (err) {
        setError('Error loading product data');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductData();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleAddToCart = () => {
    // In a real app, this would dispatch to a cart context/reducer
    alert(`Added to cart: ${product.name} - Color: ${selectedColor}, Size: ${selectedSize}, Quantity: ${quantity}`);
  };
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-6">😕</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{error}</h1>
            <p className="text-gray-600 mb-8">Redirecting you to our products page...</p>
            <Link 
              to="/products"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-40 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Breadcrumb navigation */}
          <div className="mb-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <Link to="/products" className="text-gray-600 hover:text-blue-600">Products</Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-500">{product.name}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          {/* Product Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product 3D Model */}
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-lg h-[500px]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50">
                <ShoeScene 
                  color={colorMap[selectedColor] || '#ffffff'}
                  showControls={true}
                  modelPath={product.modelPath}
                  shoePosition={[0, -0.2, 0]}
                  shoeRotation={[0, 0, 0]}
                  shoeScale={product.shoeScale || 1.3}
                />
              </div>
            </motion.div>
            
            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                </div>
                
                {/* Price */}
                <div className="text-2xl font-bold text-blue-600 mb-6">
                  ${product.price.toFixed(2)}
                </div>
                
                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2 text-gray-800">Description</h2>
                  <p className="text-gray-600">{product.description}</p>
                </div>
                
                {/* Features */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2 text-gray-800">Features</h2>
                  <ul className="list-disc pl-5 text-gray-600">
                    {product.features.map((feature, index) => (
                      <li key={index} className="mb-1">{feature}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Color Selection */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2 text-gray-800">Color</h2>
                  <div className="flex space-x-3">
                    {product.availableColors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-300'}`}
                        style={{
                          backgroundColor: colorMap[color] || color,
                          cursor: 'pointer'
                        }}
                        aria-label={`Select ${color} color`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Size Selection */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2 text-gray-800">Size</h2>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                          selectedSize === size 
                            ? 'border-blue-600 bg-blue-50 text-blue-600 font-medium' 
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-2 text-gray-800">Quantity</h2>
                  <div className="flex items-center">
                    <button
                      onClick={decrementQuantity}
                      className="w-10 h-10 bg-gray-100 rounded-l-md flex items-center justify-center border border-gray-300 hover:bg-gray-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="w-10 h-10 bg-gray-100 rounded-r-md flex items-center justify-center border border-gray-300 hover:bg-gray-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </motion.button>
                  <motion.button
                    className="flex-1 border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Save for Later
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Related Products */}
        </div>
      </div>
      
    </div>
  );
};

export default ProductDetail;