/* Markha Valley Trek — Issue #3153 */
(function () {
    'use strict';
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
    let previousFocus = null,
        modalOpen = false;

    function menu(open) {
        const b = $('.nav-toggle'),
            n = $('#nav-links');
        if (!b || !n) return;
        n.classList.toggle('open', open);
        b.setAttribute('aria-expanded', String(open));
        b.textContent = open ? 'Close' : 'Menu';
    }

    function setupNav() {
        const b = $('.nav-toggle'),
            n = $('#nav-links');
        if (!b || !n) return;
        b.addEventListener('click', () => menu(b.getAttribute('aria-expanded') !== 'true'));
        $$('a', n).forEach(a => a.addEventListener('click', () => menu(false)));
        addEventListener('resize', () => {
            if (innerWidth > 760) menu(false);
        });
    }

    function openModal(button) {
        const modal = $('#modal'),
            img = $('#modal-img'),
            caption = $('#modal-caption'),
            source = $('img', button);
        if (!modal || !img || !caption || !source) return;
        const full = button.dataset.full;
        if (!full) return;
        previousFocus = document.activeElement;
        img.src = full;
        img.alt = source.alt || '';
        caption.textContent = button.dataset.caption || '';
        modal.hidden = false;
        modalOpen = true;
        document.body.style.overflow = 'hidden';
        $('.modal-close', modal)?.focus();
    }

    function closeModal() {
        const modal = $('#modal'),
            img = $('#modal-img'),
            caption = $('#modal-caption');
        if (!modal) return;
        modal.hidden = true;
        modalOpen = false;
        document.body.style.overflow = '';
        if (img) {
            img.removeAttribute('src');
            img.alt = '';
        }
        if (caption) caption.textContent = '';
        previousFocus?.focus?.();
        previousFocus = null;
    }

    function setupGallery() {
        $$('.gallery-item').forEach(b => b.addEventListener('click', () => openModal(b)));
        $$('[data-close]').forEach(b => b.addEventListener('click', closeModal));
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && modalOpen) closeModal();
            if (e.key === 'Tab' && modalOpen) {
                const modal = $('#modal');
                const f = $$("button,a[href],input,[tabindex]:not([tabindex='-1'])", modal).filter(
                    x => !x.disabled && x.offsetParent !== null
                );
                if (!f.length) return;
                const first = f[0],
                    last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
    }

    function setupTop() {
        const b = $('#top-button');
        if (!b) return;
        const update = () => b.classList.toggle('visible', scrollY > 500);
        addEventListener('scroll', update, { passive: true });
        b.addEventListener('click', () =>
            scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
        );
        update();
    }

    function setupLinks() {
        $$("a[href^='#']").forEach(a =>
            a.addEventListener('click', e => {
                const id = a.getAttribute('href');
                if (!id || id === '#') return;
                const target = $(id);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({
                    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
                });
                if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
                history.replaceState(null, '', id);
            })
        );
    }

    function setupChecklist() {
        let storage = true;
        try {
            sessionStorage.setItem('__markha', '1');
            sessionStorage.removeItem('__markha');
        } catch (e) {
            storage = false;
        }
        $$('.checklist input').forEach((box, i) => {
            const key = 'markha-check-' + i;
            if (storage) box.checked = sessionStorage.getItem(key) === 'true';
            box.addEventListener('change', () => {
                if (storage) sessionStorage.setItem(key, String(box.checked));
            });
        });
    }

    function hardenExternalLinks() {
        $$("a[target='_blank']").forEach(a => {
            const rel = new Set((a.rel || '').split(/\s+/).filter(Boolean));
            rel.add('noopener');
            rel.add('noreferrer');
            a.rel = [...rel].join(' ');
        });
    }

    function init() {
        setupNav();
        setupGallery();
        setupTop();
        setupLinks();
        setupChecklist();
        hardenExternalLinks();
        document.documentElement.dataset.markhaReady = 'true';
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();
