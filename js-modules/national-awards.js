/* ==========================================================================
   NATIONAL AWARDS EXPLORER — DATA & INTERACTION MODULE
   Comprehensive encyclopedia and searchable directory for India's major awards.
   ========================================================================== */

/**
 * AWARD_ENCYCLOPEDIA
 * Comprehensive data dictionary covering Civilian, Gallantry, Sports, and Literature awards.
 * Each entry includes Eligibility, History, Medal design, Notable Winners, and Interesting facts.
 */
export const AWARD_ENCYCLOPEDIA = {
  // ==================== CIVILIAN AWARDS ====================
  'bharat-ratna': {
    id: 'bharat-ratna',
    name: 'Bharat Ratna',
    category: 'civilian',
    categoryName: 'Civilian Honour',
    rank: "1st Highest Civilian Award",
    establishedYear: '1954',
    eligibility: 'Awarded for exceptional service / performance of the highest order in any field of human endeavour. Open to any person without distinction of race, occupation, position, or sex. Originally limited to arts, literature, science, and public services; expanded in 2011 to include any field.',
    history: 'Instituted on January 2, 1954 by President Rajendra Prasad. First awarded to C. Rajagopalachari, Sarvepalli Radhakrishnan, and C. V. Raman in 1954. Posthumous awards were permitted in 1955.',
    medalDesign: 'Designed in the shape of a peepal leaf (68mm long, 47mm wide). Made of toned bronze with a sun ray design embossed in platinum on the obverse alongside the words "BHARAT RATNA" in Devanagari. The reverse features the State Emblem of India and the national motto "Satyameva Jayate". Suspended by a 51mm white ribbon.',
    notableWinners: [
      { name: 'C. Rajagopalachari', year: 1954, note: 'First Indian Governor-General' },
      { name: 'Dr. Sarvepalli Radhakrishnan', year: 1954, note: 'Second President of India' },
      { name: 'Dr. C. V. Raman', year: 1954, note: 'Nobel Laureate in Physics' },
      { name: 'Dr. B. R. Ambedkar', year: 1990, note: 'Architect of Indian Constitution (Posthumous)' },
      { name: 'Dr. A. P. J. Abdul Kalam', year: 1997, note: 'President & Aerospace Scientist' },
      { name: 'Sachin Tendulkar', year: 2014, note: 'Cricket Legend (Youngest Recipient)' },
      { name: 'Karpoori Thakur', year: 2024, note: 'Social Reformer & Former Bihar CM' }
    ],
    interestingFacts: [
      'Sachin Tendulkar is the youngest recipient (awarded at age 40 in 2014) and first sportsperson.',
      'Two non-Indians have received the Bharat Ratna: Khan Abdul Ghaffar Khan (1987) and Nelson Mandela (1990). Mother Teresa was a naturalized Indian citizen (1980).',
      'The award carries no monetary grant or formal title; recipients are placed 7th in the Indian Order of Precedence.'
    ]
  },
  'padma-vibhushan': {
    id: 'padma-vibhushan',
    name: 'Padma Vibhushan',
    category: 'civilian',
    categoryName: 'Civilian Honour',
    rank: "2nd Highest Civilian Award",
    establishedYear: '1954',
    eligibility: 'Awarded for exceptional and distinguished service in any field, including service rendered by government servants (excluding doctors and scientists working in PSUs/government).',
    history: 'Instituted on January 2, 1954. Initially established as "Pahela Varga" (First Class) under the Padma Vibhushan order, and renamed Padma Vibhushan in 1955.',
    medalDesign: 'A circular bronze medallion with an embossed lotus flower in the center surrounded by a geometric square with raised borders. The obverse features the words "Padma" and "Vibhushan" in Devanagari. Suspended by a lotus-pink ribbon with a white central stripe.',
    notableWinners: [
      { name: 'Satyendra Nath Bose', year: 1954, note: 'Pioneering Physicist' },
      { name: 'Narlikar Jayant Vishnu', year: 1965, note: 'Astrophysicist' },
      { name: 'Lata Mangeshkar', year: 1999, note: 'Legendary Playback Singer' },
      { name: 'Mary Kom', year: 2020, note: 'Six-time World Boxing Champion' },
      { name: 'Vyjayanthimala Bali', year: 2024, note: 'Classical Dancer & Actress' }
    ],
    interestingFacts: [
      'Announced annually on the eve of Republic Day (January 25).',
      'Recommendations are processed by the Padma Awards Committee headed by the Cabinet Secretary.',
      'Total number of awards in a year is normally restricted to 120 (excluding posthumous and foreign awards).'
    ]
  },
  'padma-bhushan': {
    id: 'padma-bhushan',
    name: 'Padma Bhushan',
    category: 'civilian',
    categoryName: 'Civilian Honour',
    rank: "3rd Highest Civilian Award",
    establishedYear: '1954',
    eligibility: 'Awarded for distinguished service of a high order in any field, including public affairs, science, art, literature, trade, and social work.',
    history: 'Instituted in 1954 to recognize high-level distinguished achievement. Renamed from "Dusra Varga" (Second Class) in January 1955.',
    medalDesign: 'A circular bronze medallion featuring a central lotus pattern overlaid on a burnished bronze badge. The words "Padma" and "Bhushan" are inscribed above and below the central lotus motif. Suspended by a lotus-pink ribbon with two white central stripes.',
    notableWinners: [
      { name: 'Homi J. Bhabha', year: 1954, note: 'Father of Indian Nuclear Program' },
      { name: 'R. K. Narayan', year: 2000, note: 'Celebrated Novelist' },
      { name: 'Viswanathan Anand', year: 2001, note: '5-Time World Chess Champion' },
      { name: 'N. R. Narayana Murthy', year: 2008, note: 'Infosys Co-Founder & Tech Pioneer' },
      { name: 'Mithun Chakraborty', year: 2024, note: 'Veteran Actor' }
    ],
    interestingFacts: [
      'Awardees receive a Sanad (certificate) signed by the President of India and a medallion.',
      'Posthumous awards are made only in highly deserving cases.'
    ]
  },
  'padma-shri': {
    id: 'padma-shri',
    name: 'Padma Shri',
    category: 'civilian',
    categoryName: 'Civilian Honour',
    rank: "4th Highest Civilian Award",
    establishedYear: '1954',
    eligibility: 'Awarded for distinguished contribution in various spheres of activity including art, education, industry, literature, science, sports, medicine, social service, and public affairs.',
    history: 'Instituted in 1954 (originally named "Tisra Varga"). Renamed Padma Shri in 1955.',
    medalDesign: 'Geometric circular bronze badge featuring a stylized lotus emblem on the obverse with "Padma" and "Shri" embossed in Devanagari script. Suspended by a lotus-pink ribbon with three thin white stripes.',
    notableWinners: [
      { name: 'M. S. Swaminathan', year: 1967, note: 'Father of Green Revolution' },
      { name: 'Sudha Murty', year: 2006, note: 'Author & Philanthropist' },
      { name: 'Sundar Pichai', year: 2022, note: 'CEO of Google & Alphabet' },
      { name: 'Rohan Bopanna', year: 2024, note: 'Grand Slam Tennis Champion' }
    ],
    interestingFacts: [
      'Padma Shri is awarded to grassroots unsung heroes who have dedicated their lives to social causes without seeking public attention.',
      'Nomination portal is open to all citizens via the Rashtriya Puraskar Portal.'
    ]
  },

  // ==================== GALLANTRY AWARDS ====================
  'param-vir-chakra': {
    id: 'param-vir-chakra',
    name: 'Param Vir Chakra (PVC)',
    category: 'gallantry',
    categoryName: 'Wartime Gallantry',
    rank: "Highest Military Decoration",
    establishedYear: '1950',
    eligibility: 'Awarded for the most conspicuous bravery or some daring or pre-eminent act of valour or self-sacrifice in the presence of the enemy on land, sea, or air. Eligible for all ranks of the Army, Navy, Air Force, and Reserve Forces.',
    history: 'Instituted on January 26, 1950 (retrospective from August 15, 1947). Designed by Savitri Khanolkar (born Eve Yvonne Maday de Maros), wife of Army officer Vikram Khanolkar.',
    medalDesign: 'Circular bronze medallion (35mm diameter). On the obverse, four replicas of Indra’s Vajra (thunderbolt) surround the State Emblem of India. On the reverse, "PARAM VIR CHAKRA" is embossed in Hindi and English with two lotus flowers between the words. Suspended by a plain purple ribbon.',
    notableWinners: [
      { name: 'Major Somnath Sharma', year: 1947, note: 'First PVC Recipient (Posthumous, Badgam Battle)' },
      { name: 'Captain Gurbachan Singh Salaria', year: 1961, note: 'UN Peacekeeping in Congo' },
      { name: 'Flying Officer Nirmal Jit Singh Sekhon', year: 1971, note: 'Only IAF Recipient (Srinagar Air Defense)' },
      { name: 'Captain Vikram Batra', year: 1999, note: 'Kargil War Hero ("Yeh Dil Maange More!")' },
      { name: 'Subedar Major Yogendra Singh Yadav', year: 1999, note: 'Kargil War Tiger Hill Assault (Living)' }
    ],
    interestingFacts: [
      'Only 21 Param Vir Chakras have been awarded in India’s history, of which 14 were awarded posthumously.',
      'The designer Savitri Khanolkar drew inspiration from Rishi Dadhichi, who sacrificed his spine to forge Indra’s invincible Vajra.',
      '21 islands in Andaman and Nicobar were named after the 21 PVC awardees in 2023.'
    ]
  },
  'maha-vir-chakra': {
    id: 'maha-vir-chakra',
    name: 'Maha Vir Chakra (MVC)',
    category: 'gallantry',
    categoryName: 'Wartime Gallantry',
    rank: "2nd Highest Wartime Military Award",
    establishedYear: '1950',
    eligibility: 'Awarded for acts of conspicuous gallantry in the presence of the enemy, whether on land, at sea, or in the air.',
    history: 'Instituted on January 26, 1950 (retrospective from August 15, 1947). Over 218 awards have been conferred since independence.',
    medalDesign: 'Standard circular silver medal. Obverse bears a five-pointed star touching the rim, with the State Emblem embossed in the center. Reverse bears "MAHA VIR CHAKRA" in Hindi and English with two lotus flowers. Suspended by a half-white, half-orange ribbon.',
    notableWinners: [
      { name: 'Brigadier Rajinder Singh', year: 1947, note: 'Savior of Kashmir (First MVC)' },
      { name: 'Colonel B. Sant Singh', year: 1965, note: 'Bar to MVC (Two-time Recipient)' },
      { name: 'Colonel B. Sant Singh', year: 1971, note: '1971 Bangladesh Liberation War' },
      { name: 'Colonel B. Sant Singh', year: 2020, note: 'Galwan Valley Defender Colonel B. Santosh Babu' }
    ],
    interestingFacts: [
      'A bar attached to the ribbon denotes a second award of the Maha Vir Chakra (Bar to MVC).',
      'Colonel B. Santosh Babu was posthumously awarded MVC for extraordinary courage during the Galwan Valley clash in 2020.'
    ]
  },
  'vir-chakra': {
    id: 'vir-chakra',
    name: 'Vir Chakra',
    category: 'gallantry',
    categoryName: 'Wartime Gallantry',
    rank: "3rd Highest Wartime Military Award",
    establishedYear: '1950',
    eligibility: 'Awarded for acts of gallantry in the presence of the enemy on battlefield land, air, or maritime operations.',
    history: 'Instituted on January 26, 1950 (retrospective to August 15, 1947). Over 1,300 awards have been conferred.',
    medalDesign: 'Circular silver medal. Obverse features a five-pointed star with a central chakra (wheel) motif. Reverse bears "VIR CHAKRA" in Hindi and English with lotus flowers. Suspended by a half-blue, half-orange ribbon.',
    notableWinners: [
      { name: 'Group Captain Abhinandan Varthaman', year: 2019, note: 'Aerial Engagement & MiG-21 Bison Pilot' },
      { name: 'Honorary Captain Bana Singh', year: 1987, note: 'Operation Meghdoot Siachen (Later awarded PVC)' }
    ],
    interestingFacts: [
      'Wing Commander Abhinandan Varthaman was awarded Vir Chakra in 2019 for shooting down a PAF F-16 fighter jet during an aerial dogfight.'
    ]
  },
  'ashoka-chakra': {
    id: 'ashoka-chakra',
    name: 'Ashoka Chakra',
    category: 'gallantry',
    categoryName: 'Peacetime Gallantry',
    rank: "Highest Peacetime Gallantry Award",
    establishedYear: '1952',
    eligibility: 'Awarded for the most conspicuous bravery, or some daring or pre-eminent act of valour or self-sacrifice away from the battlefield (peacetime). Open to military personnel and civilians.',
    history: 'Instituted on January 4, 1952 as "Ashoka Chakra, Class I". Renamed Ashoka Chakra in 1967.',
    medalDesign: 'Circular gilded gold medal (35mm diameter). Obverse features a replica of Ashoka’s Chakra in the center surrounded by a lotus wreath. Reverse features "ASHOKA CHAKRA" in Hindi and English. Suspended by a green silk ribbon divided into two equal segments by an orange vertical line.',
    notableWinners: [
      { name: 'Flight Lieutenant Suhas Biswas', year: 1952, note: 'First IAF Ashoka Chakra Recipient' },
      { name: 'Neerja Bhanot', year: 1987, note: 'Flight Attendant who saved passengers on Pan Am Flight 73 (Youngest female recipient)' },
      { name: 'Major Sandeep Unnikrishnan', year: 2009, note: 'NSG Commando during 26/11 Mumbai Attacks' },
      { name: 'Havildar Hangpan Dada', year: 2017, note: 'Kupwara Operation Encounter (Posthumous)' }
    ],
    interestingFacts: [
      'Neerja Bhanot was the first woman and youngest recipient of the Ashoka Chakra (awarded posthumously at age 22).',
      'Unlike PVC, civilians are fully eligible for the Ashoka Chakra.'
    ]
  },
  'kirti-chakra': {
    id: 'kirti-chakra',
    name: 'Kirti Chakra',
    category: 'gallantry',
    categoryName: 'Peacetime Gallantry',
    rank: "2nd Highest Peacetime Gallantry Award",
    establishedYear: '1952',
    eligibility: 'Awarded for conspicuous gallantry away from the face of the enemy to armed forces personnel and civilians.',
    history: 'Instituted in 1952 as "Ashoka Chakra, Class II" and renamed Kirti Chakra in 1967.',
    medalDesign: 'Circular silver medal with Ashoka Chakra replica on obverse. Suspended by a green ribbon divided into three equal segments by two orange vertical lines.',
    notableWinners: [
      { name: 'Major Mahesh Kumar', year: 2019, note: 'Counter-Terrorism Operations' },
      { name: 'Captain Anshu Gupta', year: 2023, note: 'Special Forces Anti-Terror Ops' }
    ],
    interestingFacts: [
      'It is equivalent to the wartime Maha Vir Chakra in peacetime hierarchy.'
    ]
  },
  'shaurya-chakra': {
    id: 'shaurya-chakra',
    name: 'Shaurya Chakra',
    category: 'gallantry',
    categoryName: 'Peacetime Gallantry',
    rank: "3rd Highest Peacetime Gallantry Award",
    establishedYear: '1952',
    eligibility: 'Awarded for gallantry otherwise than in the face of the enemy, for counter-insurgency and peacetime anti-terror operations.',
    history: 'Instituted in 1952 as "Ashoka Chakra, Class III" and renamed Shaurya Chakra in 1967.',
    medalDesign: 'Circular bronze medal featuring Ashoka Chakra motif. Suspended by a green ribbon divided into four equal parts by three vertical orange lines.',
    notableWinners: [
      { name: 'Rifleman Aurangzeb', year: 2018, note: '44 Rashtriya Rifles Hero (Posthumous)' },
      { name: 'Group Captain Varun Singh', year: 2021, note: 'Tejas Aircraft Emergency Landing Handling' }
    ],
    interestingFacts: [
      'Frequently awarded to paramilitary and police personnel for counter-terrorism heroism in Jammu & Kashmir and North-East India.'
    ]
  },

  // ==================== SPORTS AWARDS ====================
  'khel-ratna': {
    id: 'khel-ratna',
    name: 'Major Dhyan Chand Khel Ratna Award',
    category: 'sports',
    categoryName: 'National Sports Award',
    rank: "Highest Sporting Honour of India",
    establishedYear: '1991',
    eligibility: 'Awarded for spectacular and most outstanding performance by a sportsperson over a period of 4 years at the international level (Olympics, Asian Games, Commonwealth Games, World Championships).',
    history: 'Instituted in 1991–92 (formerly Rajiv Gandhi Khel Ratna). Renamed in August 2021 in honour of hockey legend Major Dhyan Chand.',
    medalDesign: 'Medallion accompanied by a citation scroll and a cash prize of ₹25 lakh.',
    notableWinners: [
      { name: 'Viswanathan Anand', year: 1992, note: 'First Khel Ratna Recipient (Chess)' },
      { name: 'Sachin Tendulkar', year: 1997, note: 'Cricket Legend' },
      { name: 'Mary Kom', year: 2009, note: 'Six-time World Champion Boxer' },
      { name: 'Neeraj Chopra', year: 2021, note: 'Olympic Gold Medallist in Javelin' },
      { name: 'Satwiksairaj Rankireddy & Chirag Shetty', year: 2023, note: 'Badminton World No. 1 Pair' }
    ],
    interestingFacts: [
      'Viswanathan Anand was the first recipient of the Khel Ratna in 1991–92.',
      'Shooter Abhinav Bindra is the youngest recipient (received at age 18 in 2001).'
    ]
  },
  'arjuna-award': {
    id: 'arjuna-award',
    name: 'Arjuna Award',
    category: 'sports',
    categoryName: 'National Sports Award',
    rank: "Outstanding Performance in Sports",
    establishedYear: '1961',
    eligibility: 'Awarded for consistent outstanding performance over 4 years at international level, combined with qualities of leadership, sportsmanship, and sense of discipline.',
    history: 'Instituted in 1961 by the Ministry of Youth Affairs and Sports. Named after Arjuna, the archer hero from the Mahabharata.',
    medalDesign: 'Bronze statuette of Arjuna with his bow, a formal scroll, and a cash prize of ₹15 lakh.',
    notableWinners: [
      { name: 'P. K. Banerjee', year: 1961, note: 'Football Legend (First Arjuna Batch)' },
      { name: 'Sunil Gavaskar', year: 1975, note: 'Cricket Master' },
      { name: 'P. V. Sindhu', year: 2013, note: 'Olympic Medallist Badminton' },
      { name: 'Mohammed Shami', year: 2023, note: 'Cricket World Cup Fast Bowler' }
    ],
    interestingFacts: [
      'P. K. Banerjee (Football) was among the first batch of Arjuna awardees in 1961.',
      'Covers Olympic sports, indigenous games (like Kabaddi and Kho-Kho), and sports for differently-abled.'
    ]
  },
  'dronacharya-award': {
    id: 'dronacharya-award',
    name: 'Dronacharya Award',
    category: 'sports',
    categoryName: 'Sports Coaching Honour',
    rank: "Excellence in Sports Coaching",
    establishedYear: '1985',
    eligibility: 'Awarded to coaches who have produced medal winners at prestigious international sports events.',
    history: 'Instituted in 1985. Named after Guru Dronacharya, the legendary archer guru from Mahabharata.',
    medalDesign: 'Bronze statuette of Guru Dronacharya, a certificate, ceremonial dress, and cash prize of ₹15 lakh (Lifetime) / ₹10 lakh (Regular).',
    notableWinners: [
      { name: 'O. M. Nambiar', year: 1985, note: 'Coach of P. T. Usha (First Dronacharya Batch)' },
      { name: 'Ramakant Achrekar', year: 1990, note: 'Coach of Sachin Tendulkar' },
      { name: 'Pullela Gopichand', year: 2009, note: 'Badminton Coach of Saina Nehwal & PV Sindhu' }
    ],
    interestingFacts: [
      'Pullela Gopichand is one of the rare sportspersons to win both the Arjuna Award, Khel Ratna, AND Dronacharya Award.'
    ]
  },

  // ==================== LITERATURE AWARDS ====================
  'jnanpith-award': {
    id: 'jnanpith-award',
    name: 'Jnanpith Award',
    category: 'literature',
    categoryName: 'Literary Honour',
    rank: "Highest Literary Award in India",
    establishedYear: '1961',
    eligibility: 'Awarded annually for outstanding contribution towards literature in any of the 22 Scheduled Indian languages and English. Open only to Indian citizens.',
    history: 'Instituted in 1961 by the Bharatiya Jnanpith trust founded by industrialist Sahu Shanti Prasad Jain. First presented in 1965.',
    medalDesign: 'Bronze replica of Goddess Saraswati (Vagdevi), a citation plaque, and a cash prize of ₹11 lakh.',
    notableWinners: [
      { name: 'G. Sankara Kurup', year: 1965, note: 'First Recipient (Malayalam Poet)' },
      { name: 'Tarashankar Bandyopadhyay', year: 1966, note: 'Bengali Writer' },
      { name: 'Ashapoorna Devi', year: 1976, note: 'First Female Recipient (Bengali)' },
      { name: 'Amitav Ghosh', year: 2018, note: 'First English Language Recipient' },
      { name: 'Gulzar & Jagadguru Rambhadracharya', year: 2023, note: 'Urdu Poet & Sanskrit Scholar' }
    ],
    interestingFacts: [
      'G. Sankara Kurup won the inaugural award in 1965 for his Malayalam poetry collection "Odakkuzhal" (The Bamboo Flute).',
      'English was included as an eligible language in 2013; Amitav Ghosh became the first English writer to win in 2018.'
    ]
  },
  'sahitya-akademi-award': {
    id: 'sahitya-akademi-award',
    name: 'Sahitya Akademi Award',
    category: 'literature',
    categoryName: 'Literary Honour',
    rank: "National Academy of Letters Honour",
    establishedYear: '1954',
    eligibility: 'Awarded annually to outstanding books of literary merit published in any of the 24 languages recognized by the Sahitya Akademi (22 Scheduled Languages plus English and Rajasthani).',
    history: 'Instituted in 1954 by Sahitya Akademi (India\'s National Academy of Letters). First presented in 1955.',
    medalDesign: 'A casket containing an engraved copper plaque designed by filmmaker Satyajit Ray, alongside a cash prize of ₹1 lakh.',
    notableWinners: [
      { name: 'Makhanlal Chaturvedi', year: 1955, note: 'First Hindi Recipient ("Him Taringini")' },
      { name: 'R. K. Narayan', year: 1960, note: 'English Novel ("The Guide")' },
      { name: 'Amrita Pritam', year: 1956, note: 'First Woman Recipient (Punjabi)' },
      { name: 'Sanjeev', year: 2023, note: 'Hindi Literature ("Mujhe Pehchano")' }
    ],
    interestingFacts: [
      'The iconic copper plaque awarded to recipients was designed by Oscar-winning film director Satyajit Ray.',
      'Recognizes books in 24 Indian languages, promoting linguistic diversity and regional literature.'
    ]
  },

  // ==================== HEALTHCARE AWARDS ====================
  'national-florence-nightingale-award': {
    id: 'national-florence-nightingale-award',
    name: 'National Florence Nightingale Award',
    category: 'healthcare',
    categoryName: 'Nursing Excellence Honour',
    rank: "Highest Nursing Recognition",
    establishedYear: '1973',
    eligibility: 'Awarded to regular nursing staff from government and private hospitals with a minimum of 10 years of service. Candidates must possess recognized nursing qualifications (B.Sc. Nursing, GNM, or equivalent) and demonstrate exceptional dedication to patient care.',
    history: 'Instituted in 1973 by the Ministry of Health and Family Welfare, Government of India. Named after Florence Nightingale, the legendary British nurse who founded modern nursing practices during the Crimean War.',
    medalDesign: 'Includes a cash prize of ₹50,000, a citation certificate, and a medal. The award is presented annually on International Nurses Day (May 12th), Florence Nightingale\'s birthday.',
    notableWinners: [
      { name: 'Sister Lucy Kurien', year: 1985, note: 'Pediatric nursing and work with underprivileged children' },
      { name: 'Sister M. D. Rosalind', year: 1990, note: 'Mental health nursing and psychiatric patient care' },
      { name: 'Sister K. T. Rose', year: 1995, note: 'Critical care nursing and emergency department services' },
      { name: 'Sister Mary Thomas', year: 2000, note: 'Community health nursing and rural healthcare programs' },
      { name: 'Sister S. K. Anitha', year: 2020, note: 'Exceptional service during COVID-19 pandemic' }
    ],
    interestingFacts: [
      'The award is named after Florence Nightingale, known as "The Lady with the Lamp" for her night rounds during the Crimean War.',
      'Over 1,500 nurses have been recognized since the award\'s inception in 1973.',
      'The award ceremony is typically held on May 12th, International Nurses Day, which is also Florence Nightingale\'s birthday.',
      '35+ nurses are selected annually from across India for this prestigious honor.',
      'The award recognizes nurses from various specializations including critical care, pediatrics, mental health, and community health.'
  // ==================== SCIENCE AWARDS ====================
  'rashtriya-vigyan-puraskar': {
    id: 'rashtriya-vigyan-puraskar',
    name: 'Rashtriya Vigyan Puraskar',
    category: 'science',
    categoryName: 'National Science Honour',
    rank: "Highest Scientific Achievement Award",
    establishedYear: '1958',
    eligibility: 'Awarded to Indian scientists and researchers who have made exceptional contributions to scientific research, innovation, and technology development. Candidates must have a doctoral degree or equivalent, with significant original research published in peer-reviewed journals.',
    history: 'Instituted in 1958 by the Government of India to recognize and promote scientific excellence. The awards encompass multiple categories including the prestigious Shanti Swarup Bhatnagar Prize, CSIR Young Scientist Awards, and various institutional awards.',
    medalDesign: 'Varies by category - includes medals, citations, certificates, and cash prizes. The Shanti Swarup Bhatnagar Prize includes a citation, a plaque, and a cash award of ₹5 lakh. Other categories include research grants and fellowships.',
    notableWinners: [
      { name: 'Dr. C.N.R. Rao', year: 1968, note: 'Shanti Swarup Bhatnagar Prize - Chemical Sciences (Bharat Ratna)' },
      { name: 'Dr. A.P.J. Abdul Kalam', year: 1980, note: 'Multiple Science Awards (Former President, Bharat Ratna)' },
      { name: 'Dr. S. Chandrasekhar', year: 1960, note: 'Shanti Swarup Bhatnagar Prize - Physical Sciences (Nobel Laureate)' },
      { name: 'Dr. Gagandeep Kang', year: 2000, note: 'Young Scientist Award - Medical Sciences (Fellow of Royal Society)' },
      { name: 'Dr. K. Kasturirangan', year: 1990, note: 'Space Science Awards (Former ISRO Chairman, Padma Vibhushan)' }
    ],
    interestingFacts: [
      'The Shanti Swarup Bhatnagar Prize is named after the founder-director of CSIR and is considered one of India\'s highest science awards.',
      'Awards cover 15+ scientific disciplines including physical sciences, biological sciences, mathematical sciences, engineering, and medical sciences.',
      'Over 500 scientists have been recognized since the inception of the awards in 1958.',
      'Many awardees have received international recognition including Nobel Prizes and Fellowships of the Royal Society.',
      'The awards include special categories for young scientists (under 35) and women scientists to promote diversity in scientific research.'
    ]
  }
};

/**
 * Filter awards by category name.
 * @param {string} category ('all' | 'civilian' | 'gallantry' | 'sports' | 'literature' | 'science')
 * @returns {Array}
 */
export function filterAwardsByCategory(category = 'all') {
  const keys = Object.keys(AWARD_ENCYCLOPEDIA);
  if (category === 'all') return keys.map(k => AWARD_ENCYCLOPEDIA[k]);
  return keys.map(k => AWARD_ENCYCLOPEDIA[k]).filter(a => a.category.toLowerCase() === category.toLowerCase());
}

/**
 * Search awards encyclopedia & recipients by query.
 * @param {string} query
 * @returns {Array}
 */
export function searchAwardsAndRecipients(query = '') {
  const kw = query.toLowerCase().trim();
  if (!kw) return Object.values(AWARD_ENCYCLOPEDIA);

  return Object.values(AWARD_ENCYCLOPEDIA).filter(award => {
    const text = `${award.name} ${award.categoryName} ${award.eligibility} ${award.history} ${award.medalDesign}`.toLowerCase();
    const winnersText = award.notableWinners.map(w => `${w.name} ${w.note}`).join(' ').toLowerCase();
    return text.includes(kw) || winnersText.includes(kw);
  });
}

/**
 * Get individual award details by ID.
 * @param {string} awardKey
 * @returns {Object|null}
 */
export function getAwardDetailsByKey(awardKey = '') {
  return AWARD_ENCYCLOPEDIA[awardKey] || null;
}
