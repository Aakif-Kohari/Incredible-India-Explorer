/* ==========================================================================
   Nuranang Falls Data
   Elevation, seasonal, and route data for the Sela Pass cascade.
   ========================================================================== */
const nuranangElevation = [
    { id: 'sela-pass', label: 'Sela Pass (Source)', height: 4170, max: 5000 },
    { id: 'nuranang', label: 'Nuranang Falls', height: 3000, max: 5000 },
    { id: 'jang', label: 'Jang Town', height: 2500, max: 5000 },
    { id: 'tawang', label: 'Tawang Town', height: 2669, max: 5000 }
];

const nuranangSeasons = [
    { id: 'summer', title: 'Summer (May - September)', desc: 'The only accessible window. Snow melts, feeding the Nuranang Chu with glacial runoff. The falls are at their most powerful, and the turquoise water contrasts against the green alpine meadows.', img: 'https://placehold.co/400x250/38BDF8/fff?text=Summer+Glacial+Melt' },
    { id: 'winter', title: 'Winter (October - April)', desc: 'The region is buried under heavy snow. The Sela Pass and the road to Jang are completely closed. The waterfall often freezes partially, turning into a dramatic ice sculpture in the extreme sub-zero temperatures.', img: 'https://placehold.co/400x250/E2E8F0/0F172A?text=Winter+Ice+Sculpture' }
];

const nuranangRoute = [
    { title: 'Tezpur / Guwahati', desc: 'The journey begins in the plains of Assam. Travelers must obtain an Inner Line Permit (ILP) to enter Arunachal Pradesh.' },
    { title: 'Bomdila & Dirang', desc: 'The ascent begins through the Eastern Himalayas. The road winds through dense forests and deep river valleys, acclimatizing travelers to the altitude.' },
    { title: 'Sela Pass (4,170m)', desc: 'The highest motorable point on the route. The landscape shifts to barren, high-altitude tundra. The frozen Sela Lake is visible nearby.' },
    { title: 'Descent to Jang', desc: 'A steep, winding descent from the pass. Nuranang Falls is located just 2 km before reaching the town of Jang, visible directly from the highway.' }
];
