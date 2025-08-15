/**
 * MyGen Wellness Website - Enhanced Interactive JavaScript
 * 
 * This file contains all the interactive functionality for the immersive website.
 * Features include rotating habits, testimonial carousel, smooth scrolling,
 * and various animations that enhance the narrative experience.
 * 
 * FUNCTIONALITY:
 * 1. DOM Content Loading & Initialization
 * 2. Rotating Habits System
 * 3. Navigation & Mobile Menu
 * 4. Testimonials Carousel
 * 5. Smooth Scrolling & Section Navigation
 * 6. Interactive Animations
 * 7. Form Handling & User Actions
 * 8. Utility Functions
 */

/* ===== 1. DOM CONTENT LOADING & INITIALIZATION ===== */
/* Initialize all functionality when the page loads */

document.addEventListener('DOMContentLoaded', function() {
    console.log('MyGen Wellness immersive website loaded successfully!');
    
    // Initialize all core functionality
    initializeNavigation();
    initializeRotatingHabits();
    initializeTestimonials();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeLucideIcons();
    initializeProgressRings();
    
    // Start automatic systems
    startHabitRotation();
    startTestimonialRotation();
});

/* ===== 2. ROTATING HABITS SYSTEM ===== */
/* Handle the rotating daily habits in the app immersion */

// Habits data array with different wellness activities
const dailyHabits = [
    {
        icon: 'droplets',
        title: 'Hydrate Mindfully',
        description: 'Drink 8oz of water and notice how it feels',
        color: 'turquoise',
        progress: 0
    },
    {
        icon: 'footprints',
        title: 'Move Gently',
        description: 'Take a 5-minute walk around your space',
        color: 'green',
        progress: 100
    },
    {
        icon: 'heart',
        title: 'Breathe Deeply',
        description: '3 deep breaths, focusing on the exhale',
        color: 'orange',
        progress: 66
    },
    {
        icon: 'sun',
        title: 'Gratitude Moment',
        description: 'Name one thing you appreciate right now',
        color: 'turquoise',
        progress: 100
    },
    {
        icon: 'moon',
        title: 'Evening Stretch',
        description: 'Gentle neck and shoulder rolls',
        color: 'green',
        progress: 0
    },
    {
        icon: 'apple',
        title: 'Mindful Bite',
        description: 'Eat your next bite slowly and savor it',
        color: 'orange',
        progress: 33
    }
];

let currentHabitIndex = 0;
let habitRotationInterval;

function initializeRotatingHabits() {
    // Set up the initial habit display
    displayCurrentHabit();
    
    // Add click handler to complete button
    const completeBtn = document.getElementById('habitCompleteBtn');
    if (completeBtn) {
        completeBtn.addEventListener('click', completeCurrentHabit);
    }
}

function displayCurrentHabit() {
    const habit = dailyHabits[currentHabitIndex];
    
    // Get habit elements
    const habitIcon = document.getElementById('habitIcon');
    const habitTitle = document.getElementById('habitTitle');
    const habitDescription = document.getElementById('habitDescription');
    const habitProgress = document.getElementById('habitProgress');
    const habitProgressText = document.getElementById('habitProgressText');
    const habitCard = document.getElementById('habitCard');
    
    // Check if elements exist
    if (!habitIcon || !habitTitle || !habitDescription || !habitProgress || !habitProgressText || !habitCard) {
        console.error('Habit elements not found');
        return;
    }
    
    // Add fade out effect
    habitCard.style.opacity = '0.7';
    habitCard.style.transform = 'scale(0.95)';
    
    // Update content after brief delay
    setTimeout(() => {
        // Update icon
        const iconElement = habitIcon.querySelector('i');
        if (iconElement) {
            iconElement.setAttribute('data-lucide', habit.icon);
        }
        
        // Update text content
        habitTitle.textContent = habit.title;
        habitDescription.textContent = habit.description;
        
        // Update progress
        habitProgress.style.width = habit.progress + '%';
        habitProgressText.textContent = habit.progress === 100 ? '1/1 complete' : '0/1 complete';
        
        // Update card color theme
        habitCard.className = `habit-card habit-${habit.color}`;
        
        // Reinitialize icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Fade back in
        habitCard.style.opacity = '1';
        habitCard.style.transform = 'scale(1)';
    }, 200);
    
    console.log('Displaying habit:', habit.title);
}

