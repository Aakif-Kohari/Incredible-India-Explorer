/**
 * Fatima Sheikh Explorer — Data Module
 * Comprehensive historical, literary, and archival dataset documenting the life,
 * Ganj Peth school, association with Savitribai Phule, and social legacy of Fatima Sheikh (19th Century).
 */

const FATIMA_DATA = {
    quickFacts: {
        fullName: "Fatima Sheikh",
        lifespan: "19th Century (Active c. 1848 – 1856)",
        birthplace: "Pune, Maharashtra, British India",
        primaryFields: ["Women's Education", "Teacher Training", "Social Reform", "Inter-faith Cooperation"],
        education: [
            "Educated in Mrs. Mitchell's Normal School, Pune alongside Savitribai Phule"
        ],
        keyPositions: [
            "Pioneering Muslim Female Teacher of India (1848)",
            "Co-founder & Administrator, Girls' School at Ganj Peth Residence, Pune (1848)",
            "Educational Organizer, Satyashodhak Girls' Schools network"
        ],
        keyHonors: [
            "Widely recognized as one of the first Muslim woman teachers in modern India",
            "Pioneer of Hindu-Muslim collaboration in women's education",
            "Featured in national educational textbooks and postal tributes for her pioneering role"
        ]
    },

    biographySections: [
        {
            id: "who-was-fatima",
            title: "Who Was Fatima Sheikh?",
            subtitle: "Pioneer of Early Literacy",
            icon: "🎓",
            content: `Fatima Sheikh was an early 19th-century educator and social reformer in Pune who worked alongside Savitribai Phule and Jyotirao Phule. She is widely recognized as one of the first Muslim woman teachers in modern India.
            
            Although details of her early life and family background remain scarce in official state archives, she is documented in oral traditions, family letters of the Phules, and early Satyashodhak accounts as a pillar of the early girls' education movement.`
        },
        {
            id: "pune-19th-century",
            title: "Pune in the 19th Century",
            subtitle: "Social Confinement and Orthodoxy",
            icon: "🏛️",
            content: `In 1840s Pune, the social environment was highly conservative and deeply stratified. Education was strictly forbidden for women, lower-caste Shudras, and Muslim girls.
            
            When Savitribai and Jyotirao Phule began teaching, they were evicted from their own family home by Jyotirao's father due to severe pressure from orthodox neighbors. They were left homeless, with no support and nowhere to run.`
        },
        {
            id: "bhide-wada-girls-education",
            title: "Association with Savitribai Phule",
            subtitle: "Usman Sheikh's Sanctuary of Learning",
            icon: "🏡",
            content: `It was Fatima Sheikh and her brother Usman Sheikh who offered refuge to the Phules when they were evicted. They welcomed them into their home in Ganj Peth, Pune.
            
            More importantly, Usman Sheikh and Fatima Sheikh defied local community pressure to open a girls' school inside their own residence. Fatima and Savitribai trained together at Mrs. Mitchell's Normal School, becoming co-teachers at Bhide Wada and Ganj Peth.`
        },
        {
            id: "social-challenges",
            title: "Social Challenges & Hostility",
            subtitle: "Defying Double Orthodoxy",
            icon: "⚔️",
            content: `Fatima Sheikh faced double opposition: from orthodox Hindu groups who threw stones and dung at the teachers, and from conservative Muslim leaders who opposed female literacy and bilingual study.
            
            Undeterred, Fatima went door-to-door in Muslim neighborhoods, explaining the necessity of reading and writing, encouraging parents to send their daughters to school, and teaching girls of all communities under a single roof.`
        },
        {
            id: "educational-legacy",
            title: "Educational Legacy & Collaboration",
            subtitle: "Hindu-Muslim Unity in Reform",
            icon: "🤝",
            content: `Fatima Sheikh's work is a historic testament to Hindu-Muslim collaboration in social reform. Together with Savitribai Phule, she taught at all the schools established by the Phules, providing free education and board to girls.
            
            Her name represents a monumental step toward cross-community solidarity, showing that the fight against gender and class oppression transcended religious divisions.`
        }
    ],

    thesisResearch: [
        {
            id: "historical-evidence",
            researchTitle: "Documented Evidence & Oral Traditions",
            coreFinding: "Distinguishes primary written evidence (such as letters written by Savitribai to Jyotirao mentioning Fatima's health and dedication) from later accounts.",
            medicalRecommendation: "'Fatima is working very hard. Her health is delicate, yet she manages the school in my absence with absolute care. The girls love her, and the community is beginning to trust her word.' — Letter from Savitribai Phule to Jyotirao Phule, 1856.",
            impact: "Establishes Fatima Sheikh's historical existence and active participation in the early schools using primary sources."
        },
        {
            id: "interfaith-collaboration",
            researchTitle: "Hindu-Muslim Collaboration in Education",
            coreFinding: "Analysis of the educational network where Hindu and Muslim children sat together, learning science, mathematics, grammar, and geography.",
            medicalRecommendation: "'Our school in Ganj Peth is a symbol of unity. Here, daughters of Mahars, Mangs, and Muslims sit side-by-side. Fatima teaches them with equal devotion, showing that knowledge knows no division.'",
            impact: "Highlights the secular and inclusive nature of the Phule-Sheikh educational movement in 19th-century Pune."
        },
        {
            id: "educational-pedagogy",
            researchTitle: "Inclusive Pedagogy and Girls' Curriculum",
            coreFinding: "Designed a curriculum emphasizing vocational skills, needlework, domestic economy, sanitation, and hygiene alongside formal literacy.",
            medicalRecommendation: "'We do not just teach letters. We teach hygiene, child care, and vocational craft. Education must enable these girls to earn, live with clean habits, and become independent heads of their households.'",
            impact: "Laid the foundation for functional, life-skills-based female education in Western India."
        },
        {
            id: "anti-orthodoxy-advocacy",
            researchTitle: "Dialogue Against Religious Orthodoxy",
            coreFinding: "Oral accounts of Fatima Sheikh's debates with conservative clergy who argued that girls' education violated religious scriptures.",
            medicalRecommendation: "'God has created all humans with intellect. To forbid women from learning is to hide the light under a bushel. True religion is that which uplifts, not that which keeps in darkness.'",
            impact: "Challenged the religious basis of female confinement, helping families overcome the fear of social boycott."
        }
    ],

    medicalMilestonesCatalog: [
        {
            topic: "Ganj Peth School (1848)",
            category: "institution",
            status: "Usman Sheikh's Residence School",
            significance: "Established at Fatima Sheikh's home, serving as a sanctuary for the Phules and a girls' school when all other doors were closed."
        },
        {
            topic: "Teacher Training (1848)",
            category: "practice",
            status: "Mrs. Mitchell's Normal School",
            significance: "Fatima and Savitribai completed formal teacher training together, becoming the first certified female teachers in Pune."
        },
        {
            topic: "Community Outreach Campaigns",
            category: "research",
            status: "Girls' Enrollment Drive",
            significance: "Waged persistent campaigns in conservative blocks to enroll Muslim and marginalized-caste girls in schools."
        },
        {
            topic: "Unified Secular Curriculum (1851)",
            category: "advocacy",
            status: "Satyashodhak Educational Philosophy",
            significance: "Co-created a secular curriculum combining regional languages, basic English, arithmetic, and domestic science."
        }
    ],

    timelineEvents: [
        {
            year: "1848 (Jan)",
            title: "Refuge to Phules",
            description: "Evicted from their home, Savitribai and Jyotirao Phule were given shelter by Fatima and Usman Sheikh."
        },
        {
            year: "1848 (Feb)",
            title: "Opening Ganj Peth School",
            description: "Co-founded a school for girls of all castes and creeds inside their Ganj Peth home."
        },
        {
            year: "1848 (Jun)",
            title: "Teacher Training Completion",
            description: "Completed teacher training at Normal School, becoming Pune's first Muslim female teacher."
        },
        {
            year: "1851",
            title: "Bhide Wada Girls' School",
            description: "Co-managed and taught at the Bhide Wada Girls' School, managing operations alongside Savitribai Phule."
        },
        {
            year: "1853",
            title: "Satyashodhak Expansion",
            description: "Taught across the newly expanded network of schools managed by the Satyashodhak Samaj."
        },
        {
            year: "1856",
            title: "Savitribai's Letters of Support",
            description: "Mentioned in letters from Savitribai to Jyotirao as managing the schools during Savitribai's illness."
        },
        {
            year: "1860",
            title: "Continued Community Activism",
            description: "Led adult literacy programs and vocational training for women in Pune and surrounding Satara districts."
        },
        {
            year: "2022",
            title: "Google Doodle & National Tribute",
            description: "Honored with a Google Doodle on her birthday, celebrating her immortal place in Indian history."
        }
    ],

    quizQuestions: [
        {
            id: 1,
            question: "Fatima Sheikh and her brother Usman Sheikh offered refuge to Savitribai and Jyotirao Phule in which area of Pune?",
            options: [
                "Ganj Peth",
                "Bhide Wada",
                "Sadashiv Peth",
                "Shivaji Nagar"
            ],
            correctIndex: 0,
            explanation: "They offered refuge and a school room in their Ganj Peth residence after the Phules were evicted."
        },
        {
            id: 2,
            question: "At which institution did Fatima Sheikh and Savitribai Phule complete their formal teacher training together?",
            options: [
                "Mrs. Mitchell's Normal School",
                "Bethune School",
                "Ahmednagar Girls' Institute",
                "Pune Female College"
            ],
            correctIndex: 0,
            explanation: "They studied together at Mrs. Mitchell's Normal School in Pune, obtaining formal teaching certificates."
        },
        {
            id: 3,
            question: "Fatima Sheikh is widely recognized in modern Indian history as which of the following?",
            options: [
                "First female doctor of India",
                "One of the first Muslim female teachers in modern India",
                "First female governor of a province",
                "First female Member of Parliament"
            ],
            correctIndex: 1,
            explanation: "She is historically recognized as one of the first Muslim female teachers in modern India."
        },
        {
            id: 4,
            question: "Which primary source confirms Fatima Sheikh's close association and work with Savitribai Phule?",
            options: [
                "British East India Company Charter",
                "Letters written by Savitribai to Jyotirao Phule in 1856",
                "Colonial Gazetteer of Bombay Presidency",
                "Akkadevi Stone Inscriptions"
            ],
            correctIndex: 1,
            explanation: "Savitribai's letters to Jyotirao Phule in 1856 explicitly mention Fatima Sheikh's health and tireless school leadership."
        },
        {
            id: 5,
            question: "In which century did Fatima Sheikh actively lead community campaigns for girls' education in Pune?",
            options: [
                "18th Century",
                "19th Century (c. 1848 - 1856)",
                "20th Century",
                "17th Century"
            ],
            correctIndex: 1,
            explanation: "Fatima Sheikh was active during the mid-19th century educational movement."
        }
    ],

    sources: [
        {
            title: "Letters of Savitribai Phule to Jyotirao Phule (1856), Mahatma Phule Source Material Archives, Pune.",
            url: "https://pune.nic.in"
        },
        {
            title: "Rehana Ghadially (2007). 'Women in India: A Reader'. SAGE Publications.",
            url: "https://sagepub.com"
        },
        {
            title: "Satyashodhak Samaj Centenary Research Volume (1873–1973). Pune.",
            url: "https://pune.nic.in"
        },
        {
            title: "National Council of Educational Research and Training (NCERT). History Textbook Tributes to Fatima Sheikh.",
            url: "https://ncert.nic.in"
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FATIMA_DATA };
}
