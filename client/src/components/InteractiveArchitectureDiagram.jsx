import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveArchitectureDiagram = ({ diagramImage }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    // Hide controls after 3 seconds of inactivity
    const timer = setTimeout(() => {
      if (!isDragging) {
        setShowControls(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isDragging]);

  const handleZoomIn = () => {
    if (scale < 3) {
      setScale(prev => prev + 0.2);
      setShowControls(true);
    }
  };

  const handleZoomOut = () => {
    if (scale > 0.5) {
      setScale(prev => prev - 0.2);
      setShowControls(true);
    }
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setShowControls(true);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
    if (newScale >= 0.5 && newScale <= 3) {
      setScale(newScale);
      setShowControls(true);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    setShowControls(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    setShowControls(true);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  return (
    <div 
      className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 h-[400px]" 
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s ease-out'
        }}
      >
        <img 
          src={diagramImage} 
          alt="Architecture diagram" 
          className="pointer-events-none"
          style={{ maxWidth: 'none' }} // Allows image to scale beyond container
        />
      </div>

      {/* Interactive instruction overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs md:text-sm p-2 text-center">
        Scroll to zoom, click and drag to pan
      </div>

      {/* Controls */}
      <motion.div 
        className="absolute top-2 right-2 bg-white bg-opacity-70 p-1 rounded-lg flex flex-col shadow-md"
        initial={{ opacity: 1 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <button 
          onClick={handleZoomIn} 
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-md"
          aria-label="Zoom in"
        >
          <span className="text-xl">+</span>
        </button>
        <button 
          onClick={handleZoomOut} 
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-md"
          aria-label="Zoom out"
        >
          <span className="text-xl">−</span>
        </button>
        <button 
          onClick={handleReset} 
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-md"
          aria-label="Reset view"
        >
          <span className="text-xl">⟲</span>
        </button>
      </motion.div>
    </div>
  );
};

export default InteractiveArchitectureDiagram;