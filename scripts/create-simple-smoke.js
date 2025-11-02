const fs = require('fs');
const path = require('path');

// Create a simple grayscale PNG with radial gradient effect
// This is a minimal 256x256 PNG with a smoke-like gradient
function createSimpleSmokePNG() {
  const size = 256;
  const center = size / 2;
  
  // Create pixel data (RGBA)
  const pixels = [];
  
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Calculate distance from center
      const dx = x - center;
      const dy = y - center;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = center;
      
      // Create radial gradient
      let alpha = Math.max(0, 1 - (distance / maxDistance));
      alpha = Math.pow(alpha, 2); // Make it softer
      
      // Add some noise/variation
      const noise = Math.random() * 0.3;
      alpha = Math.max(0, Math.min(1, alpha + noise - 0.15));
      
      // Gray value
      const gray = Math.floor(180 + Math.random() * 40);
      
      pixels.push(gray, gray, gray, Math.floor(alpha * 255));
    }
  }
  
  return Buffer.from(pixels);
}

// Simple PNG encoder (creates a valid PNG file)
function createPNG(width, height, pixelData) {
  const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // Helper to create chunks
  function createChunk(type, data) {
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length, 0);
    
    const chunk = Buffer.concat([
      Buffer.from(type, 'ascii'),
      data
    ]);
    
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(chunk) >>> 0, 0);
    
    return Buffer.concat([length, chunk, crc]);
  }
  
  // CRC32 calculation
  function crc32(buf) {
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      crc = crc ^ buf[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ (0xEDB88320 & -(crc & 1));
      }
    }
    return crc ^ -1;
  }
  
  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8);  // bit depth
  ihdr.writeUInt8(6, 9);  // color type (RGBA)
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace
  
  // IDAT chunk (compressed pixel data)
  const zlib = require('zlib');
  
  // Add filter byte (0 = none) to each scanline
  const scanlines = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    scanlines[y * (width * 4 + 1)] = 0; // filter byte
    pixelData.copy(scanlines, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  
  const compressed = zlib.deflateSync(scanlines);
  
  // IEND chunk
  const iend = Buffer.alloc(0);
  
  return Buffer.concat([
    PNG_SIGNATURE,
    createChunk('IHDR', ihdr),
    createChunk('IDAT', compressed),
    createChunk('IEND', iend)
  ]);
}

// Create and save the smoke texture
const pixelData = createSimpleSmokePNG();
const pngBuffer = createPNG(256, 256, pixelData);

const texturesDir = path.join(__dirname, '..', 'public', 'textures');
if (!fs.existsSync(texturesDir)) {
  fs.mkdirSync(texturesDir, { recursive: true });
}

const outputPath = path.join(texturesDir, 'smoke.png');
fs.writeFileSync(outputPath, pngBuffer);

console.log(`✓ Smoke texture created at ${outputPath}`);
console.log('  For a better quality texture, open scripts/generate-smoke.html in your browser.');

