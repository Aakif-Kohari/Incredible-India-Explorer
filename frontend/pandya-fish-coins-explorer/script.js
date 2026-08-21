/* script.js */
document.addEventListener('DOMContentLoaded', () => {

    // Mock images using placeholder service since actual assets aren't specified.
    // In a real scenario, these would point to `../../assets/coins/pandya/...`
    const PL_OB = "../../assets/Mahatma.png"; // Placeholder
    const PL_REV = "../../assets/Mahatma.png"; // Placeholder

    // 1. Coin Data
    const pandyaCoins = [
        {
            id: "coin-1",
            name: "Early Pandya Square Copper",
            period: "c. 2nd Century BCE",
            obverse: PL_OB,
            reverse: PL_REV,
            symbols: ["Elephant", "Bodhi Tree", "Trident", "Stylized Fish"],
            inscription: "Peruvaluthi (in Tamil-Brahmi)",
            region: "Madurai / Korkai",
            description: "An early Sangam period square copper coin. The obverse features an elephant facing right with auspicious symbols. The reverse prominently features a stylized fish, establishing the early adoption of the dynastic emblem.",
            fishRegion: { obverse: false, reverse: true, x: 45, y: 40, width: 20, height: 20 }
        },
        {
            id: "coin-2",
            name: "Sangam Age Silver Punch-marked",
            period: "c. 1st Century BCE",
            obverse: PL_OB,
            reverse: PL_REV,
            symbols: ["Sun", "Six-armed symbol", "Fish with line"],
            inscription: "None",
            region: "Vaigai River Bed",
            description: "Silver punch-marked coin following the Mauryan standard but bearing a distinct Pandya counter-mark of a fish, indicating local circulation and authority.",
            fishRegion: { obverse: true, reverse: false, x: 30, y: 60, width: 15, height: 15 }
        },
        {
            id: "coin-3",
            name: "Medieval Pandya Copper (Standing King)",
            period: "c. 13th Century CE",
            obverse: PL_OB,
            reverse: PL_REV,
            symbols: ["Standing King", "Seated figure", "Twin Fishes"],
            inscription: "Sundara / Ellamthalaiyanan",
            region: "Tamil Nadu",
            description: "Influenced by the Chola 'standing king' design, these later coins replace Chola emblems with the Pandya Twin Fishes, asserting sovereignty during the Pandya revival.",
            fishRegion: { obverse: false, reverse: true, x: 50, y: 25, width: 25, height: 15 }
        }
    ];

    // Viewer State
    let currentCoinIndex = 0;
    let showingObverse = true;
    let isFishHighlighted = false;

    // DOM Elements - Viewer
    const coinSelector = document.getElementById('coin-selector');
    const coinImg = document.getElementById('current-coin-img');
    const fishHighlight = document.getElementById('fish-highlight');
    const btnToggleSide = document.getElementById('btn-toggle-side');
    const btnHighlight = document.getElementById('btn-highlight-fish');
    
    // DOM Elements - Details
    const detailName = document.getElementById('detail-name');
    const detailPeriod = document.getElementById('detail-period');
    const detailRegion = document.getElementById('detail-region');
    const detailSymbols = document.getElementById('detail-symbols');
    const detailInscription = document.getElementById('detail-inscription');
    const detailDesc = document.getElementById('detail-desc');

    // Populate Selectors
    function populateSelectors() {
        if (!coinSelector) return;
        
        pandyaCoins.forEach((coin, index) => {
            const option = new Option(coin.name, index);
            coinSelector.add(option);
        });

        const compare1 = document.getElementById('compare-select-1');
        const compare2 = document.getElementById('compare-select-2');
        if (compare1 && compare2) {
            pandyaCoins.forEach((coin, index) => {
                compare1.add(new Option(coin.name, index));
                compare2.add(new Option(coin.name, index));
            });
            compare2.selectedIndex = Math.min(1, pandyaCoins.length - 1);
        }
    }

    // Update Viewer
    function updateViewer() {
        const coin = pandyaCoins[currentCoinIndex];
        if (!coin) return;

        // Reset states
        showingObverse = true;
        btnToggleSide.textContent = "View Reverse";
        isFishHighlighted = false;
        fishHighlight.classList.add('hidden');
        
        updateCoinImage();

        // Update Text
        detailName.textContent = coin.name;
        detailPeriod.textContent = coin.period;
        detailRegion.textContent = coin.region;
        detailSymbols.textContent = coin.symbols.join(", ");
        detailInscription.textContent = coin.inscription;
        detailDesc.textContent = coin.description;
    }

    function updateCoinImage() {
        const coin = pandyaCoins[currentCoinIndex];
        coinImg.src = showingObverse ? coin.obverse : coin.reverse;
        coinImg.alt = `${coin.name} - ${showingObverse ? 'Obverse' : 'Reverse'}`;
        
        updateHighlightState();
    }

    function updateHighlightState() {
        const coin = pandyaCoins[currentCoinIndex];
        const region = coin.fishRegion;
        
        // Check if fish is on the current side
        const hasFishOnThisSide = (showingObverse && region.obverse) || (!showingObverse && region.reverse);
        
        if (isFishHighlighted && hasFishOnThisSide) {
            fishHighlight.style.left = `${region.x}%`;
            fishHighlight.style.top = `${region.y}%`;
            fishHighlight.style.width = `${region.width}%`;
            fishHighlight.style.height = `${region.height}%`;
            fishHighlight.classList.remove('hidden');
        } else {
            fishHighlight.classList.add('hidden');
        }
    }

    // Event Listeners - Viewer
    if (coinSelector) {
        coinSelector.addEventListener('change', (e) => {
            currentCoinIndex = parseInt(e.target.value);
            updateViewer();
        });
    }

    if (btnToggleSide) {
        btnToggleSide.addEventListener('click', () => {
            showingObverse = !showingObverse;
            btnToggleSide.textContent = showingObverse ? "View Reverse" : "View Obverse";
            updateCoinImage();
        });
    }

    if (btnHighlight) {
        btnHighlight.addEventListener('click', () => {
            isFishHighlighted = !isFishHighlighted;
            
            const coin = pandyaCoins[currentCoinIndex];
            const hasFishOnThisSide = (showingObverse && coin.fishRegion.obverse) || (!showingObverse && coin.fishRegion.reverse);
            
            if (isFishHighlighted && !hasFishOnThisSide) {
                // Auto flip if fish is on the other side
                showingObverse = !showingObverse;
                btnToggleSide.textContent = showingObverse ? "View Reverse" : "View Obverse";
                updateCoinImage();
            } else {
                updateHighlightState();
            }
        });
    }

    // Zoom Dialog
    const zoomDialog = document.getElementById('zoom-dialog');
    const zoomedImage = document.getElementById('zoomed-image');
    const zoomedCaption = document.getElementById('zoomed-caption');
    const closeDialog = document.getElementById('close-dialog');

    if (coinImg && zoomDialog) {
        coinImg.addEventListener('click', () => {
            const coin = pandyaCoins[currentCoinIndex];
            zoomedImage.src = coinImg.src;
            zoomedCaption.textContent = `${coin.name} (${showingObverse ? 'Obverse' : 'Reverse'})`;
            zoomDialog.showModal();
        });

        // Keyboard support for image
        coinImg.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                coinImg.click();
            }
        });

        closeDialog.addEventListener('click', () => zoomDialog.close());
        zoomDialog.addEventListener('click', (e) => {
            if (e.target === zoomDialog) zoomDialog.close();
        });
    }

    // Compare System
    function updateCompareSlot(slotNum) {
        const selectId = `compare-select-${slotNum}`;
        const imgId = `compare-img-${slotNum}`;
        const detailsId = `compare-details-${slotNum}`;
        
        const select = document.getElementById(selectId);
        const img = document.getElementById(imgId);
        const details = document.getElementById(detailsId);
        
        if (!select || !img || !details) return;
        
        const coin = pandyaCoins[parseInt(select.value)];
        
        // Show reverse by default for comparison since fish is usually there
        img.src = coin.reverse;
        img.alt = `${coin.name} reverse`;
        
        details.innerHTML = `
            <p><strong>Name:</strong> ${coin.name}</p>
            <p><strong>Period:</strong> ${coin.period}</p>
            <p><strong>Symbols:</strong> ${coin.symbols.join(", ")}</p>
            <p><strong>Inscription:</strong> ${coin.inscription}</p>
        `;
    }

    const compareSelect1 = document.getElementById('compare-select-1');
    const compareSelect2 = document.getElementById('compare-select-2');
    
    if (compareSelect1 && compareSelect2) {
        compareSelect1.addEventListener('change', () => updateCompareSlot(1));
        compareSelect2.addEventListener('change', () => updateCompareSlot(2));
    }

    // Timeline Rendering
    const timelineData = [
        {
            period: "Sangam Period (c. 300 BCE - 300 CE)",
            title: "Early Punch-Marked & Die-Struck Coins",
            desc: "Pandyas issued square copper coins with elephant and auspicious symbols on the obverse and a stylized fish on the reverse. Silver punch-marked coins also circulated with local fish counter-marks."
        },
        {
            period: "Kalabhra Interregnum (c. 300 CE - 600 CE)",
            title: "Dark Age in Numismatics",
            desc: "A period of obscurity. Very few coins from this era can be definitively attributed to the Pandyas."
        },
        {
            period: "First Pandyan Empire (c. 600 CE - 920 CE)",
            title: "Revival of Fish Motif",
            desc: "Coins bearing names like 'Avanipasekharan' appeared, featuring the twin fish symbol alongside a boar or bull, indicating shifting political alliances."
        },
        {
            period: "Second Pandyan Empire (c. 13th Century CE)",
            title: "Medieval Standing King Series",
            desc: "Influenced by Chola numismatic traditions, these coins featured a standing king on the obverse, but replaced the Chola tiger with the Pandya twin fish on the reverse."
        }
    ];

    const timelineWrapper = document.getElementById('timeline-wrapper');
    if (timelineWrapper) {
        timelineData.forEach(item => {
            const el = document.createElement('div');
            el.className = 'timeline-item';
            el.tabIndex = 0;
            el.innerHTML = `
                <div class="timeline-period">${item.period}</div>
                <div class="timeline-content">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            `;
            timelineWrapper.appendChild(el);
        });
    }

    // Initialize
    populateSelectors();
    updateViewer();
    updateCompareSlot(1);
    updateCompareSlot(2);
});
