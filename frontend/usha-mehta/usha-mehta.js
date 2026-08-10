/* usha-mehta.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Timeline Data & Rendering
    const ushaMehtaTimeline = [
        {
            year: "1920",
            title: "Early Life",
            description: "Born on 25 March 1920 in Saras village near Surat, Gujarat. She was deeply influenced by Gandhi's ideals from childhood."
        },
        {
            year: "1928",
            title: "First Protest",
            description: "At age eight, she participated in a protest march against the Simon Commission."
        },
        {
            year: "August 1942",
            title: "Quit India Movement",
            description: "When the Quit India Movement was launched and leaders were arrested, Usha Mehta and her associates set up the Secret Congress Radio."
        },
        {
            year: "Aug - Nov 1942",
            title: "Underground Broadcasting",
            description: "The radio station broadcasted on 42.34 meters from changing locations in Bombay to avoid detection, spreading news of the freedom struggle."
        },
        {
            year: "November 1942",
            title: "Arrest",
            description: "The CID traced the location of the radio station, and Usha Mehta along with her associates were arrested and sentenced to imprisonment."
        },
        {
            year: "1946",
            title: "Release",
            description: "She was released from Yerwada Jail and went on to complete her Ph.D. on the political and social thought of Mahatma Gandhi."
        },
        {
            year: "1998",
            title: "Padma Vibhushan",
            description: "The Government of India conferred on her the Padma Vibhushan, the second highest civilian award."
        }
    ];

    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) {
        ushaMehtaTimeline.forEach((event, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            const html = `
                <div class="timeline-event ${side}">
                    <div class="timeline-content">
                        <div class="timeline-year">${event.year}</div>
                        <h3 class="timeline-title">${event.title}</h3>
                        <p>${event.description}</p>
                    </div>
                </div>
            `;
            timelineContainer.insertAdjacentHTML('beforeend', html);
        });
    }

    // Timeline Scroll Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-event').forEach(el => {
        observer.observe(el);
    });

    // 2. Interactive Diagram Logic
    const nodes = document.querySelectorAll('.node');
    const infoTitle = document.getElementById('diagram-info-title');
    const infoDesc = document.getElementById('diagram-info-desc');
    const infoPanel = document.getElementById('diagram-info-panel');

    nodes.forEach(node => {
        const handleInteraction = () => {
            // Remove active from all
            nodes.forEach(n => n.classList.remove('active-node'));
            // Add to current
            node.classList.add('active-node');
            
            // Update panel
            infoPanel.style.opacity = 0;
            setTimeout(() => {
                infoTitle.textContent = node.textContent;
                infoDesc.textContent = node.getAttribute('data-info');
                infoPanel.style.opacity = 1;
            }, 300);
        };

        node.addEventListener('click', handleInteraction);
        node.addEventListener('mouseenter', handleInteraction);
        
        // Keyboard accessibility
        node.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleInteraction();
            }
        });
    });

    // 3. Gallery Data
    const galleryImages = [
        {
            url: "assets/Mahatma.png",
            caption: "Quit India Movement Mass Protests",
            source: "Representative Image"
        },
        {
            url: "https://picsum.photos/id/1025/600/400",
            caption: "Old Radio Transmitter Equipment",
            source: "Representative Image"
        },
        {
            url: "https://picsum.photos/id/1050/600/400",
            caption: "Bombay in the 1940s",
            source: "Representative Image"
        }
    ];

    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        galleryImages.forEach(img => {
            const html = `
                <div class="gallery-item">
                    <div class="gallery-img-wrapper">
                        <img src="${img.url}" alt="${img.caption}" class="gallery-img" loading="lazy">
                    </div>
                    <div class="gallery-caption">
                        <strong>${img.caption}</strong>
                        <span class="gallery-source">Source: ${img.source}</span>
                    </div>
                </div>
            `;
            galleryGrid.insertAdjacentHTML('beforeend', html);
        });
    }

    // 4. References Data
    const references = [
        {
            text: "Usha Mehta: Freedom Fighter Who Set Up A Secret Radio Station (Archive)",
            link: "#"
        },
        {
            text: "Quit India Movement: The role of Congress Radio",
            link: "#"
        },
        {
            text: "Padma Awards Directory (1954-2013)",
            link: "#"
        }
    ];

    const referencesList = document.getElementById('references-list');
    if (referencesList) {
        references.forEach(ref => {
            const html = `
                <li>
                    ${ref.link !== '#' ? `<a href="${ref.link}" target="_blank" rel="noopener noreferrer">${ref.text}</a>` : `<span>${ref.text}</span>`}
                </li>
            `;
            referencesList.insertAdjacentHTML('beforeend', html);
        });
    }

});
