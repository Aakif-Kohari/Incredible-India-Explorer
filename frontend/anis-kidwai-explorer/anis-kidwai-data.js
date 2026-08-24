/**
 * Anis Kidwai Explorer — Data Module
 * Comprehensive historical, literary, and archival dataset documenting the life,
 * Partition humanitarian work, and literary memoir of Anis Kidwai (1906–1982).
 */

const ANIS_KIDWAI_DATA = {
    quickFacts: {
        fullName: "Anis Begum Kidwai",
        lifespan: "1906 – 16 July 1982",
        birthplace: "Masauli, Barabanki District, United Provinces, British India",
        primaryFields: ["Literature & Memoir", "Refugee Rehabilitation", "Social Work", "Political Advocacy"],
        education: [
            "Home Tutored — Urdu, Persian, Quranic Studies, Islamic History & English Literature"
        ],
        keyPositions: [
            "Refugee Camp Volunteer, Purana Qila & Kingsway Camps, Delhi (1947–1948)",
            "Co-founder, Central Relief Committee, Delhi (1948)",
            "Member of Parliament, Rajya Sabha (1956–1962)"
        ],
        keyHonors: [
            "Sahitya Akademi Award (Posthumous) for Urdu Literature contributions",
            "Pioneer of Partition Literature documenting female experiences of communal violence",
            "Founder of social outreach and education centers for marginalized women in Uttar Pradesh and Delhi"
        ]
    },

    biographySections: [
        {
            id: "early-life-activism",
            title: "Early Life & Nationalist Roots",
            subtitle: "A Family of Patriots",
            icon: "🏡",
            content: `Anis Begum Kidwai was born in 1906 into an aristocratic and politically active Muslim family in Masauli, Barabanki, Uttar Pradesh. Her father, Wilayat Ali, was a prominent patriotic writer and lawyer, and her brother, Shafi Ahmed Kidwai, was a dedicated nationalist worker.
            
            Married to her cousin Shafi Ahmed in 1920, she supported the Indian national movement from within her household, absorbing the progressive, secular, and anti-colonial ideas that surrounded her. Her family's home was a frequent meeting point for Congress leaders, which shaped her early political consciousness.`
        },
        {
            id: "personal-tragedy-partition",
            title: "Partition Tragedy & Resolute Spirit",
            subtitle: "Rising Above Grief to Serve",
            icon: "💔",
            content: `In October 1947, during the communal frenzy of Partition, her husband Shafi Ahmed Kidwai was brutally murdered in Mussoorie by communal mobs for advocating peace and inter-faith harmony.
            
            Overwhelmed by grief but determined not to let hatred consume her, Anis traveled to Delhi to meet Mahatma Gandhi. Gandhi advised her to channel her personal sorrow into public service, guiding her toward the refugee camps where thousands of victims lay displaced. This meeting transformed her personal tragedy into a lifelong mission of humanitarian reconciliation.`
        },
        {
            id: "humanitarian-rehabilitation",
            title: "Refugee Camps & Humanitarian Work",
            subtitle: "Rehabilitating the Displaced in Delhi",
            icon: "🤝",
            content: `Anis Kidwai began working tirelessly at the Purana Qila and Kingsway refugee camps in Delhi. Alongside social worker Subhadra Joshi, she managed relief supplies, reunited families, and helped recover abducted women.
            
            Her work was not merely administrative; she listened to the survivors, provided psychological comfort, and actively stood against communal violence, risking her own safety to protect refugees of all faiths. She became a bridge between the displaced communities and the newly formed Indian state administration.`
        },
        {
            id: "literary-memoir",
            title: "Literary Memoir: 'Azadi Ki Chhaon Mein'",
            subtitle: "Documenting the Human Cost of Partition",
            icon: "✍️",
            content: `Anis Kidwai's Urdu memoir, *Azadi Ki Chhaon Mein* (In the Shadow of Freedom), is recognized as a masterpiece of Partition literature. Unlike official histories that focused on high-level negotiations, her writing documented the raw, grassroots human consequences of Partition: the trauma of abducted women, the agony of lost children, and the painful process of rehabilitation.
            
            She wrote with deep empathy and ethical clarity, avoiding graphic violence to focus instead on the psychological and moral cost of communal hatred. Her book remains a vital primary source for understanding the gendered experience of Partition.`
        },
        {
            id: "public-political-life",
            title: "Later Public & Political Life",
            subtitle: "Voice of the Marginalized in Parliament",
            icon: "🏛️",
            content: `Following her years of grassroots social work, Anis Kidwai entered public office. She was elected as a Member of Parliament to the Rajya Sabha in 1956, representing Uttar Pradesh as a Congress member and serving two consecutive terms until 1962.
            
            In Parliament, she championed women's rights, refugee welfare, and secular policies. She continued her writing and social activism until her death on 16 July 1982, leaving a legacy of compassionate literature and tireless humanitarian service.`
        }
    ],

    thesisResearch: [
        {
            id: "refugee-trauma",
            researchTitle: "Refugee Camp Trauma at Purana Qila",
            coreFinding: "Captured the profound shock, loss of identity, and helplessness of displaced families crowded inside the historic fort ruins.",
            medicalRecommendation: "'Inside the damp walls of the fort, history and tragedy merged. People who had homes, fields, and histories lay reduced to numbers, waiting in mud for dry bread. Their eyes held no anger, only an infinite, questioning void.'",
            impact: "Shifts the Partition narrative from political borders to the physical and emotional realities of displacement."
        },
        {
            id: "abducted-women",
            researchTitle: "Recovery & Rehabilitation of Abducted Women",
            coreFinding: "Documented the double trauma of women who were abducted during riots, and then rejected by their own orthodox families upon recovery.",
            medicalRecommendation: "'Recovering a woman was only the first step. The harder battle was restoring her dignity in a society that viewed her survival as a shame. We had to teach families that these women were victims, not outcasts.'",
            impact: "Pioneered feminist historiography of Partition, focusing on state-enforced recovery laws and family honor."
        },
        {
            id: "gandhian-nonviolence",
            researchTitle: "Gandhi's Final Peace Missions",
            coreFinding: "Recorded Gandhi's daily prayer meetings and his calming influence on the communal tensions of Delhi in late 1947.",
            medicalRecommendation: "'When Bapu spoke, the loudest mobs fell silent. He did not give grand speeches; he simply asked us to look at our neighbor's suffering. In his presence, our grief transformed from anger into a desire to heal.'",
            impact: "Provides a rare, first-hand witness account of Mahatma Gandhi's final days and peace crusade."
        },
        {
            id: "communal-reconciliation",
            researchTitle: "Grassroots Communal Harmony",
            coreFinding: "Highlighted acts of inter-communal rescue, where neighbors protected each other across religious lines despite the surrounding hatred.",
            medicalRecommendation: "'Amidst the dark flood of violence, there were small, quiet islands of humanity. Hindu neighbors shielding Muslim families, Muslim workers guarding Hindu property. These small acts kept our faith in India alive.'",
            impact: "Preserves the memory of cross-community solidarity and moral courage during national crises."
        }
    ],

    medicalMilestonesCatalog: [
        {
            topic: "Purana Qila Refugee Camp (1947)",
            category: "institution",
            status: "Refugee Relief Operation",
            significance: "Managed emergency food, medical aid, and hygiene supplies for over 50,000 displaced refugees in Delhi."
        },
        {
            topic: "Publication of 'Azadi Ki Chhaon Mein' (1974)",
            category: "research",
            status: "Historical Memoir",
            significance: "One of the first Urdu memoirs to record the Partition experience from a female social worker's perspective."
        },
        {
            topic: "Member of Rajya Sabha (1956–1962)",
            category: "practice",
            status: "Parliamentary Leadership",
            significance: "Advocated for the legal rights of widowed women, minor orphans, and the secular integration of displaced populations."
        },
        {
            topic: "Central Relief Committee (1948)",
            category: "advocacy",
            status: "Peace Coordination",
            significance: "Worked directly under Nehru and Gandhi to coordinate peace committees across riot-affected blocks of Delhi and UP."
        }
    ],

    timelineEvents: [
        {
            year: "1906",
            title: "Birth in Masauli",
            description: "Born in Masauli, Barabanki, Uttar Pradesh to Wilayat Ali and Begum Kidwai."
        },
        {
            year: "1920",
            title: "Marriage to Shafi Ahmed Kidwai",
            description: "Married Shafi Ahmed Kidwai, a progressive nationalist worker."
        },
        {
            year: "1947 (Oct)",
            title: "Tragic Loss of Husband",
            description: "Husband Shafi Ahmed Kidwai was assassinated by communal mobs in Mussoorie."
        },
        {
            year: "1947 (Nov)",
            title: "Meeting Gandhi & Camp Work",
            description: "Traveled to Delhi to meet Mahatma Gandhi; began volunteering at Kingsway and Purana Qila camps."
        },
        {
            year: "1948",
            title: "Rehabilitation of Abducted Women",
            description: "Joined the government's recovery and rehabilitation committee to aid abducted women."
        },
        {
            year: "1956",
            title: "Election to Rajya Sabha",
            description: "Elected to the Rajya Sabha, representing Uttar Pradesh as a Member of Parliament."
        },
        {
            year: "1962",
            title: "Completion of Second Term",
            description: "Completed two terms of distinguished service in Parliament, focusing on social reforms."
        },
        {
            year: "1974",
            title: "Publication of Memoir",
            description: "Published 'Azadi Ki Chhaon Mein' (In the Shadow of Freedom) in Urdu."
        },
        {
            year: "1982",
            title: "Passing on 16 July",
            description: "Passed away at age 76, leaving an indelible legacy of literature and social service."
        }
    ],

    quizQuestions: [
        {
            id: 1,
            question: "What is the title of Anis Kidwai's famous Urdu memoir documenting the human cost of Partition?",
            options: [
                "Ghadar-e-Delhi",
                "Azadi Ki Chhaon Mein",
                "Angarey",
                "Aag Ka Darya"
            ],
            correctIndex: 1,
            explanation: "Her Urdu memoir 'Azadi Ki Chhaon Mein' (In the Shadow of Freedom) is a classic of Partition literature."
        },
        {
            id: 2,
            question: "Who advised Anis Kidwai to channel her personal grief into public service after her husband's murder in 1947?",
            options: [
                "Jawaharlal Nehru",
                "Mahatma Gandhi",
                "Maulana Abul Kalam Azad",
                "Sardar Vallabhbhai Patel"
            ],
            correctIndex: 1,
            explanation: "Mahatma Gandhi advised her to heal her grief by volunteering to help refugees."
        },
        {
            id: 3,
            question: "Anis Kidwai served as a Member of Parliament in which house of the Indian Parliament from 1956 to 1962?",
            options: [
                "Lok Sabha",
                "Rajya Sabha",
                "Legislative Assembly",
                "Constituent Assembly"
            ],
            correctIndex: 1,
            explanation: "She served two terms as a Rajya Sabha Member of Parliament representing Uttar Pradesh."
        },
        {
            id: 4,
            question: "In which district of Uttar Pradesh was Anis Kidwai born in 1906?",
            options: [
                "Aligarh",
                "Lucknow",
                "Barabanki (Masauli)",
                "Kanpur"
            ],
            correctIndex: 2,
            explanation: "She was born in Masauli village, located in the Barabanki district of Uttar Pradesh."
        },
        {
            id: 5,
            question: "With which fellow social worker and reformer did Anis Kidwai work closely in the refugee camps of Delhi?",
            options: [
                "Savitribai Phule",
                "Subhadra Joshi",
                "Sarojini Naidu",
                "Aruna Asaf Ali"
            ],
            correctIndex: 1,
            explanation: "She worked closely with Subhadra Joshi in coordinating rehabilitation programs for refugees."
        }
    ],

    sources: [
        {
            title: "Kidwai, Anis (1974). 'Azadi Ki Chhaon Mein' (Urdu). New Delhi: National Book Trust.",
            url: "https://www.nbtindia.gov.in"
        },
        {
            title: "Rajya Sabha Secretariat Archives — Parliamentary Profiles of Former Members (1952–2020)",
            url: "https://rajyasabha.nic.in"
        },
        {
            title: "Gyanendra Pandey (2001). 'Remembering Partition: Violence, Nationalism and History in India'. Cambridge University Press.",
            url: "https://www.cambridge.org"
        },
        {
            title: "Central Relief Committee Records (1947–1950), National Archives of India, New Delhi",
            url: "http://nationalarchives.nic.in"
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ANIS_KIDWAI_DATA };
}
