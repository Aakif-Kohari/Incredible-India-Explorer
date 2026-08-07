document.addEventListener('DOMContentLoaded', () => {
    const regionalStyles = [
        {
            name: "Rabari",
            description: "Known for the use of mirrors in various shapes (round, triangular, square) and heavily decorated with chain stitches. Commonly uses vibrant colors like red, maroon, and yellow."
        },
        {
            name: "Ahir",
            description: "Characterized by round mirrors surrounded by intricate floral and bird motifs, typically done in chain stitch and herringbone stitch."
        },
        {
            name: "Jat",
            description: "Geometric patterns featuring closely clustered stitches with tiny mirrors, known for its dense and rigid structure, primarily found in Garasia Jat embroidery."
        },
        {
            name: "Mutwa",
            description: "Features extremely fine stitching with tiny mirrors. Mutwa embroidery includes a variety of styles like Mukko, Khareek, and Suf, known for delicate and precise needlework."
        }
    ];

    const stitches = [
        {
            name: "Chain Stitch (Sankli)",
            region: "Kutch General",
            description: "A series of looped stitches forming a chain-like pattern, extensively used to outline motifs and fill spaces in Ahir and Rabari embroidery."
        },
        {
            name: "Buttonhole Stitch",
            region: "Rabari",
            description: "Commonly used to fix mirrors securely onto the fabric, creating a decorative border around the glass."
        },
        {
            name: "Herringbone Stitch",
            region: "Ahir",
            description: "A crossed stitch used for filling larger areas of motifs, adding texture and depth to the embroidered patterns."
        },
        {
            name: "Darning Stitch",
            region: "Suf / Mutwa",
            description: "Counted thread embroidery done from the back of the fabric, creating precise geometric and symmetrical designs without outlining."
        }
    ];

    const motifs = [
        {
            name: "Peacock (Mor)",
            significance: "A common motif symbolizing beauty, grace, and the onset of monsoons. Frequently used in Ahir and Rabari embroidery."
        },
        {
            name: "Parrot (Popat)",
            significance: "Symbolizes love and passion. Often depicted in pairs facing each other."
        },
        {
            name: "Elephant (Hathi)",
            significance: "Represents strength, royalty, and prosperity. Commonly found in borders and central panels."
        },
        {
            name: "Mango (Keri) / Paisley",
            significance: "Symbol of fertility and prosperity, widely used across all styles of Kutch embroidery."
        },
        {
            name: "Floral Patterns (Phool)",
            significance: "Various flowers are used to depict the beauty of nature and life's blossoming."
        }
    ];

    // Render Regional Styles
    const stylesContainer = document.getElementById('regional-styles-container');
    if (stylesContainer) {
        regionalStyles.forEach(style => {
            const div = document.createElement('div');
            div.className = 'style-row';
            div.innerHTML = `
                <h3 style="color: var(--primary-gold); font-size: 1.5rem; margin-bottom: 10px;">${style.name}</h3>
                <p style="color: var(--text-muted); line-height: 1.6;">${style.description}</p>
            `;
            stylesContainer.appendChild(div);
        });
    }

    // Modal elements
    const modal = document.getElementById('details-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalRegion = document.getElementById('modal-region');
    const modalDesc = document.getElementById('modal-desc');
    const closeModal = document.getElementById('close-modal');

    function openModal(title, subtitle, desc) {
        modalTitle.textContent = title;
        modalRegion.textContent = subtitle ? `Region/Significance: ${subtitle}` : '';
        modalDesc.textContent = desc;
        modal.classList.add('active');
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Render Stitches
    const stitchGallery = document.getElementById('stitch-gallery');
    if (stitchGallery) {
        stitches.forEach(stitch => {
            const card = document.createElement('div');
            card.className = 'interactive-card';
            card.innerHTML = `
                <h3>${stitch.name}</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Click to view details</p>
            `;
            card.addEventListener('click', () => {
                openModal(stitch.name, stitch.region, stitch.description);
            });
            stitchGallery.appendChild(card);
        });
    }

    // Render Motifs
    const motifGallery = document.getElementById('motif-gallery');
    if (motifGallery) {
        motifs.forEach(motif => {
            const card = document.createElement('div');
            card.className = 'interactive-card';
            card.innerHTML = `
                <h3>${motif.name}</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Click to view significance</p>
            `;
            card.addEventListener('click', () => {
                openModal(motif.name, '', motif.significance);
            });
            motifGallery.appendChild(card);
        });
    }
});
