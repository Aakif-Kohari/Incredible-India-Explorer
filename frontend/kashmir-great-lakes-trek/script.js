/* Kashmir Great Lakes Trek — Issue #3156 */
(function () {
    'use strict';

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
    let lastFocus = null;
    let dialogOpen = false;

    function setMenu(open) {
        const toggle = $('.nav-toggle');
        const nav = $('#nav-links');
        if (!toggle || !nav) return;
        nav.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.textContent = open ? 'Close' : 'Menu';
    }

    function initNavigation() {
        const toggle = $('.nav-toggle');
        const nav = $('#nav-links');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', () => {
            const isOpen = toggle.getAttribute('aria-expanded') === 'true';
            setMenu(!isOpen);
        });

        $$('a', nav).forEach(link => {
            link.addEventListener('click', () => setMenu(false));
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 760) setMenu(false);
        });
    }

    function openGallery(button) {
        const modal = $('#modal');
        const image = $('#modal-img');
        const caption = $('#modal-caption');
        const source = $('img', button);

        if (!modal || !image || !caption || !source) return;

        const full = button.dataset.full;
        if (!full) return;

        lastFocus = document.activeElement;
        image.src = full;
        image.alt = source.alt || '';
        caption.textContent = button.dataset.caption || '';
        modal.hidden = false;
        dialogOpen = true;
        document.body.style.overflow = 'hidden';

        const close = $('.modal-close', modal);
        if (close) close.focus();
    }

    function closeGallery() {
        const modal = $('#modal');
        const image = $('#modal-img');
        const caption = $('#modal-caption');

        if (!modal) return;

        modal.hidden = true;
        dialogOpen = false;
        document.body.style.overflow = '';

        if (image) {
            image.removeAttribute('src');
            image.alt = '';
        }

        if (caption) caption.textContent = '';

        if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
        lastFocus = null;
    }

    function initGallery() {
        $$('.gallery-item').forEach(button => {
            button.addEventListener('click', () => openGallery(button));
        });

        $$('[data-close]').forEach(button => {
            button.addEventListener('click', closeGallery);
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && dialogOpen) {
                event.preventDefault();
                closeGallery();
                return;
            }

            if (event.key === 'Tab' && dialogOpen) {
                const modal = $('#modal');
                const focusable = $$("button,a[href],input,[tabindex]:not([tabindex='-1'])", modal).filter(
                    element => !element.disabled && element.offsetParent !== null
                );

                if (!focusable.length) return;

                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        });
    }

    function initTopButton() {
        const button = $('#top-button');
        if (!button) return;

        const update = () => {
            button.classList.toggle('visible', window.scrollY > 500);
        };

        window.addEventListener('scroll', update, { passive: true });

        button.addEventListener('click', () => {
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        });

        update();
    }

    function initInternalLinks() {
        $$("a[href^='#']").forEach(link => {
            link.addEventListener('click', event => {
                const id = link.getAttribute('href');

                if (!id || id === '#') return;

                const target = $(id);
                if (!target) return;

                event.preventDefault();

                const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });

                if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');

                window.setTimeout(
                    () => {
                        target.focus({ preventScroll: true });
                    },
                    reduce ? 0 : 350
                );

                history.replaceState(null, '', id);
            });
        });
    }

    function initChecklist() {
        let canStore = true;

        try {
            sessionStorage.setItem('__kgl_test', '1');
            sessionStorage.removeItem('__kgl_test');
        } catch (error) {
            canStore = false;
        }

        $$('.checklist input').forEach((checkbox, index) => {
            const key = `kgl-check-${index}`;

            if (canStore) {
                checkbox.checked = sessionStorage.getItem(key) === 'true';
            }

            checkbox.addEventListener('change', () => {
                if (canStore) {
                    sessionStorage.setItem(key, String(checkbox.checked));
                }
            });
        });
    }

    function hardenExternalLinks() {
        $$("a[target='_blank']").forEach(link => {
            const rel = new Set((link.rel || '').split(/\s+/).filter(Boolean));
            rel.add('noopener');
            rel.add('noreferrer');
            link.rel = [...rel].join(' ');
        });
    }

    function init() {
        initNavigation();
        initGallery();
        initTopButton();
        initInternalLinks();
        initChecklist();
        hardenExternalLinks();
        document.documentElement.dataset.kglReady = 'true';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
