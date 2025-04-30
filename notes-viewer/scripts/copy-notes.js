import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go up two levels from the script location to get to the parent directory
const sourceDir = path.join(__dirname, '..', '..');
const targetDir = path.join(__dirname, '..', 'public');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Keep track of copied files to avoid duplicates
const copiedFiles = new Set();

// Function to copy directory recursively
const copyDirectory = (source, target) => {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);
  files.forEach(file => {
    // Skip the notes-viewer directory
    if (file === 'notes-viewer') {
      return;
    }

    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    
    // Skip if already copied
    if (copiedFiles.has(sourcePath)) {
      return;
    }

    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else if (file.endsWith('.md')) {
      // Only copy markdown files
      fs.copyFileSync(sourcePath, targetPath);
      copiedFiles.add(sourcePath);
      console.log(`Copied: ${file}`);
    }
  });
};

// Clear the target directory first
if (fs.existsSync(targetDir)) {
  const files = fs.readdirSync(targetDir);
  files.forEach(file => {
    const filePath = path.join(targetDir, file);
    if (fs.statSync(filePath).isDirectory()) {
      fs.rmSync(filePath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(filePath);
    }
  });
}

// Copy all markdown files from the root directory
copyDirectory(sourceDir, targetDir);

console.log('notes copied to public directory'); 