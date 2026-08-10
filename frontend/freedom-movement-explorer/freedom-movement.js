/**
 * freedom-movement.js
 * "The Complete Indian Freedom Movement Explorer" Core Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// 1. Comprehensive Freedom Movements Timeline Dataset (1770–1947)
export const freedomTimeline = [
  {
    id: "evt-1770-sannyasi",
    year: 1770,
    date: "1770–1800",
    title: "Sannyasi & Fakir Rebellion",
    movement: "Early Resistance",
    phase: "Early Uprisings (1770–1884)",
    location: "Bengal & Bihar",
    keyLeaders: ["Majnu Shah", "Bhawani Pathak", "Devi Chaudhurani"],
    description: "Peasant and ascetic rebellion against East India Company revenue demands and restrictions on pilgrimage sites following the Great Bengal Famine of 1770.",
    historicalImpact: "Immortally depicted by Bankim Chandra Chattopadhyay in his iconic national novel 'Anandamath'."
  },
  {
    id: "evt-1817-paika",
    year: 1817,
    date: "April 1817",
    title: "Paika Rebellion (Paika Bidroha)",
    movement: "Early Resistance",
    phase: "Early Uprisings (1770–1884)",
    location: "Khurda, Odisha",
    keyLeaders: ["Bakshi Jagabandhu Bidyadhara"],
    description: "Armed revolt by traditional landed militia (Paikas) resisting British land takeover, currency regulations, and oppressive salt monopolies.",
    historicalImpact: "Recognized as one of India's earliest major organized anti-colonial armed peasant rebellions."
  },
  {
    id: "evt-1855-santhal",
    year: 1855,
    date: "June 30, 1855",
    title: "Santhal Hul (Rebellion)",
    movement: "Early Resistance",
    phase: "Early Uprisings (1770–1884)",
    location: "Rajmahal Hills, Jharkhand/Bengal",
    keyLeaders: ["Sidho Murmu", "Kanho Murmu", "Chand Murmu", "Bhairav Murmu"],
    description: "Mass indigenous uprising against oppressive zamindari revenue extortion and colonial police exploitation.",
    historicalImpact: "Compelled the colonial administration to establish the Santhal Parganas non-regulation district with protected land rights."
  },
  {
    id: "evt-1857-war-of-independence",
    year: 1857,
    date: "May 10, 1857",
    title: "Revolt of 1857 (First War of Independence)",
    movement: "Early Resistance",
    phase: "Early Uprisings (1770–1884)",
    location: "Meerut, Delhi, Kanpur, Jhansi, Lucknow",
    keyLeaders: ["Rani Lakshmibai", "Mangal Pandey", "Bahadur Shah Zafar", "Tatya Tope", "Nana Saheb"],
    description: "Wide-ranging sepoy and civilian uprising challenging East India Company rule across Northern and Central India.",
    historicalImpact: "Ended East India Company governance and led directly to direct administration under the British Crown."
  },
  {
    id: "evt-1905-swadeshi",
    year: 1905,
    date: "October 16, 1905",
    title: "Swadeshi & Boycott Movement",
    movement: "Swadeshi Movement",
    phase: "Moderate & Swadeshi Era (1885–1918)",
    location: "Bengal & Nationwide",
    keyLeaders: ["Bal Gangadhar Tilak", "Lala Lajpat Rai", "Bipin Chandra Pal", "Rabindranath Tagore", "Aurobindo Ghosh"],
    description: "Mass movement triggered by the Partition of Bengal promoting indigenous goods (Swadeshi), national schools, and boycott of British textiles.",
    historicalImpact: "Transformed Indian nationalism into an active mass political movement with economic self-reliance at its core."
  },
  {
    id: "evt-1916-home-rule",
    year: 1916,
    date: "April–September 1916",
    title: "Home Rule League Movement",
    movement: "Home Rule",
    phase: "Moderate & Swadeshi Era (1885–1918)",
    location: "Pune, Madras & Nationwide",
    keyLeaders: ["Bal Gangadhar Tilak", "Annie Besant"],
    description: "Twin leagues established to demand self-government ('Home Rule') for India within the British Empire using constitutional propaganda.",
    historicalImpact: "Mobilized local committees across provinces and laid political organizational groundwork for Gandhi's entry."
  },
  {
    id: "evt-1919-satyagraha-jallianwala",
    year: 1919,
    date: "April 13, 1919",
    title: "Rowlatt Anti-Satyagraha & Jallianwala Bagh Massacre",
    movement: "Non-Cooperation",
    phase: "Gandhian Mass Satyagraha (1919–1939)",
    location: "Amritsar, Punjab",
    keyLeaders: ["Mahatma Gandhi", "Dr. Saifuddin Kitchlew", "Dr. Satyapal"],
    description: "Protests against arbitrary Rowlatt Act arrests culminated in British troops firing on peaceful gathering at Jallianwala Bagh.",
    historicalImpact: "Radicalized the freedom struggle, prompting Gandhi to renounce British honors and call for total Non-Cooperation."
  },
  {
    id: "evt-1920-non-cooperation",
    year: 1920,
    date: "August 1, 1920",
    title: "Non-Cooperation Movement",
    movement: "Non-Cooperation",
    phase: "Gandhian Mass Satyagraha (1919–1939)",
    location: "Nationwide",
    keyLeaders: ["Mahatma Gandhi", "Shaukat Ali", "Mohammad Ali", "Chittaranjan Das", "Motilal Nehru"],
    description: "Mass non-violent campaign surrendering titles, boycotting colonial schools, law courts, foreign cloth, and promoting Charkha spinning.",
    historicalImpact: "Transformed Congress into a mass nationwide anti-imperialist movement involving peasants, workers, and students."
  },
  {
    id: "evt-1922-chauri-chaura",
    year: 1922,
    date: "February 5, 1922",
    title: "Chauri Chaura Incident & Movement Suspension",
    movement: "Non-Cooperation",
    phase: "Gandhian Mass Satyagraha (1919–1939)",
    location: "Chauri Chaura, Gorakhpur, UP",
    keyLeaders: ["Mahatma Gandhi"],
    description: "Protesters clashed with police, leading to a police station arson. Gandhi suspended Non-Cooperation to maintain non-violent moral principles.",
    historicalImpact: "Reaffirmed non-violence as an uncompromising tenet of Gandhian Satyagraha."
  },
  {
    id: "evt-1925-kakori",
    year: 1925,
    date: "August 9, 1925",
    title: "Kakori Train Action",
    movement: "Revolutionary Struggle",
    phase: "Gandhian Mass Satyagraha (1919–1939)",
    location: "Kakori, Uttar Pradesh",
    keyLeaders: ["Ram Prasad Bismil", "Ashfaqulla Khan", "Chandrashekhar Azad", "Rajendra Lahiri"],
    description: "Hindustan Republican Association revolutionaries seized British government treasury funds from a train to finance liberation efforts.",
    historicalImpact: "Electrified youth support for revolutionary resistance across Northern India."
  },
  {
    id: "evt-1930-dandi-salt-march",
    year: 1930,
    date: "March 12 – April 6, 1930",
    title: "Salt March to Dandi & Civil Disobedience Movement",
    movement: "Civil Disobedience",
    phase: "Gandhian Mass Satyagraha (1919–1939)",
    location: "Sabarmati Ashram to Dandi, Gujarat",
    keyLeaders: ["Mahatma Gandhi", "Sarojini Naidu", "Kamaladevi Chattopadhyay"],
    description: "Gandhi marched 240 miles to break the colonial salt monopoly tax, launching nationwide Civil Disobedience.",
    historicalImpact: "Brought international global media focus to Indian self-determination and led to round-table talks."
  },
  {
    id: "evt-1931-shatranj-hsra",
    year: 1931,
    date: "March 23, 1931",
    title: "Martyrdom of Bhagat Singh, Rajguru & Sukhdev",
    movement: "Revolutionary Struggle",
    phase: "Gandhian Mass Satyagraha (1919–1939)",
    location: "Lahore Central Jail",
    keyLeaders: ["Bhagat Singh", "Shivaram Rajguru", "Sukhdev Thapar"],
    description: "Execution of HSRA revolutionaries for their role in the Saunders case and Assembly Bomb case.",
    historicalImpact: "Deepened patriotic fervor among youth and cemented Bhagat Singh's legacy as a national revolutionary hero."
  },
  {
    id: "evt-1942-quit-india",
    year: 1942,
    date: "August 8, 1942",
    title: "Quit India Movement ('Karo ya Maro')",
    movement: "Quit India",
    phase: "Final Push & Independence (1940–1947)",
    location: "Gowalia Tank Maidan, Bombay",
    keyLeaders: ["Mahatma Gandhi", "Aruna Asaf Ali", "Jayaprakash Narayan", "Usha Mehta", "Sardar Patel"],
    description: "Congress passed the Quit India Resolution demanding immediate British withdrawal; Gandhi issued the famous 'Do or Die' call.",
    historicalImpact: "Triggered widespread civil unrest, parallel local governments, and underground resistance across India."
  },
  {
    id: "evt-1943-azad-hind-ina",
    year: 1943,
    date: "October 21, 1943",
    title: "Proclamation of Provisional Government of Azad Hind & INA",
    movement: "INA",
    phase: "Final Push & Independence (1940–1947)",
    location: "Singapore / Imphal & Kohima",
    keyLeaders: ["Netaji Subhas Chandra Bose", "Captain Lakshmi Swaminathan", "General Mohan Singh"],
    description: "Netaji Subhas Chandra Bose proclaimed the Arzi Hukumat-e-Azad Hind (Provisional Government of Free India) and reorganized the Indian National Army.",
    historicalImpact: "Fought militarily against Allied forces in Northeast India, raising the tricolour at Moirang, Manipur."
  },
  {
    id: "evt-1945-red-fort-trials",
    year: 1945,
    date: "November 1945 – May 1946",
    title: "Red Fort INA Trials & Public Outrage",
    movement: "INA",
    phase: "Final Push & Independence (1940–1947)",
    location: "Red Fort, Delhi",
    keyLeaders: ["Colonel Shah Nawaz Khan", "Colonel Prem Sahgal", "Colonel Gurbaksh Singh Dhillon", "Bhulabhai Desai"],
    description: "Court-martial of INA officers representing Hindu, Muslim, and Sikh communities at Red Fort sparked public protests.",
    historicalImpact: "Demonstrated unanimous cross-community unity and shattered military reliance of colonial authorities."
  },
  {
    id: "evt-1946-rin-mutiny",
    year: 1946,
    date: "February 18, 1946",
    title: "Royal Indian Navy (RIN) Uprising",
    movement: "Early Resistance",
    phase: "Final Push & Independence (1940–1947)",
    location: "HMIS Talwar, Bombay Harbor",
    keyLeaders: ["M.S. Khan", "Madan Singh"],
    description: "Naval ratings struck over discriminatory treatment and anti-imperialist demands, spreading to 78 naval vessels.",
    historicalImpact: "Conclusively proved that colonial armed forces would no longer enforce British rule in India."
  },
  {
    id: "evt-1947-independence",
    year: 1947,
    date: "August 15, 1947",
    title: "Indian Independence & 'Tryst with Destiny'",
    movement: "Civil Disobedience",
    phase: "Final Push & Independence (1940–1947)",
    location: "Constitution Hall, New Delhi",
    keyLeaders: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel", "Dr. B.R. Ambedkar"],
    description: "India attained sovereign independence ending 190 years of British colonial rule as Jawaharlal Nehru delivered his iconic address.",
    historicalImpact: "Established the sovereign Republic of India as the world's largest democracy."
  }
];

// 2. Revolutionary Organizations Catalog
export const revolutionaryOrganizations = [
  {
    id: "org-anushilan",
    name: "Anushilan Samiti",
    establishedYear: 1902,
    headquarters: "Calcutta & Dhaka",
    keyFounders: ["Pramathanath Mitra", "Aurobindo Ghosh", "Barindra Kumar Ghosh", "Satish Chandra Basu"],
    ideology: "Armed Secret Society & Physical Culture",
    description: "Pioneering revolutionary secret organization advocating violent overthrow of British rule through physical training, bomb production, and patriotic literature."
  },
  {
    id: "org-jugantar",
    name: "Jugantar Party",
    establishedYear: 1906,
    headquarters: "Kolkata, Bengal",
    keyFounders: ["Bagha Jatin (Jatindranath Mukherjee)", "Rash Behari Bose", "Aurobindo Ghosh"],
    ideology: "Revolutionary Insurrection",
    description: "Breakaway faction of Anushilan Samiti known for daring raids, foreign arms procurement (German Plot 1915), and military uprisings."
  },
  {
    id: "org-abhinav-bharat",
    name: "Abhinav Bharat Society",
    establishedYear: 1904,
    headquarters: "Nasik & Pune, Maharashtra",
    keyFounders: ["Vinayak Damodar Savarkar", "Ganesh Damodar Savarkar"],
    ideology: "Armed Secret Resistance",
    description: "Secret society formed initially as Mitra Mela, coordinating armed resistance, political assassinations, and smuggling arms from Europe."
  },
  {
    id: "org-ghadar",
    name: "Ghadar Party",
    establishedYear: 1913,
    headquarters: "San Francisco, USA",
    keyFounders: ["Lala Har Dayal", "Sohan Singh Bhakna", "Kartar Singh Sarabha", "Tarak Nath Das"],
    ideology: "Secular Revolutionary Nationalism",
    description: "International revolutionary organization of Indian immigrants in North America advocating armed mutiny in the British Indian Army during WWI."
  },
  {
    id: "org-hsra",
    name: "Hindustan Socialist Republican Association (HSRA)",
    establishedYear: 1928,
    headquarters: "Ferozeshah Kotla, Delhi",
    keyFounders: ["Chandrashekhar Azad", "Bhagat Singh", "Sukhdev Thapar", "Bhagwati Charan Vohra", "Batukeshwar Dutt"],
    ideology: "Socialist Revolution & Freedom",
    description: "Renamed from HRA to emphasize socialism, famous for Saunders action, Central Assembly bomb protest, and revolutionary tracts."
  },
  {
    id: "org-ina-league",
    name: "Indian Independence League & INA",
    establishedYear: 1942,
    headquarters: "Tokyo / Singapore",
    keyFounders: ["Rash Behari Bose", "General Mohan Singh", "Netaji Subhas Chandra Bose"],
    ideology: "Armed National Liberation War",
    description: "Political and military alliance formed in East Asia to liberate India with armed troops comprising Indian POWs and expatriates."
  }
];

// 3. Major Freedom Leaders Catalog
export const freedomLeaders = [
  {
    id: "ldr-gandhi",
    name: "Mahatma Gandhi",
    title: "Father of the Nation",
    category: "Gandhian Satyagrahi",
    era: "Gandhian Mass Era",
    keyContributions: "Pioneered non-violent Satyagraha, led Non-Cooperation, Dandi Salt March, and Quit India Movement.",
    popularQuote: "Be the change that you wish to see in the world. Do or Die."
  },
  {
    id: "ldr-bose",
    name: "Netaji Subhas Chandra Bose",
    title: "Supreme Commander of INA",
    category: "INA Commander",
    era: "Armed Freedom Movement",
    keyContributions: "Reorganized the Azad Hind Fauj, established Provisional Azad Hind Government, led military campaigns in Manipur & Nagaland.",
    popularQuote: "Give me blood and I will give you freedom!"
  },
  {
    id: "ldr-patel",
    name: "Sardar Vallabhbhai Patel",
    title: "Iron Man of India",
    category: "Gandhian Satyagrahi",
    era: "Gandhian Mass Era",
    keyContributions: "Led Bardoli Satyagraha (1928), organized Quit India movement, integrated 565 Princely States into Indian Union.",
    popularQuote: "Manpower without unity is not a strength unless it is harmonized and united properly."
  },
  {
    id: "ldr-bhagat-singh",
    name: "Bhagat Singh",
    title: "Shaheed-e-Azam",
    category: "Revolutionary",
    era: "Revolutionary Struggle",
    keyContributions: "Key leader of HSRA, threw non-lethal bombs in Central Assembly to raise national consciousness, martyred at age 23.",
    popularQuote: "They may kill me, but they cannot kill my ideas. Inquilab Zindabad!"
  },
  {
    id: "ldr-azad",
    name: "Chandrashekhar Azad",
    title: "Commander-in-Chief of HSRA",
    category: "Revolutionary",
    era: "Revolutionary Struggle",
    keyContributions: "Reorganized HRA into HSRA, directed Kakori action and Saunders action, vowed never to be captured alive.",
    popularQuote: "Dushman ki goliyon ka hum samna karenge, Azad hi rahe hain, Azad hi rahenge!"
  },
  {
    id: "ldr-naidu",
    name: "Sarojini Naidu",
    title: "Nightingale of India",
    category: "Women Pioneer",
    era: "Gandhian Mass Era",
    keyContributions: "First Indian woman Congress President (1925), led Dharasana Salt Satyagraha raid, prominent orator.",
    popularQuote: "A country's greatness lies in its undying ideals of love and sacrifice."
  },
  {
    id: "ldr-tilak",
    name: "Bal Gangadhar Tilak",
    title: "Lokmanya",
    category: "Extremist Trio (Lal-Bal-Pal)",
    era: "Swadeshi & Home Rule",
    keyContributions: "Pioneered Swadeshi, founded Kesari and Mahratta newspapers, led All-India Home Rule League.",
    popularQuote: "Swaraj is my birthright and I shall have it!"
  },
  {
    id: "ldr-lajpat-rai",
    name: "Lala Lajpat Rai",
    title: "Punjab Kesari",
    category: "Extremist Trio (Lal-Bal-Pal)",
    era: "Swadeshi & Home Rule",
    keyContributions: "Leader of Swadeshi movement in Punjab, led anti-Simon Commission protests where he suffered fatal lathi blows.",
    popularQuote: "Every blow struck at me today will be a nail in the coffin of British imperialism."
  },
  {
    id: "ldr-bipin-pal",
    name: "Bipin Chandra Pal",
    title: "Father of Revolutionary Thoughts in India",
    category: "Extremist Trio (Lal-Bal-Pal)",
    era: "Swadeshi & Home Rule",
    keyContributions: "Championed Swadeshi, Boycott, and National Education in Bengal alongside Tilak and Lajpat Rai.",
    popularQuote: "Nationalism is a religion that has come from God."
  },
  {
    id: "ldr-besant",
    name: "Annie Besant",
    title: "Home Rule Leader & Theosophist",
    category: "Moderate / Home Rule",
    era: "Swadeshi & Home Rule",
    keyContributions: "Founded All-India Home Rule League (1916), first female President of INC (1917), established Central Hindu College.",
    popularQuote: "India is a country in which every religion has a home."
  },
  {
    id: "ldr-aruna-asaf-ali",
    name: "Aruna Asaf Ali",
    title: "Grand Old Lady of Independence",
    category: "Women Pioneer",
    era: "Quit India Era",
    keyContributions: "Hoisted the Indian National Congress tricolour at Gowalia Tank Maidan during Quit India 1942, edited 'Inquilab'.",
    popularQuote: "I can never forget the electric atmosphere of August 1942."
  },
  {
    id: "ldr-ashfaqulla",
    name: "Ashfaqulla Khan",
    title: "Revolutionary Martyr of HSRA",
    category: "Revolutionary",
    era: "Revolutionary Struggle",
    keyContributions: "Key leader of Kakori Train Action, poet, symbol of Hindu-Muslim revolutionary brotherhood with Ram Prasad Bismil.",
    popularQuote: "My hands are not soiled with the blood of any human being. My only crime is love for my motherland."
  },
  {
    id: "ldr-khudiram",
    name: "Khudiram Bose",
    title: "Youngest Revolutionary Martyr",
    category: "Revolutionary",
    era: "Swadeshi Era",
    keyContributions: "Member of Anushilan Samiti who attempted Muzaffarpur action against Kingsford, martyred at age 18.",
    popularQuote: "I will smile while putting the gallows rope around my neck for Mother India."
  },
  {
    id: "ldr-gaidinliu",
    name: "Rani Gaidinliu",
    title: "Rani of the Nagas",
    category: "Women Pioneer",
    era: "Civil Disobedience Era",
    keyContributions: "Spiritual and political Naga leader who led an armed rebellion against British rule in Manipur & Nagaland at age 16.",
    popularQuote: "We are free people, the white men should leave our hills."
  },
  {
    id: "ldr-ghaaffar-khan",
    name: "Khan Abdul Ghaffar Khan",
    title: "Frontier Gandhi",
    category: "Gandhian Satyagrahi",
    era: "Gandhian Mass Era",
    keyContributions: "Founded non-violent Khudai Khidmatgar ('Red Shirts') movement in NWFP, lifelong apostle of peace.",
    popularQuote: "Non-violence is the weapon of the strong and brave."
  },
  {
    id: "ldr-lakshmi-swaminathan",
    name: "Captain Lakshmi Sahgal (Swaminathan)",
    title: "Commander of Rani of Jhansi Regiment",
    category: "INA Commander",
    era: "Armed Freedom Movement",
    keyContributions: "Led the all-women Rani of Jhansi Regiment of INA in Burma, Minister of Women's Affairs in Azad Hind Cabinet.",
    popularQuote: "We fought not for personal glory, but for India's freedom."
  }
];

// 4. Primary Historical Documents Archive
export const historicalDocuments = [
  {
    id: "doc-poorna-swaraj",
    title: "Declaration of Poorna Swaraj (Complete Independence Resolution)",
    year: 1930,
    date: "January 26, 1930",
    author: "Indian National Congress (Drafted by Jawaharlal Nehru)",
    category: "Declaration",
    excerpt: "We believe that it is the inalienable right of the Indian people, as of any other people, to have freedom and to enjoy the fruits of their toil... We pledge ourselves to prepare for Civil Disobedience until Complete Independence is achieved.",
    historicalContext: "Adopted at the Lahore Congress session of December 1929, designating Jan 26 as Independence Day across India."
  },
  {
    id: "doc-nehru-report",
    title: "The Nehru Report (1928)",
    year: 1928,
    date: "August 1928",
    author: "All Parties Conference (Chaired by Motilal Nehru)",
    category: "Constitutional Draft",
    excerpt: "India shall have a constitutional status of a Dominion within the British Commonwealth... with full fundamental rights, joint electorates, and universal adult suffrage.",
    historicalContext: "First major all-Indian attempt to draft a comprehensive constitution for free India."
  },
  {
    id: "doc-tryst-with-destiny",
    title: "'Tryst with Destiny' Oration",
    year: 1947,
    date: "August 14–15, 1947",
    author: "Jawaharlal Nehru",
    category: "Oration Speech",
    excerpt: "Long years ago we made a tryst with destiny, and now the time comes when we shall redeem our pledge... At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom.",
    historicalContext: "Delivered to the Constituent Assembly of India in New Delhi on the eve of Indian Independence."
  },
  {
    id: "doc-give-me-blood",
    title: "'Give Me Blood and I Will Give You Freedom!' Speech",
    year: 1944,
    date: "July 4, 1944",
    author: "Netaji Subhas Chandra Bose",
    category: "Oration Speech",
    excerpt: "Comrades! Our soldier's cry is 'Delhi Chalo! Delhi Chalo!'... Freedom is not given, it is taken. Give me blood and I will give you freedom!",
    historicalContext: "Addressed to soldiers of the Indian National Army at a rally in Burma during the march toward Imphal."
  },
  {
    id: "doc-azad-hind-proclamation",
    title: "Proclamation of Provisional Government of Azad Hind",
    year: 1943,
    date: "October 21, 1943",
    author: "Netaji Subhas Chandra Bose",
    category: "Proclamation",
    excerpt: "It will be the task of the Provisional Government to launch and to conduct the struggle that will bring about the expulsion of the British and their allies from the soil of India.",
    historicalContext: "Issued in Singapore establishing Arzi Hukumat-e-Azad Hind, recognized by nine sovereign nations."
  },
  {
    id: "doc-swaraj-slogan",
    title: "Tilak's Swaraj Declaration",
    year: 1916,
    date: "1916",
    author: "Bal Gangadhar Tilak",
    category: "Declaration",
    excerpt: "Swaraj is my birthright and I shall have it! No power on earth can withhold it from us.",
    historicalContext: "Coined during the Home Rule movement, becoming a rallying battle cry across the subcontinent."
  },
  {
    id: "doc-do-or-die",
    title: "'Do or Die' (Karo ya Maro) Call",
    year: 1942,
    date: "August 8, 1942",
    author: "Mahatma Gandhi",
    category: "Resolution Call",
    excerpt: "Here is a mantra, a short one, that I give you. You may imprint it on your hearts: 'Do or Die'. We shall either free India or die in the attempt.",
    historicalContext: "Delivered at Gowalia Tank Maidan, Bombay, initiating the Quit India Movement."
  },
  {
    id: "doc-karachi-resolution",
    title: "Karachi Resolution on Fundamental Rights",
    year: 1931,
    date: "March 1931",
    author: "Indian National Congress (Chaired by Sardar Patel)",
    category: "Resolution",
    excerpt: "The organization of economic life must conform to the principle of social justice... guaranteeing freedom of speech, freedom of religion, equality before law, and protection of workers.",
    historicalContext: "Framed fundamental civil rights and economic policies that directly shaped the 1950 Constitution of India."
  }
];

export const causeEffectChains = [
  {
    id: "chain-partition-swadeshi",
    title: "Bengal Partition to Swadeshi (1905)",
    cause: {
      title: "Partition of Bengal",
      year: "July 1905",
      description: "Lord Curzon partitioned Bengal on communal lines to weaken the nationalist hub, causing widespread outrage.",
      eventId: "evt-1905-swadeshi"
    },
    active: {
      title: "Swadeshi & Boycott Movement",
      year: "Oct 1905",
      description: "Mass movement promoting indigenous goods (Swadeshi), national education institutions, and boycotting British textiles.",
      eventId: "evt-1905-swadeshi",
      location: "Bengal & Nationwide",
      movement: "Swadeshi Movement",
      leaders: ["Bal Gangadhar Tilak", "Bipin Chandra Pal", "Lala Lajpat Rai", "Aurobindo Ghosh"]
    },
    consequence: {
      title: "Rise of Lal-Bal-Pal & Revolutionary Activism",
      year: "1906–1908",
      description: "Split in Congress (Surat Split) and emergence of early revolutionary secret organizations like Anushilan Samiti.",
      eventId: "evt-1905-swadeshi"
    }
  },
  {
    id: "chain-rowlatt-noncooperation",
    title: "Rowlatt Act to Non-Cooperation (1919–1920)",
    cause: {
      title: "Oppressive Rowlatt Act",
      year: "March 1919",
      description: "Colonial law allowing indefinite detention of political suspects without trial, sparking nationwide resentment.",
      eventId: "evt-1919-satyagraha-jallianwala"
    },
    active: {
      title: "Jallianwala Bagh Massacre",
      year: "April 1919",
      description: "General Dyer ordered firing on a peaceful gathering in Amritsar, slaughtering hundreds.",
      eventId: "evt-1919-satyagraha-jallianwala",
      location: "Amritsar, Punjab",
      movement: "Non-Cooperation",
      leaders: ["Mahatma Gandhi", "Dr. Saifuddin Kitchlew"]
    },
    consequence: {
      title: "Non-Cooperation Movement",
      year: "August 1920",
      description: "Gandhi renounced British titles and launched the first major national Non-Cooperation Satyagraha.",
      eventId: "evt-1920-non-cooperation"
    }
  },
  {
    id: "chain-noncooperation-suspension",
    title: "Non-Cooperation to Chauri Chaura (1920–1922)",
    cause: {
      title: "Non-Cooperation Campaign",
      year: "1920–1922",
      description: "Nationwide satyagraha boycott, uniting diverse social communities against colonial rule.",
      eventId: "evt-1920-non-cooperation"
    },
    active: {
      title: "Chauri Chaura Incident",
      year: "Feb 1922",
      description: "Protesters set fire to a police station in Gorakhpur, killing 22 policemen.",
      eventId: "evt-1922-chauri-chaura",
      location: "Chauri Chaura, Gorakhpur, UP",
      movement: "Non-Cooperation",
      leaders: ["Mahatma Gandhi"]
    },
    consequence: {
      title: "Suspension of Movement & Rise of Revolutionaries",
      year: "Feb 1922 onwards",
      description: "Gandhi suspended the movement, causing disappointment that led to the birth of Swaraj Party and revived armed activism.",
      eventId: "evt-1925-kakori"
    }
  },
  {
    id: "chain-simon-bhagatsingh",
    title: "Simon Commission to Bhagat Singh's Martyrdom (1928–1931)",
    cause: {
      title: "Simon Commission Boycott",
      year: "1928",
      description: "All-white commission arrived in India, prompting protests where Lala Lajpat Rai was fatally lathicharged.",
      eventId: "evt-1931-shatranj-hsra"
    },
    active: {
      title: "Saunders Assassination & Assembly Bombing",
      year: "1928–1929",
      description: "Bhagat Singh and HSRA avenged Lajpat Rai's death by shooting Saunders, and later threw bombs in the Assembly.",
      eventId: "evt-1931-shatranj-hsra",
      location: "Lahore & Delhi",
      movement: "Revolutionary Struggle",
      leaders: ["Bhagat Singh", "Shivaram Rajguru", "Sukhdev Thapar", "Chandrashekhar Azad"]
    },
    consequence: {
      title: "Execution & Nationwide Awakening",
      year: "March 1931",
      description: "Bhagat Singh, Rajguru, and Sukhdev were hanged, elevating them to national symbols of resistance.",
      eventId: "evt-1931-shatranj-hsra"
    }
  },
  {
    id: "chain-salt-civildisobedience",
    title: "Salt Tax to Civil Disobedience (1930)",
    cause: {
      title: "Oppressive British Salt Laws",
      year: "1930",
      description: "The state monopolized salt production and taxed a vital daily necessity for every Indian.",
      eventId: "evt-1930-dandi-salt-march"
    },
    active: {
      title: "Salt March to Dandi",
      year: "March–April 1930",
      description: "Gandhi led a 240-mile march from Sabarmati to the sea at Dandi to make salt.",
      eventId: "evt-1930-dandi-salt-march",
      location: "Sabarmati to Dandi, Gujarat",
      movement: "Civil Disobedience",
      leaders: ["Mahatma Gandhi", "Sarojini Naidu", "Kamaladevi Chattopadhyay"]
    },
    consequence: {
      title: "Nationwide Civil Disobedience",
      year: "1930–1934",
      description: "Millions violated laws, boycotted goods, and refused land revenues, leading to Gandhi-Irwin Pact.",
      eventId: "evt-1930-dandi-salt-march"
    }
  },
  {
    id: "chain-worldwar-quitindia",
    title: "World War II to Quit India (1939–1942)",
    cause: {
      title: "WWII & Cripps Mission Failure",
      year: "1939–1942",
      description: "India was dragged into WWII without consent, and Cripps Mission failed to offer full independence.",
      eventId: "evt-1942-quit-india"
    },
    active: {
      title: "Quit India Movement",
      year: "August 1942",
      description: "Gandhi called for immediate British withdrawal with the slogan 'Do or Die'.",
      eventId: "evt-1942-quit-india",
      location: "Bombay & Nationwide",
      movement: "Quit India",
      leaders: ["Mahatma Gandhi", "Aruna Asaf Ali", "Jayaprakash Narayan"]
    },
    consequence: {
      title: "Mass Arrests & Rise of Underground Resistance",
      year: "1942–1944",
      description: "Entire Congress leadership was jailed, prompting nationwide sabotage and parallel local governments.",
      eventId: "evt-1942-quit-india"
    }
  },
  {
    id: "chain-ina-independence",
    title: "INA Trials to RIN Mutiny & Independence (1945–1947)",
    cause: {
      title: "Red Fort INA Trials",
      year: "Late 1945",
      description: "British tried INA officers at Red Fort, triggering unprecedented public sympathy and anger.",
      eventId: "evt-1943-ina-singapore"
    },
    active: {
      title: "Royal Indian Navy Mutiny",
      year: "Feb 1946",
      description: "Indian sailors mutinied in Bombay, spreading rapidly to other ports and the public.",
      eventId: "evt-1946-rin-mutiny",
      location: "Bombay & Karachi",
      movement: "Revolutionary Struggle",
      leaders: ["Subhas Chandra Bose"]
    },
    consequence: {
      title: "British Decision to Withdraw & Independence",
      year: "1946–1947",
      description: "Realizing the loyalty of armed forces was lost, Britain decided to withdraw, granting Independence.",
      eventId: "evt-1947-independence"
    }
  }
];

// 5. India Map SVG Paths (state outlines for the interactive dashboard map)
export const INDIA_STATE_PATHS = {
  "tn": "M393.5,631.9 L403,639 414.5,635 413.5,628 408,627 405.5,636 405,636 398,631 393.5,635 Z",
  "karnataka": "M317,540 L328,552 345,560 342,580 320,590 305,587 295,565 300,548 310,543 Z",
  "kerala": "M305,570 L312,585 315,605 305,608 297,602 295,585 Z",
  "tamil-nadu": "M395,625 L410,622 415,632 412,642 395,645 385,632 390,628 Z",
  "andhra-pradesh": "M352,585 L370,580 385,595 390,615 375,620 360,610 355,600 352,588 Z",
  "telangana": "M308,530 L322,535 340,545 342,560 328,568 315,566 310,555 308,538 Z",
  "maharashtra": "M268,485 L285,478 300,482 310,506 305,520 290,530 272,525 265,510 270,490 Z",
  "gujarat": "M244,460 L255,465 268,472 265,488 248,495 238,485 240,465 Z",
  "madhya-pradesh": "M250,490 L268,488 280,505 278,530 262,540 250,520 245,500 252,490 Z",
  "chhattisgarh": "M260,520 L278,530 282,550 265,560 252,545 258,525 Z",
  "jharkhand": "M258,450 L275,440 280,460 268,465 258,455 Z",
  "odisha": "M268,460 L282,455 292,470 285,480 270,478 265,470 Z",
  "west-bengal": "M255,408 L270,400 278,412 272,420 260,418 255,412 Z",
  "bihar": "M250,430 L265,422 272,440 260,445 250,435 Z",
  "uttar-pradesh": "M210,390 L230,385 250,400 248,420 232,425 215,410 210,395 Z",
  "delhi": "M195,395 L202,398 206,405 200,410 192,405 Z",
  "haryana": "M200,410 L215,405 220,425 200,430 Z",
  "punjab": "M195,420 L210,415 218,432 198,435 Z",
  "himachal-pradesh": "M205,420 L222,410 225,435 202,440 Z",
  "uttarakhand": "M208,380 L220,375 228,395 210,400 202,392 Z",
  "rajasthan": "M175,440 L190,435 200,455 185,460 170,450 160,445 Z",
  "uttarakhand-himalaya": "M180,340 L210,330 225,370 200,380 175,375 Z",
  "assam": "M300,300 L320,290 335,305 325,320 305,318 Z",
  "meghalaya": "M290,300 L305,295 310,315 295,315 Z",
  "nagaland": "M310,305 L328,298 335,312 315,318 Z",
  "tripura": "M288,318 L298,315 300,328 290,328 Z",
  "mizoram": "M290,330 L305,325 308,340 292,340 Z",
  "manipur": "M295,322 L310,318 312,335 298,332 Z",
  "arunachal-pradesh": "M320,260 L350,250 355,280 320,290 Z",
  "sikkim": "M330,295 L340,295 345,308 330,310 Z",
  "goa-daman": "M310,575 L320,572 322,585 308,588 Z"
};

// 5b. Freedom Movement Event Locations with geographic coordinates
// Format: { id, title, lat, lng, state, year, movement, category, leaders, brief }
export const freedomMapEvents = [
  { id: "m-1770-sannyasi", title: "Sannyasi Rebellion", lat: 22.5, lng: 88.3, state: "west-bengal", year: 1770, movement: "Early Resistance", category: "Peasant Movement", leaders: "Majnu Shah, Bhawani Pathak", brief: "Peasant and ascetic rebellion against East India Company revenue demands." },
  { id: "m-1817-paika", title: "Paika Rebellion", lat: 20.5, lng: 85.8, state: "odisha", year: 1817, movement: "Early Resistance", category: "Peasant Movement", leaders: "Bakshi Jagabandhu Bidyadhara", brief: "Armed revolt by Paikas resisting British land takeover and salt monopolies." },
  { id: "m-1855-santhal", title: "Santhal Hul", lat: 25.5, lng: 85.3, state: "bihar", year: 1855, movement: "Early Resistance", category: "Tribal Resistance", leaders: "Sidho Murmu, Kanho Murmu", brief: "Indigenous uprising against oppressive zamindari revenue extortion." },
  { id: "m-1857-delhi", title: "Revolt of 1857 (Delhi)", lat: 28.6, lng: 77.2, state: "delhi", year: 1857, movement: "Early Resistance", category: "Revolt", leaders: "Rani Lakshmibai, Mangal Pandey, Bahadur Shah Zafar", brief: "First War of Independence began in Meerut and spread to Delhi." },
  { id: "m-1857-jhansi", title: "Jhansi Fort", lat: 25.8, lng: 81.0, state: "uttar-pradesh", year: 1857, movement: "Early Resistance", category: "Revolt", leaders: "Rani Lakshmibai", brief: "Jhansi's Rani led the defense against British forces during the 1857 revolt." },
  { id: "m-1857-kanpur", title: "Kanpur Massacre", lat: 26.3, lng: 80.3, state: "uttar-pradesh", year: 1857, movement: "Early Resistance", category: "Revolt", leaders: "Nana Saheb, Tatya Tope", brief: "Siege of Cawnpore during the 1857 uprising." },
  { id: "m-1905-calcutta", title: "Swadeshi Movement (Calcutta)", lat: 22.6, lng: 88.4, state: "west-bengal", year: 1905, movement: "Swadeshi Movement", category: "Mass Movement", leaders: "Bal Gangadhar Tilak, Bipin Chandra Pal, Aurobindo Ghosh", brief: "Partition of Bengal sparked nationwide Swadeshi and boycott movement." },
  { id: "m-1916-pune", title: "Home Rule League (Pune)", lat: 18.5, lng: 73.8, state: "maharashtra", year: 1916, movement: "Home Rule", category: "Mass Movement", leaders: "Bal Gangadhar Tilak, Annie Besant", brief: "Twin leagues established demanding self-government (Home Rule) for India." },
  { id: "m-1919-amritsar", title: "Jallianwala Bagh Massacre", lat: 30.0, lng: 75.0, state: "punjab", year: 1919, movement: "Non-Cooperation", category: "Mass Movement", leaders: "Mahatma Gandhi, Dr. Saifuddin Kitchlew", brief: "British troops fired on peaceful gathering in Amritsar, radicalizing the freedom struggle." },
  { id: "m-1920-ahmedabad", title: "Non-Cooperation Movement (Ahmedabad)", lat: 23.0, lng: 72.6, state: "gujarat", year: 1920, movement: "Non-Cooperation", category: "Mass Movement", leaders: "Mahatma Gandhi, Sardar Patel", brief: "Mass non-violent campaign boycotting colonial schools, courts, and foreign cloth." },
  { id: "m-1922-chauri-chaura", title: "Chauri Chaura Incident", lat: 27.8, lng: 81.9, state: "uttar-pradesh", year: 1922, movement: "Non-Cooperation", category: "Mass Movement", leaders: "Mahatma Gandhi", brief: "Police station arson led Gandhi to suspend Non-Cooperation to uphold non-violence." },
  { id: "m-1925-kakori", title: "Kakori Train Action", lat: 26.6, lng: 80.5, state: "uttar-pradesh", year: 1925, movement: "Revolutionary Struggle", category: "Revolutionary", leaders: "Ram Prasad Bismil, Ashfaqulla Khan, Chandrashekhar Azad", brief: "HSRA revolutionaries seized British treasury funds from a train to finance liberation." },
  { id: "m-1928-kolkata", title: "Simon Commission Protest", lat: 22.5, lng: 88.3, state: "west-bengal", year: 1928, movement: "Revolutionary Struggle", category: "Protest", leaders: "Bhagat Singh, Chittaranjan Das", brief: "Anti-Simon Commission protests where Lala Lajpat Rai was fatally lathicharged." },
  { id: "m-1930-sabarmati", title: "Salt March (Dandi March)", lat: 20.9, lng: 72.9, state: "gujarat", year: 1930, movement: "Civil Disobedience", category: "Protest", leaders: "Mahatma Gandhi, Sarojini Naidu, Kamaladevi Chattopadhyay", brief: "Gandhi marched 240 miles to break the colonial salt monopoly tax." },
  { id: "m-1930-ahmedabad", title: "Harijan Campaign", lat: 23.0, lng: 72.6, state: "gujarat", year: 1930, movement: "Civil Disobedience", category: "Social Reform", leaders: "Mahatma Gandhi", brief: "Gandhi launched the Harijan campaign for abolition of untouchability." },
  { id: "m-1931-lahore", title: "Martyrdom of Bhagat Singh", lat: 31.5, lng: 74.3, state: "punjab", year: 1931, movement: "Revolutionary Struggle", category: "Revolutionary", leaders: "Bhagat Singh, Shivaram Rajguru, Sukhdev Thapar", brief: "Execution of HSRA revolutionaries deepened patriotic fervor among youth." },
  { id: "m-1932-mumbai", title: "Civil Disobedience (Mumbai)", lat: 19.0, lng: 72.8, state: "maharashtra", year: 1932, movement: "Civil Disobedience", category: "Mass Movement", leaders: "Sardar Patel, B.R. Ambedkar", brief: "Nationwide protests against separate electorates led to Gandhi-Irwin Pact." },
  { id: "m-1935-purna-swaraj", title: "Poorna Swaraj Declaration", lat: 17.3, lng: 78.5, state: "telangana", year: 1935, movement: "Civil Disobedience", category: "Political", leaders: "Jawaharlal Nehru, Sardar Patel", brief: "Congress declared Complete Independence at Lahore session." },
  { id: "m-1942-mumbai", title: "Quit India Movement (Bombay)", lat: 19.0, lng: 72.8, state: "maharashtra", year: 1942, movement: "Quit India", category: "Mass Movement", leaders: "Mahatma Gandhi, Aruna Asaf Ali, Sardar Patel", brief: "Gandhi's 'Do or Die' call launched nationwide Quit India Movement." },
  { id: "m-1942-bengal", title: "Quit India Movement (Bengal)", lat: 22.8, lng: 88.3, state: "west-bengal", year: 1942, movement: "Quit India", category: "Mass Movement", leaders: "Subhas Chandra Bose, Sarat Bose", brief: "Mass protests and underground resistance in Bengal during Quit India." },
  { id: "m-1943-singapore", title: "Azad Hind Government Proclamation", lat: 1.3, lng: 103.8, state: "external", year: 1943, movement: "INA", category: "Military", leaders: "Netaji Subhas Chandra Bose, General Mohan Singh", brief: "Netaji proclaimed Provisional Government of Azad Hind in Singapore." },
  { id: "m-1945-delhi", title: "Red Fort INA Trials", lat: 28.6, lng: 77.2, state: "delhi", year: 1945, movement: "INA", category: "Protest", leaders: "Shah Nawaz Khan, Prem Sahgal, Gurbaksh Singh Dhillon", brief: "Court-martial of INA officers sparked public outrage across India." },
  { id: "m-1946-bombay", title: "Royal Indian Navy Mutiny", lat: 19.0, lng: 72.8, state: "maharashtra", year: 1946, movement: "INA", category: "Protest", leaders: "M.S. Khan, Madan Singh", brief: "Naval ratings mutinied, proving colonial armed forces would no longer enforce rule." },
  { id: "m-1946-telangana", title: "Telangana Armed Struggle", lat: 17.4, lng: 78.5, state: "telangana", year: 1946, movement: "INA", category: "Armed Struggle", leaders: "Srirama Reddy, Baba Amte", brief: "Peasant armed struggle against feudal landlords supported by the Communist Party." },
  { id: "m-1947-delhi", title: "Indian Independence (Tryst with Destiny)", lat: 28.6, lng: 77.2, state: "delhi", year: 1947, movement: "Civil Disobedience", category: "Political", leaders: "Jawaharlal Nehru, Mahatma Gandhi, Sardar Patel, B.R. Ambedkar", brief: "India attained independence, delivering Tryst with Destiny speech." }
];

/* Helper Query Functions */

