/**
 * constitution-makers.js
 * Dataset and helper functions for Constituent Assembly Learning Hub.
 * Features members, roles, key contributions, and the drafting timeline.
 */

export const CONSTITUENT_ASSEMBLY_MEMBERS = [
  {
    id: "ambedkar",
    name: "Dr. B. R. Ambedkar",
    role: "Chairman, Drafting Committee",
    committee: "Drafting Committee",
    portrait: "assets/Abdul_kalam.png",
    contributions: "Known as the 'Father of the Indian Constitution', he piloted the draft through clause-by-clause debates, championed Fundamental Rights, Article 32 (Constitutional Remedies), and social abolition of untouchability (Article 17).",
    biography: "Dr. Bhimrao Ramji Ambedkar was a scholar, jurist, economist, and social reformer. As Chairman of the 7-member Drafting Committee, he synthesized diverse constitutional ideas into a unified legal framework for a secular, democratic republic.",
    keyQuotes: "Howsoever good a constitution may be, if those who are implementing it be not good, it will prove to be bad.",
    isWomanMember: false
  },
  {
    id: "rajendra-prasad",
    name: "Dr. Rajendra Prasad",
    role: "President of the Constituent Assembly",
    committee: "Rules of Procedure & Steering Committee",
    portrait: "assets/Mahatma.png",
    contributions: "Guided 3 years of assembly debates with impartial dignity, maintained parliamentary discipline across 11 sessions, and signed the final constitutional document.",
    biography: "Dr. Rajendra Prasad was a prominent freedom fighter, lawyer, and scholar from Bihar who was unanimously elected President of the Constituent Assembly on December 11, 1946.",
    keyQuotes: "In the Constitution, we have provided for full democracy and freedom to all citizens of India.",
    isWomanMember: false
  },
  {
    id: "nehru",
    name: "Jawaharlal Nehru",
    role: "Mover of Objectives Resolution & Union Powers Committee Chair",
    committee: "Union Powers & Union Constitution Committee",
    portrait: "assets/Mahatma.png",
    contributions: "Moved the landmark Objectives Resolution on December 13, 1946, which defined the core philosophy of a Sovereign Democratic Republic that evolved into the Preamble.",
    biography: "Jawaharlal Nehru was India's first Prime Minister whose vision for secularism, scientific temper, fundamental rights, and non-alignment shaped key constitutional principles.",
    keyQuotes: "The first task of this Assembly is to free India through a new Constitution.",
    isWomanMember: false
  },
  {
    id: "patel",
    name: "Sardar Vallabhbhai Patel",
    role: "Chairman, Advisory Committee on Fundamental Rights & Minorities",
    committee: "Advisory Committee & Provincial Constitution Committee",
    portrait: "assets/Mahatma.png",
    contributions: "Instrumental in shaping provincial governance models, integrating 565 princely states into the constitutional framework, and drafting minority safeguards.",
    biography: "Sardar Vallabhbhai Patel, the 'Iron Man of India', steered the integration of princely states into the Indian Union and ensured administrative unity across all provinces.",
    keyQuotes: "By common endeavor we can raise the country to a new greatness.",
    isWomanMember: false
  },
  {
    id: "hansa-mehta",
    name: "Hansa Jivraj Mehta",
    role: "Member, Advisory Committee & Fundamental Rights Sub-Committee",
    committee: "Fundamental Rights Sub-Committee",
    portrait: "assets/culture_default.png",
    contributions: "Championed gender equality, civil rights, and universal adult franchise; ensured the phrasing 'all human beings are created equal' in human rights framing.",
    biography: "Hansa Mehta was a prominent reformer, educator, and writer who represented India on the UN Human Rights Commission and advocated fervently for women's legal equality in the Indian Constitution.",
    keyQuotes: "Women in India have fought alongside men for freedom; equality must be guaranteed in the Constitution.",
    isWomanMember: true
  },
  {
    id: "alladi",
    name: "Alladi Krishnaswamy Ayyar",
    role: "Member, Drafting Committee",
    committee: "Drafting Committee",
    portrait: "assets/Abdul_kalam.png",
    contributions: "Renowned legal luminary who drafted critical provisions on citizenship, executive powers, and judicial review mechanisms.",
    biography: "Sir Alladi Krishnaswamy Ayyar was a former Advocate-General of Madras State whose profound legal acumen was indispensable to Dr. Ambedkar during drafting debates.",
    keyQuotes: "The Supreme Court of India has a higher jurisdiction than any other supreme court in the world.",
    isWomanMember: false
  },
  {
    id: "km-munshi",
    name: "K. M. Munshi",
    role: "Member, Drafting Committee & Order of Business Committee",
    committee: "Drafting Committee",
    portrait: "assets/Mahatma.png",
    contributions: "Drafted key sections of the Preamble, advocated for cultural and educational rights of minorities, and established parliamentary order of business.",
    biography: "Kanaiyalal Maneklal Munshi was an eminent lawyer, politician, and Gujarati author who played a vital role in drafting the Preamble and fundamental rights.",
    keyQuotes: "The Preamble is the horoscope of our sovereign democratic republic.",
    isWomanMember: false
  },
  {
    id: "begum-aizaz-rasul",
    name: "Begum Aizaz Rasul",
    role: "Member, Minorities Sub-Committee",
    committee: "Minorities Sub-Committee",
    portrait: "assets/culture_default.png",
    contributions: "The only Muslim woman member of the Constituent Assembly; famously argued against separate electorates to foster national integration.",
    biography: "Begum Aizaz Rasul was a distinguished political leader from Uttar Pradesh who advocated for secular unity, national integration, and equal citizenship.",
    keyQuotes: "Separate electorates are a self-inflicted handicap that isolate minority communities.",
    isWomanMember: true
  },
  {
    id: "dakshayani",
    name: "Dakshayani Velayudhan",
    role: "Member, Constituent Assembly",
    committee: "Social Equality Group",
    portrait: "assets/culture_default.png",
    contributions: "First Dalit female graduate and member of the Constituent Assembly; passionately spoke against untouchability and forced labor (Articles 17 & 23).",
    biography: "Dakshayani Velayudhan was a trailblazing leader from Kerala who, at age 34, was the youngest and only Dalit woman elected to the Constituent Assembly in 1946.",
    keyQuotes: "The Constitution should provide not just legal rights, but a moral framework for social transformation.",
    isWomanMember: true
  },
  {
    id: "bn-rau",
    name: "Sir B. N. Rau",
    role: "Constitutional Advisor to the Assembly",
    committee: "Secretariat & Drafting Bureau",
    portrait: "assets/Abdul_kalam.png",
    contributions: "Prepared the initial basic draft of the Constitution of India in 1947 after examining global democratic constitutions (USA, UK, Canada, Ireland).",
    biography: "Benegal Narsing Rau was an eminent jurist and civil servant who served as Constitutional Advisor to the Assembly and later as a judge on the International Court of Justice.",
    keyQuotes: "A constitution is not a static document; it is a living organism designed to grow with the nation.",
    isWomanMember: false
  },
  {
    id: "durgabai",
    name: "Durgabai Deshmukh",
    role: "Member, Steering Committee",
    committee: "Steering Committee",
    portrait: "assets/culture_default.png",
    contributions: "Advocated for independent judiciary, social welfare legislation, and national language consensus.",
    biography: "Durgabai Deshmukh was a freedom fighter, lawyer, and founder of Andhra Mahila Sabha who later chaired the Central Social Welfare Board.",
    keyQuotes: "Judicial independence is the ultimate guardian of individual liberty.",
    isWomanMember: true
  },
  {
    id: "amrit-kaur",
    name: "Rajkumari Amrit Kaur",
    role: "Member, Fundamental Rights Sub-Committee",
    committee: "Fundamental Rights Sub-Committee",
    portrait: "assets/culture_default.png",
    contributions: "Advocated for universal healthcare, gender equality, and Uniform Civil Code provisions.",
    biography: "Rajkumari Amrit Kaur was a Gandhian freedom fighter who served as India's first Health Minister, establishing AIIMS New Delhi.",
    keyQuotes: "Free health and primary education are the essential foundations of true democracy.",
    isWomanMember: true
  }
];

