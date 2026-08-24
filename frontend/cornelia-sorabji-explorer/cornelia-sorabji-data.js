/**
 * Cornelia Sorabji Explorer — Data Module
 * Comprehensive historical, legal, and archival dataset documenting the life,
 * legal advocacy, and pioneering achievements of Cornelia Sorabji (1866–1954).
 */

const CORNELIA_DATA = {
    quickFacts: {
        fullName: "Cornelia Sorabji",
        lifespan: "15 November 1866 – 6 July 1954",
        birthplace: "Nashik, Bombay Presidency, British India",
        primaryFields: ["Law", "Legal Reform", "Purdahnashin Women's Rights", "Social Advocacy"],
        education: [
            "B.A. English Literature — Deccan College, Bombay University (1888, First Class)",
            "Bachelor of Civil Law (BCL) — Somerville College, Oxford University (1892)",
            "LL.B. Examination — Bombay University (1897)",
            "LL.M. / Bar Examination — London Bar (1923)"
        ],
        keyPositions: [
            "Purdahnashin Legal Representative & Advocate (1894–1904)",
            "Legal Advisor to the Court of Wards (Bengal, Bihar, Orissa, Assam) (1904–1922)",
            "Barrister & Advocate, High Court of Allahabad (Admitted 1923)",
            "Author & Social Chronicler (1908–1940)"
        ],
        keyHonors: [
            "Kaiser-i-Hind Gold Medal for Public Service in India (1909)",
            "First Woman to Read Law at Oxford University (BCL 1892)",
            "First Female Advocate / Barrister Admitted to Practice in India (1923)",
            "English Heritage Blue Plaque at 2 Crawford Place, London",
            "Bust at the High Court of Justice, London & Lincoln's Inn"
        ]
    },

    biographySections: [
        {
            id: "early-life",
            title: "Early Education & University Breakthrough",
            subtitle: "First Female Graduate of Bombay University",
            icon: "🎓",
            content: `Cornelia Sorabji was born in Nashik in 1866 into a pioneering family. Her father, Rev. Sorabji Karsedji, was a Parsi Christian convert, and her mother, Francina Ford, was a prominent social reformer who established several girls' schools in Pune.
            
            Determined to pursue higher education, Cornelia attended Deccan College in Pune and became the first female graduate of Bombay University in 1888, securing top honors in English Literature. Despite topping her class, she was initially denied a government scholarship to study in England solely because of her gender.`
        },
        {
            id: "oxford-bcl",
            title: "Oxford BCL Breakthrough",
            subtitle: "First Woman to Read Law at Oxford (1889–1892)",
            icon: "⚖️",
            content: `Supported by prominent English patrons including Florence Nightingale, Mary Hobhouse, and Benjamin Jowett, Cornelia arrived at Somerville College, Oxford in 1889. She sought to read for the prestigious Bachelor of Civil Law (BCL) degree.
            
            At the time, women were strictly barred from taking university examinations. In 1892, a special Congregation Decree was passed by Oxford University specifically permitting Cornelia Sorabji to sit for the BCL examination—making her the first woman in history to do so. Although she passed, Oxford refused to formally confer degrees upon women until 1920.`
        },
        {
            id: "purdahnashin-advocacy",
            title: "Champion of Purdahnashin Women",
            subtitle: "Legal Protection for Secluded Wards",
            icon: "📜",
            content: `Upon returning to India in 1894, Cornelia discovered that female lawyers were barred from appearing in courtrooms. Undeterred, she found her calling in serving 'Purdahnashin' women—secluded widows and heiresses prohibited by custom from interacting with men outside their families.
            
            These secluded women owned vast estates but were frequently defrauded by unscrupulous male guardians, managers, and relatives. Because purdahnashin women could not meet male lawyers or enter open courts, Cornelia acted as their confidential legal advisor, gathering evidence, reviewing deeds, and protecting their wealth.`
        },
        {
            id: "court-of-wards",
            title: "Court of Wards Legal Advisor",
            subtitle: "Two Decades of Official Service (1904–1922)",
            icon: "🏛️",
            content: `Recognizing her vital role, the British Indian Government appointed Cornelia Sorabji as Legal Advisor to the Court of Wards for the provinces of Bengal, Bihar, Orissa, and Assam in 1904.
            
            Over the next 18 years, Cornelia traveled tirelessly across Eastern India by train, palanquin, and boat. She personally represented and protected over 600 purdahnashin women, widows, and minor orphans, establishing schools, securing inheritances, and rescuing vulnerable wards from illegal confinement and financial ruin.`
        },
        {
            id: "bar-admission",
            title: "Historic Bar Admission & Later Legacy",
            subtitle: "First Female Advocate of the Allahabad High Court (1923)",
            icon: "🏆",
            content: `After decades of struggle, the legal landscape finally shifted with the enactment of the Sex Disqualification (Removal) Act in 1919. In 1923, Cornelia Sorabji was officially called to the Bar at Lincoln's Inn, London, and admitted to practice as an Advocate by the High Court of Allahabad.
            
            She became the first woman barrister to practice in both India and Britain. After retiring from active legal practice in Calcutta, she moved to London, writing influential books such as *'Between the Twilights'* (1908) and *'India Calling'* (1934), detailing her extraordinary journey.`
        }
    ],

    legalCaseStudies: [
        {
            id: "purdahnashin-estate-defense",
            caseTitle: "Estate Defense of the Bihar Dowager Rani",
            clientType: "Purdahnashin Widow & Minor Heir",
            legalIssue: "Fraudulent power-of-attorney deed fabricated by estate managers attempting to usurp 10,000 acres of ancestral land.",
            sorabjiIntervention: "Cornelia entered the secluded zenana, interviewed the Rani behind curtains, verified original thumbprints, and exposed forged documents in court.",
            outcome: "Restored full estate rights to the widow and secured state guardianship for her minor son."
        },
        {
            id: "court-of-wards-education",
            caseTitle: "Educational Charter for Minor Wards in Bengal",
            clientType: "Orphaned Female Wards of Court of Wards",
            legalIssue: "Customary denial of formal schooling to minor female heirs of zemindari estates.",
            sorabjiIntervention: "Drafted institutional guidelines compelling the Court of Wards to fund governesses, literacy tutors, and medical care for female wards.",
            outcome: "Educated over 200 young women heirs across Bengal and Orissa, enabling them to manage their own estates."
        },
        {
            id: "allahabad-bar-petition",
            caseTitle: "Allahabad High Court Bar Enrollment (1923)",
            clientType: "Cornelia Sorabji (Self-Representation)",
            legalIssue: "Gender restriction rules preventing qualified women BCL graduates from enrolling as advocates.",
            sorabjiIntervention: "Petitioned the Judicial Committee and High Court of Judicature under new post-WWI legal reform acts.",
            outcome: "Admitted as the first female Advocate of the Allahabad High Court, breaking the legal gender bar in India."
        },
        {
            id: "zenana-sanitation-rights",
            caseTitle: "Medical & Legal Welfare in Royal Zenanas",
            clientType: "Secluded Women in Royal Princely States",
            legalIssue: "Total lack of female medical access resulting in high maternal mortality among purdahnashin women.",
            sorabjiIntervention: "Combined legal advocacy with public health reform, securing funding for female doctors (Lady Dufferin Fund) to enter zenanas.",
            outcome: "Significantly improved healthcare and legal autonomy for secluded royal women."
        }
    ],

    legalRightsCatalog: [
        {
            topic: "Purdahnashin Customary Rights",
            category: "rights",
            status: "Protected under Judicial Precedents",
            significance: "Established that contracts signed by secluded women required strict proof of independent legal advice."
        },
        {
            topic: "Oxford BCL Degree Decree (1892)",
            category: "education",
            status: "Historic University Ruling",
            significance: "First official decree permitting a woman to sit for the postgraduate Bachelor of Civil Law examination."
        },
        {
            topic: "Sex Disqualification (Removal) Act 1919",
            category: "legislation",
            status: "Enacted Statute",
            significance: "Removed gender bars prohibiting women from entering professions, civil posts, and the Bar."
        },
        {
            topic: "Court of Wards Legal Advisory Charter (1904)",
            category: "governance",
            status: "Government Special Appointment",
            significance: "Created the official post of Lady Assistant to Court of Wards to safeguard secluded women's property."
        },
        {
            topic: "Legal Practitioners (Women) Act 1923",
            category: "legislation",
            status: "Indian Imperial Statute",
            significance: "Explicitly declared that no woman shall be disqualified from being admitted as a legal practitioner in India."
        }
    ],

    timelineEvents: [
        {
            year: "1866",
            title: "Birth in Nashik",
            description: "Born on 15 November 1866 in Nashik, Bombay Presidency, to Rev. Sorabji Karsedji and Francina Ford."
        },
        {
            year: "1888",
            title: "First Female Graduate of Bombay University",
            description: "Graduated with First Class Honors in English from Deccan College, Pune."
        },
        {
            year: "1889",
            title: "Arrival at Somerville College, Oxford",
            description: "Entered Oxford University supported by Florence Nightingale and Mary Hobhouse."
        },
        {
            year: "1892",
            title: "Historic Oxford BCL Examination",
            description: "Became the first woman in history to sit for the Bachelor of Civil Law (BCL) exam under a special University Decree."
        },
        {
            year: "1894",
            title: "Return to India & Purdahnashin Advocacy",
            description: "Returned to India to provide legal counsel to secluded purdahnashin women."
        },
        {
            year: "1897",
            title: "Bombay University LL.B.",
            description: "Passed the Bombay LL.B. examination, but was denied permission to practice in court due to gender rules."
        },
        {
            year: "1904",
            title: "Appointed Legal Advisor to Court of Wards",
            description: "Appointed official Legal Advisor to Court of Wards for Bengal, Bihar, Orissa, and Assam."
        },
        {
            year: "1909",
            title: "Kaiser-i-Hind Gold Medal",
            description: "Awarded the Kaiser-i-Hind Gold Medal by the British Indian Government for outstanding public service."
        },
        {
            year: "1923",
            title: "Admitted to the Allahabad High Court Bar",
            description: "Officially admitted to the Bar at Lincoln's Inn and enrolled as India's first female High Court Advocate."
        },
        {
            year: "1934",
            title: "Publication of 'India Calling'",
            description: "Published her famous autobiography detailing her four decades of legal pioneering and social work."
        },
        {
            year: "1954",
            title: "Passing in London",
            description: "Passed away on 6 July 1954 at her residence in London, leaving an enduring global legal legacy."
        }
    ],

    quizQuestions: [
        {
            id: 1,
            question: "At which Oxford college did Cornelia Sorabji read law starting in 1889?",
            options: [
                "Lady Margaret Hall",
                "Somerville College",
                "St Hilda's College",
                "St Hugh's College"
            ],
            correctIndex: 1,
            explanation: "Cornelia Sorabji attended Somerville College, Oxford, supported by Florence Nightingale and Mary Hobhouse."
        },
        {
            id: 2,
            question: "Who were the 'Purdahnashin' women whom Cornelia Sorabji dedicated her legal career to protecting?",
            options: [
                "Female factory workers in Bombay",
                "Secluded widows and heiresses barred by custom from meeting male lawyers or entering public courts",
                "Women teachers in colonial government schools",
                "Female political prisoners of the Quit India movement"
            ],
            correctIndex: 1,
            explanation: "Purdahnashins were secluded women prohibited by custom from communicating with men outside their families, making them vulnerable to estate fraud."
        },
        {
            id: 3,
            question: "In which year was Cornelia Sorabji officially admitted to the Bar of the High Court of Allahabad?",
            options: [
                "1892",
                "1904",
                "1923",
                "1947"
            ],
            correctIndex: 2,
            explanation: "In 1923, following legal reform acts, she was called to the Bar at Lincoln's Inn and enrolled as India's first female advocate at Allahabad."
        },
        {
            id: 4,
            question: "Which government post did Cornelia Sorabji hold from 1904 to 1922 in Eastern India?",
            options: [
                "Chief Magistrate of Calcutta",
                "Legal Advisor to the Court of Wards (Bengal, Bihar, Orissa, Assam)",
                "Inspector-General of Prisons",
                "Minister of Education for Bombay"
            ],
            correctIndex: 1,
            explanation: "She served as Legal Advisor to the Court of Wards, protecting over 600 secluded women and minor orphans across Eastern India."
        },
        {
            id: 5,
            question: "Which prestigious award was conferred upon Cornelia Sorabji in 1909 for her public service?",
            options: [
                "Padma Bhushan",
                "Kaiser-i-Hind Gold Medal",
                "Order of the British Empire (OBE)",
                "Bharat Ratna"
            ],
            correctIndex: 1,
            explanation: "She was awarded the Kaiser-i-Hind Gold Medal in 1909 for her extraordinary legal service to secluded women and orphans."
        }
    ],

    sources: [
        {
            title: "Sorabji, Cornelia (1934). 'India Calling: The Memories of Cornelia Sorabji'. London: Nisbet & Co.",
            url: "https://archive.org"
        },
        {
            title: "Oxford University Archives — First Women Law Students & Congregation Decree of 1892",
            url: "https://www.ox.ac.uk"
        },
        {
            title: "Lincoln's Inn Archives — Admission Records of Cornelia Sorabji (1923)",
            url: "https://www.lincolnsinn.org.uk"
        },
        {
            title: "English Heritage — Blue Plaque Commemoration for Cornelia Sorabji",
            url: "https://www.english-heritage.org.uk"
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CORNELIA_DATA };
}
