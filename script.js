/**
 * ============================================
 * Portfolio JavaScript - Core Functionality
 * ============================================
 * Features:
 * - Smooth navigation & scroll
 * - Graphic design gallery with filtering
 * - Project modal viewer
 * - PWA service worker registration
 */

// ============================================
// CONFIG & DOM ELEMENTS
// ============================================

const CONFIG = {
    ANIMATION_DELAY: 100,
    SCROLL_OFFSET: 100,
};

const navButtons = document.querySelectorAll('[data-section]');
const sections = document.querySelectorAll('section');
const filterButtons = document.querySelectorAll('.filter-btn');
const imageModal = document.getElementById('imageModal');
const modalClose = document.querySelector('.close-modal');

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeScrollAnimations();
    initializeGraphicDesignPortfolio();
    initializeModal();
    updateActiveSection();
});

// ============================================
// NAVIGATION - Smooth scrolling & active state
// ============================================

function initializeNavigation() {
    navButtons.forEach(button => {
        button.addEventListener('click', handleNavClick);
    });
    window.addEventListener('scroll', updateActiveSection);
}

function handleNavClick(event) {
    const sectionId = event.currentTarget.getAttribute('data-section');
    scrollToSection(sectionId);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - CONFIG.SCROLL_OFFSET;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function updateActiveSection() {
    let currentSection = '';
    const scrollPosition = window.scrollY + CONFIG.SCROLL_OFFSET;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });

    navButtons.forEach(button => {
        const buttonSection = button.getAttribute('data-section');
        if (buttonSection === currentSection) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    triggerVisibleAnimations();
}

// ============================================
// SCROLL ANIMATIONS - Fade-in on scroll
// ============================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, index * CONFIG.ANIMATION_DELAY);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.aos').forEach(element => {
        observer.observe(element);
    });
}

function triggerVisibleAnimations() {
    const elements = document.querySelectorAll('.aos:not(.aos-animate)');

    elements.forEach(element => {
        const elementTop = element.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;

        if (scrollPosition > elementTop) {
            element.classList.add('aos-animate');
        }
    });
}

// ============================================
// GRAPHIC DESIGN PORTFOLIO - Filtering
// ============================================

function initializeGraphicDesignPortfolio() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filterValue = e.target.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('aos-animate'), 10);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('aos-animate');
                }
            });
        });
    });

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;
            const image = item.querySelector('img').src;
            const tags = Array.from(item.querySelectorAll('.flex-wrap:first-of-type span'))
                .map(span => span.textContent);

            openModal({ title, description, image, tags });
        });
    });
}

// ============================================
// MODAL - Project viewer
// ============================================

function initializeModal() {
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(project) {
    if (!imageModal) return;

    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDesc').textContent = project.description;

    const tagsContainer = document.getElementById('modalTags');
    tagsContainer.innerHTML = project.tags.map(tag =>
        `<span class="px-3 py-1 bg-orange-500/30 text-orange-200 text-sm rounded-lg">${tag}</span>`
    ).join('');

    imageModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!imageModal) return;
    imageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}





console.log('%c🚀 Portfolio Loaded', 'color: #ff8c00; font-size: 16px; font-weight: bold;');