function completeCurrentHabit() {
    const habit = dailyHabits[currentHabitIndex];
    const habitProgress = document.getElementById('habitProgress');
    const habitProgressText = document.getElementById('habitProgressText');
    const completeBtn = document.getElementById('habitCompleteBtn');
    
    // Animate completion
    if (habit.progress < 100) {
        habit.progress = 100;
        
        // Animate progress bar
        if (habitProgress) {
            habitProgress.style.width = '100%';
        }
        
        // Update progress text
        if (habitProgressText) {
            habitProgressText.textContent = '1/1 complete';
        }
        
        // Animate complete button
        if (completeBtn) {
            completeBtn.style.transform = 'scale(1.2)';
            completeBtn.style.background = 'rgba(16, 185, 129, 0.4)';
            
            setTimeout(() => {
                completeBtn.style.transform = 'scale(1)';
            }, 200);
        }
        
        // Show completion feedback
        showNotification('Great job! Habit completed.', 'success');
        
        console.log('Habit completed:', habit.title);
    }
}

function startHabitRotation() {
    // Rotate habits every 4 seconds
    habitRotationInterval = setInterval(() => {
        currentHabitIndex = (currentHabitIndex + 1) % dailyHabits.length;
        displayCurrentHabit();
    }, 4000);
}

function restartHabitRotation() {
    // Clear existing interval and start new one
    clearInterval(habitRotationInterval);
    startHabitRotation();
}

/* ===== 3. NAVIGATION & MOBILE MENU ===== */
/* Handle navigation interactions and mobile menu toggle */

function initializeNavigation() {
    // Get mobile menu elements
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Mobile menu toggle functionality
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle the mobile menu visibility
            navMenu.classList.toggle('mobile-open');
            
            // Animate the hamburger icon
            this.classList.toggle('active');
            
            console.log('Mobile menu toggled');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link-minimal');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close mobile menu if it's open
            if (navMenu && navMenu.classList.contains('mobile-open')) {
                navMenu.classList.remove('mobile-open');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Handle active navigation state
    updateActiveNavigation();
}

function updateActiveNavigation() {
    // Get current page from URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link-minimal');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* ===== 4. TESTIMONIALS CAROUSEL ===== */
/* Handle testimonial rotation and user interaction */

// Testimonials data array
const testimonials = [
    {
        text: "I've tried every wellness app out there. MyGen is different. It doesn't overwhelm me with a million things to do. It just suggests one tiny thing, and somehow, that's enough.",
        author: "Sarah M.",
        role: "Beta User, 3 months",
        avatar: "S"
    },
    {
        text: "The AI actually gets me. It knows I'm not a morning person, so it suggests evening habits. It knows I travel for work, so it adapts. It's like having a wellness coach who actually pays attention.",
        author: "Marcus R.",
        role: "Beta User, 5 months",
        avatar: "M"
    },
    {
        text: "I was skeptical about another wellness app. But MyGen's approach is so gentle, so smart. I've built more healthy habits in 4 months than I did in the previous 4 years.",
        author: "Dr. Jennifer L.",
        role: "Healthcare Professional",
        avatar: "J"
    }
];

let currentTestimonialIndex = 0;
let testimonialInterval;

function initializeTestimonials() {
    // Display initial testimonial
    showTestimonial(0);
    
    // Add click handlers to dots
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
}

function showTestimonial(index) {
    // Validate index
    if (index < 0 || index >= testimonials.length) {
        console.error('Invalid testimonial index:', index);
        return;
    }
    
    // Update current index
    currentTestimonialIndex = index;
    
    // Get testimonial elements
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    // Hide all testimonials
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Show current testimonial
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
    }
    
    // Update active dot
    dots.forEach((dot, dotIndex) => {
        if (dotIndex === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Restart automatic rotation
    restartTestimonialRotation();
    
    console.log('Showing testimonial:', index);
}

function startTestimonialRotation() {
    // Rotate testimonials every 6 seconds
    testimonialInterval = setInterval(() => {
        const nextIndex = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }, 6000);
}

function restartTestimonialRotation() {
    // Clear existing interval and start new one
    clearInterval(testimonialInterval);
    startTestimonialRotation();
}

/* ===== 5. SMOOTH SCROLLING & SECTION NAVIGATION ===== */
/* Handle smooth scrolling and section navigation */

function initializeSmoothScrolling() {
    // Get all anchor links that start with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just a hash
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            // Find target element
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                scrollToSection(href.substring(1));
            }
        });
    });
}

