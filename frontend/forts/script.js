// ==========================================================================
// INDIAN FORTS EXPLORER - JAVASCRIPT
// ==========================================================================

// Fort Data
const fortsData = [
    {
        id: 1,
        name: "Red Fort",
        location: "Delhi",
        state: "Delhi",
        built: "1639-1648",
        builtBy: "Emperor Shah Jahan",
        era: "Mughal Era",
        architecture: "Mughal Architecture",
        image: "../../assets/red_fort.png",
        history: "The Red Fort, also known as Lal Qila, is a historic fort in the city of Delhi in India. It served as the main residence of the Mughal Emperors for nearly 200 years. The fort is named for its massive enclosing walls of red sandstone. It was commissioned by Emperor Shah Jahan in 1639 when he decided to shift his capital from Agra to Delhi.",
        highlights: [
            "UNESCO World Heritage Site",
            "Largest monument in Old Delhi",
            "Hosts India's Independence Day celebrations",
            "Features Diwan-i-Aam and Diwan-i-Khas",
            "Intricate marble inlay work"
        ]
    },
    {
        id: 2,
        name: "Amer Fort",
        location: "Amer, Jaipur",
        state: "Rajasthan",
        built: "1592",
        builtBy: "Raja Man Singh I",
        era: "Rajput Era",
        architecture: "Rajput-Mughal Architecture",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Amber_Fort_05.jpg/800px-Amber_Fort_05.jpg",
        history: "Amer Fort, also known as Amber Fort, is located in Amer, Rajasthan. It is one of the most famous forts in Rajasthan and is known for its artistic Hindu style elements. The fort was built by Raja Man Singh I in 1592. It is situated on a hill and is a major tourist attraction in the Jaipur area.",
        highlights: [
            "UNESCO World Heritage Site",
            "Sheesh Mahal (Mirror Palace)",
            "Elephant ride to the fort entrance",
            "Beautiful frescoes and paintings",
            "Maota Lake at the foothills"
        ]
    },
    {
        id: 3,
        name: "Golconda Fort",
        location: "Hyderabad",
        state: "Telangana",
        built: "11th-16th Century",
        builtBy: "Kakatiya & Qutb Shahi Dynasties",
        era: "Medieval Era",
        architecture: "Indo-Islamic Architecture",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Golconda_Fort_005.jpg/800px-Golconda_Fort_005.jpg",
        history: "Golconda Fort is a fortified citadel and an early capital city of the Qutb Shahi dynasty. The fort was originally built by the Kakatiya dynasty but was later expanded by the Qutb Shahi kings. It is famous for its acoustic architecture, where a hand clap at the entrance can be heard at the highest point.",
        highlights: [
            "Famous for acoustic architecture",
            "Diamond trade center in ancient times",
            "Fateh Rahben gun",
            "Eight gates with impressive designs",
            "Water supply system with Persian wheels"
        ]
    },
    {
        id: 4,
        name: "Mehrangarh Fort",
        location: "Jodhpur",
        state: "Rajasthan",
        built: "1459",
        builtBy: "Rao Jodha",
        era: "Rajput Era",
        architecture: "Rajput Architecture",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Mehrangarh_Fort%2C_Jodhpur.jpg/800px-Mehrangarh_Fort%2C_Jodhpur.jpg",
        history: "Mehrangarh Fort is one of the largest forts in India, located in Jodhpur, Rajasthan. It was built by Rao Jodha in 1459. The fort is situated 410 feet above the city and is enclosed by imposing thick walls. Inside its boundaries there are several palaces known for their intricate carvings and expansive courtyards.",
        highlights: [
            "One of the largest forts in India",
            "Seven gates with distinct designs",
            "Moti Mahal (Pearl Palace)",
            "Phool Mahal (Flower Palace)",
            "Museum with royal artifacts"
        ]
    },
    {
        id: 5,
        name: "Jaisalmer Fort",
        location: "Jaisalmer",
        state: "Rajasthan",
        built: "1156",
        builtBy: "Rawal Jaisal",
        era: "Rajput Era",
        architecture: "Rajput Architecture",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Jaisalmer_forteresse.jpg/800px-Jaisalmer_forteresse.jpg",
        history: "Jaisalmer Fort, also known as Sonar Qila or Golden Fort, is one of the largest fully preserved fortified cities in the world. It was built by Rawal Jaisal in 1156. The fort stands amidst the golden sands of the Thar Desert on Trikuta Hill. It is a living fort with about 3,000 people residing within its walls.",
        highlights: [
            "UNESCO World Heritage Site",
            "Living fort with residents",
            "Golden sandstone architecture",
            "99 bastions for defense",
            "Jain temples within the fort"
        ]
    },
    {
        id: 6,
        name: "Chittorgarh Fort",
        location: "Chittorgarh",
        state: "Rajasthan",
        built: "7th Century",
        builtBy: "Chitrangada Mori",
        era: "Rajput Era",
        architecture: "Rajput Architecture",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Chittorgarh_Fort.jpg/800px-Chittorgarh_Fort.jpg",
        history: "Chittorgarh Fort is one of the largest forts in India and a UNESCO World Heritage Site. It was the capital of Mewar and is known for the heroic tales of Rajput warriors, particularly Rani Padmini and Maharana Pratap. The fort has witnessed three major sieges and numerous battles.",
        highlights: [
            "UNESCO World Heritage Site",
            "Largest fort in India by area",
            "Vijay Stambha (Victory Tower)",
            "Kirti Stambha (Tower of Fame)",
            "Rani Padmini's Palace"
        ]
    },
    {
        id: 7,
        name: "Gwalior Fort",
        location: "Gwalior",
        state: "Madhya Pradesh",
        built: "8th Century",
        builtBy: "Suraj Sen",
        era: "Medieval Era",
        architecture: "Indo-Islamic Architecture",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Gwalior_Fort_front.jpg/800px-Gwalior_Fort_front.jpg",
        history: "Gwalior Fort is a hill fort near Gwalior, Madhya Pradesh. The fort has been controlled by many different rulers over its history, including the Tomars, Mughals, and Marathas. It is known for its impressive architecture and the intricate carvings on the walls of the fort.",
        highlights: [
            "One of the most impregnable forts in India",
            "Man Singh Palace with beautiful tiles",
            "Teli ka Mandir temple",
            "Gujari Mahal built for Queen Mrignayani",
            "Scenic view from the hilltop"
        ]
    },
    {
        id: 8,
        name: "Kangra Fort",
        location: "Kangra",
        state: "Himachal Pradesh",
        built: "4th Century BC",
        builtBy: "Katoch Dynasty",
        era: "Ancient Era",
        architecture: "Himalayan Architecture",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Kangra_Fort_%2CHimachal_Pradesh_06.jpg/800px-Kangra_Fort_%2CHimachal_Pradesh_06.jpg",
        history: "Kangra Fort is located in the Kangra district of Himachal Pradesh. It is the largest fort in the Himalayas and probably the oldest dated fort in India. The fort was built by the Katoch dynasty and has been mentioned in the Mahabharata and Alexander's records.",
        highlights: [
            "Oldest fort in the Himalayas",
            "Mentioned in Mahabharata",
            "Survived numerous earthquakes",
            "Beautiful views of Dhauladhar range",
            "Temples within the fort complex"
        ]
    },
    {
        id: 9,
        name: "Junagarh Fort",
        location: "Bikaner",
        state: "Rajasthan",
        built: "1589-1594",
        builtBy: "Raja Rai Singh",
        era: "Rajput Era",
        architecture: "Rajput-Mughal Architecture",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/India_Bikaner_Junagarh_Fort.jpg/800px-India_Bikaner_Junagarh_Fort.jpg",
        history: "Junagarh Fort is located in Bikaner, Rajasthan. Unlike most other forts in Rajasthan, this fort was built on ground level and not on a hilltop. It was built by Raja Rai Singh in 1589. The fort complex consists of palaces, temples, and pavilions with beautiful carvings and artwork.",
        highlights: [
            "Built on ground level (unique in Rajasthan)",
            "37 bastions for defense",
            "Karan Mahal with gold paintings",
            "Anup Mahal with mirror work",
            "Har Mandir temple"
        ]
    },
    {
        id: 10,
        name: "Pratapgad Fort",
        location: "Mahabaleshwar",
        state: "Maharashtra",
        built: "1656",
        builtBy: "Chhatrapati Shivaji Maharaj",
        era: "Maratha Era",
        architecture: "Maratha Architecture",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Pratapgad_The_Fort_of_Valour.jpg/800px-Pratapgad_The_Fort_of_Valour.jpg",
        history: "Pratapgad Fort is a mountain fort built in 1656 by Chhatrapati Shivaji Maharaj. It is famous for the historic battle between Shivaji and Afzal Khan. The fort is divided into two parts: the upper fort and the lower fort, with a temple of Mahadev in the upper fort.",
        highlights: [
            "Site of historic Shivaji-Afzal Khan battle",
            "Built in just 2 months",
            "Statue of Chhatrapati Shivaji Maharaj",
            "Bhavani Temple in upper fort",
            "Scenic views of the Sahyadri range"
        ]
    },
    {
        id: 11,
        name: "Raigad Fort",
        location: "Raigad",
        state: "Maharashtra",
        built: "1656",
        builtBy: "Chhatrapati Shivaji Maharaj",
        era: "Maratha Era",
        architecture: "Maratha Architecture",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Nagarkhana%2C_Raigad_Fort%2C_India.jpg/800px-Nagarkhana%2C_Raigad_Fort%2C_India.jpg",
        history: "Raigad Fort was the capital of the Maratha Empire under Chhatrapati Shivaji Maharaj. He captured this fort in 1656 and made it his capital in 1674 when he was crowned as the Chhatrapati. The fort is located on a hilltop and has several important structures including the coronation site.",
        highlights: [
            "Capital of Maratha Empire",
            "Coronation site of Chhatrapati Shivaji",
            "Samadhi of Chhatrapati Shivaji Maharaj",
            "Rajya Sabha (Royal Court)",
            "Takes 1400 steps to reach the top"
        ]
    },
    {
        id: "rohtasgarh-fort",
        name: "Rohtasgarh Fort",
        location: "Rohtas",
        state: "Bihar",
        built: "16th Century (Sher Shah Suri)",
        builtBy: "Sher Shah Suri / Raja Man Singh",
        era: "Medieval Era",
        architecture: "Afghan-Mughal Architecture",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
        history: "One of eastern India's largest hill forts, perched on the Kaimur plateau and known for its massive gateways and rich medieval history as Sher Shah Suri's stronghold.",
        highlights: [
            "Largest hill fort in eastern India",
            "Massive gateways",
            "Sher Shah Suri's stronghold",
            "Man Singh's palaces"
        ],
        customUrl: "rohtasgarh-fort.html"},{
        id: "fort-william",
        name: "Fort William",
        location: "Kolkata",
        state: "West Bengal",
        built: "1696-1702 / Rebuilt 1757-1773",
        builtBy: "British East India Company",
        era: "Colonial Era",
        architecture: "British Colonial Architecture",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
        history: "The historic British fort on the Hooghly river, seat of the East India Company in Bengal, built after the Battle of Plassey and still an active military establishment.",
        highlights: [
            "Active military establishment",
            "Built by Robert Clive",
            "Octagonal star fortress",
            "Overlooks the Maidan"
        ],
        customUrl: "fort-william.html"},{
        id: "bidar-fort",
        name: "Bidar Fort",
        location: "Bidar",
        state: "Karnataka",
        built: "1427 (Bahmani Capital)",
        builtBy: "Sultan Ahmad Shah Wali",
        era: "Bahmani Era",
        architecture: "Indo-Persian Architecture",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
        history: "The Persian-inspired capital of the Bahmani Sultanate, famed for its triple moats, glazed-tile Rangin Mahal palace, and majestic gateways.",
        highlights: [
            "Triple-moat defence system",
            "Rangin Mahal glazed tiles",
            "Solah Khamba Mosque",
            "Bahmani Sultanate capital"
        ],
        customUrl: "bidar-fort.html"},{
        id: "chitradurga-fort",
        name: "Chitradurga Fort",
        location: "Chitradurga",
        state: "Karnataka",
        built: "11th-18th Century",
        builtBy: "Nayakas of Chitradurga",
        era: "Vijayanagara Era",
        architecture: "Hill Fort Architecture",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
        history: "The 'Kallina Kote' (Stone Fort), one of India's greatest hill forts, famous for its massive stone fortifications, seven concentric walls, and the heroic legend of Onake Obavva.",
        highlights: [
            "Seven concentric stone walls",
            "Legend of Onake Obavva",
            "Interlocking granite boulders",
            "Hidden passages & gateways"
        ],
        customUrl: "chitradurga-fort.html"},{
        id: "st-angelo-fort",
        name: "St. Angelo Fort",
        location: "Kannur",
        state: "Kerala",
        built: "1505",
        builtBy: "Francisco de Almeida (Portuguese)",
        era: "Colonial Era",
        architecture: "Portuguese Colonial Architecture",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        history: "The oldest Portuguese fort in India, built in 1505 and later held by the Dutch and British, offering spectacular views of the Arabian Sea.",
        highlights: [
            "Oldest Portuguese fort in India",
            "Built in 1505 by De Almeida",
            "Laterite stone ramparts",
            "Kannur Lighthouse views"
        ],
        customUrl: "st-angelo-fort.html"},{
        id: "tiruchirappalli-rock-fort",
        name: "Tiruchirappalli Rock Fort",
        location: "Tiruchirappalli",
        state: "Tamil Nadu",
        built: "6th Century CE (Pallava) onwards",
        builtBy: "Pallavas / Madurai Nayakas",
        era: "Medieval Era",
        architecture: "Dravidian Rock-Cut Architecture",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
        history: "An iconic fort built on one of the world's oldest rock formations (3.8 billion years), famed for its ancient cave temples and panoramic views of the Kaveri delta.",
        highlights: [
            "3.8-billion-year-old rock",
            "437 steps to the summit",
            "Ucchi Pillayar Temple",
            "Panoramic Kaveri delta views"
        ],
        customUrl: "tiruchirappalli-rock-fort.html"},
       { id: "vellore-fort",
        name: "Vellore Fort",
        location: "Vellore",
        state: "Tamil Nadu",
        built: "16th Century",
        builtBy: "Vijayanagara Empire",
        era: "Vijayanagara Era",
        architecture: "Vijayanagara Military Architecture",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
        history: "One of the finest surviving examples of military architecture in South India, famed for its massive granite ramparts, crocodile-filled moat, and the historic Vellore Mutiny of 1806.",
        highlights: [
            "First sepoy uprising of 1806",
            "Jalakandeswarar Temple",
            "Crocodile moat & double ramparts",
            "Imprisoned Tipu Sultan's family"
        ],
        customUrl: "vellore-fort.html"},
        {id: "vijaydurg-fort",
        name: "Vijaydurg Fort",
        location: "Devgad",
        state: "Maharashtra",
        built: "12th Century (Rebuilt 1653)",
        builtBy: "Shilahara Dynasty / Chhatrapati Shivaji Maharaj",
        era: "Maratha Era",
        architecture: "Coastal Maratha Architecture",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
        history: "One of the oldest sea forts on the Konkan coast, the 'Gibraltar of the East' served as the most formidable naval base of the Maratha Empire under Kanhoji Angre.",
        highlights: [
            "Gibraltar of the East",
            "Major Maratha naval base",
            "Hidden 1.4 km underwater wall",
            "Kanhoji Angre's headquarters"
        ],
 customUrl: "vijaydurg-fort.html"
    },
    {
        id: "ranthambore-fort",
        name: "Ranthambore Fort",
        location: "Sawai Madhopur",
        state: "Rajasthan",
        built: "10th Century",
        builtBy: "Chauhan (Chahamana) Dynasty",
        era: "Rajput Era",
        architecture: "Rajput Hill Fort Architecture",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
        history: "An ancient hill fort standing inside Ranthambore National Park, famous for its Trinetra Ganesh Temple, its role in the sieges of medieval Rajasthan, and its unique setting within a tiger reserve.",
        highlights: [
            "UNESCO World Heritage Site",
            "Located inside a tiger reserve",
            "Trinetra Ganesh Temple",
            "Site of Alauddin Khilji's 1301 siege"
        ],
        customUrl: "ranthambore-fort.html"
    },    {
        id: "gagron-fort",
        name: "Gagron Fort",
        location: "Jhalawar",
        state: "Rajasthan",
        built: "7th-14th Century",
        builtBy: "Dod Rajputs / Khichi Chauhan Dynasty",
        era: "Rajput Era",
        architecture: "Rajput Hill-and-Water Fort Architecture",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        history: "A rare hill-and-water fort at the confluence of the Kali Sindh and Ahu rivers, encircled by water on three sides and needing no moat, later recognised as a UNESCO World Heritage Site.",
        highlights: [
            "UNESCO World Heritage Site",
            "Only fort in Rajasthan without a moat",
            "Surrounded by two rivers",
            "Site of two historic jauhars"
        ],
        customUrl: "gagron-fort.html"
    },
    {
        id: 12,
        name: "Srirangapatna Fort",        location: "Srirangapatna",
        state: "Karnataka",
        built: "15th Century",
        builtBy: "Tipu Sultan",
        era: "Mysore Era",
        architecture: "Indo-Islamic Architecture",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Gopuram_of_the_Ranganathaswamy_Temple%2C_Srirangapatna_Karnataka_India.jpg/800px-Gopuram_of_the_Ranganathaswamy_Temple%2C_Srirangapatna_Karnataka_India.jpg",
        history: "Srirangapatna Fort is located in the Mandya district of Karnataka. It was built by the Feudal lords under the Vijayanagara Empire and later strengthened by Tipu Sultan. The fort witnessed the historic Battle of Srirangapatna in 1799 where Tipu Sultan died fighting the British.",
        highlights: [
            "Site of Tipu Sultan's final battle",
            "Tipu's Summer Palace (Dariya Daulat Bagh)",
            "Gumbaz (Tipu's mausoleum)",
            "Sriranganathaswamy Temple",
"Located on an island in River Kaveri"
        ]
    },
    {
        id: "nahargarh-fort",
        name: "Nahargarh Fort",
        location: "Jaipur",
        state: "Rajasthan",
        built: "1734 (expanded 1868)",
        builtBy: "Sawai Jai Singh II",
        era: "Kachwaha Era",
        architecture: "Rajput-Indo-European Architecture",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
        history: "Nahargarh Fort was built in 1734 by Sawai Jai Singh II as part of Jaipur's defense ring alongside Amer and Jaigarh forts, and was later expanded in 1868 by Sawai Ram Singh. Perched on a ridge overlooking the city, it is famed for the Madhavendra Bhawan palace and panoramic sunset views of the Pink City.",
        highlights: [
            "Part of Jaipur's triangular defense system with Amer and Jaigarh forts",
            "Madhavendra Bhawan with nine identical queens' suites",
            "Popular sunset viewpoint over Jaipur",
            "Linked to the legend of Nahar Singh Bhomia",
            "Featured in films including Rang De Basanti"
        ],
        customUrl: "nahargarh-fort.html"
    },
        {
        id: "jaigarh-fort",
        name: "Jaigarh Fort",
        location: "Jaipur",
        state: "Rajasthan",
        built: "1726",
        builtBy: "Sawai Jai Singh II",
        era: "Kachwaha Era",
        architecture: "Rajput Military Architecture",
        image: "https://images.unsplash.com/photo-1590716179555-8c8a9dc5c6d9?w=800&q=80",
        history: "Jaigarh Fort was built in 1726 by Sawai Jai Singh II to strengthen the defences of Amer Fort and house the state's cannon foundry. Perched on Cheel ka Teela in the Aravalli hills, it was never conquered in battle and is famed for the Jaivana Cannon, the largest cannon on wheels in the world.",
        highlights: [
            "Houses the Jaivana Cannon, the world's largest cannon on wheels",
            "Connected to Amer Fort by underground passages",
            "One of Asia's few surviving cannon foundries",
            "Never captured in battle",
            "Panoramic views from the Diya Burj watchtower"
        ],
        customUrl: "jaigarh-fort.html"
    },
        {
        id: "kumbhalgarh-fort",
        name: "Kumbhalgarh Fort",
        location: "Kumbhalgarh",
        state: "Rajasthan",
        built: "15th Century (c. 1443-1458 CE)",
        builtBy: "Rana Kumbha",
        era: "Mewar Era",
        architecture: "Rajput Hill Fort Architecture",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        history: "Kumbhalgarh Fort was built in the 15th century by Rana Kumbha of Mewar and is best known for its massive fortification wall, often called the Great Wall of India, stretching roughly 36 kilometres across the Aravalli hills. It is the birthplace of Maharana Pratap and was breached only once in its history.",
        highlights: [
            "UNESCO World Heritage Site (Hill Forts of Rajasthan, 2013)",
            "One of the longest continuous walls in the world",
            "Birthplace of Maharana Pratap",
            "Badal Mahal (Cloud Palace)",
            "Over 300 temples within the fort walls"
        ],
        customUrl: "kumbhalgarh-fort.html"
    },
        {
        id: "agra-fort",
        name: "Agra Fort",
        location: "Agra",
        state: "Uttar Pradesh",
        built: "1565-1573 CE",
        builtBy: "Emperor Akbar",
        era: "Mughal Era",
        architecture: "Mughal Architecture",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
        history: "Agra Fort is a massive red sandstone fortress on the banks of the Yamuna river, rebuilt by Emperor Akbar from 1565 and later enriched with white marble palaces by Jahangir and Shah Jahan. It served as the main residence of the Mughal emperors until the capital moved to Delhi in 1638, and is where Shah Jahan was later imprisoned by his son Aurangzeb.",
        highlights: [
            "UNESCO World Heritage Site since 1983",
            "Musamman Burj - where Shah Jahan was imprisoned",
            "Sheesh Mahal (Mirror Palace)",
            "Moti Masjid (Pearl Mosque)",
            "Distant view of the Taj Mahal"
        ],
        customUrl: "agra-fort.html"
    },    {
        id: 13,
        name: "Rajgad Fort",
        location: "Pune",
        state: "Maharashtra",
        built: "1647 (expanded)",
        builtBy: "Chhatrapati Shivaji Maharaj",
        era: "Maratha Era",
        architecture: "Maratha Architecture",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
        history: "Rajgad, known as the King of Forts, served as the first capital of the Maratha Empire under Chhatrapati Shivaji Maharaj for nearly 26 years. Its trident-shaped plan of three fortified machis radiating from the central Balekilla citadel made it one of the most defensible strongholds of its time, before the capital shifted to Raigad Fort in 1674.",
        highlights: [
            "First capital of the Maratha Empire",
            "Three fortified machis: Padmavati, Suvela, Sanjeevani",
            "Balekilla citadel reached via the Maha Darwaja",
            "Birthplace of Rajaram, Shivaji's son",
            "Popular trekking destination near Pune"
        ],
        explorerUrl: "../rajgad-fort-explorer/index.html"
    },
    {
        id: 14,
        name: "Shivneri Fort",
        location: "Junnar, Pune",
        state: "Maharashtra",
        built: "12th–14th century (Yadava era)",
        builtBy: "Yadavas of Devagiri",
        era: "Yadava / Maratha Era",
        architecture: "Deccan Hill Fort Architecture",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
        history: "Shivneri Fort is revered as the birthplace of Chhatrapati Shivaji Maharaj, born here on 19 February 1630 while his mother Jijabai sheltered at the hilltop stronghold. Originally fortified by the Yadavas of Devagiri, the fort later passed through Bahmani and Nizamshahi hands before being granted to Maloji Bhosale, Shivaji's grandfather, in 1595 — beginning its enduring Maratha legacy.",
        highlights: [
            "Birthplace of Chhatrapati Shivaji Maharaj (1630)",
            "Seven fortified gates built in a defensive zigzag pattern",
            "Shiv Kunj memorial and the original birth chamber",
            "Ancient Badami Talav stone water reservoir",
            "400–500 step climb through Junnar's Sahyadri hills"
        ],
        explorerUrl: "../shivneri-fort-explorer/index.html"
    },
   
    {
        id: 14,
        name: "Sindhudurg Fort",
        location: "Malvan, Sindhudurg",
        state: "Maharashtra",
        built: "1664-1667",
        builtBy: "Chhatrapati Shivaji Maharaj",
        era: "Maratha Era",
        architecture: "Maratha Sea Fort Architecture",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Sindhudurg%20Fort.jpg",
        history: "Sindhudurg Fort is a formidable sea fort built by Chhatrapati Shivaji Maharaj on a rocky island off the coast of Malvan to strengthen the Maratha Navy and secure the Konkan coastline against European and Siddi naval powers. Constructed between 1664 and 1667 under the supervision of chief engineer Hiroji Indulkar, the fort spans nearly 48 acres and is enclosed by a massive stone wall roughly 3 km long, built to withstand relentless sea waves. It played a central role in establishing Maratha naval dominance and remains one of the best-preserved sea forts in India, still housing a temple dedicated to Shivaji Maharaj and the imprint of his hand and foot preserved in a shrine within the fort.",
        highlights: [
            "One of India's most important historic sea forts",
            "Massive 3 km stone wall designed to withstand sea waves",
            "Built to strengthen Maratha naval power against Europeans and Siddis",
            "Shrine preserving Shivaji Maharaj's handprint and footprint",
            "Accessible by ferry from Malvan; a major coastal heritage attraction"
        ]},
    {
        id: 13,
        name: "Daulatabad Fort",
        location: "Daulatabad, near Aurangabad",
        state: "Maharashtra",
        built: "c. 1187 (fortifications expanded 14th–16th century)",
        builtBy: "Bhillama V (Yadava Dynasty)",
        era: "Yadava Era",
        architecture: "Deccan Hill Fort / Indo-Islamic",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Daulatabad%20Fort%20a%20view.JPG",
        history: "Originally known as Devagiri, this near-impregnable hill fort briefly served as the capital of the entire Delhi Sultanate under Muhammad bin Tughlaq in 1327. Famous for its rock-cut moat, dark defensive tunnel, and the towering Chand Minar.",
        highlights: [
            "Rock-cut moat once filled with crocodiles",
            "Pitch-black defensive tunnel (Andheri)",
            "63-metre Chand Minar tower",
            "Briefly capital of the Delhi Sultanate (1327)",
            "Considered one of India's most impregnable forts"
        ],
        explorerUrl: "../daulatabad-fort-explorer/index.html"
    },
    {
        id: "allahabad-fort",
        name: "Allahabad Fort",
        location: "Prayagraj",
        state: "Uttar Pradesh",
        built: "1583",
        builtBy: "Emperor Akbar",
        era: "Mughal Era",
        architecture: "Mughal Architecture",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
        history: "A massive fort built by Emperor Akbar at the confluence of the Ganga and Yamuna rivers. It is the largest fort built by Akbar and features the famous Ashoka Pillar and the Akshaya Vat tree.",
        highlights: [
            "Built at the Triveni Sangam",
            "Contains a 3rd century BC Ashoka Pillar",
            "Akshaya Vat (immortal banyan tree)",
            "Currently used by the Indian Army"
        ],
        explorerUrl: "../allahabad-fort/index.html"
    },
    {
        id: "asirgarh-fort",
        name: "Asirgarh Fort",
        location: "Burhanpur",
        state: "Madhya Pradesh",
        built: "15th Century",
        builtBy: "Asa Ahir",
        era: "Medieval Era",
        architecture: "Indo-Islamic Architecture",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
        history: "Known as the 'Key to the Deccan', Asirgarh Fort is an impenetrable fortress situated in the Satpura Range. It controlled the major trade routes between northern India and the Deccan plateau.",
        highlights: [
            "Known as 'Key to the Deccan'",
            "Three-tiered defensive structure",
            "Gupteshwar Mahadev Temple",
            "Jami Masjid with intricate minarets"
        ],
        explorerUrl: "../asirgarh-fort-explorer/index.html"
    },
    {
        id: "bahu-fort",
        name: "Bahu Fort",
        location: "Jammu",
        state: "Jammu and Kashmir",
        built: "3000 years ago (rebuilt 19th C)",
        builtBy: "Raja Bahulochan",
        era: "Ancient / Dogra Era",
        architecture: "Rajput-Dogra Architecture",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        history: "An ancient fort situated on the banks of the Tawi River. It houses the revered Bawe Wali Mata temple dedicated to the goddess Kali, making it a major pilgrimage center.",
        highlights: [
            "Overlooks the Tawi River",
            "Famous Bawe Wali Mata Temple",
            "Terraced Bagh-e-Bahu gardens",
            "One of the oldest structures in Jammu"
        ],
        customUrl: "bahu-fort.html"
    },
    {
        id: "bekal-sea-fort",
        name: "Bekal Fort",
        location: "Kasaragod",
        state: "Kerala",
        built: "1650",
        builtBy: "Shivappa Nayaka",
        era: "Nayaka Era",
        architecture: "Coastal Military Architecture",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
        history: "The largest fort in Kerala, built entirely for defense rather than administration. It features a unique keyhole shape and observation towers offering spectacular views of the Arabian Sea.",
        highlights: [
            "Largest fort in Kerala",
            "Unique keyhole shape",
            "Zigzag entrance and observation towers",
            "Excellent views of the Arabian Sea"
        ],
        customUrl: "bekal-sea-fort.html"
    },
    {
        id: "bhongir-fort",
        name: "Bhongir Fort",
        location: "Bhuvanagiri",
        state: "Telangana",
        built: "10th Century",
        builtBy: "Tribhuvanamalla Vikramaditya VI",
        era: "Chalukya Era",
        architecture: "Rock-cut Hill Fort Architecture",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
        history: "An impressive fort built upon a single, massive monolithic rock. The unique egg-shaped monolithic rock provides a natural defense, rising nearly 500 feet above the surrounding terrain.",
        highlights: [
            "Built on a monolithic egg-shaped rock",
            "Secret underground chambers",
            "Associated with the legend of Rani Rudrama Devi",
            "Steep and challenging trekking path"
        ],
        explorerUrl: "../bhongir-fort/index.html"
    },
    {
        id: "chandragiri-fort",
        name: "Chandragiri Fort",
        location: "Tirupati",
        state: "Andhra Pradesh",
        built: "11th Century",
        builtBy: "Yadava Rulers",
        era: "Vijayanagara Era",
        architecture: "Indo-Sarcenic Architecture",
        image: "https://images.unsplash.com/photo-1590716179555-8c8a9dc5c6d9?w=800&q=80",
        history: "Served as the 4th capital of the Vijayanagara Empire. The Raja Mahal and Rani Mahal within the fort are excellent examples of Indo-Sarcenic architecture devoid of any timber usage.",
        highlights: [
            "4th capital of Vijayanagara Empire",
            "Raja Mahal built entirely of stone and brick",
            "No wood used in construction",
            "Sound and light show"
        ],
        customUrl: "chandragiri-fort.html"
    },
    {
        id: "devikot-fort",
        name: "Devikot Fort",
        location: "Devikot",
        state: "Rajasthan",
        built: "15th Century",
        builtBy: "Rajput Rulers",
        era: "Rajput Era",
        architecture: "Desert Fort Architecture",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
        history: "A historically significant fort located in the Thar desert. While smaller than Jaisalmer, it played a crucial role in guarding trade routes and protecting local settlements.",
        highlights: [
            "Strategic desert stronghold",
            "Guarded ancient trade routes",
            "Traditional Rajput architecture",
            "Historical battleground"
        ],
        customUrl: "devikot-fort.html"
    },
    {
        id: "diu-fort",
        name: "Diu Fort",
        location: "Diu",
        state: "Daman and Diu",
        built: "1535",
        builtBy: "Portuguese Colonists",
        era: "Colonial Era",
        architecture: "Portuguese Military Architecture",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        history: "A massive sea fort built by the Portuguese during their colonial rule. It features a double moat and cannon placements that guarded the strategic maritime trade route.",
        highlights: [
            "Portuguese colonial architecture",
            "Double moat defense system",
            "Lighthouse offering panoramic views",
            "Collection of iron cannons"
        ],
        customUrl: "diu-fort.html"
    },
    {
        id: "gingee-fort",
        name: "Gingee Fort",
        location: "Villupuram",
        state: "Tamil Nadu",
        built: "9th-16th Century",
        builtBy: "Chola / Vijayanagara Empire",
        era: "Vijayanagara / Maratha Era",
        architecture: "Dravidian Military Architecture",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
        history: "Dubbed the 'Troy of the East' by the British, Gingee Fort spans three hillocks and features an incredibly strong defensive layout that thwarted many sieges.",
        highlights: [
            "Called 'Troy of the East'",
            "Spans three massive hillocks",
            "Kalyana Mahal (Marriage Hall)",
            "Extensive defensive walls"
        ],
        explorerUrl: "../gingee-fort-explorer/index.html"
    },
    {
        id: "jhansi-fort",
        name: "Jhansi Fort",
        location: "Jhansi",
        state: "Uttar Pradesh",
        built: "1613",
        builtBy: "Bir Singh Ju Deo",
        era: "Bundela / Maratha Era",
        architecture: "Bundela Architecture",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
        history: "A symbol of bravery and resistance, Jhansi Fort is inextricably linked to Rani Lakshmibai and her heroic stand against the British during the 1857 Rebellion.",
        highlights: [
            "Linked to Rani Lakshmibai",
            "Karak Bijli Cannon",
            "Site of the 1857 Rebellion siege",
            "Rani Mahal nearby"
        ],
        explorerUrl: "../jhansi-fort/index.html"
    },
    {
        id: "kalinjar-fort",
        name: "Kalinjar Fort",
        location: "Banda",
        state: "Uttar Pradesh",
        built: "10th Century",
        builtBy: "Chandela Dynasty",
        era: "Chandela Era",
        architecture: "Hindu Temple & Fort Architecture",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
        history: "An ancient and strategically vital fort in the Bundelkhand region. It contains numerous ancient temples, including the famous Neelkanth Mahadev Temple, and survived many sieges.",
        highlights: [
            "Neelkanth Mahadev Temple",
            "Numerous rock-cut sculptures",
            "Guarded the Bundelkhand region",
            "Never fully conquered in its prime"
        ],
        explorerUrl: "../kalinjar-fort/index.html"
    },
    {
        id: "kangla-fort",
        name: "Kangla Fort",
        location: "Imphal",
        state: "Manipur",
        built: "1632 (Earliest records)",
        builtBy: "King Khagemba",
        era: "Meitei Era",
        architecture: "Meitei Architecture",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
        history: "The ancient capital of Manipur, Kangla Fort is the most important historical and archaeological site in the state, serving as the seat of Meitei rulers until 1891.",
        highlights: [
            "Ancient capital of Manipur",
            "Sacred site for Meitei people",
            "Kangla Sha (State emblem dragons)",
            "Surrounded by a double moat"
        ],
        explorerUrl: "../kangla-fort/index.html"
    },
    {
        id: "lohagarh-fort",
        name: "Lohagarh Fort",
        location: "Bharatpur",
        state: "Rajasthan",
        built: "1732",
        builtBy: "Maharaja Suraj Mal",
        era: "Jat Era",
        architecture: "Jat Military Architecture",
        image: "https://images.unsplash.com/photo-1590716179555-8c8a9dc5c6d9?w=800&q=80",
        history: "Known as the 'Iron Fort', it is one of the strongest forts in India. Its unique mud walls absorbed cannonballs, allowing it to withstand repeated attacks by British forces.",
        highlights: [
            "Unique mud walls that absorbed cannonballs",
            "Withstood multiple British sieges",
            "Ashtadhatu (eight-metal) Gate",
            "Surrounded by a wide moat"
        ],
        explorerUrl: "../lohagarh-fort/index.html"
    },
    {
        id: "mirjan-fort",
        name: "Mirjan Fort",
        location: "Kumta",
        state: "Karnataka",
        built: "16th Century",
        builtBy: "Queen Chennabhairadevi",
        era: "Vijayanagara Era",
        architecture: "Laterite Stone Architecture",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        history: "Built by the 'Pepper Queen' of India, Mirjan Fort is known for its elegant laterite stone architecture, double-walled defense, and picturesque setting amidst lush greenery.",
        highlights: [
            "Built by the 'Pepper Queen'",
            "Beautiful laterite stone walls",
            "Secret circular stairways",
            "Lush green surroundings post-monsoon"
        ],
        customUrl: "mirjan-fort.html"
    },
    {
        id: "murud-janjira-fort",
        name: "Murud Janjira Fort",
        location: "Murud",
        state: "Maharashtra",
        built: "15th Century",
        builtBy: "Siddi Rulers",
        era: "Siddi / Maratha Era",
        architecture: "Marine Fort Architecture",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
        history: "An impregnable island fort situated in the Arabian Sea. It remained unconquered despite numerous attacks by the Marathas, Portuguese, and British forces.",
        highlights: [
            "Unconquered island fort",
            "Giant Kalal Bangadi cannon",
            "Concealed main gate",
            "Freshwater lakes within the sea fort"
        ],
        customUrl: "murud-janjira-fort.html"
    },
    {
        id: "palakkad-fort",
        name: "Palakkad Fort",
        location: "Palakkad",
        state: "Kerala",
        built: "1766",
        builtBy: "Hyder Ali",
        era: "Mysore Era",
        architecture: "European Military Architecture",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
        history: "A well-preserved fort built by Hyder Ali of Mysore. It served as a vital strategic base to control the Palakkad Gap and communications between the eastern and western coasts.",
        highlights: [
            "Controls the Palakkad Gap",
            "Well-preserved square layout",
            "Anjaneya Temple inside",
            "Surrounded by a wide moat"
        ],
        explorerUrl: "../palakkad-fort/index.html"
    },
    {
        id: "panhala-fort",
        name: "Panhala Fort",
        location: "Kolhapur",
        state: "Maharashtra",
        built: "12th Century",
        builtBy: "Shilahara Rulers",
        era: "Maratha Era",
        architecture: "Deccan Hill Fort Architecture",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
        history: "A massive fort overlooking the Sahyadri mountains. It is famous for the Battle of Pavan Khind and served as the capital of the Maratha Empire under Tarabai.",
        highlights: [
            "Site of the famous Battle of Pavan Khind",
            "Capital of Tarabai's Maratha kingdom",
            "Sajja Kothi where Sambhaji was imprisoned",
            "Three massive double-walled gates"
        ],
        customUrl: "panhala-fort.html"
    },
    {
        id: "rajmachi-fort",
        name: "Rajmachi Fort",
        location: "Lonavala",
        state: "Maharashtra",
        built: "17th Century",
        builtBy: "Satavahana / Maratha Rulers",
        era: "Maratha Era",
        architecture: "Hill Fort Architecture",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
        history: "Rajmachi consists of two twin fortresses, Shrivardhan and Manaranjan. It is a highly popular trekking destination known for its rugged beauty and historical significance.",
        highlights: [
            "Twin fortresses: Shrivardhan and Manaranjan",
            "Popular trekking destination",
            "Stunning views of the Bor Ghat",
            "Ancient Kal Bhairav temple"
        ],
        customUrl: "rajmachi-fort.html"
    },
    {
        id: "sinhagad-fort",
        name: "Sinhagad Fort",
        location: "Pune",
        state: "Maharashtra",
        built: "Ancient (Rebuilt 17th C)",
        builtBy: "Maratha Rulers",
        era: "Maratha Era",
        architecture: "Maratha Hill Fort Architecture",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        history: "Previously known as Kondhana, the fort is famous for the 1670 Battle of Sinhagad, where Tanaji Malusare famously scaled its steep cliffs to recapture it for Shivaji Maharaj.",
        highlights: [
            "Site of the famous Battle of Sinhagad",
            "Tanaji Malusare Memorial",
            "Kalyan Darwaza and Pune Darwaza",
            "Popular weekend destination from Pune"
        ],
        explorerUrl: "../sinhagad-fort/index.html"
    },
    {
        id: "taragarh-fort",
        name: "Taragarh Fort",
        location: "Ajmer",
        state: "Rajasthan",
        built: "1354",
        builtBy: "King Ajaypal Chauhan",
        era: "Rajput Era",
        architecture: "Rajput Architecture",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
        history: "Also known as the 'Star Fort', it was one of the first hill forts in Asia. It offers a commanding view of Ajmer city and played a key role in Rajasthan's military history.",
        highlights: [
            "One of the oldest hill forts in Asia",
            "Massive Bhim Burj cannon bastion",
            "Miran Saheb ki Dargah",
            "Commanding view of Ajmer"
        ],
        customUrl: "taragarh-fort.html"
    },
    {
        id: "torna-fort",
        name: "Torna Fort",
        location: "Pune",
        state: "Maharashtra",
        built: "13th Century",
        builtBy: "Shiva Panth Rulers",
        era: "Maratha Era",
        architecture: "Maratha Hill Fort Architecture",
        image: "https://images.unsplash.com/photo-1590716179555-8c8a9dc5c6d9?w=800&q=80",
        history: "Known as Prachandagad, it was the first fort captured by Shivaji Maharaj at age 16, marking the beginning of the Maratha Empire. It is the highest fort in the Pune district.",
        highlights: [
            "First fort captured by Shivaji Maharaj",
            "Highest fort in Pune district",
            "Zunjar Machi and Budhla Machi",
            "Significant historical importance"
        ],
        customUrl: "torna-fort.html"
    },
    {
        id: "warangal-fort",
        name: "Warangal Fort",
        location: "Warangal",
        state: "Telangana",
        built: "13th Century",
        builtBy: "Kakatiya Dynasty",
        era: "Kakatiya Era",
        architecture: "Kakatiya Architecture",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
        history: "The remnants of the Kakatiya capital feature four massive, intricately carved stone gateways known as Kakatiya Kala Thoranam, which later became the emblem of Telangana.",
        highlights: [
            "Kakatiya Kala Thoranam (stone gateways)",
            "Emblem of Telangana state",
            "Exquisite stone carvings",
            "UNESCO Tentative List"
        ],
        explorerUrl: "../warangal-fort/index.html"
    },
    {
        id: "raigad-fort",
        name: "Raigad Fort",
        location: "Raigad",
        state: "Maharashtra",
        built: "11th Century",
        builtBy: "Chhatrapati Shivaji Maharaj",
        era: "Maratha Era",
        architecture: "Maratha Military Architecture",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        history: "The Gibraltar of the East. The magnificent hill fort that served as the illustrious capital of the Maratha Empire under Chhatrapati Shivaji Maharaj.",
        highlights: [
            "Served as Maratha Capital",
            "Coronation of Shivaji Maharaj",
            "Maha Darwaja",
            "Takmak Tok"
        ],
        customUrl: "raigad-fort.html"
    }
];

