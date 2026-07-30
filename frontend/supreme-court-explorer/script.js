/**
 * Supreme Court Educational Portal Engine
 * Interactive learning hub covering Supreme Court history, structure, CJI timeline,
 * landmark judgments database, constitutional powers, judicial review, and interactive hierarchy.
 */

export const SC_HISTORY = [
  {
    year: '1937',
    event: 'Federal Court of India Established',
    details: 'Established under the Government of India Act 1935, sitting in the Chamber of Princes in Parliament House with jurisdiction over constitutional disputes between provinces and federated states.'
  },
  {
    year: '1950',
    event: 'Inauguration of Supreme Court of India',
    details: 'Inaugurated on January 28, 1950, two days after India became a sovereign democratic republic. It replaced both the Federal Court of India and the Judicial Committee of the Privy Council.'
  },
  {
    year: '1958',
    event: 'Move to Present Tilak Marg Premises',
    details: 'Shifted from Parliament House to its present Indo-British classical building on Tilak Marg, New Delhi, shaped in the motif of scales of justice.'
  },
  {
    year: '2019',
    event: 'Sanctioned Strength Expanded to 34 Judges',
    details: 'Parliament increased the sanctioned strength from original 8 judges (1950) to 34 judges (CJI + 33 Supreme Court judges) to address rising caseloads.'
  }
];

export const CJI_TIMELINE = [
  {
    name: 'Hon. Justice Harilal Jekisundas Kania',
    tenure: '1950 – 1951',
    milestone: 'First Chief Justice of India',
    description: 'Inaugural CJI who administered the oath of office to Dr. Rajendra Prasad and established foundational bench procedures.'
  },
  {
    name: 'Hon. Justice M. Patanjali Sastri',
    tenure: '1951 – 1954',
    milestone: '2nd CJI & Fundamental Rights Protector',
    description: 'Delivered historic early rulings defining personal liberty and limits of executive detention under Article 21.'
  },
  {
    name: 'Hon. Justice K. G. Balakrishnan',
    tenure: '2007 – 2010',
    milestone: 'First Dalit Chief Justice of India',
    description: 'Pioneered judicial transparency initiatives and expanded legal aid availability for marginalized rural populations.'
  },
  {
    name: 'Hon. Justice B. V. Nagarathna (Designated)',
    tenure: 'Upcoming (Sept 2027)',
    milestone: 'First Female Chief Justice of India Lineage',
    description: 'Set to become the first female Chief Justice of India in 2027, marking a milestone for gender representation in higher judiciary.'
  }
];

export const LANDMARK_JUDGMENTS = [
  {
    id: 'case-kesavananda',
    caseName: 'Kesavananda Bharati v. State of Kerala',
    year: 1973,
    benchSize: '13-Judge Bench',
    category: 'Constitutional Law',
    ratio: '7:6 Majority',
    summary: 'Established the "Basic Structure Doctrine" — ruling that Parliament cannot alter or destroy the essential framework or basic features of the Constitution.',
    impact: 'Protected fundamental rights and judicial independence from arbitrary constitutional amendments.'
  },
  {
    id: 'case-maneka',
    caseName: 'Maneka Gandhi v. Union of India',
    year: 1978,
    benchSize: '7-Judge Bench',
    category: 'Fundamental Rights',
    ratio: 'Unanimous',
    summary: 'Expanded Article 21 (Right to Life and Personal Liberty) to mandate that procedure established by law must be just, fair, and reasonable, not arbitrary.',
    impact: 'Transformed Indian administrative law by introducing procedural due process.'
  },
  {
    id: 'case-vishaka',
    caseName: 'Vishaka v. State of Rajasthan',
    year: 1997,
    benchSize: '3-Judge Bench',
    category: 'Gender Justice & Rights',
    ratio: 'Unanimous',
    summary: 'Laid down legally binding guidelines against sexual harassment at workplaces prior to formal legislative enactment (Vishaka Guidelines).',
    impact: 'Demonstrated judicial activism in filling statutory vacuums using international human rights conventions (CEDAW).'
  },
  {
    id: 'case-puttaswamy',
    caseName: 'K.S. Puttaswamy v. Union of India',
    year: 2017,
    benchSize: '9-Judge Bench',
    category: 'Privacy & Digital Rights',
    ratio: 'Unanimous (9:0)',
    summary: 'Declared the Right to Privacy as a intrinsic fundamental right protected under Article 21 and Part III of the Constitution.',
    impact: 'Formed the legal cornerstone for data protection laws, bodily autonomy, and digital governance.'
  },
  {
    id: 'case-navtej',
    caseName: 'Navtej Singh Johar v. Union of India',
    year: 2018,
    benchSize: '5-Judge Constitution Bench',
    category: 'Civil Rights & Equality',
    ratio: 'Unanimous',
    summary: 'Decriminalized consensual adult LGBTQ+ relationships by striking down Section 377 of the Indian Penal Code as unconstitutional.',
    impact: 'Upheld constitutional morality over societal prejudice and guaranteed equal citizenship.'
  }
];

