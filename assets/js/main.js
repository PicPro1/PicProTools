document.addEventListener("DOMContentLoaded", () => {

  // Image Tools data (ONLY image tools)
  const imageTools = [
    { name: "Image Converter", description: "Convert images between JPG, PNG, WebP" },
    { name: "Image Compressor", description: "Reduce image file size" },
    { name: "Image Resizer", description: "Resize images to specific dimensions" },
    { name: "Image Cropper", description: "Crop images to remove unwanted areas" },
    { name: "Image to Text (OCR)", description: "Extract text from images" },
    { name: "Image Rotator/Flipper", description: "Rotate or flip images" }
  ];

  // All tools (used later for search/filter)
  const allTools = [...imageTools];

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenuBtn.innerHTML = navLinks.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }

});
