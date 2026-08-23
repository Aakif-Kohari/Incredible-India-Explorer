// howrah-bridge-data.js
// Data for the Howrah Bridge: Kolkata's Engineering Landmark Explorer

const BRIDGE_STATS = [
    { label: "Opened", value: "1943" },
    { label: "Total Length", value: "705 m" },
    { label: "Daily Vehicles", value: "~100,000" },
    { label: "Steel Used", value: "26,500 Tons" },
];

const BRIDGE_LOCATION = {
    name: "Howrah Bridge (Rabindra Setu)",
    location: "Spans the Hooghly River, connecting Howrah and Kolkata, West Bengal, India",
    coordinates: "22°35′06″N 88°20′49″E",
    maintainedBy: "Kolkata Port Trust",
};

const BRIDGE_HISTORY = {
    intro: "Before the current bridge existed, a pontoon bridge built by Sir Bradford Leslie in 1874 connected Howrah and Kolkata — but by the early 20th century, growing traffic and river navigation needs made it inadequate. After years of debate through the Mukherjee Committee and Goode Committee, the Howrah Bridge Act of 1926 set the plan for a permanent replacement in motion, though work was repeatedly delayed by both World Wars.",
    points: [
        { title: "Design Commissioned", detail: "British engineering firm Rendel, Palmer & Tritton designed the bridge, settling on a suspension-type balanced cantilever design — the first of its kind at this scale in India." },
        { title: "Construction (1936–1942)", detail: "Built by the Braithwaite, Burn & Jessop Construction Company (with Cleveland Bridge & Engineering Company also involved), foundation work was completed by November 1938, cantilever arms were erected by 1940–41, and the two halves of the central suspended span — each 282 feet long and weighing 2,000 tons — were completed in December 1941." },
        { title: "Opened to Traffic", detail: "The bridge opened to traffic on 3 February 1943, replacing the old pontoon bridge entirely, during the height of World War II when it also served as a vital link for Allied troop movements toward the Burmese front." },
        { title: "Renamed Rabindra Setu", detail: "On 14 June 1965, the bridge was officially renamed Rabindra Setu in honour of Rabindranath Tagore, the first Indian and Asian Nobel laureate — though the original name 'Howrah Bridge' has remained far more common in everyday use." },
    ],
};

const BRIDGE_ENGINEERING = {
    intro: "Howrah Bridge is a suspension-type balanced cantilever bridge — a design in which two horizontal arms extend outward from towers on each bank and support a central suspended span between them, entirely without any pillars in the riverbed.",
    explainer: [
        {
            title: "What 'Cantilever' Means",
            detail: "Picture two diving boards, each anchored firmly on opposite riverbanks, reaching toward each other from either side. A separate central piece is then lowered to rest in the gap between them. That's essentially how a balanced cantilever bridge works — each side supports its own half independently, and the whole structure balances like a see-saw around each anchor point.",
        },
        {
            title: "Why No River Pillars?",
            detail: "The Hooghly River carries heavy monsoon flows and constantly shifting silt deposits, making it impractical and risky to build supporting piers directly in the riverbed. The cantilever design solves this by anchoring the entire structure on land at both banks, leaving the river channel completely clear for boat traffic.",
        },
        {
            title: "No Nuts or Bolts",
            detail: "Remarkably, the entire steel structure — nearly 26,500 tons of high-tensile steel, of which about 18,200–23,000 tons was supplied by Tata Steel — is held together entirely by rivets rather than nuts and bolts, a hallmark of the riveted-steel engineering style of its era.",
        },
        {
            title: "Scale at a Glance",
            detail: "The bridge stretches 705 metres in total length with a central span of about 457 metres (1,500 feet), a width of roughly 21.6 metres carrying 6 lanes of traffic plus two pedestrian footpaths, and towers rising about 82 metres above the roadway.",
        },
    ],
};

const BRIDGE_HOOGHLY = {
    intro: "The Hooghly River isn't just what the bridge crosses — its behavior directly shaped the bridge's entire engineering approach.",
    points: [
        "The river's heavy monsoon-season flow and constantly shifting silt deposits made mid-river piers impractical, which is precisely why the cantilever design (anchored only on the banks) was chosen over more conventional pier-supported bridge designs.",
        "Keeping the river channel completely clear beneath the bridge preserves the Hooghly's role as an active shipping channel connecting Kolkata's port facilities to maritime trade routes.",
        "During construction, engineers had to sink deep monolith foundations through the riverbed's soft clay to reach a stable founding stratum, a major engineering challenge given the river's depth and shifting sediment.",
        "The Hooghly remains central to Kolkata's identity and daily life, and the bridge is widely considered one of the best places to view the river, the working ghats, and the boat traffic that still moves beneath it every day.",
    ],
};

const BRIDGE_KOLKATA_CONNECTION = {
    intro: "Howrah Bridge is often called the 'Gateway to Kolkata' — and for good reason. It directly connects Howrah Railway Station, one of India's busiest rail terminals and a major gateway for travelers arriving in the city, to central Kolkata.",
    points: [
        "The bridge sits beside the Mullick Ghat Flower Market, one of Asia's largest flower markets, adding to its role as a daily backdrop to the city's commercial life.",
        "It remains one of the busiest cantilever bridges in the world, carrying an estimated 100,000+ vehicles and well over 100,000–150,000 pedestrians every single day.",
        "For millions of daily commuters between Howrah (an industrial hub) and Kolkata (the commercial and administrative center), the bridge is the primary artery linking the two halves of the metropolitan region.",
    ],
};

