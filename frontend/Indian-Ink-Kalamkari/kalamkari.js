(() => {
    const steps = {
        prepare: [
            'FOUNDATION',
            'Prepare the cloth',
            'Cotton cloth is prepared and treated so that it can receive the drawing and subsequent colour processes.',
            'Cotton cloth'
        ],
        draw: [
            'DRAWING',
            'Draw the narrative',
            'The artisan uses a kalam, or pen-like tool, to establish outlines, figures, motifs and narrative details on the cloth.',
            'Kalam / pen'
        ],
        mordant: [
            'BINDING',
            'Apply mordant',
            'Traditional processes can use mordants to help particular dyes bind to the prepared fabric and create characteristic colour relationships.',
            'Mordant'
        ],
        dye: [
            'COLOUR',
            'Build the palette',
            'Natural dye sources and controlled applications build colour areas. Washing between stages helps reveal and fix the intended effect.',
            'Natural dyes'
        ],
        paint: [
            'LAYERING',
            'Paint the story',
            'Additional colour and detail are applied to figures, plants, animals, borders and other motifs to develop the visual narrative.',
            'Pigment & dye'
        ],
        finish: [
            'FINAL PASS',
            'Wash & refine',
            'The cloth is washed and finished so the layered colours and drawn forms become a cohesive textile artwork.',
            'Water & finishing'
        ]
    };
    function select(k) {
        const d = steps[k];
        if (!d) return;
        document.querySelectorAll('.step').forEach(b => b.classList.toggle('active', b.dataset.step === k));
        document.getElementById('process-mark').textContent = String(Object.keys(steps).indexOf(k) + 1).padStart(
            2,
            '0'
        );
        document.getElementById('process-kicker').textContent = d[0];
        document.getElementById('process-title').textContent = d[1];
        document.getElementById('process-text').textContent = d[2];
        document.getElementById('process-material').textContent = d[3];
    }
    document.querySelectorAll('.step').forEach(b => b.addEventListener('click', () => select(b.dataset.step)));
    select('prepare');
})();
