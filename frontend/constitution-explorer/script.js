/**
 * Interactive Constitution Explorer Engine
 * Beginner-friendly Constitution learning platform featuring interactive Preamble breakdown,
 * Fundamental Rights, Fundamental Duties, DPSP, 12 Schedules, Key Amendments,
 * visual card UI, and real-time cross-section search.
 */

export const PREAMBLE_KEYWORDS = [
  { term: 'SOVEREIGN', meaning: 'India is internally supreme and externally independent, free from foreign control or allegiance.' },
  { term: 'SOCIALIST', meaning: 'Added by 42nd Amendment (1976); aims to eliminate inequality of income, status, and standards of life via democratic socialism.' },
  { term: 'SECULAR', meaning: 'Added by 42nd Amendment (1976); state accords equal respect, protection, and support to all religions without an official state religion.' },
  { term: 'DEMOCRATIC', meaning: 'Government derives its authority from the will of the people expressed through universal adult suffrage.' },
  { term: 'REPUBLIC', meaning: 'Head of State (President) is elected by the people for a fixed term, not an hereditary monarch.' },
  { term: 'JUSTICE', meaning: 'Social, Economic, and Political justice secured through fundamental rights and DPSP.' },
  { term: 'LIBERTY', meaning: 'Liberty of thought, expression, belief, faith, and worship.' },
  { term: 'EQUALITY', meaning: 'Equality of status and opportunity; abolishes discriminatory privileges.' },
  { term: 'FRATERNITY', meaning: 'Promotes a sense of common brotherhood assuring dignity of individual and unity/integrity of Nation.' }
];

export const FUNDAMENTAL_RIGHTS = [
  {
    id: 'fr-equality',
    category: 'Right to Equality',
    articles: 'Articles 14 – 18',
    summary: 'Prohibits discrimination on grounds of religion, race, caste, sex, or place of birth; abolishes untouchability (Art 17) and titles (Art 18).',
    keyArticles: [
      { art: 'Art 14', text: 'Equality before law and equal protection of laws.' },
      { art: 'Art 17', text: 'Abolition of Untouchability and prohibition of its practice.' }
    ]
  },
  {
    id: 'fr-freedom',
    category: 'Right to Freedom',
    articles: 'Articles 19 – 22',
    summary: 'Guarantees 6 basic freedoms (speech, assembly, association, movement, residence, profession) and protection of life/liberty under Art 21.',
    keyArticles: [
      { art: 'Art 19', text: 'Six freedoms of speech, assembly, association, movement, residence, trade.' },
      { art: 'Art 21', text: 'Protection of life and personal liberty.' },
      { art: 'Art 21A', text: 'Right to free & compulsory education for children aged 6 to 14.' }
    ]
  },
  {
    id: 'fr-exploitation',
    category: 'Right against Exploitation',
    articles: 'Articles 23 – 24',
    summary: 'Prohibits human trafficking, forced labor (begar), and employment of children below 14 years in hazardous factories/mines.',
    keyArticles: [
      { art: 'Art 23', text: 'Prohibition of human trafficking and forced labor.' },
      { art: 'Art 24', text: 'Prohibition of child labor in factories and hazardous employment.' }
    ]
  },
  {
    id: 'fr-religion',
    category: 'Right to Freedom of Religion',
    articles: 'Articles 25 – 28',
    summary: 'Freedom of conscience and free profession, practice, and propagation of religion; freedom to manage religious affairs.',
    keyArticles: [
      { art: 'Art 25', text: 'Freedom of conscience and right to freely profess, practice & propagate religion.' }
    ]
  },
  {
    id: 'fr-cultural',
    category: 'Cultural & Educational Rights',
    articles: 'Articles 29 – 30',
    summary: 'Protection of language, script, and culture of minorities; right of minorities to establish educational institutions.',
    keyArticles: [
      { art: 'Art 29', text: 'Protection of interests of cultural & linguistic minorities.' }
    ]
  },
  {
    id: 'fr-remedies',
    category: 'Right to Constitutional Remedies',
    articles: 'Article 32',
    summary: 'Described by Dr. B.R. Ambedkar as the "Heart and Soul" of the Constitution; empowers citizens to move Supreme Court for enforcement of rights.',
    keyArticles: [
      { art: 'Art 32', text: 'Power to issue Writs: Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari.' }
    ]
  }
];

