/* ==========================================
   Home Page JavaScript - AutoSaline
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    initNumberCounters();
    initParallaxEffects();
});

// ==========================================
// Number Counter Animation
// ==========================================

function initNumberCounters() {
    const numberCards = document.querySelectorAll('.number-card');
    let hasAnimated = false;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateAllNumbers();
                observer.disconnect();
            }
        });
    }, observerOptions);
    
    if (numberCards.length > 0) {
        observer.observe(numberCards[0].parentElement);
    }
}

function animateAllNumbers() {
    const numberValues = document.querySelectorAll('.number-value');
    
    numberValues.forEach(element => {
        const target = parseFloat(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        
        if (window.appUtils && window.appUtils.animateNumber) {
            window.appUtils.animateNumber(element, 0, target, duration);
        }
    });
}

// ==========================================
// Parallax Effects
// ==========================================

function initParallaxEffects() {
    const waves = document.querySelectorAll('.wave');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (waves.length === 0 && !heroVisual) return;
    
    const handleScroll = () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        // Parallax for waves
        waves.forEach((wave, index) => {
            const speed = (index + 1) * 0.3;
            wave.style.transform = `translate3d(0, ${rate * speed}px, 0)`;
        });
        
        // Parallax for hero visual
        if (heroVisual) {
            heroVisual.style.transform = `translate3d(0, ${rate * 0.3}px, 0)`;
        }
    };
    
    // Use throttle for better performance
    if (window.appUtils && window.appUtils.throttle) {
        window.addEventListener('scroll', window.appUtils.throttle(handleScroll, 10));
    } else {
        window.addEventListener('scroll', handleScroll);
    }
}

// ==========================================
// Interactive Card Effects
// ==========================================

// Add tilt effect to mission cards
const missionCards = document.querySelectorAll('.mission-card');
missionCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==========================================
// Scroll Indicator
// ==========================================

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const missionSection = document.querySelector('.mission');
        if (missionSection) {
            missionSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Hide scroll indicator after scrolling
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// ==========================================
// Feature List Stagger Animation
// ==========================================

const featureItems = document.querySelectorAll('.feature-item');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
            featureObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

featureItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'all 0.6s ease';
    featureObserver.observe(item);
});

// ==========================================
// Tech Diagram Interactive
// ==========================================

const techDiagram = document.querySelector('.tech-diagram');
if (techDiagram) {
    const pulseIndicators = techDiagram.querySelectorAll('.pulse-indicator');
    
    pulseIndicators.forEach((indicator, index) => {
        indicator.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(2)';
            this.style.boxShadow = '0 0 20px var(--color-primary)';
        });
        
        indicator.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// ==========================================
// Performance Optimization
// ==========================================

// Preload critical images (if any)
window.addEventListener('load', () => {
    // Add any image preloading logic here if needed
    console.log('Home page fully loaded');
});
