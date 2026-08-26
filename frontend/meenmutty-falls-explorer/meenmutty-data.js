/**
 * Meenmutty Falls Explorer — Data Module
 * Location, scale, tier structure, seasonal, gallery, attraction and reference data.
 */

const MEENMUTTY_COORDS = [11.685, 76.05]; // near Padinjarathara / Banasura Sagar Dam, Wayanad

const HEIGHT_COMPARISONS = [
    { name: "Meenmutty Falls", heightMeters: 300, note: "~300m (984 ft) across three tiers — the largest waterfall in Wayanad" },
    { name: "Soochipara Falls", heightMeters: 200, note: "Another Wayanad three-tiered cascade, for comparison" },
    { name: "Jog Falls (Karnataka)", heightMeters: 253, note: "India's highest un-tiered waterfall" },
    { name: "Qutub Minar (Delhi)", heightMeters: 73, note: "Tallest brick minaret in the world" }
];

const TIER_STAGES = [
    {
        stage: "1",
        title: "First Tier & Pool",
        img: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800",
        alt: "A smaller waterfall tier flowing into a shallow, calm forest pool",
        text: "Roughly 500 metres from the entrance, the first tier drops into a shallow, low-depth pool considered safe for swimming — the easiest and most-visited part of the falls."
    },
    {
        stage: "2",
        title: "Second Tier",
        img: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=800",
        alt: "A stream cascading over boulder steps through dense forest",
        text: "A further 500 metres of trekking, up steps built over boulders alongside the stream, leads to the second tier — with wider views of thick surrounding vegetation."
    },
    {
        stage: "3",
        title: "Third Tier & Viewpoint",
        img: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&q=80&w=800",
        alt: "A rocky forest viewpoint overlooking a reservoir and valley from a waterfall's top tier",
        text: "The final, hardest half-kilometre crosses slippery rocks in the stream, often with rope assistance. At the top, the reward is a sweeping view over the Banasura Sagar Dam and surrounding valleys."
    }
];

const SEASONAL_DATA = [
    {
        season: "Monsoon (Jun–Sep)",
        badgeClass: "badge-monsoon",
        img: "https://images.unsplash.com/photo-1622401467213-a2fecad55b93?auto=format&fit=crop&q=80&w=600",
        alt: "A waterfall in extremely heavy, dangerous monsoon flow",
        title: "Dangerous & Often Closed",
        text: "Inflow surges dramatically and currents become genuinely hazardous — the falls have been closed to visitors during monsoon and periods of landslide risk, and drownings have occurred since 1991."
    },
    {
        season: "Post-Monsoon to Summer (Oct–May)",
        badgeClass: "badge-winter",
        img: "https://images.unsplash.com/photo-1601582589907-f92af5ed9db8?auto=format&fit=crop&q=80&w=600",
        alt: "A calmer, clearer waterfall flowing through green forest in dry conditions",
        title: "Calm & Swimmable",
        text: "Flow settles into a calmer, clearer cascade, and the first-tier pool becomes safe for swimming. This is the recommended and most commonly open window to visit."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800",
        caption: "Meenmutty Falls' three-tiered cascade dropping through Western Ghats forest",
        category: "Hero Waterfall"
    },
    {
        url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=800",
        caption: "The second tier of the falls, reached by steps built over boulders",
        category: "Multi-Tier View"
    },
    {
        url: "https://images.unsplash.com/photo-1587582423116-ec07293f0395?auto=format&fit=crop&q=80&w=800",
        caption: "Dense Western Ghats forest along the trek to the falls",
        category: "Forest Landscape"
    },
    {
        url: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800",
        caption: "The forest trail leading trekkers toward Meenmutty's tiers",
        category: "Trail / Approach"
    }
];

const NEARBY_ATTRACTIONS = [
    { name: "Banasura Sagar Dam", distance: "~5 km", lat: 11.6941, lng: 76.0631, description: "India's largest earthen dam, with a scenic reservoir and boating amid the Wayanad hills." },
    { name: "Soochipara Falls", distance: "~30 km", lat: 11.5192, lng: 76.1608, description: "Another popular three-tiered Wayanad waterfall with a natural swimming pool." },
    { name: "Neelimala Viewpoint", distance: "~10 km", lat: 11.6300, lng: 76.0500, description: "A scenic hilltop lookout over the surrounding Wayanad valleys and forest." },
    { name: "Myladippara", distance: "~12 km", lat: 11.6200, lng: 76.0400, description: "A rocky viewpoint known for panoramic sunrise and sunset views over Wayanad." }
];

const REFERENCES = [
    { text: "Wikipedia — Meenmutty Falls (Wayanad), Padinjarathara, Kerala.", link: "https://en.wikipedia.org/wiki/Meenmutty_Falls_(Wayanad)" },
    { text: "Kerala Tourism — Meenmutty Waterfalls, Kalpetta.", link: "https://www.keralatourism.org/destination/meenmutty-waterfalls-kalpetta/541/" },
    { text: "DTPC Wayanad — Banasura Meenmutty Waterfalls.", link: "https://www.dtpcwayanad.com/destination/banasura-meenmutty-waterfalls-wayanad" },
    { text: "Images: Unsplash contributors (used under the Unsplash License for demonstration purposes).", link: "https://unsplash.com/license" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MEENMUTTY_COORDS, HEIGHT_COMPARISONS, TIER_STAGES, SEASONAL_DATA, GALLERY_IMAGES, NEARBY_ATTRACTIONS, REFERENCES };
}