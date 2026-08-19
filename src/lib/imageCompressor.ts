/**
 * High-speed client-side image compressor using HTML5 Canvas
 * Converts heavy raw camera/design images (5MB-10MB) into lightweight WebP (100KB-200KB)
 * for instant loading on web and mobile.
 */

export async function compressImage(
  file: File,
  maxWidth = 1400,
  maxHeight = 1400,
  quality = 0.85
): Promise<Blob> {
  return new Promise((resolve) => {
    // If not an image or SVG/GIF, return as is
    if (!file.type.startsWith("image/") || file.type === "image/svg+xml" || file.type === "image/gif") {
      resolve(file);
      return;
    }

    const img = document.createElement("img");
    const reader = new FileReader();

    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        img.src = e.target.result;
      } else {
        resolve(file);
      }
    };

    img.onload = () => {
      let { width, height } = img;

      // Calculate proportional dimensions
      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        resolve(file);
        return;
      }

      // Smooth interpolation for crisp kawaii colors
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob && blob.size < file.size) {
            resolve(blob);
          } else {
            resolve(file); // fallback to original if compression didn't reduce size
          }
        },
        "image/webp",
        quality
      );
    };

    img.onerror = () => resolve(file);
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}
