/**
 * rbi-explorer.js
 * Comprehensive dataset and interactive calculation logic for the Reserve Bank of India (RBI) Explorer.
 * Exports datasets and utility functions for testing and rendering.
 */

// --- 1. History Dataset ---
export const RBI_HISTORY_TIMELINE = [
  {
    year: "1926",
    title: "Hilton Young Commission Recommendation",
    era: "Pre-Independence",
    summary: "The Royal Commission on Indian Currency and Finance (Hilton Young Commission) recommended establishing a central bank for India.",
    details: "To separate the control of currency and credit from the government and consolidate banking functions into an independent apex institution."
  },
  {
    year: "1934",
    title: "Enactment of the Reserve Bank of India Act",
    era: "Legislative Foundation",
    summary: "The Reserve Bank of India Act, 1934 was passed, providing the statutory framework for the central bank.",
    details: "Established the Constitution, management, capital, and functions of the RBI, including sole right to issue banknotes in India."
  },
  {
    year: "1935",
    title: "RBI Commences Operations",
    era: "Establishment",
    summary: "RBI officially commenced operations on April 1, 1935, as a private shareholders' bank with headquarters in Kolkata.",
    details: "Sir Osborne Smith was appointed as the first Governor of the RBI. The central office was permanently relocated to Mumbai in 1937."
  },
  {
    year: "1949",
    title: "Nationalisation of the RBI",
    era: "Post-Independence",
    summary: "Under the Reserve Bank (Transfer to Public Ownership) Act 1948, RBI was nationalised on January 1, 1949.",
    details: "Government acquired all private shares, making RBI a fully state-owned central bank accountable to the Government of India."
  },
  {
    year: "1969",
    title: "Social Control & Bank Nationalisation Oversight",
    era: "Banking Expansion",
    summary: "RBI supervised the nationalisation of 14 major commercial banks to extend credit to agriculture and rural sectors.",
    details: "Led to the establishment of the Lead Bank Scheme and priority sector lending targets to deepen financial inclusion across India."
  },
  {
    year: "1991",
    title: "Economic Reforms & Financial Sector Deregulation",
    era: "Economic Reform",
    summary: "Post-1991 LPG reforms, RBI transitioned from direct credit controls to market-based indirect monetary instruments.",
    details: "Allowed entry of private sector banks, deregulated interest rates, and modernised exchange rate management under FEMA 1999."
  },
  {
    year: "2016",
    title: "Flexible Inflation Targeting & MPC Formation",
    era: "Monetary Framework Reform",
    summary: "Formal adoption of Flexible Inflation Targeting (FIT) framework and establishment of the Monetary Policy Committee (MPC).",
    details: "Amended RBI Act 1934 to mandate a 6-member MPC to set policy repo rates to maintain consumer price inflation target of 4% (± 2%)."
  },
  {
    year: "2022",
    title: "Launch of Digital Rupee (e₹ - CBDC)",
    era: "Digital Currency Era",
    summary: "RBI launched pilot projects for Central Bank Digital Currency (CBDC) in Wholesale (e₹-W) and Retail (e₹-R) segments.",
    details: "Introduced sovereign digital token currency representing legal tender backed directly by RBI balance sheet."
  }
];

// --- 2. Core Functions Dataset ---
export const RBI_CORE_FUNCTIONS = [
  {
    id: "monetary-authority",
    title: "Monetary Authority",
    icon: "🏦",
    summary: "Formulates, implements, and monitors India's monetary policy.",
    objective: "Maintaining price stability while supporting sustainable economic growth."
  },
  {
    id: "regulator-banking",
    title: "Regulator & Supervisor of Banking System",
    icon: "🛡️",
    summary: "Sets parameters for banking operations, licensing, capital adequacy, and NPA resolution.",
    objective: "Ensuring public confidence in the banking system, protecting depositors' interest, and preventing systemic risks."
  },
  {
    id: "forex-manager",
    title: "Manager of Foreign Exchange (FEMA 1999)",
    icon: "💱",
    summary: "Manages India's Foreign Exchange Reserves (Gold, SDRs, Foreign Currencies) and administers FEMA 1999.",
    objective: "Facilitating external trade, orderly forex market operations, and balance of payment stability."
  },
  {
    id: "currency-issuer",
    title: "Issuer of Currency",
    icon: "💵",
    summary: "Sole authority to issue, manage, and withdraw currency notes and coins across India.",
    objective: "Ensuring adequate supply of clean, genuine currency notes and combating counterfeit currency."
  },
  {
    id: "banker-government",
    title: "Banker to Central & State Governments",
    icon: "🏛️",
    summary: "Manages government bank accounts, issues Ways and Means Advances (WMA), and manages public debt auctions.",
    objective: "Providing efficient treasury management and sovereign bond market infrastructure."
  },
  {
    id: "banker-banks",
    title: "Banker to Banks & Lender of Last Resort",
    icon: "🤝",
    summary: "Maintains current accounts of commercial banks, settles interbank transactions, and provides emergency liquidity support.",
    objective: "Maintaining financial system stability and interbank clearing operations."
  }
];