export const DRAFTING_TIMELINE_STEPS = [
  {
    date: "December 9, 1946",
    phase: "First Sitting",
    title: "First Sitting of the Constituent Assembly",
    details: "The Constituent Assembly met for the first time in Constitution Hall (now Central Hall of Parliament), New Delhi. Dr. Sachchidananda Sinha served as temporary Chairman."
  },
  {
    date: "December 11, 1946",
    phase: "Assembly Leadership",
    title: "Dr. Rajendra Prasad Elected President",
    details: "Dr. Rajendra Prasad was unanimously elected permanent President of the Constituent Assembly, with H. C. Mookerjee as Vice President."
  },
  {
    date: "December 13, 1946",
    phase: "Foundational Philosophy",
    title: "Objectives Resolution Moved",
    details: "Jawaharlal Nehru moved the historic Objectives Resolution outlining the principles of an independent, sovereign republic based on justice, equality, and liberty."
  },
  {
    date: "January 22, 1947",
    phase: "Adoption of Objectives",
    title: "Objectives Resolution Unanimously Adopted",
    details: "The Assembly unanimously adopted the Objectives Resolution, which subsequently formed the foundation of the Preamble."
  },
  {
    date: "August 29, 1947",
    phase: "Drafting Committee",
    title: "Drafting Committee Appointed under Dr. B. R. Ambedkar",
    details: "A 7-member Drafting Committee was appointed with Dr. B. R. Ambedkar as Chairman to prepare a formal Draft Constitution."
  },
  {
    date: "February 21, 1948",
    phase: "Draft Submission",
    title: "First Draft Constitution Published",
    details: "Dr. Ambedkar submitted the initial Draft Constitution to the President of the Assembly for public discussion and feedback."
  },
  {
    date: "November 4, 1948",
    phase: "Clause Reading",
    title: "Clause-by-Clause Reading & Debates Begin",
    details: "Assembly began detailed clause-by-clause discussions on 315 articles and 8 schedules over 11 exhaustive sessions."
  },
  {
    date: "November 26, 1949",
    phase: "Adoption",
    title: "Constitution of India Formally Adopted",
    details: "The Constituent Assembly adopted and enacted the Constitution of India (now celebrated as Constitution Day / Samvidhan Divas)."
  },
  {
    date: "January 24, 1950",
    phase: "Final Signing",
    title: "Signing of the Constitution & Anthem Adoption",
    details: "284 members signed two hand-written copies (English & Hindi) of the Constitution. 'Jana Gana Mana' was declared the National Anthem."
  },
  {
    date: "January 26, 1950",
    phase: "Commencement",
    title: "Enforcement of the Constitution & Republic Day",
    details: "The Constitution of India came into full force across the nation, transforming India into a Sovereign Democratic Republic."
  }
];

