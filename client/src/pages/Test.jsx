import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Stats, useProgress, Sky } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFExporter } from 'three-stdlib';

const LoadingSpinner = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gray-100 bg-opacity-80">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-gray-800">Loading 3D Model...</p>
    </div>
  );
};

const ModelLoader = () => {
  const { progress } = useProgress();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);
  
  if (!loading) return null;
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-10">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-gray-800">Loading 3D Model...</p>
      <p className="text-sm text-gray-600 mt-2">{Math.round(progress)}% loaded</p>
    </div>
  );
};

const CustomEnvironment = ({ preset, skyColor, sunPosition }) => {
  const presetConfigs = {
    default: {
      skyColor: '#87CEEB',
      sunPosition: [10, 5, 10],
      fog: false
    },
    sunset: { 
      skyColor: '#FF7F50',
      sunPosition: [3, 1, 5],
      fog: true
    },
    night: {
      skyColor: '#191970',
      sunPosition: [-10, -5, -10],
      fog: true
    },
    morning: {
      skyColor: '#87CEFA',
      sunPosition: [5, 3, 5],
      fog: false
    },
    overcast: {
      skyColor: '#708090',
      sunPosition: [0, 10, 0],
      fog: true
    }
  };

  const config = presetConfigs[preset] || presetConfigs.default;
  
  return (
    <Suspense fallback={null}>
      <Sky 
        distance={450}
        sunPosition={sunPosition || config.sunPosition} 
        rayleigh={config.preset === 'night' ? 0.5 : 1} 
      />
      {config.fog && <fog attach="fog" color={config.skyColor} near={8} far={30} />}
      <directionalLight 
        position={sunPosition || config.sunPosition}
        intensity={preset === 'night' ? 0.2 : 1.5}
        castShadow 
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </Suspense>
  );
};

const ShoeModel = ({ color, metalness, roughness, autoRotate, rotationSpeed, scale = 1.5, position = [0, -1, 0], selectedTexture, modelRef }) => {
  const { scene } = useGLTF('shoe1.glb');
  const localRef = useRef();
  const ref = modelRef || localRef;

  const textureOptions = {
    rubber: {
      basecolor: '/textures/rubber/Rubber_Sole_003_basecolor.jpg',
      ambientOcclusion: '/textures/rubber/Rubber_Sole_003_ambientOcclusion.jpg',
      normal: '/textures/rubber/Rubber_Sole_003_normal.jpg',
      roughness: '/textures/rubber/Rubber_Sole_003_roughness.jpg',
      height: '/textures/rubber/Rubber_Sole_003_height.png',
    },
    leather: {
      basecolor: '/textures/leather/Leather_Armor_003_basecolor.png',
      ambientOcclusion: '/textures/leather/Leather_Armor_003_ambientOcclusion.png',
      normal: '/textures/leather/Leather_Armor_003_normal.png',
      roughness: '/textures/leather/Leather_Armor_003_roughness.png',
      height: '/textures/leather/Leather_Armor_003_height.png',
    },
    lava: {
      basecolor: '/textures/lava/Stylized_Lava_001_basecolor.png',
      ambientOcclusion: '/textures/lava/Stylized_Lava_001_ambientOcclusion.png',
      normal: '/textures/lava/Stylized_Lava_001_normal.png',
      roughness: '/textures/lava/Stylized_Lava_001_roughness.png',
      height: '/textures/lava/Stylized_Lava_001_height.png',
    },
    gems: {
      basecolor: '/textures/gems/Incrusted_Gems_001_COLOR.jpg',
      ambientOcclusion: '/textures/gems/Incrusted_Gems_001_OCC.jpg',
      normal: '/textures/gems/Incrusted_Gems_001_NORM.jpg',
      roughness: '/textures/gems/Incrusted_Gems_001_MASK.jpg',
      height: '/textures/gems/Incrusted_Gems_001_DISP.jpg',
    }
  };

  const [basecolor, normal, roughnessMap, ao, height] = useLoader(THREE.TextureLoader, [
    textureOptions[selectedTexture].basecolor,
    textureOptions[selectedTexture].normal,
    textureOptions[selectedTexture].roughness,
    textureOptions[selectedTexture].ambientOcclusion,
    textureOptions[selectedTexture].height,
  ]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: basecolor,
          normalMap: normal,
          roughnessMap: roughnessMap,
          aoMap: ao,
          displacementMap: height,
          displacementScale: 0.05,
          color: new THREE.Color(color),
          metalness: metalness,
          roughness: roughness,
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, basecolor, normal, roughnessMap, ao, height, color, metalness, roughness]);

  useFrame((_, delta) => {
    if (autoRotate && ref.current) {
      ref.current.rotation.y += rotationSpeed * delta;
    }
  });

  return <primitive ref={ref} object={scene} scale={scale} position={position} />;
};

