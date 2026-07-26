/**
 * cbi-knowledge-center.js
 * Comprehensive dataset and interactive logic for the CBI Knowledge Center.
 * Exports datasets and utility functions for testing and rendering.
 */

// --- 1. History Dataset ---
export const CBI_HISTORY_TIMELINE = [
  {
    year: "1941",
    title: "Special Police Establishment (SPE) Formed",
    era: "Pre-Independence",
    summary: "Established by the Department of War during WWII to investigate corruption and bribery in war-related procurement and supply contracts.",
    details: "The SPE was created as an executive police force under a Deputy Inspector General of Police to prevent fraudulent practices in wartime expenditure across British India."
  },
  {
    year: "1946",
    title: "Enactment of DSPE Act",
    era: "Legislative Foundation",
    summary: "The Delhi Special Police Establishment (DSPE) Act 1946 was enacted, giving the agency statutory investigative powers.",
    details: "The Act transferred the superintendence of SPE to the Home Department and defined its jurisdiction over Union Territories and Central Government employees, requiring State Government consent for state operations."
  },
  {
    year: "1963",
    title: "Formal Creation of CBI",
    era: "Post-Independence",
    summary: "The Ministry of Home Affairs issued a Resolution on April 1, 1963, establishing the Central Bureau of Investigation.",
    details: "Formed under the chairmanship recommendation of the Santhanam Committee on Prevention of Corruption, combining SPE into the newly expanded national agency."
  },
  {
    year: "1987",
    title: "Bifurcation of Operational Divisions",
    era: "Organizational Expansion",
    summary: "CBI operations were restructured into two specialized divisions: Anti-Corruption and Economic Offences.",
    details: "To handle increasingly complex white-collar crimes and corporate frauds alongside traditional public sector corruption inquiries."
  },
  {
    year: "2003",
    title: "CVC Act & Statutory Tenure Protection",
    era: "Statutory Reform",
    summary: "Enactment of the Central Vigilance Commission Act 2003 provided statutory superintendence to CVC for corruption cases.",
    details: "It mandated a minimum two-year fixed tenure for the CBI Director to protect institutional independence from executive interference."
  },
  {
    year: "2013",
    title: "Lokpal & Lokayuktas Act Amendments",
    era: "Modern Reform",
    summary: "Introduced a high-powered committee selection mechanism for the CBI Director.",
    details: "Established a selection committee comprising the Prime Minister, Leader of Opposition (or single largest opposition party leader), and Chief Justice of India (or SC judge nominee)."
  },
  {
    year: "2021",
    title: "DSPE (Amendment) Act 2021",
    era: "Modern Governance",
    summary: "Allowed annual tenure extensions for the CBI Director up to a maximum of 5 years in public interest.",
    details: "Extensions beyond the initial 2-year tenure must be recommended by the High-Powered Selection Committee with written justifications."
  }
];

// --- 2. Formation & Motto Dataset ---
export const CBI_FORMATION_INFO = {
  motto: "Industry, Impartiality, Integrity",
  slogan: "Dedicated to Truth and Justice",
  establishedDate: "April 1, 1963",
  foundingResolution: "Ministry of Home Affairs Resolution No. 4/31/61-T",
  governingAct: "Delhi Special Police Establishment (DSPE) Act, 1946",
  headquarters: "CBI Headquarters Building, CGO Complex, Lodhi Road, New Delhi",
  nodalMinistry: "Department of Personnel and Training (DoPT), Ministry of Personnel, Public Grievances and Pensions",
  superintendence: {
    antiCorruption: "Central Vigilance Commission (CVC)",
    otherOffences: "Central Government (DoPT)"
  }
};

// --- 3. Organizational Structure Dataset ---
export const CBI_ORGANIZATION_HIERARCHY = [
  {
    rank: "Director, CBI",
    level: "Apex / Secretary Level",
    role: "Overall head of the agency, holds executive powers equivalent to Director General of Police (DGP)."
  },
  {
    rank: "Special Director / Additional Director",
    level: "Senior Leadership",
    role: "Heads major functional branches (Anti-Corruption, Economic Offences, Special Crimes, Administration)."
  },
  {
    rank: "Joint Director",
    level: "Zonal Head",
    role: "Supervises regional zones and specialized verticals across the country."
  },
  {
    rank: "Deputy Inspector General (DIG)",
    level: "Range Officer",
    role: "Monitors branches within a zone and oversees active high-profile investigations."
  },
  {
    rank: "Superintendent of Police (SP)",
    level: "Branch In-Charge",
    role: "Leads specific field units/branches and directly supervises Investigating Officers (IOs)."
  },
  {
    rank: "Deputy SP / Inspector / Sub-Inspector",
    level: "Field Investigating Officers",
    role: "Conducts field inquiries, raids, interrogations, evidence gathering, and files charge sheets in courts."
  }
];

