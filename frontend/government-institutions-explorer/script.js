/**
 * Government & Constitutional Institutions Knowledge Hub Engine
 * Centralized portal detailing 9 key Indian institutions: RBI, SEBI, CBI, UPSC, ECI, CAG, NITI Aayog, Finance Commission, and NHRC.
 * Includes Formation, Headquarters, Head, Responsibilities, Structure, Fun Facts, filter tabs, and real-time search.
 */

export const INSTITUTIONS_DATA = [
  {
    id: 'rbi',
    acronym: 'RBI',
    fullName: 'Reserve Bank of India',
    type: 'Statutory Body & Central Bank',
    category: 'Financial & Regulatory',
    formation: 'April 1, 1935 (Reserve Bank of India Act, 1934; Nationalized in 1949)',
    headquarters: 'Mumbai, Maharashtra',
    currentHead: 'Governor of RBI (Sanjay Malhotra)',
    responsibilities: [
      'Formulates and executes Monetary Policy to maintain price stability while supporting growth.',
      'Sole authority for issuing Indian Banknotes (Rupee currency).',
      'Regulates and supervises commercial banks, NBFCs, and payment systems.',
      'Manages India’s Foreign Exchange Reserves and foreign trade exchange rates.'
    ],
    structure: 'Central Board of Directors (Governor + 4 Deputy Governors + 15 Government-appointed Directors).',
    funFacts: [
      'Originally headquartered in Kolkata (1935) before permanently moving to Mumbai in 1937.',
      'Served as the central bank for Myanmar (Burma) until 1947 and Pakistan until 1948.'
    ]
  },
  {
    id: 'sebi',
    acronym: 'SEBI',
    fullName: 'Securities and Exchange Board of India',
    type: 'Statutory Regulatory Body',
    category: 'Financial & Regulatory',
    formation: 'April 12, 1988 (Given statutory powers via SEBI Act on January 30, 1992)',
    headquarters: 'Mumbai, Maharashtra',
    currentHead: 'Chairperson (Tuhin Kanta Pandey)',
    responsibilities: [
      'Protects interests of investors in securities and stock markets.',
      'Promotes development and regulation of stock exchanges (NSE, BSE) and commodities markets.',
      'Prevents insider trading, fraudulent trade practices, and market manipulation.',
      'Regulates mutual funds, FPIs, portfolio managers, and credit rating agencies.'
    ],
    structure: 'Board of 9 Members: 1 Chairman, 2 Union Finance Ministry officials, 1 RBI official, and 5 members appointed by Central Govt.',
    funFacts: [
      'Operating as a non-statutory body initially in 1988, it was empowered with full statutory police powers after the 1992 Harshad Mehta securities scam.',
      'Uses advanced algorithmic real-time surveillance systems to monitor stock ticker patterns.'
    ]
  },
  {
    id: 'cbi',
    acronym: 'CBI',
    fullName: 'Central Bureau of Investigation',
    type: 'Executive Agency (DPSE Act 1946)',
    category: 'Law Enforcement & Investigation',
    formation: 'April 1, 1963 (Resolution by Ministry of Home Affairs; roots in Special Police Establishment 1941)',
    headquarters: 'New Delhi',
    currentHead: 'Director of CBI (Praveen Sood)',
    responsibilities: [
      'Investigates major anti-corruption cases involving Central Government employees and public sector undertakings.',
      'Probes complex economic offenses, bank frauds, and cybercrimes.',
      'Handles high-profile homicide and terrorism cases referred by Supreme Court, High Courts, or State Governments.',
      'Acts as National Central Bureau for Interpol co-operation in India.'
    ],
    structure: 'Headquarters under Director (IPS officer of DG rank); Specialized divisions: Anti-Corruption, Economic Offences, Special Crimes.',
    funFacts: [
      'The CBI is not a statutory body created by an Act of Parliament, but derives investigation powers from the Delhi Special Police Establishment (DSPE) Act 1946.',
      'Operates the Central Forensic Science Laboratory (CFSL) in New Delhi.'
    ]
  },
  {
    id: 'upsc',
    acronym: 'UPSC',
    fullName: 'Union Public Service Commission',
    type: 'Constitutional Body (Article 315–323)',
    category: 'Constitutional & Recruitment',
    formation: 'October 1, 1926 (Public Service Commission; reconstituted under Constitution on Jan 26, 1950)',
    headquarters: 'Dholpur House, Shahjahan Road, New Delhi',
    currentHead: 'Chairman (Dr. Manoj Soni)',
    responsibilities: [
      'Conducts nationwide competitive examinations for recruitment to All-India Services (IAS, IPS, IFoS) and Central Services (IFS, IRS, etc.).',
      'Advises Central Government on appointment, promotion, transfer, and disciplinary matters of civil servants.',
      'Formulates recruitment rules and cadre management standards.'
    ],
    structure: 'Chairman and 10 Members appointed by President of India; serve 6-year term or until age 65.',
    funFacts: [
      'Established following recommendations of the 1924 Lee Commission on Superior Civil Services in India.',
      'Dholpur House, its iconic red sandstone headquarters, was originally the New Delhi palace of the Maharaja of Dholpur.'
    ]
  },
  {
    id: 'eci',
    acronym: 'ECI',
    fullName: 'Election Commission of India',
    type: 'Constitutional Body (Article 324)',
    category: 'Constitutional & Electoral',
    formation: 'January 25, 1950 (Celebrated annually as National Voters\' Day)',
    headquarters: 'Nirvachan Sadan, New Delhi',
    currentHead: 'Chief Election Commissioner (Rajiv Kumar)',
    responsibilities: [
      'Supervises, directs, and controls elections to Lok Sabha, Rajya Sabha, State Assemblies, and offices of President & Vice-President.',
      'Prepares and updates electoral rolls and voter photo identity cards (EPIC).',
      'Enforces Model Code of Conduct (MCC) during elections.',
      'Recognizes political parties and allocates official election symbols.'
    ],
    structure: '3-Member Commission: Chief Election Commissioner (CEC) and 2 Election Commissioners (EC) appointed by President.',
    funFacts: [
      'Conducts the world\'s largest democratic exercise, managing over 960 million eligible voters across 1 million polling stations.',
      'Sets up a polling station for a single solitary voter inside Gir Forest (Gujarat) to ensure universal franchise.'
    ]
  },
  {
    id: 'cag',
    acronym: 'CAG',
    fullName: 'Comptroller and Auditor General of India',
    type: 'Constitutional Authority (Article 148–151)',
    category: 'Constitutional & Audit',
    formation: 'January 26, 1950 (Predecessor Accountant General created in 1858)',
    headquarters: 'New Delhi',
    currentHead: 'CAG of India (K. Sanjay Murthy)',
    responsibilities: [
      'Audits all expenditure from Consolidated Fund of India and Consolidated Funds of all States and Union Territories.',
      'Audits public sector undertakings (PSUs), autonomous bodies, and government departments.',
      'Submits independent Audit Reports directly to Parliament and State Legislatures.',
      'Guardian of the public purse, ensuring fiscal accountability and propriety.'
    ],
    structure: 'Independent Constitutional Authority appointed by President; tenure 6 years or until age 65.',
    funFacts: [
      'Dr. B.R. Ambedkar declared the CAG to be "the most important officer in the Constitution of India".',
      'CAG audit reports are scrutinized by Parliament’s Public Accounts Committee (PAC).'
    ]
  },
  {
    id: 'niti',
    acronym: 'NITI Aayog',
    fullName: 'National Institution for Transforming India',
    type: 'Executive Think Tank',
    category: 'Policy & Development',
    formation: 'January 1, 2015 (Replaced Planning Commission via Cabinet Resolution)',
    headquarters: 'NITI Bhawan, Parliament Street, New Delhi',
    currentHead: 'Chairperson (Prime Minister of India) & Vice-Chairperson (Suman Bery)',
    responsibilities: [
      'Serves as apex policy think tank of Government of India, providing strategic and technical advice.',
      'Fosters Cooperative Federalism by engaging State Governments in policy formulation.',
      'Publishes key national rankings like Aspirational Districts Index, Innovation Index, and SDG India Index.',
      'Replaced top-down 5-Year Planning with 15-year vision and 3-year action agendas.'
    ],
    structure: 'Chairperson (PM), Governing Council (Chief Ministers & Lt. Governors), Vice-Chairperson, Full-time Members, and CEO.',
    funFacts: [
      'Discontinued the 65-year-old Planning Commission (1950–2014) to focus on bottom-up state partnership.',
      'Spearheads the Atal Innovation Mission (AIM) establishing 10,000+ Atal Tinkering Labs in Indian schools.'
    ]
  },
  {
    id: 'fc',
    acronym: 'FC',
    fullName: 'Finance Commission of India',
    type: 'Constitutional Body (Article 280)',
    category: 'Constitutional & Fiscal',
    formation: 'November 22, 1951 (Constitued every 5 years under Article 280)',
    headquarters: 'New Delhi',
    currentHead: 'Chairman, 16th Finance Commission (Dr. Arvind Panagariya)',
    responsibilities: [
      'Recommends formula for devolute distribution of net tax proceeds between Union and State Governments (Vertical Devolution).',
      'Recommends allocation principles among states (Horizontal Devolution) based on demographic, income distance, and fiscal performance indicators.',
      'Suggests grants-in-aid to boost finances of local Panchayats and Municipalities.'
    ],
    structure: 'Chairman and 4 Members appointed by President of India every 5 years.',
    funFacts: [
      'The 1st Finance Commission was headed by K.C. Neogy in 1951.',
      'The 16th Finance Commission (constituted Nov 2023) recommendations cover a 5-year award period from April 2026 to 2031.'
    ]
  },
  {
    id: 'nhrc',
    acronym: 'NHRC',
    fullName: 'National Human Rights Commission',
    type: 'Statutory Body (PHR Act 1993)',
    category: 'Rights & Protection',
    formation: 'October 12, 1993 (Protection of Human Rights Act, 1993)',
    headquarters: 'Manav Adhikar Bhawan, New Delhi',
    currentHead: 'Chairperson (Retd. Chief Justice/Judge of Supreme Court)',
    responsibilities: [
      'Inquires into complaints of human rights violations or negligence by public servants.',
      'Intervenes in court proceedings involving human rights allegations.',
      'Visits jails, detention centers, and custodial care homes to inspect inmate conditions.',
      'Promotes human rights research, awareness campaigns, and NGO partnerships.'
    ],
    structure: 'Chairperson + 5 Full-Time Members + Deemed Members (Chairpersons of NCW, NCSC, NCST, NCM, BCPC, Chief Commissioner for PwD).',
    funFacts: [
      'Complaints can be submitted online or via toll-free helpline without requiring any fee.',
      'Has powers equivalent to a Civil Court under CPC for summoning witnesses and inspecting evidence.'
    ]
  }
];