export function getChainById(id, list = causeEffectChains) {
  if (!id || !Array.isArray(list)) return undefined;
  return list.find(c => c.id === id);
}

export function getEventById(id, list = freedomTimeline) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = id.trim().toLowerCase();
  return list.find(e => e.id.toLowerCase() === target);
}

export function filterTimelineEvents(query = "", movement = "all", phase = "all", list = freedomTimeline) {
  if (!Array.isArray(list)) return [];
  let result = list;

  if (movement && movement !== "all") {
    result = result.filter(e => e.movement.toLowerCase() === movement.toLowerCase());
  }

  if (phase && phase !== "all") {
    result = result.filter(e => e.phase.toLowerCase() === phase.toLowerCase());
  }

  const q = query.trim().toLowerCase();
  if (q) {
    result = result.filter(e => [
      e.title,
      e.movement,
      e.phase,
      e.location,
      String(e.year),
      e.description,
      e.historicalImpact,
      ...(e.keyLeaders || [])
    ].some(field => field && field.toLowerCase().includes(q)));
  }

  return result;
}

export function filterRevolutionaryOrgs(query = "", list = revolutionaryOrganizations) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  if (!q || q === "all") return list;

  return list.filter(org => [
    org.name,
    org.headquarters,
    org.ideology,
    org.description,
    String(org.establishedYear),
    ...(org.keyFounders || [])
  ].some(field => field && field.toLowerCase().includes(q)));
}

