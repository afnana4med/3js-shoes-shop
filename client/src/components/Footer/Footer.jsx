import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', path: '/products' },
        { name: 'Running', path: '/products?category=running' },
        { name: 'Hiking', path: '/products?category=hiking' },
        { name: 'Casual', path: '/products?category=casual' },
        { name: 'New Arrivals', path: '/products?sort=newest' },
      ]
    },
    {
      title: 'About',
      links: [
        { name: 'Our Story', path: '/about' },
        { name: 'Technology', path: '/about#technology' },
        { name: 'Sustainability', path: '/about#sustainability' },
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/careers' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'FAQ', path: '/faq' },
        { name: 'Shipping', path: '/shipping' },
        { name: 'Returns', path: '/returns' },
        { name: 'Size Guide', path: '/size-guide' },
        { name: 'Contact Us', path: '/contact' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Cookie Policy', path: '/cookies' },
        { name: 'Warranty', path: '/warranty' },
      ]
    },
  ];

  return (
    <footer className="w-full">
      {/* Main Footer */}
      <div className="bg-white pt-16 pb-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="bg-[#2563EB] rounded-md flex items-center justify-center text-white font-bold text-xl h-9 w-9">
                  R
                </div>
                <span className="font-semibold text-lg">3D Shoes</span>
              </Link>
              <p className="text-gray-600 mb-6">
                Pioneering the future of footwear with innovative 3D technology and sustainable design.
              </p>

            </div>
            
            {/* Links Columns */}
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <motion.li key={linkIndex} whileHover={{ x: 2 }}>
                      <Link 
                        to={link.path} 
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Bar with blurred background similar to navbar */}
      <div className="flex justify-center mx-4 mb-4">
        <motion.div 
          className="w-full max-w-7xl rounded-xl bg-white/80 border border-gray-200/60 relative"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background with blurred blobs */}
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            {/* Positioned blobs that stay within the container */}
            <div className="absolute top-0 left-10 w-24 h-24 rounded-full bg-blue-300/20 blur-3xl"></div>
            <div className="absolute bottom-0 right-10 w-32 h-32 rounded-full bg-indigo-300/20 blur-3xl"></div>
            
            {/* Backdrop overlay */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-xl"></div>
          </div>
          
          <div className="relative flex flex-wrap justify-between items-center py-4 px-6">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} 3D Shoes. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <button className="text-sm text-gray-600 hover:text-blue-600">
                Cookie Settings
              </button>
              <span className="h-4 w-px bg-gray-300"></span>
              <button className="text-sm text-gray-600 hover:text-blue-600">
                Do Not Sell My Information
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;