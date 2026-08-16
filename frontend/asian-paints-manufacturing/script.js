/**
 * Asian Paints Manufacturing Journey
 * Data & Application Logic
 */

const PROCESS_STEPS = [
    {
        id: '1',
        title: "1. Raw Materials",
        desc: "The journey begins with sourcing key raw materials: Pigments (for color), Solvents (for consistency), Resins (for binding), and Additives (for performance). These are rigorously tested for quality before entering production.",
        source: "Asian Paints Sustainability Report"
    },
    {
        id: '2',
        title: "2. Pre-Mixing",
        desc: "Pigments are dispersed into the resin and solvent mixture. This creates a coarse paste. Accurate weighing and mixing are crucial at this stage to ensure color consistency and prevent lumps.",
        source: "Paint Manufacturing Industry Standards"
    },
    {
        id: '3',
        title: "3. Milling/Grinding",
        desc: "The paste is passed through industrial mills (like sand mills or bead mills) to grind the pigment particles down to microscopic sizes, ensuring a smooth, uniform dispersion within the resin base.",
        source: "Paint Manufacturing Industry Standards"
    },
    {
        id: '4',
        title: "4. Let-Down & Tinting",
        desc: "The ground paste is moved to a let-down tank where additional solvents, resins, and additives are blended in to achieve the desired viscosity and properties. Automated tinting systems precisely adjust the final color.",
        source: "Asian Paints Corporate Overview"
    },
    {
        id: '5',
        title: "5. Quality Testing",
        desc: "Before packaging, the batch undergoes strict quality control. It is tested for viscosity, opacity, color matching (using spectrophotometers), gloss, and drying time to meet Asian Paints' stringent standards.",
        source: "Asian Paints Quality Assurance Guidelines"
    },
    {
        id: '6',
        title: "6. Packaging",
        desc: "Once approved, the paint is automatically filled into cans and buckets. High-speed automated lines cap, seal, and label the containers, preparing them for shipping.",
        source: "Asian Paints Supply Chain Overview"
    },
    {
        id: '7',
        title: "7. Distribution",
        desc: "The finished products are stored in automated warehouses and then distributed across Asian Paints' massive supply chain network, reaching millions of homes globally.",
        source: "Asian Paints Annual Report"
    }
];

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const processBtns = document.querySelectorAll('.process-btn');
        const processDisplay = document.getElementById('process-display');

        function showStep(stepId) {
            const step = PROCESS_STEPS.find(s => s.id === stepId);
            if (!step) return;

            processBtns.forEach(btn => {
                if (btn.getAttribute('data-step') === stepId) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            processDisplay.innerHTML = `
                <h2>${step.title}</h2>
                <p>${step.desc}</p>
                <div class="process-source">Source: ${step.source}</div>
            `;
        }

        processBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                showStep(btn.getAttribute('data-step'));
            });
        });

        // Show first step initially
        showStep('1');
    });
}

if (typeof module !== 'undefined') {
    module.exports = {
        PROCESS_STEPS
    };
}