// --- Utility Functions ---

/**
 * Filter Constituent Assembly members by committee or search query.
 * @param {Array} members
 * @param {string} committee
 * @param {string} searchKeyword
 * @returns {Array}
 */
export function filterMembers(members = CONSTITUENT_ASSEMBLY_MEMBERS, committee = 'all', searchKeyword = '') {
  const keyword = searchKeyword.toLowerCase().trim();

  return members.filter(m => {
    const matchesCommittee = committee === 'all' || 
      (committee === 'women' ? m.isWomanMember : m.committee.toLowerCase().includes(committee.toLowerCase()));
    
    const matchesSearch = !keyword ||
      m.name.toLowerCase().includes(keyword) ||
      m.role.toLowerCase().includes(keyword) ||
      m.contributions.toLowerCase().includes(keyword) ||
      m.id.toLowerCase().includes(keyword);

    return matchesCommittee && matchesSearch;
  });
}

/**
 * Calculates summary metrics for the assembly hub.
 * @param {Array} members
 * @returns {Object}
 */
export function getAssemblyStats(members = CONSTITUENT_ASSEMBLY_MEMBERS) {
  const total = members.length;
  const womenCount = members.filter(m => m.isWomanMember).length;
  
  return {
    totalFeaturedMembers: total,
    womenMembersCount: womenCount,
    draftingDuration: "2 Years, 11 Months, 18 Days",
    totalSessions: 11,
    totalOriginalMembers: 299
  };
}
