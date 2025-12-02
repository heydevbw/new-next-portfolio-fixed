const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const videosDir = path.join(__dirname, '../public/videos');
const output = path.join(__dirname, '../public/gallery.json');

function scanDir(dir, type) {
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => !f.startsWith('.')).map(f => ({
    src: `/${type}/${f}`,
    type,
    title: f
  })) : [];
}

const data = [
  ...scanDir(imagesDir, 'images'),
  ...scanDir(videosDir, 'videos')
];

fs.writeFileSync(output, JSON.stringify(data, null, 2));
console.log('✅ Gallery generated with', data.length, 'items');
