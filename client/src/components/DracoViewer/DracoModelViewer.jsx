import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import * as THREE from 'three';

// Component for rendering a Draco-compressed GLTF model
const Model = ({ modelPath }) => {
  const [error, setError] = useState(null);
  
  // Configure DRACO loader
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
  dracoLoader.setDecoderConfig({ type: 'js' });

  // Configure GLTF loader with Draco support
  try {
    // Use a try-catch block to handle preloading errors
    useGLTF.preload(modelPath, true, dracoLoader);
  } catch (e) {
    console.error("Error preloading model:", e);
  }
  
  const { scene, errors } = useGLTF(modelPath, true, dracoLoader);
  
  // If we have errors during loading, report them
  useEffect(() => {
    if (errors && errors.length > 0) {
      console.error("Errors loading model:", errors);
      setError(errors[0]);
    }
  }, [errors]);

  useEffect(() => {
    // Only proceed if we have a valid scene
    if (scene) {
      // Apply default material settings
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.2,
            roughness: 0.5,
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  if (error) {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  return scene ? (
    <primitive object={scene} scale={[0.01, 0.01, 0.01]} position={[0, -1, 0]} />
  ) : (
    // Fallback if scene is not ready
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

const DracoModelViewer = ({ modelPath }) => {
  const [loadError, setLoadError] = useState(null);
  
  // Error handling wrapper around Canvas
  const handleCanvasError = (error) => {
    console.error("Error in Canvas:", error);
    setLoadError(error);
  };
  
  return (
    <div style={{ width: '100%', height: '500px' }}>
      {loadError ? (
        <div className="flex items-center justify-center h-full bg-red-50 rounded-lg">
          <div className="text-center">
            <p className="text-red-600 font-medium mb-2">Failed to load 3D model</p>
            <p className="text-sm text-red-500">{loadError.toString()}</p>
          </div>
        </div>
      ) : (
        <ErrorBoundary fallback={
          <div className="flex items-center justify-center h-full bg-red-50 rounded-lg">
            <p className="text-red-600">Error loading the 3D model</p>
          </div>
        }>
          <Canvas shadows onError={handleCanvasError}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            
            {modelPath && <Model modelPath={modelPath} />}
            
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
              <planeGeometry args={[10, 10]} />
              <shadowMaterial transparent opacity={0.4} />
            </mesh>
          </Canvas>
        </ErrorBoundary>
      )}
    </div>
  );
};

// Simple error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default DracoModelViewer;