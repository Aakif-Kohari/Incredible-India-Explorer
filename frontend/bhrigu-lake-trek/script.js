const CONFIG = {
    map: {
        latitude: 32.2936,
        longitude: 77.2417,
        zoom: 12,
        views: {
            lake: { lat: 32.2936, lon: 77.2417, zoom: 13 },
            gulaba: { lat: 32.3286, lon: 77.195, zoom: 13 },
            manali: { lat: 32.2396, lon: 77.1887, zoom: 12 },
            vashisht: { lat: 32.2468, lon: 77.1732, zoom: 13 }
        }
    },
    images: {
        lake: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bhrigu_lake_Kullu.JPG?width=1600'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScrollButtons();
    initGallery();
    initMap();
    initImageFallbacks();
});

function initNavigation() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('#primary-nav');

    if (!toggle || !nav) {
        return;
    }

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', event => {
        if (!nav.contains(event.target) && !toggle.contains(event.target)) {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

function initSmoothScrollButtons() {
    document.querySelectorAll('[data-scroll]').forEach(button => {
        button.addEventListener('click', () => {
            const selector = button.getAttribute('data-scroll');
            const target = document.querySelector(selector);

            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initGallery() {
    const dialog = document.querySelector('#lightbox');
    const image = document.querySelector('#lightbox-image');
    const caption = document.querySelector('#lightbox-caption');
    const source = document.querySelector('#lightbox-source');
    const close = document.querySelector('.lightbox-close');

    if (!dialog || !image || !caption || !source) {
        return;
    }

    document.querySelectorAll('[data-lightbox]').forEach(button => {
        button.addEventListener('click', () => {
            const sourcePage = button.dataset.lightbox;
            const sourceImage = button.querySelector('img');
            const imageUrl = sourceImage ? sourceImage.currentSrc || sourceImage.src : '';
            const imageAlt = sourceImage ? sourceImage.alt : 'Bhrigu Lake image';

            image.src = imageUrl;
            image.alt = imageAlt;
            caption.textContent = button.dataset.caption || imageAlt;
            source.href = sourcePage;

            if (typeof dialog.showModal === 'function') {
                dialog.showModal();
            } else {
                dialog.setAttribute('open', '');
            }

            document.body.classList.add('modal-open');
        });
    });

    const closeDialog = () => {
        if (typeof dialog.close === 'function') {
            dialog.close();
        } else {
            dialog.removeAttribute('open');
        }

        image.removeAttribute('src');
        document.body.classList.remove('modal-open');
    };

    close?.addEventListener('click', closeDialog);

    dialog.addEventListener('click', event => {
        if (event.target === dialog) {
            closeDialog();
        }
    });

    dialog.addEventListener('cancel', closeDialog);
}

function initMap() {
    const map = document.querySelector('#trek-map');

    if (!map) {
        return;
    }

    const iframe = document.createElement('iframe');
    iframe.title = 'OpenStreetMap view of Bhrigu Lake and the Manali region';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.src = buildOpenStreetMapEmbed(CONFIG.map.latitude, CONFIG.map.longitude, CONFIG.map.zoom);
    map.appendChild(iframe);

    document.querySelectorAll('[data-map-view]').forEach(button => {
        button.addEventListener('click', () => {
            const viewName = button.dataset.mapView;
            const view = CONFIG.map.views[viewName];

            if (!view) {
                return;
            }

            document.querySelectorAll('[data-map-view]').forEach(control => {
                control.classList.toggle('active', control === button);
            });

            iframe.src = buildOpenStreetMapEmbed(view.lat, view.lon, view.zoom);
        });
    });
}

function buildOpenStreetMapEmbed(latitude, longitude, zoom) {
    const delta = zoom >= 13 ? 0.06 : 0.12;
    const left = longitude - delta;
    const right = longitude + delta;
    const top = latitude + delta;
    const bottom = latitude - delta;

    const params = new URLSearchParams({
        bbox: `${left},${bottom},${right},${top}`,
        layer: 'mapnik',
        marker: `${latitude},${longitude}`
    });

    return `https://www.openstreetmap.org/export/embed.html?${params.toString()}`;
}

function initImageFallbacks() {
    document.querySelectorAll('img').forEach(image => {
        image.addEventListener(
            'error',
            () => {
                image.classList.add('image-failed');
                image.alt = `${image.alt} (image unavailable)`;
            },
            { once: true }
        );
    });
}
