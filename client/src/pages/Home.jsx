import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import ProductCard from "../components/ProductCard/ProductCard";
import ShoeScene from "../components/ShoeModel/ShoeScene";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};


const Home = () => {
  const [activeShoeColor, setActiveShoeColor] = useState("#FF4040"); // Default red color
  const [modelLoading, setModelLoading] = useState(true); // Add loading state
  const [data, setData] = useState([]); // State to hold fetched data

  // Updated featured products data with model paths and proper color values
  const featuredProducts = [
    {
      id: 1,
      name: "Red Runner",
      price: 129.99,
      modelPath: "/shoe1.glb", // Use the same model path
      color: "red", // Use color names that match the ProductCard colorMap
      description: "Premium comfort with stylish design",
      category: "Running",
      shoeScale: 1.3
    },
    {
      id: 2,
      name: "Blue Sprinter",
      price: 149.99,
      modelPath: "/shoe2.glb",
      color: "blue",
      description: "Lightweight performance for every step",
      category: "Sport",
      shoeScale: 0.125
    },
    {
      id: 3,
      name: "Green Trail",
      price: 169.99,
      modelPath: "/shoe3.glb",
      color: "green",
      description: "Durable design for all terrain adventures",
      category: "Outdoor",
      shoeScale: 1.3
    },
  ];

  const fetchproducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/products/read.php");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data); // Set the fetched data to state
      console.log(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchproducts(); // Fetch products when the component mounts
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-visible bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="absolute inset-0">
          {/* Background decoration elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-300/20 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-indigo-300/20 blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center">
          {/* Text content */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 leading-tight">
              Step into the <span className="text-blue-600">Future</span> of
              Footwear
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              Experience our premium designed shoes that combine style, comfort,
              and innovation.
            </p>

            {/* Color selection buttons */}
            <div className="flex gap-3 justify-center md:justify-start mb-8">
              <span className="text-gray-700 mr-2">Choose color:</span>
              {featuredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setActiveShoeColor(product.color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    activeShoeColor === product.color
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: product.color }}
                  aria-label={`Select ${product.name}`}
                />
              ))}
              {/* Original color option */}
              <button
                onClick={() => setActiveShoeColor("original")}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  activeShoeColor === "original"
                    ? "border-black"
                    : "border-gray-300"
                }`}
                style={{
                  background: "linear-gradient(135deg, #FFD700, #FFC000)",
                }}
                aria-label="Original shoe colors"
              >
                <span className="text-xs font-bold">O</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              >
                <Link to="/products">Shop Now</Link>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-300"
              >
                <Link to="/about">Learn More</Link>
              </motion.button>
            </div>
          </motion.div>

          {/* 3D Shoe Model with Loading State */}
          <motion.div
            className="w-full md:w-1/2 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            variants={fadeIn}
            style={{
              position: "relative",
              height: "100%",
              minHeight: "500px",
            }}
          >
            {/* Loading indicator */}
            {modelLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-blue-600 font-medium">
                    Loading 3D model...
                  </p>
                </div>
              </div>
            )}

            <div
              style={{
                position: "absolute",
                top: "-50px",
                left: "-50px",
                right: "-50px",
                bottom: "-50px",
                overflow: "visible",
              }}
            >
              <ShoeScene
                color={activeShoeColor}
                useOriginalColors={activeShoeColor === "original"}
                modelPath="/shoe_header.glb"
                bgColor="transparent"
                autoRotate={false}
                showControls={true}
                shoeScale={2}
                onLoaded={() => setModelLoading(false)} // Add onLoaded handler
                canvasStyle={{
                  width: "100%",
                  height: "100%",
                  outline: "none",
                  boxShadow: "none",
                  overflow: "visible",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products with 3D Models */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Collection
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProducts.map((data, index) => (
              <ProductCard
                key={data.id}
                product={data}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, delay: index * 0.1 },
                  },
                }}
              />
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >
              <Link to="/products">View All Products</Link>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Our Shoes
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔄",
                title: "Customization",
                description:
                  "Visualize and customize your shoes before purchasing",
                color: "#FF4040",
              },
              {
                icon: "🌿",
                title: "Eco-friendly",
                description:
                  "Sustainable materials and manufacturing processes",
                color: "#40A040",
              },
              {
                icon: "💪",
                title: "Durability",
                description:
                  "Engineered for long-lasting performance and comfort",
                color: "#4040FF",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="text-5xl md:text-6xl mb-6 mx-auto flex items-center justify-center"
                  style={{ color: feature.color }}
                >
                  <span
                    className="bg-opacity-20 p-4 rounded-full"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <motion.h2
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Join Our Newsletter
            </motion.h2>
            <motion.p
              className="text-blue-100 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Stay updated with our newest designs, releases and exclusive
              offers.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <motion.button
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;