export function filterLeaders(categoryOrQuery = "", list = freedomLeaders) {
  if (!Array.isArray(list)) return [];
  const q = categoryOrQuery.trim().toLowerCase();
  if (!q || q === "all") return list;

  return list.filter(ldr => [
    ldr.name,
    ldr.title,
    ldr.category,
    ldr.era,
    ldr.keyContributions,
    ldr.popularQuote
  ].some(field => field && field.toLowerCase().includes(q)));
}

export function getDocumentById(id, list = historicalDocuments) {
  if (!id || !Array.isArray(list)) return undefined;
  return list.find(d => d.id.toLowerCase() === id.trim().toLowerCase());
}

export function filterDocuments(query = "", list = historicalDocuments) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  if (!q || q === "all") return list;

  return list.filter(doc => [
    doc.title,
    doc.author,
    doc.category,
    doc.excerpt,
    doc.historicalContext,
    String(doc.year)
  ].some(field => field && field.toLowerCase().includes(q)));
}

export function filterFreedomMapEvents(filters = {}, list = freedomMapEvents) {
  if (!Array.isArray(list)) return [];
  let result = list;

  const year = filters.year;
  if (year && year !== "all") {
    result = result.filter(e => e.year === year);
  }

  const region = filters.region;
  if (region && region !== "all") {
    result = result.filter(e => e.state === region || e.state === "external");
  }

  const movement = filters.movement;
  if (movement && movement !== "all") {
    result = result.filter(e => e.movement.toLowerCase() === movement.toLowerCase());
  }

  const category = filters.category;
  if (category && category !== "all") {
    result = result.filter(e => e.category.toLowerCase() === category.toLowerCase());
  }

  const query = filters.query;
  if (query && query.trim()) {
    const q = query.trim().toLowerCase();
    result = result.filter(e => [
      e.title,
      e.movement,
      e.category,
      e.state,
      e.leaders,
      e.brief,
      String(e.year)
    ].some(field => field && field.toLowerCase().includes(q)));
  }

  return result;
}

