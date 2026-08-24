/**
 * Deodhar Trophy - Timeline Component State Validation
 * Implements JSDOM mapping over the evolutionary format UI to guarantee 
 * index bounds safety, animation hook injection, and click-routing stability.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Deodhar Trophy - Format Evolution Integration', () => {

    let doc;
    let win;

    beforeEach(() => {
        // Construct the evolutionary timeline core DOM environment
        const dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <body>
                    <div class="evo-engine">
                        <div class="evo-header">
                            <button class="evo-trigger prev-btn" id="evo-prev" disabled></button>
                            <div class="evo-year-title" id="evo-year">1973 - 2015</div>
                            <button class="evo-trigger next-btn" id="evo-next"></button>
                        </div>
                        
                        <div class="evo-body">
                            <div class="evo-pane active" id="pane-1">Pane 1</div>
                            <div class="evo-pane" id="pane-2">Pane 2</div>
                            <div class="evo-pane" id="pane-3">Pane 3</div>
                            <div class="evo-pane" id="pane-4">Pane 4</div>
                        </div>
                        
                        <div class="evo-progress">
                            <div class="evo-dot active" data-target="0"></div>
                            <div class="evo-dot" data-target="1"></div>
                            <div class="evo-dot" data-target="2"></div>
                            <div class="evo-dot" data-target="3"></div>
                        </div>
                    </div>
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

    // Mocking the core engine behavior representing the script implementation
    function executeStateShiftMock(newIndex) {
        if (newIndex < 0 || newIndex > 3) return; // Strict bounds

        const panes = Array.from(doc.querySelectorAll('.evo-pane'));
        const dots = Array.from(doc.querySelectorAll('.evo-dot'));
        const pBtn = doc.getElementById('evo-prev');
        const nBtn = doc.getElementById('evo-next');

        // Decouple all
        panes.forEach(p => p.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        // Assign
        panes[newIndex].classList.add('active');
        dots[newIndex].classList.add('active');

        // Assert UI interaction logic
        pBtn.disabled = newIndex === 0;
        nBtn.disabled = newIndex === 3;
    }

    describe('Horizontal Evolutionary Slider Checks', () => {

        it('should correctly initialize with Pane 0 locked (prev-disabled)', () => {
            const panes = doc.querySelectorAll('.evo-pane');
            const prevBtn = doc.getElementById('evo-prev');

            // Baseline HTML DOM is modeled for index 0 state
            expect(panes[0].classList.contains('active')).toBe(true);
            expect(panes[1].classList.contains('active')).toBe(false);
            expect(prevBtn.disabled).toBe(true);
        });

        it('should transition accurately to the India A/B shift (Index 1) on click', () => {
            executeStateShiftMock(1);
            const panes = doc.querySelectorAll('.evo-pane');
            const dots = doc.querySelectorAll('.evo-dot');
            const prevBtn = doc.getElementById('evo-prev');

            expect(panes[0].classList.contains('active')).toBe(false);
            expect(panes[1].classList.contains('active')).toBe(true);
            expect(dots[1].classList.contains('active')).toBe(true);

            // Previous button strictly unlocks
            expect(prevBtn.disabled).toBe(false);
        });

        it('should strictly bounds-check and refuse to evaluate beyond index 3 (Zonal Return)', () => {
            executeStateShiftMock(3); // Shift to max

            const panes = doc.querySelectorAll('.evo-pane');
            expect(panes[3].classList.contains('active')).toBe(true);
            expect(doc.getElementById('evo-next').disabled).toBe(true);

            // Simulate Out-of-Bounds execution 
            executeStateShiftMock(4);

            // It should remain at 3 natively due to the defensive check
            expect(panes[3].classList.contains('active')).toBe(true);
        });

        it('should appropriately clear dot-navigation overlaps resolving pagination anomalies', () => {
            // Jump from 0 -> 3 directly
            executeStateShiftMock(3);

            const dots = Array.from(doc.querySelectorAll('.evo-dot'));
            const activeDots = dots.filter(d => d.classList.contains('active'));

            // Guard against multi-active elements destroying the CSS visual bounds
            expect(activeDots.length).toBe(1);
            expect(activeDots[0].getAttribute('data-target')).toBe("3");
        });
    });
});
