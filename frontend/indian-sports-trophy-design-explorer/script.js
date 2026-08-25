/* =========================================================================
   INDIAN SPORTS TROPHY DESIGN EXPLORER — Script Module
   Issue #2557
   Handles: tab navigation, theme toggle, mobile menu, scroll-to-top, and
   the interactive trophy diagram (markers + legend -> detail panel).
   ========================================================================= */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initTabs();
        initScrollTop();
        initDiagram();
    });

    function initNavigation() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('light-theme');
                const isLight = document.body.classList.contains('light-theme');
                try {
                    const storage = JSON.parse(localStorage.getItem('iie_storage') || '{}');
                    storage.theme = isLight ? 'light' : 'dark';
                    localStorage.setItem('iie_storage', JSON.stringify(storage));
                } catch(e) {
                    localStorage.setItem('theme', isLight ? 'light' : 'dark');
                }
            });
        }

        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function() {
                const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !expanded);
                navMenu.classList.toggle('active');
            });
        }
    }

    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const sections = document.querySelectorAll('.itd-section');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');

                tabBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');

                sections.forEach(sec => {
                    if (sec.getAttribute('data-tab') === targetTab) {
                        sec.classList.add('active');
                    } else {
                        sec.classList.remove('active');
                    }
                });

                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }

    function initScrollTop() {
        const btn = document.getElementById('btn-scroll-top');
        if (!btn) return;

        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        });
    }

    /* ---- Interactive Trophy Diagram --------------------------- */

    const TROPHY_PARTS = {
        crown: {
            title: 'The Crown Finial',
            example: 'Ashoka Chakra disc • Durand President\u2019s Cup',
            body: 'The crown, or finial, is the trophy\u2019s signature. On Indian trophies it frequently carries a national symbol \u2014 the Durand President\u2019s Cup features a circular disc atop the Ashoka Lion Capital \u2014 or a figure of the sportsperson the award honours, as with the statuettes of Arjuna and Dhyan Chand. The finial says: the nation, or the hero, watches over this prize.'
        },
        bowl: {
            title: 'The Bowl',
            example: 'Grecian urn • Ranji Trophy',
            body: 'The bowl is the vessel of victory \u2014 the part a winner lifts and shows to the crowd. Anthony de Mello\u2019s 1934 sketch for the Ranji Trophy was a Grecian urn two feet high with a lid, the handle of which represented Father Time. An open bowl, as in the Durand Cup, invites the ritual lift; a lidded urn carries remembrance.'
        },
        emblem: {
            title: 'The Sport Emblem',
            example: 'Snake boat • Nehru Trophy',
            body: 'The emblem on the trophy\u2019s face mirrors the sport. The Nehru Trophy is itself a silver replica of a chundan vallam (snake boat); cricket trophies carry bat-and-ball motifs; football honours are silver bowls. When the emblem becomes the trophy\u2019s own form, the trophy becomes a miniature of the game.'
        },
        handle: {
            title: 'The Handle',
            example: 'Father Time • Ranji design',
            body: 'Handles are sculptural and symbolic. The Ranji Trophy\u2019s original design set Father Time as the handle of the urn \u2014 the god of cricket\u2019s passage of time, borrowed from the Lord\u2019s weathervane. Handles are also functional: they are made to be gripped for the victory lift.'
        },
        band: {
            title: 'The Inscription Band',
            example: 'Engraved winners & donors',
            body: 'The inscription band is the trophy\u2019s memory. Champion names are engraved year after year, turning the trophy into a roll of honour; donors and dedications are recorded too. The Nehru Trophy bears its famous engraved words \u2014 \u201cTo the winners of the boat race which is a unique feature of community life in Travancore Cochin\u201d \u2014 above Nehru\u2019s signature.'
        },
        stem: {
            title: 'The Stem & Collar',
            example: 'Knop & collar • silver work',
            body: 'The stem, or waist, connects bowl and base with a collar and knop \u2014 flourishes inherited from Victorian silver craft. It gives the trophy height and presence, drawing the eye upward from the base to the bowl: from the ground of the game to the crown of victory.'
        },
        base: {
            title: 'The Base Plinth',
            example: 'Wooden abacus • Nehru Trophy',
            body: 'The plinth grounds the prize. Indian trophies pair precious metal with craft materials: the Nehru Trophy\u2019s silver snake boat rests on a wooden abacus, the boat-builder\u2019s measuring platform. Tiered silver plinths add height and ceremonial weight; each material roots the trophy in a place and a craft.'
        },
        motto: {
            title: 'The Motto Ribbon',
            example: '\u201cSatyameva Jayate\u201d • donor dedications',
            body: 'The lowest inscription is often the motto. Beneath the State Emblem stands \u201cSatyameva Jayate\u201d \u2014 Truth alone triumphs \u2014 the pattern set by the Bharat Ratna medal. Donor dedications fill the same space on older trophies, so the base of a trophy always carries the reason it exists.'
        }
    };

    function initDiagram() {
        const markers = document.querySelectorAll('.itd-marker');
        const legendBtns = document.querySelectorAll('.itd-legend-btn');
        const titleEl = document.getElementById('itd-part-title');
        const exampleEl = document.getElementById('itd-part-example');
        const bodyEl = document.getElementById('itd-part-body');

        function showPart(part) {
            const data = TROPHY_PARTS[part];
            if (!data) return;

            if (titleEl) titleEl.textContent = data.title;
            if (exampleEl) exampleEl.textContent = data.example;
            if (bodyEl) bodyEl.textContent = data.body;

            markers.forEach(m => {
                m.classList.toggle('active', m.getAttribute('data-part') === part);
            });
            legendBtns.forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-part') === part);
            });
        }

        markers.forEach(marker => {
            marker.addEventListener('click', function() {
                showPart(this.getAttribute('data-part'));
            });
        });

        legendBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                showPart(this.getAttribute('data-part'));
            });
        });
    }
})();