export const FUNDAMENTAL_DUTIES = [
  { id: 1, article: 'Art 51A(a)', duty: 'Abide by the Constitution and respect National Flag and National Anthem.' },
  { id: 2, article: 'Art 51A(b)', duty: 'Cherish noble ideals of freedom struggle.' },
  { id: 3, article: 'Art 51A(c)', duty: 'Uphold and protect sovereignty, unity, and integrity of India.' },
  { id: 4, article: 'Art 51A(d)', duty: 'Defend country and render national service when called upon.' },
  { id: 5, article: 'Art 51A(e)', duty: 'Promote harmony and spirit of common brotherhood amongst all people.' },
  { id: 6, article: 'Art 51A(f)', duty: 'Value and preserve rich heritage of composite culture.' },
  { id: 7, article: 'Art 51A(g)', duty: 'Protect and improve natural environment including forests, lakes, rivers, wildlife.' },
  { id: 8, article: 'Art 51A(h)', duty: 'Develop scientific temper, humanism, and spirit of inquiry/reform.' },
  { id: 9, article: 'Art 51A(i)', duty: 'Safeguard public property and abjure violence.' },
  { id: 10, article: 'Art 51A(j)', duty: 'Strive towards excellence in all spheres of individual and collective activity.' },
  { id: 11, article: 'Art 51A(k)', duty: 'Provide education opportunities to child between age of 6 and 14 (added by 86th Amendment 2002).' }
];

export const DIRECTIVE_PRINCIPLES = [
  {
    category: 'Socialistic Principles',
    description: 'Aim at providing social & economic justice and establishing a welfare state.',
    examples: ['Art 39: Adequate means of livelihood & equal pay for equal work.', 'Art 41: Right to work, education & public assistance in old age/sickness.']
  },
  {
    category: 'Gandhian Principles',
    description: 'Based on Mahatma Gandhi’s program of reconstruction during freedom struggle.',
    examples: ['Art 40: Organization of Village Panchayats.', 'Art 47: Prohibition of intoxicating drinks & drugs harmful to health.']
  },
  {
    category: 'Liberal-Intellectual Principles',
    description: 'Reflect modern liberal ideology regarding administration, environment, and international peace.',
    examples: ['Art 44: Uniform Civil Code (UCC) for citizens.', 'Art 50: Separation of judiciary from executive.', 'Art 51: Promotion of international peace and security.']
  }
];

export const CONSTITUTION_SCHEDULES = [
  { number: 1, subject: 'Names of States and Union Territories and their territorial extent.' },
  { number: 2, subject: 'Emoluments, allowances, and privileges of President, Governors, Speaker, Judges, CAG.' },
  { number: 3, subject: 'Forms of Oaths and Affirmations for ministers, MPs, MLAs, and Judges.' },
  { number: 4, subject: 'Allocation of seats in Rajya Sabha (Council of States) to States and UTs.' },
  { number: 5, subject: 'Administration and control of Scheduled Areas and Scheduled Tribes.' },
  { number: 6, subject: 'Administration of tribal areas in Assam, Meghalaya, Tripura, and Mizoram (AMTM).' },
  { number: 7, subject: 'Division of powers between Union and States via 3 Lists: Union List, State List, Concurrent List.' },
  { number: 8, subject: '22 Officially recognized Indian languages (Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santali, Sindhi, Tamil, Telugu, Urdu).' },
  { number: 9, subject: 'Validation of certain Acts & Regulations (protected from judicial scrutiny under land reforms, added by 1st Amendment 1951).' },
  { number: 10, subject: 'Anti-Defection Law — disqualification of MPs/MLAs on grounds of defection (added by 52nd Amendment 1985).' },
  { number: 11, subject: 'Powers, authority, and responsibilities of Rural Panchayats — 29 functional matters (added by 73rd Amendment 1992).' },
  { number: 12, subject: 'Powers, authority, and responsibilities of Urban Municipalities — 18 functional matters (added by 74th Amendment 1992).' }
];

export const KEY_AMENDMENTS = [
  {
    number: '1st Amendment (1951)',
    significance: 'Added 9th Schedule to protect land reform laws; placed reasonable restrictions on freedom of speech.'
  },
  {
    number: '42nd Amendment (1976)',
    significance: 'Known as the "Mini-Constitution"; added words "Socialist, Secular, Integrity" to Preamble and introduced Part IV-A (Fundamental Duties).'
  },
  {
    number: '44th Amendment (1978)',
    significance: 'Restored civil liberties post-Emergency; removed Right to Property from Fundamental Rights (made it legal right under Art 300A).'
  },
  {
    number: '73rd & 74th Amendments (1992)',
    significance: 'Granted constitutional status to rural Panchayati Raj Institutions (73rd) and Urban Municipal Bodies (74th).'
  },
  {
    number: '86th Amendment (2002)',
    significance: 'Made elementary education a Fundamental Right under Article 21A for children aged 6 to 14 years.'
  },
  {
    number: '101st Amendment (2016)',
    significance: 'Introduced Goods and Services Tax (GST) across India, establishing the GST Council under Article 279A.'
  },
  {
    number: '106th Amendment (2023)',
    significance: 'Nari Shakti Vandan Adhiniyam — reserved 33% seats for women in Lok Sabha and State Legislative Assemblies.'
  }
];

