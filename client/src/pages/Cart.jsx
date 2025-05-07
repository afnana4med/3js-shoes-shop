import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';

const Cart = () => {
  // Sample cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Red Runner',
      price: 129.99,
      color: 'red',
      size: 9,
      quantity: 1,
      image: '/src/assets/Red_Shoe.glb' // In a real app, this would be an image URL
    },
    {
      id: 2,
      name: 'Blue Sprinter',
      price: 149.99,
      color: 'blue',
      size: 10,
      quantity: 2,
      image: '/src/assets/Red_Shoe.glb' // In a real app, this would be an image URL
    }
  ]);
  
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 12.99,
    tax: 0,
    total: 0
  });

  // Calculate order summary
  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + orderSummary.shipping + tax;
    
    setOrderSummary({
      subtotal,
      shipping: cartItems.length > 0 ? orderSummary.shipping : 0,
      tax,
      total
    });
    
    window.scrollTo(0, 0);
  }, [cartItems]);

  // Update quantity of an item
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove an item from cart
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-36 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                {/* Headers - only on larger screens */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  <div className="md:col-span-6">Product</div>
                  <div className="md:col-span-2 text-center">Price</div>
                  <div className="md:col-span-2 text-center">Quantity</div>
                  <div className="md:col-span-2 text-center">Total</div>
                </div>
                
                {/* Cart Items List */}
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
                    >
                      <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Product image and info */}
                        <div className="md:col-span-6 flex items-center space-x-4">
                          <div className="bg-gray-100 rounded-md w-20 h-20 flex-shrink-0 flex items-center justify-center">
                            {/* This would be a product image in a real app */}
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: item.color }}></div>
                          </div>
                          <div>
                            <Link to={`/product/${item.id}`} className="font-semibold text-gray-800 hover:text-blue-600">
                              {item.name}
                            </Link>
                            <div className="text-sm text-gray-600 mt-1">
                              Color: <span className="capitalize">{item.color}</span> | Size: {item.size}
                            </div>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-sm text-red-600 hover:text-red-800 mt-2 inline-flex items-center"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="md:col-span-2 text-center">
                          <div className="md:hidden text-sm text-gray-500 mb-1">Price</div>
                          <div className="font-medium">${item.price.toFixed(2)}</div>
                        </div>
                        
                        {/* Quantity */}
                        <div className="md:col-span-2 flex justify-center">
                          <div className="md:hidden text-sm text-gray-500 mb-1">Quantity</div>
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                              </svg>
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        {/* Total */}
                        <div className="md:col-span-2 text-center">
                          <div className="md:hidden text-sm text-gray-500 mb-1">Total</div>
                          <div className="font-semibold text-blue-600">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Continue Shopping Link */}
                <div className="mt-6">
                  <Link 
                    to="/products" 
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Continue Shopping
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div 
                  className="bg-white rounded-lg shadow-md p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${orderSummary.subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">${orderSummary.shipping.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${orderSummary.tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t pt-4 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-blue-600">${orderSummary.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button 
                    className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Proceed to Checkout
                  </motion.button>
                  
                  {/* Promo Code */}
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-sm font-medium text-gray-600 mb-3">Promo Code</h3>
                    <div className="flex">
                      <input 
                        type="text" 
                        placeholder="Enter code" 
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                      />
                      <button className="px-4 py-2 bg-gray-800 text-white rounded-r-md hover:bg-gray-700 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                </motion.div>
                
                {/* Additional Info */}
                <motion.div 
                  className="bg-white rounded-lg shadow-md p-6 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-sm font-medium text-gray-600 mb-4">We Accept</h3>
                  <div className="flex space-x-2">
                    {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((payment, i) => (
                      <div key={i} className="px-3 py-1 border border-gray-200 rounded text-xs">
                        {payment}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-500">
                    <p className="mb-2">Need help? Contact our support:</p>
                    <p className="text-blue-600">support@3dshoes.example.com</p>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            <motion.div 
              className="bg-white p-10 rounded-lg shadow-md text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-6">🛒</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Link 
                to="/products"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
              >
                Start Shopping
              </Link>
            </motion.div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Cart;