// DOM Elements
const fortsGrid = document.getElementById('forts-grid');
const fortSearch = document.getElementById('fort-search');
const stateFilter = document.getElementById('state-filter');
const architectureFilter = document.getElementById('architecture-filter');
const eraFilter = document.getElementById('era-filter');
const resetFilters = document.getElementById('reset-filters');
const noResults = document.getElementById('no-results');
const fortModal = document.getElementById('fort-modal');
const modalClose = document.getElementById('modal-close');

// Initialize the page
function init() {
    populateFilters();
    renderForts(fortsData);
    setupEventListeners();
}

// Populate filter dropdowns
function populateFilters() {
    // Get unique values for each filter
    const states = [...new Set(fortsData.map(f => f.state))].sort();
    const architectures = [...new Set(fortsData.map(f => f.architecture))].sort();
    const eras = [...new Set(fortsData.map(f => f.era))].sort();

    // Populate state filter
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateFilter.appendChild(option);
    });

    // Populate architecture filter
    architectures.forEach(arch => {
        const option = document.createElement('option');
        option.value = arch;
        option.textContent = arch;
        architectureFilter.appendChild(option);
    });

    // Populate era filter
    eras.forEach(era => {
        const option = document.createElement('option');
        option.value = era;
        option.textContent = era;
        eraFilter.appendChild(option);
    });
}

