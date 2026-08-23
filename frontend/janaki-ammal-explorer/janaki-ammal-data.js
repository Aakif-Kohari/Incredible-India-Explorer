/**
 * E. K. Janaki Ammal Explorer — Data Module
 * Comprehensive historical, cytogenetic, and botanical dataset documenting the life,
 * research, and legacy of Dr. Edavalath Kakkat Janaki Ammal (1897–1984).
 */

const JANAKI_DATA = {
    quickFacts: {
        fullName: "Dr. Edavalath Kakkat Janaki Ammal",
        lifespan: "4 November 1897 – 7 February 1984",
        birthplace: "Thalassery (Tellicherry), Kerala",
        primaryFields: ["Botany", "Cytogenetics", "Phytogeography", "Ethnobotany"],
        education: [
            "B.A. (Hons) Botany — Queen Mary's & Presidency College, Madras (1921)",
            "M.S. Botany — University of Michigan, USA (1925)",
            "D.Sc. Botany — University of Michigan, USA (1931)"
        ],
        keyPositions: [
            "Professor of Botany, Women's Christian College, Madras (1931–1932)",
            "Geneticist, Sugarcane Breeding Institute, Coimbatore (1932–1939)",
            "Cytogeneticist, John Innes Horticultural Institution, London (1940–1945)",
            "Cytogeneticist, Royal Horticultural Society, Wisley (1945–1951)",
            "Director-General, Botanical Survey of India (BSI) (1952–1959)",
            "Officer on Special Duty, Regional Research Laboratory, Jammu (1959–1962)",
            "Emeritus Scientist, Center for Advanced Study in Botany, Madras (1962–1984)"
        ],
        keyHonors: [
            "Fellow of the Indian Academy of Sciences (FASc, 1935)",
            "LL.D. (Honoris Causa), University of Michigan (1956)",
            "Fellow of the Indian National Science Academy (FNA, 1957)",
            "Padma Shri — Government of India (1977)",
            "E. K. Janaki Ammal National Award instituted by Ministry of Environment & Forests (1999)"
        ]
    },

    biographySections: [
        {
            id: "early-life",
            title: "Early Life & Academic Breakthroughs",
            subtitle: "Breaking Barriers in Colonial Academia",
            icon: "🎓",
            content: `Edavalath Kakkat Janaki Ammal was born in 1897 in Thalassery, Kerala, into a progressive family. Her father, Dewan Bahadur E. K. Krishnan, a sub-judge in the Madras Presidency, encouraged his daughters to pursue higher education. Janaki attended Sacred Heart Convent in Thalassery, followed by Queen Mary's College and Presidency College in Madras, where she earned an Honors degree in Botany in 1921.
            
            Recognizing her extraordinary aptitude, she was awarded the prestigious Barbour Scholarship to study at the University of Michigan in Ann Arbor, USA. She completed her Master's degree in 1925 and returned to Michigan as a Barbour Fellow to complete her Doctor of Science (D.Sc.) in 1931. Janaki Ammal was among the first Indian women to obtain a doctorate in Botany from an American university, establishing her place on the global scientific stage.`
        },
        {
            id: "sugarcane-breeding",
            title: "Sugarcane Cytogenetics & Hybridization",
            subtitle: "Sweetening India's Agricultural Economy",
            icon: "🌾",
            content: `In 1932, Janaki Ammal joined the Sugarcane Breeding Institute in Coimbatore as a geneticist. At the time, India imported high-sucrose sugarcane (*Saccharum officinarum*) from Java, which struggled in Indian climate conditions. Working alongside C. A. Barber and T. S. Venkatraman, Janaki conducted groundbreaking cytogenetic research to breed indigenous high-yield, disease-resistant hybrids.
            
            By analyzing chromosome polyploidy, she succeeded in creating interspecific and intergeneric crosses—most famously crossing *Saccharum officinarum* with *Saccharum spontaneum* (wild cane), as well as intergeneric hybrids with *Zea mays* (corn) and *Bambusa arundinacea* (bamboo). Her research unlocked polyploid breeding principles that revolutionized sugarcane agriculture, laying the foundation for India's self-sufficiency in sugar production.`
        },
        {
            id: "london-wisley",
            title: "London Years & The Chromosome Atlas",
            subtitle: "Co-authoring the Landmark Botanical Treatise",
            icon: "📖",
            content: `With the onset of World War II, Janaki Ammal relocated to England, joining the prestigious John Innes Horticultural Institution in London. Working with world-renowned geneticist C. D. Darlington, she co-authored the monumental work *'Chromosome Atlas of Cultivated Plants'* (1945), which cataloged chromosome numbers for over 10,000 cultivated species and served as an essential reference for plant breeders worldwide.
            
            From 1945 to 1951, she served as a cytogeneticist at the Royal Horticultural Society's gardens in Wisley. Here, her research focused on polyploidy in ornamental shrubs, particularly *Magnolia*. By treating *Magnolia stellata* with colchicine, she developed tetraploid variants and successfully hybridized them with *Magnolia kobus*. The Royal Horticultural Society named a delicate, white-flowered cultivar in her honor: **Magnolia kobus 'Janaki Ammal'**.`
        },
        {
            id: "bsi-reorganisation",
            title: "Reorganising Botanical Survey of India",
            subtitle: "Nehru's Call & National Science Building",
            icon: "🌿",
            content: `In 1951, Prime Minister Jawaharlal Nehru personally invited Dr. Janaki Ammal to return to India to reorganize the Botanical Survey of India (BSI). Accepting the call to national service, she was appointed Officer on Special Duty and subsequently Director-General of BSI in 1952.
            
            She restructured the BSI into regional stations (Dehradun, Coimbatore, Shillong, Pune, and Kolkata), established modern herbaria, and prioritized research into indigenous medicinal plants and flora of remote ecosystems. Her vision transformed botanical survey work from colonial specimen collection into an active, conservation-oriented scientific discipline.`
        },
        {
            id: "silent-valley",
            title: "Ethnobotany & Save Silent Valley",
            subtitle: "Championing India's Pristine Rainforests",
            icon: "🌲",
            content: `In her later years as Emeritus Scientist at the Center for Advanced Study in Botany, University of Madras, Janaki Ammal dedicated herself to ethnobotany and environmental protection. She documented the plant lore of indigenous tribes in the Western Ghats, researching native medicinal species like *Solanum* and *Dioscorea*.
            
            When the proposed Silent Valley Hydroelectric Project threatened to submerge one of India's last undisturbed evergreen tropical rainforests in Palakkad, Kerala, Dr. Janaki Ammal stood at the forefront of the 'Save Silent Valley' movement. Conducting rapid cytogenetic surveys of the region's rare flora, her scientific voice provided crucial evidence that helped convince the Government of India to abandon the dam and declare Silent Valley a National Park in 1984.`
        }
    ],

    sugarcaneHybrids: [
        {
            id: "saccharum-spontaneum",
            crossName: "Saccharum officinarum × Saccharum spontaneum",
            commonName: "Noble Cane × Wild Kans Grass",
            polyploidy: "Triploid / Tetraploid Hybrids",
            significance: "Infused wild vigor, drought tolerance, and mosaic virus resistance into sweet commercial cane.",
            impact: "Established the backbone of modern Indian commercial sugarcane varieties."
        },
        {
            id: "saccharum-zea",
            crossName: "Saccharum officinarum × Zea mays",
            commonName: "Sugarcane × Maize Intergeneric Hybrid",
            polyploidy: "Intergeneric Chromosome Pairing",
            significance: "Pioneered cross-tribe cereal hybridization, demonstrating evolutionary relationships between grass tribes.",
            impact: "Published in Nature (1938); reshaped global understanding of plant phylogenetics."
        },
        {
            id: "saccharum-bambusa",
            crossName: "Saccharum officinarum × Bambusa arundinacea",
            commonName: "Sugarcane × Bamboo Intergeneric Hybrid",
            polyploidy: "High Chromosome Polyploid Complex",
            significance: "Successfully crossed sugarcane with woody bamboo, exploring extreme structural rigidity traits.",
            impact: "A landmark achievement in intergeneric wide-crossing in plant genetics."
        },
        {
            id: "saccharum-erianthus",
            crossName: "Saccharum officinarum × Erianthus arundinaceus",
            commonName: "Sugarcane × Erianthus Wild Grass",
            polyploidy: "Aneuploid & Polyploid Lineages",
            significance: "Enhanced ratoon vigor, root depth, and adaptability to waterlogged and poor soils.",
            impact: "Widely used in breeding programs across tropical and subtropical regions."
        }
    ],

    chromosomeAtlasData: [
        {
            species: "Saccharum officinarum (Sugarcane)",
            category: "crop",
            chromosomeCount: "2n = 80",
            ploidy: "Octoploid (8x)",
            researchFocus: "Sucrose storage & polyploid breeding line identification."
        },
        {
            species: "Solanum melongena (Eggplant / Brinjal)",
            category: "medicinal",
            chromosomeCount: "2n = 24",
            ploidy: "Diploid (2x)",
            researchFocus: "Polyploid induction using colchicine to enhance alkaloid yield."
        },
        {
            species: "Magnolia kobus 'Janaki Ammal'",
            category: "ornamental",
            chromosomeCount: "2n = 76",
            ploidy: "Tetraploid (4x)",
            researchFocus: "Colchicine-induced polyploidy at Wisley Gardens, UK."
        },
        {
            species: "Rhododendron edgeworthii",
            category: "ornamental",
            chromosomeCount: "2n = 52 / 104",
            ploidy: "Diploid / Tetraploid Series",
            researchFocus: "Cytogeography of Himalayan flora and altitude adaptation."
        },
        {
            species: "Dioscorea deltoidea (Wild Yam)",
            category: "medicinal",
            chromosomeCount: "2n = 40",
            ploidy: "Tetraploid (4x)",
            researchFocus: "Diosgenin steroid precursor concentration analysis."
        },
        {
            species: "Cymbopogon martinii (Palmarosa Grass)",
            category: "medicinal",
            chromosomeCount: "2n = 20 / 40",
            ploidy: "Diploid / Tetraploid Races",
            researchFocus: "Essential oil yield correlation with chromosome duplication."
        }
    ],

    timelineEvents: [
        {
            year: "1897",
            title: "Birth in Thalassery",
            description: "Born on 4 November 1897 in Thalassery, Kerala, to Dewan Bahadur E. K. Krishnan."
        },
        {
            year: "1921",
            title: "B.A. Honors from Presidency College",
            description: "Graduated with Honors in Botany from Presidency College, Madras."
        },
        {
            year: "1925",
            title: "M.S. from University of Michigan",
            description: "Obtained M.S. degree as a Barbour Scholar at Ann Arbor, Michigan."
        },
        {
            year: "1931",
            title: "D.Sc. Degree & Return to India",
            description: "Completed Doctorate of Science (D.Sc.) at Michigan; appointed Professor at Women's Christian College."
        },
        {
            year: "1932–1939",
            title: "Sugarcane Breeding Institute, Coimbatore",
            description: "Pioneered cytogenetic research on sugarcane polyploidy and intergeneric hybrids."
        },
        {
            year: "1935",
            title: "Fellow of Indian Academy of Sciences",
            description: "Elected Foundation Fellow of the Indian Academy of Sciences (FASc)."
        },
        {
            year: "1940–1945",
            title: "John Innes Institution & Chromosome Atlas",
            description: "Co-authored 'Chromosome Atlas of Cultivated Plants' with C. D. Darlington in London."
        },
        {
            year: "1945–1951",
            title: "Wisley Gardens & Magnolia Cultivar",
            description: "Researched polyploidy in ornamentals; Royal Horticultural Society named Magnolia cultivar after her."
        },
        {
            year: "1952",
            title: "Reorganisation of Botanical Survey of India",
            description: "Invited by PM Jawaharlal Nehru; appointed Director-General of BSI to modernize national plant science."
        },
        {
            year: "1977",
            title: "Padma Shri Awarded",
            description: "Honored with the Padma Shri by the Government of India for distinguished service in Botany."
        },
        {
            year: "1978–1983",
            title: "Save Silent Valley Movement",
            description: "Led rapid botanical surveys of Silent Valley, helping preserve its virgin rainforest."
        },
        {
            year: "1984",
            title: "Passing & Enduring Legacy",
            description: "Passed away on 7 February 1984 while actively working at the Maduravoyal Botany Field Lab."
        }
    ],

    quizQuestions: [
        {
            id: 1,
            question: "Which university awarded Dr. Janaki Ammal her Doctor of Science (D.Sc.) degree in 1931?",
            options: [
                "University of Cambridge",
                "University of Michigan",
                "University of Oxford",
                "University of Madras"
            ],
            correctIndex: 1,
            explanation: "Dr. Janaki Ammal earned her D.Sc. from the University of Michigan, Ann Arbor, as a Barbour Fellow."
        },
        {
            id: 2,
            question: "Which landmark botanical reference book did Janaki Ammal co-author in 1945 with C. D. Darlington?",
            options: [
                "Flora of British India",
                "Chromosome Atlas of Cultivated Plants",
                "Genera Plantarum",
                "The Geography of Flowering Plants"
            ],
            correctIndex: 1,
            explanation: "'Chromosome Atlas of Cultivated Plants' (1945) cataloged chromosome numbers of over 10,000 species."
        },
        {
            id: 3,
            question: "At which institute in India did Dr. Janaki Ammal conduct her famous sugarcane cytogenetics research?",
            options: [
                "Sugarcane Breeding Institute, Coimbatore",
                "Indian Agricultural Research Institute, Delhi",
                "National Botanical Research Institute, Lucknow",
                "Forest Research Institute, Dehradun"
            ],
            correctIndex: 0,
            explanation: "She worked at the Sugarcane Breeding Institute in Coimbatore from 1932 to 1939."
        },
        {
            id: 4,
            question: "Which environmental protection movement in Kerala did Dr. Janaki Ammal actively support through her botanical surveys?",
            options: [
                "Chipko Movement",
                "Appiko Movement",
                "Save Silent Valley Movement",
                "Narmada Bachao Andolan"
            ],
            correctIndex: 2,
            explanation: "Her scientific surveys provided crucial evidence that saved the Silent Valley tropical rainforest from submersion."
        },
        {
            id: 5,
            question: "Which ornamental flower cultivar was named in her honor by the Royal Horticultural Society?",
            options: [
                "Rosa 'Janaki Ammal'",
                "Magnolia kobus 'Janaki Ammal'",
                "Rhododendron 'Janaki Ammal'",
                "Orchis 'Janaki Ammal'"
            ],
            correctIndex: 1,
            explanation: "The Royal Horticultural Society at Wisley named the tetraploid cultivar Magnolia kobus 'Janaki Ammal' after her."
        }
    ],

    sources: [
        {
            title: "Botanical Survey of India Archives — Historical Profile of Dr. E. K. Janaki Ammal",
            url: "https://bsi.gov.in"
        },
        {
            title: "Chromosome Atlas of Cultivated Plants (C. D. Darlington & E. K. Janaki Ammal, 1945)",
            url: "https://archive.org"
        },
        {
            title: "Indian Academy of Sciences — Lives and Innovations of Indian Scientists",
            url: "https://www.ias.ac.in"
        },
        {
            title: "Sugarcane Breeding Institute (ICAR-SBI) Historical Milestones",
            url: "https://sugarcane.icar.gov.in"
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { JANAKI_DATA };
}
