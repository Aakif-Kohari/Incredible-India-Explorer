// Centralized Brand Data for the Virtual Museum of Indian Brands

const categories = [
    { id: "food-beverages", name: "Food & Beverages", icon: "🥛" },
    { id: "fashion", name: "Fashion", icon: "👗" },
    { id: "automobiles", name: "Automobiles", icon: "🚗" },
    { id: "technology", name: "Technology", icon: "💻" },
    { id: "retail", name: "Retail", icon: "🛒" },
    { id: "finance", name: "Finance", icon: "🏦" },
    { id: "aviation", name: "Aviation", icon: "✈️" },
    { id: "hospitality", name: "Hospitality", icon: "🏨" },
    { id: "entertainment", name: "Entertainment", icon: "🎬" },
    { id: "industry", name: "Industry", icon: "🏭" }
];

const brandsData = [
    {
        id: "tata-group",
        name: "Tata Group",
        category: "industry",
        origin: { city: "Mumbai", state: "Maharashtra" },
        founder: "Jamsetji Tata",
        foundingYear: 1868,
        industry: "Conglomerate",
        products: ["Steel", "Automobiles", "Software", "Consumer Goods", "Hospitality"],
        description: "Regarded as the 'Father of Indian Industry', Jamsetji Tata laid the foundation for India's industrialization. The Tata Group has grown into one of the largest and most respected conglomerates globally, fundamentally shaping modern India's economy with a deep commitment to philanthropy.",
        timeline: [
            { year: 1868, title: "Trading Company Founded", description: "Jamsetji started a trading company in Bombay." },
            { year: 1903, title: "Taj Mahal Palace", description: "Opened the iconic Taj Mahal Hotel in Mumbai." },
            { year: 1907, title: "Tata Steel", description: "Founded Tata Iron and Steel Company (TISCO)." },
            { year: 1968, title: "TCS Founded", description: "Established Tata Consultancy Services, pioneering Indian IT." }
        ],
        evolution: [
            { year: 1868, title: "Early Monograms", description: "Initial identity relied on the crest of the Tata family." },
            { year: 1999, title: "The 'T' Logo", description: "Introduced the modern blue 'T' logo created by Wolff Olins, representing fluidity, adaptability, and a tree of knowledge." }
        ],
        currentStatus: "A global enterprise headquartered in India, comprising 30 companies across 10 verticals.",
        sources: [
            { title: "Tata Group Official History", url: "https://www.tata.com/about-us/tata-group-history", type: "official" }
        ],
        imageCredits: [
            { description: "Tata 'T' Logo", source: "Official Tata Archives", license: "Trademark of Tata Sons" }
        ],
        featured: true
    },
    {
        id: "amul",
        name: "Amul",
        category: "food-beverages",
        origin: { city: "Anand", state: "Gujarat" },
        founder: "Dr. Verghese Kurien & Tribhuvandas Patel",
        foundingYear: 1946,
        industry: "Dairy",
        products: ["Milk", "Butter", "Cheese", "Ice Cream", "Chocolates"],
        description: "Formed as the Kaira District Co-operative to stop the exploitation of marginal milk producers. Under Dr. Verghese Kurien, Amul sparked the 'White Revolution' (Operation Flood), making India the world's largest milk producer.",
        timeline: [
            { year: 1946, title: "Cooperative Formed", description: "Kaira District Co-operative Milk Producers' Union was established." },
            { year: 1955, title: "Buffalo Milk Powder", description: "Pioneered technology to produce milk powder from buffalo milk." },
            { year: 1966, title: "Amul Girl Created", description: "The iconic Amul girl mascot was created by Sylvester daCunha." }
        ],
        evolution: [
            { year: 1946, title: "Early Branding", description: "Simple cooperative branding focused on farmer empowerment." },
            { year: 1966, title: "The Amul Girl", description: "Introduction of the hand-drawn Amul girl in a polka-dotted dress, known for topical, witty billboards." }
        ],
        currentStatus: "Managed by the Gujarat Co-operative Milk Marketing Federation, it is India's largest food brand.",
        sources: [
            { title: "Amul Origin Story", url: "https://amul.com/m/about-us", type: "official" }
        ],
        imageCredits: [
            { description: "Amul Girl Mascot", source: "GCMMF", license: "Trademark of GCMMF" }
        ],
        featured: true
    },
    {
        id: "air-india",
        name: "Air India",
        category: "aviation",
        origin: { city: "Mumbai", state: "Maharashtra" },
        founder: "J. R. D. Tata",
        foundingYear: 1932,
        industry: "Aviation",
        products: ["Passenger Airlines", "Cargo Transport"],
        description: "Originally founded as Tata Airlines by J. R. D. Tata, it became a public limited company in 1946 and was renamed Air India. It served as India's flag carrier, introducing the world to Indian hospitality.",
        timeline: [
            { year: 1932, title: "Tata Airlines", description: "Founded by J.R.D. Tata, flying mail between Karachi and Bombay." },
            { year: 1946, title: "Renamed Air India", description: "Became a public company and renamed Air India." },
            { year: 1953, title: "Nationalization", description: "The Government of India passed the Air Corporations Act, nationalizing the airline." },
            { year: 2022, title: "Return to Tata", description: "The Tata Group officially took over Air India from the government." }
        ],
        evolution: [
            { year: 1946, title: "The Maharaja", description: "Creation of the iconic Maharaja mascot and Centaur logo." },
            { year: 2007, title: "Konark Swan", description: "Logo updated to the Flying Swan with the Konark Chakra post-merger with Indian Airlines." },
            { year: 2023, title: "The Vista", description: "Rebranded with the 'Vista' gold window frame design, signifying limitless possibilities." }
        ],
        currentStatus: "Undergoing massive modernization and fleet expansion under Tata Group ownership.",
        sources: [
            { title: "Air India Heritage", url: "https://www.tata.com", type: "official" }
        ],
        imageCredits: [
            { description: "Maharaja Mascot / Vista Logo", source: "Air India", license: "Trademark of Air India" }
        ],
        featured: true
    },
    {
        id: "infosys",
        name: "Infosys",
        category: "technology",
        origin: { city: "Pune", state: "Maharashtra" },
        founder: "N. R. Narayana Murthy",
        foundingYear: 1981,
        industry: "Information Technology",
        products: ["IT Services", "Consulting", "Finacle Core Banking"],
        description: "Founded by seven engineers with $250 borrowed from Murthy's wife, Sudha Murty. Infosys pioneered the Global Delivery Model for IT services and became a catalyst for India's software boom.",
        timeline: [
            { year: 1981, title: "Founded in Pune", description: "Established as Infosys Consultants." },
            { year: 1983, title: "Move to Bengaluru", description: "Relocated headquarters to Bengaluru." },
            { year: 1999, title: "NASDAQ Listing", description: "First Indian-registered company listed on NASDAQ." }
        ],
        evolution: [
            { year: 1981, title: "Original Typography", description: "Simple textual logo representing early computing." },
            { year: 1996, title: "The Modern Blue", description: "Introduced the iconic blue typographic logo with connected letters representing integration." }
        ],
        currentStatus: "One of the world's leading IT consulting firms, employing hundreds of thousands globally.",
        sources: [
            { title: "Infosys History", url: "https://www.infosys.com", type: "official" }
        ],
        imageCredits: [
            { description: "Infosys Logo", source: "Infosys", license: "Trademark of Infosys" }
        ],
        featured: false
    },
    {
        id: "nirma",
        name: "Nirma",
        category: "retail",
        origin: { city: "Ahmedabad", state: "Gujarat" },
        founder: "Karsanbhai Patel",
        foundingYear: 1969,
        industry: "Consumer Goods",
        products: ["Detergents", "Soaps", "Cement"],
        description: "Karsanbhai Patel started making detergent in his backyard and selling it on his bicycle. Nirma disrupted the FMCG market by offering high-quality detergent at a fraction of the cost of multinational competitors.",
        timeline: [
            { year: 1969, title: "Backyard Start", description: "Began backyard production of detergent." },
            { year: 1985, title: "Market Leader", description: "Became the top-selling detergent brand in India." }
        ],
        evolution: [
            { year: 1969, title: "The Nirma Girl", description: "The iconic twirling Nirma girl in a white dress became the central identity, named after the founder's daughter, Nirupama." }
        ],
        currentStatus: "A diversified conglomerate spanning consumer goods, chemicals, and cement.",
        sources: [
            { title: "Nirma Story", url: "https://www.nirma.co.in", type: "official" }
        ],
        imageCredits: [
            { description: "Nirma Girl", source: "Nirma Limited", license: "Trademark of Nirma Limited" }
        ],
        featured: false
    },
    {
        id: "biocon",
        name: "Biocon",
        category: "industry",
        origin: { city: "Bengaluru", state: "Karnataka" },
        founder: "Kiran Mazumdar-Shaw",
        foundingYear: 1978,
        industry: "Biopharmaceuticals",
        products: ["Enzymes", "Insulin", "Biologics"],
        description: "Started in a garage to extract enzymes for brewing. Biocon evolved into India's premier biopharmaceutical enterprise, making life-saving drugs affordable globally.",
        timeline: [
            { year: 1978, title: "Garage Startup", description: "Founded to extract papain." },
            { year: 2004, title: "IPO", description: "Listed on the stock exchange to fund biopharma expansion." }
        ],
        evolution: [
            { year: 1978, title: "Early Logo", description: "Focus on enzyme extraction identity." },
            { year: 2000, title: "Modern Biopharma", description: "Modern, clinical blue and green identity representing biosciences and health." }
        ],
        currentStatus: "A global leader in biosimilars and complex active pharmaceutical ingredients.",
        sources: [
            { title: "Biocon Heritage", url: "https://www.biocon.com", type: "official" }
        ],
        imageCredits: [
            { description: "Biocon Logo", source: "Biocon", license: "Trademark of Biocon" }
        ],
        featured: false
    },
    {
        id: "sbi",
        name: "State Bank of India",
        category: "finance",
        origin: { city: "Kolkata", state: "West Bengal" },
        founder: "Government of India",
        foundingYear: 1955,
        industry: "Banking",
        products: ["Retail Banking", "Corporate Banking", "Wealth Management"],
        description: "Tracing its roots back to the Bank of Calcutta (1806), it became the Imperial Bank of India before being nationalized in 1955 as the State Bank of India. It is India's largest public sector bank.",
        timeline: [
            { year: 1806, title: "Bank of Calcutta", description: "Established during British rule." },
            { year: 1921, title: "Imperial Bank of India", description: "Merger of the presidency banks." },
            { year: 1955, title: "State Bank of India", description: "Nationalized by the Indian government." }
        ],
        evolution: [
            { year: 1955, title: "The Banyan Tree", description: "Initial logo featured a banyan tree, representing deep roots and stability." },
            { year: 1971, title: "The Keyhole Symbol", description: "Designed at NID, the blue circle with a notch represents a keyhole for security and a vast reach enclosing the common man." }
        ],
        currentStatus: "India's largest bank with a vast network of branches globally.",
        sources: [
            { title: "SBI History", url: "https://www.sbi.co.in", type: "official" }
        ],
        imageCredits: [
            { description: "SBI Keyhole Logo", source: "SBI", license: "Trademark of SBI" }
        ],
        featured: false
    }
];
