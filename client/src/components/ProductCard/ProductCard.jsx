import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ShoeScene from '../ShoeModel/ShoeScene';

const ProductCard = ({ product, variants }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  
  // Animation variants
  const cardVariants = variants || {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  // Safe color mapping for our 3D models
  const colorMap = {
    'red': '#FF4040',
    'blue': '#4040FF',
    'green': '#40A040',
    'black': '#202020',
    'brown': '#804000',
    'silver': '#C0C0C0',
    'purple': '#8040FF'
  };
  
  // Use product-specific scale or default to 0.1
  const shoeScale = product.shoeScale || 0.1;
  
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      variants={cardVariants}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* 3D Shoe Model Display */}
        <div className="h-60 relative bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
          {/* Loading indicator */}
          {modelLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <div className="absolute inset-0" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoeScene 
              color={colorMap[product.color] || '#ffffff'}
              useOriginalColors={product.color === 'original'}
              modelPath={product.modelPath || "/sneaker_redesigned.glb"}
              showControls={false}
              autoRotate={isHovering}
              shoeRotation={[0, isHovering ? Math.PI * 2 : Math.PI * 0.25, 0]}
              shoeScale={shoeScale}
              onLoaded={() => setModelLoading(false)}
              shoePosition={[0, -0.5, 0]} // Adjust vertical position to center the shoe
              canvasStyle={{
                width: "100%",
                height: "100%",
                transform: isHovering ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s ease',
                position: 'absolute',
                inset: 0
              }}
            />
          </div>
          
          {/* Price tag */}
          <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 font-medium text-blue-600 shadow-sm text-sm z-10">
            ${product.price.toFixed(2)}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm font-medium text-gray-500 capitalize">
              {product.category}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              View Details
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;