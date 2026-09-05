import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generateIco() {
  const publicDir = path.resolve('public');
  const appDir = path.resolve('app');

  // Read PNGs or generate 16, 32, 48
  const p16 = await sharp(path.join(publicDir, 'favicon-16x16.png')).toBuffer();
  const p32 = await sharp(path.join(publicDir, 'favicon-32x32.png')).toBuffer();
  const p48 = await sharp(path.join(publicDir, 'apple-touch-icon.png')).resize(48, 48).toBuffer();

  const images = [
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 },
  ];

  // Calculate ICO header & entries
  const numImages = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const headerAndDirsSize = headerSize + numImages * dirEntrySize;

  let currentOffset = headerAndDirsSize;
  const entries = [];

  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width, 0);
    entry.writeUInt8(img.height, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // image size
    entry.writeUInt32LE(currentOffset, 12); // image offset
    entries.push(entry);
    currentOffset += img.buffer.length;
  }

  const icoHeader = Buffer.alloc(headerSize);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // icon type
  icoHeader.writeUInt16LE(numImages, 4); // count

  const icoBuffer = Buffer.concat([
    icoHeader,
    ...entries,
    ...images.map(img => img.buffer)
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  fs.copyFileSync(path.join(publicDir, 'favicon.svg'), path.join(appDir, 'favicon.svg'));

  console.log("favicon.ico generated and placed in /public and /app!");
}

generateIco().catch(console.error);
