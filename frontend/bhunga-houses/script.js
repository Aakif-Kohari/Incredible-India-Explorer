const bhungaData = {
    roof: {
        title: "Conical Thatch Roof",
        description: "The roof is uniquely conical, constructed using bamboo and wooden trusses overlaid with dried grass or thatch.",
        resilience: "The conical aerodynamic shape deflects the high-velocity cyclonic winds of the Kutch desert. Because it is incredibly lightweight, even if it collapses during a massive earthquake, it will not cause fatal crushing injuries.",
        construction: "Built separately and placed on top of the walls, ensuring that the roof's weight does not stress the mud walls."
    },
    wall: {
        title: "Circular Mud Walls",
        description: "The primary structural component of a Bhunga is its cylindrical shape.",
        resilience: "This circular geometry is the secret to its legendary earthquake resilience. Unlike square houses, a circle has no corners where stress can concentrate and cause cracking. Seismic waves travel smoothly around the structure.",
        construction: "Constructed using sun-dried mud blocks or wattle-and-daub, plastered with a thick layer of mud and cow dung which acts as excellent thermal insulation against the blistering desert heat."
    },
    window: {
        title: "Ventilation (Small Windows)",
        description: "Bhunga houses typically have very small windows placed at a low level.",
        resilience: "By keeping the windows small, structural integrity is maintained. Large openings would create weak points in the mud wall during an earthquake.",
        construction: "These small, low windows draw in cooler air from near the ground, while the hot air rises and escapes through the breathable thatch roof, keeping the interior naturally air-conditioned."
    },
    decor: {
        title: "Lipan Kaam (Mud and Mirror Art)",
        description: "The interior (and sometimes exterior) walls are heavily decorated with 'Lipan Kaam'—intricate patterns created using mud relief work inlaid with small pieces of mirror.",
        resilience: "While primarily decorative, this cultural art form is applied directly onto the mud walls, integrating seamlessly without compromising structural integrity.",
        construction: "In the pre-electricity era, a single oil lamp lit inside the Bhunga would reflect off the thousands of tiny mirrors in the Lipan Kaam, brightly illuminating the entire circular room."
    },
    plinth: {
        title: "Elevated Plinth",
        description: "The entire structure is built on a raised circular platform.",
        resilience: "The Kutch region experiences extreme climatic swings, from arid desert conditions to severe flash floods. The high plinth protects the house from waterlogging and prevents desert sandstorms from blowing directly into the living space.",
        construction: "Constructed using compacted earth, stone, or brick, providing a solid, stable base for the mud walls."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.diag-section');
    const titleEl = document.getElementById('section-title');
    const descEl = document.getElementById('section-description');
    const metaContainer = document.getElementById('section-meta');
    const resilienceEl = document.getElementById('meta-resilience');
    const constructionEl = document.getElementById('meta-construction');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Prevent event bubbling if a button is inside another element
            e.stopPropagation();

            // Remove active class from all
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked
            button.classList.add('active');

            // Fetch data
            const sectionId = button.getAttribute('data-section');
            const data = bhungaData[sectionId];

            if (data) {
                // Update UI
                titleEl.textContent = data.title;
                descEl.textContent = data.description;
                
                resilienceEl.textContent = data.resilience;
                constructionEl.textContent = data.construction;

                // Show meta info
                metaContainer.classList.remove('hidden');
            }
        });
    });
});
