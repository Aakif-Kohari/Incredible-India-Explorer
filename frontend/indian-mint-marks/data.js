/* ==========================================================================
   Indian Mint Marks Data
   Dataset of historical and modern Indian mints, their marks, and coin examples.
   ========================================================================== */

const mintsData = [

    {
        id: 'mumbai',
        name: 'Mumbai Mint',
        location: 'Mumbai, Maharashtra',
        symbol: '◆ (Diamond)',
        mapPos: { top: '55%', left: '25%' },
        period: '1829 – Present',
        history: 'Established by the British East India Company, the Mumbai (Bombay) Mint is one of the oldest operating mints in India. It produces circulation coins, commemorative coins, and medals. The diamond mark is found on most modern Indian coins struck here.',
        coins: [
            { name: '1 Rupee (1992)', desc: 'Stainless steel with diamond mint mark below the date.' },
            { name: '5 Rupees (2007)', desc: 'Cupro-nickel coin featuring the diamond mark.' }
        ]
    },

    {
        id: 'kolkata',
        name: 'Kolkata Mint',
        nameAlt: 'Calcutta Mint',
        location: 'Kolkata, West Bengal',
        symbol: 'No Mark / ○',
        mapPos: { top: '50%', left: '75%' },
        period: '1757 – Present',
        history: 'The oldest mint in India, established by the East India Company. Historically, Calcutta coins bore no mint mark. In modern times, it occasionally uses a small circle or no mark at all. It primarily produces dies and medals today.',
        coins: [
            { name: '1 Anna (1912)', desc: 'Copper coin with no mint mark, indicating Calcutta origin.' },
            { name: '50 Paise (1985)', desc: 'Cupro-nickel coin with no visible mint mark.' }
        ]
    },
    {
        id: 'hyderabad',
        name: 'Hyderabad Mint',
        location: 'Hyderabad, Telangana',
        symbol: '★ (Star)',
        mapPos: { top: '65%', left: '45%' },
        period: '1800 – Present',
        history: 'Originally the royal mint of the Nizams of Hyderabad, it was integrated into the Indian union after 1948. The five-pointed star is the definitive mark of Hyderabad-struck coins, visible on billions of circulation coins.',
        coins: [
            { name: '10 Paise (1983)', desc: 'Aluminum coin with the star mint mark.' },
            { name: '2 Rupees (2011)', desc: 'Stainless steel coin featuring the star below the year.' }
        ]
    },

    {
        id: 'noida',
        name: 'Noida Mint',
        location: 'Noida, Uttar Pradesh',
        symbol: '• (Dot)',
        mapPos: { top: '35%', left: '55%' },
        period: '1988 – Present',
        history: 'The newest mint in India, established to meet the growing demand for circulation coins in northern India. The small dot is the easiest mint mark to spot on modern Indian coinage.',
        coins: [
            { name: '1 Rupee (2004)', desc: 'Stainless steel coin with the dot mint mark.' },
            { name: '10 Rupees (2019)', desc: 'Bimetallic coin featuring the dot below the date.' }
        ]
    },

    {
        id: 'birmingham',
        name: 'Birmingham Mint (Historical)',
        location: 'Birmingham, UK (for India)',
        symbol: 'H (Heaton)',
        mapPos: { top: '20%', left: '10%' },
        period: '1850 – 1940',
        history: 'During the British Raj, when Indian mints could not meet demand, coins were struck at the Heaton Mint in Birmingham. These coins bear the letter "H" and are highly sought after by numismatists.',
        coins: [
            { name: '1/4 Anna (1890)', desc: 'Bronze coin with the "H" mint mark below the date.' }
        ]
    }
];
