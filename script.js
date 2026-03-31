document.addEventListener("DOMContentLoaded", () => {

    // Navbar Scroll Effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById("mobile-toggle");
    const navLinks = document.getElementById("nav-links");

    mobileToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const icon = mobileToggle.querySelector("i");
        if (navLinks.classList.contains("active")) {
            icon.classList.remove("uil-bars");
            icon.classList.add("uil-times");
        } else {
            icon.classList.remove("uil-times");
            icon.classList.add("uil-bars");
        }
    });

    // Close mobile menu on link click
    const links = document.querySelectorAll(".nav-links li a");
    links.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            const icon = mobileToggle.querySelector("i");
            if (icon) {
                icon.classList.remove("uil-times");
                icon.classList.add("uil-bars");
            }
        });
    });

    // Intersection Observer for Fade-Up Animations
    const fadeElements = document.querySelectorAll(".fade-up");

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Slider Gallery Logic
    const track = document.getElementById('sliderTrack');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (track && nextBtn && prevBtn) {
        const slides = Array.from(track.children);
        let currentIndex = 0;
        let slideInterval;

        const updateSlider = () => {
            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        };

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        // Start auto-slide
        startInterval();
    }

    // Hero Video Custom Loop (0->9s then 2->9s)
    const heroVideo = document.getElementById("heroVideo");
    if (heroVideo) {
        heroVideo.addEventListener("timeupdate", () => {
            if (heroVideo.currentTime >= 9) {
                heroVideo.currentTime = 3;
            }
        });
    }

});
