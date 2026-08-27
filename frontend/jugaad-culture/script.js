/**
 * Jugaad — Creative Problem-Solving Culture
 * Interactive Scenario Solver Engine & Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Management
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.dataset.listenerBound = 'true';
        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            if (isLight) {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // 3. Interactive Scenario Challenge Data
    const scenarios = [
        {
            icon: '☀️',
            title: 'Off-Grid Rural Milk Cooling',
            desc: 'A village dairy cooperative without reliable 24/7 electricity faces spoilage of evening milk batches before morning transport. What is the most creative, safe, and frugal solution?',
            options: [
                {
                    letter: 'A',
                    text: 'Construct a charcoal and jute evaporative cooling chamber using ambient water dripping.',
                    isCorrect: true,
                    title: 'Brilliant Frugal Innovation!',
                    feedback: 'Evaporative cooler chambers (like the Zero Energy Cool Chamber invented in India) reduce temperatures by 10-15°C using basic thermodynamics, porous wet charcoal/sand, and zero electricity—completely safe and food-hygienic.'
                },
                {
                    letter: 'B',
                    text: 'Bypass neighbor\'s high-voltage electrical grid lines with raw metal hooks to run a standard chiller.',
                    isCorrect: false,
                    title: 'Dangerous Shortcut (Unsafe Jugaad)',
                    feedback: 'Illegal grid tapping causes severe fire hazards, electrocution risks, and transformer burnout. This is an example of reckless compromise rather than genuine innovation.'
                },
                {
                    letter: 'C',
                    text: 'Mix unverified chemical preservatives into the milk to prevent bacterial souring.',
                    isCorrect: false,
                    title: 'Hazardous Adulteration',
                    feedback: 'Adding adulterants or unapproved chemicals creates severe public health dangers. True Jugaad never compromises biological safety.'
                }
            ]
        },
        {
            icon: '💧',
            title: 'Water Scarcity in Sloped Terrains',
            desc: 'A hilltop community in the Western Ghats loses precious monsoon runoff rapidly down steep hillsides, leaving orchards dry during summer. How do you conserve water frugally?',
            options: [
                {
                    letter: 'A',
                    text: 'Carve indigenous horizontal contour trenches (Suranga / contour bunds) with check-dams from local stones.',
                    isCorrect: true,
                    title: 'Timeless Traditional Engineering!',
                    feedback: 'Contour bunding and stone check-dams slow water velocity, recharging local groundwater aquifers without expensive concrete reservoirs or heavy machinery.'
                },
                {
                    letter: 'B',
                    text: 'Divert deep river channels using unlined dynamite blasting on the rocky ridge.',
                    isCorrect: false,
                    title: 'Ecological Disaster',
                    feedback: 'Uncontrolled blasting destabilizes slopes, triggering landslides and destroying natural groundwater channels.'
                },
                {
                    letter: 'C',
                    text: 'Wait for monsoon and abandon cultivation during dry months entirely.',
                    isCorrect: false,
                    title: 'Passive Inaction',
                    feedback: 'Frugal innovation is proactive—utilizing readily available materials to overcome climatic constraints.'
                }
            ]
        },
        {
            icon: '🌾',
            title: 'Pest Control on Smallhold Organic Farms',
            desc: 'Smallholder farmers in Uttar Pradesh want to protect mustard and pulse crops from nocturnal insects without purchasing toxic synthetic pesticides.',
            options: [
                {
                    letter: 'A',
                    text: 'Install kerosene lamp light-traps with water-oil tubs and neem-leaf extract sprays.',
                    isCorrect: true,
                    title: 'Eco-Smart Pest Trapping!',
                    feedback: 'Using low-cost nocturnal solar/oil light traps combined with botanical neem extracts provides natural biological pest management at virtually zero financial cost.'
                },
                {
                    letter: 'B',
                    text: 'Burn old vehicle tyres around the fields at night to create dense black smoke.',
                    isCorrect: false,
                    title: 'Toxic & Polluting',
                    feedback: 'Burning tyres releases toxic dioxins, ruins soil micro-nutrients, and harms human respiratory health.'
                },
                {
                    letter: 'C',
                    text: 'Spray industrial battery acid diluted in water over the crop leaves.',
                    isCorrect: false,
                    title: 'Extreme Chemical Hazard',
                    feedback: 'Corrosive acids poison the food supply and destroy crops permanently.'
                }
            ]
        },
        {
            icon: '🚲',
            title: 'Urban Micro-Delivery Mobility',
            desc: 'A neighborhood library needs to transport books to rural schools across narrow muddy alleys where motorized vans cannot enter.',
            options: [
                {
                    letter: 'A',
                    text: 'Retrofit a sturdy cycle rickshaw with a recycled waterproof wooden trunk and fold-out bookshelf (Bicycle Library).',
                    isCorrect: true,
                    title: 'Sustainable Grassroots Ingenuity!',
                    feedback: 'Bicycle and rickshaw libraries are celebrated worldwide—zero emissions, maneuverable in tight alleys, and easily maintained by local mechanics.'
                },
                {
                    letter: 'B',
                    text: 'Modify a scooter to carry 10 people holding books along narrow dirt paths.',
                    isCorrect: false,
                    title: 'Overloading Hazard',
                    feedback: 'Severe vehicle overloading leads to loss of vehicular balance, brake failure, and road injuries.'
                },
                {
                    letter: 'C',
                    text: 'Cancel the reading project until a multi-lane highway is paved.',
                    isCorrect: false,
                    title: 'Bureaucratic Delay',
                    feedback: 'Jugaad thrives by finding lightweight solutions immediately available within the existing environment.'
                }
            ]
        }
    ];

    let currentStep = 0;
    let score = 0;

    const progressFill = document.getElementById('progress-fill');
    const stepIndicator = document.getElementById('step-indicator');
    const scenarioIcon = document.getElementById('scenario-icon');
    const scenarioTitle = document.getElementById('scenario-title');
    const scenarioDesc = document.getElementById('scenario-desc');
    const optionsGrid = document.getElementById('options-grid');
    const feedbackPanel = document.getElementById('feedback-panel');
    const feedbackBadge = document.getElementById('feedback-badge');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');
    const btnNext = document.getElementById('btn-next-scenario');
    const simSummary = document.getElementById('sim-summary');
    const btnRestart = document.getElementById('btn-restart-sim');
    const scenarioBox = document.getElementById('scenario-box');

    function renderScenario(index) {
        if (index >= scenarios.length) {
            showSummary();
            return;
        }

        const data = scenarios[index];
        if (progressFill) progressFill.style.width = `${((index + 1) / scenarios.length) * 100}%`;
        if (stepIndicator) stepIndicator.textContent = `Challenge ${index + 1} of ${scenarios.length}`;
        if (scenarioIcon) scenarioIcon.textContent = data.icon;
        if (scenarioTitle) scenarioTitle.textContent = data.title;
        if (scenarioDesc) scenarioDesc.textContent = data.desc;

        if (feedbackPanel) feedbackPanel.hidden = true;
        if (optionsGrid) {
            optionsGrid.innerHTML = '';
            data.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.setAttribute('data-index', idx);
                btn.innerHTML = `<span class="opt-letter">${opt.letter}</span> <span>${opt.text}</span>`;
                btn.addEventListener('click', () => handleOptionSelect(idx));
                optionsGrid.appendChild(btn);
            });
        }
    }

    function handleOptionSelect(selectedIdx) {
        const data = scenarios[currentStep];
        const selectedOpt = data.options[selectedIdx];
        const allBtns = optionsGrid.querySelectorAll('.option-btn');

        allBtns.forEach((btn, idx) => {
            btn.disabled = true;
            if (data.options[idx].isCorrect) {
                btn.classList.add('opt-correct');
            } else if (idx === selectedIdx) {
                btn.classList.add('opt-wrong');
            }
        });

        if (selectedOpt.isCorrect) {
            score++;
            if (feedbackBadge) {
                feedbackBadge.textContent = 'Safe & Frugal Innovation';
                feedbackBadge.className = 'feedback-badge badge-success';
            }
        } else {
            if (feedbackBadge) {
                feedbackBadge.textContent = 'Unsafe / Flawed Solution';
                feedbackBadge.className = 'feedback-badge badge-danger';
            }
        }

        if (feedbackTitle) feedbackTitle.textContent = selectedOpt.title;
        if (feedbackText) feedbackText.textContent = selectedOpt.feedback;
        if (feedbackPanel) feedbackPanel.hidden = false;
    }

    function showSummary() {
        if (scenarioBox) scenarioBox.hidden = true;
        if (optionsGrid) optionsGrid.hidden = true;
        if (feedbackPanel) feedbackPanel.hidden = true;
        if (stepIndicator) stepIndicator.hidden = true;
        if (simSummary) simSummary.hidden = false;

        const summaryScoreText = document.getElementById('summary-score-text');
        if (summaryScoreText) {
            summaryScoreText.textContent = `You scored ${score} out of ${scenarios.length} correct solutions!`;
        }
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            currentStep++;
            renderScenario(currentStep);
        });
    }

    if (btnRestart) {
        btnRestart.addEventListener('click', () => {
            currentStep = 0;
            score = 0;
            if (scenarioBox) scenarioBox.hidden = false;
            if (optionsGrid) optionsGrid.hidden = false;
            if (stepIndicator) stepIndicator.hidden = false;
            if (simSummary) simSummary.hidden = true;
            renderScenario(currentStep);
        });
    }

    // Initialize first scenario
    renderScenario(0);
});
