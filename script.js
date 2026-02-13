// ========================================
// THEME TOGGLE FUNCTIONALITY
// ========================================

function initTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// Initialize theme on page load
initTheme();

// Add event listener to theme toggle button
const themeToggleBtn = document.getElementById('themeToggle');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

// ========================================
// ANIMATED TEXT ROTATION
// ========================================

function initAnimatedText() {
    const words = ['Work', 'Sports', 'Plan'];
    let currentIndex = 0;
    const animatedTextElement = document.getElementById('animatedText');
    
    if (!animatedTextElement) return;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animationDuration = prefersReducedMotion ? 2000 : 2000; // 3s or 6s cycle
    
    function rotateText() {
        currentIndex = (currentIndex + 1) % words.length;
        animatedTextElement.textContent = words[currentIndex];
    }
    
    // Set initial text
    animatedTextElement.textContent = words[0];
    
    // Rotate text every animation cycle
    setInterval(rotateText, animationDuration);
}

// Initialize animated text when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimatedText);
} else {
    initAnimatedText();
}

// ========================================
// SMOOTH SCROLL FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle internal anchor links
            if (href !== '#' && href.startsWith('#')) {
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

    // ========================================
    // SCROLL ANIMATIONS
    // ========================================

    // Add fade-in on scroll for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInOnScroll = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Target sections for animation
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInOnScroll.observe(section);
    });

    // First section should appear immediately
    if (sections.length > 0) {
        sections[0].style.opacity = '1';
        sections[0].style.transform = 'translateY(0)';
    }

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll (adjusted for theme)
        if (currentScroll > 500) {
            const theme = document.documentElement.getAttribute('data-theme');
            const shadowColor = theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)';
            navbar.style.boxShadow = `0 2px 10px ${shadowColor}`;
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // MOBILE MENU (if needed in future)
    // ========================================

    // Placeholder for mobile menu toggle functionality
    // Can be implemented if hamburger menu is added for mobile view

    // ========================================
    // COPY EMAIL ON CLICK (Enhancement)
    // ========================================

    const emailLink = document.querySelector('a[href^="mailto:"]');

    if (emailLink) {
        emailLink.addEventListener('click', function (e) {
            const email = this.getAttribute('href').replace('mailto:', '');

            // Try to copy email to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    // Optional: Show a subtle notification
                    console.log('Email copied to clipboard!');
                }).catch(err => {
                    console.log('Could not copy email', err);
                });
            }
        });
    }
});

// ========================================
// PERFORMANCE: Preload important assets
// ========================================

window.addEventListener('load', function () {
    console.log('Portfolio loaded successfully');
});
