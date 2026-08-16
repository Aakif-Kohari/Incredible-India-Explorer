document.addEventListener('app:route-changed', () => {
    const bookmarkButtons = [...document.querySelectorAll('.journey-bookmark-btn')];
    const galleryItems = [...document.querySelectorAll('.kannauj-gallery-item')];

    const modal = document.getElementById('kannauj-modal');
    const modalClose = document.getElementById('kannauj-modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalHeading = document.getElementById('modal-heading');
    const modalDescription = document.getElementById('modal-description');

    // --- Welcome Toast (auto-dismisses) -------------------------------
    function showWelcomeToast() {
        if (document.getElementById('kannauj-welcome-toast')) return;

        const toast = document.createElement('div');
        toast.id = 'kannauj-welcome-toast';
        toast.className = 'kannauj-welcome-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.innerHTML =
            "<strong>⚔️ Battle of Kannauj</strong> — 17 May 1540. The clash where Sher Shah Suri ended Humayun's first reign and founded the Sur Empire.";
        document.body.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('is-visible'));

        setTimeout(() => {
            toast.classList.remove('is-visible');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
            setTimeout(() => toast.remove(), 500);
        }, 3200);
    }

    showWelcomeToast();

    // --- Journey Integration (Bookmarks & Global Search) -------------
    function initJourney() {
        if (!window.Journey) return;

        // 1. Bookmark functionality
        bookmarkButtons.forEach(btn => {
            const id = btn.dataset.bookmarkId;
            const title = 'Battle of Kannauj (Bilgram) Explorer';
            const thumbnail = 'frontend/assets/sher_shah_coin.jpg';
            const category = 'history';

            const updateBookmarkUI = () => {
                const isSaved = window.Journey.isSaved(id);
                btn.classList.toggle('is-saved', isSaved);
                btn.setAttribute('aria-pressed', String(isSaved));
                btn.innerHTML = isSaved ? '♥ Saved to Journey' : '♡ Save to Journey';
            };

            updateBookmarkUI();

            btn.addEventListener('click', e => {
                e.stopPropagation();
                window.Journey.toggle({
                    id,
                    explorerPage: 'frontend/battle-of-kannauj-explorer/index.html',
                    title,
                    thumbnail,
                    category
                });
                updateBookmarkUI();
            });
        });

        // 2. Global search index registration
        window.Journey.registerSearchItems('frontend/battle-of-kannauj-explorer/index.html', [
            {
                id: 'battle-of-kannauj-main',
                title: 'Battle of Kannauj (Bilgram) Explorer',
                description:
                    'Explore the Battle of Kannauj (1540 CE) — the decisive clash where Sher Shah Suri defeated Mughal Emperor Humayun, establishing Sur dominance in North India and ushering in an era of sweeping reforms.',
                link: 'frontend/battle-of-kannauj-explorer/index.html'
            },
            {
                id: 'battle-of-kannauj-belligerents',
                title: 'Belligerents of Kannauj',
                description:
                    "Meet the forces that clashed near Kannauj in 1540: Sher Shah Suri's Sur Empire against Humayun's Mughal army, two rival claimants to the throne of Delhi.",
                link: 'frontend/battle-of-kannauj-explorer/index.html#belligerents'
            },
            {
                id: 'battle-of-kannauj-outcome',
                title: 'Outcome of the Battle of Kannauj',
                description:
                    "A decisive Sur victory that ended Humayun's first reign, forced him into 15-year exile, and established Sher Shah Suri as the sovereign ruler of North India.",
                link: 'frontend/battle-of-kannauj-explorer/index.html#outcome'
            },
            {
                id: 'battle-of-kannauj-significance',
                title: 'Historical Significance of the Battle of Kannauj',
                description:
                    'The battle established the Sur Empire, introduced the silver Rupiya, rebuilt the Grand Trunk Road, and left an architectural legacy that influenced Mughal design.',
                link: 'frontend/battle-of-kannauj-explorer/index.html#significance'
            },
            {
                id: 'battle-of-kannauj-timeline',
                title: 'Battle of Kannauj Timeline',
                description:
                    "A chronology from the Ganges trap at Chausa (1539) through the Battle of Kannauj (1540), Sher Shah's coronation, his reform reign, and the eventual Mughal restoration under Akbar.",
                link: 'frontend/battle-of-kannauj-explorer/index.html#timeline'
            }
        ]);
    }

    // --- Gallery Modal Logic -----------------------------------------
    let lastFocusedElement = null;

    function openModal(item) {
        lastFocusedElement = item;

        modalTitle.textContent = item.dataset.title;
        modalHeading.textContent = item.querySelector('p')?.textContent || 'Gallery Highlight';
        modalDescription.textContent = item.dataset.desc;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        if (modalClose) modalClose.focus();
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    // Bind gallery click events
    galleryItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('click', () => openModal(item));
        item.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(item);
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // Run initialization
    initJourney();
});