// --- 4. Director & Selection Process Dataset ---
export const CBI_DIRECTOR_SELECTION = {
  appointmentAuthority: "Central Government on recommendation of High-Powered Selection Committee",
  committeeMembers: [
    { title: "Prime Minister of India", role: "Chairperson" },
    { title: "Leader of Opposition / Leader of Largest Opposition Party in Lok Sabha", role: "Member" },
    { title: "Chief Justice of India or Nominated Supreme Court Judge", role: "Member" }
  ],
  tenureRules: {
    minimumTenure: "2 Years guaranteed under DSPE Act 1946 & CVC Act 2003",
    maximumTenure: "Up to 5 Years (via up to 3 annual extensions recommended by Selection Committee)",
    eligibility: "Senior IPS officers of DGP/Addl DGP rank with vast anti-corruption investigation experience."
  }
};

// --- 5. Divisions Dataset ---
export const CBI_DIVISIONS = [
  {
    id: "acd",
    name: "Anti-Corruption Division (ACD)",
    icon: "⚖️",
    description: "Investigates allegations of corruption, bribery, and financial impropriety against Central Government employees, PSU officials, and central financial institutions.",
    keyFunction: "Enforces the Prevention of Corruption Act, 1988 across central government departments."
  },
  {
    id: "eod",
    name: "Economic Offences Division (EOD)",
    icon: "📈",
    description: "Handles major financial frauds, bank scams, stock market manipulation, money laundering, cyber financial crimes, and smuggling offences.",
    keyFunction: "Investigates complex financial crimes involving public funds and institutional fraud."
  },
  {
    id: "scd",
    name: "Special Crimes Division (SCD)",
    icon: "🔎",
    description: "Investigates conventional non-financial crimes including sensational murder cases, terrorism, kidnapping, arms trafficking, and organized crime.",
    keyFunction: "Takes up cases referred by State Governments or ordered by Supreme Court & High Courts."
  },
  {
    id: "dop",
    name: "Directorate of Prosecution (DoP)",
    icon: "📜",
    description: "Provides independent legal counsel, scrutinizes charge sheets, and conducts prosecutions in special CBI courts across India.",
    keyFunction: "Ensures high legal standards and evidence sufficiency prior to filing court proceedings."
  },
  {
    id: "cfsl",
    name: "Central Forensic Science Laboratory (CFSL)",
    icon: "🔬",
    description: "Scientific support wing providing advanced forensic examination (ballistics, DNA profiling, digital forensics, polygraph, document analysis).",
    keyFunction: "Delivers scientific evidence and expert analysis to support field investigators."
  },
  {
    id: "pc",
    name: "Policy & Coordination Division (P&C) / Interpol NCB",
    icon: "🌐",
    description: "Acts as the National Central Bureau (NCB New Delhi) for INTERPOL in India, managing international extradition, Interpol Red Notices, and cross-border police cooperation.",
    keyFunction: "Coordinates international law enforcement inquiries across 195 member countries."
  },
  {
    id: "std",
    name: "Systems & Training Division (CBI Academy)",
    icon: "🎓",
    description: "Based in Ghaziabad, Uttar Pradesh, it trains CBI officers, state police personnel, and international investigators in advanced crime investigation techniques.",
    keyFunction: "Provides specialized judicial, forensic, cybercrime, and financial fraud training."
  }
];

// --- 6. Powers & Legal Framework Dataset ---
export const CBI_POWERS_FRAMEWORK = {
  governingAct: "Delhi Special Police Establishment Act, 1946",
  jurisdictionTypes: [
    {
      title: "Union Territories Jurisdiction",
      scope: "Direct statutory jurisdiction under DSPE Act Section 3 across all Union Territories.",
      badge: "Direct Authority"
    },
    {
      title: "General Consent by States (Section 6)",
      scope: "States grant general consent enabling CBI to investigate central government employees within state territories without seeking case-by-case approval.",
      badge: "State Consent"
    },
    {
      title: "Specific Consent (Section 6)",
      scope: "If a state withdraws general consent, CBI must obtain prior specific consent from the state government for each new investigation.",
      badge: "Case-by-Case"
    },
    {
      title: "Judicial Mandate (Supreme Court / High Courts)",
      scope: "The Supreme Court and State High Courts under Article 32 & 226 can order CBI inquiries anywhere in India without requiring State Government consent.",
      badge: "Constitutional Mandate"
    }
  ]
};

