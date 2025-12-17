/* ==========================================
   Global JavaScript - AutoSaline
   Language switching, navigation, and animations
   ========================================== */

// Language Management
const translations = {
    en: 'en',
    cn: 'cn'
};

let currentLang = 'en';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
    initNavigation();
    initScrollEffects();
    initAnimations();
});

// ==========================================
// Language System
// ==========================================

function initLanguage() {
    const langSwitch = document.getElementById('langSwitch');
    const savedLang = localStorage.getItem('language') || 'en';
    
    currentLang = savedLang;
    updateLanguageDisplay();
    
    if (langSwitch) {
        langSwitch.addEventListener('click', toggleLanguage);
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'cn' : 'en';
    localStorage.setItem('language', currentLang);
    updateLanguageDisplay();
}

function updateLanguageDisplay() {
    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = currentLang === 'en' ? 'EN' : '中文';
    }
    
    // Update all elements with language attributes
    const elements = document.querySelectorAll('[data-en][data-cn]');
    elements.forEach(element => {
        const text = currentLang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-cn');
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });
}

// ==========================================
// Navigation System
// ==========================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
    
    // Active link highlighting
    setActiveNavLink();
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// Scroll Effects
// ==========================================

function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in, .card, .mission-card, .number-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// Animations
// ==========================================

function initAnimations() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ==========================================
// Utility Functions
// ==========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Number animation with easing
function animateNumber(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        // Format number based on value
        let displayValue;
        if (end >= 1000) {
            displayValue = Math.floor(current).toLocaleString();
        } else if (end < 10) {
            displayValue = current.toFixed(1);
        } else {
            displayValue = Math.floor(current);
        }
        
        element.textContent = displayValue;
    }, 16);
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==========================================
// Export functions for use in page-specific scripts
// ==========================================

window.appUtils = {
    animateNumber,
    isInViewport,
    debounce,
    throttle,
    currentLang: () => currentLang
};
