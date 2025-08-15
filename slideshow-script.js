document.addEventListener("DOMContentLoaded", () => {
    const slideshowContainer = document.getElementById("slideshowContainer");
    const habitNameDisplay = document.getElementById("habitNameDisplay");
    const habitDotsContainer = document.getElementById("habitDots");
    const floatingParticlesContainer = document.getElementById("floatingParticles");

    const images = [
        { src: "original_images/drinkingwater.jpg", name: "Drinking Water" },
        { src: "original_images/fasting.jpg", name: "Intermittent Fasting" },
        { src: "original_images/meditation.jpg", name: "Meditating" },
        { src: "original_images/nutritiousmeal.jpg", name: "Nutritious Meals" },
        { src: "original_images/sleep.jpg", name: "Quality Sleep" },
        { src: "original_images/walking.jpg", name: "Walking" },
        { src: "original_images/yoga.jpg", name: "Yoga & Stretching" }
    ];

    let currentSlideIndex = 0;
    let slideshowInterval;
    const particleColors = [
        "var(--color-primary)", // Turquoise
        "var(--color-secondary)", // Orange
        "var(--color-accent-green)" // Green
    ];

    function createParticle() {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.top = Math.random() * 100 + "vh";
        particle.style.animationDuration = (Math.random() * 10 + 5) + "s"; // 5-15s
        particle.style.animationDelay = (Math.random() * 5) + "s"; // 0-5s
        particle.style.backgroundColor = particleColors[Math.floor(Math.random() * particleColors.length)];
        floatingParticlesContainer.appendChild(particle);

        // Remove particle after animation to prevent memory leak
        particle.addEventListener("animationend", () => {
            particle.remove();
        });
    }

    function generateParticles(count) {
        for (let i = 0; i < count; i++) {
            createParticle();
        }
    }

    function showSlide(index) {
        const slides = document.querySelectorAll(".slide");
        console.log('showSlide', index, images[index].src);
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) {
                slide.classList.add("active");
            }
        });

        // Update habit name display
        if (habitNameDisplay) {
            habitNameDisplay.textContent = images[index].name;
        }

        // Update dots
        const dots = document.querySelectorAll(".habit-dot");
        dots.forEach((dot, i) => {
            dot.classList.remove("active");
            if (i === index) {
                dot.classList.add("active");
            }
        });
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % images.length;
        showSlide(currentSlideIndex);
    }

    function startSlideshow() {
        slideshowInterval = setInterval(nextSlide, 2000); // Change slide every 2 seconds
    }

    function pauseSlideshow() {
        clearInterval(slideshowInterval);
    }

    function setupSlideshow() {
        images.forEach((image, index) => {
            const slideDiv = document.createElement("div");
            slideDiv.classList.add("slide");
            slideDiv.style.backgroundImage = `url(${image.src})`;
            slideshowContainer.appendChild(slideDiv);

            const dot = document.createElement("div");
            dot.classList.add("habit-dot");
            dot.addEventListener("click", () => {
                pauseSlideshow();
                currentSlideIndex = index;
                showSlide(currentSlideIndex);
                startSlideshow();
            });
            habitDotsContainer.appendChild(dot);
        });

        showSlide(currentSlideIndex);
        startSlideshow();
        generateParticles(50); // Generate initial particles
        setInterval(() => generateParticles(5), 2000); // Continuously generate new particles
    }

    setupSlideshow();

    // Keyboard navigation for slideshow
    document.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            e.preventDefault(); // Prevent scrolling
            pauseSlideshow();
            nextSlide();
            startSlideshow();
        } else if (e.key === "ArrowRight") {
            pauseSlideshow();
            nextSlide();
            startSlideshow();
        } else if (e.key === "ArrowLeft") {
            pauseSlideshow();
            currentSlideIndex = (currentSlideIndex - 1 + images.length) % images.length;
            showSlide(currentSlideIndex);
            startSlideshow();
        }
    });

    // Testimonial Carousel (from script.js, moved here for consolidation)
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    let currentTestimonialIndex = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove("active");
            if (i === index) {
                card.classList.add("active");
            }
        });
    }

    function nextTestimonial() {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
        showTestimonial(currentTestimonialIndex);
    }

    setInterval(nextTestimonial, 7000); // Change testimonial every 7 seconds
    showTestimonial(currentTestimonialIndex); // Show initial testimonial

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle-transparent");
    const navMenu = document.querySelector(".nav-menu-transparent");

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            mobileMenuToggle.classList.toggle("active");
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                mobileMenuToggle.classList.remove("active");
            });
        });
    }

    // Stat number animation
    const statNumbers = document.querySelectorAll(".stat-number");

    const animateNumber = (obj, start, end, duration, isPercent, isDecimal) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let currentValue;
            if (isDecimal) {
                currentValue = (progress * (end - start) + start).toFixed(1);
            } else {
                currentValue = Math.round(progress * (end - start) + start);
            }
            obj.textContent = isPercent ? `${currentValue}%` : currentValue;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                // const originalText = stat.textContent.trim();
                // const isPercent = originalText.endsWith('%');
                // Remove % if present, parse as float
                // const numericText = isPercent ? originalText.replace('%', '') : originalText;
                const endValue = parseInt(numericText);
                const isDecimal = numericText.includes('.') && !isNaN(endValue);
                // stat.textContent = isPercent ? '0%' : (isDecimal ? '0.0' : '0');
                animateNumber(stat, 0, endValue, 2000, isPercent, isDecimal); // Animate over 2 seconds
                observer.unobserve(stat); // Stop observing once animated
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Use a different observer for the second stat
    statNumbers.forEach((stat, idx) => {
        if (idx === 1) {
            // Second stat uses observerAddition
            if (typeof observerAddition === 'undefined') {
                // Define observerAddition if not already defined
                window.observerAddition = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const stat = entry.target;
                            const originalText = stat.textContent;
                            const endValue = parseFloat(originalText);
                            const isDecimal = originalText.includes('.') && !isNaN(endValue);
                            stat.textContent = isDecimal ? '0.0' : '0';
                            // Animate without percent
                            let startTimestamp = null;
                            const step = (timestamp) => {
                                if (!startTimestamp) startTimestamp = timestamp;
                                const progress = Math.min((timestamp - startTimestamp) / 2000, 1);
                                let currentValue;
                                if (isDecimal) {
                                    currentValue = (progress * (endValue - 0) + 0).toFixed(1);
                                } else {
                                    currentValue = Math.round(progress * (endValue - 0) + 0);
                                }
                                stat.textContent = currentValue;
                                if (progress < 1) {
                                    window.requestAnimationFrame(step);
                                }
                            };
                            window.requestAnimationFrame(step);
                            // Do NOT unobserve, so it animates every time it enters view
                        }
                    });
                }, observerOptions);
            }
            window.observerAddition.observe(stat);
        } else {
            observer.observe(stat);
        }
    });
});