// --- 7. Famous Investigations Dataset ---
export const CBI_FAMOUS_INVESTIGATIONS = [
  {
    id: "case-1",
    title: "Rajiv Gandhi Assassination Case (1991)",
    category: "Special Crimes",
    decade: "1990s",
    summary: "Formed a Multi-Disciplinary Monitoring Agency (MDMA) and Special Investigation Team (SIT) led by D.R. Kaarthikeyan.",
    details: "The SIT conducted a meticulous forensic, photographic, and intelligence investigation leading to the identification of the assassination module and eventual conviction of accused perpetrators."
  },
  {
    id: "case-2",
    title: "1992 Securities Scam (Harshad Mehta Case)",
    category: "Economic Offences",
    decade: "1990s",
    summary: "Uncovered systematic diversion of bank funds into stock market transactions exceeding ₹4,000 crore.",
    details: "CBI's Economic Offences unit seized thousands of financial documents, leading to multiple prosecution trials and major reforms in Indian financial market regulation and SEBI oversight."
  },
  {
    id: "case-3",
    title: "Purulia Arms Drop Case (1995)",
    category: "Special Crimes",
    decade: "1990s",
    summary: "Investigated illegal air-drop of arms and ammunition over Purulia district, West Bengal.",
    details: "Utilized Interpol NCB channels to track foreign nationals, leading to the interception of the Antonov An-26 aircraft and extradition proceedings across international jurisdictions."
  },
  {
    id: "case-4",
    title: "ISRO Espionage Case Exoneration (1996)",
    category: "Special Crimes",
    decade: "1990s",
    summary: "CBI investigation submitted a closure report finding allegations against ISRO scientists false.",
    details: "The CBI concluded that false cases were registered against cryogenic engine pioneer Nambi Narayanan, paving the way for his court exoneration and official rehabilitation."
  },
  {
    id: "case-5",
    title: "Satyam Computer Services Accounting Scam (2009)",
    category: "Economic Offences",
    decade: "2000s",
    summary: "Investigated corporate accounting fraud involving falsified balance sheets exceeding ₹7,000 crore.",
    details: "CBI Multi-Disciplinary Investigation Team filed comprehensive chargesheets within record time, leading to convictions under IPC sections for cheating, forgery, and falsification of accounts."
  },
  {
    id: "case-6",
    title: "Bhanwari Devi Case (2011)",
    category: "Special Crimes",
    decade: "2010s",
    summary: "High-profile abduction and murder investigation taken over from state police on High Court orders.",
    details: "CBI employed forensic DNA profiling, audio recording analysis, and submerged evidence recovery in canal systems to secure key convictions against powerful political figures."
  }
];

// --- 8. FAQs Dataset ---
export const CBI_FAQS = [
  {
    id: "faq-1",
    question: "What is the primary legal difference between CBI and State Police?",
    answer: "State Police forces derive their authority from State Police Acts under the Indian Constitution's State List (Entry 2). CBI derives statutory powers from the Delhi Special Police Establishment (DSPE) Act, 1946. While State Police have territorial jurisdiction within their state, CBI operates primarily over Central Government employees, Union Territories, and cross-state or court-mandated cases."
  },
  {
    id: "faq-2",
    question: "Can a citizen directly file an FIR with the CBI?",
    answer: "Generally, no. CBI does not function as a primary police station for ordinary law and order complaints. Citizens can report corruption against Central Government employees to CBI Anti-Corruption branches. However, for general criminal matters, cases are referred to CBI by State Governments or ordered by the Supreme Court or High Courts."
  },
  {
    id: "faq-3",
    question: "What is 'General Consent' under Section 6 of the DSPE Act?",
    answer: "Under Section 6 of the DSPE Act 1946, the CBI requires the consent of a state government to exercise its powers within that state. 'General Consent' is a standing authorization given by states so CBI can investigate central government personnel without needing approval for every individual case."
  },
  {
    id: "faq-4",
    question: "Can CBI investigate inside a state if the state has withdrawn General Consent?",
    answer: "If a state withdraws General Consent, CBI cannot register new cases against central/state personnel in that state without obtaining 'Specific Consent' for that particular case. However, existing registered cases continue, and the Supreme Court or High Courts can direct CBI to investigate any case in that state regardless of state consent."
  },
  {
    id: "faq-5",
    question: "What role does CBI play in INTERPOL international law enforcement?",
    answer: "The Director of CBI acts as the official Head of the National Central Bureau (NCB - New Delhi) for INTERPOL in India. CBI coordinates all international requests, extradition proceedings, cross-border intelligence sharing, and issuance of Interpol Notices (such as Red Corner Notices) on behalf of Indian law enforcement agencies."
  },
  {
    id: "faq-6",
    question: "Who monitors and supervises the CBI?",
    answer: "Superintendence over CBI's Anti-Corruption investigations under the Prevention of Corruption Act lies with the Central Vigilance Commission (CVC). For administrative, financial, and non-corruption matters, superintendence rests with the Central Government through the Department of Personnel and Training (DoPT)."
  }
];