export function getMapEventById(id, list = freedomMapEvents) {
  if (!id || !Array.isArray(list)) return undefined;
  return list.find(e => e.id === id || e.id.toLowerCase() === id.toLowerCase());
}

export function getYearRange(list = freedomMapEvents) {
  if (!Array.isArray(list) || list.length === 0) return { min: 1770, max: 1947 };
  const years = list.map(e => e.year);
  return { min: Math.min(...years), max: Math.max(...years) };
}

export function getUniqueRegions(list = freedomMapEvents) {
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  list.forEach(e => {
    if (e.state && e.state !== "external") seen.add(e.state);
  });
  return Array.from(seen).sort();
}

export function getUniqueMovements(list = freedomMapEvents) {
  if (!Array.isArray(list)) return [];
  return Array.from(new Set(list.map(e => e.movement))).sort();
}

/* Browser DOM Engine */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.freedomTimelineData = freedomTimeline;
  window.revolutionaryOrgsData = revolutionaryOrganizations;
  window.freedomLeadersData = freedomLeaders;
  window.historicalDocumentsData = historicalDocuments;
  window.causeEffectChainsData = causeEffectChains;
  window.freedomMapEventsData = freedomMapEvents;
  window.INDIA_STATE_PATHS = INDIA_STATE_PATHS;

  window.filterTimelineEvents = filterTimelineEvents;
  window.getEventById = getEventById;
  window.filterRevolutionaryOrgs = filterRevolutionaryOrgs;
  window.filterLeaders = filterLeaders;
  window.filterDocuments = filterDocuments;
  window.getDocumentById = getDocumentById;
  window.getChainById = getChainById;
  window.filterFreedomMapEvents = filterFreedomMapEvents;
  window.getMapEventById = getMapEventById;
  window.getYearRange = getYearRange;

  document.addEventListener("DOMContentLoaded", () => {
    // Nav Tab Switching Logic
    const mainTabBtns = document.querySelectorAll(".freedom-tab-btn");
    const mainTabPanes = document.querySelectorAll(".freedom-tab-pane");

    mainTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab;
        mainTabBtns.forEach(b => b.classList.remove("active"));
        mainTabPanes.forEach(p => p.classList.remove("active"));

        btn.classList.add("active");
        const pane = document.getElementById(`tab-${target}`);
        if (pane) pane.classList.add("active");
      });
    });

    // 1. Render Timeline
    const timelineContainer = document.getElementById("freedom-timeline-container");
    const searchInput = document.getElementById("freedom-search");
    const movementSelect = document.getElementById("movement-filter");

    function renderTimeline() {
      if (!timelineContainer) return;
      timelineContainer.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const movement = movementSelect ? movementSelect.value : "all";

      const filtered = filterTimelineEvents(query, movement);

      if (filtered.length === 0) {
        timelineContainer.innerHTML = `
          <div class="empty-search-card">
            <h3>No Freedom Movements Found</h3>
            <p>Try adjusting your search query (e.g. Swadeshi, Non-Cooperation, Dandi, Quit India, INA, Sannyasi).</p>
          </div>
        `;
        return;
      }

      filtered.forEach(item => {
        const card = document.createElement("article");
        card.className = "freedom-event-card";

        const leadersHtml = (item.keyLeaders || [])
          .map(l => `<span class="leader-tag">👤 ${l}</span>`)
          .join(" ");

        card.innerHTML = `
          <div class="card-top">
            <span class="movement-badge">${item.movement}</span>
            <span class="phase-badge">${item.phase}</span>
          </div>
          <div class="event-headline">
            <span class="event-year">${item.year}</span>
            <div>
              <h3>${item.title}</h3>
              <span class="event-meta">📍 ${item.location} · 📅 ${item.date}</span>
            </div>
          </div>
          <p class="event-desc">${item.description}</p>
          <div class="leaders-row">${leadersHtml}</div>
          <div class="impact-box">
            <strong>💡 Historical Impact:</strong> ${item.historicalImpact}
          </div>
        `;
        timelineContainer.appendChild(card);
      });
    }

    searchInput?.addEventListener("input", renderTimeline);
    movementSelect?.addEventListener("change", renderTimeline);
    renderTimeline();

    // 2. Render Revolutionary Orgs
    const orgsContainer = document.getElementById("revolutionary-orgs-container");
    function renderOrgs() {
      if (!orgsContainer) return;
      orgsContainer.innerHTML = "";

      revolutionaryOrganizations.forEach(org => {
        const card = document.createElement("div");
        card.className = "org-card";

        const foundersHtml = (org.keyFounders || [])
          .map(f => `<li>${f}</li>`)
          .join("");

        card.innerHTML = `
          <span class="org-year-badge">Est. ${org.establishedYear}</span>
          <h3>${org.name}</h3>
          <p class="org-hq"><strong>HQ:</strong> ${org.headquarters}</p>
          <p class="org-ideology"><strong>Ideology:</strong> ${org.ideology}</p>
          <p class="org-desc">${org.description}</p>
          <div class="founders-box">
            <strong>Key Founders & Leaders:</strong>
            <ul>${foundersHtml}</ul>
          </div>
        `;
        orgsContainer.appendChild(card);
      });
    }
    renderOrgs();

    // 3. Render Leaders Gallery & Filter
    const leadersContainer = document.getElementById("leaders-grid-container");
    const leaderCategorySelect = document.getElementById("leader-category-select");

    function renderLeaders() {
      if (!leadersContainer) return;
      leadersContainer.innerHTML = "";

      const category = leaderCategorySelect ? leaderCategorySelect.value : "all";
      const filtered = filterLeaders(category);

      filtered.forEach(ldr => {
        const card = document.createElement("div");
        card.className = "leader-profile-card";
        card.innerHTML = `
          <div class="leader-avatar-box">
            <span class="avatar-icon">🇮🇳</span>
            <span class="leader-category-badge">${ldr.category}</span>
          </div>
          <h3>${ldr.name}</h3>
          <span class="leader-title-tag">${ldr.title}</span>
          <p class="leader-contrib"><strong>Key Role:</strong> ${ldr.keyContributions}</p>
          <blockquote class="leader-quote">"${ldr.popularQuote}"</blockquote>
        `;
        leadersContainer.appendChild(card);
      });
    }

    leaderCategorySelect?.addEventListener("change", renderLeaders);
    renderLeaders();

    // 4. Render Historical Documents Archive
    const docsContainer = document.getElementById("documents-grid-container");
    function renderDocuments() {
      if (!docsContainer) return;
      docsContainer.innerHTML = "";

      historicalDocuments.forEach(doc => {
        const card = document.createElement("article");
        card.className = "doc-card";
        card.innerHTML = `
          <div class="doc-header">
            <span class="doc-category">${doc.category}</span>
            <span class="doc-year">${doc.year}</span>
          </div>
          <h3>${doc.title}</h3>
          <p class="doc-author"><strong>Author / Sponsor:</strong> ${doc.author}</p>
          <blockquote class="doc-excerpt">"${doc.excerpt}"</blockquote>
          <div class="doc-context-box">
            <strong>Historical Context:</strong> ${doc.historicalContext}
          </div>
        `;
        docsContainer.appendChild(card);
      });
    }
    renderDocuments();

    // 5. Initialize Cause & Effect Explorer
    function initCauseEffectExplorer() {
      const select = document.getElementById("chain-select");
      if (!select) return;

      // Populate Select/Dropdown Options
      select.innerHTML = causeEffectChains.map(c => `
        <option value="${c.id}">${c.title}</option>
      `).join('');

      let activeChainId = causeEffectChains[0].id;

      function renderChain(chainId) {
        const chain = getChainById(chainId);
        if (!chain) return;

        activeChainId = chainId;

        // Render Node Contents
        document.getElementById("node-cause").querySelector(".node-title").textContent = chain.cause.title;
        document.getElementById("node-cause").querySelector(".node-meta").textContent = chain.cause.year;

        document.getElementById("node-active").querySelector(".node-title").textContent = chain.active.title;
        document.getElementById("node-active").querySelector(".node-meta").textContent = chain.active.year;

        document.getElementById("node-consequence").querySelector(".node-title").textContent = chain.consequence.title;
        document.getElementById("node-consequence").querySelector(".node-meta").textContent = chain.consequence.year;

        // Render Details Card
        document.getElementById("details-event-title").textContent = chain.active.title;
        document.getElementById("details-event-desc").innerHTML = `
          <strong>Root Cause:</strong> ${chain.cause.description}<br><br>
          <strong>The Event:</strong> ${chain.active.description}<br><br>
          <strong>Aftermath & Consequence:</strong> ${chain.consequence.description}
        `;
        document.getElementById("details-location").textContent = chain.active.location || "N/A";
        document.getElementById("details-movement").textContent = chain.active.movement || "N/A";

        // Render Key Leaders as Interactive Links/Chips
        const leadersBox = document.getElementById("details-leaders-links");
        if (leadersBox) {
          leadersBox.innerHTML = "";
          if (Array.isArray(chain.active.leaders) && chain.active.leaders.length > 0) {
            chain.active.leaders.forEach(name => {
              const chip = document.createElement("span");
              chip.className = "leader-chip-link";
              chip.textContent = name;
              chip.style.cursor = "pointer";
              // Clicking a leader chip switches to Leaders tab and highlights or searches the leader
              chip.addEventListener("click", () => {
                // Find Tab Button
                const tabBtn = document.querySelector('.freedom-tab-btn[data-tab="leaders"]');
                if (tabBtn) {
                  tabBtn.click();
                  // Try to search/filter leader in leader search box if exists, or highlight
                  const lFilter = document.getElementById("leader-category-select");
                  if (lFilter) {
                    lFilter.value = "all";
                    lFilter.dispatchEvent(new Event("change"));
                  }
                  // Scroll to leaders section
                  document.getElementById("tab-leaders")?.scrollIntoView({ behavior: 'smooth' });
                }
              });
              leadersBox.appendChild(chip);
            });
          } else {
            leadersBox.textContent = "N/A";
          }
        }

        // Highlight Active/Selected Node
        const nodes = document.querySelectorAll(".chain-node");
        nodes.forEach(n => n.classList.remove("selected"));
        document.getElementById("node-active").classList.add("selected");
      }

      // Dropdown selection change
      select.addEventListener("change", (e) => {
        renderChain(e.target.value);
      });

      // Clicking Node displays their respective description in details panel
      document.getElementById("node-cause").addEventListener("click", () => {
        const chain = getChainById(activeChainId);
        if (!chain) return;
        document.querySelectorAll(".chain-node").forEach(n => n.classList.remove("selected"));
        document.getElementById("node-cause").classList.add("selected");
        document.getElementById("details-event-title").textContent = chain.cause.title;
        document.getElementById("details-event-desc").textContent = chain.cause.description;
        document.getElementById("details-location").textContent = "N/A";
        document.getElementById("details-movement").textContent = "N/A";
        document.getElementById("details-leaders-links").textContent = "N/A";
      });

      document.getElementById("node-active").addEventListener("click", () => {
        renderChain(activeChainId);
      });

      document.getElementById("node-consequence").addEventListener("click", () => {
        const chain = getChainById(activeChainId);
        if (!chain) return;
        document.querySelectorAll(".chain-node").forEach(n => n.classList.remove("selected"));
        document.getElementById("node-consequence").classList.add("selected");
        document.getElementById("details-event-title").textContent = chain.consequence.title;
        document.getElementById("details-event-desc").textContent = chain.consequence.description;
        document.getElementById("details-location").textContent = "N/A";
        document.getElementById("details-movement").textContent = "N/A";
        document.getElementById("details-leaders-links").textContent = "N/A";
      });

      // Navigation: Cause/Reverse button
      document.getElementById("btn-prev-cause").addEventListener("click", () => {
        document.getElementById("node-cause").click();
      });

      // Navigation: Consequence/Forward button
      document.getElementById("btn-next-consequence").addEventListener("click", () => {
        document.getElementById("node-consequence").click();
      });

      // Timeline sync / deep dive
      document.getElementById("btn-deep-dive").addEventListener("click", () => {
        const chain = getChainById(activeChainId);
        if (!chain) return;

        // Try to find the exact timeline event ID
        let selectedNode = document.querySelector(".chain-node.selected");
        let eventId = chain.active.eventId;
        if (selectedNode && selectedNode.id === "node-cause") {
          eventId = chain.cause.eventId;
        } else if (selectedNode && selectedNode.id === "node-consequence") {
          eventId = chain.consequence.eventId;
        }

        // Switch to timeline tab
        const timelineTabBtn = document.querySelector('.freedom-tab-btn[data-tab="timeline"]');
        if (timelineTabBtn) {
          timelineTabBtn.click();

          // Search or highlight in timeline
          const searchInput = document.getElementById("freedom-search");
          const ev = getEventById(eventId);
          if (searchInput && ev) {
            searchInput.value = ev.title;
            searchInput.dispatchEvent(new Event("input"));
            
            // Scroll to the timeline container
            document.getElementById("tab-timeline")?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });

      // Initial Render
      renderChain(activeChainId);
    }
    initCauseEffectExplorer();

    // 6. Dashboard Engine — Interactive Map + Master Timeline + Search/Filters
    function initFreedomDashboard() {
      const mapSvg = document.getElementById("freedom-map-svg");
      const markersLayer = document.getElementById("freedom-map-markers");
      const timelineSlider = document.getElementById("freedom-year-slider");
      const yearDisplay = document.getElementById("freedom-year-display");
      const regionFilter = document.getElementById("freedom-region-filter");
      const movementFilter = document.getElementById("freedom-movement-filter");
      const categoryFilter = document.getElementById("freedom-category-filter");
      const eventSearch = document.getElementById("freedom-event-search");
      const timelineContainer = document.getElementById("freedom-master-timeline");
      const eventListContainer = document.getElementById("freedom-event-list");
      const detailModal = document.getElementById("freedom-event-detail-modal");
      const dashboardTabBtn = document.querySelector('.freedom-tab-btn[data-tab="dashboard"]');

      if (!mapSvg) return;

      const yearRange = getYearRange();
      let currentFilters = {
        year: "all",
        region: "all",
        movement: "all",
        category: "all",
        query: ""
      };

      // Populate region filter
      if (regionFilter) {
        const regions = getUniqueRegions();
        regionFilter.innerHTML = '<option value="all">All Regions</option>' +
          regions.map(r => {
            const label = r.replace(/-/g, " ");
            const pretty = label.charAt(0).toUpperCase() + label.slice(1).replace(/\b\w/g, l => l.toUpperCase());
            return `<option value="${r}">${pretty}</option>`;
          }).join("");
      }

      // Populate movement filter
      if (movementFilter) {
        const movements = getUniqueMovements();
        movementFilter.innerHTML = '<option value="all">All Movements</option>' +
          movements.map(m => `<option value="${m}">${m}</option>`).join("");
      }

      // Populate category filter
      if (categoryFilter) {
        const cats = Array.from(new Set(freedomMapEvents.map(e => e.category)));
        categoryFilter.innerHTML = '<option value="all">All Categories</option>' +
          cats.map(c => `<option value="${c}">${c}</option>`).join("");
      }

      // Set year slider range
      if (timelineSlider) {
        timelineSlider.min = yearRange.min;
        timelineSlider.max = yearRange.max;
        timelineSlider.value = yearRange.max;
      }
      if (yearDisplay) {
        yearDisplay.textContent = timelineSlider ? timelineSlider.value : yearRange.max;
      }

      function applyFilters() {
        const filtered = filterFreedomMapEvents(currentFilters);
        renderIndiaMap(filtered);
        renderMasterTimeline(filtered);
        renderEventList(filtered);
      }

      // Render interactive SVG India map with event markers
      function renderIndiaMap(events) {
        if (!markersLayer) return;
        markersLayer.innerHTML = "";

        events.forEach(evt => {
          if (evt.state === "external") return;

          const existingPath = mapSvg.querySelector(`path[data-state="${evt.state}"]`);
          if (existingPath) {
            existingPath.classList.add("freedom-state--highlighted");
          }

          const marker = document.createElement("div");
          marker.className = "freedom-map-marker";
          marker.style.left = `${evt.lng}%`;
          marker.style.top = `${evt.lat * 2.2}%`;
          marker.setAttribute("data-event-id", evt.id);
          marker.setAttribute("role", "button");
          marker.setAttribute("tabindex", "0");
          marker.setAttribute("aria-label", evt.title);
          marker.innerHTML = `<span class="marker-dot" style="background:${getCategoryColor(evt.category)}"></span>`;

          marker.addEventListener("click", () => selectMapEvent(evt.id));
          marker.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              selectMapEvent(evt.id);
            }
          });

          markersLayer.appendChild(marker);
        });
      }

      // Render master timeline with year-based events
      function renderMasterTimeline(events) {
        if (!timelineContainer) return;
        timelineContainer.innerHTML = "";

        const sorted = [...events].sort((a, b) => a.year - b.year);

        sorted.forEach(evt => {
          const item = document.createElement("div");
          item.className = "freedom-timeline-item";
          item.setAttribute("data-event-id", evt.id);
          item.setAttribute("tabindex", "0");
          item.setAttribute("role", "button");
          item.innerHTML = `
            <div class="timeline-year-badge" style="background:${getCategoryColor(evt.category)}">${evt.year}</div>
            <div class="timeline-event-card">
              <div class="timeline-card-header">
                <h4>${evt.title}</h4>
                <span class="timeline-card-movement">${evt.movement}</span>
              </div>
              <p class="timeline-card-brief">${evt.brief}</p>
              <div class="timeline-card-meta">
                <span>📍 ${evt.state.replace(/-/g, " ")}</span>
                <span>👤 ${evt.leaders}</span>
              </div>
            </div>
          `;

          item.addEventListener("click", () => selectTimelineEvent(evt.id));
          item.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              selectTimelineEvent(evt.id);
            }
          });

          timelineContainer.appendChild(item);
        });
      }

      // Render event list with search result highlighting
      function renderEventList(events) {
        if (!eventListContainer) return;
        eventListContainer.innerHTML = "";

        if (events.length === 0) {
          eventListContainer.innerHTML = `
            <div class="freedom-empty-state">
              <h3>No events found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          `;
          return;
        }

        const sorted = [...events].sort((a, b) => a.year - b.year);

        sorted.forEach(evt => {
          const item = document.createElement("div");
          item.className = "freedom-event-list-item";
          item.setAttribute("data-event-id", evt.id);
          item.innerHTML = `
            <div class="event-list-year">${evt.year}</div>
            <div class="event-list-content">
              <h4>${evt.title}</h4>
              <p class="event-list-movement">${evt.movement} · ${evt.category}</p>
              <p class="event-list-brief">${evt.brief}</p>
            </div>
          `;
          item.addEventListener("click", () => showEventDetail(evt.id));
          eventListContainer.appendChild(item);
        });
      }

      // Handle selecting an event from the map
      function selectMapEvent(id) {
        const evt = getMapEventById(id);
        if (!evt) return;

        // Highlight corresponding timeline item
        document.querySelectorAll(".freedom-timeline-item").forEach(item => {
          item.classList.toggle("active", item.dataset.eventId === id);
        });

        // Scroll timeline to the event
        const timelineItem = document.querySelector(`.freedom-timeline-item[data-event-id="${id}"]`);
        if (timelineItem) {
          timelineItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        showEventDetail(id);
      }

      // Handle selecting an event from the timeline
      function selectTimelineEvent(id) {
        const evt = getMapEventById(id);
        if (!evt) return;

        // Highlight corresponding marker
        const markers = document.querySelectorAll(".freedom-map-marker");
        markers.forEach(marker => {
          marker.classList.toggle("active", marker.dataset.eventId === id);
        });

        showEventDetail(id);
      }

      // Show event detail in a modal overlay
      function showEventDetail(id) {
        const evt = getMapEventById(id);
        if (!evt) return;

        // Find full timeline data if available
        const fullEvent = getEventById(evt.id.replace("m-", "evt-")) || getEventById(evt.id);

        if (detailModal) {
          const modalTitle = detailModal.querySelector(".modal-event-title");
          const modalYear = detailModal.querySelector(".modal-event-year");
          const modalMovement = detailModal.querySelector(".modal-event-movement");
          const modalCategory = detailModal.querySelector(".modal-event-category");
          const modalLocation = detailModal.querySelector(".modal-event-location");
          const modalLeaders = detailModal.querySelector(".modal-event-leaders");
          const modalBrief = detailModal.querySelector(".modal-event-brief");
          const modalDesc = detailModal.querySelector(".modal-event-desc");
          const modalImpact = detailModal.querySelector(".modal-event-impact");

          if (modalTitle) modalTitle.textContent = evt.title;
          if (modalYear) modalYear.textContent = evt.year;
          if (modalMovement) modalMovement.textContent = evt.movement;
          if (modalCategory) modalCategory.textContent = evt.category;
          if (modalLocation) modalLocation.textContent = evt.state.replace(/-/g, " ");
          if (modalLeaders) modalLeaders.textContent = evt.leaders;
          if (modalBrief) modalBrief.textContent = evt.brief;
          if (modalDesc) {
            modalDesc.textContent = fullEvent ? fullEvent.description : evt.brief;
          }
          if (modalImpact) {
            modalImpact.textContent = fullEvent ? fullEvent.historicalImpact : "See timeline for historical impact details.";
          }

          detailModal.classList.add("freedom-modal--visible");
          detailModal.setAttribute("aria-hidden", "false");

          // Close handlers
          const closeBtn = detailModal.querySelector(".freedom-modal-close");
          const closeHandler = () => {
            detailModal.classList.remove("freedom-modal--visible");
            detailModal.setAttribute("aria-hidden", "true");
          };
          if (closeBtn) {
            closeBtn.replaceWith(closeBtn.cloneNode(true));
            closeBtn.addEventListener("click", closeHandler);
          }

          const bgClickHandler = (e) => {
            if (e.target === detailModal) {
              closeHandler();
              detailModal.removeEventListener("click", bgClickHandler);
            }
          };
          detailModal.addEventListener("click", bgClickHandler);

          const escHandler = (e) => {
            if (e.key === "Escape") {
              closeHandler();
              document.removeEventListener("keydown", escHandler);
            }
          };
          document.addEventListener("keydown", escHandler);
        }
      }

      // Jump to map marker from timeline deep-dive
      function jumpToMarker(id) {
        const marker = document.querySelector(`.freedom-map-marker[data-event-id="${id}"]`);
        if (marker) {
          marker.classList.add("active");
          marker.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => marker.classList.remove("active"), 2000);
        }
      }

      // Category color mapping
      function getCategoryColor(category) {
        const colors = {
          "Revolt": "#f97316",
          "Peasant Movement": "#10b981",
          "Tribal Resistance": "#8b5cf6",
          "Mass Movement": "#3b82f6",
          "Revolutionary": "#ef4444",
          "Protest": "#f59e0b",
          "Social Reform": "#06b6d4",
          "Political": "#6366f1",
          "Military": "#ec4899",
          "Armed Struggle": "#7c3aed"
        };
        return colors[category] || "#eab308";
      }

      // Event listeners for dashboard controls
      if (eventSearch) {
        eventSearch.addEventListener("input", (e) => {
          currentFilters.query = e.target.value;
          applyFilters();
        });
      }

      if (timelineSlider) {
        timelineSlider.addEventListener("input", (e) => {
          const val = parseInt(e.target.value);
          if (yearDisplay) yearDisplay.textContent = val;
          currentFilters.year = val;
          applyFilters();
        });
      }

      if (regionFilter) {
        regionFilter.addEventListener("change", (e) => {
          currentFilters.region = e.target.value;
          applyFilters();
        });
      }

      if (movementFilter) {
        movementFilter.addEventListener("change", (e) => {
          currentFilters.movement = e.target.value;
          applyFilters();
        });
      }

      if (categoryFilter) {
        categoryFilter.addEventListener("change", (e) => {
          currentFilters.category = e.target.value;
          applyFilters();
        });
      }

      // State path hover interactivity
      if (mapSvg) {
        mapSvg.querySelectorAll("path.freedom-state").forEach(path => {
          path.addEventListener("mouseenter", () => {
            path.classList.add("hover");
          });
          path.addEventListener("mouseleave", () => {
            path.classList.remove("hover");
          });
        });
      }

      // Deep-dive from cause-effect explorer to map
      document.addEventListener("freedom:dashboard-jump-to-marker", (e) => {
        jumpToMarker(e.detail.id);
      });

      // Initial render
      applyFilters();
    }
    initFreedomDashboard();

  });
}