export const INSTITUTION_CATEGORIES = [
  'All Categories',
  'Constitutional',
  'Statutory',
  'Executive',
  'Financial & Regulatory'
];

/**
 * Filter institutions by category tab and search query
 */
export function filterInstitutions(data, category, query) {
  return data.filter(item => {
    const matchesCategory = !category || category === 'All Categories' || item.type.toLowerCase().includes(category.toLowerCase()) || item.category.toLowerCase().includes(category.toLowerCase());
    const matchesQuery = !query || query.trim() === '' ||
      item.acronym.toLowerCase().includes(query.toLowerCase()) ||
      item.fullName.toLowerCase().includes(query.toLowerCase()) ||
      item.headquarters.toLowerCase().includes(query.toLowerCase()) ||
      item.currentHead.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });
}

/**
 * Summary stats helper
 */
export function getInstitutionsStats() {
  return {
    totalInstitutions: INSTITUTIONS_DATA.length,
    constitutionalCount: INSTITUTIONS_DATA.filter(i => i.type.includes('Constitutional')).length,
    statutoryCount: INSTITUTIONS_DATA.filter(i => i.type.includes('Statutory')).length,
    executiveCount: INSTITUTIONS_DATA.filter(i => i.type.includes('Executive')).length
  };
}

// Browser DOM initializer
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initInstitutionsHub();
  });
}

