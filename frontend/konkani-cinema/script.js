document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animation using Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(section => {
        observer.observe(section);
    });

    // 2. Trivia Logic
    const triviaFacts = [
        "The term 'Konkani Cinema' is often colloquially referred to as 'Konkani Chalanachitram' or 'Goan Cinema'.",
        "Mogacho Aunddo (1950) was released on April 24, which is now celebrated as 'Konkani Film Day' in Goa.",
        "The traditional Goan musical theatre form 'Tiatr' has been the primary training ground for almost all early Konkani film actors and directors.",
        "Paltadcho Munis (2009) was the first Konkani film to be screened at the prestigious Toronto International Film Festival (TIFF).",
        "The Konkani film industry is uniquely supported by the Goan diaspora, particularly in Mumbai, the Middle East, and East Africa."
    ];

    let currentTriviaIndex = 0;
    const triviaText = document.getElementById('trivia-text');
    const nextTriviaBtn = document.getElementById('next-trivia-btn');

    function updateTrivia() {
        // Fade out
        triviaText.style.opacity = 0;
        setTimeout(() => {
            triviaText.innerText = triviaFacts[currentTriviaIndex];
            // Fade in
            triviaText.style.transition = "opacity 0.5s";
            triviaText.style.opacity = 1;
            
            currentTriviaIndex = (currentTriviaIndex + 1) % triviaFacts.length;
        }, 300);
    }

    if(nextTriviaBtn) {
        updateTrivia(); // Initial load
        nextTriviaBtn.addEventListener('click', updateTrivia);
    }

    // 3. Modal Logic
    window.openModal = function(title, desc) {
        const modal = document.getElementById('konkani-modal');
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-description').innerText = desc;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    window.closeModal = function() {
        const modal = document.getElementById('konkani-modal');
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Restore scrolling
    }

    // Close modal when clicking outside the content
    window.onclick = function(event) {
        const modal = document.getElementById('konkani-modal');
        if (event.target == modal) {
            closeModal();
        }
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // 4. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for sticky navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Scroll to Top Button Logic
    const scrollTopBtn = document.getElementById('btn-scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});