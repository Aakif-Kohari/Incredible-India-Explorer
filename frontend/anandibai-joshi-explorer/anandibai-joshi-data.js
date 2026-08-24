/**
 * Dr. Anandibai Joshi Explorer — Data Module
 * Comprehensive historical, medical, and archival dataset documenting the life,
 * medical research, and legacy of Dr. Anandibai Gopalrao Joshi (1865–1887).
 */

const ANANDIBAI_DATA = {
    quickFacts: {
        fullName: "Dr. Anandibai Gopalrao Joshi",
        lifespan: "31 March 1865 – 26 February 1887",
        birthplace: "Kalyan, Thane District, Bombay Presidency, British India",
        primaryFields: ["Medicine", "Obstetrics", "Gynecology", "Public Health Reform"],
        education: [
            "Early Tutoring — Marathi, Sanskrit & English (1875–1882)",
            "Doctor of Medicine (M.D.) — Woman's Medical College of Pennsylvania (WMCP), USA (Graduated 1886)"
        ],
        keyPositions: [
            "Student Physician & Medical Researcher, WMCP Philadelphia (1883–1886)",
            "Physician-in-Charge of Female Ward, Albert Edward Hospital, Kolhapur Princely State (1886–1887)"
        ],
        keyHonors: [
            "First Indian Woman to Earn a Doctor of Medicine (M.D.) Degree in the United States (1886)",
            "Congratulatory Message from Queen Victoria (1886)",
            "Attended by Pandita Ramabai at WMCP Graduation (1886)",
            "Crater 'Joshi' on planet Venus named in her honor by International Astronomical Union",
            "Anandibai Joshi Award for Medicine instituted by Government of Maharashtra"
        ]
    },

    biographySections: [
        {
            id: "early-life-tragedy",
            title: "Early Life & Personal Tragedy",
            subtitle: "Loss of a Child as the Medical Catalyst",
            icon: "💔",
            content: `Anandibai was born as Yamuna Joshi in 1865 in Kalyan into a landlord family that had fallen on hard financial times. At age nine, she was married to Gopalrao Joshi, a progressive clerk twenty years her senior who strongly advocated female education. He renamed her Anandibai.
            
            At age fourteen, Anandibai gave birth to a baby boy. Tragically, due to the total absence of female medical care and primitive local health practices, the infant survived for only ten days. Deeply traumatized by this avoidable loss, Anandibai made a solemn vow to become a doctor so that Indian women would never again suffer or die due to lack of medical care.`
        },
        {
            id: "voyage-to-america",
            title: "Voyage Across Oceans (1883)",
            subtitle: "Defying Orthodox Barriers to Reach Philadelphia",
            icon: "⛵",
            content: `In 19th-century India, crossing the ocean ('Kala Pani') resulted in severe social boycott and caste excommunication. Undeterred, Anandibai delivered a courageous public address at Serampore College in 1883, explaining her rationale for studying medicine in America.
            
            Supported by her husband Gopalrao and an American sponsor, Theodicia Carpenter of New Jersey—who had read her letter in the *Missionary Review*—Anandibai set sail from Calcutta to New York in June 1883. She traveled alone at age eighteen, becoming one of the first Brahmin women to step foot on American soil.`
        },
        {
            id: "wmcp-education",
            title: "Medical Studies at WMCP (1883–1886)",
            subtitle: "Rigorous Training at the World's First Women's Medical College",
            icon: "🩺",
            content: `Anandibai enrolled at the Woman's Medical College of Pennsylvania (WMCP) in Philadelphia, the first medical institution in the world founded specifically to educate women in medicine. She studied anatomy, chemistry, surgery, pharmacology, and obstetrics under eminent professors such as Dr. Rachel Bodley.
            
            Despite struggling with severe cold winters, unaccustomed Western food, and declining health, Anandibai excelled academically. On 11 March 1886, she graduated with a Doctor of Medicine (M.D.) degree at age nineteen. Queen Victoria sent a congratulatory message, and social reformer Pandita Ramabai attended the graduation ceremony.`
        },
        {
            id: "md-thesis",
            title: "M.D. Thesis on Indian Obstetrics",
            subtitle: "Landmark Study: 'Obstetrics Among the Aryan Hindoos'",
            icon: "📜",
            content: `For her M.D. thesis, Anandibai chose the topic *"Obstetrics among the Aryan Hindoos"*. Her research systematically analyzed traditional Indian maternal care, childbirth customs, and indigenous Ayurvedic practices.
            
            She combined historical text analysis with modern medical science, pointing out unsanitary birthing rooms and untrained midwifes while advocating for scientific hygiene, maternal nutrition, and professional female obstetricians. Her thesis stands as one of the earliest cross-cultural comparative medical studies written by an Indian physician.`
        },
        {
            id: "return-and-legacy",
            title: "Return to India & Enduring Legacy",
            subtitle: "Albert Edward Hospital & National Inspiration",
            icon: "🏛️",
            content: `In late 1886, Dr. Anandibai Joshi returned to India to a hero's welcome. The Princely State of Kolhapur appointed her as Physician-in-Charge of the female ward at the Albert Edward Hospital, making her the first woman doctor to head a hospital department in India.
            
            Tragically, the tuberculosis she had contracted in America worsened rapidly. She passed away on 26 February 1887 in Pune at the age of twenty-one. Though her life was heartbreakingly short, her courageous journey shattered centuries of gender orthodoxy and paved the way for generations of Indian women in medicine.`
        }
    ],

    thesisResearch: [
        {
            id: "maternal-hygiene-protocol",
            researchTitle: "Maternal Hygiene & Sterile Birthing Environments",
            coreFinding: "Identified unventilated, damp birthing rooms ('sutika griha') and unwashed cloth ties as primary causes of puerperal fever and infant tetanus.",
            medicalRecommendation: "Mandated clean cotton linens, ventilated rooms, and boiling of delivery instruments before childbirth.",
            impact: "Formed early protocols for rural maternity sanitation in Western India."
        },
        {
            id: "ayurvedic-obstetric-synthesis",
            researchTitle: "Synthesis of Ayurvedic & Western Obstetrics",
            coreFinding: "Evaluated traditional herbal post-partum tonics (such as Dashamula) alongside modern antiseptic pharmacology.",
            medicalRecommendation: "Advocated retaining beneficial indigenous nutrition while eliminating harmful unscientific customs.",
            impact: "Pioneered integrative maternal healthcare approaches tailored to Indian women."
        },
        {
            id: "female-midwifery-training",
            researchTitle: "Professional Training for Native Midwives ('Dais')",
            coreFinding: "Recognized that traditional midwives possessed trust among rural women but lacked basic knowledge of germ theory and anatomy.",
            medicalRecommendation: "Proposed establishing government-funded training schools to certify midwives in antiseptic delivery techniques.",
            impact: "Laid the groundwork for formal nursing and midwifery education programs in Bombay Presidency."
        },
        {
            id: "infant-mortality-reduction",
            researchTitle: "Neonatal Care & Infant Mortality Prevention",
            coreFinding: "Attributed high infant mortality rates to delayed breastfeeding, pre-lacteal feeds, and improper umbilical cord dressing.",
            medicalRecommendation: "Recommended immediate colostrum feeding and sterile cord care.",
            impact: "Saved countless newborn lives by reframing infant care as a scientific medical priority."
        }
    ],

    medicalMilestonesCatalog: [
        {
            topic: "Woman's Medical College of Pennsylvania (1850)",
            category: "institution",
            status: "World's First Women's Medical School",
            significance: "Provided formal M.D. degrees to international women physicians when all other medical colleges barred women."
        },
        {
            topic: "M.D. Thesis: 'Obstetrics Among the Aryan Hindoos' (1886)",
            category: "research",
            status: "Published Doctoral Dissertation",
            significance: "First scientific thesis on Indian maternal health written by an Indian woman doctor in the West."
        },
        {
            topic: "Albert Edward Hospital Female Ward (1886)",
            category: "practice",
            status: "Hospital Departmental Leadership",
            significance: "First female-led hospital ward in Kolhapur Princely State providing free treatment to secluded women."
        },
        {
            topic: "Public Address at Serampore College (1883)",
            category: "advocacy",
            status: "Historic Public Oration",
            significance: "Fierce public defense of female medical education, convincing critics of the urgent need for female doctors in India."
        },
        {
            topic: "Queen Victoria's Congratulatory Decree (1886)",
            category: "honor",
            status: "Royal Recognition",
            significance: "Royal commendation recognizing Dr. Joshi's historic graduation and contribution to women's welfare."
        }
    ],

    timelineEvents: [
        {
            year: "1865",
            title: "Birth in Kalyan",
            description: "Born on 31 March 1865 in Kalyan, Thane District, Bombay Presidency, as Yamuna Joshi."
        },
        {
            year: "1874",
            title: "Marriage to Gopalrao Joshi",
            description: "Married progressive reformer Gopalrao Joshi at age nine; renamed Anandibai."
        },
        {
            year: "1879",
            title: "Tragic Loss of Infant Son",
            description: "Gave birth at age fourteen; infant died ten days later due to lack of medical care, inspiring her medical vow."
        },
        {
            year: "1880",
            title: "Correspondence with Theodicia Carpenter",
            description: "Wrote to American sponsor Theodicia Carpenter of Roselle, New Jersey, requesting guidance to study medicine."
        },
        {
            year: "1883 (Feb)",
            title: "Historic Speech at Serampore College",
            description: "Delivered a powerful public address explaining why Indian women urgently needed female doctors."
        },
        {
            year: "1883 (Jun)",
            title: "Arrival in New York & Enrolment at WMCP",
            description: "Sailed from Calcutta; arrived in New York and enrolled at Woman's Medical College of Pennsylvania, Philadelphia."
        },
        {
            year: "1886 (Mar)",
            title: "Graduation with M.D. Degree",
            description: "Graduated with M.D. degree at age nineteen; Pandita Ramabai attended and Queen Victoria sent congratulations."
        },
        {
            year: "1886 (Oct)",
            title: "Return to India & Hero's Welcome",
            description: "Sailed back to India; received grand receptions in Bombay and Pune."
        },
        {
            year: "1886 (Nov)",
            title: "Appointment at Albert Edward Hospital",
            description: "Appointed Physician-in-Charge of the female ward at Albert Edward Hospital, Kolhapur Princely State."
        },
        {
            year: "1887",
            title: "Passing in Pune at Age 21",
            description: "Passed away from tuberculosis on 26 February 1887 in Pune, leaving an immortal medical legacy."
        }
    ],

    quizQuestions: [
        {
            id: 1,
            question: "At which medical institution in Philadelphia did Anandibai Joshi earn her Doctor of Medicine (M.D.) degree in 1886?",
            options: [
                "Harvard Medical School",
                "Woman's Medical College of Pennsylvania (WMCP)",
                "Johns Hopkins School of Medicine",
                "Columbia University Vagelos College"
            ],
            correctIndex: 1,
            explanation: "She earned her M.D. from the Woman's Medical College of Pennsylvania, the world's first women's medical school."
        },
        {
            id: 2,
            question: "What tragic event in Anandibai's personal life inspired her determination to become a doctor?",
            options: [
                "The loss of her father to cholera",
                "The death of her ten-day-old infant son due to lack of female medical care",
                "A severe plague outbreak in Kalyan",
                "Her own childhood illness"
            ],
            correctIndex: 1,
            explanation: "At age fourteen, her newborn infant died due to lack of medical care, inspiring her vow to become a doctor."
        },
        {
            id: 3,
            question: "What was the title of Dr. Anandibai Joshi's M.D. thesis presented at WMCP in 1886?",
            options: [
                "Tropical Diseases of Western India",
                "Obstetrics among the Aryan Hindoos",
                "Ayurvedic Pharmacology in Modern Practice",
                "Infant Mortality in Colonial Bombay"
            ],
            correctIndex: 1,
            explanation: "Her M.D. thesis was titled 'Obstetrics among the Aryan Hindoos', analyzing maternal health and childbirth customs."
        },
        {
            id: 4,
            question: "Which Princely State appointed Dr. Anandibai Joshi as Physician-in-Charge of its female hospital ward upon her return to India?",
            options: [
                "Baroda Princely State",
                "Mysore Princely State",
                "Kolhapur Princely State (Albert Edward Hospital)",
                "Travancore Princely State"
            ],
            correctIndex: 2,
            explanation: "Kolhapur Princely State appointed her Physician-in-Charge of the female ward at the Albert Edward Hospital."
        },
        {
            id: 5,
            question: "Which social reformer and scholar attended Dr. Anandibai Joshi's graduation ceremony in Philadelphia in March 1886?",
            options: [
                "Savitribai Phule",
                "Pandita Ramabai",
                "Tarabai Shinde",
                "Kadambini Ganguly"
            ],
            correctIndex: 1,
            explanation: "Pandita Ramabai traveled to Philadelphia to attend Anandibai's historic medical graduation."
        }
    ],

    sources: [
        {
            title: "Dall, Caroline Healey (1887). 'The Life of Dr. Anandabai Joshee: A Kinswoman of the Pundita Ramabai'. Boston: Roberts Brothers.",
            url: "https://archive.org"
        },
        {
            title: "Drexel University Archives — Woman's Medical College of Pennsylvania (WMCP) Records of Dr. Anandibai Joshi",
            url: "https://drexel.edu/legacy-center"
        },
        {
            title: "National Library of Medicine — 'Obstetrics Among the Aryan Hindoos' (Dr. Anandibai Joshi M.D. Thesis 1886)",
            url: "https://www.nlm.nih.gov"
        },
        {
            title: "Indian Academy of Sciences — Pioneering Women Doctors of India",
            url: "https://www.ias.ac.in"
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ANANDIBAI_DATA };
}
