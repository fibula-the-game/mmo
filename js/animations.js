// Additional animations and effects for Fibula MMORPG

document.addEventListener('DOMContentLoaded', function() {
    // Initialize additional animations
    initParallaxEffects();
    initHoverEffects();
    initScrollAnimations();
    initInteractiveElements();
});

// Parallax effects for background elements
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Enhanced hover effects
function initHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .class-card, .news-card, .location-card, .event-card, .support-card, .download-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Add glow effects to buttons
    const buttons = document.querySelectorAll('.play-button, .cta-button, .download-button, .platform-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.feature-section, .class-detail, .location-card, .news-article, .event-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Interactive elements
function initInteractiveElements() {
    // Add click effects to interactive elements
    const interactiveElements = document.querySelectorAll('.class-card, .location-card, .event-card, .news-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            // Add a ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 215, 0, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add typing effect to certain text elements
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #FFD700';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                element.style.borderRight = 'none';
            }
        };
        
        // Start typing when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes animate-in {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: animate-in 0.6s ease-out forwards;
    }
    
    .animate-child {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .animate-child.animate-in {
        animation: animate-in 0.4s ease-out forwards;
    }
    
    .typing-effect {
        overflow: hidden;
        white-space: nowrap;
    }
    
    .pulse-glow {
        animation: pulse-glow 2s ease-in-out infinite;
    }
    
    @keyframes pulse-glow {
        0%, 100% {
            box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
        }
        50% {
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
        }
    }
    
    .shake-on-hover:hover {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .bounce-on-hover:hover {
        animation: bounce 0.6s ease-in-out;
    }
    
    .rotate-on-hover:hover {
        animation: rotate 0.6s ease-in-out;
    }
    
    .scale-on-hover:hover {
        transform: scale(1.1);
    }
    
    .slide-in-left {
        animation: slide-in-left 0.8s ease-out;
    }
    
    .slide-in-right {
        animation: slide-in-right 0.8s ease-out;
    }
    
    .fade-in-up {
        animation: fade-in-up 0.8s ease-out;
    }
    
    @keyframes fade-in-up {
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

document.head.appendChild(style);

// Add random bone facts on page load
function addRandomBoneFacts() {
    const boneFacts = [
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

    // Add a random fact to the page title occasionally
    if (Math.random() < 0.1) {
        const fact = boneFacts[Math.floor(Math.random() * boneFacts.length)];
        const title = document.querySelector('title');
        if (title) {
            title.textContent = title.textContent + ' - ' + fact;
        }
    }
}

// Initialize bone facts
addRandomBoneFacts();

// Add loading animations for images and content
function addLoadingAnimations() {
    const loadingElements = document.querySelectorAll('.loading');
    
    loadingElements.forEach(element => {
        element.innerHTML = '<div class="loading-spinner"></div>';
        
        // Simulate loading completion
        setTimeout(() => {
            element.classList.add('loaded');
            element.innerHTML = element.dataset.content || 'Content loaded!';
        }, Math.random() * 2000 + 1000);
    });
}

// Add smooth scrolling for anchor links
function initSmoothScrolling() {
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
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
    addLoadingAnimations();
    initSmoothScrolling();
}); 