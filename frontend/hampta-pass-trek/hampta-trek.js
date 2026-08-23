/**
 * hampta-trek.js
 * Interactive behavior for the Hampta Pass Trek profile.
 */
(function () {
    'use strict';

    function initThemeToggle() {
        const button = document.getElementById('themeToggle');
        if (!button) return;

        function sync() {
            const light = document.documentElement.getAttribute('data-theme') === 'light';
            button.setAttribute('aria-pressed', String(light));
            button.textContent = light ? '☀️ Light' : '🌙 Dark';
        }

        sync();
        button.addEventListener('click', function () {
            const light = document.documentElement.getAttribute('data-theme') === 'light';
            if (light) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
            sync();
        });
    }

    function initTabs() {
        const buttons = document.querySelectorAll('.hampta-tab-btn');
        const panels = document.querySelectorAll('.hampta-tab-panel');
        buttons.forEach(function (button) {
            button.addEventListener('click', function () {
                const target = button.dataset.tab;
                buttons.forEach(function (item) {
                    item.classList.toggle('active', item === button);
                    item.setAttribute('aria-selected', item === button ? 'true' : 'false');
                });
                panels.forEach(function (panel) {
                    panel.classList.toggle('active', panel.id === target);
                });
            });
        });
    }

    function renderHighlights() {
        const grid = document.getElementById('highlightsGrid');
        if (!grid || typeof HAMPTA_TREK_HIGHLIGHTS === 'undefined') return;

        grid.innerHTML = HAMPTA_TREK_HIGHLIGHTS.map(function (item) {
            return `
                <article class="hampta-card">
                    <div class="hampta-icon" aria-hidden="true">${item.icon}</div>
                    <span class="hampta-eyebrow">${item.tag}</span>
                    <h3>${item.title}</h3>
                    <strong>${item.subtitle}</strong>
                    <p>${item.description}</p>
                </article>
            `;
        }).join('');
    }

    function renderRoute() {
        const container = document.getElementById('routeContainer');
        if (!container || typeof HAMPTA_TREK_ROUTE === 'undefined') return;

        container.innerHTML = HAMPTA_TREK_ROUTE.map(function (item) {
            return `
                <article class="hampta-route-card">
                    <div class="hampta-day">${item.day}</div>
                    <div>
                        <div class="hampta-route-heading">
                            <h3>${item.title}</h3>
                            <span>${item.distance}</span>
                        </div>
                        <p class="hampta-route-meta">${item.altitude} · ${item.terrain}</p>
                        <p>${item.description}</p>
                    </div>
                </article>
            `;
        }).join('');
    }

    function renderChecklist() {
        const grid = document.getElementById('checklistGrid');
        if (!grid || typeof HAMPTA_TREK_CHECKLIST === 'undefined') return;

        let saved = [];
        try {
            saved = JSON.parse(localStorage.getItem('hampta-checklist') || '[]');
        } catch (error) {
            saved = [];
        }

        grid.innerHTML = HAMPTA_TREK_CHECKLIST.map(function (item) {
            const checked = saved.includes(item.id);
            return `
                <label class="hampta-check ${checked ? 'checked' : ''}">
                    <input type="checkbox" value="${item.id}" ${checked ? 'checked' : ''}>
                    <span><strong>${item.text}</strong><small>${item.category}</small></span>
                </label>
            `;
        }).join('');

        grid.querySelectorAll('input').forEach(function (input) {
            input.addEventListener('change', function () {
                const values = Array.from(grid.querySelectorAll('input:checked')).map(function (box) {
                    return box.value;
                });
                try {
                    localStorage.setItem('hampta-checklist', JSON.stringify(values));
                } catch (error) {}
                input.closest('.hampta-check').classList.toggle('checked', input.checked);
            });
        });
    }

    function renderGallery() {
        const grid = document.getElementById('galleryGrid');
        if (!grid || typeof HAMPTA_TREK_GALLERY === 'undefined') return;

        grid.innerHTML = HAMPTA_TREK_GALLERY.map(function (item) {
            return `
                <figure class="hampta-gallery-card">
                    <button type="button" class="hampta-gallery-button" data-image="${item.id}" aria-label="Open ${item.title}">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                    </button>
                    <figcaption>
                        <strong>${item.title}</strong>
                        <small>
                            Photo: ${item.source} · ${item.license}
                            · <a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">source</a>
                        </small>
                    </figcaption>
                </figure>
            `;
        }).join('');

        const modal = document.getElementById('galleryModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const close = document.getElementById('modalClose');

        function hide() {
            modal.hidden = true;
            document.body.style.overflow = '';
        }

        grid.querySelectorAll('.hampta-gallery-button').forEach(function (button) {
            button.addEventListener('click', function () {
                const item = HAMPTA_TREK_GALLERY.find(function (entry) {
                    return entry.id === button.dataset.image;
                });
                if (!item) return;
                modalImage.src = item.image;
                modalImage.alt = item.title;
                modalTitle.textContent = item.title;
                modal.hidden = false;
                document.body.style.overflow = 'hidden';
                close.focus();
            });
        });

        close.addEventListener('click', hide);
        modal.addEventListener('click', function (event) {
            if (event.target === modal) hide();
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && !modal.hidden) hide();
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initThemeToggle();
        initTabs();
        renderHighlights();
        renderRoute();
        renderChecklist();
        renderGallery();
    });
})();
