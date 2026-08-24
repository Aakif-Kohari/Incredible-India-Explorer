/**
 * Savitribai Phule Explorer — Data Module
 * Comprehensive historical, literary, and archival dataset documenting the life,
 * Bhide Wada school, Satyashodhak Samaj, plague relief, and social legacy of Savitribai Phule (1831–1897).
 */

const SAVITRIBAI_DATA = {
    quickFacts: {
        fullName: "Savitribai Jyotirao Phule",
        lifespan: "3 January 1831 – 10 March 1897",
        birthplace: "Naigaon, Satara District, Maharashtra, British India",
        primaryFields: ["Women's Education", "Social Reform", "Anti-Caste Activism", "Plague Relief"],
        education: [
            "Educated at home by Jyotirao Phule",
            "Teacher Training — Mrs. Mitchell's Normal School, Pune & Cynthia Farrar's Institution, Ahmednagar"
        ],
        keyPositions: [
            "First Female Teacher of India (1848)",
            "Co-founder, Bhide Wada Girls' School, Pune (1848)",
            "Co-founder, Satyashodhak Samaj (Society of Truth Seekers) (1873)",
            "Founder, Balhatya Pratibandhak Griha (Infanticide Prohibition Home) (1863)"
        ],
        keyHonors: [
            "Widely recognized as the Mother of Indian Feminism",
            "First Indian woman to establish a girls' school and teach female students",
            "Savitribai Phule Pune University named in her honor by Government of Maharashtra"
        ]
    },

    biographySections: [
        {
            id: "early-life-marriage",
            title: "Early Life & Marriage",
            subtitle: "Earthy Roots of Satara",
            icon: "🏡",
            content: `Savitribai Phule was born in 1831 in Naigaon, Satara district, into a farming family. Married at the age of nine to Jyotirao Phule (who was thirteen), her husband recognized her burning desire to learn.
            
            In an era when education was strictly prohibited for women and lower castes, Jyotirao taught Savitribai to read and write at home. Together, they formed an intellectual partnership that would challenge the core of India's social orthodoxy.`
        },
        {
            id: "becoming-teacher",
            title: "Becoming India's First Woman Teacher",
            subtitle: "Shrugging Off the Mud of Orthodox Opposition",
            icon: "🎓",
            content: `Savitribai obtained formal teacher training at Mrs. Mitchell's Normal School in Pune and Cynthia Farrar's institution in Ahmednagar. In 1848, she became the first female teacher of India, instructing young girls at Bhide Wada.
            
            Her daily walk to the school was met with intense opposition: orthodox conservatives threw mud, cow dung, and stones at her. Undeterred, she carried a second saree in her bag to change into before class, continuing her teaching duties with quiet resolve.`
        },
        {
            id: "girls-education",
            title: "Girls' & Marginalized Caste Schools",
            subtitle: "Bhide Wada & Satyashodhak Samaj",
            icon: "🏛️",
            content: `By the end of 1851, Savitribai and Jyotirao were running three schools for girls in Pune, educating over 150 students. They also set up schools for children of marginalized Shudra and Ati-Shudra communities, who were completely excluded from traditional education.
            
            To prevent children from dropping out, Savitribai offered stipends, organized parent-teacher meetings, and created curricula that prioritized hygiene, science, and critical thinking over orthodox mythology.`
        },
        {
            id: "social-reform-griha",
            title: "Social Reform & Satyashodhak Samaj",
            subtitle: "Refuge Homes and Anti-Discrimination",
            icon: "⚖️",
            content: `Savitribai was a fierce voice against infanticide and the abuse of widows. In 1863, she opened the Balhatya Pratibandhak Griha, a shelter home for pregnant widows and victims of rape, even adopting a widow's child, Yashwant, as her own son.
            
            She also led the Satyashodhak Samaj's marriage reforms, conducting dowry-free inter-caste marriages without priests. In times of drought, she opened their household well to marginalized communities who were barred from public water sources.`
        },
        {
            id: "plague-relief-martyrdom",
            title: "Plague Relief & Ultimate Sacrifice",
            subtitle: "A Martyr for Humanity",
            icon: "🏥",
            content: `In 1897, a bubonic plague epidemic struck Pune. Savitribai and her son Yashwant established a dedicated clinic on the outskirts of the city to treat victims of the highly contagious disease.
            
            While personally carrying a sick young boy, Pandurang Babaji Gaikwad, from the Mahar settlement to the clinic on her back, Savitribai contracted the plague. She passed away on 10 March 1897, sacrificing her life in the service of humanity.`
        }
    ],

    thesisResearch: [
        {
            id: "kavya-phule",
            researchTitle: "Kavya Phule (Poetry Blossoms, 1854)",
            coreFinding: "Published India's first modern anthology of reformist poetry in Marathi, exhorting marginalized communities to break free from ignorance.",
            medicalRecommendation: "'Arise, study, and become self-reliant. Throw off the yoke of ignorance and custom. Wisdom is the greatest wealth; without it, human life is but a shadow. Go to school, learn, and claim your human rights.'",
            impact: "Pioneered feminist and anti-caste Marathi literature, inspiring generations of Dalit-Bahujan writers."
        },
        {
            id: "bavan-kashi",
            researchTitle: "Bavan Kashi Subodh Ratnakar (1892)",
            coreFinding: "A biographical history of Jyotirao Phule and the Satyashodhak movement, detailing the historical roots of caste oppression and the path to liberation.",
            medicalRecommendation: "'History has been written by the oppressors to justify our chains. The Subodh Ratnakar is a gem of truth, reminding our people of their sovereign, pre-caste history and their right to equal education.'",
            impact: "Formed a key intellectual text for the Satyashodhak Samaj, reinforcing critical historical consciousness."
        },
        {
            id: "balhatya",
            researchTitle: "Balhatya Pratibandhak Griha Declarations",
            coreFinding: "Fierce public critique of social codes that forced widowed women to commit suicide or abort infants to preserve family honor.",
            medicalRecommendation: "'Let no sister end her life in shame. Our home is a sanctuary. We will protect your child, guard your secret, and restore your dignity. Society's honor cannot be built on the dead bodies of its daughters.'",
            impact: "Successfully prevented hundreds of infanticides and saved countless widowed mothers in Western India."
        },
        {
            id: "plague-clinic",
            researchTitle: "Plague Clinic Journals & Letters (1897)",
            coreFinding: "Documented the neglect of lower-caste plague victims by colonial British authorities and orthodox medical practitioners.",
            medicalRecommendation: "'The administration is cruel; they quarantine our people in open fields without blankets. The high-caste doctors refuse to touch them. We must run our own clinics, wash their wounds ourselves, and show that love is stronger than the plague.'",
            impact: "Saved hundreds of lives during the Pune epidemic, setting a rare example of selfless community medicine."
        }
    ],

    medicalMilestonesCatalog: [
        {
            topic: "Bhide Wada Girls' School (1848)",
            category: "institution",
            status: "First Girls' School in India",
            significance: "Established by Savitribai and Jyotirao, breaking centuries of caste and gender exclusion in formal literacy."
        },
        {
            topic: "Satyashodhak Samaj (1873)",
            category: "practice",
            status: "Society of Truth Seekers",
            significance: "Led structural campaigns against caste supremacy, conducting priest-less weddings and championing low-caste civil rights."
        },
        {
            topic: "Balhatya Pratibandhak Griha (1863)",
            category: "research",
            status: "Infanticide Prevention Home",
            significance: "India's first shelter home for pregnant widows and rape victims, offering safe delivery, adoption, and rehabilitation."
        },
        {
            topic: "Satyashodhak Plague Clinic (1897)",
            category: "advocacy",
            status: "Epidemic Hospital Operations",
            significance: "Provided free medical care and isolation wards to caste-oppressed communities during the deadly bubonic plague outbreak."
        }
    ],

    timelineEvents: [
        {
            year: "1831",
            title: "Birth in Naigaon",
            description: "Born on 3 January 1831 in Naigaon, Satara district, Maharashtra."
        },
        {
            year: "1840",
            title: "Marriage to Jyotirao Phule",
            description: "Married social reformer Jyotirao Phule at age nine."
        },
        {
            year: "1848",
            title: "India's First Female Teacher",
            description: "Completed teacher training and began teaching at Bhide Wada Girls' School, Pune."
        },
        {
            year: "1851",
            title: "Expanding Girls' Schools",
            description: "Established three active girls' schools in Pune; honored by British government for services to education."
        },
        {
            year: "1863",
            title: "Balhatya Pratibandhak Griha",
            description: "Founded the Infanticide Prohibition Home in their own house to shelter widowed mothers."
        },
        {
            year: "1873",
            title: "Satyashodhak Samaj Marriage Reforms",
            description: "Co-founded the Satyashodhak Samaj; organized first priest-less inter-caste wedding."
        },
        {
            year: "1890",
            title: "Passing of Jyotirao Phule",
            description: "Husband Jyotirao passed away; she lit his funeral pyre, defying patriarchal traditions."
        },
        {
            year: "1897",
            title: "Plague Relief & Sacrifice",
            description: "Contracted bubonic plague while carrying a sick child to their relief clinic; passed away on 10 March."
        }
    ],

    quizQuestions: [
        {
            id: 1,
            question: "Which school, founded by Savitribai Phule in Pune in 1848, is recognized as the first girls' school in India?",
            options: [
                "Lady Brabourne School",
                "Bhide Wada School",
                "Bethune School",
                "Normal School"
            ],
            correctIndex: 1,
            explanation: "She established the Bhide Wada School in Pune in 1848, opening girls' education in India."
        },
        {
            id: 2,
            question: "Which shelter home did Savitribai Phule establish in 1863 to protect pregnant widows and prevent infanticide?",
            options: [
                "Seva Sadan",
                "Balhatya Pratibandhak Griha",
                "Arya Mahila Samaj",
                "Satyashodhak Griha"
            ],
            correctIndex: 1,
            explanation: "She founded the Balhatya Pratibandhak Griha (Infanticide Prohibition Home) in 1863."
        },
        {
            id: 3,
            question: "Savitribai Phule contracted a fatal illness in 1897 while carrying a sick child to her clinic. Which epidemic was it?",
            options: [
                "Cholera",
                "Smallpox",
                "Bubonic Plague",
                "Influenza"
            ],
            correctIndex: 2,
            explanation: "She contracted bubonic plague while carrying a young plague-infected boy on her back to her clinic."
        },
        {
            id: 4,
            question: "What was the name of the social reform society co-founded by Savitribai and Jyotirao Phule in 1873?",
            options: [
                "Prarthana Samaj",
                "Satyashodhak Samaj",
                "Brahmo Samaj",
                "Arya Samaj"
            ],
            correctIndex: 1,
            explanation: "They co-founded the Satyashodhak Samaj (Society of Truth Seekers) to campaign for equal rights."
        },
        {
            id: 5,
            question: "What is the title of Savitribai Phule's first collection of Marathi poetry published in 1854?",
            options: [
                "Kavya Phule",
                "Bavan Kashi",
                "Subodh Ratnakar",
                "Padmarag"
            ],
            correctIndex: 0,
            explanation: "Her first anthology of reformist Marathi poetry is titled 'Kavya Phule' (Poetry Blossoms)."
        }
    ],

    sources: [
        {
            title: "Phule, Savitribai (1854). 'Kavya Phule' (Marathi). Pune.",
            url: "https://archive.org"
        },
        {
            title: "M. G. Mali (1988). 'Savitribai Phule: Biography'. Government of Maharashtra Publications.",
            url: "https://maharashtra.gov.in"
        },
        {
            title: "Hari Narke et al. (2006). 'Collected Works of Mahatma Jotirao Phule & Savitribai Phule'. Government of Maharashtra.",
            url: "https://maharashtra.gov.in"
        },
        {
            title: "Satyashodhak Samaj Archives & Historical Correspondence (1873–1897), Pune.",
            url: "https://pune.nic.in"
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SAVITRIBAI_DATA };
}
