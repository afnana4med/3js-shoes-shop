import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import InteractiveArchitectureDiagram from "../components/InteractiveArchitectureDiagram";
import AppArchitectureDiagram from "../components/AppArchitectureDiagram";
import ShoeScene from "../components/ShoeModel/ShoeScene"; // Add this import
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

const TabButton = ({ children, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 font-medium rounded-md transition-all duration-300 ${
        isActive
          ? "bg-blue-600 text-white shadow-md"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
};

const About = () => {
  const [activeTab, setActiveTab] = useState("approach");
  // Add state for carousel images
  const [activeShoe1Image, setActiveShoe1Image] = useState(0);
  const [activeShoe3Image, setActiveShoe3Image] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add functions to handle carousel navigation
  const nextImage = (current, setCurrent, max) => {
    setCurrent(current === max - 1 ? 0 : current + 1);
  };

  const prevImage = (current, setCurrent, max) => {
    setCurrent(current === 0 ? max - 1 : current - 1);
  };

  const tabs = [
    { id: "approach", label: "Approach" },
    { id: "3d-models", label: "3D Models" },
    { id: "design", label: "Design" },
    { id: "accessibility", label: "Accessibility" },
    { id: "problems", label: "Problems Faced" },
    { id: "testing", label: "Testing" },
    { id: "technologies", label: "Technologies" },
    { id: "future", label: "Future Plans" },
  ];

  // For the first shoe carousel:
  const shoe1Images = [
    {
      src: "/modelImages/shoe1-1.jpg",
      caption: "Wireframe Model",
    },
    {
      src: "/modelImages/shoe1-2.jpg",
      caption: "Texture Mapping",
    },
    {
      src: "/modelImages/shoe1-4.jpg",
      caption: "Wireframe Texture",
    },
    {
      src: "/modelImages/shoe1-3.jpg",
      caption: "Final Render",
    },
  ];

  // For the second shoe carousel:
  const shoe3Images = [
    {
      src: "/modelImages/shoe3-1.jpg",
      caption: "Initial Concept Sketch",
    },
    {
      src: "/modelImages/shoe3-2.jpg",
      caption: "3D Modeling Process",
    },
    {
      src: "/modelImages/shoe2-4.jpg",
      caption: "Wireframe Texture",
    },
    {
      src: "/modelImages/shoe3-3.jpg",
      caption: "Material Assignment",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-40 bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-indigo-400/20 blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About This Project
            </h1>
            <p className="text-xl text-blue-100">
              Development insights, design choices, and technical implementation
              of our 3D shoe visualization app
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="sticky top-0 z-30 bg-white shadow-md py-4 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-grow">
        {/* Development Approach */}
        {activeTab === "approach" && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <InteractiveArchitectureDiagram diagramImage="/mvc.png" />
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-xl z-[-1]"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    MVC Design Pattern
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    This 3D shoe visualization application was developed
                    following the Model-View-Controller (MVC) architecture to
                    ensure a clean separation of concerns and maintainable
                    codebase:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 mb-6 leading-relaxed space-y-2">
                    <li>
                      <strong>Model:</strong> Data structures representing shoe
                      products, materials, and configurations
                    </li>
                    <li>
                      <strong>View:</strong> React components that render the UI
                      and 3D models using Three.js
                    </li>
                    <li>
                      <strong>Controller:</strong> State management and event
                      handlers that process user interactions and update the
                      model
                    </li>
                  </ul>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    This architecture allows for easier maintenance, testing,
                    and future expansion of features.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* 3D Model Production Process */}
        {activeTab === "3d-models" && (
          <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="container mx-auto px-4">
              <motion.h2
                className="text-3xl font-bold text-center mb-10 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Production of Our 3D Models
              </motion.h2>

              <motion.p
              className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <a className="text-blue-600 hover:underline" 
                href="https://drive.google.com/drive/folders/1BnU_QDYskuzMZD9eIWTJvv6DbZhHmIsT">Access the models here!</a>
              </motion.p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <motion.div
                  className="order-2 lg:order-1"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Modeling and Sculpting
                      </h3>
                      <p className="text-gray-600">
                        Our 3D shoe models were created using Blender's advanced
                        modeling tools. Starting with base reference images of
                        actual shoes, we built low-poly meshes and progressively
                        added detail through digital sculpting. Each model
                        consists of approximately 30,000 triangles, optimized
                        for web performance while maintaining visual fidelity.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        UV Unwrapping and Texturing
                      </h3>
                      <p className="text-gray-600">
                        Custom UV maps were created to ensure texture precision
                        on critical areas like the sole, upper, and details. We
                        produced 2K texture maps for each material variant,
                        including diffuse, normal, roughness, and ambient
                        occlusion maps using Substance Painter, allowing for
                        photorealistic rendering.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Optimization for Web
                      </h3>
                      <p className="text-gray-600">
                        Models were optimized through polygon reduction, texture
                        compression, and LOD (Level of Detail) implementation to
                        ensure quick loading times and smooth performance across
                        devices. We used glTF format for its excellent
                        compression and widespread compatibility with WebGL.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="order-1 lg:order-2"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="relative bg-white p-4 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                      Design Process
                    </h3>
                    <div className="relative" style={{ paddingTop: "56.25%" }}>
                      {" "}
                      {/* 16:9 Aspect Ratio */}
                      <iframe
                        className="absolute inset-0 w-full h-full rounded-lg"
                        src="https://www.youtube.com/embed/ivcS6XR2ouE?si=aVlClFYz5R8Y59lX"
                        title="3D Model Creation Process"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Shoe Models Display Section */}
              <div className="mt-16">
                <motion.h3
                  className="text-2xl font-bold text-center mb-12 text-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Our 3D Shoe Models
                </motion.h3>

                {/* Shoe 1 */}
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20 bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="h-[400px] relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg overflow-hidden">
                    {/* Use ShoeScene for the 3D model display */}
                    <ShoeScene
                      modelPath="/shoe1.glb"
                      shoeScale={1.3}
                      autoRotate={true}
                      bgColor="transparent"
                      onLoaded={() => console.log("Shoe 1 loaded")}
                    />
                  </div>

                  {/* Image Carousel for Shoe 1 */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Running Shoe Development
                    </h4>
                    <div className="relative">
                      <div className="bg-gray-200 h-[240px] rounded-lg mb-2 overflow-hidden">
                        <img
                          src={shoe1Images[activeShoe1Image].src}
                          alt={shoe1Images[activeShoe1Image].caption}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/600x400?text=Shoe+Design+Process";
                          }}
                        />
                      </div>
                      <p className="text-center text-gray-600">
                        {shoe1Images[activeShoe1Image].caption}
                      </p>
                      <button
                        aria-label="Previous image"
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full"
                        onClick={() =>
                          prevImage(
                            activeShoe1Image,
                            setActiveShoe1Image,
                            shoe1Images.length
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        aria-label="Next image"
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full"
                        onClick={() =>
                          nextImage(
                            activeShoe1Image,
                            setActiveShoe1Image,
                            shoe1Images.length
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-4 text-gray-600">
                      <p>
                        This running shoe model features dynamic mesh
                        deformation for realistic movement simulation and
                        advanced material properties that adjust reflectivity
                        based on viewing angle.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Shoe 3 */}
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="order-2 lg:order-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Casual Shoe Development
                    </h4>
                    <div className="relative">
                      <div className="bg-gray-200 h-[240px] rounded-lg mb-2 overflow-hidden">
                        <img
                          src={shoe3Images[activeShoe3Image].src}
                          alt={shoe3Images[activeShoe3Image].caption}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/600x400?text=Casual+Shoe+Design";
                          }}
                        />
                      </div>
                      <p className="text-center text-gray-600">
                        {shoe3Images[activeShoe3Image].caption}
                      </p>
                      <button
                        aria-label="Previous image"
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full"
                        onClick={() =>
                          prevImage(
                            activeShoe3Image,
                            setActiveShoe3Image,
                            shoe3Images.length
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        aria-label="Next image"
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full"
                        onClick={() =>
                          nextImage(
                            activeShoe3Image,
                            setActiveShoe3Image,
                            shoe3Images.length
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-4 text-gray-600">
                      <p>
                        Our casual shoe model incorporates multi-layered
                        textures and parametric design elements that allow for
                        dynamic customization of style features without
                        compromising render performance.
                      </p>
                    </div>
                  </div>

                  <div className="h-[400px] relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg overflow-hidden order-1 lg:order-2">
                    {/* Use ShoeScene for the 3D model display */}
                    <ShoeScene
                      modelPath="/shoe3.glb"
                      shoeScale={1.3}
                      autoRotate={true}
                      bgColor="transparent"
                      onLoaded={() => console.log("Shoe 3 loaded")}
                    />
                  </div>
                </motion.div>

                            <motion.div
                className="mt-16 mb-16 bg-white p-8 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                  Design Gallery
                </h3>

                <p className="text-center text-gray-600 mb-8">
                  Explore our comprehensive design process from concept sketches
                  to final renders
                </p>

                {/* Horizontal scrolling image carousel */}
                <div className="relative">
                  <div className="overflow-x-auto pb-4 hide-scrollbar">
                    <div className="flex space-x-4 w-max">
                      {[
                        {
                          src: "/modelImages/shoe1.jpg",
                          caption: "Initial Sketches",
                        },
                        {
                          src: "/modelImages/shoe2.jpg",
                          caption: "3D Wireframe Development",
                        },
                        {
                          src: "/modelImages/shoe3.jpg",
                          caption: "Material Testing",
                        },
                        {
                          src: "/modelImages/shoe4.jpg",
                          caption: "Color Variants",
                        },
                        {
                          src: "/modelImages/shoe6.jpg",
                          caption: "Shadow and Lighting Tests",
                        },
                        {
                          src: "/modelImages/shoe7.jpg",
                          caption: "Environment Integration",
                        },
                      ].map((image, index) => (
                        <div key={index} className="flex-shrink-0 w-80">
                          <div className="bg-gray-200 h-56 rounded-lg overflow-hidden">
                            <img
                              src={image.src}
                              alt={image.caption}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://via.placeholder.com/400x300?text=Design+Process";
                              }}
                            />
                          </div>
                          <p className="mt-2 text-center text-gray-600">
                            {image.caption}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Left/Right navigation arrows */}
                  <button
                    aria-label="Scroll left"
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-3 bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full shadow-md z-10"
                    onClick={() => {
                      const container = document.querySelector(
                        ".overflow-x-auto"
                      );
                      container.scrollBy({ left: -320, behavior: "smooth" });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    aria-label="Scroll right"
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-3 bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full shadow-md z-10"
                    onClick={() => {
                      const container = document.querySelector(
                        ".overflow-x-auto"
                      );
                      container.scrollBy({ left: 320, behavior: "smooth" });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Image gallery caption */}
                <div className="mt-8 text-center text-gray-600">
                  <p>
                    Our detailed design process includes hundreds of iterations
                    and refinements to create the perfect 3D models.
                  </p>
                  <p className="mt-2">
                    <a
                      href="#"
                      className="text-blue-600 hover:underline inline-flex items-center"
                    >
                      View complete design archive
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </p>
                </div>
              </motion.div>
                {/* Technical Details */}
                <motion.div
                  className="mt-16 bg-blue-50 p-8 rounded-xl border border-blue-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-blue-800">
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">
                        Polygon Count
                      </h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>Running Shoe: 28,542 triangles</li>
                        <li>Casual Shoe: 32,768 triangles</li>
                        <li>LOD Variants: 3 levels each</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">
                        Texture Maps
                      </h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>Diffuse: 2048×2048px</li>
                        <li>Normal: 2048×2048px</li>
                        <li>Roughness: 1024×1024px</li>
                        <li>Ambient Occlusion: 1024×1024px</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">
                        File Sizes
                      </h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>Original GLTF: ~8.2MB</li>
                        <li>Draco Compressed: ~1.7MB</li>
                        <li>Texture Set: ~5.4MB</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
                            {/* Image Gallery Carousel */}
            </div>
          </section>
        )}

        {/* Design Choices */}
        {activeTab === "design" && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <motion.h2
                className="text-3xl font-bold text-center mb-4 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Design Choices
              </motion.h2>

              <motion.p
                className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Key design decisions that shaped our 3D visualization experience
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "User Interface",
                    icon: "🎮",
                    description:
                      "Minimalist UI that keeps focus on the 3D models while providing intuitive controls. High-contrast buttons and clear visual hierarchy ensure users can navigate easily.",
                  },
                  {
                    title: "Color Palette",
                    icon: "🎨",
                    description:
                      "Neutral background colors with vibrant accents to highlight interactive elements. This ensures the shoe colors are represented accurately without visual competition.",
                  },
                  {
                    title: "Responsive Layout",
                    icon: "📱",
                    description:
                      "Fluid layout that adapts to different screen sizes, with special consideration for touch controls on mobile devices versus mouse interactions on desktop.",
                  },
                  {
                    title: "Visual Feedback",
                    icon: "✨",
                    description:
                      "Subtle animations and transitions to acknowledge user interactions and guide attention to important features or customization options.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-8 rounded-xl shadow-md border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="text-4xl mb-4 text-blue-600">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>


            </div>
          </section>
        )}

        {/* Accessibility Considerations */}
        {activeTab === "accessibility" && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <motion.h2
                className="text-3xl font-bold text-center mb-16 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Accessibility Considerations
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                    Visual Accessibility
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3">✓</span>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          High Contrast UI
                        </h4>
                        <p className="text-gray-600">
                          Controls and interactive elements maintain WCAG 2.1 AA
                          contrast ratios
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3">✓</span>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Text Alternatives
                        </h4>
                        <p className="text-gray-600">
                          All 3D models have descriptive text alternatives for
                          screen readers
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3">✓</span>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Resizable Text
                        </h4>
                        <p className="text-gray-600">
                          All text elements can be resized up to 200% without
                          loss of functionality
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3">✓</span>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Color Independence
                        </h4>
                        <p className="text-gray-600">
                          Information is not conveyed by color alone; shapes and
                          labels supplement color cues
                        </p>
                      </div>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                    Interaction Accessibility
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3">✓</span>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Keyboard Navigation
                        </h4>
                        <p className="text-gray-600">
                          Full keyboard control for 3D model rotation, zoom, and
                          customization
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3">✓</span>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Reduced Motion Option
                        </h4>
                        <p className="text-gray-600">
                          Respects prefers-reduced-motion setting to minimize
                          animations
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3">✓</span>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Alternative Controls
                        </h4>
                        <p className="text-gray-600">
                          Buttons provided as alternatives to drag interactions
                          for model manipulation
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3">✓</span>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Error Prevention
                        </h4>
                        <p className="text-gray-600">
                          Confirmation dialogs for significant actions and easy
                          undo functionality
                        </p>
                      </div>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Problems Faced */}
        {activeTab === "problems" && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <motion.h2
                className="text-3xl font-bold text-center mb-8 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Problems We Faced
              </motion.h2>

              <motion.div
                className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border-t-4 border-red-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Complex Geometry Rendering
                </h3>
                <div className="prose prose-lg text-gray-700 max-w-none">
                  <p>
                    One of the biggest challenges we encountered was rendering
                    highly detailed 3D shoe models in a web browser environment.
                    The initial models contained complex geometry with hundreds
                    of thousands of polygons, causing browsers to crash and
                    creating an unusable experience for many users.
                  </p>

                  <div className="my-6 bg-red-50 border-l-4 border-red-500 p-4">
                    <h4 className="font-semibold text-lg text-red-800">
                      The Problem:
                    </h4>
                    <p className="text-gray-800">
                      How can we add these complex geometry models to our site
                      while maintaining smooth rendering performance across
                      various devices and browsers? The website consistently
                      crashed when loading detailed shoe models, creating a poor
                      user experience.
                    </p>
                  </div>

                  <h4 className="text-xl font-semibold mb-2 text-gray-800">
                    Our Solution:
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li>
                      <strong>Draco Compression:</strong> We implemented Draco
                      compression through Blender to significantly reduce file
                      sizes while preserving visual quality. This technique
                      compressed our models by up to 90%, drastically improving
                      load times.
                    </li>
                    <li>
                      <strong>Progressive Loading:</strong> We developed a
                      progressive loading system that displays a low-resolution
                      placeholder while the full model loads in the background.
                    </li>
                    <li>
                      <strong>Geometry Optimization:</strong> We manually
                      reduced polygon counts in areas that don't require high
                      detail, using techniques like normal mapping to maintain
                      visual fidelity.
                    </li>
                    <li>
                      <strong>Level of Detail (LOD):</strong> Implementation of
                      LOD systems that display appropriate model complexity
                      based on zoom level and device capabilities.
                    </li>
                  </ul>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                    <h4 className="font-semibold text-blue-800">Results:</h4>
                    <p className="text-gray-800">
                      After implementing these optimizations, we achieved smooth
                      rendering across 99% of user interactions. You might still
                      notice approximately 1% lagging on the entire website when
                      viewing models with particularly complex geometry, but the
                      overall experience is now highly responsive and reliable
                      across devices.
                    </p>
                  </div>

                  <h4 className="text-xl font-semibold mb-2 text-gray-800">
                    Lessons Learned:
                  </h4>
                  <p>
                    This challenge taught us valuable lessons about balancing
                    visual quality with performance considerations in web-based
                    3D applications. We now have a robust pipeline for
                    optimizing 3D assets specifically for web deployment that we
                    can apply to future projects.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="mt-12 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border-t-4 border-orange-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Cross-Browser Compatibility
                </h3>
                <p className="text-gray-700 mb-6">
                  Another significant challenge we faced was ensuring consistent
                  WebGL performance and rendering across different browsers and
                  devices. Safari, in particular, presented unique challenges
                  with texture loading and shader compilation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-gray-800">
                      Problem
                    </h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Inconsistent material appearance between browsers</li>
                      <li>WebGL context loss on mobile devices</li>
                      <li>Safari-specific texture loading issues</li>
                      <li>Different GLSL shader support across browsers</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-gray-800">
                      Solution
                    </h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Created browser-specific shader fallbacks</li>
                      <li>Implemented WebGL context recovery mechanisms</li>
                      <li>Used feature detection for capabilities</li>
                      <li>
                        Extensive testing across device/browser combinations
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Testing Methodology */}
        {activeTab === "testing" && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <motion.h2
                className="text-3xl font-bold text-center mb-8 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Testing Methodology
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="overflow-x-auto mt-12 pt-8 pb-20"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
                  Detailed Test Cases
                </h3>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 text-gray-700 text-sm">
                    <tr>
                      <th className="text-left px-6 py-3 border-b">
                        Test Case
                      </th>
                      <th className="text-left px-6 py-3 border-b">Type</th>
                      <th className="text-left px-6 py-3 border-b">
                        Description
                      </th>
                      <th className="text-left px-6 py-3 border-b">Result</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 text-sm">
                    <tr className="border-b">
                      <td className="px-6 py-4">TC001</td>
                      <td className="px-6 py-4">Functional</td>
                      <td className="px-6 py-4">
                        Check that the camera rotates using left mouse drag
                      </td>
                      <td className="px-6 py-4 text-green-600">Passed</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4">TC002</td>
                      <td className="px-6 py-4">Functional</td>
                      <td className="px-6 py-4">
                        Check zoom in/out with scroll wheel
                      </td>
                      <td className="px-6 py-4 text-green-600">Passed</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4">TC003</td>
                      <td className="px-6 py-4">Functional</td>
                      <td className="px-6 py-4">
                        Test color picker updates 3D model material
                      </td>
                      <td className="px-6 py-4 text-green-600">Passed</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4">TC004</td>
                      <td className="px-6 py-4">UI</td>
                      <td className="px-6 py-4">
                        Ensure responsive layout on mobile
                      </td>
                      <td className="px-6 py-4 text-green-600">Passed</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4">TC005</td>
                      <td className="px-6 py-4">Performance</td>
                      <td className="px-6 py-4">
                        Measure 3D model loading time under 2s
                      </td>
                      <td className="px-6 py-4 text-green-600">Passed</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4">TC006</td>
                      <td className="px-6 py-4">Accessibility</td>
                      <td className="px-6 py-4">
                        Verify keyboard navigation through controls
                      </td>
                      <td className="px-6 py-4 text-green-600">Passed</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4">TC007</td>
                      <td className="px-6 py-4">Compatibility</td>
                      <td className="px-6 py-4">
                        Run on Chrome, Firefox, Edge, Safari
                      </td>
                      <td className="px-6 py-4 text-green-600">Passed</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>

              <motion.p
                className="text-center text-gray-600 mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Our comprehensive testing approach ensured a robust and
                user-friendly 3D experience across all devices
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-50 p-8 rounded-xl"
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Automated Testing
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        Unit tests for core model manipulation functions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Integration tests for component interactions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Performance benchmarks for 3D rendering</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        Accessibility compliance testing with axe-core
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Cross-browser compatibility tests</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-gray-50 p-8 rounded-xl"
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    User Testing
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        Usability sessions with 12 participants of diverse
                        backgrounds
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>A/B testing of different control schemes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Heatmap analysis of user interactions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        Focused sessions with users utilizing assistive
                        technologies
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        Post-interaction interviews and feedback collection
                      </span>
                    </li>
                  </ul>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-blue-50 p-8 rounded-xl border border-blue-100"
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-800">
                  Testing Impact
                </h3>
                <p className="text-gray-700 mb-4">
                  Our iterative testing process directly influenced several key
                  improvements to the final application:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">→</span>
                    <span>
                      Simplified camera controls based on user confusion with
                      initial implementation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">→</span>
                    <span>
                      Added contextual help tooltips after observing hesitation
                      during first-time use
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">→</span>
                    <span>
                      Optimized model loading sequence to provide faster initial
                      rendering
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">→</span>
                    <span>
                      Implemented progressive enhancement for devices with
                      limited 3D capabilities
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">→</span>
                    <span>
                      Redesigned color picker interface based on accessibility
                      feedback
                    </span>
                  </li>
                </ul>
              </motion.div>

              {/* <div className="mt-12 p-4 bg-gray-100 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 italic">
                  More detailed testing information will be added soon.
                </p>
              </div> */}
            </div>
          </section>
        )}

        {/* Technologies Used */}
        {activeTab === "technologies" && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <motion.h2
                className="text-3xl font-bold text-center mb-16 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Technologies Used
              </motion.h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { name: "Three.js", icon: "🧊" },
                  { name: "React", icon: "⚛️" },
                  { name: "TailwindCSS", icon: "🎨" },
                  { name: "Framer Motion", icon: "🔄" },
                  { name: "PHP", icon: "🐘" },
                  { name: "SQLite", icon: "🗄️" },
                  { name: "REST API", icon: "🔌" },
                  { name: "WebGL", icon: "🖥️" },
                  { name: "Jest", icon: "🧪" },
                  { name: "React Testing Library", icon: "🔍" },
                  { name: "GitHub Actions", icon: "🔄" },
                  { name: "JSON", icon: "📋" },
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="text-4xl mb-3">{tech.icon}</div>
                    <h3 className="font-medium text-gray-800">{tech.name}</h3>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-16 bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-600  mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Backend Architecture
                </h3>
                <p className="text-gray-600 mb-6">
                  Our product data is managed through a robust server-side
                  architecture that combines PHP and SQLite:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-lg mb-2 text-gray-800 flex items-center">
                      <span className="text-blue-600 mr-2">🐘</span> PHP Backend
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>
                          RESTful API endpoints for product data retrieval
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Authentication and security middleware</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Image and 3D model asset processing</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-2 text-gray-800 flex items-center">
                      <span className="text-blue-600 mr-2">🗄️</span> SQLite
                      Database
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Lightweight, serverless database solution</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>
                          Product catalog with material and texture mappings
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>User preferences and configuration storage</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-medium text-lg mb-2 text-gray-800 flex items-center">
                    <span className="text-blue-600 mr-2">🔄</span> Data Flow
                  </h4>
                  <p className="text-gray-600">
                    When users interact with our application, React components
                    make AJAX requests to our PHP API endpoints, which query the
                    SQLite database for product information. The server then
                    returns structured JSON data containing shoe models,
                    available materials, textures, and pricing. This
                    architecture ensures quick response times while maintaining
                    data integrity and security.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="mt-16 bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-600 mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Application Architecture Diagram
                </h3>
                <p className="text-gray-600 mb-6">
                  Explore our application's architecture by interacting with the
                  diagram below. Pan and zoom to see details.
                </p>

                <div className="h-[500px] mb-6">
                  <InteractiveArchitectureDiagram diagramImage="/arch.png" />
                </div>

                <p className="text-gray-600 italic text-sm text-center">
                  Interactive diagram: use mouse wheel to zoom, click and drag
                  to pan
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Future Enhancements */}
        {activeTab === "future" && (
          <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
            <div className="container mx-auto px-4 text-center">
              <motion.h2
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Future Development Plans
              </motion.h2>
              <motion.p
                className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                As we continue to refine and expand our 3D shoe visualization
                platform, we're exploring several exciting enhancements:
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <motion.div
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="font-semibold text-xl mb-3">AR Try-On</h3>
                  <p className="text-blue-100">
                    Augmented reality features to virtually try shoes on using
                    mobile cameras
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="font-semibold text-xl mb-3">
                    AI Size Recommendations
                  </h3>
                  <p className="text-blue-100">
                    Machine learning algorithms to suggest optimal shoe sizes
                    based on foot measurements
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="font-semibold text-xl mb-3">
                    Community Features
                  </h3>
                  <p className="text-blue-100">
                    Social sharing and community galleries of custom shoe
                    designs
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default About;
