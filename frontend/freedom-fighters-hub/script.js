/**
 * Freedom Fighters Knowledge Hub Data & Application Logic
 */

const FREEDOM_FIGHTERS_DATA = [
    {
        id: 'gandhi',
        name: 'Mahatma Gandhi',
        title: 'Father of the Nation',
        lifespan: '1869 – 1948',
        era: 'Gandhian Era',
        region: 'West',
        birthplace: 'Porbandar, Gujarat',
        movements: ['Non-Cooperation Movement', 'Salt Satyagraha (Dandi March)', 'Quit India Movement'],
        biography: 'Mohandas Karamchand Gandhi led India\'s independence movement against British rule using nonviolent civil disobedience (Ahimsa and Satyagraha), inspiring civil rights movements globally.',
        timeline: [
            { year: '1915', event: 'Returned to India from South Africa and joined Indian National Congress.' },
            { year: '1920', event: 'Launched Non-Cooperation Movement following Jallianwala Bagh massacre.' },
            { year: '1930', event: 'Led 240-mile Dandi Salt March defying British salt tax monopoly.' },
            { year: '1942', event: 'Initiated Quit India Movement with famous "Do or Die" call.' }
        ],
        contributions: 'Pioneered Ahimsa (non-violence) philosophy, promoted Khadi self-reliance, empowered rural communities, and unified millions across all social strata.',
        rareFacts: 'Nominated 5 times for the Nobel Peace Prize but never awarded. Traveled third class on Indian Railways throughout his campaigns.',
        quote: 'Be the change that you wish to see in the world.',
        explorerLink: '../gandhi-explorer/index.html'
    },
    {
        id: 'netaji',
        name: 'Subhas Chandra Bose',
        title: 'Netaji',
        lifespan: '1897 – 1945',
        era: 'Revolutionary',
        region: 'East',
        birthplace: 'Cuttack, Odisha',
        movements: ['Indian National Army (INA / Azad Hind Fauj)', 'Forward Bloc', 'Non-Cooperation'],
        biography: 'Netaji Subhas Chandra Bose was a charismatic revolutionary nationalist who established the Azad Hind Government and led the Indian National Army to fight British colonial rule militarily during WWII.',
        timeline: [
            { year: '1920', event: 'Ranked 4th in Indian Civil Services (ICS) exam but resigned to join freedom struggle.' },
            { year: '1938', event: 'Elected President of Indian National Congress at Haripura.' },
            { year: '1941', event: 'Daring submarine escape from British house arrest to Berlin and Japan.' },
            { year: '1943', event: 'Proclaimed Provisional Government of Free India in Singapore.' }
        ],
        contributions: 'Formed Azad Hind Fauj (INA) including Rani of Jhansi women\'s regiment; gave immortal slogans "Give me blood, and I shall give you freedom!" and "Jai Hind!".',
        rareFacts: 'Established India\'s first national planning committee in 1938 and formed the first all-women combat regiment (Rani of Jhansi Regiment).',
        quote: 'Give me blood, and I will give you freedom!'
    },
    {
        id: 'bhagat-singh',
        name: 'Bhagat Singh',
        title: 'Shaheed-e-Azam',
        lifespan: '1907 – 1931',
        era: 'Revolutionary',
        region: 'North',
        birthplace: 'Banga, Punjab (now Pakistan)',
        movements: ['Hindustan Socialist Republican Association (HSRA)', 'Naujawan Bharat Sabha'],
        biography: 'Bhagat Singh was a legendary revolutionary socialist whose martyrdom at age 23 galvanized youth across India to join the freedom movement.',
        timeline: [
            { year: '1926', event: 'Founded Naujawan Bharat Sabha to foster youth revolutionary consciousness.' },
            { year: '1928', event: 'Avenged Lala Lajpat Rai\'s death in Saunders action alongside Rajguru & Sukhdev.' },
            { year: '1929', event: 'Threw non-lethal bombs in Central Legislative Assembly to "make the deaf hear".' },
            { year: '1931', event: 'Martyred by hanging in Lahore Jail on March 23 alongside Rajguru and Sukhdev.' }
        ],
        contributions: 'Infused socialist ideology into freedom movement; popularized the rallying cry "Inquilab Zindabad!" (Long Live the Revolution).',
        rareFacts: 'Observed a historic 63-day hunger strike in Lahore Jail demanding equal rights for Indian political prisoners.',
        quote: 'They may kill me, but they cannot kill my ideas.'
    },
    {
        id: 'batukeshwar-dutt',
        name: 'Batukeshwar Dutt',
        title: 'Partner of Bhagat Singh',
        lifespan: '1910 – 1965',
        era: 'Revolutionary',
        region: 'East',
        birthplace: 'Khanari, Bardhaman, West Bengal',
        movements: ['Hindustan Socialist Republican Association (HSRA)', 'Central Legislative Assembly Bombing (1929)'],
        biography: 'Batukeshwar Dutt was a revolutionary of the Hindustan Socialist Republican Association who, with Bhagat Singh, hurled smoke bombs into the Central Legislative Assembly in Delhi on 8 April 1929 to protest repressive colonial bills. Shouting "Inquilab Zindabad! Long Live Revolution!", the pair deliberately surrendered to arrest, turning the Assembly bombing trial into a platform for revolutionary propaganda. Sentenced to transportation for life, Dutt endured years of imprisonment in Lahore, Multan, and Hazaribagh before release in the late 1930s.',
        timeline: [
            { year: '1910', event: 'Born on 18 November at Khanari, Bardhaman, Bengal Presidency.' },
            { year: 'c. 1928', event: 'Joined the Hindustan Socialist Republican Association and forged his partnership with Bhagat Singh.' },
            { year: '8 Apr 1929', event: 'Threw smoke bombs into the Central Legislative Assembly with Bhagat Singh and shouted "Long Live Revolution!"' },
            { year: '1929', event: 'Sentenced to transportation for life in the sensational Central Assembly Bomb Case.' },
            { year: '1930s', event: 'Imprisoned in Lahore, Multan, and Hazaribagh Central Jail during the years of the Lahore Conspiracy Case.' },
            { year: 'late 1930s', event: 'Released from prison and continued working for the freedom movement.' },
            { year: '1965', event: 'Died on 20 July in New Delhi; honoured with a commemorative postage stamp in 1967.' }
        ],
        contributions: 'With Bhagat Singh, staged the landmark Central Legislative Assembly bombing of 8 April 1929 that made the "deaf" colonial legislature hear the cry of revolution; used the Assembly bomb trial to popularise the ideals of the HSRA and the slogan "Inquilab Zindabad!"',
        rareFacts: 'The bombs in the Assembly were deliberately low-strength and non-lethal — designed to make a point, not to harm. A park in New Delhi\'s Lodi Estate and an Indian postage stamp (1967) commemorate him.',
        quote: 'Long live revolution! (Inquilab Zindabad!)',
        explorerLink: '../batukeshwar-dutt-explorer/index.html',
        explorerUrl: '../batukeshwar-dutt-explorer/index.html'
    },
    {
        id: 'rani-lakshmibai',
        name: 'Rani Lakshmibai',
        title: 'Rani of Jhansi',
        lifespan: '1828 – 1858',
        era: '1857 Revolt',
        region: 'Central',
        birthplace: 'Varanasi, Uttar Pradesh',
        movements: ['1857 First War of Indian Independence'],
        biography: 'Rani Lakshmibai was the courageous queen of the princely state of Jhansi who became a leading figure and symbol of resistance during the 1857 Rebellion.',
        timeline: [
            { year: '1853', event: 'Opposed Lord Dalhousie\'s unjust "Doctrine of Lapse" annexing Jhansi.' },
            { year: '1857', event: 'Assumed command of Jhansi forces defying British siege.' },
            { year: '1858', event: 'Fought valiantly at Gwalior Fort strapped with her adopted son Damodar Rao.' }
        ],
        contributions: 'Symbolized fearless armed resistance against British East India Company imperial expansionism; inspired future generations of female revolutionaries.',
        rareFacts: 'British General Hugh Rose praised her as "personally the smartest and bravest military leader of the rebels".',
        quote: 'I will not give up my Jhansi!'
    },
    {
        id: 'lakshmi-sahgal',
        name: 'Captain Lakshmi Sahgal',
        title: 'INA Commander & Doctor',
        lifespan: '1914 – 2012',
        era: 'Armed Freedom Movement',
        region: 'South',
        birthplace: 'Madurai, Tamil Nadu',
        movements: ['Indian National Army (INA)', 'Rani of Jhansi Regiment', 'Women in Freedom Struggle'],
        biography: 'Captain Lakshmi Sahgal was a medical doctor, INA commander, and Minister of Women\'s Affairs for Azad Hind. She led the Rani of Jhansi Regiment and became a celebrated symbol of women\'s courage in India\'s independence movement.',
        timeline: [
            { year: '1935', event: 'Graduated from Madras Medical College and began practicing medicine in Rangoon.' },
            { year: '1942', event: 'Met Subhas Chandra Bose and joined the Indian National Army after fleeing British-controlled Burma.' },
            { year: '1943', event: 'Named commander of the all-women Rani of Jhansi Regiment and appointed Minister of Women\'s Affairs in the Azad Hind government.' },
            { year: '1945', event: 'Helped preserve INA ideals after WWII and later championed women\'s rights in independent India.' }
        ],
        contributions: 'Built the INA\'s first all-women combat regiment, advanced women\'s participation in the freedom struggle, and represented Indian women as equal partners in military and political resistance.',
        rareFacts: 'She was one of the first Indian women to command a military regiment and continued public service after independence as a champion of healthcare and social justice.',
        quote: 'Freedom is not a gesture. It is the result of persistent struggle and sacrifice.'
    },
    {
        id: 'patel',
        name: 'Sardar Vallabhbhai Patel',
        title: 'Iron Man of India',
        lifespan: '1875 – 1950',
        era: 'Gandhian Era',
        region: 'West',
        birthplace: 'Nadiad, Gujarat',
        movements: ['Kheda Satyagraha', 'Bardoli Satyagraha', 'Quit India Movement'],
        biography: 'Sardar Patel was a barrister and statesman who served as India\'s first Deputy Prime Minister and Home Minister, masterminding the peaceful integration of 565 princely states into unified India.',
        timeline: [
            { year: '1918', event: 'Led Kheda peasant satyagraha securing tax relief during famine.' },
            { year: '1928', event: 'Earned title "Sardar" (Leader) during victorious Bardoli Satyagraha.' },
            { year: '1947', event: 'Integrated 565 princely states into the Indian Union within two years.' }
        ],
        contributions: 'Architect of United India; created All India Services (IAS/IPS) termed the "Steel Frame of India".',
        rareFacts: 'The Statue of Unity in Gujarat honoring Sardar Patel stands 182 meters high, making it the tallest statue in the world.',
        quote: 'Manpower without unity is not a strength unless it is harmonized and united properly.'
    },
    {
        id: 'azad',
        name: 'Chandrashekhar Azad',
        title: 'Azad',
        lifespan: '1906 – 1931',
        era: 'Revolutionary',
        region: 'North',
        birthplace: 'Bhabhra, Madhya Pradesh',
        movements: ['Kakori Conspiracy', 'Hindustan Socialist Republican Association (HSRA)'],
        biography: 'Chandrashekhar Azad was a fierce revolutionary strategist and mentor to Bhagat Singh who vowed never to be captured alive by the British police.',
        timeline: [
            { year: '1921', event: 'Joined Non-Cooperation Movement at age 15 and adopted the name "Azad" (Free).' },
            { year: '1925', event: 'Executed Kakori train robbery to fund revolutionary weapon purchases.' },
            { year: '1931', event: 'Fought solo gun battle against police at Alfred Park, Allahabad, fulfilling his pledge of remaining free.' }
        ],
        contributions: 'Reorganized HSRA into a formidable armed movement for socialist liberation; mentored young revolutionaries across North India.',
        rareFacts: 'Alfred Park in Prayagraj was renamed Chandrashekhar Azad Park in honor of his supreme sacrifice.',
        quote: 'We will face the bullets of the enemies. We have been free and will remain free!'
    },
    {
        id: 'sarojini-naidu',
        name: 'Sarojini Naidu',
        title: 'Nightingale of India',
        lifespan: '1879 – 1949',
        era: 'Gandhian Era',
        region: 'South',
        birthplace: 'Hyderabad, Telangana',
        movements: ['Dharasana Satyagraha', 'Civil Disobedience', 'Quit India Movement'],
        biography: 'Sarojini Naidu was a renowned poet, orator, feminist leader, and Indian independence activist who became the first female President of Indian National Congress and first female Governor of an Indian state.',
        timeline: [
            { year: '1914', event: 'Met Mahatma Gandhi in London and dedicated her life to national freedom.' },
            { year: '1925', event: 'Presided over Kanpur session of Indian National Congress (1st Indian woman INC president).' },
            { year: '1930', event: 'Led Dharasana Salt Works satyagraha after Gandhi\'s arrest.' },
            { year: '1947', event: 'Appointed Governor of United Provinces (now Uttar Pradesh).' }
        ],
        contributions: 'Pioneered women\'s suffrage and equal rights in India; published acclaimed poetry collections including "The Golden Threshold".',
        rareFacts: 'Her birthday (February 13) is celebrated annually across India as National Women\'s Day.',
        quote: 'A country\'s greatness lies in its undying ideals of love and sacrifice that inspire the mothers of the race.'
    },
    {
        id: 'tilak',
        name: 'Bal Gangadhar Tilak',
        title: 'Lokmanya',
        lifespan: '1856 – 1920',
        era: 'Early Nationalist',
        region: 'West',
        birthplace: 'Ratnagiri, Maharashtra',
        movements: ['All India Home Rule League', 'Swadeshi Movement'],
        biography: 'Bal Gangadhar Tilak was a scholar, mathematician, journalist, and nationalist leader whom British authorities called "The Father of the Indian Unrest".',
        timeline: [
            { year: '1881', event: 'Founded radical nationalist newspapers Kesari (Marathi) and Mahratta (English).' },
            { year: '1893', event: 'Transformed Ganesh Chaturthi into a public community festival to mobilize nationalist unity.' },
            { year: '1916', event: 'Founded Indian Home Rule League and orchestrated Lucknow Pact between Congress & Muslim League.' }
        ],
        contributions: 'Gave the iconic rallying slogan "Swaraj is my birthright and I shall have it!"; popularized Swadeshi goods and boycott of foreign textiles.',
        rareFacts: 'Wrote the profound philosophical commentary "Gita Rahasya" while serving 6 years solitary imprisonment in Mandalay Prison, Myanmar.',
        quote: 'Swaraj is my birthright and I shall have it!'
    },
    {
        id: 'lajpat-rai',
        name: 'Lala Lajpat Rai',
        title: 'Punjab Kesari',
        lifespan: '1865 – 1928',
        era: 'Early Nationalist',
        region: 'North',
        birthplace: 'Dhudike, Punjab',
        movements: ['Swadeshi Movement', 'Home Rule Movement', 'Simon Commission Protest'],
        biography: 'Lala Lajpat Rai, popularly known as Punjab Kesari (Lion of Punjab), was an Indian nationalist, educationist, and veteran freedom fighter. A key member of the Lal-Bal-Pal trio, he pioneered the Swadeshi movement in Punjab, founded the Punjab National Bank, and led the anti-Simon Commission protest in Lahore where he was fatally lathi-charged, becoming a martyr of the independence struggle.',
        timeline: [
            { year: '1865', event: 'Born on 28 January at Dhudike, Faridkot district, Punjab (then British India).' },
            { year: '1881', event: 'Joined the Indian National Congress at the age of 16.' },
            { year: '1885', event: 'Established the Dayanand Anglo-Vedic School in Lahore.' },
            { year: '1895', event: 'Co-founded Punjab National Bank in Lahore.' },
            { year: '1905', event: 'Edited the Punjabi weekly Punjabee and led Swadeshi protests during the Bengal Partition.' },
            { year: '1920', event: 'Elected President of the Indian National Congress at the Special Session in Kolkata.' },
            { year: '1928', event: 'Led the Simon Commission protest in Lahore and was mortally wounded in the lathi charge.' },
            { year: '1928', event: 'Died on 17 November, becoming a martyr whose sacrifice inspired a new generation of revolutionaries.' }
        ],
        contributions: 'Pioneered the Swadeshi boycott in Punjab; co-founded Punjab National Bank and Dayanand Anglo-Vedic Schools; served as INC President (1920); mobilised North Indian nationalism as one of the Lal-Bal-Pal extremist leaders.',
        rareFacts: 'His famous slogan "Simon Go Back!" galvanized nationwide anti-commission protests. His martyrdom directly inspired Bhagat Singh and HSRA to avenge his death by killing the police official J.P. Saunders.',
        quote: 'They may kill me, but they cannot kill my ideas.',
        explorerLink: '../lala-lajpat-rai-explorer/index.html'
    },
    {
        id: 'ambedkar',
        name: 'Dr. B.R. Ambedkar',
        title: 'Babasaheb',
        lifespan: '1891 – 1956',
        era: 'Gandhian Era',
        region: 'West',
        birthplace: 'Mhow, Madhya Pradesh',
        movements: ['Mahad Satyagraha', 'Depressed Classes Movement', 'Constituent Assembly'],
        biography: 'Dr. Bhimrao Ramji Ambedkar was a polymath, jurist, economist, and social reformer who campaigned against social discrimination and served as Chairman of the Drafting Committee of the Indian Constitution.',
        timeline: [
            { year: '1927', event: 'Led historic Mahad Satyagraha asserting Dalits\' rights to public water sources.' },
            { year: '1932', event: 'Signed Poona Pact securing reserved seats for depressed classes in legislatures.' },
            { year: '1947', event: 'Appointed India\'s first Law Minister and Chairman of Constitution Drafting Committee.' }
        ],
        contributions: 'Architect of the Constitution of India guaranteeing fundamental rights, gender equality, and affirmative action; founder of Reserve Bank of India conceptual blueprint.',
        rareFacts: 'Doctorates from Columbia University and London School of Economics; possessed a personal library of over 50,000 books.',
        quote: 'Educate, Agitate, Organize.'
    },
    {
        id: 'matangini-hazra',
        name: 'Matangini Hazra',
        title: 'Gandhi Buri',
        lifespan: '1870 – 1942',
        era: 'Quit India Movement',
        region: 'East',
        birthplace: 'Hogla, Tamluk, Bengal Presidency (now West Bengal)',
        movements: ['Non-Cooperation Movement', 'Civil Disobedience Movement (Salt Satyagraha)', 'Quit India Movement'],
        biography: 'Matangini Hazra was a Bengali freedom fighter from a poor peasant family who, despite having no formal education, became one of the most fearless faces of the independence movement in Midnapore, earning the affectionate title "Gandhi Buri" for her devotion to Gandhian ideals of non-violence.',
        timeline: [
            { year: '1930', event: 'Joined the Salt Satyagraha and Civil Disobedience Movement, courting arrest.' },
            { year: '1933', event: 'Waved a black flag at the Governor of Bengal in Tamluk and served six months of rigorous imprisonment.' },
            { year: '1942', event: 'Led roughly 6,000 volunteers, mostly women, toward Tamluk Police Station during the Quit India Movement and was shot dead on 29 September.' }
        ],
        contributions: 'Led the Vidyut Bahini volunteer corps during the Quit India Movement; became the first martyr of the movement in Midnapore, dying while holding the national flag aloft and chanting "Vande Mataram".',
        rareFacts: 'Despite being shot multiple times, she continued walking forward with the tricolour until she fell. India Post issued a commemorative postage stamp in her honor in 2002, and a road and statue in Kolkata bear her name.',
        quote: 'Vande Mataram.',
        explorerUrl: '../matangini-hazra-explorer/index.html'
    },
    {
        id: 'rash-behari-bose',
        name: 'Rash Behari Bose',
        title: 'Founder of the INA',
        lifespan: '1886 – 1945',
        era: 'Revolutionary',
        region: 'East',
        birthplace: 'Subaldaha, Bengal',
        movements: ['Delhi–Lahore Conspiracy', 'Indian Independence League', 'Indian National Army (early formation)'],
        biography: 'Rash Behari Bose was a revolutionary nationalist who fled into decades of exile in Japan after the 1912 Delhi Conspiracy, later organizing the Indian Independence League and the first Indian National Army before handing its leadership to Subhas Chandra Bose.',
        timeline: [
            { year: '1912', event: 'Involved in the Delhi–Lahore Conspiracy, an assassination attempt on Viceroy Lord Hardinge.' },
            { year: '1915', event: 'Escaped to Japan under an assumed identity to avoid British capture.' },
            { year: '1942', event: 'Helped found the Indian Independence League and organize the first Indian National Army.' },
            { year: '1943', event: 'Handed over leadership of the INA to Subhas Chandra Bose.' }
        ],
        contributions: 'Laid the international and organizational groundwork in Japan and Southeast Asia that made the later, larger Indian National Army under Subhas Chandra Bose possible.',
        rareFacts: 'Lived in exile in Japan for three decades, became a naturalized Japanese citizen, and never returned to India before his death in 1945.',
        quote: 'The freedom of India is knocking at our gates. Preserve, defend and cherish it.',
        explorerLink: '../rash-behari-bose-explorer/index.html'
    },
    {
        id: 'birsa-munda',
        name: 'Birsa Munda',
        title: 'Dharti Aba',
        lifespan: '1875 – 1900',
        era: 'Tribal Uprising',
        region: 'East',
        birthplace: 'Ulihatu, Khunti, Chotanagpur (now Jharkhand)',
        movements: ['Ulgulan (Great Tumult)', 'Birsait Religious Movement'],
        biography: 'Birsa Munda was a Munda tribal leader and folk hero who led the Ulgulan (the Great Tumult, 1895–1900) against British colonial rule, feudal landlords (thikadars) and missionaries, demanding the restoration of tribal land, forest and identity in the Chotanagpur plateau.',
        timeline: [
            { year: '1875', event: 'Born on 15 November at Ulihatu, Khunti, into a poor Munda khuntkattidar family.' },
            { year: '1895', event: 'Arrested on 24 August for his growing following; sentenced to two years in jail.' },
            { year: '1899', event: 'Launched the Ulgulan (Great Tumult) around 24 December, attacking churches and loyalist strongholds.' },
            { year: '1900', event: 'Captured at Jamkopai forest, Chakradharpur on 3 February; died of cholera in Ranchi Central Jail on 9 June.' }
        ],
        contributions: 'Inspired the Chotanagpur Tenancy Act (1908) protecting tribal land, became the spiritual founder of the Birsait faith, and his memory drove the creation of the state of Jharkhand on 15 November 2000.',
        rareFacts: 'His birth anniversary (15 November) has been celebrated nationwide as Janjatiya Gaurav Divas (Tribal Pride Day) since 2021; the British placed a reward of Rs 500 on his head.',
        quote: 'Abua raj ete jana, maharani raj tundu jana — Let the rule of the queen be over, and ours come.'
    },
    {
        id: 'kattabomman',
        name: 'Veerapandiya Kattabomman',
        title: 'Palayakkarar of Panchalankurichi',
        lifespan: '1760 – 1799',
        era: 'Early Nationalist',
        region: 'South',
        birthplace: 'Panchalankurichi, Tirunelveli, Tamil Nadu',
        movements: ['Resistance against East India Company Taxation', 'Poligar Wars'],
        biography: 'Veerapandiya Kattabomman was a Palayakkarar (poligar) chieftain of Panchalankurichi who refused to recognize the East India Company\'s authority to tax his territory, leading an armed resistance decades before the 1857 uprising and becoming one of South India\'s earliest martyrs against colonial rule.',
        timeline: [
            { year: '1760', event: 'Born on 3 January into the ruling family of the Panchalankurichi Palayam, Tirunelveli.' },
            { year: '1799', event: 'Confrontation with British collector Jackson at Ramnad escalates tensions with the Company.' },
            { year: '1799', event: 'Panchalankurichi fort besieged and destroyed by East India Company forces.' },
            { year: '1799', event: 'Captured after being handed over by the Raja of Pudukkottai; hanged on 16 October at Kayathar.' }
        ],
        contributions: 'Led one of South India\'s earliest armed resistances against East India Company tax authority; his martyrdom inspired his brother Oomaithurai and allied poligars to continue the Second Poligar War (1800–1801).',
        rareFacts: 'His story was immortalized in the landmark 1959 Tamil film Veerapandiya Kattabomman starring Sivaji Ganesan, cementing his place in South Indian popular memory.',
        quote: 'Remembered for refusing to recognize the East India Company\'s authority to tax Panchalankurichi.',
        explorerLink: '../kattabomman-explorer/index.html'
    },
    {
        id: 'velu-nachiyar',
        name: 'Velu Nachiyar',
        title: 'Veeramangai (Brave Woman)',
        lifespan: '1730 – 1796',
        era: 'Early Resistance',
        region: 'South',
        birthplace: 'Ramnad, Tamil Nadu',
        movements: ['Sivaganga Resistance', 'Alliance with Hyder Ali', 'Reclamation of Sivaganga'],
        biography: 'Velu Nachiyar, Queen of Sivaganga, is recognized as one of the earliest Indian rulers to organize armed resistance against the East India Company, reclaiming her kingdom in 1780 after years in exile building military alliances.',
        timeline: [
            { year: '1772', event: 'Sivaganga fell to combined East India Company and Arcot forces; her husband was killed in battle.' },
            { year: '1772–1780', event: 'Took refuge under Hyder Ali\'s protection near Dindigul, building alliances and forces.' },
            { year: '1780', event: 'Led a successful campaign to reclaim the kingdom of Sivaganga.' }
        ],
        contributions: 'Organized one of the earliest armed resistances against the East India Company, decades before the wider 19th-century uprisings; credited with raising a trained women\'s military regiment.',
        rareFacts: 'Commemorated on an Indian postage stamp in 1974; honored with the title "Veeramangai," meaning brave woman.',
        quote: 'I will avenge my husband\'s death and reclaim what is rightfully mine.',
        explorerLink: '../velu-nachiyar-explorer/index.html'
    },
    {
        id: 'tantia-bhil',
        name: 'Tantia Bhil',
        title: 'The "Indian Robin Hood"',
        lifespan: '1842 – 1889',
        era: 'Tribal Resistance',
        region: 'Central',
        birthplace: 'Nimar Region, Central India',
        movements: ['Bhil Tribal Resistance', 'Anti-Landlord Raids', 'Anti-Colonial Guerrilla Resistance'],
        biography: 'Tantia Bhil was a Bhil tribal leader from Central India who led two decades of resistance against British colonial authority and exploitative landlords, becoming a folk hero remembered as the "Indian Robin Hood" among tribal communities.',
        timeline: [
            { year: '1860s–70s', event: 'Began organizing resistance against exploitative landlords and colonial revenue policy.' },
            { year: '1870s–80s', event: 'Led a sustained two-decade campaign of resistance across Central India, evading capture.' },
            { year: '1889', event: 'Captured and executed by British colonial authorities.' }
        ],
        contributions: 'Organized sustained tribal resistance against colonial exploitation for roughly two decades, becoming a lasting symbol of Bhil community defiance.',
        rareFacts: 'Remembered largely through oral tradition and regional folklore rather than formal historical records, reflecting the underdocumented history of tribal resistance movements.',
        quote: 'The forests are ours, and so is our right to resist.',
        explorerLink: '../tantia-bhil-explorer/index.html'
    },
    {
        id: 'sidhu-murmu',
        name: 'Sidhu Murmu',
        title: 'Leader of the Santhal Hul',
        lifespan: 'c. 1815 – 1856',
        era: 'Tribal Resistance',
        region: 'East',
        birthplace: 'Bhognadih, Santhal Pargana',
        movements: ['Santhal Hul (1855–56)', 'Anti-Zamindar & Anti-Moneylender Resistance'],
        biography: 'Sidhu Murmu, along with his brothers Kanhu, Chand, and Bhairav, led the Santhal Hul of 1855–56 — a major tribal uprising against British colonial revenue policy and exploitative moneylenders, predating the 1857 Rebellion.',
        timeline: [
            { year: 'June 30, 1855', event: 'Declared the Santhal Hul at a mass gathering in Bhognadih.' },
            { year: '1855', event: 'Rebellion spread across the Rajmahal Hills region, drawing tens of thousands of Santhals.' },
            { year: '1856', event: 'Captured and executed by British colonial forces after the rebellion was suppressed.' }
        ],
        contributions: 'Led one of the earliest large-scale organized tribal uprisings against British colonial rule, directly contributing to the later creation of the Santhal Pargana as a distinct administrative region.',
        rareFacts: 'The Santhal Hul predated the 1857 Rebellion by roughly two years and involved tens of thousands of participants.',
        quote: 'We will no longer bow to the mahajans and the Company\'s revenue.',
        explorerLink: '../sidhu-murmu-explorer/index.html'
    },
    {
        id: 'begum-hazrat-mahal',
        name: 'Begum Hazrat Mahal',
        title: 'Maharani of Awadh',
        lifespan: '1820 – 1879',
        era: '1857 Revolt',
        region: 'Central',
        birthplace: 'Faizabad, Awadh (now Uttar Pradesh)',
        movements: ['Revolt of 1857', 'Siege of Lucknow'],
        biography: 'Begum Hazrat Mahal, born Muhammadi Khanum, was the consort of Nawab Wajid Ali Shah and the regent mother of Birjis Qadr. When Awadh was annexed in 1856 and the Revolt erupted in 1857, she seized the throne of Lucknow, crowned her son Wali, defended the city through the siege of the Residency, and after its fall continued guerrilla war from Awadh before taking refuge in Nepal, where she died in 1879.',
        timeline: [
            { year: '1820', event: 'Born as Muhammadi Khanum, a courtesan of noble lineage, in Faizabad, Awadh.' },
            { year: '1843', event: 'Moved to the court of Lucknow and became a wife of Nawab Wajid Ali Shah.' },
            { year: '1856', event: 'Awadh annexed by the East India Company on 7 February; Wajid Ali Shah exiled to Calcutta.' },
            { year: '1857', event: 'Seized the throne of Lucknow on 30 May; crowned her son Birjis Qadr Wali on 5 July.' },
            { year: '1858', event: 'Issued a rebuttal to Queen Victoria\'s proclamation, refusing pardon; conducted guerrilla warfare across Awadh.' },
            { year: '1859', event: 'Fled into Nepal and obtained asylum from Jung Bahadur Rana, refusing a British pension.' },
            { year: '1879', event: 'Died on 7 April in Kathmandu; buried at the Jama Masjid there.' }
        ],
        contributions: 'Led the defence of Lucknow through the siege of the Residency (1857), coordinated resistance across Awadh with a parallel government, and gave the rebels a legitimate royal rallying point in Birjis Qadr.',
        rareFacts: 'The Times of London wrote that she "has shown more sense and nerve than all her generals together"; in 1984 India Post issued a stamp in her honour.',
        quote: 'Khalq Khuda ka, Mulk Badshah ka, aur Hukm Rani ka — The people belong to God, the land to the King, and the command to the Queen.'
    },
    {
        id: 'tirupur-kumaran',
        name: 'Tirupur Kumaran',
        title: 'Kodi Kaatha Kumaran (Protector of the Flag)',
        lifespan: '1904 – 1932',
        era: 'Civil Disobedience Movement',
        region: 'South',
        birthplace: 'Near Erode, Madras Presidency (present-day Tamil Nadu)',
        movements: ['Desabandhu Youth Association', 'Civil Disobedience Movement'],
        biography: 'Tirupur Kumaran was a young freedom fighter of the Desabandhu Youth Association in Tirupur who was fatally struck by a British police lathi-charge on 11 January 1932 while leading a procession carrying the banned Indian national flag, refusing to let it fall even as he died — earning him the name "Kodi Kaatha Kumaran."',
        timeline: [
            { year: '1904', event: 'Born on 4 October near Erode, Madras Presidency, as Kumarasami Pillai.' },
            { year: 'c. 1930', event: 'Joins the Desabandhu Youth Association in Tirupur, active in the Civil Disobedience Movement.' },
            { year: '1932', event: 'Leads a procession through Tirupur on 11 January carrying the banned national flag.' },
            { year: '1932', event: 'Fatally struck by a police lathi-charge; dies the same day still holding the flag aloft.' }
        ],
        contributions: 'His sacrifice while protecting the national flag became a rallying symbol for the Civil Disobedience Movement in the Madras Presidency and remains commemorated in Tirupur to this day.',
        rareFacts: 'A statue of Kumaran holding the national flag stands at the Tirupur bus stand, and he is remembered every year through local commemorations honouring his sacrifice.',
        quote: 'Remembered for refusing to let the national flag touch the ground even as he collapsed from a fatal police blow.',
        explorerLink: '../tirupur-kumaran-explorer/index.html'
    },
    {
        id: 'alluri-sitarama-raju',
        name: 'Alluri Sitarama Raju',
        title: 'Manyam Veerudu (Hero of the Jungle)',
        lifespan: '1897 – 1924',
        era: 'Tribal Uprising',
        region: 'South',
        birthplace: 'Pandrangi, Visakhapatnam (now Andhra Pradesh)',
        movements: ['Rampa Rebellion (Manyam Rebellion, 1922–24)', 'Non-Cooperation Movement influence'],
        biography: 'Alluri Sitarama Raju was a sanyasi and revolutionary who led the Rampa Rebellion of 1922–24 against British colonial rule in the Eastern Ghats of the Madras Presidency. Rising against the 1882 Madras Forest Act and the ban on podu shifting cultivation, he organised the adivasis of the Godavari and Visakhapatnam Agencies into a guerrilla army that raided police stations and defied the empire for two years.',
        timeline: [
            { year: '1897', event: 'Born on 4 July at Pandrangi, near Visakhapatnam, into a middle-class Telugu family.' },
            { year: '1915', event: 'Took up sannyasa at about eighteen and began living among the tribal people of the Agency tracts.' },
            { year: '1921', event: 'Urged tribals to boycott colonial courts and settle disputes in their own panchayats, inspired by the Non-Cooperation Movement.' },
            { year: '1922', event: 'Launched the Rampa Rebellion with the raid on Chintapalli police station on 22 August; the British placed a Rs 10,000 bounty on his head.' },
            { year: '1924', event: 'Captured in the Chintapalli forests in May and executed by a firing squad at Koyyuru on 7 May.' }
        ],
        contributions: 'Led one of the most serious armed tribal risings of the twentieth century in the south, championed the forest and land rights of the adivasis of the Eastern Ghats, and inspired generations — his story reached a global audience through the film RRR (2022).',
        rareFacts: 'The British spent over Rs 40 lakh to crush the rebellion; his birthday, 4 July, is celebrated as a state festival in Andhra Pradesh, and the Alluri Sitharama Raju district was carved out of Visakhapatnam in 2022.',
        quote: 'Jai Hind! This is but the beginning of the fight — the forest will keep the flame of Swaraj alive.',
        explorerLink: '../alluri-sitarama-raju-explorer/index.html'
    },
    {
        id: 'quit-india-movement-bombay',
        name: 'Quit India Movement — Bombay Launch',
        title: 'Gowalia Tank Maidan, 8 August 1942',
        lifespan: '8 – 9 August 1942',
        era: 'Gandhian Era',
        region: 'West',
        birthplace: 'Gowalia Tank Maidan, Bombay',
        movements: ['Quit India Movement', 'AICC Bombay Session 1942'],
        biography: 'On 8 August 1942 the All India Congress Committee met at Gowalia Tank Maidan in Bombay and passed the Quit India Resolution demanding the immediate end of British rule in India. Jawaharlal Nehru moved the resolution, Sardar Patel seconded it, and Mahatma Gandhi gave the movement its mantra — "Do or Die" (Karo Ya Maro). Within hours of the session closing, the British arrested Gandhi, Nehru, Patel, Azad, Prasad, Naidu and Kripalani and carried them to Aga Khan Palace, Poona. The Bombay launch set off the widest wave of protests India had seen since 1857.',
        timeline: [
            { year: '14 Jul 1942', event: 'Congress Working Committee passes the Wardha draft of the Quit India resolution.' },
            { year: '7 Aug 1942', event: 'The AICC opens its session under a great pandal at Gowalia Tank Maidan, Bombay.' },
            { year: '8 Aug 1942', event: 'The Quit India Resolution is passed; Gandhi delivers his "Do or Die" speech.' },
            { year: '9 Aug 1942', event: 'Pre-dawn mass arrests of the Congress leadership; Aruna Asaf Ali hoists the flag at the maidan.' },
            { year: 'Aug 1942', event: 'Nationwide protests, strikes and sabotage from Bombay to Bihar; the government bans the Congress.' },
            { year: '1945', event: 'The imprisoned leaders are released with the end of the war; Quit India made British rule impossible.' }
        ],
        contributions: 'The Bombay launch of the Quit India Movement made the demand for immediate freedom a national imperative, triggered the widest protest wave since 1857, and convinced the British that the Raj could not survive the war.',
        rareFacts: 'The slogan "Quit India" was coined by the young Bombay socialist Yusuf Meherally; the maidan was renamed August Kranti Maidan after Independence, and India Post issued a commemorative stamp for the movement in 1992.',
        quote: '"Karo Ya Maro" — "Do or Die." We shall either free India or die in the attempt; we shall not live to see the perpetuation of our slavery. — Mahatma Gandhi, Gowalia Tank Maidan, 8 August 1942',
        explorerLink: '../quit-india-movement-explorer/index.html'},
          {
        id: 'baji-rout',
        name: 'Baji Rout',
        title: 'One of India\'s Youngest Martyrs',
        lifespan: '1926 – 1938',
        era: 'Praja Mandal Movement',
        region: 'East',
        birthplace: 'Nilakanthapur, Dhenkanal, Odisha',
        movements: ['Praja Mandal Movement (Dhenkanal)'],
        biography: 'Baji Rout was a twelve-year-old boatman from Dhenkanal, Odisha, who was fatally shot by state police in 1938 after refusing to ferry them across a river to suppress protesting villagers, becoming one of the youngest martyrs of India\'s freedom struggle.',
        timeline: [
            { year: '1926', event: 'Born into a boatman family in Nilakanthapur, Dhenkanal.' },
            { year: '1930s', event: 'Growing unrest in Dhenkanal as villagers organized under the Praja Mandal movement.' },
            { year: 'Oct 11, 1938', event: 'Refused to ferry police across the river to suppress protesters and was fatally shot.' }
        ],
        contributions: 'His refusal and martyrdom at age twelve became a galvanizing symbol for the Praja Mandal movement in Dhenkanal and is remembered across Odisha as an act of extraordinary courage.',
        rareFacts: 'Remembered as one of the youngest martyrs of India\'s freedom struggle; several institutions in Odisha are named in his honor.',
        quote: 'I will not take the police to catch my own people.',
        explorerLink: '../baji-rout-explorer/index.html'
    },
    {
        id: 'vanchinathan',
        name: 'Vanchinathan',
        title: 'South Indian Revolutionary',
        lifespan: '1886 – 1911',
        era: 'Swadeshi & Revolutionary Movement',
        region: 'South',
        birthplace: 'Senkottai, Tirunelveli',
        movements: ['Swadeshi Movement', 'South Indian Revolutionary Circles'],
        biography: 'Vanchinathan was a young revolutionary from Tirunelveli, Tamil Nadu, part of an early 20th-century South Indian nationalist movement influenced by the Swadeshi era and by regional leaders such as V. O. Chidambaram Pillai.',
        timeline: [
            { year: '1886', event: 'Born in Senkottai, Tirunelveli region, Madras Presidency.' },
            { year: '1908', event: 'Tirunelveli-Tuticorin region saw major unrest connected to Swadeshi-era resistance.' },
            { year: '1911', event: 'A significant, widely documented turning point in South India\'s revolutionary history.' }
        ],
        contributions: 'Part of the broader network of early 20th-century revolutionary nationalists demonstrating the geographic reach of anti-colonial resistance across South India.',
        rareFacts: 'His activity is studied alongside other regional revolutionary movements active in Bengal, Maharashtra, and Punjab during the same period.',
        quote: 'For the motherland, no sacrifice is too great.',
        explorerLink: '../vanchinathan-explorer/index.html'
    },
    {
        id: 'bagha-jatin',
        name: 'Jatindranath Mukherjee (Bagha Jatin)',
        title: 'Leader of the Jugantar Movement',
        lifespan: '1879 – 1915',
        era: 'Bengal Revolutionary Movement',
        region: 'East',
        birthplace: 'Kaya, Bengal Presidency',
        movements: ['Jugantar Group', 'Bengal Revolutionary Network'],
        biography: 'Jatindranath Mukherjee, known as "Bagha Jatin," was a central organizing leader of Bengal\'s early 20th-century revolutionary movement, associated with the Jugantar group, who died following the 1915 Battle of Balasore.',
        timeline: [
            { year: '1879', event: 'Born in Kaya, Bengal Presidency.' },
            { year: '1900s–1910s', event: 'Rose to leadership within the Jugantar revolutionary network.' },
            { year: 'Sept 1915', event: 'Fatally wounded in a confrontation with British forces near Balasore.' }
        ],
        contributions: 'Built and led an extensive revolutionary network across Bengal, mentoring a generation of nationalists and becoming a central figure in the region\'s armed independence movement.',
        rareFacts: 'Earned the name "Bagha Jatin" (Tiger Jatin) after a widely recounted incident demonstrating his physical courage.',
        quote: 'We shall die to awaken the nation.',
        explorerLink: '../bagha-jatin-explorer/index.html'
    },
    {
        id: 'underground-resistance-networks',
        name: 'Underground Resistance Networks — 1942–44',
        title: 'The Leaderless Years of the Quit India Movement',
        lifespan: '9 August 1942 – 1944',
        era: 'Gandhian Era',
        region: 'West',
        birthplace: 'Bombay, Delhi, Bihar, Satara, Midnapore',
        movements: ['Quit India Movement', 'Congress Radio', 'Underground Resistance'],
        biography: 'When "Operation Zero Hour" swept Gandhi, Nehru, Patel, Azad and the entire Congress Working Committee into prison on 9 August 1942, the movement did not stop — it went to ground. From Bombay to Bihar, from Satara to Midnapore, younger leaders built a web of secret radio stations, illegal newspapers, student couriers and regional organisers. Congress Radio broadcast from hidden Bombay rooms on 42.34 metres, Aruna Asaf Ali and Ram Manohar Lohia edited the underground Inquilab, Jayaprakash Narayan built the Azad Dastas guerrilla squads after escaping Hazaribagh jail, and the Satara Prati Sarkar and Tamluk Jatiya Sarkar ran parallel governments until the networks were hunted down one by one.',
        timeline: [
            { year: '9 Aug 1942', event: 'Operation Zero Hour — mass arrests of the Congress leadership; the underground is born.' },
            { year: '27 Aug 1942', event: 'Congress Radio begins broadcasting on 42.34 metres from a hidden Bombay room.' },
            { year: 'Sep 1942', event: 'Aruna Asaf Ali and Ram Manohar Lohia begin publishing the underground monthly Inquilab.' },
            { year: '9 Nov 1942', event: 'Jayaprakash Narayan escapes Hazaribagh jail and builds the Azad Dasta guerrillas of Bihar.' },
            { year: '12 Nov 1942', event: 'A police raid silences Congress Radio; Usha Mehta is arrested in the Radio Conspiracy Case.' },
            { year: 'Dec 1942', event: 'The Tamluk Jatiya Sarkar is established in Midnapore, printing its weekly Biplabi.' },
            { year: '1943', event: 'The Satara Prati Sarkar consolidates under Nana Patil — the longest-running parallel government.' },
            { year: '1944', event: 'Arrests, informers and raids thin the networks; the underground phase closes as the leaders are released.' }
        ],
        contributions: 'The underground networks sustained the Quit India Movement through its darkest period — carrying uncensored news, preserving morale, distributing arms, and proving village by village in Satara and Tamluk that Indians could govern themselves, forging the leaders who shaped independent India.',
        rareFacts: 'The slogan "Quit India" was coined by Yusuf Meherally, a founding figure of the underground; a reward of ₹5,000 was placed on Aruna Asaf Ali, who eluded capture for nearly four years; and the student Usha Mehta, who ran Congress Radio, was a 22-year-old Wilson College master\'s student.',
        quote: '"This is the Congress Radio calling on 42.34 metres from somewhere in India." — Congress Radio, 27 August 1942',
        explorerLink: '../underground-resistance-explorer/index.html'
    },
    {
        id: 'telangana-struggle',
        name: 'Telangana People\'s Struggle — 1946–51',
        title: 'The Telangana Rebellion',
        lifespan: '1946 – 1951',
        era: 'Pre-Independence & Post-Independence',
        region: 'South',
        birthplace: 'Nalgonda, Warangal, Khammam and Karimnagar districts, Hyderabad State',
        movements: ['Telangana Rebellion', 'Communist-led Agrarian Uprising', 'Indian National Congress'],
        biography: 'The Telangana People\'s Struggle was the largest armed peasant uprising of independent India. Against the oppressive rule of the Nizam\'s jagirdars (deshmukhs and deshpandes) and the private Razakar militia, peasants in the Telugu-speaking districts of Hyderabad State rose up in 1946 under the leadership of the Communist Party of India and Andhra Mahasabha. The movement began as a fight against forced labour (vetti), grain levies and land evictions, and grew into a guerrilla war in which peasants seized land and established gram rajya (village governments) across an estimated 3,000 villages. The Razakars retaliated with mass burnings and killings, and the movement reached its peak between 1948 and 1951, ultimately involving hundreds of thousands of peasants before the Indian Army\'s "Operation Polo" and the subsequent military suppression in 1951. It forced land reforms in the region and demonstrated the strength of bottom-up agrarian resistance, and is remembered today as a defining chapter of Telangana\'s history.',
        timeline: [
            { year: '1920s–30s', event: 'Andhra Mahasabha organizes farmers and cultural reform across Telangana against feudal oppression.' },
            { year: '1944', event: 'Communist organizers join the agrarian movement; demands take shape against vetti (forced labour) and grain levies.' },
            { year: '1946', event: 'The Telangana Rebellion begins with armed attacks on deshmukh properties in Nalgonda and Warangal.' },
            { year: '1947', event: 'Peasants seize land, abolish forced labour, and set up gram rajya councils across hundreds of villages.' },
            { year: 'Aug 1948', event: 'The Indian Army\'s "Operation Polo" integrates Hyderabad into the Indian Union.' },
            { year: '1951', event: 'The movement is militarily suppressed by the Indian state; several leaders are killed and thousands arrested.' },
            { year: '1960s–80s', event: 'The legacy of the struggle persists in later agrarian movements, land-reform movements and the statehood movement.' }
        ],
        contributions: 'The Telangana Rebellion abolished feudal labour practices in thousands of villages, seeded land reforms in the region, and left a lasting legacy of peasant assertion that shaped Telangana\'s political identity through the statehood movement. It is also a touchstone in studies of agrarian uprisings across the subcontinent.',
        rareFacts: 'Also called the Telangana People\'s Struggle, it was the largest armed peasant uprising in the history of independent India; it is commemorated annually in Telangana on "Telangana Liberation Day" and through cultural memory in Nalgonda, Warangal and Khammam.',
        quote: 'For centuries the peasants laboured under feudalism; the earth of Telangana rose against it — and the crops grew green over the soil of the revolution.',
        explorerLink: '../telangana-struggle-explorer/index.html'
    }
];

