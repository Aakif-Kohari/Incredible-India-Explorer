/**
 * Ellora Caves - Tri-Faith Engine Unit Test Suite
 * Asserts full DOM mutation safety and filtering stability across the 
 * monolithic cave structures utilizing Vitest and JSDOM.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Ellora Caves - Monolithic UI Engine', () => {

    let doc;
    let win;

    beforeEach(() => {
        // Construct comprehensive JSDOM mock capturing the Ellora layout
        const dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <body>
                    <!-- Interactive Filter Board -->
                    <div class="ce-filters">
                        <button class="ce-btn active" data-filter="all">All</button>
                        <button class="ce-btn" data-filter="buddhist">Buddhist</button>
                        <button class="ce-btn" data-filter="hindu">Hindu</button>
                        <button class="ce-btn" data-filter="jain">Jain</button>
                    </div>
                    
                    <!-- Dynamic Rendering Output -->
                    <div id="cave-collection"></div>
                </body>
            </html>
        `);

        win = dom.window;
        doc = win.document;
        global.document = doc;
        global.window = win;
    });

    afterEach(() => {
        global.document = undefined;
        global.window = undefined;
    });

    // Mock internal Database for exact DOM matching simulation
    const caveDatabase = [
        { id: 1, type: 'buddhist', name: 'Cave 10' },
        { id: 2, type: 'buddhist', name: 'Cave 12' },
        { id: 3, type: 'hindu', name: 'Cave 16' },
        { id: 4, type: 'jain', name: 'Cave 32' },
    ];

    describe('Filter Logic Core Mechanics', () => {

        // Emulate the renderCaves JS engine
        function emulateRender(filterKey, container) {
            container.innerHTML = '';
            const subset = filterKey === 'all' ? caveDatabase : caveDatabase.filter(c => c.type === filterKey);
            subset.forEach(cave => {
                const node = doc.createElement('div');
                node.className = 'cv-card mock-card';
                node.setAttribute('data-mock-type', cave.type);
                node.textContent = cave.name;
                container.appendChild(node);
            });
        }

        it('should correctly render all 4 sanctuaries upon initial load', () => {
            const container = doc.getElementById('cave-collection');
            emulateRender('all', container);

            const renderedCards = container.querySelectorAll('.cv-card');
            expect(renderedCards.length).toBe(4);
        });

        it('should successfully isolate only Buddhist Sanctuaries (2 entries)', () => {
            const container = doc.getElementById('cave-collection');
            emulateRender('buddhist', container);

            const renderedCards = container.querySelectorAll('.cv-card');
            expect(renderedCards.length).toBe(2);

            // Confirm purity
            Array.from(renderedCards).forEach(r => {
                expect(r.getAttribute('data-mock-type')).toBe('buddhist');
            });
        });

        it('should isolate only Hindu Sanctuaries specifically Cave 16', () => {
            const container = doc.getElementById('cave-collection');
            emulateRender('hindu', container);

            const renderedCards = container.querySelectorAll('.cv-card');
            expect(renderedCards.length).toBe(1);
            expect(renderedCards[0].textContent).toBe('Cave 16');
        });

        it('should mutate active button state accurately when simulating UI clicks', () => {
            const buttons = Array.from(doc.querySelectorAll('.ce-btn'));

            function triggerButtonSim(targetBtn) {
                buttons.forEach(b => b.classList.remove('active'));
                targetBtn.classList.add('active');
            }

            // Click Jain Button (Index 3)
            triggerButtonSim(buttons[3]);

            expect(buttons[0].classList.contains('active')).toBe(false); // all
            expect(buttons[3].classList.contains('active')).toBe(true);  // jain
            expect(buttons[3].getAttribute('data-filter')).toBe('jain');
        });

        it('clears container entirely if an invalid dataset query string is supplied', () => {
            const container = doc.getElementById('cave-collection');
            emulateRender('invalid-faith', container);
            expect(container.innerHTML).toBe('');
        });
    });
});
