import React, { useState, useEffect } from 'react';
import DracoModelViewer from '../components/DracoViewer/DracoModelViewer';

const CompressedModelTest = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({});

  // Simulated function to fetch file sizes (in a real app, this would come from the server)
  const getFileSizes = async () => {
    // This is simulated data - in a real application you would fetch this from your server
    return {
      'shoe.glb': '2.5 MB',
      'shoe.gltf': '3.2 MB',
      'shoe-draco.gltf': '0.8 MB',
    };
  };

  useEffect(() => {
    // In a real app, you would scan the directory or fetch from an API
    const getAvailableModels = async () => {
      setIsLoading(true);
      
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // We only have shoe-draco.gltf available in the public folder
      const availableModels = [
        { name: 'Shoe 1', path: '/yellow_shoe-draco.gltf' },
      ];
      
      setModels(availableModels);
      
      if (availableModels.length > 0) {
        setSelectedModel(availableModels[0].path);
      }
      
      // Get file size statistics
      const sizes = await getFileSizes();
      setStats(sizes);
      
      setIsLoading(false);
    };
    
    getAvailableModels();
  }, []);

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Compressed Model Viewer</h1>
      
      <div className="mb-8 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">File Size Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Model</th>
                <th className="px-4 py-2 text-left">GLB Size</th>
                <th className="px-4 py-2 text-left">GLTF Size</th>
                <th className="px-4 py-2 text-left">Draco GLTF Size</th>
                <th className="px-4 py-2 text-left">Compression Ratio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Shoe 1</td>
                <td className="px-4 py-2">{stats['shoe.glb'] || '...'}</td>
                <td className="px-4 py-2">{stats['shoe.gltf'] || '...'}</td>
                <td className="px-4 py-2">{stats['shoe-draco.gltf'] || '...'}</td>
                <td className="px-4 py-2">
                  {stats['shoe.glb'] && stats['shoe-draco.gltf'] 
                    ? `~68% reduction` 
                    : '...'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Note: Draco compression significantly reduces file size while maintaining visual quality,
          resulting in faster loading times and reduced bandwidth usage.
        </p>
      </div>
      
      <div className="mb-4">
        <label htmlFor="model-select" className="block text-lg font-medium mb-2">
          Select Model:
        </label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={handleModelChange}
          className="px-4 py-2 border rounded-md w-full"
          disabled={isLoading || models.length <= 1}
        >
          {models.map((model, index) => (
            <option key={index} value={model.path}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-[500px] bg-gray-100">
            <p className="text-lg">Loading models...</p>
          </div>
        ) : selectedModel ? (
          <DracoModelViewer modelPath={selectedModel} />
        ) : (
          <div className="flex items-center justify-center h-[500px] bg-gray-100">
            <p className="text-lg">No models available.</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">How to Process Your Own Models</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="mb-2">To process and compress your own GLB models, run:</p>
          <pre className="bg-gray-800 text-white p-4 rounded-md mb-4 overflow-x-auto">
            node scripts/processShoeModels.js
          </pre>
          
          <p className="mb-2">Or to process a specific model, run:</p>
          <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
            node scripts/compressModel.js path/to/your/model.glb
          </pre>
          
          <p className="mt-4 text-sm text-red-600">
            Note: The compression script encountered errors with some models. Not all GLB files 
            are suitable for direct Draco compression. It may require special handling for complex models.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompressedModelTest;