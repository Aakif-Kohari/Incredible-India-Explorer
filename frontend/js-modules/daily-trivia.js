/**
 * Daily India Trivia Widget
 * Displays a different India-related trivia fact each day using deterministic
 * date-based randomness. No backend required.
 */
(function () {
    'use strict';

    var triviaFacts = [
        { text: "India has more than 22 officially recognized languages and hundreds of regional dialects.", icon: "🗣️" },
        { text: "The Taj Mahal changes color throughout the day \u2014 pinkish in the morning, white in the evening, and golden under moonlight.", icon: "🕌" },
        { text: "India is home to the world's highest motorable road in Ladakh at Umling La.", icon: "🏔️" },
        { text: "Chess originated in ancient India as 'Chaturanga' during the Gupta Empire.", icon: "♟️" },
        { text: "The Indian peacock is the national bird of India, known for its elaborate courtship dance.", icon: "🦚" },
        { text: "India's postal network is the largest in the world with over 155,000 post offices.", icon: "📮" },
        { text: "The Indian Space Research Organisation (ISRO) launched 104 satellites in a single mission in 2017.", icon: "🚀" },
        { text: "India has the largest number of vegetarians in the world.", icon: "🥬" },
        { text: "The Kumbh Mela is the largest peaceful gathering of people on Earth, visible from space.", icon: "🛕" },
        { text: "India's Sundarbans mangrove forest is home to the Royal Bengal Tiger.", icon: "🐯" },
        { text: "The Himalayas contain three of the world's fourteen eight-thousand-metre peaks.", icon: "⛰️" },
        { text: "India is the world's largest producer of milk and spices.", icon: "🥛" },
        { text: "The iron pillar near the Qutub Minar in Delhi has not rusted in over 1,600 years.", icon: "🏛️" },
        { text: "India has the world's oldest known civilization, the Indus Valley Civilization, dating back to 3300 BCE.", icon: "🏺" },
        { text: "The Bengaluru metro system uses technology originally developed for ISRO's satellite programs.", icon: "🚇" },
        { text: "India is home to 7 of the 10 tallest statues in the world.", icon: "🗿" },
        { text: "The Indian railway network is the fourth largest in the world, transporting over 8 billion passengers annually.", icon: "🚂" },
        { text: "Varanasi, one of the oldest continually inhabited cities in the world, has been a centre of learning for over 3,000 years.", icon: "🕉️" },
        { text: "India's Great Indian Desert (Thar Desert) is the most densely populated desert in the world.", icon: "🏜️" },
        { text: "The Banyan tree is the national tree of India and can spread over several acres.", icon: "🌳" },
        { text: "India has the world's largest film industry by number of films produced annually.", icon: "🎬" },
        { text: "The Chail Cricket Ground in Himachal Pradesh is the highest cricket ground in the world.", icon: "🏏" },
        { text: "India's only floating post office is located on Dal Lake in Srinagar.", icon: "🏤" },
        { text: "The Western Ghats in India are older than the Himalayas and are one of the world's eight 'hottest hotspots' of biodiversity.", icon: "🌿" },
        { text: "India invented the game of polo, which originated in Manipur as 'Sagol Kangjei'.", icon: "🐴" },
        { text: "The Konark Sun Temple in Odisha is designed as a massive chariot with 24 wheels.", icon: "☀️" },
        { text: "India has over 40 UNESCO World Heritage Sites, including architectural marvels and natural wonders.", icon: "🌍" },
        { text: "The Indian Ocean is the only ocean named after a country \u2014 India.", icon: "🌊" },
        { text: "India's Kaziranga National Park is home to two-thirds of the world's one-horned rhinoceroses.", icon: "🦏" },
        { text: "The stepwell of Chand Baori in Rajasthan has 3,500 narrow steps and is over 1,000 years old.", icon: "🔽" },
        { text: "Ayurveda, the ancient system of medicine, originated in India over 5,000 years ago.", icon: "💊" },
        { text: "India has the world's largest voluntary blood donor network.", icon: "🩸" },
        { text: "The Golden Temple in Amritsar feeds over 100,000 people daily for free.", icon: "🍛" },
        { text: "India's Rameswaram island has the longest sea bridge in India connecting it to the mainland.", icon: "🌉" },
        { text: "The Indian Rupee symbol was designed by D. Udaya Kumar and adopted in 2010.", icon: "₹" },
        { text: "India's Lakshadweep islands have the world's only place where four varieties of sea turtles nest together.", icon: "🐢" },
        { text: "The Bani tree in India is considered sacred and is associated with immortality in Hindu mythology.", icon: "🌳" },
        { text: "India has the world's largest population of domestic cattle breeds.", icon: "🐄" },
        { text: "The Chhatrapati Shivaji Terminus in Mumbai is a UNESCO World Heritage Site and one of the busiest railway stations.", icon: "🚉" },
        { text: "India's Ruhr of India, Jharkhand, is rich in mineral resources and contributes significantly to the country's mining sector.", icon: "⛏️" },
        { text: "The Rajiv Gandhi International Airport in Hyderabad has a unique design inspired by the Charminar.", icon: "✈️" },
        { text: "India's 22 official languages are listed in the Eighth Schedule of the Constitution.", icon: "📜" },
        { text: "The Indian Himalayan region has over 50,000 glaciers, second only to the polar regions.", icon: "🧊" },
        { text: "The palace of Mysore is the most visited monument in India after the Taj Mahal.", icon: "🏰" },
        { text: "India has the world's largest vegetarian food market.", icon: "🍽️" },
        { text: "The Kolleru Lake in Andhra Pradesh is one of the largest freshwater lakes in India.", icon: "🏞️" },
        { text: "India's ISRO Chandrayaan-3 mission made a historic soft landing near the lunar south pole in 2023.", icon: "🌙" },
        { text: "The Indian Railways operates the Shatabdi Express, one of the fastest trains in the country.", icon: "🚄" },
        { text: "India's oldest rock-cut caves, the Barabar Caves in Bihar, date back to the 3rd century BCE.", icon: "🪨" },
        { text: "The Lotus Temple in New Delhi is shaped like a lotus flower and is a Bahá'í House of Worship.", icon: "🪷" }
    ];

    var STYLES_ID = 'daily-trivia-styles';

    function injectStyles() {
        if (document.getElementById(STYLES_ID)) return;
        var style = document.createElement('style');
        style.id = STYLES_ID;
        style.textContent = [
            '.daily-trivia-wrapper{max-width:720px;margin:0 auto 2rem;padding:0 20px;}',
            '.daily-trivia-card{position:relative;background:rgba(255,255,255,0.04);border:1px solid rgba(255,176,31,0.15);border-left:4px solid #ffb01f;border-radius:12px;padding:1.25rem 1.5rem;overflow:hidden;transition:transform .2s ease,box-shadow .2s ease;}',
            '.daily-trivia-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.2);}',
            '.daily-trivia-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;flex-wrap:wrap;gap:0.5rem;}',
            '.daily-trivia-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:20px;background:rgba(255,176,31,0.12);color:#ffb01f;font-size:0.8rem;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;}',
            '.daily-trivia-refresh{font-size:0.75rem;color:rgba(255,255,255,0.45);font-style:italic;}',
            '.daily-trivia-body{display:flex;align-items:flex-start;gap:0.85rem;}',
            '.daily-trivia-icon{font-size:1.75rem;line-height:1;flex-shrink:0;margin-top:2px;}',
            '.daily-trivia-text{margin:0;font-size:0.95rem;line-height:1.65;color:rgba(255,255,255,0.88);}',
            '.daily-trivia-accent{position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#ff6f00,#ffb01f,#138808);opacity:0.6;}',
            '[data-theme="light"] .daily-trivia-card{background:rgba(255,255,255,0.85);border-color:rgba(255,176,31,0.25);box-shadow:0 2px 12px rgba(0,0,0,0.06);}',
            '[data-theme="light"] .daily-trivia-text{color:rgba(0,0,0,0.8);}',
            '[data-theme="light"] .daily-trivia-refresh{color:rgba(0,0,0,0.35);}',
            '@media(max-width:600px){.daily-trivia-wrapper{padding:0 16px;margin-bottom:1.5rem;}.daily-trivia-card{padding:1rem 1.15rem;}.daily-trivia-text{font-size:0.9rem;}.daily-trivia-icon{font-size:1.4rem;}}'
        ].join('\n');
        document.head.appendChild(style);
    }

    function getDaySeed() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        return (year * 10000) + (month * 100) + day;
    }

    function getTriviaIndex() {
        var seed = getDaySeed();
        return seed % triviaFacts.length;
    }

    function getHoursUntilMidnight() {
        var now = new Date();
        var midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        return Math.ceil((midnight - now) / (1000 * 60 * 60));
    }

    function getRemainingText() {
        var hours = getHoursUntilMidnight();
        if (hours <= 1) return 'New trivia in less than an hour';
        return 'New trivia in ' + hours + ' hours';
    }

    function renderWidget() {
        var container = document.getElementById('daily-trivia-container');
        if (!container) return;

        var trivia = triviaFacts[getTriviaIndex()];

        var wrapper = document.createElement('div');
        wrapper.className = 'daily-trivia-wrapper';

        var card = document.createElement('div');
        card.className = 'daily-trivia-card';
        card.setAttribute('role', 'region');
        card.setAttribute('aria-label', 'Daily India Trivia');

        var header = document.createElement('div');
        header.className = 'daily-trivia-header';

        var badge = document.createElement('span');
        badge.className = 'daily-trivia-badge';
        badge.textContent = 'Did you know?';

        var refreshIndicator = document.createElement('span');
        refreshIndicator.className = 'daily-trivia-refresh';
        refreshIndicator.textContent = getRemainingText();
        refreshIndicator.setAttribute('aria-label', refreshIndicator.textContent);

        header.appendChild(badge);
        header.appendChild(refreshIndicator);

        var body = document.createElement('div');
        body.className = 'daily-trivia-body';

        var iconSpan = document.createElement('span');
        iconSpan.className = 'daily-trivia-icon';
        iconSpan.textContent = trivia.icon;
        iconSpan.setAttribute('aria-hidden', 'true');

        var factText = document.createElement('p');
        factText.className = 'daily-trivia-text';
        factText.textContent = trivia.text;

        body.appendChild(iconSpan);
        body.appendChild(factText);

        var accent = document.createElement('div');
        accent.className = 'daily-trivia-accent';

        card.appendChild(header);
        card.appendChild(body);
        card.appendChild(accent);
        wrapper.appendChild(card);

        container.appendChild(wrapper);
    }

    function init() {
        injectStyles();
        renderWidget();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
