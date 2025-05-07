import React from 'react';
import { motion } from 'framer-motion';

const AppArchitectureDiagram = () => {
  return (
    <svg 
      viewBox="0 0 800 500" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-full"
    >
      {/* Background */}
      <rect width="800" height="500" fill="#f8fafc" rx="10" ry="10" />
      
      {/* Frontend Section - React */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <rect x="50" y="50" width="250" height="400" fill="#dbeafe" rx="10" ry="10" stroke="#3b82f6" strokeWidth="2" />
        <text x="175" y="80" textAnchor="middle" fill="#1e40af" fontSize="18" fontWeight="bold">Frontend (React)</text>
        
        {/* React Components */}
        <rect x="75" y="100" width="200" height="60" fill="#eff6ff" rx="5" ry="5" stroke="#93c5fd" strokeWidth="1" />
        <text x="175" y="135" textAnchor="middle" fill="#1e40af" fontSize="14">User Interface Components</text>
        
        <rect x="75" y="180" width="200" height="60" fill="#eff6ff" rx="5" ry="5" stroke="#93c5fd" strokeWidth="1" />
        <text x="175" y="215" textAnchor="middle" fill="#1e40af" fontSize="14">Three.js Renderer</text>
        
        <rect x="75" y="260" width="200" height="60" fill="#eff6ff" rx="5" ry="5" stroke="#93c5fd" strokeWidth="1" />
        <text x="175" y="295" textAnchor="middle" fill="#1e40af" fontSize="14">State Management</text>
        
        <rect x="75" y="340" width="200" height="60" fill="#eff6ff" rx="5" ry="5" stroke="#93c5fd" strokeWidth="1" />
        <text x="175" y="375" textAnchor="middle" fill="#1e40af" fontSize="14">API Client</text>
      </motion.g>
      
      {/* Backend Section - PHP */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <rect x="500" y="50" width="250" height="400" fill="#e0e7ff" rx="10" ry="10" stroke="#6366f1" strokeWidth="2" />
        <text x="625" y="80" textAnchor="middle" fill="#3730a3" fontSize="18" fontWeight="bold">Backend (PHP)</text>
        
        {/* PHP Components */}
        <rect x="525" y="100" width="200" height="60" fill="#eef2ff" rx="5" ry="5" stroke="#a5b4fc" strokeWidth="1" />
        <text x="625" y="135" textAnchor="middle" fill="#3730a3" fontSize="14">REST API Endpoints</text>
        
        <rect x="525" y="180" width="200" height="60" fill="#eef2ff" rx="5" ry="5" stroke="#a5b4fc" strokeWidth="1" />
        <text x="625" y="215" textAnchor="middle" fill="#3730a3" fontSize="14">Authentication</text>
        
        <rect x="525" y="260" width="200" height="60" fill="#eef2ff" rx="5" ry="5" stroke="#a5b4fc" strokeWidth="1" />
        <text x="625" y="295" textAnchor="middle" fill="#3730a3" fontSize="14">Business Logic</text>
        
        <rect x="525" y="340" width="200" height="60" fill="#eef2ff" rx="5" ry="5" stroke="#a5b4fc" strokeWidth="1" />
        <text x="625" y="375" textAnchor="middle" fill="#3730a3" fontSize="14">Database Access Layer</text>
      </motion.g>
      
      {/* Database */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <rect x="350" y="380" width="100" height="60" fill="#f0fdfa" rx="5" ry="5" stroke="#2dd4bf" strokeWidth="2" />
        <text x="400" y="415" textAnchor="middle" fill="#115e59" fontSize="14" fontWeight="bold">SQLite DB</text>
      </motion.g>
      
      {/* Connection Arrows */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        {/* Frontend to Backend API Call */}
        <path d="M 275 370 L 350 370 L 525 370" fill="none" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
        <text x="400" y="360" textAnchor="middle" fill="#4b5563" fontSize="12">API Requests</text>
        
        {/* Backend to Database */}
        <path d="M 625 400 L 625 430 L 450 430 L 450 410" fill="none" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="550" y="445" textAnchor="middle" fill="#4b5563" fontSize="12">DB Queries</text>
        
        {/* Database to Backend */}
        <path d="M 450 380 L 450 350 L 525 350" fill="none" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="480" y="345" textAnchor="middle" fill="#4b5563" fontSize="12">Query Results</text>
        
        {/* Backend to Frontend Response */}
        <path d="M 525 330 L 350 330 L 275 330" fill="none" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
        <text x="400" y="320" textAnchor="middle" fill="#4b5563" fontSize="12">JSON Response</text>
      </motion.g>
      
      {/* Asset Storage */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <rect x="350" y="70" width="100" height="180" fill="#fef3c7" rx="5" ry="5" stroke="#f59e0b" strokeWidth="2" />
        <text x="400" y="95" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">Assets</text>
        
        <rect x="365" y="110" width="70" height="30" fill="#fffbeb" rx="3" ry="3" />
        <text x="400" y="130" textAnchor="middle" fill="#92400e" fontSize="10">3D Models</text>
        
        <rect x="365" y="150" width="70" height="30" fill="#fffbeb" rx="3" ry="3" />
        <text x="400" y="170" textAnchor="middle" fill="#92400e" fontSize="10">Textures</text>
        
        <rect x="365" y="190" width="70" height="30" fill="#fffbeb" rx="3" ry="3" />
        <text x="400" y="210" textAnchor="middle" fill="#92400e" fontSize="10">Images</text>
      </motion.g>
      
      {/* Asset Connections */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <path d="M 350 160 L 275 160" fill="none" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="310" y="150" textAnchor="middle" fill="#4b5563" fontSize="12">Load Assets</text>
        
        <path d="M 450 160 L 525 160" fill="none" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="490" y="150" textAnchor="middle" fill="#4b5563" fontSize="12">Serve Assets</text>
      </motion.g>
      
      {/* Arrow definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
        </marker>
      </defs>
      
      {/* User */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.8 }}
      >
        <circle cx="175" y="20" r="15" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <text x="175" y="25" textAnchor="middle" fill="#0c4a6e" fontSize="18">👤</text>
        <path d="M 175 35 L 175 100" fill="none" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="150" y="50" textAnchor="middle" fill="#4b5563" fontSize="12">User Interaction</text>
      </motion.g>
    </svg>
  );
};

export default AppArchitectureDiagram;