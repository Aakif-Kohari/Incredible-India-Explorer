/**
 * bharat-ratna-gallery.js
 * Complete dataset and interactive logic for Bharat Ratna recipients (1954 - 2024).
 * Exports dataset and helper functions for component rendering and Vitest testing.
 */

export const BHARAT_RATNA_RECIPIENTS = [
  // 1954
  {
    id: "br-c-rajagopalachari",
    name: "C. Rajagopalachari",
    year: 1954,
    decade: "1950s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Last Governor-General of India, freedom fighter, statesperson, and founder of the Swatantra Party.",
    biography: "Chakravarti Rajagopalachari, popularly known as Rajaji, was an Indian statesman, writer, lawyer, and independence activist. He served as the last Governor-General of India and Chief Minister of Madras State.",
    posthumous: false
  },
  {
    id: "br-s-radhakrishnan",
    name: "Dr. Sarvepalli Radhakrishnan",
    year: 1954,
    decade: "1950s",
    category: "Public Affairs",
    portrait: "assets/Abdul_kalam.png",
    contribution: "Second President of India, renowned philosopher, academician, and statesman whose birthday is celebrated as Teachers' Day.",
    biography: "Dr. S. Radhakrishnan was one of India's most distinguished twentieth-century scholars of comparative religion and philosophy. He served as the first Vice President and second President of India.",
    posthumous: false
  },
  {
    id: "br-cv-raman",
    name: "Dr. C. V. Raman",
    year: 1954,
    decade: "1950s",
    category: "Science & Tech",
    portrait: "assets/science/cv-raman.png",
    contribution: "Nobel Laureate in Physics (1930) for discovering the Raman Effect on light scattering.",
    biography: "Chandrasekhara Venkata Raman was an Indian physicist whose ground-breaking work in the field of light scattering earned him the 1930 Nobel Prize in Physics, marking the first Asian Nobel Prize in science.",
    posthumous: false
  },

  // 1955
  {
    id: "br-m-visvesvaraya",
    name: "Sir M. Visvesvaraya",
    year: 1955,
    decade: "1950s",
    category: "Science & Tech",
    portrait: "assets/Abdul_kalam.png",
    contribution: "Pioneering civil engineer and Diwan of Mysore whose birthday (Sept 15) is celebrated as Engineer's Day in India.",
    biography: "Mokshagundam Visvesvaraya was a pre-eminent Indian engineer, scholar, and statesman. He designed automatic sluice floodgates and the Krishna Raja Sagara Dam in Mysuru.",
    posthumous: false
  },
  {
    id: "br-jawaharlal-nehru",
    name: "Jawaharlal Nehru",
    year: 1955,
    decade: "1950s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "First Prime Minister of independent India, architect of modern Indian democracy, industrialization, and non-alignment.",
    biography: "Jawaharlal Nehru led India during its formative post-independence decades, establishing premier educational institutions like IITs and AIIMS alongside heavy industrial infrastructure.",
    posthumous: false
  },
  {
    id: "br-bhagwan-das",
    name: "Bhagwan Das",
    year: 1955,
    decade: "1950s",
    category: "Literature",
    portrait: "assets/Mahatma.png",
    contribution: "Theosophist, freedom fighter, and co-founder of Kashi Vidyapith university.",
    biography: "Dr. Bhagwan Das was an Indian Theosophist and public figure who advocated social equality, education reform, and ancient Indian philosophy synthesis.",
    posthumous: false
  },

  // 1957
  {
    id: "br-govind-ballabh-pant",
    name: "Govind Ballabh Pant",
    year: 1957,
    decade: "1950s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Key freedom fighter, first Chief Minister of Uttar Pradesh, and former Union Home Minister.",
    biography: "Pandit Govind Ballabh Pant played a key role in the Indian independence movement and served as Union Home Minister, establishing Hindi as an official language alongside English.",
    posthumous: false
  },

  // 1958
  {
    id: "br-dhondo-keshav-karve",
    name: "Dhondo Keshav Karve",
    year: 1958,
    decade: "1950s",
    category: "Social Work",
    portrait: "assets/Mahatma.png",
    contribution: "Social reformer who pioneered women's education and widow remarriage in India; founded SNDT Women's University.",
    biography: "Maharshi Dr. Dhondo Keshav Karve dedicated his century-long life to women's empowerment, establishing India's first women's university (SNDT) in 1916.",
    posthumous: false
  },

  // 1961
  {
    id: "br-bidhan-chandra-roy",
    name: "Dr. Bidhan Chandra Roy",
    year: 1961,
    decade: "1960s",
    category: "Public Affairs",
    portrait: "assets/Abdul_kalam.png",
    contribution: "Eminent physician and former Chief Minister of West Bengal; his birthday (July 1) is observed as National Doctors' Day.",
    biography: "Dr. B. C. Roy was a respected physician, freedom fighter, and statesman who laid the foundations for modern West Bengal's industrial and medical institutions.",
    posthumous: false
  },
  {
    id: "br-purushottam-das-tandon",
    name: "Purushottam Das Tandon",
    year: 1961,
    decade: "1960s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Freedom fighter and advocate for Hindi language official status, known as 'Rajarshi'.",
    biography: "Purushottam Das Tandon was a prominent leader from Uttar Pradesh who actively participated in the Non-Cooperation Movement and served as Speaker of the UP Legislative Assembly.",
    posthumous: false
  },

  // 1962
  {
    id: "br-rajendra-prasad",
    name: "Dr. Rajendra Prasad",
    year: 1962,
    decade: "1960s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "First President of India and President of the Constituent Assembly that drafted the Indian Constitution.",
    biography: "Dr. Rajendra Prasad was a scholar, lawyer, and key leader of the Indian National Congress who served as India's President for twelve years (1950–1962).",
    posthumous: false
  },

  // 1963
  {
    id: "br-zakir-husain",
    name: "Dr. Zakir Husain",
    year: 1963,
    decade: "1960s",
    category: "Public Affairs",
    portrait: "assets/Abdul_kalam.png",
    contribution: "Third President of India, eminent educationist, and co-founder of Jamia Millia Islamia university.",
    biography: "Dr. Zakir Husain was an intellectual pioneer who championed basic national education (Nai Talim) and served as Vice President and President of India.",
    posthumous: false
  },
  {
    id: "br-pandurang-vaman-kane",
    name: "Pandurang Vaman Kane",
    year: 1963,
    decade: "1960s",
    category: "Literature",
    portrait: "assets/Mahatma.png",
    contribution: "Indologist and Sanskrit scholar famous for his monumental work 'History of Dharmasastra'.",
    biography: "Mahamahopadhyaya Dr. P. V. Kane was an internationally acclaimed scholar who devoted 40 years to researching ancient Indian jurisprudence and Dharmasastra texts.",
    posthumous: false
  },

  // 1966
  {
    id: "br-lal-bahadur-shastri",
    name: "Lal Bahadur Shastri",
    year: 1966,
    decade: "1960s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Second Prime Minister of India who coined 'Jai Jawan Jai Kisan' and led India during the 1965 war.",
    biography: "Lal Bahadur Shastri was revered for his simplicity, integrity, and decisive leadership during the 1965 Indo-Pakistani War. He was the first recipient of the Bharat Ratna awarded posthumously.",
    posthumous: true
  },

  // 1971
  {
    id: "br-indira-gandhi",
    name: "Indira Gandhi",
    year: 1971,
    decade: "1970s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "First female Prime Minister of India; led India during the 1971 war leading to the liberation of Bangladesh.",
    biography: "Indira Gandhi served as Prime Minister of India from 1966 to 1977 and 1980 to 1984, steering India's green revolution, space program, and strategic foreign policy.",
    posthumous: false
  },

  // 1975
  {
    id: "br-v-v-giri",
    name: "V. V. Giri",
    year: 1975,
    decade: "1970s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Fourth President of India and pioneer of trade unionism and labor rights in India.",
    biography: "Varahagiri Venkata Giri was a trade union leader, diplomat, and statesman who served as Governor, Vice President, and President of India.",
    posthumous: false
  },

  // 1976
  {
    id: "br-k-kamaraj",
    name: "K. Kamaraj",
    year: 1976,
    decade: "1970s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Statesperson, former Chief Minister of Tamil Nadu, and pioneer of the free Midday Meal Scheme for school children.",
    biography: "Kumaraswami Kamaraj was a kingmaker in Indian politics and visionary administrator who introduced free primary education and midday meals in Tamil Nadu schools.",
    posthumous: true
  },

  // 1980
  {
    id: "br-mother-teresa",
    name: "Mother Teresa",
    year: 1980,
    decade: "1980s",
    category: "Social Work",
    portrait: "assets/Mahatma.png",
    contribution: "Nobel Peace Prize laureate (1979) and founder of Missionaries of Charity dedicated to serving the poor.",
    biography: "Mother Teresa of Calcutta devoted over 45 years to helping the poor, sick, orphaned, and dying in Kolkata and around the world.",
    posthumous: false
  },

  // 1983
  {
    id: "br-vinoba-bhave",
    name: "Acharya Vinoba Bhave",
    year: 1983,
    decade: "1980s",
    category: "Social Work",
    portrait: "assets/Mahatma.png",
    contribution: "Gandhian social reformer and founder of the Bhoodan (Land Gift) Movement.",
    biography: "Acharya Vinoba Bhave walked thousands of miles across India encouraging wealthy landowners to voluntarily gift land to landless farmers.",
    posthumous: true
  },

  // 1987
  {
    id: "br-khan-abdul-ghaffar-khan",
    name: "Khan Abdul Ghaffar Khan",
    year: 1987,
    decade: "1980s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Freedom fighter known as 'Frontier Gandhi' and founder of the non-violent Khudai Khidmatgar movement.",
    biography: "Khan Abdul Ghaffar Khan (Frontier Gandhi) was a lifelong advocate of non-violence and secular unity during the Indian freedom struggle. First non-Indian awarded Bharat Ratna.",
    posthumous: false
  },

  // 1988
  {
    id: "br-m-g-ramachandran",
    name: "M. G. Ramachandran",
    year: 1988,
    decade: "1980s",
    category: "Public Affairs",
    portrait: "assets/culture_default.png",
    contribution: "Cultural icon, actor, and Chief Minister of Tamil Nadu who expanded social welfare and midday meal programs.",
    biography: "MGR was a charismatic actor-turned-politician who served as Chief Minister of Tamil Nadu for ten years, creating lasting social welfare schemes.",
    posthumous: true
  },

  // 1990
  {
    id: "br-b-r-ambedkar",
    name: "Dr. B. R. Ambedkar",
    year: 1990,
    decade: "1990s",
    category: "Public Affairs",
    portrait: "assets/Abdul_kalam.png",
    contribution: "Chief Architect of the Constitution of India, social reformer, jurist, and champion of Dalit rights.",
    biography: "Dr. Bhimrao Ramji Ambedkar fought relentless battles against social discrimination, championed women's rights, served as India's first Law Minister, and chaired the Constitutional Drafting Committee.",
    posthumous: true
  },
  {
    id: "br-nelson-mandela",
    name: "Nelson Mandela",
    year: 1990,
    decade: "1990s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Anti-apartheid leader, Nobel Peace Laureate, and first democratically elected President of South Africa.",
    biography: "Nelson Mandela led the South African struggle against racial apartheid. Awarded Bharat Ratna in 1990 in recognition of his global fight for human dignity.",
    posthumous: false
  },

  // 1991
  {
    id: "br-rajiv-gandhi",
    name: "Rajiv Gandhi",
    year: 1991,
    decade: "1990s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Sixth Prime Minister of India who catalyzed India's telecommunications and IT revolution.",
    biography: "Rajiv Gandhi introduced telecom reforms, Panchayati Raj decentralization, and youth voting rights (reducing voting age to 18).",
    posthumous: true
  },
  {
    id: "br-vithalbhai-patel",
    name: "Sardar Vallabhbhai Patel",
    year: 1991,
    decade: "1990s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "First Deputy Prime Minister & Home Minister of India; 'Iron Man of India' who unified 565 princely states.",
    biography: "Sardar Vallabhbhai Patel integrated hundreds of princely states into the Indian Union post-independence with unmatched diplomatic firmness.",
    posthumous: true
  },
  {
    id: "br-morarji-desai",
    name: "Morarji Desai",
    year: 1991,
    decade: "1990s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Fourth Prime Minister of India and freedom fighter; only person awarded both Bharat Ratna and Nishan-e-Pakistan.",
    biography: "Morarji Desai served as Prime Minister from 1977 to 1979 and was renowned for his fiscal discipline and peace diplomacy.",
    posthumous: false
  },

  // 1992
  {
    id: "br-abul-kalam-azad",
    name: "Maulana Abul Kalam Azad",
    year: 1992,
    decade: "1990s",
    category: "Literature",
    portrait: "assets/Abdul_kalam.png",
    contribution: "First Minister of Education of independent India; established IITs, UGC, and Sahitya Akademi.",
    biography: "Maulana Azad was a senior Congress leader, scholar, and journalist who laid the foundation of India's national education policy.",
    posthumous: true
  },
  {
    id: "br-jrd-tata",
    name: "J. R. D. Tata",
    year: 1992,
    decade: "1990s",
    category: "Public Affairs",
    portrait: "assets/Narayan.png",
    contribution: "Pioneering industrialist, founder of Air India, and visionary builder of Tata Group industries.",
    biography: "Jehangir Ratanji Dadabhoy Tata was a pioneer of Indian civil aviation and industrial philanthropy who mentored Indian science and arts institutions.",
    posthumous: false
  },
  {
    id: "br-satyajit-ray",
    name: "Satyajit Ray",
    year: 1992,
    decade: "1990s",
    category: "Arts & Music",
    portrait: "assets/culture_default.png",
    contribution: "Oscar-winning auteur filmmaker, author, and illustrator who brought Indian cinema international acclaim.",
    biography: "Satyajit Ray directed cinematic masterpieces such as the Apu Trilogy, Charulata, and Music Room, receiving an Academy Honorary Award in 1992.",
    posthumous: false
  },

  // 1997
  {
    id: "br-gulzarilal-nanda",
    name: "Gulzarilal Nanda",
    year: 1997,
    decade: "1990s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Two-time interim Prime Minister of India and Gandhian labor leader.",
    biography: "Gulzarilal Nanda served as interim Prime Minister following the deaths of Jawaharlal Nehru in 1964 and Lal Bahadur Shastri in 1966.",
    posthumous: false
  },
  {
    id: "br-aruna-asaf-ali",
    name: "Aruna Asaf Ali",
    year: 1997,
    decade: "1990s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Heroine of Quit India Movement who hoisted the Indian flag at Gowalia Tank maidan, Bombay in 1942.",
    biography: "Aruna Asaf Ali was a brave freedom fighter and publisher who led underground movements during the 1942 Quit India campaign.",
    posthumous: true
  },
  {
    id: "br-apj-abdul-kalam",
    name: "Dr. A. P. J. Abdul Kalam",
    year: 1997,
    decade: "1990s",
    category: "Science & Tech",
    portrait: "assets/Abdul_kalam.png",
    contribution: "Aerospace scientist, 'Missile Man of India', and 11th President of India.",
    biography: "Dr. Avul Pakir Jainulabdeen Abdul Kalam led India's satellite launch vehicle (SLV-III) and missile development programs (Agni & Prithvi) before becoming President in 2002.",
    posthumous: false
  },

  // 1998
  {
    id: "br-ms-subbulakshmi",
    name: "M. S. Subbulakshmi",
    year: 1998,
    decade: "1990s",
    category: "Arts & Music",
    portrait: "assets/culture_default.png",
    contribution: "Legendary Carnatic classical vocalist; first musician to receive Bharat Ratna and Ramon Magsaysay Award.",
    biography: "Madurai Shanmukhavadivu Subbulakshmi mesmerized audiences worldwide, including at the UN General Assembly in 1966, through her devotional music.",
    posthumous: false
  },
  {
    id: "br-c-subramaniam",
    name: "C. Subramaniam",
    year: 1998,
    decade: "1990s",
    category: "Public Affairs",
    portrait: "assets/science/ms-swaminathan.png",
    contribution: "Union Agriculture Minister who spearheaded India's Green Revolution alongside M. S. Swaminathan.",
    biography: "Chidambaram Subramaniam introduced modern high-yielding wheat varieties and agricultural credit systems during the 1960s food crisis.",
    posthumous: false
  },

  // 1999
  {
    id: "br-jayaprakash-narayan",
    name: "Jayaprakash Narayan",
    year: 1999,
    decade: "1990s",
    category: "Social Work",
    portrait: "assets/Mahatma.png",
    contribution: "Freedom fighter and leader of the 'Total Revolution' movement for democratic restoration in 1974.",
    biography: "Loknayak Jayaprakash Narayan was a socialist leader who fought in the Quit India movement and led the pro-democracy movement against Emergency.",
    posthumous: true
  },
  {
    id: "br-amartya-sen",
    name: "Amartya Sen",
    year: 1999,
    decade: "1990s",
    category: "Literature",
    portrait: "assets/Abdul_kalam.png",
    contribution: "Nobel Laureate in Economics (1998) for welfare economics, social choice theory, and famine research.",
    biography: "Dr. Amartya Sen is a world-renowned economist and philosopher whose work on human development indices and famine prevention reshaped global development economics.",
    posthumous: false
  },
  {
    id: "br-gopinath-bordoloi",
    name: "Gopinath Bordoloi",
    year: 1999,
    decade: "1990s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "First Chief Minister of Assam who preserved Assam's territorial integration into India post-independence.",
    biography: "Lokapriya Gopinath Bordoloi resisted inclusion of Assam into East Pakistan during partition grouping schemes, safeguarding Northeast India.",
    posthumous: true
  },
  {
    id: "br-ravi-shankar",
    name: "Pandit Ravi Shankar",
    year: 1999,
    decade: "1990s",
    category: "Arts & Music",
    portrait: "assets/culture_default.png",
    contribution: "Virtuoso sitar maestro who popularized Indian classical music on the global international stage.",
    biography: "Pandit Ravi Shankar was a world-famous sitarist, composer, and Grammy awardee who collaborated with Western classical and pop musicians.",
    posthumous: false
  },

  // 2001
  {
    id: "br-lata-mangeshkar",
    name: "Lata Mangeshkar",
    year: 2001,
    decade: "2000s",
    category: "Arts & Music",
    portrait: "assets/literature/authors/Rabindranath%20Tagore.png",
    contribution: "'Nightingale of India' who sang over 30,000 songs across 36 Indian languages in a 70-year career.",
    biography: "Lata Mangeshkar is widely regarded as one of the greatest playback singers in Indian cinema history, evoking national emotion with classics like 'Aye Mere Watan Ke Logo'.",
    posthumous: false
  },
  {
    id: "br-bismillah-khan",
    name: "Ustad Bismillah Khan",
    year: 2001,
    decade: "2000s",
    category: "Arts & Music",
    portrait: "assets/culture_default.png",
    contribution: "Shehnai maestro who elevated the instrument from folk weddings to global concert stages; played at Red Fort on August 15, 1947.",
    biography: "Ustad Bismillah Khan was a legendary musician from Varanasi whose soul-stirring Shehnai performances symbolized India's syncretic cultural heritage.",
    posthumous: false
  },

  // 2009
  {
    id: "br-bhimsen-joshi",
    name: "Pandit Bhimsen Joshi",
    year: 2009,
    decade: "2000s",
    category: "Arts & Music",
    portrait: "assets/culture_default.png",
    contribution: "Kirana gharana Hindustani classical vocal maestro known for his powerful voice and devotional Khayal renditions.",
    biography: "Pandit Bhimsen Joshi was a titan of Indian classical music renowned for his emotive Khayal singing and devotional Abhangs.",
    posthumous: false
  },

  // 2014
  {
    id: "br-cnr-rao",
    name: "C. N. R. Rao",
    year: 2014,
    decade: "2010s",
    category: "Science & Tech",
    portrait: "assets/science/cv-raman.png",
    contribution: "Eminent solid-state chemist who authored over 1,700 research papers on materials science.",
    biography: "Dr. Chintamani Nagesa Ramachandra Rao is a world-renowned chemist who served as Chair of the Scientific Advisory Council to the Prime Minister.",
    posthumous: false
  },
  {
    id: "br-sachin-tendulkar",
    name: "Sachin Tendulkar",
    year: 2014,
    decade: "2010s",
    category: "Sports",
    portrait: "assets/Sachin.png",
    contribution: "Cricket legend holding records for 100 international centuries and highest runs in Test & ODI cricket; youngest Bharat Ratna recipient.",
    biography: "Sachin Ramesh Tendulkar played international cricket for 24 years, uniting a nation of a billion people through his unparalleled batting mastery.",
    posthumous: false
  },

  // 2015
  {
    id: "br-madan-mohan-malaviya",
    name: "Madan Mohan Malaviya",
    year: 2015,
    decade: "2010s",
    category: "Literature",
    portrait: "assets/Mahatma.png",
    contribution: "Mahamana educational reformer, freedom fighter, and founder of Banaras Hindu University (BHU).",
    biography: "Pandit Madan Mohan Malaviya was four-time Congress President, journalist, and founder of BHU (1916), one of Asia's largest residential universities.",
    posthumous: true
  },
  {
    id: "br-atal-bihari-vajpayee",
    name: "Atal Bihari Vajpayee",
    year: 2015,
    decade: "2010s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Tenth Prime Minister of India, celebrated orator, poet, and architect of Pokhran-II and Golden Quadrilateral highway project.",
    biography: "Atal Bihari Vajpayee served as Prime Minister three times, guiding India through economic growth, nuclear capability, and infrastructure expansion.",
    posthumous: false
  },

  // 2019
  {
    id: "br-pranab-mukherjee",
    name: "Pranab Mukherjee",
    year: 2019,
    decade: "2010s",
    category: "Public Affairs",
    portrait: "assets/Abdul_kalam.png",
    contribution: "13th President of India and veteran statesman with five decades of legislative and ministerial service.",
    biography: "Pranab Mukherjee served as Union Finance, Defence, and External Affairs Minister before serving as President from 2012 to 2017.",
    posthumous: false
  },
  {
    id: "br-nanaji-deshmukh",
    name: "Nanaji Deshmukh",
    year: 2019,
    decade: "2010s",
    category: "Social Work",
    portrait: "assets/Mahatma.png",
    contribution: "Social reformer who pioneered self-reliant rural development and health projects in Chitrakoot.",
    biography: "Chandikadas Amritrao Deshmukh devoted his later life to rural reconstruction, establishing the Chitrakoot Gramoday Vishwavidyalaya.",
    posthumous: true
  },
  {
    id: "br-bhupen-hazarika",
    name: "Bhupen Hazarika",
    year: 2019,
    decade: "2010s",
    category: "Arts & Music",
    portrait: "assets/culture_default.png",
    contribution: "Legendary Assamese playback singer, lyricist, filmmaker, and cultural ambassador of Northeast India.",
    biography: "Dr. Bhupen Hazarika's songs in Assamese, Bengali, and Hindi promoted communal harmony and humane values across South Asia.",
    posthumous: true
  },

  // 2024
  {
    id: "br-karpoori-thakur",
    name: "Karpoori Thakur",
    year: 2024,
    decade: "2020s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Champion of social justice and former Chief Minister of Bihar known as 'Jannayak'.",
    biography: "Karpoori Thakur introduced affirmative action quotas for backward classes in Bihar in 1978 and championed pro-poor governance.",
    posthumous: true
  },
  {
    id: "br-lk-advani",
    name: "L. K. Advani",
    year: 2024,
    decade: "2020s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Seventh Deputy Prime Minister of India and co-founder of BJP who shaped modern Indian politics.",
    biography: "Lal Krishna Advani served as Deputy Prime Minister and Union Home Minister, leading political campaigns that transformed India's electoral landscape.",
    posthumous: false
  },
  {
    id: "br-pv-narasimha-rao",
    name: "P. V. Narasimha Rao",
    year: 2024,
    decade: "2020s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Ninth Prime Minister of India who initiated historic 1991 economic liberalisation reforms.",
    biography: "Pamulaparthi Venkata Narasimha Rao, along with Dr. Manmohan Singh, dismantled the License Raj and integrated India into the global economy.",
    posthumous: true
  },
  {
    id: "br-chaudhary-charan-singh",
    name: "Chaudhary Charan Singh",
    year: 2024,
    decade: "2020s",
    category: "Public Affairs",
    portrait: "assets/Mahatma.png",
    contribution: "Fifth Prime Minister of India and champion of farmers' rights and land reform in North India.",
    biography: "Chaudhary Charan Singh pioneered progressive agrarian laws and land ceiling acts, protecting small and marginal farmers.",
    posthumous: true
  },
  {
    id: "br-ms-swaminathan",
    name: "M. S. Swaminathan",
    year: 2024,
    decade: "2020s",
    category: "Science & Tech",
    portrait: "assets/science/ms-swaminathan.png",
    contribution: "Architect of India's Green Revolution who saved millions from famine through high-yielding crop varieties.",
    biography: "Mankombu Sambasivan Swaminathan collaborated with Norman Borlaug to introduce high-yielding wheat and rice varieties, securing India's food self-sufficiency.",
    posthumous: true
  }
];

