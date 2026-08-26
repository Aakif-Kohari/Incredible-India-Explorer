/**
 * Manyavar Ethnic Fashion Explorer — Data Module
 * Comprehensive dataset covering Manyavar (Vedant Fashions Ltd.),
 * founder Ravi Modi's story, ethnic fashion categories (Sherwanis, Kurta Sets, Mohey bridal),
 * iconic "Taiyaar Hokar Aaiye" campaigns, and brand evolution timeline.
 */

const MANYAVAR_INFO = {
    id: "manyavar-fashion",
    title: "Manyavar: India's Celebratory Ethnic Fashion",
    foundedYear: "1999 CE",
    founder: "Ravi Modi (Vedant Fashions Limited)",
    headquarters: "Kolkata, West Bengal, India",
    marketPosition: "India's #1 Branded Celebration & Wedding Wear",
    sisterBrands: "Mohey (Women's Bridal), Twamev (Luxury Couture), Manthan",
    quickStats: [
        { label: "Founded Year", value: "1999", icon: "🧵" },
        { label: "Founder", value: "Ravi Modi", icon: "👤" },
        { label: "Parent Company", value: "Vedant Fashions", icon: "🏢" },
        { label: "Retail Footprint", value: "600+ Exclusive Stores", icon: "🏬" },
        { label: "Women's Line", value: "Mohey Bridal", icon: "✨" },
        { label: "Headquarters", value: "Kolkata, WB", icon: "📍" }
    ]
};

const FASHION_CATEGORIES = [
    {
        name: "Royal Wedding Sherwanis",
        target: "Groom & Festive Formal",
        fabrics: "Silk, Brocade, Velvet with Zardozi & Resham Embroidery",
        description: "Regal silhouettes crafted with intricate hand embroidery, mandarin collars, and royal embellishments for Indian weddings.",
        icon: "👑"
    },
    {
        name: "Kurta Jacket Sets (Bandi)",
        target: "Festive & Sangeet Ceremonies",
        fabrics: "Art Silk, Chanderi, Jacquard & Linen",
        description: "Versatile twin sets featuring printed or woven Nehru jackets layered over fine pastel or vibrant kurtas with churidars.",
        icon: "🧥"
    },
    {
        name: "Indo-Western & Asymmetric Bandhgalas",
        target: "Modern Reception & Cocktail Wear",
        fabrics: "Structured Wool Blends, Matka Silk & Jacquard",
        description: "Contemporary fusion cuts incorporating cowl drapes, overlapping flaps, and western trouser pairings.",
        icon: "✨"
    },
    {
        name: "Mohey Bridal Lehengas & Sarees",
        target: "Bridal & Bridesmaid Couture",
        fabrics: "Raw Silk, Organza, Georgette & Banarasi Weaves",
        description: "Launched in 2016 to cater to modern Indian brides with statement lehengas, bridal gowns, and heirloom Banarasi sarees.",
        icon: "👗"
    },
    {
        name: "Ethnic Accessories",
        target: "Complete Wedding Ensembles",
        fabrics: "Safas (Turbans), Stoles, Mojaris & Brooches",
        description: "Finishing wedding touches ranging from royal kalgis and embroidered dupattas to handcrafted velvet juttis.",
        icon: "👡"
    }
];

const TIMELINE_EVENTS = [
    { year: "1999 CE", title: "Inception in Kolkata", description: "Ravi Modi establishes Manyavar with a humble capital of ₹10,000 to organize India's unbranded ethnic menswear market." },
    { year: "2008 CE", title: "First Exclusive Brand Outlet (EBO)", description: "Manyavar transitions from wholesale distribution to opening its first dedicated retail flagship store." },
    { year: "2014 CE", title: "'Taiyaar Hokar Aaiye' Campaign", description: "Launches the culturally transformative campaign making ethnic wear the default celebratory attire for Indian youth." },
    { year: "2016 CE", title: "Launch of Mohey for Women", description: "Expands into women's celebration and bridal couture with the launch of Mohey." },
    { year: "2022 CE", title: "Stock Market Listing (IPO)", description: "Parent company Vedant Fashions successfully lists on the Indian stock exchanges with a multibillion-dollar valuation." },
    { year: "Present Day", title: "Global Indian Celebration Icon", description: "Operates 600+ stores across India, the United States, UAE, Canada, and the United Kingdom." }
];

const REFERENCES = [
    { text: "Vedant Fashions Limited — Corporate History & Brand Portfolio.", link: "https://www.vedantfashions.com" },
    { text: "Manyavar Official — About Us & Brand Heritage.", link: "https://www.manyavar.com" },
    { text: "Modi, Ravi (2020). Building Manyavar: The Indian Celebration Story. Forbes India.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MANYAVAR_INFO, FASHION_CATEGORIES, TIMELINE_EVENTS, REFERENCES };
}
