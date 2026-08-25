/**
 * Titan Watchmaking Explorer — Data Module
 * Comprehensive dataset covering Titan Company Limited (Tata Group & TIDCO),
 * quartz revolution, Titan Edge (world's slimmest watch), iconic collections (Raga, Fastrack, Nebula),
 * and watchmaking design evolution timeline.
 */

const TITAN_INFO = {
    id: "titan-watches",
    title: "Titan: India's Iconic Watchmaker",
    foundedYear: "1984 CE",
    founders: "Tata Group & TIDCO (Xerxes Desai, Founding MD)",
    headquarters: "Bengaluru, Karnataka & Hosur Manufacturing Facility (TN)",
    globalRanking: "5th Largest Wristwatch Manufacturer in the World",
    engineeringFeat: "Titan Edge (World's Slimmest Quartz Movement at 1.15mm)",
    quickStats: [
        { label: "Founded Year", value: "1984", icon: "🕰️" },
        { label: "Global Rank", value: "5th Worldwide", icon: "🌍" },
        { label: "Slimmest Watch", value: "Titan Edge (1.15mm)", icon: "✨" },
        { label: "Parent Group", value: "Tata Group", icon: "🏢" },
        { label: "Retail Stores", value: "2,000+ World of Titan", icon: "🏬" },
        { label: "Headquarters", value: "Bengaluru, India", icon: "📍" }
    ]
};

const WATCH_COLLECTIONS = [
    {
        name: "Titan Edge",
        launchYear: "2002",
        category: "Ultra-Slim Horological Marvel",
        description: "An Indian engineering milestone featuring the world's slimmest commercially produced quartz movement at just 1.15mm and total case profile of 3.5mm.",
        icon: "⚡"
    },
    {
        name: "Titan Raga",
        launchYear: "1992",
        category: "Women's Jewelry Watches",
        description: "Exquisite women's timepieces celebrating Indian art, peacock motifs, kundan stone work, and contemporary feminine aesthetics.",
        icon: "🌸"
    },
    {
        name: "Fastrack",
        launchYear: "1998",
        category: "Youth Lifestyle Sub-Brand",
        description: "Spun off as an independent youth brand offering bold, unconventional, and affordable watches, smart wearables, and sunglasses.",
        icon: "🕶️"
    },
    {
        name: "Nebula",
        launchYear: "1995",
        category: "Solid 18K Gold Luxury",
        description: "Prestigious heirloom collection handcrafted in solid 18-karat gold with authentic gemstones and diamonds, blending horology with fine Indian jewelry.",
        icon: "👑"
    },
    {
        name: "Titan Octane & Grandmaster",
        launchYear: "2010s",
        category: "Chronograph & Automatic",
        description: "High-performance sporty chronographs and open-heart automatic mechanical watches inspired by aviation, motorsports, and chess.",
        icon: "🏎️"
    }
];

const TIMELINE_EVENTS = [
    { year: "1984 CE", title: "Joint Venture Incorporated", description: "Tata Group and TIDCO sign joint venture agreement, establishing Titan Watches Limited under Xerxes Desai." },
    { year: "1987 CE", title: "Commercial Production in Hosur", description: "State-of-the-art manufacturing plant inaugurated in Hosur, Tamil Nadu; transforms Indian watch market with quartz technology." },
    { year: "1992 CE", title: "Launch of Titan Raga", description: "Introduces dedicated feminine jewelry watch collection, redefining women's fashion accessories in India." },
    { year: "2002 CE", title: "Debut of Titan Edge", description: "Titan launches the Edge, winning international acclaim as the world's slimmest quartz movement (1.15mm)." },
    { year: "2013 CE", title: "Rebranded as Titan Company Ltd", description: "Reflecting successful diversification into jewelry (Tanishq), eyewear (Titan Eyeplus), and fragrances (Skinn)." },
    { year: "Present Day", title: "Global Smart Wearable Pioneer", description: "Innovates with Titan Smart, connected smartwatches, and premium mechanical collections exported to 30+ countries." }
];

const REFERENCES = [
    { text: "Titan Company Limited — Official Corporate Heritage Archive.", link: "https://www.titancompany.in" },
    { text: "Balaram, V. (2012). Titan: Inside India's Most Innovative Product Company. Penguin Books India.", link: "#" },
    { text: "Tata Central Archives — The Story of Tata's Titan Watches.", link: "https://www.tatacentralarchives.com" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TITAN_INFO, WATCH_COLLECTIONS, TIMELINE_EVENTS, REFERENCES };
}
