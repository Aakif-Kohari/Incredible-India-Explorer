/**
 * Dogri Cinema Explorer — Interactive Logic & Exported Data
 * Handles gallery modal popups, smooth scroll navigation, and view state management.
 * Exports structured data for unit testing.
 */

/* =====================================================================
   Data exports (consumed by unit tests via script loading)
   ===================================================================== */

const DOGRI_CINEMA_INFO = {
    id: 'dogri-cinema',
    name: 'Dogri Cinema',
    language: 'Dogri',
    region: 'Jammu, Jammu & Kashmir',
    schedule: 'Eighth Schedule, Constitution of India',
    hub: 'Jammu City',
    pioneerEra: '1960s–1980s',
    culturalRoots: ['Kud Dance', 'Dogri Lok Geet', 'Heer Recitations', 'Shivalik Folklore']
};

const DOGRI_FILMS = [
    {
        id: 'chann-pardesi',
        title: 'Chann Pardesi',
        year: 1980,
        genre: 'Social Drama',
        significance: 'One of the earliest full-length Dogri feature films.'
    },
    {
        id: 'watan',
        title: 'Watan',
        year: 1987,
        genre: 'Patriotic Drama',
        significance: 'Celebrates patriotism through Dogra cultural identity.'
    },
    {
        id: 'dogri-lok-geet-films',
        title: 'Dogri Lok Geet Films',
        year: 1995,
        genre: 'Musical Documentary',
        significance: 'Preserves endangered Dogri folk song and dance traditions.'
    },
    {
        id: 'babyal-da-kagaz',
        title: 'Babyal Da Kagaz',
        year: 2004,
        genre: 'Social Drama',
        significance: 'Explores rural migration and tradition vs modernity in Dogra society.'
    },
    {
        id: 'tawi-de-kinare',
        title: 'Tawi De Kinare',
        year: 2012,
        genre: 'Romance / Drama',
        significance: "Captures the landscapes and life of Jammu's riverine communities."
    },
    {
        id: 'digital-productions',
        title: 'Contemporary Digital Productions',
        year: 2018,
        genre: 'Various',
        significance: 'OTT and social media content reviving Dogri for younger audiences.'
    }
];

const DOGRI_ARTISTS = [
    {
        id: 'narinder-nath-raina',
        name: 'Narinder Nath Raina',
        role: 'Theatre & Cinema Pioneer',
        contribution: 'Laid narrative foundation for Dogri regional storytelling.'
    },
    {
        id: 'padma-sachdev',
        name: 'Padma Sachdev',
        role: 'Poet & Cultural Icon',
        contribution: 'First Dogri Sahitya Akademi Award winner; literary works inspired cinematic adaptations.'
    },
    {
        id: 'om-goswami',
        name: 'Om Goswami',
        role: 'Actor & Director',
        contribution: 'Championed regional cinema through decades of institutional neglect.'
    },
    {
        id: 'baldev-raj-bansal',
        name: 'Baldev Raj Bansal',
        role: 'Music Composer',
        contribution: 'Defined the sonic palette of early Dogri films through folk-infused scores.'
    }
];

const DOGRI_TIMELINE = [
    {
        id: 'radio-era',
        period: '1960s–1970s',
        era: 'Cultural Roots & Radio Era',
        description: 'AIR Jammu broadcasts Dogri folk plays and songs.'
    },
    {
        id: 'first-features',
        period: '1980s',
        era: 'First Feature Films',
        description: 'Pioneer directors release the first full-length Dogri feature films.'
    },
    {
        id: 'folk-films',
        period: '1990s',
        era: 'Folk Music Films & Cultural Preservation',
        description: 'Surge of short musical films documenting Dogri folk traditions.'
    },
    {
        id: 'social-dramas',
        period: '2000s',
        era: 'Social Dramas & New Narratives',
        description: 'Contemporary filmmakers tackle themes of rural migration and identity.'
    },
    {
        id: 'digital-renaissance',
        period: '2010s–Present',
        era: 'Digital Renaissance',
        description: 'OTT and social media carry Dogri cinema to global audiences.'
    }
];

const DOGRI_GALLERY = [
    { id: 'shivalik', title: 'Shivalik Landscapes', subtitle: 'Nature as Co-Star' },
    { id: 'kud', title: 'Kud Dance on Screen', subtitle: 'Living Tradition Preserved' },
    { id: 'folk-music', title: 'Dogri Folk Music', subtitle: 'The Soul of Every Frame' },
    { id: 'identity', title: 'Cultural Identity', subtitle: 'Cinema as Assertion' }
];

const DOGRI_REFERENCES = [
    { id: 'sahitya-akademi', source: 'Sahitya Akademi', title: 'Dogri Literature and Its Cultural Contexts' },
    { id: 'nfai', source: 'National Film Archive of India (NFAI)', title: 'Regional Language Cinema Catalogue' },
    { id: 'dff', source: 'Directorate of Film Festivals', title: 'Regional Films of J&K' },
    {
        id: 'jk-academy',
        source: 'J&K Academy of Art, Culture & Languages',
        title: 'Dogri Cultural Heritage Documentation'
    },
    { id: 'padma-sachdev-works', source: 'Padma Sachdev', title: 'Collected Works — Sahitya Akademi, 1971' }
];

/* =====================================================================
   DOM Interaction Logic
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Gallery Modal Elements
    const modal = document.getElementById('dogri-cinema-modal');
    const modalClose = document.getElementById('dogri-cinema-modal-close');
    const modalTitle = document.getElementById('dogri-modal-title');
    const modalHeading = document.getElementById('dogri-modal-heading');
    const modalDescription = document.getElementById('dogri-modal-description');
    const galleryItems = document.querySelectorAll('.dogri-cinema-gallery-item');

    // Open Gallery Modal
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');
            const subtitle = item.querySelector('.dogri-cinema-gallery-overlay p')?.textContent || '';

            if (modalTitle) modalTitle.textContent = title;
            if (modalHeading) modalHeading.textContent = subtitle;
            if (modalDescription) modalDescription.textContent = desc;

            if (modal) {
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close Gallery Modal
    const closeModal = () => {
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

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

    // Keyboard accessibility for modal (ESC key)
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Smooth scroll helper for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
