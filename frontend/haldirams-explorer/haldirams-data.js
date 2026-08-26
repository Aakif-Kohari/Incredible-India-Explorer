/**
 * Haldiram's Brand Explorer — Data Module
 * Covers Haldiram's origin as a regional Bikaneri sweet-and-namkeen shop,
 * the founding family's history, traditional product roots, major product
 * categories, the restaurant/QSR business, brand expansion, and milestones.
 */

const HALDIRAM_INFO = {
    id: "haldirams",
    title: "Haldiram's: India's Snack & Food Brand",
    foundedYear: "1937 CE",
    founder: "Ganga Bishan Agarwal (\"Haldiram\")",
    origin: "Bikaner, Rajasthan",
    headquarters: "Delhi & Nagpur (separate family-run entities)",
    flagshipProduct: "Bhujia (Bikaneri Namkeen)",
    quickStats: [
        { label: "Founded", value: "1937", icon: "🏺" },
        { label: "Origin City", value: "Bikaner, Rajasthan", icon: "📍" },
        { label: "Flagship Product", value: "Bikaneri Bhujia", icon: "🥨" },
        { label: "Business Lines", value: "Packaged Snacks & QSR", icon: "🏬" },
        { label: "Presence", value: "India & 100+ Countries", icon: "🌍" },
        { label: "Category", value: "Namkeen, Sweets, Ready-to-Eat", icon: "🍬" }
    ]
};

const PRODUCT_CATEGORIES = [
    {
        name: "Bhujia & Namkeen",
        launchYear: "1937",
        category: "Traditional Savory Snacks",
        description: "The brand's founding product line, rooted in the Bikaneri bhujia recipe made from moth-bean flour, seasoned with a distinctive spice blend that gave it a signature crunch and flavor unlike other regional namkeens.",
        icon: "🥨"
    },
    {
        name: "Indian Sweets (Mithai)",
        launchYear: "1940s",
        category: "Traditional Confectionery",
        description: "Classic Indian sweets such as soan papdi, gulab jamun, kaju katli, and rasgulla, sold fresh from Haldiram's retail counters alongside its namkeen range, extending the brand beyond savory snacks.",
        icon: "🍬"
    },
    {
        name: "Packaged & Branded Namkeen",
        launchYear: "1970s–1980s",
        category: "Retail Packaged Goods",
        description: "Transition from loose, counter-sold snacks to hygienically packaged, branded namkeen products distributed through retail stores, enabling the brand to travel far beyond Rajasthan and reach households nationwide.",
        icon: "📦"
    },
    {
        name: "Ready-to-Eat & Frozen Foods",
        launchYear: "1990s–2000s",
        category: "Convenience Food",
        description: "Expansion into ready-to-eat curries, frozen snacks, papad, and instant mixes, catering to changing urban lifestyles and the growing Indian diaspora seeking convenient, shelf-stable Indian food.",
        icon: "🍛"
    },
    {
        name: "Beverages & Health Snacks",
        launchYear: "2000s–2010s",
        category: "Diversified FMCG",
        description: "Entry into fruit juices, health-oriented snacks, and diet namkeen variants, responding to shifting consumer preferences toward lighter and more health-conscious packaged food options.",
        icon: "🥤"
    }
];

const RESTAURANT_BUSINESS = {
    intro: "Alongside its packaged goods business, Haldiram's built a large network of restaurants and quick-service dining outlets, evolving from simple sweet-and-namkeen retail counters in Bikaner into full-fledged multi-cuisine restaurant chains across Indian cities.",
    milestones: [
        {
            title: "Retail Counters to Sit-Down Restaurants",
            description: "What began as walk-in counters selling bhujia and mithai in Bikaner gradually added seating and food service, evolving into full restaurants offering North Indian, South Indian, Chinese, and fast-food menus."
        },
        {
            title: "Nagpur & Delhi Restaurant Chains",
            description: "The Nagpur-based and Delhi-based branches of the family business each built out their own large-format restaurants and food courts, becoming popular family dining destinations in their respective regions."
        },
        {
            title: "Quick-Service & Food Court Expansion",
            description: "Haldiram's restaurants expanded into shopping malls and highway plazas across India, positioning the brand as a trusted, hygienic vegetarian dining option for families and travelers alike."
        }
    ]
};

const TIMELINE_EVENTS = [
    { year: "1937 CE", title: "Founding in Bikaner", description: "Ganga Bishan Agarwal, popularly known as 'Haldiram', begins selling his distinctive bhujia recipe from a small shop in Bikaner, Rajasthan, building on a family sweet-making tradition." },
    { year: "1940s CE", title: "Expansion of the Product Line", description: "The shop broadens beyond bhujia to traditional Indian sweets, becoming a well-known name for both namkeen and mithai in the Bikaner region." },
    { year: "1970s CE", title: "Family Branches Establish New Cities", description: "Members of the founding family establish separate Haldiram's businesses in Nagpur and Delhi, each growing the brand independently in their respective regions of India." },
    { year: "1980s CE", title: "Move into Branded Packaged Snacks", description: "Haldiram's begins packaging its namkeen and snacks for retail distribution, allowing the brand to move beyond regional shops and reach a national market." },
    { year: "1990s CE", title: "Restaurant Chain Growth", description: "The Delhi and Nagpur branches expand their restaurant and quick-service dining operations, becoming major multi-cuisine vegetarian restaurant chains in urban India." },
    { year: "2000s CE", title: "International Export Growth", description: "Haldiram's packaged snacks and sweets begin reaching international markets, driven by demand from the Indian diaspora across the Middle East, North America, Europe, and beyond." },
    { year: "2010s–Present", title: "One of India's Largest Snack Brands", description: "Haldiram's becomes one of India's most recognized food brands, with a vast product portfolio spanning namkeen, sweets, ready-to-eat meals, and restaurants sold in India and exported to over 100 countries." }
];

const REFERENCES = [
    { text: "Haldiram's — Official Corporate Website & Company History.", link: "https://www.haldiram.com" },
    { text: "Ministry of Food Processing Industries, Government of India — Indian Snack Food Industry Reports.", link: "https://mofpi.gov.in" },
    { text: "Economic Times — Coverage of Haldiram's Business Growth and Family Branches.", link: "https://economictimes.indiatimes.com" },
    { text: "Business Standard — Reports on Haldiram's FMCG and Restaurant Business Segments.", link: "https://www.business-standard.com" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HALDIRAM_INFO, PRODUCT_CATEGORIES, RESTAURANT_BUSINESS, TIMELINE_EVENTS, REFERENCES };
}