const BRIDGE_INTERESTING_FACTS = [
    { icon: "🔩", fact: "The entire bridge is held together by rivets — not a single nut or bolt was used anywhere in its steel structure." },
    { icon: "🥉", fact: "At the time of its construction, it was the third-longest cantilever bridge in the world; today it ranks sixth-longest of its type globally." },
    { icon: "💣", fact: "The bridge survived Japanese air raids during World War II with minimal damage, just two years after opening to traffic." },
    { icon: "📚", fact: "It's been featured in countless Bengali and Indian films, songs, and books, cementing its status as a cultural icon far beyond engineering circles." },
    { icon: "🌉", fact: "It is one of four bridges spanning the Hooghly at Kolkata today, alongside Vidyasagar Setu, Vivekananda Setu, and Nivedita Setu." },
    { icon: "🎣", fact: "Locals often confuse it with Vidyasagar Setu (the 'Second Hooghly Bridge') — but that is a modern cable-stayed bridge completed in 1992, an entirely different structure a few kilometres downstream." },
];

const BRIDGE_TIMELINE = [
    { year: 1874, title: "Original pontoon bridge opens", desc: "Sir Bradford Leslie's floating pontoon bridge connects Howrah and Kolkata for the first time, designed to open for river traffic." },
    { year: 1926, title: "Howrah Bridge Act passed", desc: "Following years of committee debate, legislation is passed authorizing construction of a permanent replacement bridge." },
    { year: 1936, title: "Construction begins", desc: "Work starts on the foundations of the new cantilever bridge, designed by Rendel, Palmer & Tritton." },
    { year: 1938, title: "Foundations completed", desc: "The deep monolith foundation work, sunk through the Hooghly's soft riverbed clay, is completed in November." },
    { year: 1941, title: "Cantilever arms and suspended span completed", desc: "The cantilever arms are erected and the central 2,000-ton suspended span sections are finished by December." },
    { year: 1943, title: "Bridge opens to traffic", desc: "The bridge opens to public traffic on 3 February, replacing the old pontoon bridge entirely during the height of World War II." },
    { year: 1965, title: "Renamed Rabindra Setu", desc: "On 14 June, the bridge is officially renamed in honour of Rabindranath Tagore, though the popular name 'Howrah Bridge' endures." },
    { year: 1992, title: "Vidyasagar Setu opens nearby", desc: "A second bridge across the Hooghly, the cable-stayed Vidyasagar Setu, opens to help relieve traffic pressure on Howrah Bridge." },
];

const BRIDGE_GALLERY = [
    {
        title: "Howrah Bridge, 1945",
        caption: "A wartime-era photograph of the bridge taken in 1945, just two years after it opened to traffic.",
        url: "https://commons.wikimedia.org/wiki/Special:FilePath/Howrah%20Bridge,%20Calcutta%20in%201945.jpg",
        credit: "Public domain (Clyde Waddell / University of Pennsylvania Library) — Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Howrah_Bridge,_Calcutta_in_1945.jpg",
    },
    {
        title: "View from the Hooghly River",
        caption: "The bridge's cantilever structure seen from the Hooghly, showing the river it was engineered to leave unobstructed.",
        url: "https://commons.wikimedia.org/wiki/Special:FilePath/Hooghly%20River%20and%20the%20Howrah%20Bridge,%20Kolkata,%20India.jpg",
        credit: "Photo: Vyacheslav Argenberg, CC BY 4.0 — Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Hooghly_River_and_the_Howrah_Bridge,_Kolkata,_India.jpg",
    },
    {
        title: "Rabindra Setu Today",
        caption: "A modern view of the bridge, officially named Rabindra Setu since 1965.",
        url: "https://commons.wikimedia.org/wiki/Special:FilePath/Rabindra%20Setu%20(Howrah%20Bridge),%20Kolkata.jpg",
        credit: "CC0 (public domain dedication) — Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Rabindra_Setu_(Howrah_Bridge),_Kolkata.jpg",
    },
    {
        title: "Illuminated at Night",
        caption: "The bridge lit up after dark, a familiar sight for anyone entering or leaving Kolkata.",
        url: "https://commons.wikimedia.org/wiki/Special:FilePath/Howrah%20Bridge%20at%20night.jpg",
        credit: "Photo credit per file page, CC BY 3.0 — Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Howrah_Bridge_at_night.jpg",
    },
    {
        title: "River Traffic Beneath the Bridge",
        caption: "A boat passing beneath the bridge's central span, illustrating the unobstructed river channel its cantilever design preserves.",
        url: "https://commons.wikimedia.org/wiki/Special:FilePath/Howrah%20Bridge%20and%20Boat.jpg",
        credit: "Photo credit per file page, CC BY-SA 4.0 — Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Howrah_Bridge_and_Boat.jpg",
    },
    {
        title: "Daily Life on the Bridge",
        caption: "Pedestrians crossing the bridge, part of the more than 100,000 people who walk across it every day.",
        url: "https://commons.wikimedia.org/wiki/Special:FilePath/Howrah%20Bridge%2002.jpg",
        credit: "Photo credit per file page, CC BY-SA 3.0 — Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Howrah_Bridge_02.jpg",
    },
];

const BRIDGE_REFERENCES = [
    { text: "Wikipedia — Howrah Bridge (official characteristics, history, and statistics).", url: "https://en.wikipedia.org/wiki/Howrah_Bridge" },
    { text: "Kenilworth Hotels — 'Howrah Bridge: History, Architecture, and Visitor Guide.'", url: "https://www.kenilworthhotels.com/russel-street-kolkata/blogs/howrah-bridge.html" },
    { text: "Sankalp India Foundation — 'Howrah Bridge: Kolkata's Lifeline' (construction timeline detail).", url: "https://www.sankalpindia.net/howrah-bridge-kolkatas-lifeline" },
    { text: "Holidify — 'The Complete History of Howrah Bridge in 7 Points.'", url: "https://www.holidify.com/pages/history-of-howrah-bridge-687.html" },
];