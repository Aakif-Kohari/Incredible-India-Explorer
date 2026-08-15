// Classical Indian Musical Instruments Logic

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.instrument-filter');
  const instrumentCards = document.querySelectorAll('.instrument-card');
  const emptyState = document.querySelector('.instrument-empty');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      let visibleCount = 0;

      // Filter cards
      instrumentCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === category) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      // Show/hide empty state
      if (visibleCount === 0) {
        emptyState.style.display = 'block';
      } else {
        emptyState.style.display = 'none';
      }
    });

    // Keyboard accessibility for filters
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });
});
(function () {
    "use strict";

    const instrumentData = {
        sitar: {
            id: "sitar",
            name: "Sitar",
            category: "String Instrument",
            image: "assets/sitar.webp",
            audio: "assets/sitar.mp3",
            description: "A prominent plucked string instrument associated with Hindustani classical music.",
            history: "The sitar developed into an important instrument in North Indian classical music, flourishing in the 16th and 17th centuries. It gained worldwide popularity in the 1960s through masters like Ravi Shankar.",
            playStyle: "Played by plucking the strings with a wire plectrum (mizrab) worn on the index finger, while the left hand presses the strings on curved frets to create microtonal slides.",
            alt: "Traditional Indian sitar",
            credit: "Image/Audio: Placeholder / Public Domain"
        },
        tabla: {
            id: "tabla",
            name: "Tabla",
            category: "Percussion Instrument",
            image: "assets/tabla.webp",
            audio: "assets/tabla.mp3",
            description: "A pair of hand-played drums widely used in Indian classical music.",
            history: "Tabla has become a central percussion instrument in Hindustani musical traditions. Its origins are traced back to the 18th century, evolving from older drum forms like the pakhawaj.",
            playStyle: "Played with the fingers and palms of both hands. The smaller right drum (dayan) produces varied tonal sounds, while the larger left drum (bayan) provides bass.",
            alt: "Traditional Indian tabla drums",
            credit: "Image/Audio: Placeholder / Public Domain"
        },
        veena: {
            id: "veena",
            name: "Veena",
            category: "String Instrument",
            image: "assets/veena.webp",
            audio: "assets/veena.mp3",
            description: "An ancient Indian string instrument, essential to Carnatic classical music.",
            history: "The veena is one of the oldest instruments in India, mentioned in ancient texts. It holds deep cultural and spiritual significance in South Indian music.",
            playStyle: "Typically played while seated cross-legged, the veena is plucked with the fingers of the right hand while the left hand glides over the frets to produce continuous melodic lines.",
            alt: "Traditional Indian Veena",
            credit: "Image/Audio: Placeholder / Public Domain"
        },
        flute: {
            id: "flute",
            name: "Bansuri (Flute)",
            category: "Wind Instrument",
            image: "assets/flute.webp",
            audio: "assets/flute.mp3",
            description: "A traditional side-blown flute made from a single hollow shaft of bamboo.",
            history: "The bansuri has ancient roots and is intimately associated with the pastoral traditions of India, particularly the mythology of Lord Krishna.",
            playStyle: "Played horizontally, the musician blows across the embouchure hole and uses their fingers to cover and uncover six or seven finger holes to change pitches.",
            alt: "Traditional Indian Bansuri",
            credit: "Image/Audio: Placeholder / Public Domain"
        }
    };

    let lastFocusedElement = null;

    function initializeInstruments() {
        const grid = document.getElementById("instrument-grid");
        if (!grid) return;

        grid.innerHTML = "";

        Object.values(instrumentData).forEach(instrument => {
            const card = document.createElement("div");
            card.className = "instrument-card";
            card.setAttribute("tabindex", "0");
            card.setAttribute("role", "button");
            card.setAttribute("aria-label", `View details for ${instrument.name}`);

            card.innerHTML = `
                <div class="instrument-image-wrapper">
                    <img class="instrument-image" src="${instrument.image}" alt="${instrument.alt}" loading="lazy" onerror="this.src='https://picsum.photos/400/300.webp'">
                </div>
                <div class="instrument-card-content">
                    <span class="instrument-category-badge">${instrument.category}</span>
                    <h3 class="instrument-title">${instrument.name}</h3>
                    <p class="instrument-description">${instrument.description}</p>
                    <button class="instrument-explore-btn" tabindex="-1">Explore</button>
                </div>
            `;

            // Interactions
            const openHandler = (e) => {
                e.preventDefault();
                openInstrument(instrument, card);
            };

            card.addEventListener("click", openHandler);
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    openHandler(e);
                }
            });

            grid.appendChild(card);
        });
    }

    function openInstrument(instrument, triggerElement) {
        lastFocusedElement = triggerElement;

        document.getElementById("modal-instrument-name").textContent = instrument.name;
        document.getElementById("modal-instrument-category").textContent = instrument.category;
        document.getElementById("modal-instrument-history").textContent = instrument.history;
        document.getElementById("modal-instrument-playstyle").textContent = instrument.playStyle;
        document.getElementById("modal-instrument-credit").textContent = instrument.credit;

        const img = document.getElementById("modal-instrument-image");
        img.src = instrument.image;
        img.alt = instrument.alt;
        img.onerror = function() { this.src = 'https://picsum.photos/400/300.webp'; };

        const audio = document.getElementById("modal-instrument-audio");
        audio.src = instrument.audio;
        audio.load(); // Ensure the new source is loaded

        const modal = document.getElementById("instrument-modal");
        modal.style.display = "flex";

        // Accessibility focus management
        const closeBtn = document.getElementById("instrument-close");
        closeBtn.focus();
    }

    function closeInstrument() {
        const modal = document.getElementById("instrument-modal");
        modal.style.display = "none";

        const audio = document.getElementById("modal-instrument-audio");
        audio.pause();
        audio.currentTime = 0;

        // Restore focus
        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    }

    function setupModalListeners() {
        const closeBtn = document.getElementById("instrument-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", closeInstrument);
        }

        const modal = document.getElementById("instrument-modal");
        if (modal) {
            modal.addEventListener("click", (e) => {
                if (e.target === modal) {
                    closeInstrument();
                }
            });

            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && modal.style.display === "flex") {
                    closeInstrument();
                }
            });
            
            // Focus trap for accessibility
            modal.addEventListener('keydown', function(e) {
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), audio');
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];

                if (e.key === 'Tab') {
                    if (e.shiftKey) { // Shift + Tab
                        if (document.activeElement === firstFocusable) {
                            lastFocusable.focus();
                            e.preventDefault();
                        }
                    } else { // Tab
                        if (document.activeElement === lastFocusable) {
                            firstFocusable.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        }
    }

    // Initialize module
    document.addEventListener("DOMContentLoaded", () => {
        try {
            initializeInstruments();
            setupModalListeners();
        } catch (error) {
            console.error("Failed to initialize Musical Instruments module:", error);
            if (window.Toast) {
                window.Toast.show("Failed to load musical instruments.", "error");
            }
        }
    });

})();