// --- 3. Monetary Policy & MPC Dataset ---
export const MPC_STRUCTURE_INFO = {
  totalMembers: 6,
  composition: [
    { source: "Reserve Bank of India", count: 3, details: "RBI Governor (Ex-officio Chairperson), Deputy Governor in-charge of Monetary Policy, and one RBI Officer nominated by Central Board." },
    { source: "Central Government", count: 3, details: "Three external independent experts appointed by the Central Government based on economic expertise." }
  ],
  targetInflation: "4.0%",
  toleranceBand: "2.0% to 6.0% (4% ± 2%)",
  meetingFrequency: "At least 4 times a year (typically bi-monthly policy meetings)",
  votingRule: "Each member has one vote. In case of a tie, the RBI Governor has a casting vote."
};

// --- 4. Monetary Tools Dataset ---
export const MONETARY_TOOLS_DATA = [
  {
    id: "repo-rate",
    name: "Repo Rate (Repurchase Option)",
    type: "Policy Rate",
    currentRate: "6.50%",
    description: "The rate at which commercial banks borrow short-term money from RBI by pledging government securities.",
    impactOnInflation: "Raising Repo Rate increases borrowing cost for banks, reducing money supply and cooling inflation.",
    impactOnGrowth: "Lowering Repo Rate makes loans cheaper, encouraging business investment and consumer spending."
  },
  {
    id: "sdf-rate",
    name: "Standing Deposit Facility (SDF)",
    type: "Policy Rate (Floor)",
    currentRate: "6.25%",
    description: "Liquidity absorption tool allowing banks to park excess liquidity with RBI overnight without collateral.",
    impactOnInflation: "Absorbs surplus cash from banking system, preventing excess money creation."
  },
  {
    id: "msf-rate",
    name: "Marginal Standing Facility (MSF)",
    type: "Policy Rate (Ceiling)",
    currentRate: "6.75%",
    description: "Emergency borrowing window for commercial banks to borrow overnight funds against SLR securities.",
    impactOnInflation: "Acts as upper ceiling rate of liquidity adjustment corridor."
  },
  {
    id: "crr",
    name: "Cash Reserve Ratio (CRR)",
    type: "Reserve Ratio",
    currentRate: "4.50%",
    description: "Percentage of Net Demand and Time Liabilities (NDTL) that commercial banks must maintain as cash balance with RBI.",
    impactOnInflation: "Increasing CRR locks money with RBI, leaving less liquidity for banks to lend."
  },
  {
    id: "slr",
    name: "Statutory Liquidity Ratio (SLR)",
    type: "Reserve Ratio",
    currentRate: "18.00%",
    description: "Percentage of NDTL that banks must maintain in liquid assets (Government Securities, Gold, Approved Securities).",
    impactOnInflation: "Ensures bank solvency and guarantees steady flow of credit to sovereign government bonds."
  }
];

// --- 5. Currency Printing & Mints Dataset ---
export const CURRENCY_LOCATIONS = {
  printingPresses: [
    { location: "Mysuru (Karnataka)", operator: "BRBNMPL (RBI Subsidiary)" },
    { location: "Salboni (West Bengal)", operator: "BRBNMPL (RBI Subsidiary)" },
    { location: "Dewas (Madhya Pradesh)", operator: "SPMCIL (Government of India)" },
    { location: "Nashik (Maharashtra)", operator: "SPMCIL (Government of India)" }
  ],
  mintLocations: [
    { city: "Mumbai", mintMark: "Diamond or V / M mark" },
    { city: "Hyderabad", mintMark: "Five-pointed Star mark" },
    { city: "Kolkata", mintMark: "No Mint Mark below date" },
    { city: "Noida", mintMark: "Solid Dot Mark below date" }
  ],
  securityFeatures: [
    "Mahatma Gandhi Watermark with electrotype 2000/500/200/100 numeral",
    "Color-shifting windowed security thread (green to blue)",
    "Intaglio raised printing for visually impaired",
    "Microlettering 'RBI' and numeral denomination",
    "Latent image showing denomination when held at 45° angle"
  ]
};

