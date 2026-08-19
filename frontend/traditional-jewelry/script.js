// script.js - Gemstones and Jewelry Logic

(function () {
    'use strict';

    const data = window.jewelryData;
    if (!data) {
        console.error("Jewelry data is missing.");
        return;
    }

    // DOM Elements
    const themeBtn = document.getElementById('theme-toggle');
    const styleTabsContainer = document.getElementById('style-tabs');
    
    // Info Panel
    const infoName = document.getElementById('info-name');
    const infoRegion = document.getElementById('info-region');
    const infoMaterials = document.getElementById('info-materials');
    const infoGemstones = document.getElementById('info-gemstones');
    const infoTechnique = document.getElementById('info-technique');
    const infoSignificance = document.getElementById('info-significance');
    
    // Stepper
    const stepperList = document.getElementById('stepper-list');
    const stepDetailPanel = document.querySelector('.step-detail-panel');
    const stepNumberDisplay = document.getElementById('step-number-display');
    const stepTitle = document.getElementById('step-title');
    const stepDesc = document.getElementById('step-desc');
    const stepTools = document.getElementById('step-tools');
    const stepMaterials = document.getElementById('step-materials');
    const stepTime = document.getElementById('step-time');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    
    // Reference Sections
    const gemGrid = document.getElementById('gem-grid');
    const toolList = document.getElementById('tool-list');

    let currentStyleIndex = 0;
    let currentStepIndex = 0;

    // --- Theme Logic ---
    if (themeBtn) {
        let isDarkMode = localStorage.getItem('theme') === 'dark';
        if (isDarkMode) {
            document.body.classList.replace('light-theme', 'dark-theme');
            themeBtn.textContent = '☀️';
        }

        themeBtn.addEventListener('click', () => {
            if (document.body.classList.contains('light-theme')) {
                document.body.classList.replace('light-theme', 'dark-theme');
                localStorage.setItem('theme', 'dark');
                themeBtn.textContent = '☀️';
            } else {
                document.body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme', 'light');
                themeBtn.textContent = '🌙';
            }
        });
    }

    // --- Secure Render Helper ---
    function setSafeText(element, text) {
        if(element) element.textContent = text || '';
    }

    // --- Initialization ---
    function init() {
        buildStyleTabs();
        buildGemstones();
        buildTools();
        
        if (data.styles.length > 0) {
            loadStyle(0);
        }

        // Stepper Controls
        btnPrev.addEventListener('click', () => {
            if (currentStepIndex > 0) loadStep(currentStepIndex - 1);
        });
        
        btnNext.addEventListener('click', () => {
            const process = data.styles[currentStyleIndex].process;
            if (currentStepIndex < process.length - 1) loadStep(currentStepIndex + 1);
        });
        
        // Keyboard support for stepper controls (Arrow keys)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && !btnPrev.disabled) {
                btnPrev.click();
            } else if (e.key === 'ArrowRight' && !btnNext.disabled) {
                btnNext.click();
            }
        });
    }

    // --- Build Reference Sections ---
    function buildGemstones() {
        gemGrid.innerHTML = '';
        data.gemstones.forEach(gem => {
            const card = document.createElement('div');
            card.className = 'gem-card';
            
            const title = document.createElement('h4');
            const colorDot = document.createElement('span');
            colorDot.className = 'gem-color-indicator';
            
            // Map basic colors for indicator
            const cMap = {
                'Deep Red': '#9b1b30', 'Rich Green': '#0b6e4f', 
                'Deep Blue / Yellow': '#0f4c81', 'Iridescent White': '#f0eed3',
                'Clear (Uncut)': '#e0e0e0', 'Orange-Red': '#e66760'
            };
            colorDot.style.backgroundColor = cMap[gem.color] || '#ccc';
            
            title.appendChild(colorDot);
            title.appendChild(document.createTextNode(gem.name));
            
            const sym = document.createElement('p');
            sym.innerHTML = `<strong>Symbolism:</strong> `;
            sym.appendChild(document.createTextNode(gem.symbolism));
            
            const use = document.createElement('p');
            use.innerHTML = `<strong>Use:</strong> `;
            use.appendChild(document.createTextNode(gem.use));
            
            card.appendChild(title);
            card.appendChild(sym);
            card.appendChild(use);
            gemGrid.appendChild(card);
        });
    }

    function buildTools() {
        toolList.innerHTML = '';
        data.tools.forEach(tool => {
            const item = document.createElement('div');
            item.className = 'tool-item';
            
            const title = document.createElement('h4');
            setSafeText(title, tool.name);
            
            const desc = document.createElement('p');
            setSafeText(desc, tool.desc);
            
            item.appendChild(title);
            item.appendChild(desc);
            toolList.appendChild(item);
        });
    }

    // --- Style Management ---
    function buildStyleTabs() {
        styleTabsContainer.innerHTML = '';
        data.styles.forEach((style, index) => {
            const btn = document.createElement('button');
            btn.className = 'tab-btn';
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-selected', 'false');
            setSafeText(btn, style.name);
            
            btn.addEventListener('click', () => loadStyle(index));
            styleTabsContainer.appendChild(btn);
        });
    }

    function loadStyle(index) {
        currentStyleIndex = index;
        currentStepIndex = 0;
        const style = data.styles[index];
        
        // Update Tabs
        const tabs = styleTabsContainer.querySelectorAll('.tab-btn');
        tabs.forEach((tab, i) => {
            if (i === index) {
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
            } else {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
            }
        });

        // Update Info Panel
        setSafeText(infoName, style.name);
        setSafeText(infoRegion, style.region);
        setSafeText(infoMaterials, style.materials);
        setSafeText(infoGemstones, style.gemstones);
        setSafeText(infoTechnique, style.technique);
        setSafeText(infoSignificance, style.significance);

        buildStepper();
        loadStep(0);
    }

    // --- Stepper Logic ---
    function buildStepper() {
        stepperList.innerHTML = '';
        const process = data.styles[currentStyleIndex].process;
        
        process.forEach((step, index) => {
            const li = document.createElement('li');
            li.className = 'step-indicator';
            
            const dot = document.createElement('button');
            dot.className = 'step-dot';
            dot.setAttribute('aria-label', `Step ${step.step}: ${step.title}`);
            setSafeText(dot, step.step);
            
            const label = document.createElement('span');
            label.className = 'step-label';
            setSafeText(label, step.title);
            
            dot.addEventListener('click', () => loadStep(index));
            
            li.appendChild(dot);
            li.appendChild(label);
            stepperList.appendChild(li);
        });
    }

    function loadStep(index) {
        currentStepIndex = index;
        const process = data.styles[currentStyleIndex].process;
        const step = process[index];

        // Fade effect
        stepDetailPanel.classList.add('fade-out');
        
        setTimeout(() => {
            // Update Stepper UI
            const indicators = stepperList.querySelectorAll('.step-indicator');
            indicators.forEach((ind, i) => {
                ind.classList.remove('active', 'completed');
                ind.removeAttribute('aria-current');
                
                if (i === index) {
                    ind.classList.add('active');
                    ind.setAttribute('aria-current', 'step');
                } else if (i < index) {
                    ind.classList.add('completed');
                }
            });

            // Update Step Details
            setSafeText(stepNumberDisplay, step.step);
            setSafeText(stepTitle, step.title);
            setSafeText(stepDesc, step.description);
            setSafeText(stepTools, step.tools);
            setSafeText(stepMaterials, step.materials);
            setSafeText(stepTime, step.timeRequired);

            // Update Controls
            btnPrev.disabled = index === 0;
            btnNext.disabled = index === process.length - 1;

            stepDetailPanel.classList.remove('fade-out');
            
            // Manage focus for accessibility if triggered by keyboard
            // (Assuming natural flow handles mouse clicks fine)
        }, 300);
    }

    init();

})();
