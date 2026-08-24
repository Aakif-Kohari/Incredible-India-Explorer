/**
 * Begum Rokeya Explorer — Data Module
 * Comprehensive historical, literary, and archival dataset documenting the life,
 * feminist literature, Sakhawat Memorial School, and social legacy of Begum Rokeya (1880–1932).
 */

const BEGUM_ROKEYA_DATA = {
    quickFacts: {
        fullName: "Begum Rokeya Sakhawat Hossain",
        lifespan: "9 December 1880 – 9 December 1932",
        birthplace: "Pairaband, Rangpur, Bengal Presidency, British India (now Bangladesh)",
        primaryFields: ["Women's Education", "Feminist Literature", "Social Reform", "Community Advocacy"],
        education: [
            "Home Tutored — Bengali, English, Urdu, Persian & Arabic literature"
        ],
        keyPositions: [
            "Founder, Sakhawat Memorial Girls' School, Bhagalpur/Calcutta (1909)",
            "Founder, Anjuman-e-Khawateen-e-Islam (Islamic Women's Association), Calcutta (1916)",
            "President, Bengal Women's Education Conference, Calcutta (1926)"
        ],
        keyHonors: [
            "Pioneer of Muslim Feminist Literature and Education in South Asia",
            "Author of 'Sultana's Dream' (1905), one of the earliest feminist science fiction works",
            "9 December is celebrated annually as 'Rokeya Day' in Bangladesh in her honor"
        ]
    },

    biographySections: [
        {
            id: "early-life-struggle",
            title: "Early Life & Secret Studies",
            subtitle: "Defying Strict Purdah Barriers",
            icon: "📖",
            content: `Begum Rokeya was born in 1880 in the village of Pairaband, Rangpur, into an aristocratic landowning Muslim family. In accordance with the strict social custom of purdah at the time, women in her family were barred from studying languages other than Arabic and Urdu.
            
            Deeply desiring knowledge, Rokeya studied Bengali and English late at night under the candlelight, secretly supported by her elder brother Ibrahim and sister Karimunnesa, who recognized her intellectual potential and defied social norms to tutor her.`
        },
        {
            id: "marriage-encouragement",
            title: "Marriage & Encouragement",
            subtitle: "A Partner in Progress",
            icon: "💍",
            content: `In 1898, at age eighteen, Rokeya married Khan Bahadur Sakhawat Hossain, a progressive deputy magistrate based in Bhagalpur. Sakhawat Hossain was highly supportive of women's education and encouraged Rokeya to read, write essays, and engage in social issues.
            
            He set aside a fund of 10,000 rupees to establish a school for Muslim girls, setting the stage for her lifelong educational mission and providing the financial foundation to start her first institution.`
        },
        {
            id: "sakhawat-memorial-school",
            title: "Sakhawat Memorial Girls' School",
            subtitle: "Building Educational Institutions",
            icon: "🏛️",
            content: `Following her husband's death in 1909, Begum Rokeya founded the Sakhawat Memorial Girls' School in Bhagalpur with just five students. Due to family disputes, she relocated the school to Calcutta in 1911, starting with eight students.
            
            She visited households personally to persuade conservative parents to send their daughters to school, designing a customized curtained carriage to allow girls to travel safely under purdah. The school grew rapidly and became a premier institution for women's education.`
        },
        {
            id: "feminist-literature-dream",
            title: "Feminist Literature & 'Sultana's Dream'",
            subtitle: "Utopian Vision of Gender Equality",
            icon: "✍️",
            content: `Begum Rokeya's writings were sharp critiques of patriarchal structures and religious orthodoxy. Her famous 1905 English story, *Sultana's Dream*, is one of the earliest works of feminist science fiction.
            
            It depicts 'Ladyland', a utopian realm where gender roles are reversed: men are confined to the zenana, while women run the state, harnessing solar energy and flying cars. Her other works, such as *Oborig-Khasini* and *Motichur*, systematically exposed the oppression of women.`
        },
        {
            id: "social-reform-legacy",
            title: "Social Activism & Enduring Legacy",
            subtitle: "Anjuman-e-Khawateen-e-Islam",
            icon: "⚖️",
            content: `In 1916, Rokeya founded the *Anjuman-e-Khawateen-e-Islam* (Islamic Women's Association) to provide financial aid, vocational training, and legal advocacy to impoverished women.
            
            She continued to advocate for female literacy, employment, and equal rights until her death on 9 December 1932. Her life stands as an immortal beacon of gender equality, intellectual bravery, and pioneering reform in South Asia.`
        }
    ],

    thesisResearch: [
        {
            id: "sultanas-dream",
            researchTitle: "Sultana's Dream & Ladyland (1905)",
            coreFinding: "Created a futuristic feminist utopia where scientific innovation (solar power, cloud condensing water) replaced military force, and women led society.",
            medicalRecommendation: "'In Ladyland, we do not fight with guns or swords. We use our brain-power. Our ladies have harnessed the heat of the sun and condensed the water of the clouds to defend our peaceful land. Since men are kept indoors, there is no crime or violence here.'",
            impact: "Stands as a pioneering masterpiece of feminist science fiction, decades ahead of Western works of a similar nature."
        },
        {
            id: "padmarag",
            researchTitle: "Padmarag & Tarini Bhavan (1924)",
            coreFinding: "Advocated for female-run shelters providing vocational training, literacy, and financial independence as alternatives to oppressive marriages.",
            medicalRecommendation: "'Let women study, earn, and build their own shelters. Tarini Bhavan is not just a house; it is a laboratory where divorced, widowed, and abandoned women prove that they can thrive without dependency.'",
            impact: "Introduced the concept of self-sufficient women's cooperatives in early 20th-century Bengali literature."
        },
        {
            id: "oborodh-basini",
            researchTitle: "Oborodh-Basini & Purdah Critique (1931)",
            coreFinding: "Documented the extreme, life-threatening consequences of rigid physical confinement (purdah) on women's physical and mental health.",
            medicalRecommendation: "'Orthodoxy has turned our homes into prisons. We have seen women burned to death during fires because they were forbidden from leaving without a veil, and infants lost because mothers could not speak to male doctors. This is not modesty; it is confinement.'",
            impact: "Sparked intense debate on social reforms, leading to the relaxation of physical barriers in Bengal's educational institutes."
        },
        {
            id: "motichur",
            researchTitle: "Motichur & Gender Equality Advocacy",
            coreFinding: "Argued that the subjugation of women was due to their exclusion from education and economic independence, not religious mandate.",
            medicalRecommendation: "'Why do we submit to this dependency? We are half of the society. If we are kept in darkness, how can the nation progress? A cart cannot run on a single wheel; both wheels must be of equal size and strength.'",
            impact: "Provided the intellectual framework for the first wave of Muslim women's rights and educational reform in Bengal."
        }
    ],

    medicalMilestonesCatalog: [
        {
            topic: "Sakhawat Memorial School (1909)",
            category: "institution",
            status: "Pioneering Girls' School",
            significance: "The first dedicated school for Muslim girls in Bengal, providing structured curricula in English, math, hygiene, and crafts."
        },
        {
            topic: "Sultana's Dream (1905)",
            category: "research",
            status: "Utopian Science Fiction",
            significance: "South Asia's first feminist science fiction story, illustrating alternative gender role dynamics and scientific advancements."
        },
        {
            topic: "Anjuman-e-Khawateen-e-Islam (1916)",
            category: "practice",
            status: "Social Welfare Association",
            significance: "Established a network of shelter homes, emergency child care, and adult education centers for Calcutta's marginalized women."
        },
        {
            topic: "Bengal Women's Education Conference (1926)",
            category: "advocacy",
            status: "Keynote Address & Leadership",
            significance: "Fierce public demand for state-funded women's education, secular school options, and female representation in education boards."
        }
    ],

    timelineEvents: [
        {
            year: "1880",
            title: "Birth in Pairaband",
            description: "Born on 9 December 1880 in Rangpur, Bengal Presidency (now Bangladesh)."
        },
        {
            year: "1898",
            title: "Marriage to Sakhawat Hossain",
            description: "Married deputy magistrate Khan Bahadur Sakhawat Hossain, who supported her writing and study."
        },
        {
            year: "1905",
            title: "Publication of Sultana's Dream",
            description: "Published her landmark English feminist story Sultana's Dream in The Indian Ladies' Magazine."
        },
        {
            year: "1909",
            title: "Founding of Sakhawat School",
            description: "Husband Sakhawat Hossain passed away; founded Sakhawat Memorial Girls' School in Bhagalpur."
        },
        {
            year: "1911",
            title: "Relocation to Calcutta",
            description: "Relocated the school to Calcutta to reach more students amidst conservative resistance."
        },
        {
            year: "1916",
            title: "Establishment of Anjuman-e-Khawateen",
            description: "Founded the Islamic Women's Association (Anjuman-e-Khawateen-e-Islam) to assist poor women."
        },
        {
            year: "1924",
            title: "Publication of Padmarag",
            description: "Published the novel Padmarag, advocating for women's independent shelters."
        },
        {
            year: "1932",
            title: "Passing on 9 December",
            description: "Passed away in Calcutta on her 52nd birthday, leaving an immortal legacy of education."
        }
    ],

    quizQuestions: [
        {
            id: 1,
            question: "Which pioneering school did Begum Rokeya establish in 1909 to promote education for Muslim girls?",
            options: [
                "Lady Brabourne School",
                "Sakhawat Memorial Girls' School",
                "Bethune School",
                "Aligarh Girls' College"
            ],
            correctIndex: 1,
            explanation: "She established the Sakhawat Memorial Girls' School in 1909 in memory of her late husband."
        },
        {
            id: 2,
            question: "What is the title of Begum Rokeya's famous 1905 feminist science fiction story set in 'Ladyland'?",
            options: [
                "Padmarag",
                "Oborodh-Basini",
                "Sultana's Dream",
                "Motichur"
            ],
            correctIndex: 2,
            explanation: "Her famous English utopian science fiction story is set in 'Ladyland', where gender roles are reversed."
        },
        {
            id: 3,
            question: "Which social organization did Begum Rokeya founder in 1916 to provide vocational training and aid to impoverished women?",
            options: [
                "Arya Mahila Samaj",
                "Anjuman-e-Khawateen-e-Islam",
                "Bengal Women's Union",
                "Seva Sadan"
            ],
            correctIndex: 1,
            explanation: "She founded the Anjuman-e-Khawateen-e-Islam (Islamic Women's Association) in Calcutta in 1916."
        },
        {
            id: 4,
            question: "In which language did Begum Rokeya write her groundbreaking story 'Sultana's Dream'?",
            options: [
                "Bengali",
                "Urdu",
                "English",
                "Arabic"
            ],
            correctIndex: 2,
            explanation: "She wrote 'Sultana's Dream' in English to surprise her husband and showcase her command of the language."
        },
        {
            id: 5,
            question: "Where was Begum Rokeya born in 1880?",
            options: [
                "Calcutta",
                "Pairaband (Rangpur, Bengal Presidency)",
                "Dacca",
                "Murshidabad"
            ],
            correctIndex: 1,
            explanation: "She was born in the village of Pairaband, Rangpur, located in modern-day Bangladesh."
        }
    ],

    sources: [
        {
            title: "Hossain, Rokeya Sakhawat (1905). 'Sultana's Dream'. Madras: The Indian Ladies' Magazine.",
            url: "https://www.indianladiesmagazine.org"
        },
        {
            title: "Begum Rokeya (1924). 'Padmarag' (Bengali). Calcutta.",
            url: "https://archive.org"
        },
        {
            title: "Sakhawat Memorial Girls' School Centenary Archives (1909–2009). Calcutta.",
            url: "https://www.sakhawatmemorial.org"
        },
        {
            title: "Sonia Nishat Amin (1996). 'The World of Muslim Women in Colonial Bengal, 1876–1939'. Brill Publishers.",
            url: "https://brill.com"
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BEGUM_ROKEYA_DATA };
}
