import fs from "fs";
import path from "path";
import GalleryClient from "./GalleryClient";
import Header from "./components/Header";
import Footer from "./components/Footer";

// --- Server side function to read local images/videos ---
async function getGalleryItems() {
  const imageDir = path.join(process.cwd(), "public/images");
  const videoDir = path.join(process.cwd(), "public/videos");

  const imageFiles = fs.existsSync(imageDir)
    ? fs
        .readdirSync(imageDir)
        .filter((file) =>
          [".jpg", ".jpeg", ".png", ".gif", ".webp"].some((ext) =>
            file.toLowerCase().endsWith(ext)
          )
        )
    : [];

  const videoFiles = fs.existsSync(videoDir)
    ? fs
        .readdirSync(videoDir)
        .filter((file) =>
          [".mp4", ".webm", ".ogg"].some((ext) =>
            file.toLowerCase().endsWith(ext)
          )
        )
    : [];

  const images = imageFiles.map((file) => ({
    type: "image",
    src: `/images/${file}`,
    alt: file,
  }));

  const videos = videoFiles.map((file) => ({
    type: "video",
    src: `/videos/${file}`,
    alt: file,
  }));

  return { images, videos };
}

// --- Main Page ---
export default async function Page() {
  const { images, videos } = await getGalleryItems();

  return (
    <>
      {/* Pass a few images into Header for collage background */}
      <Header collageImages={images.slice(0, 6)} />

      {/* Gallery Section */}
      <GalleryClient images={images} videos={videos} />

     {/* Footer */}
     <Footer />
    </>
  );
}