export const CONSTITUTIONAL_POWERS = [
  {
    type: 'Original Jurisdiction',
    article: 'Article 131',
    icon: '⚖️',
    description: 'Exclusive jurisdiction to decide legal disputes arising directly between the Government of India and one or more States, or between two or more States.'
  },
  {
    type: 'Writ Jurisdiction',
    article: 'Article 32',
    icon: '📜',
    description: 'Guarantees citizens direct access to SC for enforcement of Fundamental Rights via 5 Writs: Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari.'
  },
  {
    type: 'Appellate Jurisdiction',
    article: 'Articles 132, 133, 134, 136',
    icon: '🏛️',
    description: 'Highest court of appeal in civil, criminal, and constitutional matters, including Special Leave Petitions (SLP under Art 136) at its discretion.'
  },
  {
    type: 'Advisory Jurisdiction',
    article: 'Article 143',
    icon: '💡',
    description: 'President of India may refer significant questions of law or public importance to the Supreme Court for its authoritative advisory opinion.'
  }
];

export const COURT_HIERARCHY_LEVELS = [
  {
    level: 1,
    title: 'Supreme Court of India (Apex Court)',
    location: 'New Delhi',
    head: 'Chief Justice of India (CJI)',
    jurisdiction: 'Entire Territory of India',
    description: 'Highest judicial forum and final court of appeal under the Constitution. Decisions are binding on all courts across India (Art 141).'
  },
  {
    level: 2,
    title: 'High Courts of India',
    location: '25 High Courts across States/UTs',
    head: 'Chief Justice of High Court',
    jurisdiction: 'State / Union Territory',
    description: 'Principal civil and criminal courts of original and appellate jurisdiction in states. Issue writs under Article 226.'
  },
  {
    level: 3,
    title: 'District & Sessions Courts',
    location: 'District Headquarters',
    head: 'District & Sessions Judge',
    jurisdiction: 'District Level',
    description: 'Highest judicial authority in a district. Handles major civil suits and criminal trials with capital punishment powers (subject to HC confirmation).'
  },
  {
    level: 4,
    title: 'Subordinate Courts & Munsiff Courts',
    location: 'Tehsil / Sub-division',
    head: 'Civil Judge / Judicial Magistrate',
    jurisdiction: 'Local Sub-division',
    description: 'Trial courts of first instance for petty civil suits (Munsiff) and minor criminal offences (Judicial Magistrate Class I/II).'
  }
];

/**
 * Filter landmark judgments by category or search string
 */
export function filterJudgments(judgments, query, category) {
  return judgments.filter(j => {
    const matchesCategory = !category || category === 'All Categories' || j.category === category;
    const matchesQuery = !query || query.trim() === '' ||
      j.caseName.toLowerCase().includes(query.toLowerCase()) ||
      j.summary.toLowerCase().includes(query.toLowerCase()) ||
      j.year.toString().includes(query);
    return matchesCategory && matchesQuery;
  });
}

/**
 * Calculate portal summary statistics
 */
export function getSupremeCourtStats() {
  return {
    inaugurationDate: '28 January 1950',
    sanctionedJudges: 34,
    constitutionalArticle: 'Article 124',
    landmarkCasesCount: LANDMARK_JUDGMENTS.length,
    hierarchyTiers: COURT_HIERARCHY_LEVELS.length
  };
}

// Browser DOM initializer
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initSupremeCourtPortal();
  });
}

export function initSupremeCourtPortal() {
  const judgmentSearch = document.getElementById('judgmentSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  const judgmentGrid = document.getElementById('judgmentGrid');
  const hierarchyList = document.getElementById('hierarchyList');

  if (!judgmentGrid) return;

  function renderJudgments(data) {
    judgmentGrid.innerHTML = data.map(j => `
      <article class="case-card">
        <div class="case-header">
          <span class="case-year">${j.year}</span>
          <span class="case-category">${j.category}</span>
        </div>
        <h3 class="case-name">${j.caseName}</h3>
        <div class="case-meta">
          <span>🏛️ Bench: ${j.benchSize}</span>
          <span>⚖️ Ratio: ${j.ratio}</span>
        </div>
        <p class="case-summary"><strong>Held:</strong> ${j.summary}</p>
        <div class="case-impact"><strong>Constitutional Impact:</strong> ${j.impact}</div>
      </article>
    `).join('');
  }

  function renderHierarchy() {
    if (!hierarchyList) return;
    hierarchyList.innerHTML = COURT_HIERARCHY_LEVELS.map(h => `
      <div class="hierarchy-card" data-level="${h.level}">
        <div class="hierarchy-header">
          <span class="level-badge">Tier ${h.level}</span>
          <h3 class="hierarchy-title">${h.title}</h3>
        </div>
        <p class="hierarchy-meta">📍 <strong>Head & Location:</strong> ${h.head} (${h.location})</p>
        <p class="hierarchy-desc">${h.description}</p>
      </div>
    `).join('');
  }

  if (judgmentSearch) {
    judgmentSearch.addEventListener('input', () => {
      const filtered = filterJudgments(LANDMARK_JUDGMENTS, judgmentSearch.value, categoryFilter ? categoryFilter.value : 'All Categories');
      renderJudgments(filtered);
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
      const filtered = filterJudgments(LANDMARK_JUDGMENTS, judgmentSearch ? judgmentSearch.value : '', categoryFilter.value);
      renderJudgments(filtered);
    });
  }

  // Initial renders
  renderJudgments(LANDMARK_JUDGMENTS);
  renderHierarchy();
}
