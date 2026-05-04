// Smooth scroll and header scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu on click
            navLinks.classList.remove('open');
        });
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            mobileToggle.classList.toggle('active');
        });
    }

    // Scroll reveal animation — also handles elements already in viewport
    const sections = document.querySelectorAll('.section');

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.05, // lower threshold so cards reveal sooner
    });

    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
});

// Add extra CSS for scroll reveal and mobile menu
const style = document.createElement('style');
style.textContent = `
    .section-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 1s ease-out;
    }
    .revealed {
        opacity: 1;
        transform: translateY(0);
    }
    .nav-links.open {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: rgba(245, 241, 233, 0.98);
        padding: 2rem;
        gap: 1.5rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        backdrop-filter: blur(10px);
        z-index: 999;
    }
    .mobile-toggle {
        display: none;
        flex-direction: column;
        gap: 6px;
        cursor: pointer;
        padding: 4px;
        z-index: 1001;
    }
    .mobile-toggle span {
        display: block;
        width: 28px;
        height: 2px;
        background-color: var(--dark-text);
        transition: all 0.3s ease;
        transform-origin: center;
    }
    .mobile-toggle.active span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    .mobile-toggle.active span:nth-child(2) {
        transform: rotate(-45deg);
    }
    @media (max-width: 768px) {
        .mobile-toggle {
            display: flex;
        }
    }
    .about-text > span, .contact .about-text > span {
        text-transform: uppercase;
        font-size: 0.8rem;
        letter-spacing: 3px;
        color: var(--sage-green);
        display: block;
        margin-bottom: 1rem;
    }
`;
document.head.appendChild(style);
