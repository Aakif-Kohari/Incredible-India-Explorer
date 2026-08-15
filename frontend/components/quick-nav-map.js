(function () {
    const QuickNavMap = {
        config: {
            svgUrl: '../components/india-mini-map.svg', // Default relative path
            sectionMap: {
                north: 'north',
                south: 'south',
                east: 'east',
                west: 'west',
                central: 'central',
                northeast: 'northeast'
            }
        },

        init: function (customConfig = {}) {
            // Merge config
            this.config = { ...this.config, ...customConfig };

            // Check if mobile (don't initialize if strictly mobile to save resources)
            if (window.innerWidth < 768) {
                // We still initialize in case of resize, but we rely on CSS to hide it
            }

            this.createContainer();
            this.fetchSvg();
        },

        createContainer: function () {
            this.container = document.createElement('div');
            this.container.className = 'quick-nav-container';
            this.container.setAttribute('aria-label', 'Quick Navigation Map');
            
            this.tooltip = document.createElement('div');
            this.tooltip.className = 'quick-nav-tooltip';
            this.container.appendChild(this.tooltip);

            this.svgWrapper = document.createElement('div');
            this.svgWrapper.className = 'quick-nav-svg-wrapper';
            this.container.appendChild(this.svgWrapper);

            document.body.appendChild(this.container);
        },

        fetchSvg: function () {
            fetch(this.config.svgUrl)
                .then(response => {
                    if (!response.ok) throw new Error('SVG not found');
                    return response.text();
                })
                .then(svgText => {
                    this.svgWrapper.innerHTML = svgText;
                    this.setupInteractions();
                    this.setupIntersectionObserver();
                })
                .catch(err => {
                    console.error('QuickNavMap: Failed to load SVG map', err);
                });
        },

        setupInteractions: function () {
            const regions = this.container.querySelectorAll('.nav-region');
            
            regions.forEach(region => {
                const regionId = region.getAttribute('data-target');
                const targetId = this.config.sectionMap[regionId];
                
                // Click and Keyboard interaction
                const navigate = (e) => {
                    e.preventDefault();
                    if (targetId) {
                        const targetEl = document.getElementById(targetId);
                        if (targetEl) {
                            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                            targetEl.scrollIntoView({
                                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                                block: 'start'
                            });
                            // Optional: handle focus for accessibility
                            targetEl.setAttribute('tabindex', '-1');
                            targetEl.focus({ preventScroll: true });
                        }
                    }
                };

                region.addEventListener('click', navigate);
                region.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        navigate(e);
                    }
                });

                // Tooltip logic
                region.addEventListener('mouseenter', (e) => {
                    const label = region.getAttribute('aria-label') || regionId;
                    this.tooltip.textContent = label.replace('Jump to ', '');
                    this.tooltip.classList.add('visible');
                });
                region.addEventListener('mouseleave', () => {
                    this.tooltip.classList.remove('visible');
                });
                region.addEventListener('focus', (e) => {
                    const label = region.getAttribute('aria-label') || regionId;
                    this.tooltip.textContent = label.replace('Jump to ', '');
                    this.tooltip.classList.add('visible');
                });
                region.addEventListener('blur', () => {
                    this.tooltip.classList.remove('visible');
                });
            });
        },

        setupIntersectionObserver: function () {
            const regions = this.container.querySelectorAll('.nav-region');
            const targetElements = {};
            
            // Collect target elements
            regions.forEach(region => {
                const regionId = region.getAttribute('data-target');
                const targetId = this.config.sectionMap[regionId];
                if (targetId) {
                    const el = document.getElementById(targetId);
                    if (el) {
                        targetElements[targetId] = region;
                    }
                }
            });

            const observerOptions = {
                root: null,
                rootMargin: '-10% 0px -70% 0px', // Trigger when section is in top part of viewport
                threshold: 0
            };

            const observerCallback = (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Remove active from all
                        regions.forEach(r => r.classList.remove('active'));
                        // Add active to current
                        const activeRegion = targetElements[entry.target.id];
                        if (activeRegion) {
                            activeRegion.classList.add('active');
                        }
                    }
                });
            };

            this.observer = new IntersectionObserver(observerCallback, observerOptions);

            Object.keys(targetElements).forEach(id => {
                const el = document.getElementById(id);
                if (el) this.observer.observe(el);
            });
        }
    };

    // Expose to window for manual init
    window.QuickNavMap = QuickNavMap;
})();