// --- 6. Inflation Control Mechanism Dataset ---
export const INFLATION_CONTROL_MECHANISM = {
  types: [
    {
      name: "Demand-Pull Inflation",
      cause: "Aggregate demand for goods/services exceeds aggregate supply.",
      rbiTool: "Raise Repo Rate & CRR to reduce bank credit and cool consumer demand."
    },
    {
      name: "Cost-Push Inflation",
      cause: "Rise in production costs (crude oil, raw materials, supply chain disruptions).",
      rbiTool: "Open Market Operations (OMO), forex intervention, and coordination with fiscal policy."
    }
  ],
  transmissionSteps: [
    { step: 1, title: "MPC Policy Rate Decision", desc: "RBI MPC alters Repo Rate (e.g. raises rate by 25 bps)." },
    { step: 2, title: "Interbank & Money Market Transmission", desc: "Call money rates and commercial paper yields adjust immediately." },
    { step: 3, title: "Commercial Bank Rate Revision", desc: "Banks raise Marginal Cost of Funds Based Lending Rate (MCLR) / Repo-Linked Lending Rate (RLLR)." },
    { step: 4, title: "Consumer & Corporate Impact", desc: "Home loan & business loan EMIs increase, moderating private borrowing." },
    { step: 5, title: "Inflation & Output Adjustment", desc: "Aggregate demand cools, stabilizing retail CPI inflation towards 4% target." }
  ]
};

// --- Utility & Simulator Functions ---

/**
 * Simulates policy Repo Rate impact on economic indicators.
 * @param {number} repoRate - Repo Rate percentage (e.g. 6.5)
 * @returns {Object} Estimated loan rates, deposit rates, liquidity state, and inflation impact
 */
export function simulateRepoRateImpact(repoRate = 6.5) {
  const rate = Math.max(3.0, Math.min(10.0, Number(repoRate)));
  
  // Mathematical modeling for illustrative educational simulation
  const homeLoanRate = (rate + 2.25).toFixed(2);
  const fixedDepositRate = (rate + 0.75).toFixed(2);
  
  let liquidityCondition = "Balanced Liquidity";
  let consumerDemandImpact = "Moderate Demand Growth";
  let inflationOutlook = "Inflation Near 4% Target";

  if (rate >= 7.5) {
    liquidityCondition = "Tight Interbank Liquidity";
    consumerDemandImpact = "Subdued Consumer Borrowing (Cooling)";
    inflationOutlook = "Strong Downward Pressure on Inflation";
  } else if (rate <= 5.0) {
    liquidityCondition = "Surplus System Liquidity";
    consumerDemandImpact = "High Borrowing & Spending Stimulus";
    inflationOutlook = "Potential Upward Risk on Retail Inflation";
  }

  return {
    repoRate: rate.toFixed(2),
    estimatedHomeLoanRate: `${homeLoanRate}%`,
    estimatedFixedDepositRate: `${fixedDepositRate}%`,
    liquidityCondition,
    consumerDemandImpact,
    inflationOutlook
  };
}

/**
 * Calculates bank reserves allocation based on NDTL (Net Demand & Time Liabilities).
 * @param {number} totalDeposits - Amount in ₹ Crore
 * @param {number} crrPercent - CRR percentage (e.g. 4.5)
 * @param {number} slrPercent - SLR percentage (e.g. 18.0)
 * @returns {Object} Amounts reserved in CRR, SLR, and Lendable Capacity
 */
export function calculateBankReserves(totalDeposits = 10000, crrPercent = 4.5, slrPercent = 18.0) {
  const deposits = Math.max(0, Number(totalDeposits));
  const crr = Math.max(0, Number(crrPercent));
  const slr = Math.max(0, Number(slrPercent));

  const crrAmount = (deposits * (crr / 100));
  const slrAmount = (deposits * (slr / 100));
  const totalReserved = crrAmount + slrAmount;
  const lendableAmount = Math.max(0, deposits - totalReserved);

  return {
    totalDeposits: deposits,
    crrPercent: crr.toFixed(2),
    crrAmount: Math.round(crrAmount),
    slrPercent: slr.toFixed(2),
    slrAmount: Math.round(slrAmount),
    totalReserved: Math.round(totalReserved),
    lendableAmount: Math.round(lendableAmount),
    lendablePercentage: ((lendableAmount / deposits) * 100).toFixed(1)
  };
}

/**
 * Filter monetary tools by type or search keyword.
 * @param {Array} tools
 * @param {string} filterType
 * @returns {Array}
 */
export function filterMonetaryTools(tools = MONETARY_TOOLS_DATA, filterType = 'all') {
  if (filterType === 'all') return tools;
  return tools.filter(t => t.type.toLowerCase().includes(filterType.toLowerCase()));
}

/**
 * Returns key RBI policy rates stats summary.
 * @returns {Object}
 */
export function getMonetaryPolicyStats() {
  return {
    repoRate: "6.50%",
    sdfRate: "6.25%",
    msfRate: "6.75%",
    crrRate: "4.50%",
    slrRate: "18.00%",
    targetInflation: "4.00%"
  };
}
