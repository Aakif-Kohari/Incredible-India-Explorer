/**
 * Pandita Ramabai Explorer — Data Module
 * Comprehensive historical, literary, and archival dataset documenting the life,
 * Sharada Sadan, Mukti Mission, writings, and social legacy of Pandita Ramabai (1858–1922).
 */

const RAMABAI_DATA = {
    quickFacts: {
        fullName: "Pandita Ramabai Sarasvati",
        lifespan: "23 April 1858 – 5 April 1922",
        birthplace: "Gangamula, Chikkamagaluru District, Mysore Presidency, British India (now Karnataka)",
        primaryFields: ["Sanskrit Scholarship", "Women's Education", "Refuge & Welfare for Widows", "Social Reform"],
        education: [
            "Home Tutored — Sanskrit vocabulary, grammar, and classical texts by her father Anant Shastri Dongre",
            "Sanskrit Scholar examinations — Senate of Calcutta University (Awarded titles 'Pandita' and 'Sarasvati', 1878)"
        ],
        keyPositions: [
            "Founder, Arya Mahila Samaj, Pune (1882)",
            "Founder, Sharada Sadan (Home for Learning), Bombay/Pune (1889)",
            "Founder, Mukti Mission (Salvation Mission), Kedgaon (1898)"
        ],
        keyHonors: [
            "First woman in India to be awarded the titles of 'Pandita' and 'Sarasvati' for Sanskrit scholarship (1878)",
            "Pioneer of physical & vocational rehabilitation for widowed women in South Asia",
            "Kaiser-i-Hind Gold Medal for community service and famine relief (1919)"
        ]
    },

    biographySections: [
        {
            id: "early-life-scholarship",
            title: "Early Life & Sanskrit Scholarship",
            subtitle: "Breaking the Monopoly on Sanskrit",
            icon: "📖",
            content: `Pandita Ramabai was born in 1858 in the forest of Gangamula, Karnataka, into a progressive Chitpavan Brahmin family. Her father, Anant Shastri Dongre, defied orthodoxy by teaching his wife and daughters Sanskrit.
            
            Following the tragic loss of her parents during the famine of 1876–77, Ramabai traveled across India. In 1878, she arrived in Calcutta, where the Senate of Calcutta University examined her profound scholarship and awarded her the highest titles of 'Pandita' and 'Sarasvati', recognizing her as an intellectual giant.`
        },
        {
            id: "travels-intellectual-development",
            title: "Travels & Global Advocacy",
            subtitle: "Building International Alliances",
            icon: "⛵",
            content: `Determined to study educational models abroad, Ramabai traveled to Britain in 1883, where she converted to Christianity, and then to the United States in 1886.
            
            In America, she attended the medical graduation of her kinswoman Anandibai Joshi and published her landmark English critique *The High-Caste Hindu Woman* (1887). She established the 'Ramabai Association' in Boston, raising substantial funds to open secular schools for child-widows in India.`
        },
        {
            id: "sharada-sadan",
            title: "Sharada Sadan (Home for Learning)",
            subtitle: "India's First Secular School for Child Widows",
            icon: "🏛️",
            content: `Returning to India, Pandita Ramabai founded the *Sharada Sadan* in Bombay in March 1889, later relocating it to Pune. The institution was the first of its kind, offering a secular education, safe lodging, and vocational training to young child-widows who were otherwise treated as social outcasts.
            
            Despite facing immense opposition and accusations of proselytization from conservative reformers like Lokmanya Tilak, she maintained the secular charter of the school, protecting the religious freedom of all inmates.`
        },
        {
            id: "mukti-mission",
            title: "Kedgaon Mukti Mission",
            subtitle: "A Sanctuary for Thousands during Famine",
            icon: "🤝",
            content: `During the devastating Central India Famine of 1896–97, Ramabai rescued thousands of starving women and children, bringing them to Kedgaon near Pune. There, she established the *Mukti Mission*.
            
            The mission grew into a self-sufficient village containing schools, printing presses, weaving rooms, farms, and hospitals, employing over 2,000 residents and proving that marginalized women could achieve complete economic self-reliance.`
        },
        {
            id: "literary-social-legacy",
            title: "Literary Contributions & Legacy",
            subtitle: "The Pen as a Weapon of Reform",
            icon: "✍️",
            content: `Pandita Ramabai was a prolific writer, translator, and publisher. She wrote the first Marathi travelogue of America (*United States Chi Lokasthiti ani Pravasavritta*) and undertook the monumental task of translating the entire Bible directly from Hebrew and Greek into Marathi.
            
            Awarded the Kaiser-i-Hind medal in 1919, she passed away on 5 April 1922, leaving behind an immortal legacy of scholarship, feminist resistance, and tireless service to vulnerable women.`
        }
    ],

    thesisResearch: [
        {
            id: "high-caste-hindu-woman",
            researchTitle: "The High-Caste Hindu Woman (1887)",
            coreFinding: "South Asia's first major feminist tract in English, exposing the structural violence of child marriage, enforced widowhood, and the absolute denial of female education.",
            medicalRecommendation: "'We must educate our daughters. A daughter's life is treated as a burden, and she is married off before she knows her own mind. When she becomes a widow, she is treated as an outcast. We need secular homes that restore their dignity and teach them independence.'",
            impact: "Co-vitalized global support for Indian feminist reforms and funded the establishment of Sharada Sadan."
        },
        {
            id: "famine-rehabilitation",
            researchTitle: "Famine Rescue and Rehabilitation Protocols (1897)",
            coreFinding: "Documented the systemic exploitation of starving young women by traffickers and contractors during the Central India Famine, proposing organized state shelter rules.",
            medicalRecommendation: "'Starving women are treated as prey. I have walked through the famine districts and seen young girls traded for grain. We must rescue them immediately, provide clean housing, medical quarantine, and teach them agricultural crafts so they can protect themselves.'",
            impact: "Led to the establishment of the Kedgaon Mukti Mission, housing and training over 2,000 famine survivors."
        },
        {
            id: "bible-translation",
            researchTitle: "Marathi Bible Translation from Greek/Hebrew",
            coreFinding: "The first translation of the Bible into Marathi done directly from original Hebrew and Greek texts by a woman scholar, bypassing colonial English interpretations.",
            medicalRecommendation: "'To translate from English is to copy the colonial mind. I have studied Greek and Hebrew myself to bring the original texts of freedom directly into our regional Marathi tongue, giving our people direct access without foreign bias.'",
            impact: "Stands as a monumental linguistic achievement in Marathi translation literature and religious history."
        },
        {
            id: "secular-education-charter",
            researchTitle: "Secular Education Charter of Sharada Sadan",
            coreFinding: "Created a strict secular code ensuring that Hindu girls could practice their rituals, keep their diet, and read their scriptures without Christian intervention.",
            medicalRecommendation: "'Sharada Sadan is a home for learning, not conversion. Let the Hindu daughter worship her family deities and eat her traditional food. We will teach her science, literature, and geography, giving her tools to think for herself.'",
            impact: "Set a rare early example of inter-religious secular education in colonial Western India."
        }
    ],

    medicalMilestonesCatalog: [
        {
            topic: "Sharada Sadan, Pune (1889)",
            category: "institution",
            status: "First Secular School for Child Widows",
            significance: "Provided safe lodging, general literacy, and vocational printing/weaving training to child-widows."
        },
        {
            topic: "Arya Mahila Samaj (1882)",
            category: "practice",
            status: "Women's Association network",
            significance: "Formed local women's discussion and mutual-aid circles across Bombay Presidency to combat child marriage."
        },
        {
            topic: "Kaiser-i-Hind Gold Medal (1919)",
            category: "research",
            status: "Royal Civil Honor",
            significance: "Awarded by the government for her extraordinary community service, famine relief, and plague rescue operations."
        },
        {
            topic: "Ramabai Association of Boston (1887)",
            category: "advocacy",
            status: "International Funding Coalition",
            significance: "Formed a network of over 75 US circles that funded secular child-widow schools in India for ten years."
        }
    ],

    timelineEvents: [
        {
            year: "1858",
            title: "Birth in Gangamula",
            description: "Born on 23 April 1858 in the forest of Gangamula, Karnataka."
        },
        {
            year: "1878",
            title: "Calcutta Senate Titles",
            description: "Awarded the titles of 'Pandita' and 'Sarasvati' by the Senate of Calcutta University."
        },
        {
            year: "1882",
            title: "Arya Mahila Samaj",
            description: "Founded the Arya Mahila Samaj in Pune to advocate for women's education."
        },
        {
            year: "1883",
            title: "Travel to Britain & Conversion",
            description: "Traveled to Britain to study; converted to Christianity at Wantage."
        },
        {
            year: "1886",
            title: "Travel to USA & Book Publication",
            description: "Traveled to America; published 'The High-Caste Hindu Woman' (1887) in English."
        },
        {
            year: "1889",
            title: "Founding Sharada Sadan",
            description: "Returned to India; established Sharada Sadan in Bombay, later relocated to Pune."
        },
        {
            year: "1898",
            title: "Mukti Mission at Kedgaon",
            description: "Established the self-sufficient Mukti Mission in Kedgaon to rehabilitate famine survivors."
        },
        {
            year: "1922",
            title: "Passing on 5 April",
            description: "Passed away at Kedgaon after completing her Marathi translation of the Bible."
        }
    ],

    quizQuestions: [
        {
            id: 1,
            question: "Which university Senate awarded Ramabai the titles 'Pandita' and 'Sarasvati' in 1878 for her Sanskrit scholarship?",
            options: [
                "University of Bombay",
                "Senate of Calcutta University",
                "University of Madras",
                "Oxford University"
            ],
            correctIndex: 1,
            explanation: "The Senate of Calcutta University examined her Sanskrit scholarship and awarded her the titles of Pandita and Sarasvati."
        },
        {
            id: 2,
            question: "In which year did Pandita Ramabai establish the Sharada Sadan, India's first secular home and school for child-widows?",
            options: [
                "1882",
                "1889",
                "1898",
                "1919"
            ],
            correctIndex: 1,
            explanation: "She established Sharada Sadan (Home for Learning) in March 1889 in Bombay, later relocating it to Pune."
        },
        {
            id: 3,
            question: "What is the name of the self-sufficient community sanctuary established by Pandita Ramabai in Kedgaon in 1898?",
            options: [
                "Arya Mahila Samaj",
                "Sharada Sadan",
                "Mukti Mission",
                "Seva Sadan"
            ],
            correctIndex: 2,
            explanation: "She founded the Mukti Mission at Kedgaon in 1898, helping thousands of famine victims achieve self-reliance."
        },
        {
            id: 4,
            question: "Which landmark English book, exposing the structural oppression of women, did Pandita Ramabai publish in 1887?",
            options: [
                "Oborodh-Basini",
                "The High-Caste Hindu Woman",
                "Sultana's Dream",
                "Kavya Phule"
            ],
            correctIndex: 1,
            explanation: "Her pioneering feminist work in English is titled 'The High-Caste Hindu Woman' (1887)."
        },
        {
            id: 5,
            question: "Which gold medal was awarded to Pandita Ramabai in 1919 for her contributions to community service and famine relief?",
            options: [
                "Victoria Cross",
                "Kaiser-i-Hind Gold Medal",
                "Padma Vibhushan",
                "Sahitya Akademi Award"
            ],
            correctIndex: 1,
            explanation: "She was awarded the Kaiser-i-Hind Gold Medal in 1919 for her services to community medicine and famine relief."
        }
    ],

    sources: [
        {
            title: "Ramabai Sarasvati, Pandita (1887). 'The High-Caste Hindu Woman'. Philadelphia.",
            url: "https://archive.org"
        },
        {
            title: "Pandita Ramabai (1989). 'United States Chi Lokasthiti ani Pravasavritta' (Marathi). Pune.",
            url: "https://archive.org"
        },
        {
            title: "Mukti Mission Historical Archives, Kedgaon, Pune District.",
            url: "https://www.muktimission.org"
        },
        {
            title: "Meera Kosambi (2000). 'Pandita Ramabai Through Her Own Words: Selected Works'. Oxford University Press.",
            url: "https://www.oup.com"
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RAMABAI_DATA };
}
