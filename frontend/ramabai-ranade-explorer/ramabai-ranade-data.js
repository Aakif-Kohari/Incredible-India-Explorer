/**
 * Ramabai Ranade Explorer — Data Module
 * Comprehensive historical, social reform, and archival dataset documenting the life,
 * vocational education initiatives, and legal advocacy of Ramabai Ranade (1862–1924).
 */

const RAMABAI_DATA = {
    quickFacts: {
        fullName: "Ramabai Ranade",
        lifespan: "25 January 1862 – 25 January 1924",
        birthplace: "Devarashtre Village, Sangli, Maharashtra",
        primaryFields: ["Women's Education", "Vocational Training", "Social Empowerment", "Prison Reform", "Women's Suffrage"],
        education: [
            "Home Tutoring by Justice M. G. Ranade — Marathi, Sanskrit, English, History & Mathematics (1873–1885)",
            "Self-Study in Public Administration & Social Sciences"
        ],
        keyPositions: [
            "Co-Founder & Leader, Arya Mahila Samaj, Pune (Founded 1882)",
            "Co-Founder & President, Seva Sadan Society, Bombay & Pune (1908–1924)",
            "Inspector of Female Wards, Yerwada Central Jail, Pune",
            "President, Bombay Provincial Women's Conference",
            "Petitioner for Women's Franchise before Southborough Committee (1919)"
        ],
        keyHonors: [
            "Pioneer of Female Vocational & Nursing Education in Western India",
            "Commemorative Postage Stamp issued by India Post (1989)",
            "Founder of Seva Sadan, which has educated and trained over 100,000 women"
        ]
    },

    biographySections: [
        {
            id: "early-life-education",
            title: "Early Marriage & Defiant Education",
            subtitle: "Transforming Domestic Restrictions into Intellectual Power",
            icon: "📖",
            content: `Ramabai Kurlekar was born in 1862 in Devarashtre, Sangli district. At age eleven, she was married to Justice Mahadev Govind Ranade, a distinguished scholar, judge, and co-founder of the Prarthana Samaj.
            
            Coming from an illiterate background, Ramabai faced intense opposition from orthodox family elders who strictly forbade women from reading or writing. Justice Ranade tutored her secretly at home in Marathi, English, history, and arithmetic. Ramabai persevered through social ostracization, becoming an accomplished scholar, fluent English speaker, and articulate public orator.`
        },
        {
            id: "arya-mahila-samaj",
            title: "Arya Mahila Samaj (1882)",
            subtitle: "Mobilizing Women for Literacy & Legal Awareness",
            icon: "👭",
            content: `In 1882, alongside Pandita Ramabai and other progressive women reformers, Ramabai Ranade co-founded the **Arya Mahila Samaj** (Arya Women's Society) in Pune.
            
            The society aimed to liberate women from child marriage, enforced widowhood rituals, and illiteracy. Ramabai organized weekly lectures, literacy classes, and public speaking forums, creating one of Western India's earliest autonomous platforms where women could articulate their social and legal rights.`
        },
        {
            id: "seva-sadan-movement",
            title: "The Seva Sadan Movement (1908–1909)",
            subtitle: "Pioneering Female Vocational Education & Nursing",
            icon: "🏥",
            content: `In 1908, Ramabai Ranade, along with G. K. Devadhar and Behramji Malabari, established the **Seva Sadan** (Home of Service) in Bombay, expanding to Pune in 1909. Seva Sadan was designed specifically for destitute women, widows, and unmarried girls.
            
            Breaking deep-seated social taboos against women working outside the home, Seva Sadan introduced formal training in nursing, midwifery, primary school teaching, tailoring, and adult night literacy. Under Ramabai's leadership as President, Seva Sadan grew into a monumental institution training thousands of female nurses, teachers, and healthcare workers across Maharashtra.`
        },
        {
            id: "suffrage-prison-reform",
            title: "Women's Suffrage & Prison Reform",
            subtitle: "Fighting for Voting Rights & Prisoner Rehabilitation",
            icon: "⚖️",
            content: `Ramabai Ranade extended her advocacy to civil rights and legal reform. In 1919, she led a delegation of Indian women before the Southborough Franchise Committee, presenting a firm petition demanding equal voting rights (suffrage) for women under constitutional reforms.
            
            Appointed as an official inspector of female wards in Yerwada Central Jail in Pune, Ramabai visited imprisoned women regularly. She fought for hygienic living conditions, literacy classes in prison, and vocational training to ensure female convicts could earn an honorable livelihood upon release.`
        },
        {
            id: "literary-memoirs",
            title: "Literary Legacy: 'Amchya Ayushyatil Kahi Athavani'",
            subtitle: "A Masterpiece of 19th-Century Marathi Literature",
            icon: "✍️",
            content: `In 1910, Ramabai published her landmark Marathi autobiography *"Amchya Ayushyatil Kahi Athavani"* ("Some Memories of Our Life"). The memoir provides an intimate and vivid historical account of 19th-century Marathi social reform, her partnership with Justice M. G. Ranade, and the inner struggles of women striving for education.
            
            Considered a classic of Marathi literature, her book inspired generations of female writers and social activists. Ramabai passed away on her 62nd birthday, 25 January 1924, leaving behind a lasting institutional legacy that continues to empower women today.`
        }
    ],

    vocationalTraining: [
        {
            id: "nursing-midwifery-program",
            programTitle: "Professional Nursing & Midwifery Certification",
            targetAudience: "Widows, abandoned wives, and young women seeking financial independence.",
            skillSet: "Clinical nursing, sterile wound dressing, obstetrics assistance, and hospital sanitation.",
            socialImpact: "Overcame upper-caste taboos against hospital work, creating India's first generation of certified female nurses."
        },
        {
            id: "teacher-training-college",
            programTitle: "Primary Female Teacher Training College",
            targetAudience: "Young women preparing to teach in girls' primary schools across rural and urban Maharashtra.",
            skillSet: "Pedagogy, arithmetic instruction, Marathi literature, and school administration.",
            socialImpact: "Supplied trained female teachers to hundreds of newly opened municipal and rural girls' schools."
        },
        {
            id: "industrial-needlework-handicrafts",
            programTitle: "Industrial Sewing, Embroidery & Handicrafts",
            targetAudience: "Destitute women needing home-based or cottage industry income.",
            skillSet: "Machine stitching, traditional embroidery, lacework, and garment tailoring.",
            socialImpact: "Provided direct economic self-reliance to thousands of women who previously lacked income options."
        },
        {
            id: "adult-night-literacy",
            programTitle: "Adult Female Night Literacy & General Knowledge",
            targetAudience: "Working women, domestic workers, and adult homemakers.",
            skillSet: "Basic reading, writing, household accounting, health hygiene, and civic awareness.",
            socialImpact: "Elevated female literacy rates and empowered adult women to manage their own finances."
        }
    ],

    socialReformCatalog: [
        {
            topic: "Women's Franchise & Suffrage Petition (1919)",
            category: "rights",
            status: "Constitutional Advocacy",
            significance: "Submitted formal petition to the Southborough Committee demanding equal voting rights for Indian women."
        },
        {
            topic: "Seva Sadan Nursing & Medical Training (1909)",
            category: "education",
            status: "Pioneering Vocational Institution",
            significance: "First organized institute in Western India training women as certified nurses and healthcare workers."
        },
        {
            topic: "Yerwada Female Prison Reform Charter",
            category: "reform",
            status: "Official Inspection & Rehabilitation",
            significance: "Introduced literacy programs, sanitation standards, and vocational training inside female prison wards."
        },
        {
            topic: "Arya Mahila Samaj Rights Platform (1882)",
            category: "empowerment",
            status: "Autonomous Women's Organization",
            significance: "Organized public forums for women to combat child marriage, widow mistreatment, and illiteracy."
        },
        {
            topic: "Compulsory Primary Girls' Education Advocacy",
            category: "policy",
            status: "Provincial Policy Campaigning",
            significance: "Campaigned for free and compulsory primary education for girls across Bombay Presidency."
        }
    ],

    timelineEvents: [
        {
            year: "1862",
            title: "Birth in Devarashtre",
            description: "Born on 25 January 1862 in Devarashtre village, Sangli district, Maharashtra."
        },
        {
            year: "1873",
            title: "Marriage to Justice M. G. Ranade",
            description: "Married reformer Justice Mahadev Govind Ranade at age eleven; began home education."
        },
        {
            year: "1882",
            title: "Co-Founding of Arya Mahila Samaj",
            description: "Co-founded Arya Mahila Samaj in Pune alongside Pandita Ramabai to promote female literacy and rights."
        },
        {
            year: "1901",
            title: "Passing of Justice Ranade & Public Commitment",
            description: "Following Justice Ranade's passing, dedicated her life entirely to public welfare and women's institutions."
        },
        {
            year: "1908",
            title: "Founding of Seva Sadan, Bombay",
            description: "Co-founded Seva Sadan in Bombay with G. K. Devadhar and Behramji Malabari."
        },
        {
            year: "1909",
            title: "Establishment of Pune Seva Sadan",
            description: "Established the Pune Seva Sadan, expanding vocational nursing and teacher training for women."
        },
        {
            year: "1910",
            title: "Publication of Autobiography",
            description: "Published her renowned Marathi memoir 'Amchya Ayushyatil Kahi Athavani'."
        },
        {
            year: "1919",
            title: "Women's Suffrage Deputation",
            description: "Led women's delegation before the Southborough Committee demanding female voting rights in India."
        },
        {
            year: "1920",
            title: "President of Bombay Women's Conference",
            description: "Presided over the Bombay Provincial Women's Conference advocating compulsory education and legal rights."
        },
        {
            year: "1924",
            title: "Passing in Pune",
            description: "Passed away on her 62nd birthday, 25 January 1924 in Pune, leaving an immortal institutional legacy."
        }
    ],

    quizQuestions: [
        {
            id: 1,
            question: "Which pioneering institution for women's vocational training and nursing education did Ramabai Ranade establish in 1908–1909?",
            options: [
                "Shreemati Nathibai Damodar Thackersey (SNDT) College",
                "Seva Sadan Society",
                "Hingne Stree Shikshan Samstha",
                "Brahmo Kanya Vidyalaya"
            ],
            correctIndex: 1,
            explanation: "Ramabai Ranade co-founded the Seva Sadan in Bombay (1908) and Pune (1909) to provide female vocational and nursing education."
        },
        {
            id: 2,
            question: "Which famous autonomous women's organization did Ramabai Ranade co-found in Pune in 1882 alongside Pandita Ramabai?",
            options: [
                "All India Women's Conference",
                "Arya Mahila Samaj",
                "Mahila Rashtriya Sangha",
                "National Council of Women in India"
            ],
            correctIndex: 1,
            explanation: "She co-founded the Arya Mahila Samaj in 1882 to promote literacy, public speaking, and legal awareness among women."
        },
        {
            id: 3,
            question: "What is the title of Ramabai Ranade's acclaimed 1910 Marathi autobiography?",
            options: [
                "Smritichitre",
                "Amchya Ayushyatil Kahi Athavani",
                "Majhi Janmathep",
                "Atmavrutta"
            ],
            correctIndex: 1,
            explanation: "'Amchya Ayushyatil Kahi Athavani' ('Some Memories of Our Life', 1910) is her celebrated Marathi autobiography."
        },
        {
            id: 4,
            question: "Before which official committee did Ramabai Ranade present a petition in 1919 demanding voting rights (suffrage) for Indian women?",
            options: [
                "Hunter Education Commission",
                "Southborough Franchise Committee",
                "Simon Commission",
                "Cripps Mission"
            ],
            correctIndex: 1,
            explanation: "In 1919, she led a delegation before the Southborough Franchise Committee demanding equal voting rights for women."
        },
        {
            id: 5,
            question: "In which public institution did Ramabai Ranade serve as an official inspector advocating for female prisoner rehabilitation?",
            options: [
                "Alipore Jail, Calcutta",
                "Yerwada Central Jail, Pune",
                "Tihar Jail, Delhi",
                "Arthur Road Jail, Bombay"
            ],
            correctIndex: 1,
            explanation: "She served as an official inspector of female wards at Yerwada Central Jail in Pune, introducing literacy and sanitation reform."
        }
    ],

    sources: [
        {
            title: "Ranade, Ramabai (1910). 'Amchya Ayushyatil Kahi Athavani' (Some Memories of Our Life). Pune: Kirtane & Co.",
            url: "https://archive.org"
        },
        {
            title: "Seva Sadan Society Archives — Centenary History of Female Vocational & Nursing Education in Maharashtra",
            url: "https://sevasadan.org"
        },
        {
            title: "India Post — Commemorative Postage Stamp Dossier for Ramabai Ranade (1989)",
            url: "https://www.indiapost.gov.in"
        },
        {
            title: "Indian Academy of Social Sciences — Lives of Women Pioneers in Western India",
            url: "https://www.ias.ac.in"
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RAMABAI_DATA };
}
