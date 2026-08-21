(function () {
    "use strict";

    const handicrafts = [
        {
            id: "pashmina",
            name: "Pashmina",
            region: "Kashmir",
            description: "A fine textile tradition associated with Kashmir and the use of exceptionally fine cashmere wool.",
            history: "The craft of Pashmina making in Kashmir is believed to be over 500 years old, historically patronized by Mughal emperors and European nobility for its unmatched softness and warmth.",
            materials: [
                "Changthangi goat wool (Pashm)",
                "Natural dyes"
            ],
            technique: "Traditional hand-spinning on a charkha and weaving on handlooms. The delicate fiber requires highly skilled artisans to prevent breakage.",
            significance: "Pashmina remains a symbol of luxury and Kashmiri cultural identity, often gifted during weddings and special occasions.",
            image: "../../assets/handicrafts/pashmina.webp",
            imageAlt: "Traditional Kashmiri Pashmina textile with intricate embroidery",
            credit: "Image: AI Generated"
        },
        {
            id: "madhubani",
            name: "Madhubani Painting",
            region: "Bihar",
            description: "Also known as Mithila painting, characterized by eye-catching geometrical patterns and vibrant colors.",
            history: "Traditionally created by women in the Mithila region of Bihar, Madhubani paintings originally adorned the freshly plastered mud walls of homes during festivals and ceremonies.",
            materials: [
                "Natural pigments and dyes (ochre, lampblack, turmeric)",
                "Twigs, fingers, and matchsticks as brushes",
                "Handmade paper or cloth"
            ],
            technique: "Lines are drawn directly without sketching, and spaces are filled with intricate motifs representing nature, deities, and daily life. There is usually no empty space left.",
            significance: "These paintings are culturally vital for storytelling, passing down religious myths, and marking significant life events like marriages and births.",
            image: "../../assets/handicrafts/madhubani.webp",
            imageAlt: "Traditional Madhubani painting from Bihar",
            credit: "Image: AI Generated"
        },
        {
            id: "terracotta",
            name: "Bankura Terracotta",
            region: "West Bengal",
            description: "A celebrated clay craft from West Bengal, famous for the iconic Bankura Horse.",
            history: "Terracotta art in Bengal dates back centuries, prominently visible in the intricately carved temples of Bishnupur built by Malla kings.",
            materials: [
                "Locally sourced clay",
                "Sand"
            ],
            technique: "Clay is molded, dried, and then fired in a kiln. The signature reddish-brown hue is achieved through specific firing temperatures.",
            significance: "The Bankura Horse is not just a decorative item but a ritualistic object dedicated to local deities, now symbolizing Indian folk art globally.",
            image: "../../assets/handicrafts/terracotta.webp",
            imageAlt: "Traditional Bankura Terracotta horse from West Bengal",
            credit: "Image: AI Generated"
        },
        {
            id: "blue-pottery",
            name: "Blue Pottery",
            region: "Rajasthan",
            description: "A distinctive glazed pottery recognized by its vibrant blue color and intricate floral motifs.",
            history: "Of Turko-Persian origin, the craft traveled to India and was patronized by the royalty of Jaipur in the 19th century.",
            materials: [
                "Quartz stone powder",
                "Powdered glass",
                "Multani Mitti (Fuller's Earth)",
                "Borax and gum"
            ],
            technique: "Unlike traditional pottery, it does not use clay. The dough is pressed into molds, painted with oxide colors (cobalt for blue), and fired at low temperatures.",
            significance: "It is a celebrated GI-tagged craft of Jaipur, continuing to blend Persian elegance with Rajasthani artistic sensibilities.",
            image: "../../assets/handicrafts/blue_pottery.webp",
            imageAlt: "Traditional Jaipur Blue Pottery",
            credit: "Image: AI Generated"
        },
        {
            id: "dhokra",
            name: "Dhokra",
            region: "Practiced across Chhattisgarh, Odisha, and West Bengal",
            description: "An ancient non-ferrous metal casting technique known for its rustic, wire-like appearance.",
            history: "Dhokra is one of the oldest traditional methods of metal casting in India, dating back over 4,000 years to the Indus Valley Civilization (e.g., the Dancing Girl of Mohenjo-Daro).",
            materials: [
                "Brass or bronze",
                "Beeswax or resin",
                "Clay and rice husk"
            ],
            technique: "Uses the 'lost-wax' casting method. A clay core is covered with wax threads, enclosed in an outer clay mold, and baked. The wax melts away, replaced by molten metal.",
            significance: "Preserved by tribal communities, the craft reflects animistic traditions, folklore, and rural life without the use of modern machinery.",
            image: "../../assets/handicrafts/dhokra.webp",
            imageAlt: "Traditional Dhokra metal craft figures",
            credit: "Image: AI Generated"
        },
        {
            id: "channapatna-toys",
            name: "Channapatna Toys",
            region: "Karnataka",
            description: "Colorful, safe, and eco-friendly wooden toys crafted in the 'Toy Town' of Channapatna.",
            history: "The craft originated during the reign of Tipu Sultan, who invited Persian artisans to train local craftspeople in wooden toy making.",
            materials: [
                "Aale mara (Ivory wood)",
                "Vegetable dyes",
                "Lac"
            ],
            technique: "Wood is shaped on a lathe, and while spinning, colored lac is applied. The friction melts the lac, giving the toys a brilliant, non-toxic polished finish.",
            significance: "These toys are highly valued for their child-safe, non-toxic nature, preserving a sustainable artisan tradition.",
            image: "../../assets/handicrafts/channapatna_toys.webp",
            imageAlt: "Traditional Channapatna wooden toys",
            credit: "Image: AI Generated"
        },
        {
            id: "phulkari",
            name: "Phulkari",
            region: "Punjab",
            description: "Meaning 'flower work', Phulkari is a vibrant embroidery technique heavily using bright floral motifs.",
            history: "Historically, Phulkari was a domestic art, embroidered by women for their own use or for dowries, carrying deep emotional and familial significance.",
            materials: [
                "Khaddar (handspun cotton cloth)",
                "Untwisted silk thread (Pat)"
            ],
            technique: "Embroidery is done on the wrong side of the cloth using the darn stitch. The patterns emerge vividly on the front.",
            significance: "Integral to Punjabi culture, Phulkari shawls (like the Bagh) are essential during weddings, festivals, and the celebration of new life.",
            image: "../../assets/handicrafts/phulkari.webp",
            imageAlt: "Traditional Phulkari embroidery from Punjab",
            credit: "Image: AI Generated"
        },
        {
            id: "kutch-embroidery",
            name: "Kutch Embroidery",
            region: "Gujarat",
            description: "A brilliant, heavily textured embroidery known for its vibrant colors, mirror work, and intricate stitches.",
            history: "Nurtured by various pastoral and nomadic communities in the Kutch region, each with their own distinct stitches and motifs.",
            materials: [
                "Cotton or silk fabric",
                "Vibrant silk threads",
                "Abhla (small mirrors)"
            ],
            technique: "Involves diverse styles such as Rabari, Suf, and Ahir, combining intricate darning, chain stitches, and the iconic mirror insertions.",
            significance: "More than decoration, the embroidery serves as a marker of community identity, marital status, and social standing.",
            image: "../../assets/handicrafts/kutch_embroidery.webp",
            imageAlt: "Traditional Kutch embroidery with mirror work",
            credit: "Image: AI Generated"
        },
        {
            id: "pattachitra",
            name: "Pattachitra",
            region: "Odisha",
            description: "A traditional, cloth-based scroll painting known for its intricate details and mythological narratives.",
            history: "Originating around the 12th century, it is closely tied to the cult of Lord Jagannath in Puri.",
            materials: [
                "Patta (canvas made of cotton fabric and tamarind paste)",
                "Natural colors (conch shell, lamp black, hingula)"
            ],
            technique: "The canvas is prepared meticulously. Borders are drawn first, followed by the figures without pencil sketching, and finally filled with vibrant natural colors.",
            significance: "Pattachitra serves both a religious and artistic purpose, originally used as substitute icons during the period when the temple deities were kept away from public view.",
            image: "../../assets/handicrafts/pattachitra.webp",
            imageAlt: "Traditional Pattachitra scroll painting from Odisha",
            credit: "Image: AI Generated"
        }
    ];

    let activeHandicraft = null;
    let previouslyFocusedElement = null;

    const grid = document.getElementById('handicraftsGrid');
    const modal = document.getElementById('handicraftModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    // Modal Content Elements
    const mImage = document.getElementById('modalImage');
    const mTitle = document.getElementById('modal-title');
    const mRegion = document.getElementById('modalRegion');
    const mDesc = document.getElementById('modalDescription');
    const mHistory = document.getElementById('modalHistory');
    const mMaterials = document.getElementById('modalMaterials');
    const mTechnique = document.getElementById('modalTechnique');
    const mSignificance = document.getElementById('modalSignificance');
    const mCredit = document.getElementById('modalCredit');

    function initializeHandicrafts() {
        handicrafts.forEach(craft => {
            const card = document.createElement('button');
            card.className = 'handicraft-card-button';
            card.dataset.id = craft.id;
            card.setAttribute('aria-label', `View details for ${craft.name}`);

            card.innerHTML = `
                <img class="handicraft-card-image" src="${craft.image}" alt="${craft.imageAlt}" loading="lazy">
                <div class="handicraft-card-content">
                    <h2 class="handicraft-card-title">${craft.name}</h2>
                    <p class="handicraft-card-region">${craft.region}</p>
                </div>
            `;
            
            grid.appendChild(card);
        });

        // Event delegation for grid
        grid.addEventListener('click', (e) => {
            const button = e.target.closest('.handicraft-card-button');
            if (button) {
                const craftId = button.dataset.id;
                const craft = handicrafts.find(c => c.id === craftId);
                if (craft) {
                    previouslyFocusedElement = button;
                    openModal(craft);
                }
            }
        });

        // Modal Close Events
        modalCloseBtn.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);
        
        // Trap focus and handle escape
        modal.addEventListener('keydown', trapFocus);
    }

    function openModal(craft) {
        activeHandicraft = craft;
        
        // Populate data
        mImage.src = craft.image;
        mImage.alt = craft.imageAlt;
        mTitle.textContent = craft.name;
        mRegion.textContent = craft.region;
        mDesc.textContent = craft.description;
        mHistory.textContent = craft.history;
        mTechnique.textContent = craft.technique;
        mSignificance.textContent = craft.significance;
        mCredit.textContent = craft.credit || "";

        mMaterials.innerHTML = '';
        if (craft.materials && craft.materials.length > 0) {
            craft.materials.forEach(mat => {
                const li = document.createElement('li');
                li.textContent = mat;
                mMaterials.appendChild(li);
            });
        }

        // Show modal
        modal.hidden = false;
        document.body.style.overflow = 'hidden'; // Prevent background scroll

        // Set focus to close button
        modalCloseBtn.focus();
    }

    function closeModal() {
        if (!activeHandicraft) return;

        modal.hidden = true;
        document.body.style.overflow = ''; // Restore background scroll
        activeHandicraft = null;

        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }
    }

    function trapFocus(e) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        if (e.key === 'Escape') {
            closeModal();
            return;
        }

        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    }

    // Init
    document.addEventListener('DOMContentLoaded', initializeHandicrafts);

})();