/**
 * Perform multi-section live search across Rights, Duties, DPSPs, Schedules, and Amendments
 */
export function searchConstitutionData(query) {
  if (!query || query.trim() === '') {
    return {
      rights: FUNDAMENTAL_RIGHTS,
      duties: FUNDAMENTAL_DUTIES,
      schedules: CONSTITUTION_SCHEDULES,
      amendments: KEY_AMENDMENTS
    };
  }

  const q = query.toLowerCase();
  return {
    rights: FUNDAMENTAL_RIGHTS.filter(r => r.category.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q)),
    duties: FUNDAMENTAL_DUTIES.filter(d => d.duty.toLowerCase().includes(q) || d.article.toLowerCase().includes(q)),
    schedules: CONSTITUTION_SCHEDULES.filter(s => s.subject.toLowerCase().includes(q) || `schedule ${s.number}`.includes(q)),
    amendments: KEY_AMENDMENTS.filter(a => a.number.toLowerCase().includes(q) || a.significance.toLowerCase().includes(q))
  };
}

/**
 * Statistics helper
 */
export function getConstitutionStats() {
  return {
    adoptedDate: '26 November 1949',
    enforcedDate: '26 January 1950',
    originalArticles: 395,
    originalParts: 22,
    schedulesCount: CONSTITUTION_SCHEDULES.length,
    fundamentalRightsCategories: FUNDAMENTAL_RIGHTS.length,
    fundamentalDutiesCount: FUNDAMENTAL_DUTIES.length,
    recognizedLanguages: 22
  };
}

// Browser DOM initializer
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initConstitutionExplorer();
  });
}

export function initConstitutionExplorer() {
  const globalSearch = document.getElementById('constitutionSearch');
  const rightsGrid = document.getElementById('rightsGrid');
  const dutiesGrid = document.getElementById('dutiesGrid');
  const schedulesGrid = document.getElementById('schedulesGrid');
  const amendmentsGrid = document.getElementById('amendmentsGrid');
  const preambleGrid = document.getElementById('preambleGrid');

  if (!rightsGrid) return;

  function renderPreamble() {
    if (!preambleGrid) return;
    preambleGrid.innerHTML = PREAMBLE_KEYWORDS.map(k => `
      <div class="preamble-card">
        <div class="keyword-term">${k.term}</div>
        <p class="keyword-meaning">${k.meaning}</p>
      </div>
    `).join('');
  }

  function renderSections(data) {
    if (rightsGrid) {
      rightsGrid.innerHTML = data.rights.map(r => `
        <article class="vis-card">
          <span class="card-art-tag">${r.articles}</span>
          <h3 class="card-title">${r.category}</h3>
          <p class="card-desc">${r.summary}</p>
          <div class="key-arts-box">
            ${r.keyArticles.map(ka => `<div><strong>${ka.art}:</strong> ${ka.text}</div>`).join('')}
          </div>
        </article>
      `).join('');
    }

    if (dutiesGrid) {
      dutiesGrid.innerHTML = data.duties.map(d => `
        <article class="duty-card">
          <span class="duty-art">${d.article}</span>
          <p class="duty-text">${d.duty}</p>
        </article>
      `).join('');
    }

    if (schedulesGrid) {
      schedulesGrid.innerHTML = data.schedules.map(s => `
        <article class="schedule-card">
          <div class="sch-num">Schedule ${s.number}</div>
          <p class="sch-sub">${s.subject}</p>
        </article>
      `).join('');
    }

    if (amendmentsGrid) {
      amendmentsGrid.innerHTML = data.amendments.map(a => `
        <article class="amend-card">
          <h4 class="amend-num">${a.number}</h4>
          <p class="amend-desc">${a.significance}</p>
        </article>
      `).join('');
    }
  }

  if (globalSearch) {
    globalSearch.addEventListener('input', (e) => {
      const results = searchConstitutionData(e.target.value);
      renderSections(results);
    });
  }

  // Initial render
  renderPreamble();
  renderSections(searchConstitutionData(''));
}
