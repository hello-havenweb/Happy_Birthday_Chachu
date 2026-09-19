/*
===============================================
  BIRTHDAY SURPRISE WEBSITE FOR AHMAD CHACHU
  Interactive JavaScript
===============================================
*/

// ========== CONFIGURATION ==========
// CUSTOMIZATION: Edit the birthday message here
const BIRTHDAY_MESSAGE = `Happy Birthday, Chachu!

Allah aapko hamesha khush rakhe, sehat de, lambi zindagi de aur aapki har jaiz dua qabool farmaye.

Aap hamare liye sirf Chachu nahi, balki ek bohat special aur pyare insaan hain.

Aapka saath, aapki kindness aur aapki muskurahat hamesha yaad rahegi.

May your special day be filled with happiness, love and countless beautiful moments.

Happy Birthday once again, Ahmad! ❤️`;

// ========== GLOBAL STATE ==========
let musicPlaying = false;
let currentPhotoIndex = 0;
let messageTyped = false;

// ========== DOM ELEMENTS ==========
const elements = {
    musicToggle: document.getElementById('musicToggle'),
    backgroundMusic: document.getElementById('backgroundMusic'),
    openSurpriseBtn: document.getElementById('openSurprise'),
    backToTop: document.getElementById('backToTop'),
    progressIndicator: document.getElementById('progressIndicator'),
    messageContent: document.getElementById('messageContent'),
    photoGallery: document.getElementById('photoGallery'),
    lightbox: document.getElementById('lightbox'),
    lightboxImg: document.getElementById('lightboxImg'),
    lightboxClose: document.getElementById('lightboxClose'),
    lightboxPrev: document.getElementById('lightboxPrev'),
    lightboxNext: document.getElementById('lightboxNext'),
    confetti1: document.getElementById('confetti1'),
    confetti2: document.getElementById('confetti2'),
    particles: document.getElementById('particles')
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollAnimations();
    initEventListeners();
    initIntersectionObserver();
});

