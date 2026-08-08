const timelineEvents = [
    {
        year: 1857,
        title: "Revolt of 1857",
        image: "assets/1857.jpg",
        leaders: [
            "Mangal Pandey",
            "Rani Lakshmibai",
            "Bahadur Shah Zafar",
            "Nana Sahib"
        ],
        location: "Meerut, Delhi, Kanpur, Lucknow, Jhansi",
        description: "Also known as the First War of Independence or the Sepoy Mutiny, it was the first large-scale uprising against British East India Company rule.",
        significance: "It marked the end of the East India Company's rule in India and led to the direct governance of India by the British Crown (the British Raj)."
// data.js - Event data for the Freedom Struggle Timeline

window.FREEDOM_TIMELINE_DATA = [
    {
        year: 1857,
        title: "Revolt of 1857",
        imageEmoji: "⚔️",
        imageColor: "#e63946",
        leaders: ["Mangal Pandey", "Rani Lakshmibai", "Bahadur Shah Zafar"],
        location: "Meerut, Delhi, Kanpur, Lucknow, Jhansi",
        description: "The first major, widespread uprising against the rule of the British East India Company.",
        significance: "Often called the First War of Indian Independence, it marked the end of Company rule and the beginning of the British Raj."
    },
    {
        year: 1885,
        title: "Formation of Indian National Congress",
        image: "assets/swadeshi.jpg",
        leaders: [
            "A.O. Hume",
            "Dadabhai Naoroji",
            "Dinshaw Wacha"
        ],
        location: "Bombay",
        description: "The Indian National Congress (INC) was founded to create a platform for civic and political dialogue between educated Indians and the British Raj.",
        significance: "It became the principal leader of the Indian independence movement, transforming from a moderate body into a mass organization."
        imageEmoji: "📜",
        imageColor: "#1d3557",
        leaders: ["Allan Octavian Hume", "Dadabhai Naoroji", "Dinshaw Wacha"],
        location: "Bombay",
        description: "The first modern nationalist movement to emerge in the British Empire in Asia and Africa.",
        significance: "Became the principal leader of the Indian independence movement."
    },
    {
        year: 1905,
        title: "Swadeshi Movement",
        image: "assets/swadeshi.jpg",
        leaders: [
            "Bal Gangadhar Tilak",
            "Bipin Chandra Pal",
            "Lala Lajpat Rai",
            "Aurobindo Ghosh"
        ],
        location: "Bengal",
        description: "Initiated in response to the Partition of Bengal by Lord Curzon, this movement involved boycotting British products and the revival of domestic products and production processes.",
        significance: "It was one of the most successful pre-Gandhian movements, laying the foundation for self-reliance and nationalist sentiment."
        imageEmoji: "🔥",
        imageColor: "#d97706",
        leaders: ["Bal Gangadhar Tilak", "Bipin Chandra Pal", "Lala Lajpat Rai"],
        location: "Bengal",
        description: "An economic strategy aimed at removing the British Empire from power and improving economic conditions in India by following the principles of swadeshi (self-sufficiency).",
        significance: "Promoted the use of Indian goods and the boycott of British products, highly effective during the partition of Bengal."
    },
    {
        year: 1915,
        title: "Gandhi Returns to India",
        image: "assets/swadeshi.jpg",
        leaders: [
            "Mahatma Gandhi"
        ],
        location: "Bombay",
        description: "After spending 21 years in South Africa, Mahatma Gandhi returned to India. He travelled across the country to understand the people and their issues.",
        significance: "His return marked the beginning of a new phase in the freedom struggle, introducing Satyagraha (non-violent resistance) to the Indian masses."
        imageEmoji: "🚢",
        imageColor: "#457b9d",
        leaders: ["Mahatma Gandhi"],
        location: "Bombay",
        description: "Mohandas Karamchand Gandhi returned to India from South Africa, where he had successfully used satyagraha (non-violent resistance).",
        significance: "Transformed the independence movement into a mass movement involving peasants and workers."
    },
    {
        year: 1917,
        title: "Champaran Satyagraha",
        imageEmoji: "🌾",
        imageColor: "#2a9d8f",
        leaders: ["Mahatma Gandhi", "Rajendra Prasad"],
        location: "Champaran, Bihar",
        description: "The first Satyagraha movement inspired by Gandhi, fighting for the rights of farmers forced to grow indigo.",
        significance: "Established Gandhi's leadership and the power of non-violent civil disobedience in India."
    },
    {
        year: 1919,
        title: "Jallianwala Bagh Massacre",
        image: "assets/swadeshi.jpg",
        leaders: [
            "General Dyer (Perpetrator)",
            "Dr. Saifuddin Kitchlew",
            "Dr. Satyapal"
        ],
        location: "Amritsar, Punjab",
        description: "British troops under the command of General Dyer fired upon a peaceful gathering of unarmed Indians who had assembled to protest the arrest of nationalist leaders.",
        significance: "The massacre caused profound outrage across India and alienated many Indians from British rule, catalyzing the Non-Cooperation Movement."
        imageEmoji: "🕊️",
        imageColor: "#343a40",
        leaders: ["Dr. Saifuddin Kitchlew", "Dr. Satyapal"],
        location: "Amritsar, Punjab",
        description: "British troops fired on a large crowd of unarmed Indians who had gathered in the Jallianwala Bagh.",
        significance: "Deeply scarred the nation and turned millions of Indians from loyal supporters of the British Raj into nationalists."
    },
    {
        year: 1920,
        title: "Non-Cooperation Movement",
        image: "assets/swadeshi.jpg",
        leaders: [
            "Mahatma Gandhi",
            "Motilal Nehru",
            "C.R. Das"
        ],
        location: "Nationwide",
        description: "Led by Mahatma Gandhi, the movement called for the boycott of British goods, courts, educational institutions, and elections, urging Indians to adopt Swadeshi.",
        significance: "It marked the transition of the Indian National Congress from a middle-class assembly to a mass organization involving millions of peasants and workers."
        imageEmoji: "🛑",
        imageColor: "#e07a5f",
        leaders: ["Mahatma Gandhi", "Chittaranjan Das", "Motilal Nehru"],
        location: "Nationwide",
        description: "A major phase of the Indian independence movement, calling on Indians to revoke their cooperation from the British government.",
        significance: "Marked a transition to direct action and mass mobilization."
    },
    {
        year: 1930,
        title: "Dandi March",
        image: "assets/dandi-march.jpg",
        leaders: [
            "Mahatma Gandhi",
            "Sarojini Naidu"
        ],
        location: "Sabarmati to Dandi, Gujarat",
        description: "Also known as the Salt March, Gandhi led followers on a 240-mile march to the Arabian Sea to produce salt from seawater, in defiance of the British salt monopoly.",
        significance: "The Salt March challenged the British salt monopoly and became a major act of civil disobedience, sparking nationwide protests."
        imageEmoji: "🧂",
        imageColor: "#8ab17d",
        leaders: ["Mahatma Gandhi", "Sarojini Naidu"],
        location: "Sabarmati to Dandi, Gujarat",
        description: "An act of nonviolent civil disobedience in colonial India to produce salt from the seawater, defying the British salt tax.",
        significance: "Triggered the wider Civil Disobedience Movement, gaining worldwide attention."
    },
    {
        year: 1931,
        title: "Gandhi-Irwin Pact",
        image: "assets/dandi-march.jpg",
        leaders: [
            "Mahatma Gandhi",
            "Lord Irwin"
        ],
        location: "Delhi",
        description: "A political agreement signed by Gandhi and Lord Irwin, the Viceroy of India, which ended the civil disobedience movement in exchange for the release of political prisoners.",
        significance: "It represented a significant concession by the British government and marked the INC's agreement to participate in the Second Round Table Conference."
        imageEmoji: "🤝",
        imageColor: "#6c757d",
        leaders: ["Mahatma Gandhi", "Lord Irwin"],
        location: "Delhi",
        description: "A political agreement signed before the second Round Table Conference in London.",
        significance: "Led to the suspension of the civil disobedience movement and the release of political prisoners."
    },
    {
        year: 1942,
        title: "Quit India Movement",
        image: "assets/quit-india.jpg",
        leaders: [
            "Mahatma Gandhi",
            "Maulana Abul Kalam Azad",
            "Subhas Chandra Bose",
            "Aruna Asaf Ali"
        ],
        location: "Bombay (Gowalia Tank Maidan)",
        description: "During World War II, Gandhi launched the Quit India Movement demanding an end to British rule, accompanied by his famous call to 'Do or Die'.",
        significance: "Despite the immediate arrest of the INC leadership, it sparked massive spontaneous protests nationwide, making it clear that the British could no longer govern India."
    },
    {
        year: 1946,
        title: "Naval Mutiny",
        image: "assets/independence.jpg",
        leaders: [
            "Indian Sailors of the Royal Indian Navy",
            "M.S. Khan"
        ],
        location: "Bombay, Karachi, Calcutta",
        description: "A strike and subsequent mutiny by Indian sailors of the Royal Indian Navy on board ships and shore establishments, rebelling against poor conditions and British rule.",
        significance: "It demonstrated that the British could no longer rely on the Indian armed forces to maintain control, accelerating the decision to grant independence."
        imageEmoji: "📢",
        imageColor: "#d62828",
        leaders: ["Mahatma Gandhi", "Aruna Asaf Ali", "Jayaprakash Narayan"],
        location: "Bombay (launch)",
        description: "A movement demanding an end to British Rule in India, launched at the Bombay session of the All-India Congress Committee.",
        significance: "The most massive anti-British rebellion since 1857, leading to the imprisonment of the entire Congress leadership."
    },
    {
        year: 1946,
        title: "Royal Indian Navy Mutiny",
        imageEmoji: "⚓",
        imageColor: "#003049",
        leaders: ["M.S. Khan", "Madan Singh"],
        location: "Bombay, Karachi, Calcutta",
        description: "A total strike and subsequent mutiny by Indian sailors of the Royal Indian Navy on board ship and shore establishments.",
        significance: "Demonstrated that the British could no longer rely on the Indian armed forces to maintain their rule."
    },
    {
        year: 1947,
        title: "Independence and Partition",
        image: "assets/independence.jpg",
        leaders: [
            "Jawaharlal Nehru",
            "Sardar Vallabhbhai Patel",
            "Dr. B.R. Ambedkar",
            "Lord Mountbatten"
        ],
        location: "New Delhi",
        description: "India achieved independence from British rule, but the subcontinent was partitioned into two independent dominions: India and Pakistan.",
        significance: "It marked the culmination of nearly a century of struggle for self-rule, birth of a free democratic nation, but also resulted in mass migration and tragic communal violence."
    }
];

export { timelineEvents };
        imageEmoji: "🇮🇳",
        imageColor: "#f77f00",
        leaders: ["Jawaharlal Nehru", "Sardar Vallabhbai Patel", "Muhammad Ali Jinnah"],
        location: "New Delhi",
        description: "The Indian Independence Act partitioned British India into two independent dominions: India and Pakistan.",
        significance: "Marked the end of nearly 200 years of British rule and the birth of a free democratic nation, amidst the tragic consequences of partition."
    }
];
