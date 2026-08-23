const regions = {
    hyderabad: {
        name: 'Hyderabad',
        place: 'Telangana · Deccan',
        description:
            'A celebrated Deccan tradition with both kachhi and pakki forms. The rice and meat are finished together under dum, allowing steam to carry the aroma through the pot.',
        signature: 'Kachhi & pakki',
        method: 'Dum / sealed pot',
        ingredients: 'Rice, meat, cardamom, green chilli, ghee, saffron',
        story: "The style sits within Hyderabad's layered Deccani culinary culture.",
        source: 'https://www.incredibleindia.gov.in/en/telangana/hyderabad/food-and-cuisine.html'
    },
    lucknow: {
        name: 'Awadh / Lucknow',
        place: 'Uttar Pradesh · Awadh',
        description:
            'Lakhnavi biryani is associated with the culinary culture of Lucknow and the Nawabi era. Its rice is gently seasoned and cooked with stock before the final dum stage.',
        signature: 'Lakhnavi / Awadhi',
        method: 'Stock + dum',
        ingredients: 'Rice, mutton, stock, saffron, rose water, aromatic spices',
        story: "A courtly regional style that became part of Lucknow's wider food culture.",
        source: 'https://www.prod.incredibleindia.gov.in/content/incredible-india-v2/en/destinations/lucknow/lakhnavi-biryani.html'
    },
    kolkata: {
        name: 'Kolkata',
        place: 'West Bengal · Eastern India',
        description:
            "Kolkata biryani has a recognizable combination of fragrant rice, meat and potato. The city's version is often connected to the migration of Awadhi culinary traditions to Bengal.",
        signature: 'Potato + meat',
        method: 'Pakki + dum',
        ingredients: 'Rice, mutton, potato, saffron, whole spices',
        story: "The potato became a defining local marker of the city's biryani tradition.",
        source: 'https://www.incredibleindia.gov.in/en/west-bengal/kolkata/food-guide-a-culinary-journey-through-kolkata-s-best-restaurantsby'
    },
    malabar: {
        name: 'Malabar',
        place: 'Kerala · Northern Malabar Coast',
        description:
            'Northern Kerala has a distinct biryani culture shaped by coastal trade, Muslim food traditions and local ingredients. Many Malabar preparations use aromatic short-grain rice such as jeerakasala.',
        signature: 'Malabar biryani',
        method: 'Layering / dum',
        ingredients: 'Jeerakasala rice, meat, fried onions, spices, ghee',
        story: 'Coastal exchange and local rice traditions give Malabar biryani its own identity.',
        source: 'https://www.keralatourism.org/kerala-articles/malabar-biryani/115/'
    },
    ambur: {
        name: 'Ambur / Tamil Nadu',
        place: 'Tamil Nadu · North Arcot region',
        description:
            'Ambur is strongly associated with a Tamil Nadu biryani style that uses seeraga samba rice and a distinctive chilli-and-meat base.',
        signature: 'Ambur biryani',
        method: 'One-pot / layering',
        ingredients: 'Seeraga samba rice, meat, dried chillies, mint, coriander',
        story: "A local rice and spice profile makes Ambur's version readily recognizable.",
        source: 'https://www.tamilnadutourism.com/foods/ambur-biryani.php'
    },
    bombay: {
        name: 'Mumbai',
        place: 'Maharashtra · Western India',
        description:
            "Mumbai's biryani culture reflects a city where regional communities, traders and migrants brought different rice-and-meat traditions into a shared urban food landscape.",
        signature: 'Mumbai-style biryani',
        method: 'Layering / dum',
        ingredients: 'Rice, meat or chicken, potatoes, spices, herbs',
        story: "Its identity is best understood as part of Mumbai's plural culinary culture rather than a single canonical recipe.",
        source: 'https://www.incredibleindia.gov.in/en/maharashtra/mumbai/food-and-cuisine'
    }
};

const nameEl = document.getElementById('region-name');
const placeEl = document.getElementById('region-place');
const descriptionEl = document.getElementById('region-description');
const signatureEl = document.getElementById('region-signature');
const methodEl = document.getElementById('region-method');
const ingredientsEl = document.getElementById('region-ingredients');
const storyEl = document.getElementById('region-story');
const linksEl = document.getElementById('region-links');

function selectRegion(key) {
    const region = regions[key];
    if (!region) return;

    nameEl.textContent = region.name;
    placeEl.textContent = region.place;
    descriptionEl.textContent = region.description;
    signatureEl.textContent = region.signature;
    methodEl.textContent = region.method;
    ingredientsEl.textContent = region.ingredients;
    storyEl.textContent = region.story;
    linksEl.innerHTML = `<a href="${region.source}" target="_blank" rel="noopener noreferrer">View supporting source ↗</a>`;

    document.querySelectorAll('[data-region]').forEach(button => {
        button.classList.toggle('active', button.dataset.region === key);
    });
}

document.querySelectorAll('[data-region]').forEach(button => {
    button.addEventListener('click', () => {
        selectRegion(button.dataset.region);
        document.getElementById('region-name').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});

selectRegion('hyderabad');
