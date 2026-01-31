// ================================
// MOBILE MENU TOGGLE
// ================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Update aria-expanded for accessibility
    const isExpanded = navMenu.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    
    // Animate hamburger icon
    const hamburgers = menuToggle.querySelectorAll('.hamburger');
    if (isExpanded) {
        hamburgers[0].style.transform = 'rotate(45deg) translateY(8px)';
        hamburgers[1].style.opacity = '0';
        hamburgers[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        hamburgers[0].style.transform = 'none';
        hamburgers[1].style.opacity = '1';
        hamburgers[2].style.transform = 'none';
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        
        // Reset hamburger icon
        const hamburgers = menuToggle.querySelectorAll('.hamburger');
        hamburgers[0].style.transform = 'none';
        hamburgers[1].style.opacity = '1';
        hamburgers[2].style.transform = 'none';
    });
});

// ================================
// STICKY NAVBAR ON SCROLL
// ================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ================================
// ACTIVE NAV LINK ON SCROLL
// ================================

const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ================================
// SCROLL REVEAL ANIMATION
// ================================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Initial check on page load
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// DOWNLOAD RESUME BUTTON
// ================================

const downloadResumeBtn = document.getElementById('downloadResume');

downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a temporary message
    const originalText = downloadResumeBtn.textContent;
    downloadResumeBtn.textContent = 'Downloading...';
    
    // Download the resume PDF file
    const link = document.createElement('a');
    link.href = 'resume.pdf'; // Path to your resume PDF file
    link.download = 'Lekkala_Maneesh_Chowdhary_Resume.pdf'; // Downloaded filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset button text
    setTimeout(() => {
        downloadResumeBtn.textContent = originalText;
    }, 1000);
});

// ================================
// TYPING EFFECT FOR HERO SUBTITLE (OPTIONAL)
// ================================

const heroSubtitle = document.querySelector('.hero-subtitle');
const subtitleText = heroSubtitle.textContent;
let charIndex = 0;

function typeWriter() {
    if (charIndex < subtitleText.length) {
        heroSubtitle.textContent = subtitleText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Uncomment to enable typing effect
// heroSubtitle.textContent = '';
// setTimeout(typeWriter, 1000);

// ================================
// DYNAMIC YEAR IN FOOTER
// ================================

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-text');
if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} Lekkala Maneesh Chowdhary. All rights reserved.`;
}

// ================================
// SKILL CARD ANIMATION ON HOVER
// ================================

const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ================================
// PROJECT CARD PARALLAX EFFECT (SUBTLE)
// ================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ================================
// PERFORMANCE OPTIMIZATION
// ================================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(revealOnScroll));
window.addEventListener('scroll', debounce(highlightNavLink));

// ================================
// ACCESSIBILITY ENHANCEMENTS
// ================================

// Add focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Skip to main content functionality
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--accent-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.prepend(skipLink);

// ================================
// CURSOR LIGHT EFFECT
// ================================

const cursorLight = document.getElementById('cursorLight');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
let isMouseMoving = false;
let mouseTimeout;

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!isMouseMoving) {
        cursorLight.classList.add('active');
        cursorLight.classList.remove('inactive');
        isMouseMoving = true;
    }
    
    // Clear existing timeout
    clearTimeout(mouseTimeout);
    
    // Set new timeout to hide light after mouse stops
    mouseTimeout = setTimeout(() => {
        cursorLight.classList.remove('active');
        cursorLight.classList.add('inactive');
        isMouseMoving = false;
    }, 2000);
});

// Smooth cursor light animation
function animateCursorLight() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    
    cursorLight.style.left = currentX + 'px';
    cursorLight.style.top = currentY + 'px';
    
    requestAnimationFrame(animateCursorLight);
}

// Start animation
animateCursorLight();

// Hide cursor light when mouse leaves window
document.addEventListener('mouseleave', () => {
    cursorLight.classList.remove('active');
    cursorLight.classList.add('inactive');
});

// Show cursor light when mouse enters window
document.addEventListener('mouseenter', () => {
    cursorLight.classList.add('active');
    cursorLight.classList.remove('inactive');
});

// ================================
// INITIALIZE ON PAGE LOAD
// ================================

window.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    revealOnScroll();
    
    // Log success message
    console.log('✅ Portfolio website loaded successfully!');
    console.log('👋 Welcome to Lekkala Maneesh Chowdhary\'s Portfolio');
});

// ================================
// LAZY LOADING FOR FUTURE IMAGES
// ================================

// If you add images later, this will handle lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ================================
// CONTACT FORM VALIDATION (IF ADDED)
// ================================

// Placeholder for future contact form functionality
function validateContactForm(form) {
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');
    
    if (email && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (message && message.value.length < 10) {
        alert('Please enter a message with at least 10 characters');
        return false;
    }
    
    return true;
}

// ================================
// DARK MODE TOGGLE (OPTIONAL FUTURE FEATURE)
// ================================

// Placeholder for dark mode toggle if needed in the future
function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    const mode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);
}

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
}
