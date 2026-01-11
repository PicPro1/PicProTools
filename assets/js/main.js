// PicProTools - Main JavaScript File
// This file contains functionality for the landing page and general site features

(function() {
    'use strict';

    // DOM ready function
    function domReady(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }

    // Initialize everything when DOM is ready
    domReady(function() {
        initializeMobileMenu();
        initializeSmoothScrolling();
        setCurrentYear();
        initializeToolCards();
        initializeTrustSignals();
        initializeSupportButtons();
    });

    // Mobile Menu Functionality
    function initializeMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        if (!hamburger || !navLinks) return;
        
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            this.setAttribute('aria-expanded', this.classList.contains('active'));
            
            // Toggle body scroll when menu is open
            document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navLinks.contains(event.target) || hamburger.contains(event.target);
            
            if (!isClickInsideMenu && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    function initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(event) {
                const targetId = this.getAttribute('href');
                
                // Skip if it's just "#" or empty
                if (targetId === '#' || !targetId) return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    event.preventDefault();
                    
                    // Close mobile menu if open
                    const hamburger = document.querySelector('.hamburger');
                    const navLinks = document.querySelector('.nav-links');
                    if (hamburger && hamburger.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navLinks.classList.remove('active');
                        hamburger.setAttribute('aria-expanded', 'false');
                        document.body.style.overflow = '';
                    }
                    
                    // Calculate header height for offset
                    const header = document.querySelector('.main-header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page jump
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    // Set Current Year in Footer
    function setCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // Enhance Tool Cards with Additional Functionality
    function initializeToolCards() {
        const toolCards = document.querySelectorAll('.tool-card');
        
        toolCards.forEach(card => {
            // Add keyboard support
            card.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.click();
                }
            });
            
            // Add subtle animation on hover
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
            
            // Add focus styles for accessibility
            card.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--primary-color)';
                this.style.outlineOffset = '2px';
            });
            
            card.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }

    // Animate Trust Signals on Scroll
    function initializeTrustSignals() {
        const trustSignals = document.querySelector('.trust-signals');
        
        if (!trustSignals || !window.IntersectionObserver) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.trust-item');
                    items.forEach((item, index) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(trustSignals);
    }

    // Support Buttons with Analytics Tracking (optional)
    function initializeSupportButtons() {
        const supportButtons = document.querySelectorAll('.btn-support');
        
        supportButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                // Optional: Add analytics tracking here
                console.log('Support button clicked:', this.textContent.trim());
                // Example: ga('send', 'event', 'Support', 'click', this.textContent.trim());
            });
        });
    }

    // Add Sticky Header Behavior on Scroll
    function initializeStickyHeader() {
        const header = document.querySelector('.main-header');
        
        if (!header) return;
        
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            // Add shadow when scrolled
            if (currentScrollY > 10) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            }
            
            // Hide/show header on scroll direction (optional)
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Initialize sticky header
    window.addEventListener('load', function() {
        initializeStickyHeader();
    });

    // Add Loading State for Buttons (prevents double-clicks)
    document.addEventListener('click', function(event) {
        const button = event.target.closest('.btn');
        
        if (button && !button.classList.contains('btn-support')) {
            // Add loading state for non-support buttons
            button.classList.add('loading');
            button.innerHTML = '<span>Processing...</span>';
            
            // Reset after 2 seconds (for demo purposes)
            setTimeout(() => {
                button.classList.remove('loading');
                if (button.classList.contains('btn-primary')) {
                    button.innerHTML = 'Explore Tools';
                } else if (button.classList.contains('btn-secondary')) {
                    button.innerHTML = 'Learn More';
                }
            }, 2000);
        }
    });

    // Add CSS for loading state
    const style = document.createElement('style');
    style.textContent = `
        .btn.loading {
            position: relative;
            color: transparent !important;
        }
        
        .btn.loading::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            top: 50%;
            left: 50%;
            margin-top: -10px;
            margin-left: -10px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Performance optimization: Defer non-critical images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // Handle page visibility changes (pause animations when not visible)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page is hidden
            document.body.classList.add('page-hidden');
        } else {
            // Page is visible again
            document.body.classList.remove('page-hidden');
        }
    });

    // Error handling for broken images
    document.addEventListener('error', function(event) {
        if (event.target.tagName === 'IMG') {
            event.target.style.display = 'none';
            console.warn('Image failed to load:', event.target.src);
        }
    }, true);

    // Export public API if needed
    window.PicProTools = window.PicProTools || {};
    window.PicProTools.utils = {
        closeMobileMenu: function() {
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        },
        
        scrollToSection: function(sectionId) {
            const targetElement = document.querySelector(sectionId);
            if (targetElement) {
                const header = document.querySelector('.main-header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    // Console welcome message (remove in production if desired)
    console.log('%c📸 PicProTools %c- Free Online Image Tools', 
        'background: #4361ee; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
        'color: #4361ee; font-weight: bold;'
    );
    console.log('All tools are 100% free, no login required. Images are processed locally in your browser.');

})();