// ========== PARTICLES BACKGROUND ==========
function initParticles() {
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    const colors = ['#d4af37', '#f4d03f', '#c41e3a', '#ffffff'];
    particle.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]} 0%, transparent 70%)`;
    
    elements.particles.appendChild(particle);
    
    // Remove and recreate particle after animation
    particle.addEventListener('animationend', () => {
        particle.remove();
        createParticle();
    });
}

// ========== EVENT LISTENERS ==========
function initEventListeners() {
    // Open surprise button
    elements.openSurpriseBtn.addEventListener('click', handleOpenSurprise);
    
    // Music toggle
    elements.musicToggle.addEventListener('click', toggleMusic);
    
    // Back to top
    elements.backToTop.addEventListener('click', scrollToTop);
    
    // Scroll event for progress and back-to-top
    window.addEventListener('scroll', handleScroll);
    
    // Photo gallery
    const photoItems = elements.photoGallery.querySelectorAll('.photo-item');
    photoItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
    
    // Lightbox controls
    elements.lightboxClose.addEventListener('click', closeLightbox);
    elements.lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    elements.lightboxNext.addEventListener('click', () => navigateLightbox(1));
    elements.lightbox.addEventListener('click', (e) => {
        if (e.target === elements.lightbox) closeLightbox();
    });
    
    // Keyboard controls for lightbox
    document.addEventListener('keydown', handleKeyPress);
}

// ========== OPEN SURPRISE ==========
function handleOpenSurprise() {
    // Smooth scroll to next section
    const screen2 = document.getElementById('screen2');
    screen2.scrollIntoView({ behavior: 'smooth' });
    
    // Start music
    startMusic();
    
    // Show music toggle button
    setTimeout(() => {
        elements.musicToggle.classList.add('visible');
    }, 1000);
    
    // Trigger confetti
    setTimeout(() => {
        createConfetti(elements.confetti1, 100);
    }, 800);
}

// ========== MUSIC CONTROLS ==========
function startMusic() {
    // Check if audio file exists by trying to play
    elements.backgroundMusic.play()
        .then(() => {
            musicPlaying = true;
            updateMusicButton();
        })
        .catch(error => {
            console.log('Music file not found or autoplay blocked:', error);
            // Music button will still be visible but won't play
        });
}

function toggleMusic() {
    if (musicPlaying) {
        elements.backgroundMusic.pause();
        musicPlaying = false;
    } else {
        elements.backgroundMusic.play()
            .then(() => {
                musicPlaying = true;
            })
            .catch(error => {
                console.log('Could not play music:', error);
            });
    }
    updateMusicButton();
}

function updateMusicButton() {
    const icon = elements.musicToggle.querySelector('.music-icon');
    const status = elements.musicToggle.querySelector('.music-status');
    
    if (musicPlaying) {
        elements.musicToggle.classList.add('playing');
        status.textContent = 'Music On';
    } else {
        elements.musicToggle.classList.remove('playing');
        status.textContent = 'Music Off';
    }
}

// ========== SCROLL HANDLING ==========
function handleScroll() {
    // Progress indicator
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    elements.progressIndicator.style.width = `${progress}%`;
    
    // Back to top button
    if (scrolled > windowHeight) {
        elements.backToTop.classList.add('visible');
    } else {
        elements.backToTop.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========== INTERSECTION OBSERVER ==========
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                handleSectionVisible(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all screens
    document.querySelectorAll('.screen').forEach(screen => {
        observer.observe(screen);
    });
}

function handleSectionVisible(section) {
    const sectionId = section.id;
    
    switch(sectionId) {
        case 'screen3':
            if (!messageTyped) {
                typeMessage();
                messageTyped = true;
            }
            break;
        case 'screen5':
            animateSpecialLines();
            break;
        case 'screen6':
            setTimeout(() => {
                createConfetti(elements.confetti2, 150);
            }, 1500);
            break;
    }
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// ========== MESSAGE TYPING EFFECT ==========
function typeMessage() {
    const paragraphs = BIRTHDAY_MESSAGE.split('\n\n');
    let paragraphIndex = 0;
    
    function typeParagraph() {
        if (paragraphIndex >= paragraphs.length) return;
        
        const p = document.createElement('p');
        p.style.opacity = '0';
        elements.messageContent.appendChild(p);
        
        const text = paragraphs[paragraphIndex];
        let charIndex = 0;
        
        // Fade in paragraph
        setTimeout(() => {
            p.style.transition = 'opacity 0.5s';
            p.style.opacity = '1';
        }, 100);
        
        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                p.textContent += text[charIndex];
                charIndex++;
            } else {
                clearInterval(typeInterval);
                paragraphIndex++;
                setTimeout(typeParagraph, 300);
            }
        }, 20); // Fast typing speed
    }
    
    typeParagraph();
}

// ========== SPECIAL MESSAGE ANIMATION ==========
function animateSpecialLines() {
    const lines = document.querySelectorAll('.special-line');
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add('visible');
        }, index * 800);
    });
}

// ========== CONFETTI ==========
function createConfetti(container, count) {
    const colors = ['#d4af37', '#f4d03f', '#c41e3a', '#ff6b6b', '#ffffff'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = `${Math.random() * 0.5}s`;
            confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
            
            // Random shapes
            const shapes = ['square', 'circle', 'rectangle'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'rectangle') {
                confetti.style.width = '15px';
                confetti.style.height = '8px';
            }
            
            container.appendChild(confetti);
            
            // Remove after animation
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }, i * 30);
    }
}

// ========== PHOTO LIGHTBOX ==========
function openLightbox(index) {
    const photos = elements.photoGallery.querySelectorAll('.photo-item img');
    currentPhotoIndex = index;
    elements.lightboxImg.src = photos[index].src;
    elements.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    elements.lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    const photos = elements.photoGallery.querySelectorAll('.photo-item img');
    currentPhotoIndex += direction;
    
    if (currentPhotoIndex < 0) {
        currentPhotoIndex = photos.length - 1;
    } else if (currentPhotoIndex >= photos.length) {
        currentPhotoIndex = 0;
    }
    
    elements.lightboxImg.style.opacity = '0';
    
    setTimeout(() => {
        elements.lightboxImg.src = photos[currentPhotoIndex].src;
        elements.lightboxImg.style.opacity = '1';
    }, 200);
}

function handleKeyPress(e) {
    if (!elements.lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            navigateLightbox(-1);
            break;
        case 'ArrowRight':
            navigateLightbox(1);
            break;
    }
}

// ========== UTILITY FUNCTIONS ==========

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollTo = (target) => {
        const targetPosition = target.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        
        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        
        requestAnimationFrame(animation);
    };
}

// Console message
console.log('%c🎂 Happy Birthday Ahmad Chachu! ❤️', 'font-size: 20px; color: #d4af37; font-weight: bold;');
console.log('%cMade with love and code ✨', 'font-size: 14px; color: #c41e3a;');
