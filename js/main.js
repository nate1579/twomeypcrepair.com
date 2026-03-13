// Main JavaScript for Twomey PC Repair Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initScrollAnimations();
    initActiveNavigation();
    initSmoothScrolling();
    initFormEnhancements();
    updateCopyrightYear();
    initHeaderScroll();
    initPhoneNumberFormatting();
    initStatsCounter();
    initBackToTop();
    initBusinessHours();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                // Reset hamburger icon
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                // Reset hamburger icon
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// Scroll Animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
    animatedElements.forEach(el => observer.observe(el));
    
    // Stagger animations for card grids
    const cardGrids = document.querySelectorAll('.grid .card, .grid .service-card, .grid .feature-card');
    cardGrids.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Active Navigation Highlighting
function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a, .mobile-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Enhancements
function initFormEnhancements() {
    // Add loading states to forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
            }
        });
    });
    
    // Auto-format phone numbers
    const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="phone"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 10) {
                value = value.substring(0, 10);
                this.value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
            } else if (value.length >= 6) {
                this.value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
            } else if (value.length >= 3) {
                this.value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
            } else {
                this.value = value;
            }
        });
    });
    
    // Form validation
    const requiredFields = document.querySelectorAll('input[required], textarea[required], select[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// Field Validation
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (!phoneRegex.test(value) && value.replace(/\D/g, '').length !== 10) {
            isValid = false;
            errorMessage = 'Please enter a valid 10-digit phone number';
        }
    }
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add or remove error class and message
    if (isValid) {
        field.classList.remove('error');
    } else {
        field.classList.add('error');
        
        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorElement);
    }
    
    return isValid;
}

// Update Copyright Year
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.copyright-year');
    
    copyrightElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Phone Number Formatting
function initPhoneNumberFormatting() {
    // Make all phone numbers clickable
    const phoneNumbers = document.querySelectorAll('a[href^="tel:"]');
    phoneNumbers.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone clicks (you can add analytics here)
            console.log('Phone number clicked:', this.href);
        });
    });
}

// Utility Functions

// Add loading spinner
function showLoadingSpinner(element) {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '<div class="spinner"></div>';
    element.appendChild(spinner);
}

// Remove loading spinner
function hideLoadingSpinner(element) {
    const spinner = element.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}

// Toast notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Debounce function for scroll events
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

// Parallax effect for hero background (optional enhancement)
function initParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', debounce(() => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        }, 16));
    }
}

// Initialize additional features
window.addEventListener('load', function() {
    // Any additional initialization after page load
    initParallax();
    
    // Preload critical images
    const criticalImages = [
        'assets/images/logo.png',
        'assets/images/computer-repair.jpg',
        'assets/images/phone-repair.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Add error styles to CSS if they don't exist
const errorStyles = `
.form-control.error {
    border-color: #dc3545;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid var(--primary-orange);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

// Add styles to head if they don't exist
if (!document.querySelector('#dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'dynamic-styles';
    style.textContent = errorStyles;
    document.head.appendChild(style);
}

// Stats Counter Animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number[data-target]');
    
    const animateCounter = (stat) => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }, 100));
    
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Business Hours Badge
function initBusinessHours() {
    const badge = document.querySelector('.business-status-badge');
    const statusText = document.querySelector('.status-text');
    
    if (!badge || !statusText) return;
    
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    
    // Business hours: Mon-Fri 8AM-5PM (closed weekends)
    const isWeekday = day >= 1 && day <= 5;
    const isBusinessHour = hour >= 8 && hour < 17;
    const isOpen = isWeekday && isBusinessHour;
    
    if (isOpen) {
        statusText.textContent = 'Open Today 8AM-5PM';
        badge.classList.remove('closed');
    } else if (isWeekday) {
        // Weekday but outside business hours
        if (hour < 8) {
            statusText.textContent = 'Opens at 8AM Today';
        } else {
            statusText.textContent = 'Closed - Opens 8AM Tomorrow';
        }
        badge.classList.add('closed');
    } else {
        // Weekend
        const nextMonday = new Date(now);
        nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7 || 7));
        statusText.textContent = 'Closed - Opens Monday 8AM';
        badge.classList.add('closed');
    }
}