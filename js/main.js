// Main JavaScript for Fibula MMORPG

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initModal();
    initScrollEffects();
    createStars();
    initBoneFacts();
    initStatsAnimation();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const nav = document.querySelector('.main-nav');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Scroll effect for navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Active page highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('gameModal');
    const closeBtn = document.querySelector('.close');

    // Close modal when clicking the X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

function openModal() {
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal() {
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Create animated stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (2 + Math.random() * 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Scroll-triggered animations
function initScrollEffects() {
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

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-on-scroll, .slide-in-left-on-scroll, .slide-in-right-on-scroll, .scale-in-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

// Animate stats on scroll
function initStatsAnimation() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalNumber = stat.textContent;
        const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
        let currentNumber = 0;
        const increment = numericValue / 100;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= numericValue) {
                stat.textContent = finalNumber;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentNumber).toLocaleString();
            }
        }, 50);
    });
}

// Fun bone facts on click
function initBoneFacts() {
    const boneClicks = [
        "Did you know? The human body has 206 bones!",
        "Fun fact: Your funny bone isn't actually a bone!",
        "Bone appetit! 🦴",
        "That's a bone-a-fide fact!",
        "I've got a bone to pick with you... just kidding!",
        "This game is absolutely bone-kers!",
        "No bones about it - this is fun!",
        "You're really getting to the marrow of things!",
        "This is the skeleton of a great game!",
        "You're on the right track, bone-wise!"
    ];

    let clickCount = 0;
    let lastClickTime = 0;

    document.addEventListener('click', function(e) {
        const currentTime = Date.now();
        
        // Only show fact if enough time has passed and random chance
        if (currentTime - lastClickTime > 3000 && Math.random() < 0.15) {
            const fact = boneClicks[clickCount % boneClicks.length];
            clickCount++;
            lastClickTime = currentTime;
            
            showBoneFact(fact, e.clientX, e.clientY);
        }
    });
}

function showBoneFact(fact, x, y) {
    const tooltip = document.createElement('div');
    tooltip.textContent = fact;
    tooltip.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y - 30}px;
        background: rgba(255, 215, 0, 0.95);
        color: #1a1a2e;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: bold;
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
        max-width: 200px;
        text-align: center;
    `;
    
    document.body.appendChild(tooltip);
    
    // Animate in
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(-10px)';
        setTimeout(() => tooltip.remove(), 300);
    }, 3000);
}

// Utility functions
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

// Smooth scroll to anchor links
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

// Add loading states to buttons
document.querySelectorAll('.play-button, .cta-button, .download-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.href.includes('download.html')) {
            e.preventDefault();
            this.innerHTML = '<span class="loading-spinner"></span> Loading...';
            setTimeout(() => {
                this.innerHTML = 'Download Started!';
                setTimeout(() => {
                    this.innerHTML = 'Download';
                }, 2000);
            }, 1500);
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', debounce(function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 10));

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to class cards
    const classCards = document.querySelectorAll('.class-card');
    classCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.animation = 'pulse 0.3s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
}); 