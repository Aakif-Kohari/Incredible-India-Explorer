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
