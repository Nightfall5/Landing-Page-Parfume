/*
   LUXU Perfume Website - Animation Engine
   Developed by Rayhan Adhyfa Firdaus Team
   Advanced animations and visual interactions
*/

// Animation management class
class LuxuAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupParallaxEffects();
        this.setupCounterAnimations();
        this.setupImageLazyLoading();
    }
    
    // Setup animasi saat scroll
    setupScrollAnimations() {
        // Intersection Observer untuk reveal animations
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe semua element yang akan dianimasi
        const animatedElements = document.querySelectorAll(
            '.product-card, .contact-item, .stat-item, .about-img'
        );
        
        animatedElements.forEach(el => {
            // Set initial state
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            revealObserver.observe(el);
        });
    }
    
    // Animasi individual element
    animateElement(element) {
        // Delay berdasarkan posisi element
        const delay = this.calculateAnimationDelay(element);
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            
            // Tambah class untuk animasi khusus
            element.classList.add('animated');
            
            // Trigger callback animations jika ada
            this.triggerSpecialAnimations(element);
        }, delay);
    }
    
    // Hitung delay animasi berdasarkan posisi
    calculateAnimationDelay(element) {
        const rect = element.getBoundingClientRect();
        const index = Array.from(element.parentChildren || []).indexOf(element);
        return Math.min(index * 100, 300); // Max 300ms delay
    }
    
    // Setup hover effects
    setupHoverEffects() {
        // Product card hover effects
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            this.addCardHoverEffect(card);
        });
        
        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            this.addButtonHoverEffect(btn);
        });
        
        // Navigation link effects
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            this.addNavLinkEffect(link);
        });
    }
    
    // Tambah hover effect ke product card
    addCardHoverEffect(card) {
        let hoverTimeout;
        
        card.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            
            // Scale image dan show overlay
            const image = card.querySelector('.product-image');
            const overlay = card.querySelector('.product-overlay');
            
            if (image) {
                image.style.transform = 'scale(1.1) rotate(2deg)';
            }
            
            if (overlay) {
                overlay.style.opacity = '1';
                
                // Animate button dari bawah
                const button = overlay.querySelector('.product-view-btn');
                if (button) {
                    button.style.transform = 'translateY(0)';
                }
            }
            
            // Card shadow dan lift effect
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.25)';
        });
        
        card.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                const image = card.querySelector('.product-image');
                const overlay = card.querySelector('.product-overlay');
                
                if (image) {
                    image.style.transform = 'scale(1) rotate(0deg)';
                }
                
                if (overlay) {
                    overlay.style.opacity = '0';
                    
                    const button = overlay.querySelector('.product-view-btn');
                    if (button) {
                        button.style.transform = 'translateY(20px)';
                    }
                }
                
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            }, 50);
        });
    }
    
    // Tambah hover effect ke button
    addButtonHoverEffect(button) {
        button.addEventListener('mouseenter', () => {
            // Ripple effect
            this.createRippleEffect(button);
            
            // Scale dan glow effect
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click animation
        button.addEventListener('click', (e) => {
            this.createClickAnimation(button, e);
        });
    }
    
    // Ripple effect untuk button
    createRippleEffect(button) {
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Remove ripple setelah animasi selesai
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Click animation
    createClickAnimation(button, event) {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const clickRipple = document.createElement('span');
        clickRipple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: translate(-50%, -50%);
            animation: click-ripple 0.4s ease-out;
            pointer-events: none;
        `;
        
        button.appendChild(clickRipple);
        
        setTimeout(() => {
            clickRipple.remove();
        }, 400);
    }
    
    // Navigation link effect
    addNavLinkEffect(link) {
        link.addEventListener('mouseenter', () => {
            // Underline animation sudah ada di CSS
            // Tambah subtle glow effect
            link.style.textShadow = '0 0 8px rgba(212, 175, 55, 0.3)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.textShadow = 'none';
        });
    }
    
    // Setup parallax effects
    setupParallaxEffects() {
        let ticking = false;
        
        const parallaxElements = [
            {
                element: document.querySelector('.hero-background'),
                speed: 0.5
            },
            {
                element: document.querySelector('.about-image::before'),
                speed: 0.3
            }
        ];
        
        const updateParallax = () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(item => {
                if (item.element) {
                    const yPos = -(scrollTop * item.speed);
                    item.element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            });
            
            ticking = false;
        };
        
        const requestParallaxUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestParallaxUpdate);
    }
    
    // Setup counter animations
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Animasi counter naik dari 0
    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const suffix = element.textContent.replace(/\d/g, '');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        };
        
        updateCounter();
    }
    
    // Setup lazy loading untuk images
    setupImageLazyLoading() {
        const images = document.querySelectorAll('img[src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Fade in effect
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Trigger special animations berdasarkan element type
    triggerSpecialAnimations(element) {
        if (element.classList.contains('product-card')) {
            this.animateProductCard(element);
        } else if (element.classList.contains('stat-item')) {
            this.animateStatItem(element);
        }
    }
    
    // Animasi khusus untuk product card
    animateProductCard(card) {
        const image = card.querySelector('.product-image');
        const info = card.querySelector('.product-info');
        
        if (image) {
            setTimeout(() => {
                image.style.transform = 'scale(1)';
                image.style.filter = 'brightness(1)';
            }, 200);
        }
        
        if (info) {
            setTimeout(() => {
                info.style.opacity = '1';
                info.style.transform = 'translateY(0)';
            }, 400);
        }
    }
    
    // Animasi khusus untuk stat item
    animateStatItem(stat) {
        const number = stat.querySelector('.stat-number');
        if (number) {
            // Counter animation sudah dihandle di setupCounterAnimations
            setTimeout(() => {
                stat.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                stat.style.borderLeft = '4px solid var(--primary-color)';
            }, 500);
        }
    }
}

// Smooth scroll behavior dengan easing
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        // Enhanced smooth scrolling dengan custom easing
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.scrollToElement(target);
                }
            });
        });
    }
    
    scrollToElement(element, offset = 70) {
        const elementPosition = element.offsetTop - offset;
        const startPosition = window.pageYOffset;
        const distance = elementPosition - startPosition;
        const duration = Math.min(Math.abs(distance) / 2, 1000); // Max 1 second
        let start = null;
        
        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            
            window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
}

// Page transition effects
class PageTransitions {
    constructor() {
        this.init();
    }
    
    init() {
        // Fade in effect saat page load
        this.fadeInPage();
        
        // Setup page visibility API untuk pause/resume animations
        this.setupVisibilityControl();
    }
    
    fadeInPage() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    }
    
    setupVisibilityControl() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations ketika tab tidak aktif
                document.body.style.animationPlayState = 'paused';
            } else {
                // Resume animations ketika tab aktif kembali
                document.body.style.animationPlayState = 'running';
            }
        });
    }
}

// Initialize semua animasi setelah DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    new LuxuAnimations();
    new SmoothScroll();
    new PageTransitions();
    new SnowAnimation();
    new MouseStarEffect();
});

// Snow Animation Class
class SnowAnimation {
    constructor() {
        this.snowContainer = document.getElementById('snow-container');
        this.snowflakes = [];
        this.maxSnowflakes = 50;
        this.init();
    }
    
    init() {
        if (!this.snowContainer) return;
        
        // Create initial snowflakes
        this.createSnowflakes();
        
        // Start animation loop
        this.startSnowfall();
        
        // Pause/resume based on page visibility
        this.setupVisibilityControl();
    }
    
    createSnowflakes() {
        const snowflakeSymbols = ['❄', '❅', '❆', '✦', '✧', '✨'];
        
        for (let i = 0; i < this.maxSnowflakes; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
            
            // Random positioning
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.animationDelay = Math.random() * 10 + 's';
            snowflake.style.animationDuration = (Math.random() * 10 + 8) + 's';
            
            // Random size variation
            const size = Math.random() * 0.8 + 0.6;
            snowflake.style.fontSize = size + 'rem';
            
            // Random opacity
            snowflake.style.opacity = Math.random() * 0.6 + 0.3;
            
            this.snowContainer.appendChild(snowflake);
            this.snowflakes.push(snowflake);
        }
    }
    
    startSnowfall() {
        // Snowflakes akan otomatis jatuh dengan CSS animation
        // Kita hanya perlu me-reset posisi ketika mencapai bawah
        setInterval(() => {
            this.resetSnowflakes();
        }, 1000);
    }
    
    resetSnowflakes() {
        this.snowflakes.forEach(snowflake => {
            const rect = snowflake.getBoundingClientRect();
            
            // Reset snowflake yang sudah mencapai bawah
            if (rect.top > window.innerHeight) {
                snowflake.style.left = Math.random() * 100 + '%';
                snowflake.style.animationDelay = '0s';
            }
        });
    }
    
    setupVisibilityControl() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimation();
            } else {
                this.resumeAnimation();
            }
        });
    }
    
    pauseAnimation() {
        this.snowflakes.forEach(snowflake => {
            snowflake.style.animationPlayState = 'paused';
        });
    }
    
    resumeAnimation() {
        this.snowflakes.forEach(snowflake => {
            snowflake.style.animationPlayState = 'running';
        });
    }
    
    // Method untuk mengontrol intensitas salju
    setIntensity(intensity) {
        const newCount = Math.floor(this.maxSnowflakes * intensity);
        
        if (newCount > this.snowflakes.length) {
            // Tambah snowflakes
            const diff = newCount - this.snowflakes.length;
            for (let i = 0; i < diff; i++) {
                this.createSingleSnowflake();
            }
        } else if (newCount < this.snowflakes.length) {
            // Kurangi snowflakes
            const diff = this.snowflakes.length - newCount;
            for (let i = 0; i < diff; i++) {
                const snowflake = this.snowflakes.pop();
                if (snowflake && snowflake.parentNode) {
                    snowflake.parentNode.removeChild(snowflake);
                }
            }
        }
    }
    
    createSingleSnowflake() {
        const snowflakeSymbols = ['❄', '❅', '❆', '✦', '✧', '✨'];
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
        
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDelay = Math.random() * 10 + 's';
        snowflake.style.animationDuration = (Math.random() * 10 + 8) + 's';
        
        const size = Math.random() * 0.8 + 0.6;
        snowflake.style.fontSize = size + 'rem';
        snowflake.style.opacity = Math.random() * 0.6 + 0.3;
        
        this.snowContainer.appendChild(snowflake);
        this.snowflakes.push(snowflake);
    }
    
    // Method untuk stop/start animation
    stop() {
        this.snowflakes.forEach(snowflake => {
            if (snowflake.parentNode) {
                snowflake.parentNode.removeChild(snowflake);
            }
        });
        this.snowflakes = [];
    }
    
    start() {
        if (this.snowflakes.length === 0) {
            this.createSnowflakes();
        }
    }
}

// Mouse Following Stars Effect
class MouseStarEffect {
    constructor() {
        this.stars = ['✦', '✧', '⭐', '✨', '⋆', '★'];
        this.lastMouseMove = 0;
        this.throttleDelay = 100; // milliseconds
        this.init();
    }
    
    init() {
        // Create custom cursor
        this.createCustomCursor();
        
        // Add mouse move listener with throttling
        document.addEventListener('mousemove', (e) => {
            this.updateCursor(e);
            this.throttledCreateStar(e);
        });
        
        // Add hover effects for interactive elements
        this.setupHoverEffects();
    }
    
    createCustomCursor() {
        // Only create on desktop
        if (window.innerWidth <= 768) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        this.cursor = cursor;
    }
    
    updateCursor(e) {
        if (!this.cursor) return;
        
        this.cursor.style.left = e.clientX - 10 + 'px';
        this.cursor.style.top = e.clientY - 10 + 'px';
    }
    
    throttledCreateStar(e) {
        const now = Date.now();
        if (now - this.lastMouseMove < this.throttleDelay) return;
        
        this.lastMouseMove = now;
        this.createStar(e.clientX, e.clientY);
    }
    
    createStar(x, y) {
        // Skip on mobile
        if (window.innerWidth <= 768) return;
        
        const star = document.createElement('div');
        star.className = 'mouse-star';
        
        // Random star symbol
        const randomStar = this.stars[Math.floor(Math.random() * this.stars.length)];
        star.textContent = randomStar;
        
        // Random positioning offset
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;
        
        star.style.left = (x + offsetX) + 'px';
        star.style.top = (y + offsetY) + 'px';
        
        // Random size variation
        const size = Math.random() * 8 + 8; // 8-16px
        star.style.fontSize = size + 'px';
        
        // Occasionally make it sparkle (white)
        if (Math.random() < 0.3) {
            star.classList.add('sparkle');
        }
        
        document.body.appendChild(star);
        
        // Remove after animation completes
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, 2000);
    }
    
    setupHoverEffects() {
        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll(
            'button, a, .product-card, .nav-link, input, textarea'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (this.cursor) {
                    this.cursor.classList.add('hover');
                }
            });
            
            element.addEventListener('mouseleave', () => {
                if (this.cursor) {
                    this.cursor.classList.remove('hover');
                }
            });
        });
    }
    
    // Method to temporarily disable effect
    disable() {
        document.removeEventListener('mousemove', this.throttledCreateStar);
        if (this.cursor) {
            this.cursor.style.display = 'none';
        }
    }
    
    // Method to re-enable effect
    enable() {
        document.addEventListener('mousemove', this.throttledCreateStar);
        if (this.cursor) {
            this.cursor.style.display = 'block';
        }
    }
}

// Add CSS animations via JavaScript (untuk animations yang tidak bisa di-CSS)
const animationStyles = `
    @keyframes ripple-animation {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    @keyframes click-ripple {
        to {
            width: 50px;
            height: 50px;
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .animated {
        animation-fill-mode: both;
    }
    
    /* Utility animations */
    .fade-in {
        animation: fadeIn 0.6s ease forwards;
    }
    
    .slide-up {
        animation: slideUp 0.6s ease forwards;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Performance monitoring untuk animations
const animationPerformance = {
    fps: 0,
    lastTime: performance.now(),
    frameCount: 0,
    
    monitor() {
        const now = performance.now();
        this.frameCount++;
        
        if (now - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
            this.frameCount = 0;
            this.lastTime = now;
            
            // Kurangi animasi jika FPS terlalu rendah
            if (this.fps < 30) {
                document.body.classList.add('reduce-animations');
            } else {
                document.body.classList.remove('reduce-animations');
            }
        }
        
        requestAnimationFrame(() => this.monitor());
    }
};

// Start performance monitoring
requestAnimationFrame(() => animationPerformance.monitor());