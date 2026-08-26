/**
 * Britannia Brand Explorer — Data Module
 * Covers Britannia's historical origin in colonial Kolkata, major milestones,
 * product categories, packaging evolution, advertising history, and a
 * decade-based timeline of its development in India's food industry.
 */

const BRITANNIA_INFO = {
    id: "britannia",
    title: "Britannia: India's Food Brand Journey",
    foundedYear: "1892 CE",
    origin: "Kolkata (Calcutta), British India",
    headquarters: "Kolkata & Bengaluru, India",
    flagshipProduct: "Britannia Good Day & Marie Gold Biscuits",
    tagline: "Eat Healthy, Think Better",
    quickStats: [
        { label: "Founded", value: "1892", icon: "🏭" },
        { label: "Origin City", value: "Kolkata, India", icon: "📍" },
        { label: "Flagship Category", value: "Biscuits & Bakery", icon: "🍪" },
        { label: "Brand Tagline", value: "Eat Healthy, Think Better", icon: "💭" },
        { label: "Presence", value: "India & 60+ Countries", icon: "🌍" },
        { label: "Parent Group", value: "Wadia Group", icon: "🏢" }
    ]
};

const PRODUCT_CATEGORIES = [
    {
        name: "Biscuits",
        launchYear: "1892",
        category: "Founding Product Line",
        description: "Britannia's original and largest business line, spanning glucose biscuits, cream biscuits, digestive biscuits, and premium cookies — led by household names such as Good Day, Marie Gold, Bourbon, Milk Bikis, and Tiger.",
        icon: "🍪"
    },
    {
        name: "Bread & Bakery",
        launchYear: "1950s",
        category: "Staple Bakery Goods",
        description: "Expansion into packaged bread and bakery products, making Britannia one of India's most recognized bread brands and a staple in urban Indian households.",
        icon: "🍞"
    },
    {
        name: "Cakes & Rusk",
        launchYear: "1990s",
        category: "Packaged Bakery Snacks",
        description: "Introduction of packaged cakes and rusk products, extending the brand's bakery expertise into new snacking occasions across breakfast and tea-time consumption.",
        icon: "🧁"
    },
    {
        name: "Dairy Products",
        launchYear: "2000s",
        category: "Diversified FMCG",
        description: "Entry into dairy with cheese, milk, and dairy-based beverages, diversifying Britannia's portfolio beyond bakery into broader packaged food and dairy categories.",
        icon: "🧀"
    },
    {
        name: "Healthier & Premium Snacking",
        launchYear: "2010s–Present",
        category: "Health-Focused Innovation",
        description: "Launch of health-oriented and premium snacking lines including NutriChoice digestive biscuits and multigrain products, responding to rising consumer demand for better-for-you packaged food.",
        icon: "🌾"
    }
];

const PACKAGING_EVOLUTION = {
    intro: "Britannia's packaging evolved alongside changes in manufacturing scale, retail distribution, and consumer expectations — moving from simple paper wrapping at its early Kolkata biscuit works to modern moisture-resistant, resealable, and shelf-ready packaging designed for mass retail distribution across India.",
    milestones: [
        {
            title: "Early Paper-Wrapped Biscuit Tins",
            description: "In its earliest decades, Britannia biscuits were packed in simple paper wrapping and metal tins, typical of colonial-era bakery products sold through limited local retail outlets."
        },
        {
            title: "Mass-Market Wax Paper & Foil Packs",
            description: "As distribution expanded nationally through the mid-20th century, Britannia adopted wax paper and foil-lined packaging to improve shelf life and freshness for biscuits transported across India."
        },
        {
            title: "Modern Multi-Layer Plastic Packaging",
            description: "Contemporary Britannia products use multi-layer, moisture-resistant plastic packaging with resealable packs and clear nutritional labeling, designed for supermarket shelves and long-distance retail distribution."
        }
    ]
};

const ADVERTISING_HISTORY = {
    intro: "Britannia built one of India's most recognizable advertising legacies, using memorable jingles, mascots, and campaigns to embed its biscuit brands into everyday Indian life across generations.",
    milestones: [
        {
            title: "\"Britannia Khao, World Cup Jao\"",
            description: "A landmark 1990s cricket-tied campaign that linked Britannia biscuits with India's cricket World Cup fever, offering fans a chance to travel and watch matches, deeply embedding the brand in Indian pop culture."
        },
        {
            title: "Britannia Good Day's Warm, Family-Centric Campaigns",
            description: "Long-running television commercials for Good Day biscuits emphasized warmth, small joys, and family moments, helping the brand become one of India's best-selling biscuit lines."
        },
        {
            title: "\"Eat Healthy, Think Better\" Brand Repositioning",
            description: "In the 2010s, Britannia repositioned its overall brand identity around health and nutrition messaging, reflecting the shift toward NutriChoice and other better-for-you product lines."
        }
    ]
};

const TIMELINE_EVENTS = [
    { decade: "1890s", title: "Founding in Colonial Kolkata", description: "Britannia begins as a small biscuit company in Kolkata (Calcutta) in 1892, initially operating out of a modest house with a small investment, producing biscuits for the local British India market." },
    { decade: "1900s–1910s", title: "Early Growth & British Ownership Ties", description: "The company grows steadily, later coming under the ownership of Peek Freans, a British biscuit manufacturer, expanding production capacity in colonial India." },
    { decade: "1920s–1940s", title: "Wartime Supply & Expansion", description: "Britannia supplies biscuits to British forces during the World Wars, significantly scaling up production and establishing itself as a major biscuit manufacturer in India." },
    { decade: "1950s–1960s", title: "Post-Independence Growth & Bread Business", description: "Following India's independence, Britannia expands its manufacturing base and enters the packaged bread business, becoming a household staple brand in independent India." },
    { decade: "1970s–1980s", title: "Wadia Group Involvement & Public Listing", description: "The Wadia Group increases its stake in Britannia, and the company strengthens its position as one of India's leading listed food companies with a growing biscuit portfolio." },
    { decade: "1990s", title: "Iconic Marketing Era", description: "Britannia launches memorable campaigns including the cricket-themed \"Britannia Khao, World Cup Jao\", cementing its place in Indian popular culture alongside strong biscuit brand growth." },
    { decade: "2000s", title: "Portfolio Diversification into Dairy", description: "The company diversifies beyond bakery into dairy products such as cheese and milk-based beverages, broadening its presence in the Indian packaged foods market." },
    { decade: "2010s–Present", title: "Health Repositioning & Global Expansion", description: "Britannia repositions around health and nutrition with its \"Eat Healthy, Think Better\" tagline and NutriChoice range, while expanding exports and manufacturing presence to over 60 countries." }
];

const REFERENCES = [
    { text: "Britannia Industries Limited — Official Corporate Website & Company History.", link: "https://britannia.co.in" },
    { text: "Wadia Group — Corporate Heritage & Britannia Industries Overview.", link: "https://wadiagroup.com" },
    { text: "Economic Times — Coverage of Britannia's Business Growth and Advertising Campaigns.", link: "https://economictimes.indiatimes.com" },
    { text: "Business Standard — Reports on Britannia's Product Diversification and FMCG Strategy.", link: "https://www.business-standard.com" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BRITANNIA_INFO, PRODUCT_CATEGORIES, PACKAGING_EVOLUTION, ADVERTISING_HISTORY, TIMELINE_EVENTS, REFERENCES };
}