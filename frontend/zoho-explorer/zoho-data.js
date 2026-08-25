// zoho-data.js
// Data for the Zoho: India's Software Product Journey Explorer

const ZOHO_STATS = [
    { label: "Founded", value: "1996" },
    { label: "Products", value: "55+" },
    { label: "Employees", value: "~17,000" },
    { label: "Countries Served", value: "180+" },
];

const ZOHO_ORIGIN = {
    intro: "Zoho Corporation began not in a Silicon Valley garage but in a small apartment in Chennai, founded in 1996 as AdventNet by Sridhar Vembu, his brothers, and IIT Madras senior Tony Thomas. Built entirely on personal savings with zero outside investment, the company would go on to become one of India's most successful software-product companies — without ever taking a single dollar of venture capital.",
    facts: [
        { title: "Founded as AdventNet", detail: "Started in 1996 by Sridhar Vembu, Tony Thomas, and Vembu's brothers, initially building network management software (SNMP-based tools) for telecom equipment makers." },
        { title: "Early Clients", detail: "AdventNet's first products found buyers among major networking firms including Cisco Systems, and by 2000 the company had grown to roughly 120 engineers with about $10 million in revenue." },
        { title: "Rebranded as Zoho, 2009", detail: "As the company pivoted from networking tools toward cloud-based business applications for small and medium businesses, it rebranded from AdventNet to Zoho Corporation in 2009." },
    ],
};

const ZOHO_FOUNDER = {
    name: "Sridhar Vembu",
    role: "Co-founder & Chief Scientist (former CEO)",
    bio: "Ranked 27th in the IIT-JEE entrance exam, Vembu graduated from IIT Madras and earned a PhD from Princeton before working at Qualcomm in Silicon Valley. Rather than pursuing the conventional path of a well-funded US startup, he returned to India in 1996 to build a product company using local engineering talent — and stayed the course through the dot-com crash of 2000, when many early clients and even some co-founders left the venture. He served as Zoho's CEO for decades before transitioning to the role of Chief Scientist in January 2025.",
    philosophy: "Vembu has repeatedly rejected venture capital offers, citing a family principle: 'If you don't have the money for something, don't buy it. Never borrow money.' In 2011, he moved his own residence to a rural software campus in Mathalamparai, a village near Tenkasi, Tamil Nadu, to demonstrate that world-class technology could be built by rural Indian talent without requiring relocation to major cities.",
};

const ZOHO_PRODUCT_ECOSYSTEM = [
    {
        category: "Sales & CRM",
        icon: "📈",
        color: "#d4af37",
        products: [
            { name: "Zoho CRM", desc: "Zoho's flagship product (launched 2005) — manages leads, sales pipelines, and customer interactions." },
            { name: "Bigin", desc: "A simplified CRM built specifically for small businesses." },
            { name: "SalesIQ", desc: "Website visitor tracking and live chat for converting traffic into sales leads." },
        ],
    },
    {
        category: "Finance & Operations",
        icon: "💰",
        color: "#3ba676",
        products: [
            { name: "Zoho Books", desc: "Cloud accounting software for invoicing, expenses, and financial reporting, introduced in 2011." },
            { name: "Zoho Inventory", desc: "Stock and order management integrated with Books and CRM." },
            { name: "Zoho Expense", desc: "Expense reporting and receipt scanning for teams." },
        ],
    },
    {
        category: "Workplace & Productivity",
        icon: "📝",
        color: "#4a90d9",
        products: [
            { name: "Zoho Writer", desc: "Zoho's first office-suite product (launched 2005 alongside CRM), a collaborative word processor." },
            { name: "Zoho Sheet", desc: "Spreadsheet application with live data connectors to Zoho Analytics." },
            { name: "Zoho Mail", desc: "Privacy-focused, ad-free business email hosting." },
            { name: "Zoho Cliq", desc: "Internal team chat and video conferencing." },
        ],
    },
    {
        category: "Customer Support",
        icon: "🎧",
        color: "#c9628b",
        products: [
            { name: "Zoho Desk", desc: "Context-aware help-desk software introduced as an industry-first feature set." },
            { name: "Zoho Assist", desc: "Remote support tool for accessing and troubleshooting customer devices." },
        ],
    },
    {
        category: "Low-Code & Developer Tools",
        icon: "⚙️",
        color: "#9b6dd6",
        products: [
            { name: "Zoho Creator", desc: "Low-code application builder for custom internal tools, launched in 2006." },
            { name: "Zoho Analytics", desc: "Self-service business intelligence and data visualization." },
        ],
    },
    {
        category: "Unified Suite",
        icon: "🧩",
        color: "#e08a3c",
        products: [
            { name: "Zoho One", desc: "An all-in-one bundle of 55+ integrated applications under a single subscription, launched in July 2017 to replace fragmented SaaS stacks with one unified operating system for business." },
        ],
    },
];

