/*
   LUXU Perfume Website - Main JavaScript
   Created by Rayhan Adhyfa Firdaus Development Team
   Copyright 2025 LUXU Premium Fragrance
*/

// Global variables for application state
let currentTestimonial = 0;
let isMenuOpen = false;
let scrollPosition = 0;

// Product data for modal details
const productData = {
    'noir': {
        name: 'LUXU Noir',
        price: 'Rp 850.000',
        image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        description: 'LUXU Noir adalah manifestasi ultimate masculine sophistication. Komposisi complex dari Himalayan cedar, rare oriental spices, dan warm amber menciptakan olfactory signature yang powerful namun refined. Dirancang khusus untuk gentlemen visioner yang memahami kekuatan first impression dan ingin meninggalkan lasting impact yang tak terlupakan.',
        notes: {
            top: 'Italian Bergamot, Sicilian Lemon, Madagascar Black Pepper',
            middle: 'Himalayan Cedar, Indonesian Patchouli, French Lavender',
            base: 'Baltic Amber, White Musk, Tahitian Vanilla'
        },
        features: [
            'Exceptional longevity hingga 12+ jam dengan remarkable sillage',
            'Versatile elegance untuk boardroom meetings hingga exclusive soirées',
            'Luxury packaging dengan crystal bottle dan premium gift box',
            'Crafted in Grasse, France dengan rare ingredients berkualitas museum-grade'
        ]
    },
    'rose': {
        name: 'LUXU Rose',
        price: 'Rp 750.000',
        image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        description: 'LUXU Rose adalah poetry in fragrance form - sebuah homage kepada timeless feminine elegance. Featuring Bulgarian rose absolute yang dipetik pada golden hour, diharmonisasikan dengan spring blooms bouquet dan subtle fruity nuances. Masterpiece ini diciptakan untuk sophisticated women yang memancarkan grace, confidence, dan magnetic charm dalam setiap langkahnya.',
        notes: {
            top: 'Damask Rose Petals, Georgian Peach, Pink Peppercorn',
            middle: 'Bulgarian Rose Absolute, Chinese Peony, Sambac Jasmine',
            base: 'Cashmere White Musk, Mysore Sandalwood, Golden Amber'
        },
        features: [
            'Elegant longevity 8-10 jam dengan sophisticated projection',
            'Perfectly balanced floral complexity yang never overwhelming',
            'Hand-blown crystal bottle dengan artistic design eksklusif',
            'Featuring authentic Bulgarian rose oil dari Valley of Roses'
        ]
    },
    'gold': {
        name: 'LUXU Gold',
        price: 'Rp 950.000',
        image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        description: 'LUXU Gold adalah pinnacle of olfactory artistry - limited edition yang merepresentasikan luxury dalam bentuk paling murni. Fusion revolutionary antara zesty citrus bergamot, creamy Madagascar vanilla, dan mysterious golden accord menciptakan unisex masterpiece yang transcends conventional boundaries. Dirancang untuk visionary individuals yang menghargai exclusivity dan dare to be extraordinary.',
        notes: {
            top: 'Pink Grapefruit, Sicilian Mandarin, Proprietary Gold Accord',
            middle: 'Silver Needle White Tea, Crystallized Ginger, Acacia Honey',
            base: 'Madagascar Vanilla Absolute, Cashmere Wood, 24K Golden Amber'
        },
        features: [
            'Ultra-Limited Edition - hanya 500 botol worldwide dengan certificate authenticity',
            'Extraordinary longevity hingga 14+ jam dengan captivating sillage',
            'Revolutionary unisex composition yang adaptable dengan skin chemistry',
            'Collector-grade bottle dengan 24K gold plating dan numbered edition'
        ]
    }
};

// Fungsi untuk mendapatkan gambar produk (centralized image management)
function getProductImage(productKey) {
    const product = productData[productKey];
    return product ? product.image : '';
}

// Fungsi untuk update semua gambar produk jika diperlukan
function updateProductImages() {
    // Update gambar di product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        const productKeys = ['noir', 'rose', 'gold'];
        const productKey = productKeys[index];
        const img = card.querySelector('.product-image');
        if (img && productKey) {
            const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRDRBRjM3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxVWFUgUGVyZnVtZTwvdGV4dD48L3N2Zz4=';

            // Register the fallback before changing src to avoid missing a fast error.
            img.onerror = function() {
                if (this.dataset.fallbackApplied === 'true') {
                    this.style.opacity = '1';
                    console.error('LUXU fallback image could not be loaded:', this.src);
                    return;
                }

                this.dataset.fallbackApplied = 'true';
                console.warn('Product image failed to load; using fallback:', this.src);
                this.src = fallbackImage;
            };

            img.src = getProductImage(productKey);
        }
    });
}

// Product filter functionality
function setupProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class dari semua buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class ke button yang diklik
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.style.animation = 'fadeOut 0.3s ease forwards';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Fungsi yang dijalankan saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi semua fungsi
    initializeApp();
    setupEventListeners();
    handleScrollEffects();
    setupProductFilters();
    updateProductImages();
    
    // Hide loading screen setelah 1 detik
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hide');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }
    }, 1000);
});

// Fungsi inisialisasi aplikasi
function initializeApp() {
    console.log('LUXU Website initialized');
    
    // Check if user sudah pernah berkunjung
    if (!localStorage.getItem('luxu_visited')) {
        // First time visitor - bisa tambahkan welcome message
        localStorage.setItem('luxu_visited', 'true');
        console.log('Welcome to LUXU!');
    }
}

// Setup semua event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
        
        // Close menu ketika klik nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Smooth scrolling untuk internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Close modal ketika klik outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('product-modal');
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation untuk modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        isMenuOpen = !isMenuOpen;
        
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('show');
        
        // Prevent body scrolling ketika menu terbuka
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
}