const AudioPlayer = ({ selectedTexture, volume }) => {
  const [audio, setAudio] = useState(null);
  const previousTexture = useRef(selectedTexture);

  const musicTracks = {
    rubber: '/music/rubber.mp3',
    leather: '/music/leather.mp3',
    lava: '/music/lava.mp3',
    gems: '/music/gem.mp3'
  };

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audio) {
      const newAudio = new Audio(musicTracks[selectedTexture]);
      newAudio.loop = true;
      newAudio.volume = volume;
      setAudio(newAudio);
      return;
    }

    // If texture changed, update the audio source
    if (previousTexture.current !== selectedTexture) {
      audio.pause();
      audio.src = musicTracks[selectedTexture];
      previousTexture.current = selectedTexture;
    }

    // Update volume
    audio.volume = volume;

    // Play the audio
    const playPromise = audio.play();
    
    // Handle autoplay restrictions
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio, selectedTexture, volume]);

  return null; // This component doesn't render anything
};

const AudioControls = ({ isPlaying, togglePlay, volume }) => {
  const [pulse, setPulse] = useState(false);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 500 + Math.random() * 500);
    
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  return (
    <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
      {isPlaying && volume > 0 && (
        <div className="flex items-end h-8 space-x-1">
          <div className={`w-1 bg-blue-500 rounded-t transition-all duration-300 ${pulse ? 'h-3' : 'h-6'}`}></div>
          <div className={`w-1 bg-blue-500 rounded-t transition-all duration-300 ${pulse ? 'h-6' : 'h-2'}`}></div>
          <div className={`w-1 bg-blue-500 rounded-t transition-all duration-300 ${pulse ? 'h-2' : 'h-5'}`}></div>
          <div className={`w-1 bg-blue-500 rounded-t transition-all duration-300 ${pulse ? 'h-5' : 'h-3'}`}></div>
        </div>
      )}
      
      <button 
        onClick={togglePlay}
        className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
        aria-label={isPlaying ? "Mute audio" : "Play audio"}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
      </button>
    </div>
  );
};