// Render fort cards
function renderForts(forts) {
    fortsGrid.innerHTML = '';

    if (forts.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');

    forts.forEach(fort => {
        const card = document.createElement('div');
        card.className = 'fort-card';
        card.innerHTML = `
            <div class="fort-card-image">
                <img src="${fort.image}" alt="${fort.name}" loading="lazy">
                <span class="fort-era-badge">${fort.era}</span>
            </div>
            <div class="fort-card-body">
                <span class="fort-location">${fort.location}</span>
                <h3>${fort.name}</h3>
                <p class="fort-architecture">${fort.architecture}</p>
                <p>${fort.history}</p>
                <div class="fort-card-footer">
                    <span class="fort-built">Built: <strong>${fort.built}</strong></span>
                    <span class="view-details-btn">${fort.customUrl ? 'Explore' : 'View Details'}</span>
                </div>
            </div>
        `;
        
        const destinationUrl = fort.customUrl || fort.explorerUrl;
        
        if (destinationUrl) {
            card.addEventListener('click', () => {
                window.open(destinationUrl, '_blank');
            });
        } else {
            card.addEventListener('click', () => openModal(fort));
        }
        fortsGrid.appendChild(card);
    });
}

// Filter forts based on search and filter selections
function filterForts() {
    const searchTerm = fortSearch.value.toLowerCase();
    const selectedState = stateFilter.value;
    const selectedArchitecture = architectureFilter.value;
    const selectedEra = eraFilter.value;

    const filtered = fortsData.filter(fort => {
        const matchesSearch = 
            fort.name.toLowerCase().includes(searchTerm) ||
            fort.location.toLowerCase().includes(searchTerm) ||
            fort.state.toLowerCase().includes(searchTerm) ||
            fort.history.toLowerCase().includes(searchTerm) ||
            fort.architecture.toLowerCase().includes(searchTerm);

        const matchesState = !selectedState || fort.state === selectedState;
        const matchesArchitecture = !selectedArchitecture || fort.architecture === selectedArchitecture;
        const matchesEra = !selectedEra || fort.era === selectedEra;

        return matchesSearch && matchesState && matchesArchitecture && matchesEra;
    });

    renderForts(filtered);
}

// Reset all filters
function resetAllFilters() {
    fortSearch.value = '';
    stateFilter.value = '';
    architectureFilter.value = '';
    eraFilter.value = '';
    renderForts(fortsData);
}

// Open modal with fort details
function openModal(fort) {
    document.getElementById('modal-image').style.backgroundImage = `url('${fort.image}')`;
    document.getElementById('modal-name').textContent = fort.name;
    document.getElementById('modal-era').textContent = fort.era;
    document.getElementById('modal-location').textContent = fort.location;
    document.getElementById('modal-state').textContent = fort.state;
    document.getElementById('modal-built').textContent = fort.built;
    document.getElementById('modal-architecture').textContent = fort.architecture;
    document.getElementById('modal-builder').textContent = fort.builtBy;
    document.getElementById('modal-history').textContent = fort.history;

    // Populate highlights
    const highlightsList = document.getElementById('modal-highlights');
    highlightsList.innerHTML = '';
    fort.highlights.forEach(highlight => {
        const li = document.createElement('li');
        li.textContent = highlight;
        highlightsList.appendChild(li);
    });

    
    renderExplorerLink(fort);

    // Show dedicated explorer link if available
    let explorerLinkContainer = document.getElementById('modal-explorer-link');
    if (explorerLinkContainer) explorerLinkContainer.remove();
    if (fort.explorerUrl) {
        const linkDiv = document.createElement('div');
        linkDiv.id = 'modal-explorer-link';
        linkDiv.style.cssText = 'margin-top: 1.5rem; text-align: center;';
        const explorerLink = document.createElement('a');
        explorerLink.href = fort.explorerUrl;
        explorerLink.textContent = 'Launch Dedicated Explorer ➔';
        explorerLink.style.cssText = 'display:inline-block; padding:0.75rem 1.5rem; background:linear-gradient(135deg, #ffb01f, #d97706); color:#000; font-weight:700; border-radius:999px; text-decoration:none;';
        linkDiv.appendChild(explorerLink);
        document.querySelector('.modal-highlights').appendChild(linkDiv);
    }
    fortModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
// Add/remove a "Launch Dedicated Explorer" link for forts that have their own page
function renderExplorerLink(fort) {
    let linkDiv = document.getElementById('modal-explorer-link');
    if (!fort.explorerUrl) {
        if (linkDiv) linkDiv.remove();
        return;
    }

    if (!linkDiv) {
        linkDiv = document.createElement('div');
        linkDiv.id = 'modal-explorer-link';
        linkDiv.style.marginTop = '1.5rem';
        const highlightsList = document.getElementById('modal-highlights');
        highlightsList.insertAdjacentElement('afterend', linkDiv);
    }

    while (linkDiv.firstChild) {
        linkDiv.removeChild(linkDiv.firstChild);
    }

    const explorerLink = document.createElement('a');
    explorerLink.href = fort.explorerUrl;
    explorerLink.textContent = 'Launch Dedicated Explorer ➔';
    explorerLink.style.cssText = 'display:inline-block; padding:0.75rem 1.5rem; background:linear-gradient(135deg, #ffb01f, #d97706); color:#000; font-weight:700; border-radius:999px; text-decoration:none;';
    linkDiv.appendChild(explorerLink);
}
// Close modal
function closeModal() {
    fortModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Setup event listeners
function setupEventListeners() {
    fortSearch.addEventListener('input', filterForts);
    stateFilter.addEventListener('change', filterForts);
    architectureFilter.addEventListener('change', filterForts);
    eraFilter.addEventListener('change', filterForts);
    resetFilters.addEventListener('click', resetAllFilters);
    modalClose.addEventListener('click', closeModal);

    // Close modal on background click
    fortModal.addEventListener('click', (e) => {
        if (e.target === fortModal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', init);
