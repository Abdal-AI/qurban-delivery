// ===== DOM ELEMENTS =====
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const orderForm = document.getElementById('orderForm');
const orderModal = document.getElementById('orderModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// ===== HEADER SCROLL =====
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

// ===== MOBILE MENU =====
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
});

// ===== SCROLL TO TOP =====
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== ORDER FORM =====
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    orderModal.classList.add('active');
    orderForm.reset();
});

closeModalBtn.addEventListener('click', () => {
    orderModal.classList.remove('active');
});

orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) orderModal.classList.remove('active');
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-up to animatable elements
document.querySelectorAll('.feature-item, .choose-card, .step-card, .service-item, .download-wrapper, .order-form-wrapper').forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target) {
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current);
    }, 30);
}