function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    
    if (targetElement) {
        // Calculate offset for fixed header
        const headerHeight = document.querySelector('.header-minimal').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        // Smooth scroll to target
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        console.log('Smooth scrolling to:', sectionId);
    }
}

/* ===== 6. INTERACTIVE ANIMATIONS ===== */
/* Handle scroll-triggered animations and interactions */

function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element comes into view
                entry.target.classList.add('animate-in');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('benefit-card')) {
                    animateBenefitCard(entry.target);
                } else if (entry.target.classList.contains('stat-item')) {
                    animateStatItem(entry.target);
                } else if (entry.target.classList.contains('principle-item')) {
                    animatePrincipleItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.benefit-card, .stat-item, .principle-item, .testimonial-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add scroll event listener for header background
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Add parallax effect to floating elements
    window.addEventListener('scroll', handleParallaxEffect);
}

function animateBenefitCard(card) {
    // Add staggered animation delay
    const cards = document.querySelectorAll('.benefit-card');
    const index = Array.from(cards).indexOf(card);
    
    setTimeout(() => {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
    }, index * 150);
}

function animateStatItem(item) {
    // Animate the number counting up
    const numberElement = item.querySelector('.stat-number');
    if (numberElement) {
        const finalNumber = parseFloat(numberElement.textContent);
        animateNumber(numberElement, 0, finalNumber, 2000);
    }
}

function animatePrincipleItem(item) {
    // Add slide-in animation
    item.style.transform = 'translateX(0)';
    item.style.opacity = '1';
}

function animateNumber(element, start, end, duration) {
    // Animate number counting from start to end
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentNumber = Math.round(start + (end - start) * easeOutQuart);
        
        element.textContent = currentNumber + '%';
        
        // element.textContent = currentNumber;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function handleHeaderScroll() {
    const header = document.querySelector('.header-minimal');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.8)';
    }
}

function handleParallaxEffect() {
    const scrollY = window.scrollY;
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

/* ===== 7. FORM HANDLING & USER ACTIONS ===== */
/* Handle form submissions and user interactions */

function handleBetaInvitation() {
    console.log('Beta invitation requested');
    
    // Show loading state on buttons
    const betaButtons = document.querySelectorAll('.btn-primary-immersive, .btn-primary-large');
    betaButtons.forEach(button => {
        button.style.opacity = '0.7';
        button.style.pointerEvents = 'none';
        
        const span = button.querySelector('span');
        if (span) {
            span.textContent = 'Requesting...';
        }
    });
    
    // Simulate API call
    setTimeout(() => {
        // Reset buttons
        betaButtons.forEach(button => {
            button.style.opacity = '1';
            button.style.pointerEvents = 'auto';
            
            const span = button.querySelector('span');
            if (span) {
                span.textContent = span.textContent.includes('Request') ? 'Request Beta Access' : 'Join Beta';
            }
        });
        
        // Show success message
        // showNotification('Thank you for your interest! We\'ll be in touch soon about your beta access.', 'success');
        
        // Optional: Open a more detailed form or redirect
        // window.open('https://forms.gle/your-beta-form', '_blank');
    }, 2000);
}

function handleLearnMore() {
    console.log('Learn more clicked');
    scrollToSection('problem');
}

/* ===== 8. UTILITY FUNCTIONS ===== */
/* Helper functions used throughout the application */

function initializeLucideIcons() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        console.log('Lucide icons initialized');
    } else {
        console.warn('Lucide icons library not loaded');
    }
}

