// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Form submission
    document.querySelector('.contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
    });

    // Add initial fade-in class to elements
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelector('.hero .fade-in').classList.add('visible');
        }, 200);
    });

// Parallax effect for hero shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    const heroShapes = document.querySelector('.hero');
    if (heroShapes) {
        heroShapes.style.transform = `translateY(${parallax}px)`;
    }
});

// Interactive hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Counter animation for stats (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Color theme switcher (bonus feature)
function switchTheme(theme) {
    const root = document.documentElement;
    
    switch(theme) {
        case 'dark':
            root.style.setProperty('--primary-cyan', '#00B8A3');
            root.style.setProperty('--primary-yellow', '#B8C42D');
            break;
        case 'light':
        default:
            root.style.setProperty('--primary-cyan', '#00D4B8');
            root.style.setProperty('--primary-yellow', '#D4ED30');
            break;
    }
}

// Performance optimization - Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Error handling for form
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Enhanced form submission
document.querySelector('.form-button').addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.querySelector('.contact-form');
    
    if (validateForm(form)) {
        // Show loading state
        e.target.textContent = 'Enviando...';
        e.target.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            e.target.textContent = '¡Enviado!';
            e.target.style.background = '#22C55E';
            
            setTimeout(() => {
                e.target.textContent = 'Siguiente';
                e.target.disabled = false;
                e.target.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    } else {
        // Shake animation for invalid form
        form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            form.style.animation = '';
        }, 500);
    }
});

// Add CSS for form validation and animations
const additionalStyles = `
    .form-input.error,
    .form-select.error {
        border: 2px solid #ef4444;
        box-shadow: 0 2px 15px rgba(239, 68, 68, 0.3);
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-yellow);
        outline-offset: 2px;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    /* Loading states */
    .form-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    /* Enhanced animations */
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .hero::before {
        animation: float 6s ease-in-out infinite;
    }
    
    .hero::after {
        animation: float 4s ease-in-out infinite reverse;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--primary-cyan);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--primary-blue);
    }
    
    /* Print styles */
    @media print {
        .header, .footer, .cta-button, .form-button {
            display: none;
        }
        
        .hero {
            min-height: auto;
            padding: 2rem 0;
        }
        
        * {
            color: black !important;
            background: white !important;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

console.log('176lab website loaded successfully! 🚀');