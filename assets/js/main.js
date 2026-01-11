// Image Tools data (ONLY image tools)
        const imageTools = [
            { name: "Image Converter", description: "Convert images between JPG, PNG, WebP, and more formats", icon: "fas fa-exchange-alt" },
            { name: "Image Compressor", description: "Reduce image file size without losing quality", icon: "fas fa-compress-alt" },
            { name: "Image Resizer", description: "Resize images to specific dimensions while maintaining aspect ratio", icon: "fas fa-expand-alt" },
            { name: "Image Cropper", description: "Crop images to remove unwanted areas or focus on specific parts", icon: "fas fa-crop-alt" },
            { name: "Image to Text (OCR)", description: "Extract text from images using optical character recognition", icon: "fas fa-font" },
            { name: "Image Rotator/Flipper", description: "Rotate or flip images horizontally or vertically", icon: "fas fa-sync-alt" }
        ];

        // All tools for search functionality (only image tools)
        const allTools = [...imageTools];

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('