const ZOHO_MILESTONES = [
    { year: 1996, title: "AdventNet founded", desc: "Sridhar Vembu, his brothers, and Tony Thomas found AdventNet, building network management software with zero outside funding." },
    { year: 2000, title: "Weathers the dot-com crash", desc: "AdventNet loses roughly half its clients overnight in the dot-com crash; Vembu rebuilds the company while refusing external capital." },
    { year: 2005, title: "Zoho CRM and Zoho Writer launch", desc: "The company's first cloud business applications launch, marking its pivot from networking tools toward broader SaaS products for small and medium businesses." },
    { year: 2006, title: "Zoho Projects, Creator, Sheet, and Show launch", desc: "Rapid product expansion continues, building out a broader office and business-tools ecosystem." },
    { year: 2009, title: "AdventNet rebrands as Zoho Corporation", desc: "The company formally adopts the Zoho name across its entire product line, reflecting its shift to cloud-based business software." },
    { year: 2011, title: "Zoho Books launches; rural Tenkasi campus established", desc: "Zoho launches its accounting software and opens a rural software development campus near Tenkasi, Tamil Nadu, where Vembu relocates himself." },
    { year: 2017, title: "Zoho One launches", desc: "Zoho unifies its entire product ecosystem into a single all-in-one subscription bundling 50+ integrated applications." },
    { year: 2025, title: "Vembu transitions to Chief Scientist", desc: "After nearly three decades as CEO, Sridhar Vembu moves to the role of Chief Scientist as Zoho's leadership structure evolves." },
];

const ZOHO_GLOBAL = {
    intro: "Despite remaining headquartered in Chennai and operating rural campuses across Tamil Nadu, Zoho has grown into a genuinely global company, serving businesses across 180+ countries with a customer base exceeding 50 million users.",
    facts: [
        { title: "Global Client Base", detail: "Early AdventNet clients included major global firms such as Cisco Systems, HP, Motorola, British Telecom, France Telecom, and NTT Japan, alongside Indian telecom operators." },
        { title: "US Market Presence", detail: "Zoho maintains a significant US operational presence, including offices in Pleasanton, California, historically accounting for a large share of company revenue." },
        { title: "Data Center Footprint", detail: "Zoho has established its own data centers, including facilities in the Netherlands and Ireland, reflecting its emphasis on data privacy and independent infrastructure control." },
    ],
};

const ZOHO_PHILOSOPHY = [
    { title: "100% Bootstrapped, Zero VC Funding", desc: "Zoho has never accepted external venture capital, funding all growth through customer revenue since its founding in 1996 — an almost unheard-of approach for a company of its scale in the global SaaS industry." },
    { title: "Privacy-First, Ad-Free Products", desc: "Zoho markets its products, including Zoho Mail, as privacy-respecting and free of advertising-driven data monetization, positioning itself against ad-supported competitors." },
    { title: "Rural Talent & Zoho Schools", desc: "Zoho actively invests in rural Tamil Nadu, including its Tenkasi campus and 'Zoho Schools' education initiative, training local students directly into engineering careers without requiring traditional university degrees." },
    { title: "Long-Term, Self-Reliant Growth", desc: "Vembu has framed Zoho's approach as deliberately rejecting short-term, VC-funded 'blitzscaling' in favor of profitable, self-sustained growth built to last for decades." },
];

const ZOHO_REFERENCES = [
    { text: "Wikipedia — Zoho Corporation (company overview, founding, and structure).", url: "https://en.wikipedia.org/wiki/Zoho_Corporation" },
    { text: "Forbes India — 'The Bootstrapped Buddhist: How Sridhar Vembu built Zoho.'", url: "https://www.forbesindia.com/article/boardroom/the-bootstrapped-buddhist-how-sridhar-vembu-built-zoho/43383/1" },
    { text: "Zoho Corporation — Official 'About Us' company timeline.", url: "https://www.zoho.com/aboutus.html" },
    { text: "Wikipedia — Sridhar Vembu (biography and leadership history).", url: "https://en.wikipedia.org/wiki/Sridhar_Vembu" },
];