function initializeProgressRings() {
    // Animate progress rings on load
    const progressRings = document.querySelectorAll('.ring-progress');
    
    progressRings.forEach((ring, index) => {
        setTimeout(() => {
            ring.style.strokeDasharray = ring.getAttribute('stroke-dasharray');
        }, index * 200);
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Create notification content
    const content = document.createElement('div');
    content.className = 'notification-content';
    
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info');
    
    const text = document.createElement('span');
    text.textContent = message;
    
    content.appendChild(icon);
    content.appendChild(text);
    notification.appendChild(content);
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 6rem;
        right: 2rem;
        background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(6, 182, 212, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        max-width: 300px;
    `;
    
    // Style notification content
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Initialize icon
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    console.log('Notification shown:', message, type);
}

function debounce(func, wait) {
    // Debounce function to limit how often a function can be called
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

function throttle(func, limit) {
    // Throttle function to limit how often a function can be called
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

function isElementInViewport(element) {
    // Check if element is visible in viewport
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function getScrollPercentage() {
    // Get current scroll percentage of page
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (scrollTop / scrollHeight) * 100;
}

/* ===== EVENT LISTENERS ===== */
/* Additional event listeners for enhanced interactivity */

// Pause habit rotation when user hovers over the app
document.addEventListener('DOMContentLoaded', function() {
    const appImmersion = document.querySelector('.app-immersion');
    
    if (appImmersion) {
        appImmersion.addEventListener('mouseenter', function() {
            clearInterval(habitRotationInterval);
            console.log('Habit rotation paused');
        });
        
        appImmersion.addEventListener('mouseleave', function() {
            startHabitRotation();
            console.log('Habit rotation resumed');
        });
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Handle keyboard navigation
    if (e.key === 'Tab') {
        // Add visible focus indicators
        document.body.classList.add('keyboard-navigation');
    }
    
    // Handle escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        
        if (navMenu && navMenu.classList.contains('mobile-open')) {
            navMenu.classList.remove('mobile-open');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        }
    }
    
    // Arrow keys for testimonial navigation
    if (e.key === 'ArrowLeft') {
        const prevIndex = currentTestimonialIndex > 0 ? currentTestimonialIndex - 1 : testimonials.length - 1;
        showTestimonial(prevIndex);
    } else if (e.key === 'ArrowRight') {
        const nextIndex = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }
});

document.addEventListener('mousedown', function() {
    // Remove keyboard navigation class when using mouse
    document.body.classList.remove('keyboard-navigation');
});

/* ===== PERFORMANCE MONITORING ===== */
/* Basic performance monitoring and optimization */

window.addEventListener('load', function() {
    // Log page load time
    const loadTime = performance.now();
    console.log(`MyGen Wellness page loaded in ${loadTime.toFixed(2)}ms`);
    
    // Preload next habit images for smoother transitions
    preloadHabitAssets();
    
    // Initialize lazy loading for images
    initializeLazyLoading();
});

function preloadHabitAssets() {
    // Preload any assets that might be needed for habit rotation
    console.log('Preloading habit assets...');
    
    // This would typically preload images or other assets
    // For now, we're using icon fonts, so no additional loading needed
}

function initializeLazyLoading() {
    // Initialize lazy loading for images (if any)
    const images = document.querySelectorAll('img[data-src]');
    
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
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

/* ===== ERROR HANDLING ===== */
/* Global error handling and logging */

window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error reporting service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // In production, you might want to send this to an error reporting service
});

console.log('MyGen Wellness enhanced JavaScript initialized successfully!');

