import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// IMPORTANT: Override useGLTF's default Draco location
// This ensures all uses of useGLTF use our local Draco files
useGLTF.setDecoderPath('/draco/');

// Create a singleton Draco loader instance that will be used everywhere
const createDracoLoader = () => {
  const loader = new DRACOLoader();
  // Make sure path ends with a trailing slash
  loader.setDecoderPath('/draco/');
  // Log to verify configuration
  console.log('Draco decoder path set to:', loader.decoderPath);
  // Force using the local JS decoder as fallback
  loader.setDecoderConfig({ type: 'js' });
  return loader;
};

// Create a single instance to be reused
const dracoLoader = createDracoLoader();

// File checker helper function (not a hook)
const checkDracoFilesExist = async () => {
  try {
    const response = await fetch('/draco/draco_wasm_wrapper.js', { method: 'HEAD' });
    const jsResponse = await fetch('/draco/draco_decoder.js', { method: 'HEAD' });
    console.log('Draco files accessible:', {
      wasm_wrapper: response.ok,
      js_decoder: jsResponse.ok
    });
    return response.ok && jsResponse.ok;
  } catch (e) {
    console.error('Error checking Draco files:', e);
    return false;
  }
};

// Initiate check immediately (not using hooks)
checkDracoFilesExist();

// Preload models using direct GLTFLoader instead of useGLTF.preload
function preloadModelsWithLocalDraco() {
  const modelsToPreload = ['/shoe1.glb', '/yellow_shoe.glb', '/sneaker_redesigned.glb'];
  
  // Create a custom loader for preloading
  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  
  // Preload each model manually
  modelsToPreload.forEach(path => {
    console.log(`Preloading model: ${path} with custom loader`);
    loader.load(
      path,
      (gltf) => {
        // Store in useGLTF's cache so it can be retrieved later
        useGLTF.cache.set(path, {
          scene: gltf.scene,
          scenes: gltf.scenes,
          animations: gltf.animations,
          nodes: gltf.parser.json.nodes,
          materials: gltf.parser.json.materials
        });
        console.log(`Model ${path} successfully preloaded`);
      },
      undefined,
      (error) => console.error(`Error preloading model ${path}:`, error)
    );
  });
}

// Execute preload before component exports
preloadModelsWithLocalDraco();

export function ShoeModel({ 
  color = '#ffffff', 
  useOriginalColors = false, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1, 
  autoRotate = false,
  modelPath = '/shoe.glb' // Default model path
}) {
  const ref = useRef();
  
  // Create a loader function to pass to useGLTF
  const loaderFn = useCallback(
    (loader) => {
      loader.setDRACOLoader(dracoLoader);
    },
    []
  );
  
  // Pass the loader function to useGLTF
  const { scene } = useGLTF(modelPath, true, loaderFn);
  
  // Clone the entire scene to avoid modifying the cached original
  const [clonedScene] = useState(() => {
    const clone = scene.clone(true);
    
    // Only apply color if we're not using original colors
    if (!useOriginalColors) {
      // Apply color to all materials in the cloned scene
      clone.traverse((node) => {
        if (node.isMesh && node.material) {
          // If it's an array of materials, clone and modify each one
          if (Array.isArray(node.material)) {
            node.material = node.material.map(mat => {
              const clonedMat = mat.clone();
              clonedMat.color = new THREE.Color(color);
              return clonedMat;
            });
          } else {
            // Single material
            node.material = node.material.clone();
            node.material.color = new THREE.Color(color);
          }
        }
      });
    }
    
    return clone;
  });
  
  // Update material colors when the color prop changes
  useEffect(() => {
    if (clonedScene && !useOriginalColors) {
      clonedScene.traverse((node) => {
        if (node.isMesh && node.material) {
          // If it's an array of materials, update each one
          if (Array.isArray(node.material)) {
            node.material.forEach(mat => {
              if (mat) {
                mat.color.set(color);
                mat.needsUpdate = true;
              }
            });
          } else if (node.material) {
            // Single material
            node.material.color.set(color);
            node.material.needsUpdate = true;
          }
        }
      });
    }
  }, [color, clonedScene, useOriginalColors]);
  
  // Handle auto-rotation with gentler speed
  useFrame((state, delta) => {
    if (autoRotate && ref.current) {
      ref.current.rotation.y += delta * 0.2; // Reduced from 0.5 to 0.2 for slower rotation
    }
  });

  // Handle model cleanup to prevent memory leaks
  useEffect(() => {
    return () => {
      if (clonedScene) {
        clonedScene.traverse((node) => {
          if (node.isMesh) {
            if (node.geometry) node.geometry.dispose();
            if (Array.isArray(node.material)) {
              node.material.forEach(mat => mat && mat.dispose());
            } else if (node.material) {
              node.material.dispose();
            }
          }
        });
      }
    };
  }, [clonedScene]);

  return (
    <group 
      ref={ref} 
      position={position} 
      rotation={rotation} 
      scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
    >
      <primitive object={clonedScene} castShadow receiveShadow />
    </group>
  );
}

export default ShoeModel;