function filterFreedomFighters(data, search = '', era = 'all', region = 'all') {
    const s = search.trim().toLowerCase();
    return data.filter(item => {
        const matchesSearch = !s ||
            item.name.toLowerCase().includes(s) ||
            item.title.toLowerCase().includes(s) ||
            item.quote.toLowerCase().includes(s) ||
            item.birthplace.toLowerCase().includes(s) ||
            item.movements.some(m => m.toLowerCase().includes(s));

        const matchesEra = era === 'all' || item.era === era;
        const matchesRegion = region === 'all' || item.region === region;

        return matchesSearch && matchesEra && matchesRegion;
    });
}

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('ff-search-input');
        const clearBtn = document.getElementById('clear-search');
        const eraFilter = document.getElementById('era-filter');
        const regionFilter = document.getElementById('region-filter');
        const ffGrid = document.getElementById('ff-grid');
        const ffModal = document.getElementById('ff-modal');
        const modalBody = document.getElementById('modal-body');
        const modalCloseBtn = document.getElementById('modal-close-btn');

        // Quote Spotlight Carousel
        const quoteText = document.getElementById('quote-text');
        const quoteAuthor = document.getElementById('quote-author');
        let currentQuoteIdx = 0;

        function rotateQuote() {
            if (!quoteText || !quoteAuthor) return;
            const currentObj = FREEDOM_FIGHTERS_DATA[currentQuoteIdx];
            quoteText.textContent = `"${currentObj.quote}"`;
            quoteAuthor.textContent = `\u2014 ${currentObj.title} ${currentObj.name}`;
            currentQuoteIdx = (currentQuoteIdx + 1) % FREEDOM_FIGHTERS_DATA.length;
        }

        setInterval(rotateQuote, 6000);

        function renderGrid(items) {
            if (!ffGrid) return;
            if (items.length === 0) {
                ffGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--ff-text-secondary);">
                        <h3>No Freedom Fighters found matching your search.</h3>
                        <p>Try resetting filters or search keywords.</p>
                    </div>
                `;
                return;
            }

            ffGrid.innerHTML = items.map(item => `
                <div class="ff-card" data-id="${item.id}" tabindex="0" role="button" aria-label="View biography of ${item.name}">
                    <div>
                        <span class="ff-era-badge">${item.era}</span>
                        <div class="ff-card-header">
                            <div class="ff-avatar">🇮🇳</div>
                            <div class="ff-title-box">
                                <h3>${item.name}</h3>
                                <p>${item.title} (${item.lifespan})</p>
                            </div>
                        </div>
                        <p class="ff-bio-snippet">${item.biography.substring(0, 140)}...</p>
                        <div class="ff-movements-tags">
                            ${item.movements.map(m => `<span class="tag-movement">${m}</span>`).join('')}
                        </div>
                    </div>
                    <div class="ff-card-footer">
                        <span>📍 ${item.birthplace}</span>
                        <span>Read Full Bio &rarr;</span>
                    </div>
                </div>
            `).join('');

            document.querySelectorAll('.ff-card').forEach(card => {
                const openModal = () => {
                    const id = card.getAttribute('data-id');
                    const ffObj = FREEDOM_FIGHTERS_DATA.find(f => f.id === id);
                    if (ffObj) showModal(ffObj);
                };
                card.addEventListener('click', openModal);
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal();
                    }
                });
            });
        }

        function showModal(ff) {
            if (!ffModal || !modalBody) return;
            modalBody.innerHTML = `
                <div class="modal-header-flex">
                    <div class="modal-avatar">🇮🇳</div>
                    <div>
                        <span class="ff-era-badge">${ff.era}</span>
                        <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 0.2rem;">${ff.name}</h2>
                        <p style="color: var(--ff-gold); font-size: 1.1rem; font-weight: 600;">"${ff.title}" (${ff.lifespan})</p>
                    </div>
                </div>

                <div style="font-size: 1.05rem; line-height: 1.65; color: var(--ff-text-primary); margin-bottom: 1.2rem;">
                    <strong>Biography:</strong> ${ff.biography}
                </div>

                <div class="modal-section-title">Key Timeline & Milestones</div>
                <div class="timeline-list">
                    ${ff.timeline.map(t => `
                        <div class="timeline-item">
                            <strong>${t.year}:</strong> ${t.event}
                        </div>
                    `).join('')}
                </div>

                <div class="modal-section-title">Major Contributions & Movements</div>
                <p style="color: var(--ff-text-secondary); line-height: 1.6;">${ff.contributions}</p>

                <div class="rare-fact-box">
                    <strong>💡 Rare Historical Fact:</strong> ${ff.rareFacts}
                </div>

<div style="margin-top: 1.2rem; padding: 1rem; border-radius: 10px; background: rgba(0,0,0,0.3); border-left: 3px solid var(--ff-gold);">
                    <em style="color: var(--ff-gold); font-size: 1.05rem;">"${ff.quote}"</em>
                </div>

                ${ff.explorerUrl ? `
                <div style="margin-top: 1.2rem; text-align: center;">
                    <a href="${ff.explorerUrl}" class="btn-explorer-link" style="display:inline-block; padding:0.75rem 1.5rem; background:linear-gradient(135deg, #d97706, #16a34a); color:#fff; font-weight:700; border-radius:999px; text-decoration:none;">Launch Dedicated Explorer ➔</a>
                </div>
                ` : ''}
            `;
            ffModal.classList.remove('hidden');
        }
        function updateView() {
            const searchVal = searchInput ? searchInput.value : '';
            const eraVal = eraFilter ? eraFilter.value : 'all';
            const regionVal = regionFilter ? regionFilter.value : 'all';

            if (clearBtn) {
                if (searchVal) clearBtn.classList.remove('hidden');
                else clearBtn.classList.add('hidden');
            }

            const filtered = filterFreedomFighters(FREEDOM_FIGHTERS_DATA, searchVal, eraVal, regionVal);
            renderGrid(filtered);
        }

        if (searchInput) searchInput.addEventListener('input', updateView);
        if (eraFilter) eraFilter.addEventListener('change', updateView);
        if (regionFilter) regionFilter.addEventListener('change', updateView);

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                updateView();
            });
        }

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
                if (ffModal) ffModal.classList.add('hidden');
            });
        }

        if (ffModal) {
            ffModal.addEventListener('click', (e) => {
                if (e.target === ffModal) ffModal.classList.add('hidden');
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && ffModal && !ffModal.classList.contains('hidden')) {
                ffModal.classList.add('hidden');
            }
        });

        updateView();
    });
}

if (typeof module !== 'undefined') {
    module.exports = {
        FREEDOM_FIGHTERS_DATA,
        filterFreedomFighters
    };
}
