const nalukettuData = {
    verandah: {
        title: "Chuttu Verandah (Surrounding Corridor)",
        description: "The Chuttu Verandah is a continuous corridor running around the entire perimeter of the house, separating the inner walls from the outside environment.",
        materials: "Supported by beautifully carved wooden pillars (often teak or rosewood) resting on granite bases.",
        climate: "Crucial for monsoon protection. The deep overhanging sloped roofs extend over this verandah, completely protecting the inner laterite walls from the torrential driving rains of Kerala."
    },
    vadakkini: {
        title: "Vadakkini (Northern Block)",
        description: "According to Vastu Shastra, the northern block (Vadakkini) is typically reserved for the kitchen and dining areas.",
        materials: "Constructed using laterite stone blocks plastered with a unique mixture of lime, jaggery, and plant juices for a smooth finish.",
        climate: "Positioned to safely vent smoke from the wood-fired stoves while utilizing cross-ventilation."
    },
    thekkini: {
        title: "Thekkini (Southern Block)",
        description: "The southern block (Thekkini) often houses the bedrooms and private living quarters of the family.",
        materials: "Features exquisite wooden paneling and false ceilings made of teak to regulate temperature.",
        climate: "The thick laterite walls and wooden ceilings provide excellent thermal insulation against the tropical heat."
    },
    kizhakkini: {
        title: "Kizhakkini (Eastern Block)",
        description: "The eastern block (Kizhakkini) is considered highly auspicious and is usually where the Pooja (prayer) room is located, facing the rising sun.",
        materials: "Often features the most intricate wood carvings and brass lamps (Nilavilakku).",
        climate: "Receives the gentle morning sunlight while remaining shaded during the intense afternoon heat."
    },
    padinjattini: {
        title: "Padinjattini (Western Block)",
        description: "The western block (Padinjattini) is traditionally used as the main granary (Ara) and for storing valuables. It is the most secure part of the house.",
        materials: "The 'Ara' is essentially a strongroom made entirely of thick interlocking wooden planks without the use of nails.",
        climate: "Elevated slightly to protect the stored grain and wealth from dampness during the heavy monsoons."
    },
    nadumuttam: {
        title: "Nadumuttam (Central Courtyard)",
        description: "The 'Nadumuttam' is the sunken, open-to-sky central courtyard. A Nalukettu gets its name ('Nalu' = four, 'Kettu' = blocks) from the four halls built around this single courtyard. Larger homes may have two (Ettukettu) or four (Pathinarukettu) courtyards.",
        materials: "Usually unpaved or lined with river pebbles, allowing rainwater to percolate into the ground. A Tulsi plant is traditionally placed in the center.",
        climate: "Acts as a powerful thermal chimney. It allows hot air to escape and draws fresh, cool air from the shaded verandahs into the surrounding rooms, ensuring excellent natural ventilation."
    },
    poomukham: {
        title: "Poomukham (Entrance Porch)",
        description: "The Poomukham is the prominent, welcoming entrance porch that protrudes from the main structure, where the head of the family would sit to receive guests.",
        materials: "Characterized by an elaborately carved wooden ceiling (Thattinpuram) and heavy wooden seating (Charupadi) built into the perimeter.",
        climate: "Its steeply sloped roof protects the entrance from the sun and rain, providing a cool, shaded semi-outdoor living space."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.fp-section');
    const titleEl = document.getElementById('section-title');
    const descEl = document.getElementById('section-description');
    const metaContainer = document.getElementById('section-meta');
    const materialsEl = document.getElementById('meta-materials');
    const climateEl = document.getElementById('meta-climate');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked (if multiple share the same data-section like verandahs, activate all)
            const sectionId = button.getAttribute('data-section');
            document.querySelectorAll(`[data-section="${sectionId}"]`).forEach(b => b.classList.add('active'));

            // Fetch data
            const data = nalukettuData[sectionId];

            if (data) {
                // Update UI
                titleEl.textContent = data.title;
                descEl.textContent = data.description;
                
                materialsEl.textContent = data.materials;
                climateEl.textContent = data.climate;

                // Show meta info
                metaContainer.classList.remove('hidden');
            }
        });
    });
});
