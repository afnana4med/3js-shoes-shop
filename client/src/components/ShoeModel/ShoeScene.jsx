import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  PresentationControls,
  useGLTF,
  Stats
} from '@react-three/drei';
import ShoeModel from './ShoeModel';
import * as THREE from 'three';

// This component ensures models remain visible by constantly updating the scene
function KeepAlive() {
  const { gl, scene, camera } = useThree();
  
  useEffect(() => {
    const interval = setInterval(() => {
      gl.render(scene, camera);
    }, 500); // Render every 500ms to keep the scene alive
    
    return () => clearInterval(interval);
  }, [gl, scene, camera]);
  
  return null;
}

// Model wrapper component that calls onLoaded when it mounts
function LoadNotifier({ onLoaded }) {
  useEffect(() => {
    // Call onLoaded when this component mounts, which means
    // the model has been loaded and rendered
    if (onLoaded) {
      onLoaded();
    }
  }, [onLoaded]);
  
  return null;
}

export function ShoeScene({ 
  color = '#ffffff', 
  useOriginalColors = false,
  bgColor = 'transparent',
  modelPath = '/shoe1.glb', // Default model path
  autoRotate = false,
  showControls = true,
  canvasStyle = {},
  shoePosition = [0, 0, 0],
  shoeRotation = [0, Math.PI / 4, 0],
  shoeScale = 2,
  onLoaded // Add onLoaded prop
}) {
  const [key, setKey] = useState(0);
  const canvasRef = useRef(null);
  // Choose one control system - let's use OrbitControls by default
  const [controlMode, setControlMode] = useState('orbit'); 
  
  // Handle WebGL context loss and restoration
  useEffect(() => {
    const handleContextLost = (e) => {
      e.preventDefault();
      console.log('WebGL context lost, will attempt to restore');
      
      // Force remount of the Canvas after a delay
      setTimeout(() => {
        setKey(prevKey => prevKey + 1);
      }, 1000);
    };
    
    const handleContextRestored = () => {
      console.log('WebGL context restored');
    };
    
    // These events need to be added to the window object
    window.addEventListener('webglcontextlost', handleContextLost, false);
    window.addEventListener('webglcontextrestored', handleContextRestored, false);
    
    return () => {
      window.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);

  // Preload model to avoid loading issues
  useEffect(() => {
    useGLTF.preload(modelPath, true);
  }, [modelPath]);

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        touchAction: 'none',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        ...canvasStyle 
      }}
      ref={canvasRef}
    >
      <Canvas
        key={key}
        shadows
        dpr={[1, 2]}
        camera={{ 
          position: [4, 2, 8],
          fov: 35,
          near: 0.1,
          far: 100
        }}
        style={{ 
          background: bgColor,
          borderRadius: '12px',
          width: '100%',
          height: '100%',
          maxHeight: '100%',
          overflow: 'hidden'
        }}
        frameloop="always"
        gl={{ 
          powerPreference: "high-performance",
          antialias: true,
          preserveDrawingBuffer: true,
          alpha: true
        }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true;
          gl.outputEncoding = THREE.sRGBEncoding;
        }}
      >
        {/* Add the KeepAlive component to ensure constant rendering */}
        <KeepAlive />
        {import.meta.env.DEV && <Stats />}
        
        <ambientLight intensity={0.7} /> 
        <spotLight 
          position={[5, 8, 5]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1.2}
          castShadow 
        />
        <directionalLight 
          position={[-5, 5, 5]}
          intensity={0.6} 
        />
        
        {/* Choose only ONE control system */}
        {showControls && controlMode === 'orbit' ? (
          <>
            <Suspense fallback={null}>
              <ShoeModel 
                color={color}
                useOriginalColors={useOriginalColors}
                modelPath={modelPath}
                position={[0, -1, 0]}
                rotation={[0, Math.PI * 1.75, 0]}
                scale={shoeScale * 0.28}
                autoRotate={false} // Let OrbitControls handle rotation
              />
              <Environment preset="studio" />
              <LoadNotifier onLoaded={onLoaded} />
            </Suspense>
            
            <OrbitControls 
              enablePan={false}
              enableZoom={true}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI * 0.6}
              minDistance={4}
              maxDistance={16}
              dampingFactor={0.1}
              rotateSpeed={0.4}
              zoomSpeed={0.6}
              enableDamping={true}
              autoRotate={autoRotate}
              autoRotateSpeed={0.5}
              makeDefault
            />
          </>
        ) : (
          <PresentationControls
            global
            snap={{ mass: 1, tension: 170 }}
            rotation={[0, -Math.PI / 8, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 3, Math.PI / 3]}
            config={{ mass: 1, tension: 170, friction: 36 }}
            speed={1.0}
          >
            <Suspense fallback={null}>
              <ShoeModel 
                color={color}
                useOriginalColors={useOriginalColors}
                modelPath={modelPath}
                position={[0, -1, 0]}
                rotation={[0, Math.PI * 1.75, 0]}
                scale={shoeScale * 0.28}
                autoRotate={autoRotate}
              />
              <Environment preset="studio" />
              <LoadNotifier onLoaded={onLoaded} />
            </Suspense>
          </PresentationControls>
        )}
        
        <ContactShadows 
          position={[0, -1.2, 0]}
          opacity={0.7}
          scale={12}
          blur={2}
          far={1.5}
        />
      </Canvas>
    </div>
  );
}

export default ShoeScene;