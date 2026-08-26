/* ==========================================================================
   Princely State Coins Data
   Comprehensive dataset of historical coinage from Indian Princely States.
   ========================================================================== */

const princelyStatesData = [
    {
        id: 'hyderabad',
        name: 'Hyderabad',
        region: 'central',
        ruler: 'Nizams of Hyderabad (Asaf Jahi Dynasty)',
        period: '1724–1948',
        desc: 'The richest princely state, issuing distinct Halli Sicca and later Osmania currency.',
        coins: [
            { name: 'Halli Sicca Rupee', metal: 'Silver', denomination: '1 Rupee', script: 'Persian', symbols: 'Charminar, Crescent', mint: 'Hyderabad', year: '1800s' },
            { name: 'Osmania Rupee', metal: 'Silver', denomination: '1 Rupee', script: 'Persian/Urdu', symbols: 'Initial letter of Nizam', mint: 'Chichapet', year: '1918' }
        ]
    },

    {
        id: 'mysore',
        name: 'Mysore',
        region: 'south',
        ruler: 'Wodeyar Dynasty',
        period: '1399–1950',
        desc: 'Known for high-quality gold and silver coinage featuring the elephant motif.',
        coins: [
            { name: 'Elephant Pagoda', metal: 'Gold', denomination: 'Pagoda', script: 'Kannada', symbols: 'Elephant, Lion', mint: 'Mysore', year: '1700s' },
            { name: 'Krishnaraja Rupee', metal: 'Silver', denomination: '1 Rupee', script: 'Kannada/Persian', symbols: 'Sun, Moon', mint: 'Mysore', year: '1830' }
        ]
    },

    {
        id: 'baroda',
        name: 'Baroda',
        region: 'west',
        ruler: 'Gaekwad Dynasty',
        period: '1721–1949',
        desc: 'Issued the "Babashahi" and later "Sarkari" rupees, often featuring Nagari script.',
        coins: [
            { name: 'Babashahi Rupee', metal: 'Silver', denomination: '1 Rupee', script: 'Nagari/Persian', symbols: 'Scimitar', mint: 'Baroda', year: '1800s' },
            { name: 'Sarkari Rupee', metal: 'Silver', denomination: '1 Rupee', script: 'Nagari', symbols: 'Portrait of Maharaja', mint: 'Baroda', year: '1920' }
        ]
    },

    {
        id: 'travancore',
        name: 'Travancore',
        region: 'south',
        ruler: 'Kulasekhara Dynasty',
        period: '1729–1949',
        desc: 'Unique coinage featuring the Shankha (conch shell) and Malayalam script.',
        coins: [
            { name: 'Conch Shell Fanam', metal: 'Silver', denomination: '1 Fanam', script: 'Malayalam', symbols: 'Shankha (Conch)', mint: 'Trivandrum', year: '1800s' },
            { name: 'Chuckram', metal: 'Silver', denomination: '1 Chuckram', script: 'Malayalam', symbols: 'Conch, Lotus', mint: 'Trivandrum', year: '1900' }
        ]
    },

    {
        id: 'jammu',
        name: 'Jammu & Kashmir',
        region: 'north',
        ruler: 'Dogra Dynasty',
        period: '1846–1947',
        desc: 'Issued distinct square and rectangular coins featuring Devanagari and Persian scripts.',
        coins: [
            { name: 'Kashmir Rupee', metal: 'Silver', denomination: '1 Rupee', script: 'Persian', symbols: 'Sun, Leaf', mint: 'Srinagar', year: '1885' },
            { name: 'Dogra Square Rupee', metal: 'Silver', denomination: '1 Rupee', script: 'Devanagari', symbols: 'Trishul, Om', mint: 'Jammu', year: '1890' }
        ]
    }
];
