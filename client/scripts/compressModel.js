// This script converts GLB files to GLTF and applies Draco compression
import gltfPipeline from 'gltf-pipeline';
import fsExtra from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const { glbToGltf, processGltf } = gltfPipeline;

// Get current file directory with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert GLB to GLTF
async function convertGlbToGltf(inputPath) {
  try {
    console.log(`Converting ${inputPath} to GLTF...`);
    const glb = fsExtra.readFileSync(inputPath);
    const results = await glbToGltf(glb);
    
    const outputPath = inputPath.replace('.glb', '.gltf');
    fsExtra.writeJsonSync(outputPath, results.gltf);
    console.log(`GLTF file saved to ${outputPath}`);
    
    return outputPath;
  } catch (error) {
    console.error("Error converting GLB to GLTF:", error);
    throw error;
  }
}

// Function to apply Draco compression to GLTF
async function compressGltf(inputPath) {
  try {
    console.log(`Applying Draco compression to ${inputPath}...`);
    const gltf = fsExtra.readJsonSync(inputPath);
    
    const options = {
      dracoOptions: {
        compressionLevel: 10, // Maximum compression level
        quantizePositionBits: 14, // Try lower values if failing
        quantizeNormalBits: 10,
        quantizeTexcoordBits: 12,
        quantizeColorBits: 8,
        quantizeGenericBits: 12,
        uncompressedFallback: true, // Important: Keep uncompressed data as fallback
      },
    };
    
    const results = await processGltf(gltf, options);
    
    const outputPath = inputPath.replace('.gltf', '-draco.gltf');
    fsExtra.writeJsonSync(outputPath, results.gltf);
    console.log(`Draco compressed GLTF file saved to ${outputPath}`);
    
    return outputPath;
  } catch (error) {
    console.warn(`Warning: Couldn't apply Draco compression to ${inputPath}: ${error.message}`);
    console.log("Using original GLTF file instead.");
    
    // Create a copy as the "draco" version since compression failed
    const outputPath = inputPath.replace('.gltf', '-draco.gltf');
    fsExtra.copySync(inputPath, outputPath);
    
    return outputPath;
  }
}

// Main function to process a GLB file
async function processModel(inputPath) {
  try {
    const gltfPath = await convertGlbToGltf(inputPath);
    const compressedPath = await compressGltf(gltfPath);
    return compressedPath;
  } catch (error) {
    console.error("Error processing model:", error);
    throw error;
  }
}

// Export the functions
export { convertGlbToGltf, compressGltf, processModel };

// If this script is run directly, process the file specified as argument
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const inputPath = process.argv[2];
  
  if (!inputPath) {
    console.error("Please provide a path to a GLB file.");
    process.exit(1);
  }
  
  processModel(inputPath)
    .then(outputPath => {
      console.log(`Model processing complete. Output file: ${outputPath}`);
    })
    .catch(error => {
      console.error("Model processing failed:", error);
      process.exit(1);
    });
}