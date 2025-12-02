// scripts/generate-gallery.js
const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "../public/gallery"); // put your images inside public/gallery
const outputFile = path.join(__dirname, "../public/gallery.json");

function generateGallery() {
  if (!fs.existsSync(imagesDir)) {
    console.error("❌ No gallery folder found in /public. Please create public/gallery and add images.");
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir).filter((file) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
  });

  const data = files.map((file) => ({
    src: `/gallery/${file}`,
    alt: file,
  }));

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`✅ Gallery generated with ${files.length} images -> ${outputFile}`);
}

generateGallery();