// Close mobile menu
function closeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu && isMenuOpen) {
        isMenuOpen = false;
        navToggle.classList.remove('active');
        navMenu.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Scroll ke section tertentu
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = 70; // Tinggi header
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Handle scroll effects
function handleScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const header = document.getElementById('header');
        
        // Header background effect
        if (header) {
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Parallax effect untuk hero background (subtle)
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        // Update scroll position
        scrollPosition = scrollTop;
    });
}


// Product modal functions
function showProductDetail(productKey) {
    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;
    
    const product = productData[productKey];
    if (!product) return;
    
    // Generate modal content
    modalBody.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <img src="${getProductImage(productKey)}" alt="${product.name}" style="width: 100%; border-radius: 12px; margin-bottom: 20px;">
            </div>
            <div class="product-detail-info">
                <h2 style="color: var(--text-primary); margin-bottom: 10px;">${product.name}</h2>
                <div style="color: var(--primary-color); font-size: 1.5rem; font-weight: 600; margin-bottom: 20px;">${product.price}</div>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 25px;">${product.description}</p>
                
                <div class="fragrance-notes" style="margin-bottom: 25px;">
                    <h3 style="color: var(--text-primary); margin-bottom: 15px;">Fragrance Notes:</h3>
                    <div style="display: grid; gap: 10px;">
                        <div><strong>Top Notes:</strong> ${product.notes.top}</div>
                        <div><strong>Middle Notes:</strong> ${product.notes.middle}</div>
                        <div><strong>Base Notes:</strong> ${product.notes.base}</div>
                    </div>
                </div>
                
                <div class="product-features" style="margin-bottom: 25px;">
                    <h3 style="color: var(--text-primary); margin-bottom: 15px;">Features:</h3>
                    <ul style="color: var(--text-secondary); padding-left: 20px;">
                        ${product.features.map(feature => `<li style="margin-bottom: 8px;">${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToWishlist('${productKey}')" style="margin-right: 10px;">
                        Add to Wishlist
                    </button>
                    <button class="btn btn-secondary" onclick="contactUs('${productKey}')">
                        Contact for Purchase
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Show modal dengan animasi
    modal.classList.add('show');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Wishlist functionality (menggunakan localStorage)
function addToWishlist(productKey) {
    let wishlist = JSON.parse(localStorage.getItem('luxu_wishlist') || '[]');
    
    if (!wishlist.includes(productKey)) {
        wishlist.push(productKey);
        localStorage.setItem('luxu_wishlist', JSON.stringify(wishlist));
        
        // Show success message
        showNotification('Produk eksklusif berhasil ditambahkan ke collection wishlist Anda!', 'success');
    } else {
        showNotification('Masterpiece ini sudah tersimpan dalam wishlist eksklusif Anda', 'info');
    }
}

// Contact us untuk product tertentu
function contactUs(productKey) {
    const product = productData[productKey];
    if (product) {
        // Scroll ke contact section dan pre-fill message
        scrollToSection('contact');
        
        setTimeout(() => {
            const messageField = document.getElementById('message');
            if (messageField) {
                messageField.value = `Greetings, saya sangat tertarik dengan masterpiece ${product.name} dari koleksi eksklusif LUXU. Bisakah tim consultant memberikan detailed information dan personalized recommendation untuk signature scent yang perfect untuk personality saya?`;
                messageField.focus();
            }
            closeModal();
        }, 1000);
    }
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };
    
    // Validasi sederhana
    if (!data.name || !data.email || !data.message) {
        showNotification('Mohon lengkapi semua informasi yang diperlukan untuk konsultasi eksklusif', 'error');
        return;
    }
    
    // Simulasi pengiriman form (dalam implementasi nyata, kirim ke server)
    showLoadingButton(e.target.querySelector('button[type="submit"]'));
    
    setTimeout(() => {
        hideLoadingButton(e.target.querySelector('button[type="submit"]'));
        showNotification('Terima kasih! Tim fragrance consultant LUXU akan menghubungi Anda dalam 24 jam untuk konsultasi eksklusif.', 'success');
        e.target.reset();
    }, 2000);
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove setelah 5 detik
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function showLoadingButton(button) {
    if (button) {
        button.disabled = true;
        button.innerHTML = 'Mengirim... <div class="loading-spinner" style="display: inline-block; width: 16px; height: 16px; border: 2px solid #ffffff33; border-top: 2px solid #ffffff; border-radius: 50%; animation: spin 1s linear infinite; margin-left: 8px;"></div>';
    }
}

function hideLoadingButton(button) {
    if (button) {
        button.disabled = false;
        button.innerHTML = 'Konsultasi Sekarang';
    }
}

// Initialize AOS-like animations (simplified version)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe semua element dengan data-aos
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Jalankan scroll animations setelah DOM loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Export functions untuk debugging (development only)
if (typeof window !== 'undefined') {
    window.LUXU = {
        scrollToSection,
        showProductDetail,
        toggleMobileMenu,
        // Snow animation controls
        toggleSnow: () => {
            const container = document.getElementById('snow-container');
            if (container) {
                container.style.display = container.style.display === 'none' ? 'block' : 'none';
            }
        },
        setSnowIntensity: (intensity) => {
            if (window.snowAnimation) {
                window.snowAnimation.setIntensity(intensity);
            }
        },
        // Mouse star effect controls
        toggleMouseStars: () => {
            if (window.mouseStarEffect) {
                if (window.mouseStarEffect.enabled) {
                    window.mouseStarEffect.disable();
                    window.mouseStarEffect.enabled = false;
                } else {
                    window.mouseStarEffect.enable();
                    window.mouseStarEffect.enabled = true;
                }
            }
        }
    };
}