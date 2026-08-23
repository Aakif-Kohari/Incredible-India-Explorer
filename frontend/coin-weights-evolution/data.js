/* ==========================================================================
   Indian Coin Weights Data
   Historical dataset of coin weights across different eras and dynasties.
   Weights are standardized to grams for accurate comparison.
   ========================================================================== */

const coinWeightsData = [

    {
        id: 'punch-marked',
        name: 'Punch-Marked Karshapana',
        period: '600 BCE – 200 BCE',
        dynasty: 'Mahajanapadas / Maurya Empire',
        region: 'Northern India',
        metal: 'Silver',
        weight: 3.4, // Approx 3.4 grams (standard Karshapana)
        uncertainty: '±0.2g',
        evidence: 'Archaeological excavations at Taxila and Ahichchhatra.',
        desc: 'The earliest standardized coinage in India, based on the Karshapana weight standard of 32 rattis.'
    },

    {
        id: 'gupta-dinar',
        name: 'Gupta Gold Dinar',
        period: '320 CE – 550 CE',
        dynasty: 'Gupta Empire',
        region: 'Northern & Central India',
        metal: 'Gold',
        weight: 8.0,
        uncertainty: '±0.3g',
        evidence: 'Hoard findings in Bayana and Kalahandi.',
        desc: 'Heavily influenced by Roman Aureus and Kushan dinars, these gold coins were used for high-value trade and royal grants.'
    },

    {
        id: 'delhi-tanka',
        name: 'Delhi Sultanate Silver Tanka',
        period: '1200 CE – 1526 CE',
        dynasty: 'Delhi Sultanate (Mamluk/Khalji)',
        region: 'Pan-India',
        metal: 'Silver',
        weight: 11.0,
        uncertainty: '±0.5g',
        evidence: 'Numismatic collections in National Museum, New Delhi.',
        desc: 'Introduced by Iltutmish, the Tanka became the standard silver currency for 300 years, weighing roughly 11 grams (175 grains).'
    },

    {
        id: 'mughal-rupee',
        name: 'Mughal Silver Rupee',
        period: '1526 CE – 1857 CE',
        dynasty: 'Mughal Empire (Akbar to Aurangzeb)',
        region: 'Pan-India',
        metal: 'Silver',
        weight: 11.5,
        uncertainty: '±0.2g',
        evidence: 'Sher Shah Suri\'s standardization, continued by Akbar.',
        desc: 'Sher Shah Suri standardized the Rupee at 178 grains (11.53 grams). This standard was adopted by the Mughals and later the British.'
    },
    {
        id: 'chola-kasu',
        name: 'Chola Gold Kasu',
        period: '850 CE – 1279 CE',
        dynasty: 'Chola Empire',
        region: 'Southern India',
        metal: 'Gold',
        weight: 0.4,
        uncertainty: '±0.1g',
        evidence: 'Temple inscriptions in Thanjavur and Gangaikonda Cholapuram.',
        desc: 'A very small, lightweight gold coin used for daily transactions and temple donations in the deep south.'
    },
    {
        id: 'vijayanagara-pagoda',
        name: 'Vijayanagara Gold Pagoda',
        period: '1336 CE – 1646 CE',
        dynasty: 'Vijayanagara Empire',
        region: 'Deccan & South India',
        metal: 'Gold',
        weight: 3.4,
        uncertainty: '±0.2g',
        evidence: 'Hoard findings in Hampi and Chandragiri.',
        desc: 'Also known as the Varaha, this coin weighed roughly 3.4 grams and became the dominant gold currency in southern India and international trade.'
    },

    {
        id: 'eic-rupee',
        name: 'British Imperial Rupee',
        period: '1835 CE – 1947 CE',
        dynasty: 'British East India Company / Crown',
        region: 'Pan-India',
        metal: 'Silver',
        weight: 11.66,
        uncertainty: '±0.05g',
        evidence: 'Coinage Act of 1835.',
        desc: 'The Uniform Coinage Act of 1835 standardized the British Indian Rupee at exactly 11.66 grams (180 grains) of silver.'
    }
];