// --- Utility Helper Functions ---

/**
 * Filter Bharat Ratna recipients by category, decade, and search keyword.
 * @param {Array} recipients
 * @param {string} category
 * @param {string} decade
 * @param {string} searchKeyword
 * @returns {Array}
 */
export function filterRecipients(recipients = BHARAT_RATNA_RECIPIENTS, category = 'all', decade = 'all', searchKeyword = '') {
  const keyword = searchKeyword.toLowerCase().trim();

  return recipients.filter(r => {
    const matchesCategory = category === 'all' || r.category.toLowerCase() === category.toLowerCase();
    const matchesDecade = decade === 'all' || r.decade.toLowerCase() === decade.toLowerCase();
    const matchesSearch = !keyword ||
      r.name.toLowerCase().includes(keyword) ||
      r.contribution.toLowerCase().includes(keyword) ||
      r.biography.toLowerCase().includes(keyword) ||
      r.year.toString().includes(keyword);

    return matchesCategory && matchesDecade && matchesSearch;
  });
}

/**
 * Calculates summary metrics for the gallery dashboard.
 * @param {Array} recipients
 * @returns {Object}
 */
export function getBharatRatnaStats(recipients = BHARAT_RATNA_RECIPIENTS) {
  const total = recipients.length;
  const posthumousCount = recipients.filter(r => r.posthumous).length;
  const livingAtAwardCount = total - posthumousCount;
  
  const categories = {};
  recipients.forEach(r => {
    categories[r.category] = (categories[r.category] || 0) + 1;
  });

  return {
    totalRecipients: total,
    posthumousCount,
    livingAtAwardCount,
    categoriesCount: Object.keys(categories).length,
    firstAwardYear: 1954,
    latestAwardYear: 2024
  };
}