const Test = () => {
  const [color, setColor] = useState('#ffffff');
  const [metalness, setMetalness] = useState(0.2);
  const [roughness, setRoughness] = useState(0.6);
  const [lightIntensity, setLightIntensity] = useState(0.4);
  const [autoRotate, setAutoRotate] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [showStats, setShowStats] = useState(false);
  const [activeTab, setActiveTab] = useState('appearance');
  const [scale, setScale] = useState(0.1);
  const [position, setPosition] = useState([0, -1, 0]);
  const [showHelpers, setShowHelpers] = useState(false);
  const [selectedTexture, setSelectedTexture] = useState('rubber');
  const [environmentPreset, setEnvironmentPreset] = useState('default');
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const modelRef = useRef();

  const environmentOptions = [
    { name: 'Default', value: 'default' },
    { name: 'Sunset', value: 'sunset' },
    { name: 'Night', value: 'night' },
    { name: 'Morning', value: 'morning' },
    { name: 'Overcast', value: 'overcast' }
  ];

  const textureOptions = [
    { name: 'Rubber', value: 'rubber', description: 'Classic rubber texture for athletic shoes' },
    { name: 'Leather', value: 'leather', description: 'Premium leather texture for formal shoes' },
    { name: 'Lava', value: 'lava', description: 'Casual lava material for everyday wear' },
    { name: 'Gems', value: 'gems', description: 'Breathable mesh texture for sports shoes' },
  ];

  const colorOptions = [
    { name: 'White', value: '#ffffff' },
    { name: 'Red', value: '#ff0000' },
    { name: 'Blue', value: '#0000ff' },
    { name: 'Green', value: '#00ff00' },
    { name: 'Black', value: '#000000' },
    { name: 'Gold', value: '#FFD700' },
    { name: 'Silver', value: '#C0C0C0' },
  ];

  const handleExportModel = () => {
    if (!modelRef.current) return;
    
    const clonedScene = modelRef.current.clone();
    const exporter = new GLTFExporter();
    const options = {
      binary: true,
      animations: [],
      includeCustomExtensions: false
    };
    
    exporter.parse(
      clonedScene,
      (buffer) => {
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `custom-shoe-${new Date().toISOString().slice(0,10)}.glb`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(link.href), 100);
      },
      (error) => {
        console.error('An error occurred while exporting the model:', error);
        alert('Failed to export model. See console for details.');
      },
      options
    );
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'appearance':
        return (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Material Texture</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {textureOptions.map((textureOpt) => (
                  <button
                    key={textureOpt.value}
                    onClick={() => setSelectedTexture(textureOpt.value)}
                    className={`p-3 rounded-lg transition-all flex flex-col items-center ${
                      selectedTexture === textureOpt.value 
                        ? 'bg-blue-100 ring-2 ring-blue-500' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-medium">{textureOpt.name}</span>
                    <span className="text-xs text-gray-600 text-center mt-1">{textureOpt.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Color Options</h3>
              <div className="flex flex-wrap gap-3 mb-4">
                {colorOptions.map((colorOpt) => (
                  <button
                    key={colorOpt.value}
                    onClick={() => setColor(colorOpt.value)}
                    className={`w-10 h-10 rounded-full transition-all ${
                      color === colorOpt.value ? 'ring-2 ring-offset-2 ring-black' : 'ring-1 ring-gray-300'
                    }`}
                    style={{ backgroundColor: colorOpt.value }}
                    aria-label={colorOpt.name}
                  >
                    {['#ffffff', '#FFD700', '#C0C0C0'].includes(colorOpt.value) && (
                      <span className="text-xs font-bold text-black">{colorOpt.name.charAt(0)}</span>
                    )}
                  </button>
                ))}
                <input 
                  type="color" 
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-10 p-1 rounded-full cursor-pointer"
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Material Properties</h3>
              <div className="space-y-4">
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-gray-700">Metalness</label>
                    <span className="text-sm font-medium text-gray-700">{metalness.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={metalness}
                    onChange={(e) => setMetalness(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-gray-700">Roughness</label>
                    <span className="text-sm font-medium text-gray-700">{roughness.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={roughness}
                    onChange={(e) => setRoughness(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            </div>
          </>
        );
        
      case 'environment':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Environment Preset</h3>
            <div className="grid grid-cols-2 gap-3">
              {environmentOptions.map((env) => (
                <button
                  key={env.value}
                  onClick={() => setEnvironmentPreset(env.value)}
                  className={`p-3 rounded-lg transition-all ${
                    environmentPreset === env.value 
                      ? 'bg-blue-100 ring-2 ring-blue-500' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-medium">{env.name}</span>
                </button>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-3 text-gray-800">Lighting</h3>
            <div className="w-full">
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">Light Intensity</label>
                <span className="text-sm font-medium text-gray-700">{lightIntensity.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={lightIntensity}
                onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <h3 className="text-lg font-semibold mb-3 text-gray-800">Background Music</h3>
            <div className="flex items-center mb-4">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={musicEnabled}
                  onChange={() => {
                    setMusicEnabled(!musicEnabled);
                    if (!musicEnabled) {
                      // When enabling music, also set playing state
                      setMusicPlaying(true);
                    }
                  }}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-700">{musicEnabled ? 'Music Enabled' : 'Music Disabled'}</span>
              </label>
            </div>
            
            {musicEnabled && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">Playback Controls:</span>
                  <button
                    onClick={toggleAudioPlayback}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      musicPlaying
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {musicPlaying ? 'Pause Music' : 'Play Music'}
                  </button>
                </div>
                
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-gray-700">Music Volume</label>
                    <span className="text-sm font-medium text-gray-700">{Math.round(musicVolume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={musicVolume}
                    onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </>
            )}
          </div>
        );
        
      case 'position':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Model Scale & Position</h3>
            
            <div className="w-full">
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">Scale</label>
                <span className="text-sm font-medium text-gray-700">{scale.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.3"
                step="0.01"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            
            <div className="w-full">
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">X Position</label>
                <span className="text-sm font-medium text-gray-700">{position[0].toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={position[0]}
                onChange={(e) => setPosition([parseFloat(e.target.value), position[1], position[2]])}
                className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            
            <div className="w-full">
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">Y Position</label>
                <span className="text-sm font-medium text-gray-700">{position[1].toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="1"
                step="0.1"
                value={position[1]}
                onChange={(e) => setPosition([position[0], parseFloat(e.target.value), position[2]])}
                className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            
            <div className="w-full">
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">Z Position</label>
                <span className="text-sm font-medium text-gray-700">{position[2].toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={position[2]}
                onChange={(e) => setPosition([position[0], position[1], parseFloat(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        );
          
      case 'animation':
        return (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Rotation Controls</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-4 py-2 rounded-lg font-medium shadow transition-colors ${
                    autoRotate
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {autoRotate ? 'Stop Rotation' : 'Start Rotation'}
                </button>
                
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-gray-700">Speed</label>
                    <span className="text-sm font-medium text-gray-700">{rotationSpeed.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={rotationSpeed}
                    onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Debug Tools</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowStats(!showStats)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showStats
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  {showStats ? 'Hide Stats' : 'Show Stats'}
                </button>
                <button
                  onClick={() => setShowHelpers(!showHelpers)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showHelpers
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  {showHelpers ? 'Hide Helpers' : 'Show Helpers'}
                </button>
              </div>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };

  const toggleAudioPlayback = () => {
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-36 pb-10 px-4 md:px-8">
      {musicEnabled && <AudioPlayer selectedTexture={selectedTexture} volume={musicPlaying ? musicVolume : 0} />}
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-gray-800">
          3D Shoe Playground
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Shoe Customizer</h2>
              
              <div className="flex mb-4 overflow-x-auto space-x-2 pb-2">
                <button 
                  onClick={() => setActiveTab('appearance')}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'appearance' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Appearance
                </button>
                <button 
                  onClick={() => setActiveTab('environment')}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'environment' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Environment
                </button>
                <button 
                  onClick={() => setActiveTab('position')}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'position' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Position
                </button>
                <button 
                  onClick={() => setActiveTab('animation')}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'animation' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Animation
                </button>
              </div>
              
              {renderTabContent()}
            </div>
            
            <div className="mt-8 flex justify-center space-x-4">
              <button 
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
                onClick={() => alert('Configuration saved!')}
              >
                Save Configuration
              </button>
              <button 
                className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
                onClick={handleExportModel}
              >
                Export as GLB
              </button>
            </div>
          </div>
          
          <div className="w-full h-full lg:w-2/3 bg-white rounded-xl shadow-lg overflow-hidden relative">
            {musicEnabled && (
              <AudioControls 
                isPlaying={musicPlaying} 
                togglePlay={toggleAudioPlayback} 
                volume={musicVolume} 
              />
            )}
            
            <div className="h-[600px] w-full relative">
              <Canvas shadows camera={{ position: [3, 2, 5], fov: 45 }}>
                {showStats && <Stats />}
                <ambientLight intensity={lightIntensity} />
                
                <CustomEnvironment preset={environmentPreset} />
                
                <Suspense fallback={null}>
                  <ContactShadows 
                    position={[0, -1.8, 0]} 
                    opacity={0.75} 
                    scale={10} 
                    blur={2.5} 
                    far={4} 
                  />
                
                  <ShoeModel 
                    color={color} 
                    metalness={metalness} 
                    roughness={roughness} 
                    autoRotate={autoRotate}
                    rotationSpeed={rotationSpeed}
                    scale={scale}
                    position={position}
                    selectedTexture={selectedTexture}
                    modelRef={modelRef}
                  />
                  
                  {showHelpers && (
                    <>
                      <gridHelper args={[10, 10]} />
                      <axesHelper args={[5]} />
                    </>
                  )}
                </Suspense>
                
                <OrbitControls />
              </Canvas>
              <Suspense fallback={<LoadingSpinner />}>
                <ModelLoader />
              </Suspense>
            </div>
            
            <div className="p-4 bg-gray-50 border-t">
              <p className="text-center text-gray-600">
                Drag to rotate. Scroll to zoom. Right-click to pan.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Try different combinations to create your perfect shoe. When you're satisfied with your design, 
            click "Export as GLB" to download and share it with your friends.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Test;