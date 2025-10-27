// CAROUSEL FUNCTIONALITY
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    // Oculta todos los slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Muestra el slide actual
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlide = index;
}

function changeSlide(direction) {
    let newIndex = currentSlide + direction;
    
    if (newIndex < 0) {
        newIndex = slides.length - 1;
    } else if (newIndex >= slides.length) {
        newIndex = 0;
    }
    
    showSlide(newIndex);
}

function goToSlide(index) {
    showSlide(index);
}

// Auto-advance carousel
let carouselInterval = setInterval(() => {
    changeSlide(1);
}, 5000);

// Pausar carousel al interactuar
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
});

// SMOOTH SCROLL
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

// ANIMACIÓN AL SCROLL
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.team-member, .feature-card, .sketch-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// IMAGE FALLBACK HANDLING
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Crear placeholder SVG cuando la imagen falle
            const placeholder = `
                <svg width="${this.width || 400}" height="${this.height || 300}" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="300" fill="#2D1B07"/>
                    <text x="200" y="150" text-anchor="middle" fill="#F5DEB3" font-family="Georgia" font-size="16">Imagen no disponible</text>
                </svg>
            `;
            this.outerHTML = placeholder;
        });
    });
});

// INIT
console.log('🎭 Mambo de Condenados - Sitio cargado correctamente');