export function initInstitutionsHub() {
  const searchInput = document.getElementById('instSearch');
  const catFilter = document.getElementById('instCategory');
  const grid = document.getElementById('instGrid');

  if (!grid) return;

  function renderGrid(list) {
    grid.innerHTML = list.map(inst => `
      <article class="inst-card">
        <div class="inst-card-header">
          <span class="inst-acronym">${inst.acronym}</span>
          <span class="inst-type-badge">${inst.type}</span>
        </div>
        <h2 class="inst-title">${inst.fullName}</h2>
        <p class="inst-meta">📍 <strong>HQ:</strong> ${inst.headquarters} | 👤 <strong>Head:</strong> ${inst.currentHead}</p>
        <p class="inst-meta">🗓️ <strong>Formation:</strong> ${inst.formation}</p>

        <div class="inst-box">
          <h4>Key Responsibilities & Powers</h4>
          <ul>
            ${inst.responsibilities.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>

        <div class="inst-box">
          <h4>Governance Structure</h4>
          <p>${inst.structure}</p>
        </div>

        <div class="inst-facts">
          <strong>💡 Fun Facts & Highlights:</strong>
          <ul>
            ${inst.funFacts.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>
      </article>
    `).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const filtered = filterInstitutions(INSTITUTIONS_DATA, catFilter ? catFilter.value : 'All Categories', searchInput.value);
      renderGrid(filtered);
    });
  }

  if (catFilter) {
    catFilter.addEventListener('change', () => {
      const filtered = filterInstitutions(INSTITUTIONS_DATA, catFilter.value, searchInput ? searchInput.value : '');
      renderGrid(filtered);
    });
  }

  // Initial render
  renderGrid(INSTITUTIONS_DATA);
}
