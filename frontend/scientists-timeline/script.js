(function () {
    "use strict";

    const scientists = [
        {
            id: "aryabhata",
            name: "Aryabhata",
            period: "476 – c. 550 CE",
            field: "Mathematics & Astronomy",
            contribution: "Approximation of pi and astronomical calculations.",
            details: "Aryabhata was an influential mathematician and astronomer of ancient India. He accurately calculated the value of pi to four decimal places and proposed a heliocentric model of the solar system where the Earth spins on its axis."
        },
        {
            id: "brahmagupta",
            name: "Brahmagupta",
            period: "c. 598 – c. 668 CE",
            field: "Mathematics & Astronomy",
            contribution: "First to give rules to compute with zero.",
            details: "His major work, the Brahmasphutasiddhanta, contains the first mathematical treatment of zero and rules for arithmetic involving negative numbers."
        },
        {
            id: "jc-bose",
            name: "Jagadish Chandra Bose",
            period: "1858 – 1937",
            field: "Physics & Plant Physiology",
            contribution: "Pioneered the investigation of radio and microwave optics.",
            details: "Bose demonstrated that plants have feeling through his invention of the crescograph. He was also a pioneer in the field of microwave transmission, predating many other scientists in wireless communication."
        },
        {
            id: "srinivasa-ramanujan",
            name: "Srinivasa Ramanujan",
            period: "1887 – 1920",
            field: "Mathematics",
            contribution: "Extraordinary contributions to mathematical analysis, number theory, and continued fractions.",
            details: "Despite having almost no formal training in pure mathematics, Ramanujan made substantial contributions to the analytical theory of numbers and worked on elliptic functions and infinite series."
        },
        {
            id: "cv-raman",
            name: "C. V. Raman",
            period: "1888 – 1970",
            field: "Physics",
            contribution: "Discovery of the Raman Effect.",
            details: "His work on the scattering of light earned him the Nobel Prize in Physics in 1930. The Raman Effect is the inelastic scattering of a photon by molecules which are excited to higher vibrational or rotational energy levels."
        },
        {
            id: "satyendra-nath-bose",
            name: "Satyendra Nath Bose",
            period: "1894 – 1974",
            field: "Theoretical Physics",
            contribution: "Foundation for Bose-Einstein statistics and the theory of the Bose-Einstein condensate.",
            details: "He collaborated with Albert Einstein to develop a statistical method to describe the behavior of subatomic particles, which later came to be known as 'bosons' in his honor."
        },
        {
            id: "meghnad-saha",
            name: "Meghnad Saha",
            period: "1893 – 1956",
            field: "Astrophysics",
            contribution: "Developed the Saha ionization equation.",
            details: "His equation is used to describe chemical and physical conditions in stars, allowing astronomers to accurately relate the spectral classes of stars to their actual temperatures."
        },
        {
            id: "homi-bhabha",
            name: "Homi J. Bhabha",
            period: "1909 – 1966",
            field: "Nuclear Physics",
            contribution: "Father of the Indian nuclear programme.",
            details: "Bhabha played a central role in the development of India's nuclear energy program and founded the Tata Institute of Fundamental Research (TIFR) and the Bhabha Atomic Research Centre (BARC)."
        },
        {
            id: "vikram-sarabhai",
            name: "Vikram Sarabhai",
            period: "1919 – 1971",
            field: "Space Science & Physics",
            contribution: "Father of the Indian space programme.",
            details: "Sarabhai was instrumental in establishing the Indian Space Research Organisation (ISRO). He also helped establish the Physical Research Laboratory in Ahmedabad."
        },
        {
            id: "apj-abdul-kalam",
            name: "A. P. J. Abdul Kalam",
            period: "1931 – 2015",
            field: "Aerospace Engineering",
            contribution: "Key role in the development of India's missile and nuclear weapons programs.",
            details: "Often referred to as the 'Missile Man of India', Dr. Kalam was deeply involved in India's civilian space programme and military missile development efforts before serving as the 11th President of India."
        }
    ];

    function renderTimeline() {
        const container = document.getElementById("timeline-container");
        if (!container) return;

        scientists.forEach((scientist) => {
            const wrapper = document.createElement("div");
            wrapper.className = "scientist-card-wrapper";

            const marker = document.createElement("div");
            marker.className = "timeline-marker";
            
            const card = document.createElement("article");
            card.className = "scientist-card";
            card.id = `card-${scientist.id}`;
            
            const year = document.createElement("span");
            year.className = "scientist-year";
            year.textContent = scientist.period;

            const name = document.createElement("h2");
            name.textContent = scientist.name;

            const field = document.createElement("p");
            field.className = "scientist-field";
            field.textContent = scientist.field;

            const content = document.createElement("div");
            content.className = "scientist-content";
            const contribution = document.createElement("strong");
            contribution.textContent = "Major Contribution: ";
            content.appendChild(contribution);
            content.appendChild(document.createTextNode(scientist.contribution));

            const details = document.createElement("div");
            details.className = "scientist-details";
            details.id = `details-${scientist.id}`;
            details.textContent = scientist.details;

            const toggleBtn = document.createElement("button");
            toggleBtn.type = "button";
            toggleBtn.className = "btn-details";
            toggleBtn.textContent = "View Details";
            toggleBtn.setAttribute("aria-expanded", "false");
            toggleBtn.setAttribute("aria-controls", `details-${scientist.id}`);

            toggleBtn.addEventListener("click", () => {
                const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
                if (isExpanded) {
                    toggleBtn.setAttribute("aria-expanded", "false");
                    toggleBtn.textContent = "View Details";
                    details.classList.remove("open");
                } else {
                    toggleBtn.setAttribute("aria-expanded", "true");
                    toggleBtn.textContent = "Hide Details";
                    details.classList.add("open");
                }
            });

            card.appendChild(year);
            card.appendChild(name);
            card.appendChild(field);
            card.appendChild(content);
            card.appendChild(toggleBtn);
            card.appendChild(details);

            wrapper.appendChild(marker);
            wrapper.appendChild(card);
            
            container.appendChild(wrapper);
        });
    }

    function initScrollAnimations() {
        const cards = document.querySelectorAll(".scientist-card");
        
        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        
        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            cards.forEach(card => card.classList.add("scientist-card-visible"));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("scientist-card-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        cards.forEach(card => observer.observe(card));
    }

    function initializeTimeline() {
        renderTimeline();
        initScrollAnimations();
    }

    document.addEventListener("DOMContentLoaded", initializeTimeline);
})();
