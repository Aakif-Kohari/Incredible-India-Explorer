/* ==========================================================================
   Indian Mint Marks Decoder Logic
   Handles mint selection, zoomable coin viewer, and timeline rendering.
   ========================================================================== */
(function () {
    'use strict';

    let activeMint = null;
    let currentCoinIndex = 0;

    function init() {
        renderMarksGrid();
        renderTimeline();
        attachEventListeners();
        setupThemeToggle();
        setupZoomLens();
    }

    /**
     * Render the grid of selectable mint mark cards.
     */
    function renderMarksGrid() {
        const grid = document.getElementById('marks-grid');
        if (!grid) return;

        const fragment = document.createDocumentFragment();

        mintsData.forEach(mint => {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'mark-card';
            card.setAttribute('role', 'listitem');
            card.setAttribute('aria-label', `Select ${mint.name} (${mint.symbol})`);
            card.dataset.mintId = mint.id;

            const symbol = document.createElement('div');
            symbol.className = 'mark-symbol';
            symbol.textContent = mint.symbol;

            const name = document.createElement('div');
            name.className = 'mark-name';
            name.textContent = mint.name;

            card.appendChild(symbol);
            card.appendChild(name);

            card.addEventListener('click', () => selectMint(mint.id, card));
            fragment.appendChild(card);
        });

        grid.appendChild(fragment);
    }

    /**
     * Select a mint and update the details panel.
     */
    function selectMint(mintId, cardEl) {
        const mint = mintsData.find(m => m.id === mintId);
        if (!mint) return;

        activeMint = mint;
        currentCoinIndex = 0;

        // Update UI active states
        document.querySelectorAll('.mark-card').forEach(c => c.classList.remove('active'));
        cardEl.classList.add('active');

        // Show content, hide empty state
        document.getElementById('empty-state').hidden = true;
        document.getElementById('mint-content').hidden = false;

        // Populate details
        document.getElementById('mint-symbol-large').textContent = mint.symbol;
        document.getElementById('mint-name').textContent = mint.name;
        document.getElementById('mint-location').textContent = mint.location;
        document.getElementById('mint-period').textContent = `Operating: ${mint.period}`;
        document.getElementById('mint-history').textContent = mint.history;

        // Update map dot position
        const dot = document.getElementById('map-dot');
        dot.style.top = mint.mapPos.top;
        dot.style.left = mint.mapPos.left;

        // Render first coin
        renderCoin();
    }

    /**
     * Render the current coin in the viewer.
     */
    function renderCoin() {
        if (!activeMint || activeMint.coins.length === 0) return;

        const coin = activeMint.coins[currentCoinIndex];
        const imgContainer = document.getElementById('coin-image');
        const counter = document.getElementById('coin-counter');

        // Clear previous content (except zoom lens)
        const lens = document.getElementById('zoom-lens');
        imgContainer.innerHTML = '';
        imgContainer.appendChild(lens);

        const text = document.createElement('div');
        text.textContent = '🪙'; // Placeholder for coin image
        text.style.fontSize = '8rem';
        imgContainer.insertBefore(text, lens);

        const caption = document.createElement('div');
        caption.style.position = 'absolute';
        caption.style.bottom = '1rem';
        caption.style.left = '1rem';
        caption.style.right = '1rem';
        caption.style.textAlign = 'center';
        caption.style.color = '#fff';
        caption.style.background = 'rgba(0,0,0,0.6)';
        caption.style.padding = '0.5rem';
        caption.style.borderRadius = '4px';
        caption.innerHTML = `<strong>${coin.name}</strong><br><span style="font-size:0.9rem">${coin.desc}</span>`;
        imgContainer.appendChild(caption);

        counter.textContent = `${currentCoinIndex + 1} / ${activeMint.coins.length}`;
    }

    /**
     * Render the historical timeline of mints.
     */
    function renderTimeline() {
        const container = document.getElementById('timeline-container');
        if (!container) return;

        const sortedMints = [...mintsData].sort((a, b) => {
            const yearA = parseInt(a.period.split('–')[0]);
            const yearB = parseInt(b.period.split('–')[0]);
            return yearA - yearB;
        });

        const fragment = document.createDocumentFragment();

        sortedMints.forEach(mint => {
            const item = document.createElement('div');
            item.className = 'timeline-item animate-on-scroll';

            const year = document.createElement('div');
            year.className = 'timeline-year';
            year.textContent = mint.period.split('–')[0];

            const title = document.createElement('div');
            title.className = 'timeline-title';
            title.textContent = `${mint.name} (${mint.symbol})`;

            const desc = document.createElement('div');
            desc.className = 'timeline-desc';
            desc.textContent = `Established in ${mint.location}. ${mint.history.substring(0, 100)}...`;

            item.appendChild(year);
            item.appendChild(title);
            item.appendChild(desc);
            fragment.appendChild(item);
        });

        container.appendChild(fragment);
    }

    /**
     * Setup the magnifying glass effect on the coin image.
     */
    function setupZoomLens() {
        const container = document.getElementById('coin-image');
        const lens = document.getElementById('zoom-lens');

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            lens.style.left = `${x - 75}px`;
            lens.style.top = `${y - 75}px`;

            // Simulate zoomed background (using CSS transform on the container content)
            const zoomX = (x / rect.width) * 100;
            const zoomY = (y / rect.height) * 100;
            lens.style.backgroundImage = 'none'; // In a real app, this would be a high-res image
            lens.style.backgroundColor = 'rgba(192, 192, 192, 0.2)';
            lens.style.backdropFilter = 'blur(2px) contrast(1.5)';
        });

        container.addEventListener('mouseleave', () => {
            lens.style.display = 'none';
        });
        container.addEventListener('mouseenter', () => {
            lens.style.display = 'block';
        });
    }

    function attachEventListeners() {
        document.getElementById('prev-coin').addEventListener('click', () => {
            if (!activeMint) return;
            currentCoinIndex = (currentCoinIndex - 1 + activeMint.coins.length) % activeMint.coins.length;
            renderCoin();
        });

        document.getElementById('next-coin').addEventListener('click', () => {
            if (!activeMint) return;
            currentCoinIndex = (currentCoinIndex + 1) % activeMint.coins.length;
            renderCoin();
        });

        document.getElementById('mint-search').addEventListener('input', debounce((e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.mark-card').forEach(card => {
                const name = card.querySelector('.mark-name').textContent.toLowerCase();
                const symbol = card.querySelector('.mark-symbol').textContent.toLowerCase();
                card.style.display = (name.includes(term) || symbol.includes(term)) ? 'flex' : 'none';
            });
        }, 200));
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function setupThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            toggle.textContent = isLight ? '☀️' : '🌙';
        });
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            toggle.textContent = '☀️';
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