// --- 9. Infographics Data ---
export const CBI_INFOGRAPHICS_DATA = {
  hierarchyChart: {
    title: "CBI Leadership & Operational Chain of Command",
    levels: [
      { name: "Director, CBI", desc: "Head of Agency (Selection Committee: PM, LoP, CJI)" },
      { name: "Special / Additional Directors", desc: "Division Heads (ACD, EOD, SCD, DoP, P&C)" },
      { name: "Joint Directors", desc: "Zonal In-Charges across India" },
      { name: "DIG & SP Level", desc: "Range Supervisors & Branch Heads" },
      { name: "Investigating Officers (DSP, Inspector, SI)", desc: "Field Operations & Evidence Gathering" }
    ]
  },
  jurisdictionFlow: [
    { step: "1", label: "Location of Alleged Crime", detail: "Is the location a Union Territory or State?" },
    { step: "2", label: "Union Territory", detail: "Direct CBI Jurisdiction under DSPE Act Sec 3" },
    { step: "3", label: "State Territory", detail: "Check State Consent status under DSPE Act Sec 6" },
    { step: "4A", label: "General Consent Active", detail: "CBI registers FIR directly for central subjects" },
    { step: "4B", label: "Specific Consent Required", detail: "Requires State approval OR SC/HC Judicial Order" }
  ],
  interpolNCBFlow: [
    { title: "Indian Police Request", desc: "State Police or CBI unit requests international fugitive tracking." },
    { title: "CBI NCB New Delhi Verification", desc: "CBI legal & Interpol desk validates request standards." },
    { title: "Interpol General Secretariat (Lyon)", desc: "Formal issuance of Red Notice to 195 member countries." },
    { title: "Extradition & Deportation", desc: "Extradition court proceedings & deportation back to India." }
  ]
};

// --- Utility Functions ---

/**
 * Filter famous cases by category and search keyword.
 * @param {Array} cases
 * @param {string} category
 * @param {string} searchKeyword
 * @returns {Array}
 */
export function filterCases(cases = CBI_FAMOUS_INVESTIGATIONS, category = 'all', searchKeyword = '') {
  const keyword = searchKeyword.toLowerCase().trim();

  return cases.filter(item => {
    const matchesCategory = category === 'all' || item.category.toLowerCase().includes(category.toLowerCase());
    const matchesSearch = !keyword ||
      item.title.toLowerCase().includes(keyword) ||
      item.summary.toLowerCase().includes(keyword) ||
      item.details.toLowerCase().includes(keyword) ||
      item.decade.toLowerCase().includes(keyword);

    return matchesCategory && matchesSearch;
  });
}

/**
 * Toggles expanded state for FAQ items in array data structures.
 * @param {Array} faqs
 * @param {string} faqId
 * @returns {Array}
 */
export function toggleFaqState(faqs = CBI_FAQS, faqId = '') {
  return faqs.map(faq => {
    if (faq.id === faqId) {
      return { ...faq, expanded: !faq.expanded };
    }
    return faq;
  });
}

/**
 * Calculates dataset statistics for counter components.
 * @returns {Object}
 */
export function getCbiKnowledgeStats() {
  return {
    totalDivisions: CBI_DIVISIONS.length,
    timelineMilestones: CBI_HISTORY_TIMELINE.length,
    famousCases: CBI_FAMOUS_INVESTIGATIONS.length,
    faqCount: CBI_FAQS.length,
    interpolMemberCountries: 195
  };
}
