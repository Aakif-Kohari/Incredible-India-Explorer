const haveliData = {
    jharokha: {
        title: "Jharokha (Overhanging Balcony)",
        description: "The Jharokha is a signature element of Rajasthani architecture. These enclosed, overhanging balconies protrude from the facade of the Haveli, adding both aesthetic beauty and functional climate control.",
        climate: "They catch the breeze and channel it into the house, acting as traditional wind-catchers. The overhanging structure also shades the walls below from direct sunlight.",
        art: "Exquisitely carved in sandstone or marble, they feature intricate geometric and floral patterns, topped with a curved 'Bangaldar' roof."
    },
    window: {
        title: "Latticed Windows (Jaali)",
        description: "Jaalis are intricately carved stone screens used for windows and balcony enclosures. They provide privacy while maintaining a constant connection with the outside world.",
        climate: "The small perforations compress the passing air, significantly cooling it before it enters the room (based on the Venturi effect). They also filter out harsh sunlight and dust.",
        art: "Carved from a single slab of stone, the jaali patterns require immense geometric precision and showcase the master craftsmanship of Rajasthani artisans."
    },
    courtyard: {
        title: "Internal Courtyard (Chowk)",
        description: "The central courtyard, or Chowk, is the heart of the Haveli. Large mansions often have multiple courtyards separating the public areas (Mardana) from the private women's quarters (Zanana).",
        climate: "Acts as a thermal chimney. During the day, hot air rises and escapes through the open roof. At night, the courtyard traps cool air, creating a comfortable microclimate for the surrounding rooms.",
        art: "Often paved with patterned stones, surrounded by ornate pillars, and sometimes featuring a central fountain to further cool the air through evaporation."
    },
    wall: {
        title: "Thick Stone Walls",
        description: "The primary structural component of the Haveli, constructed using locally sourced yellow sandstone (in Jaisalmer) or red sandstone (in Bikaner).",
        climate: "The massive thickness provides high thermal mass. The walls absorb the intense desert heat during the day, preventing it from reaching the interior, and slowly release it during the freezing desert nights.",
        art: "The exterior surface is often adorned with shallow reliefs and ornate corbels supporting the balconies above."
    },
    entrance: {
        title: "Grand Entrance (Darwaza)",
        description: "The main gateway to the Haveli is designed to be imposing and majestic, often large enough to allow an elephant to pass through in royal or highly affluent homes.",
        climate: "Positioned strategically to prevent direct sandstorms from blowing straight into the inner courtyards. Often features a raised threshold to keep out street dust.",
        art: "Constructed with heavy timber doors, reinforced with iron spikes and brass knobs, and framed by elaborately carved stone archways."
    },
    decor: {
        title: "Frescoes & Decorative Stonework",
        description: "While the structure itself provides shelter, the decoration tells the story of the owners' wealth, beliefs, and travels.",
        climate: "Lime plaster (Araish) is often used for frescoes; it reflects the sun's rays and helps keep the building cool while providing a smooth, marble-like finish.",
        art: "Shekhawati Havelis are famous for vibrant frescoes depicting mythology, trains, and British officers. Jaisalmer Havelis feature breathtaking, lace-like stone carvings."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.facade-section');
    const titleEl = document.getElementById('section-title');
    const descEl = document.getElementById('section-description');
    const metaContainer = document.getElementById('section-meta');
    const climateEl = document.getElementById('meta-climate');
    const artEl = document.getElementById('meta-art');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked
            button.classList.add('active');

            // Fetch data
            const sectionId = button.getAttribute('data-section');
            const data = haveliData[sectionId];

            if (data) {
                // Update UI
                titleEl.textContent = data.title;
                descEl.textContent = data.description;
                
                climateEl.textContent = data.climate;
                artEl.textContent = data.art;

                // Show meta info
                metaContainer.classList.remove('hidden');
            }
        });
    });
});
