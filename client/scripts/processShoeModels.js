// This script processes all shoe GLB files in the public folder
import path from 'path';
import fsExtra from 'fs-extra';
import { fileURLToPath } from 'url';
import { processModel } from './compressModel.js';

// Get current file directory with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function processAllShoeModels() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  try {
    // Get all GLB files in public directory
    const files = fsExtra.readdirSync(publicDir);
    const glbFiles = files.filter(file => file.endsWith('.glb'));
    
    if (glbFiles.length === 0) {
      console.log('No GLB files found in public directory.');
      return;
    }
    
    console.log(`Found ${glbFiles.length} GLB file(s) to process.`);
    
    // Process each GLB file
    for (const file of glbFiles) {
      const inputPath = path.join(publicDir, file);
      console.log(`Processing ${file}...`);
      const outputPath = await processModel(inputPath);
      console.log(`Successfully processed ${file} -> ${path.basename(outputPath)}`);
    }
    
    console.log('All models processed successfully.');
  } catch (error) {
    console.error('Error processing models:', error);
    process.exit(1);
  }
}

// Run the function if this script is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  processAllShoeModels();
}

export { processAllShoeModels };