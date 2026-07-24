(() => {
  'use strict';

  /* ------------------------------------------------------------------
     1. Data: twelve real Indian railway stations grouped into three
        difficulty tiers (well-known terminals -> lesser-known heritage
        halts). Each entry carries the clues the UI progressively reveals
        and a small flat-silhouette SVG standing in for a photograph.
     ------------------------------------------------------------------ */
  const STATIONS = [
    // ---- EASY: nationally famous terminals ----
    {
      id: 'csmt', name: 'Chhatrapati Shivaji Maharaj Terminus', tier: 'easy',
      locationClue: 'On India\u2019s western coast, in the country\u2019s financial capital.',
      yearFact: 'Completed in 1887, originally opened as Victoria Terminus.',
      styleFact: 'Victorian Gothic Revival fused with Indian palace details, crowned by a large ribbed dome.',
      historyFact: 'Designed by Frederick William Stevens, CSMT became a UNESCO World Heritage Site in 2004 and remains the headquarters of Central Railway.',
      svg: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="70" width="160" height="50" opacity="0.85"/>
        <polygon points="20,70 100,32 180,70" opacity="0.65"/>
        <circle cx="100" cy="40" r="14" opacity="0.9"/>
        <rect x="97" y="18" width="6" height="14"/>
        <polygon points="94,18 100,6 106,18"/>
        <rect x="35" y="85" width="10" height="25"/>
        <rect x="60" y="85" width="10" height="25"/>
        <rect x="130" y="85" width="10" height="25"/>
        <rect x="155" y="85" width="10" height="25"/>
      </svg>`
    },
    {
      id: 'howrah', name: 'Howrah Junction', tier: 'easy',
      locationClue: 'On the bank of the Hooghly River in eastern India.',
      yearFact: 'The site has been in continuous rail service since 1854, among the oldest in the country.',
      styleFact: 'A red-brick colonial facade flanked by twin towers with pyramidal roofs.',
      historyFact: 'Howrah is India\u2019s busiest terminal by platform count \u2014 23 in total \u2014 and connects Kolkata to the rest of the country across the Howrah Bridge.',
      svg: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="80" width="170" height="40"/>
        <rect x="25" y="40" width="30" height="80"/>
        <polygon points="25,40 40,20 55,40"/>
        <rect x="145" y="40" width="30" height="80"/>
        <polygon points="145,40 160,20 175,40"/>
        <rect x="70" y="95" width="10" height="20" opacity="0.55"/>
        <rect x="95" y="95" width="10" height="20" opacity="0.55"/>
        <rect x="120" y="95" width="10" height="20" opacity="0.55"/>
      </svg>`
    },
    {
      id: 'chennai-central', name: 'MGR Chennai Central', tier: 'easy',
      locationClue: 'On India\u2019s southeastern coast, gateway to Tamil Nadu.',
      yearFact: 'Opened in 1873 and rebuilt with its present facade around 1900.',
      styleFact: 'Gothic Revival red brick with a tall central clock tower.',
      historyFact: 'Designed by George Harding, it was renamed for former Chief Minister M. G. Ramachandran and is the terminus for Southern Railway\u2019s long-distance trains.',
      svg: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="85" width="160" height="35"/>
        <rect x="85" y="20" width="30" height="65"/>
        <polygon points="85,20 100,6 115,20"/>
        <circle cx="100" cy="45" r="9" opacity="0.9"/>
        <rect x="35" y="95" width="10" height="20" opacity="0.55"/>
        <rect x="60" y="95" width="10" height="20" opacity="0.55"/>
        <rect x="130" y="95" width="10" height="20" opacity="0.55"/>
        <rect x="155" y="95" width="10" height="20" opacity="0.55"/>
      </svg>`
    },
    {
      id: 'new-delhi', name: 'New Delhi Railway Station', tier: 'easy',
      locationClue: 'In the heart of the national capital, near Connaught Place.',
      yearFact: 'Opened in 1926 to relieve pressure on the older Delhi station.',
      styleFact: 'A long, low, functional facade built for volume rather than ornament, with a wide platform canopy.',
      historyFact: 'One of the busiest stations on Earth by daily passengers, it sits on the Delhi\u2013Howrah and Delhi\u2013Mumbai main lines.',
      svg: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="90" width="180" height="28"/>
        <rect x="10" y="72" width="180" height="8" opacity="0.55"/>
        <rect x="20" y="80" width="6" height="12"/>
        <rect x="45" y="80" width="6" height="12"/>
        <rect x="70" y="80" width="6" height="12"/>
        <rect x="95" y="80" width="6" height="12"/>
        <rect x="120" y="80" width="6" height="12"/>
        <rect x="145" y="80" width="6" height="12"/>
        <rect x="170" y="80" width="6" height="12"/>
      </svg>`
    },

    // ---- MEDIUM: recognisable but more distinctive detail required ----
    {
      id: 'charbagh', name: 'Charbagh Railway Station', tier: 'medium',
      locationClue: 'In the capital of Uttar Pradesh, once the seat of the Nawabs of Awadh.',
      yearFact: 'Construction finished in 1926, after roughly a decade of work.',
      styleFact: 'A row of domes and minarets blending Mughal, Rajput and Awadhi motifs; the floor plan resembles a chessboard from above.',
      historyFact: 'Charbagh replaced two older Lucknow terminals and is still one of the most photographed station facades in India.',
      svg: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="90" width="160" height="30"/>
        <circle cx="60" cy="70" r="16"/>
        <circle cx="100" cy="58" r="20"/>
        <circle cx="140" cy="70" r="16"/>
        <rect x="15" y="50" width="6" height="45" opacity="0.65"/>
        <rect x="179" y="50" width="6" height="45" opacity="0.65"/>
        <polygon points="15,50 18,40 21,50" opacity="0.65"/>
        <polygon points="179,50 182,40 185,50" opacity="0.65"/>
      </svg>`
    },
    {
      id: 'jaipur', name: 'Jaipur Junction', tier: 'medium',
      locationClue: 'In Rajasthan\u2019s "Pink City", built inside a walled old town.',
      yearFact: 'The current station building dates to the early 20th century, expanded many times since.',
      styleFact: 'Painted in the same terracotta-pink wash as the old city\u2019s heritage buildings, with arched jharokha-style windows.',
      historyFact: 'A 1876 royal decree ordered Jaipur\u2019s old city painted pink to welcome the Prince of Wales \u2014 the station shares that civic colour code to this day.',
      svg: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="80" width="150" height="40"/>
        <circle cx="100" cy="55" r="18"/>
        <rect x="93" y="35" width="14" height="20"/>
        <path d="M45 80 a10 13 0 0 1 20 0 z" opacity="0.55"/>
        <path d="M90 80 a10 13 0 0 1 20 0 z" opacity="0.55"/>
        <path d="M135 80 a10 13 0 0 1 20 0 z" opacity="0.55"/>
      </svg>`
    },
    {
      id: 'kalka', name: 'Kalka Railway Station', tier: 'medium',
      locationClue: 'At the foot of the Himalayan foothills in Haryana.',
      yearFact: 'Opened in 1891, decades before the narrow-gauge line above it was completed in 1903.',
      styleFact: 'A modest hill-town building with a steep tin roof, dwarfed by the mountains behind it.',
      historyFact: 'Kalka is the lower terminus of the UNESCO-listed Kalka\u2013Shimla Railway, which climbs over 100 tunnels to reach the old British summer capital.',
      svg: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,120 40,60 90,120" opacity="0.3"/>
        <polygon points="60,120 110,48 170,120" opacity="0.45"/>
        <rect x="55" y="90" width="90" height="30"/>
        <polygon points="50,90 100,64 150,90"/>
        <rect x="95" y="70" width="10" height="20" opacity="0.6"/>
      </svg>`
    },
    {
      id: 'old-delhi', name: 'Old Delhi Railway Station', tier: 'medium',
      locationClue: 'Beside the walls of a 17th-century Mughal fort in the national capital.',
      yearFact: 'Opened in 1864, among the earliest stations built in northern India.',
      styleFact: 'A red sandstone facade with a crenellated parapet echoing the nearby fort walls, and a central arched gateway.',
      historyFact: 'Long before New Delhi station existed, Old Delhi was the city\u2019s principal railhead and remains a key junction for northern routes.',
      svg: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="85" width="160" height="35"/>
        <rect x="20" y="70" width="12" height="15"/>
        <rect x="44" y="70" width="12" height="15"/>
        <rect x="68" y="70" width="12" height="15"/>
        <rect x="92" y="70" width="12" height="15"/>
        <rect x="116" y="70" width="12" height="15"/>
        <rect x="140" y="70" width="12" height="15"/>
        <rect x="164" y="70" width="12" height="15"/>
        <path d="M70 120 a30 30 0 0 1 60 0 z" opacity="0.6"/>
      </svg>`
    },

    // ---- HARD: obscure or heritage-line stations ----
    {
      id: 'ghum', name: 'Ghum Railway Station', tier: 'hard',
      locationClue: 'Near Darjeeling, in the hills of northern West Bengal.',
      yearFact: 'Opened in the 1880s as part of the Darjeeling Himalayan Railway.',
      styleFact: 'A small wooden hill cottage with a steeply pitched roof, built to shed heavy monsoon rain and snow.',
      historyFact: 'At about 2,258 metres (7,407 feet), Ghum is the highest railway station in India, served by the UNESCO-listed "Toy Train".',
      svg: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,125 30,95 55,80 80,95 108,125" opacity="0.28"/>
        <rect x="30" y="85" width="60" height="35"/>
        <polygon points="25,85 60,60 95,85"/>
        <rect x="52" y="100" width="16" height="20" opacity="0.6"/>
        <rect x="115" y="112" width="60" height="10" opacity="0.85"/>
        <rect x="120" y="100" width="18" height="14" opacity="0.85"/>
        <circle cx="128" cy="124" r="5"/>
        <circle cx="150" cy="124" r="5"/>
        <circle cx="168" cy="124" r="5"/>
      </svg>`
    },
    {
      id: 'egmore', name: 'Egmore Railway Station', tier: 'hard',
      locationClue: 'A second major terminus in the same city as MGR Chennai Central.',
      yearFact: 'The current building opened in 1908.',
      styleFact: 'A tiered, pyramid-like tower over a colonial base, echoing South Indian temple gopurams.',
      historyFact: 'Egmore serves as the terminus for most trains within Tamil Nadu, complementing Chennai Central\u2019s inter-state services.',
      svg: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="90" width="150" height="30"/>
        <rect x="80" y="70" width="40" height="22"/>
        <rect x="85" y="52" width="30" height="20"/>
        <rect x="90" y="36" width="20" height="18"/>
        <polygon points="90,36 100,22 110,36"/>
      </svg>`
    },
    {
      id: 'gorakhpur', name: 'Gorakhpur Railway Station', tier: 'hard',
      locationClue: 'In eastern Uttar Pradesh, on the North Eastern Railway network.',
      yearFact: 'Its platform reached record length after renovations completed in the 2010s.',
      styleFact: 'An unusually long, low platform building \u2014 wider than it is tall, running far beyond a normal station frontage.',
      historyFact: 'Gorakhpur holds the Guinness World Record for the longest railway platform, at roughly 1,366.33 metres.',
      svg: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="95" width="200" height="22"/>
        <rect x="0" y="80" width="200" height="6" opacity="0.55"/>
        <rect x="10" y="86" width="4" height="10"/>
        <rect x="35" y="86" width="4" height="10"/>
        <rect x="60" y="86" width="4" height="10"/>
        <rect x="85" y="86" width="4" height="10"/>
        <rect x="110" y="86" width="4" height="10"/>
        <rect x="135" y="86" width="4" height="10"/>
        <rect x="160" y="86" width="4" height="10"/>
        <rect x="185" y="86" width="4" height="10"/>
      </svg>`
    },
    {
      id: 'ooty', name: 'Udagamandalam (Ooty) Railway Station', tier: 'hard',
      locationClue: 'High in the Nilgiri hills of western Tamil Nadu.',
      yearFact: 'The line reaching this station was completed in 1908.',
      styleFact: 'A small blue-roofed hill cottage beside a steeply inclined rack-and-pinion track.',
      historyFact: 'The terminus of the Nilgiri Mountain Railway, part of the UNESCO World Heritage "Mountain Railways of India" listing alongside Darjeeling and Kalka\u2013Shimla.',
      svg: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
        <polygon points="150,125 165,85 180,125" opacity="0.32"/>
        <polygon points="10,125 25,90 40,125" opacity="0.32"/>
        <rect x="55" y="90" width="55" height="30"/>
        <polygon points="50,90 82,68 114,90"/>
        <rect x="75" y="100" width="14" height="20" opacity="0.6"/>
        <line x1="20" y1="120" x2="190" y2="95" stroke="currentColor" stroke-width="4" opacity="0.75"/>
        <line x1="20" y1="126" x2="190" y2="101" stroke="currentColor" stroke-width="4" opacity="0.75"/>
      </svg>`
    },
  ];

  /* Difficulty ladder: order defines progression, points scale with tier. */
  const LEVELS = [
    { tier: 'easy', label: 'EASY', points: 10 },
    { tier: 'medium', label: 'MEDIUM', points: 20 },
    { tier: 'hard', label: 'HARD', points: 30 },
  ];
  const ADVANCE_AFTER = 3; // correct answers needed before the tier steps up

  /* ------------------------------------------------------------------
     2. Game state
     ------------------------------------------------------------------ */
  const game = {
    levelIndex: 0,
    score: 0,
    best: 0,
    streak: 0,
    correctAtTier: 0,
    ticketCount: 0,
    current: null,
    answered: false,
    hintsUsed: new Set(),
  };

  /* ------------------------------------------------------------------
     3. DOM references, gathered once
     ------------------------------------------------------------------ */
  const dom = {
    tierFlap: document.getElementById('tierFlap'),
    scoreFlap: document.getElementById('scoreFlap'),
    streakFlap: document.getElementById('streakFlap'),
    bestFlap: document.getElementById('bestFlap'),
    punchTrack: document.getElementById('punchTrack'),
    ticketNumber: document.getElementById('ticketNumber'),
    ticketTier: document.getElementById('ticketTier'),
    illustration: document.getElementById('stationIllustration'),
    locationClueText: document.getElementById('locationClueText'),
    hintEcho: document.getElementById('hintEcho'),
    options: document.getElementById('options'),
    feedback: document.getElementById('feedback'),
    historyPanel: document.getElementById('historyPanel'),
    historyFact: document.getElementById('historyFact'),
    nextBtn: document.getElementById('nextBtn'),
    resetBtn: document.getElementById('resetBtn'),
    hintLocation: document.getElementById('hintLocation'),
    hintEra: document.getElementById('hintEra'),
    hintStyle: document.getElementById('hintStyle'),
  };

  const currentLevel = () => LEVELS[game.levelIndex];

  /* Fisher-Yates shuffle, used both for option order and distractor pick. */
  function shuffle(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function stationsForTier(tier) {
    return STATIONS.filter((station) => station.tier === tier);
  }

  function pickStation() {
    const pool = stationsForTier(currentLevel().tier);
    return pool[Math.floor(Math.random() * pool.length)];
  }

  /* Pick 3 wrong names for the multiple-choice row. Prefer same-tier
     stations first (harder to tell apart), then fill from the full list
     if a tier doesn't have enough entries. */
  function distractorsFor(station) {
    const sameTier = STATIONS.filter((s) => s.tier === station.tier && s.id !== station.id);
    const others = STATIONS.filter((s) => s.tier !== station.tier && s.id !== station.id);
    const ordered = [...shuffle(sameTier), ...shuffle(others)];
    return ordered.slice(0, 3).map((s) => s.name);
  }

  /* Animates a departure-board cell through a quick "flip" before the
     new value settles, mimicking a split-flap display. */
  function setFlap(el, value) {
    el.classList.remove('flipping');
    // Force reflow so the animation can be re-triggered on repeat calls.
    void el.offsetWidth;
    el.textContent = value;
    el.classList.add('flipping');
  }

  function updateBoard() {
    setFlap(dom.tierFlap, currentLevel().label);
    setFlap(dom.scoreFlap, String(Math.max(0, game.score)).padStart(3, '0'));
    setFlap(dom.streakFlap, String(game.streak).padStart(2, '0'));
    setFlap(dom.bestFlap, String(game.best).padStart(3, '0'));
  }

  function pushPunch(kind) {
    const item = document.createElement('li');
    item.className = kind;
    dom.punchTrack.appendChild(item);
  }

  /* ------------------------------------------------------------------
     4. Question lifecycle
     ------------------------------------------------------------------ */
  function loadQuestion() {
    const level = currentLevel();
    const station = pickStation();

    game.current = station;
    game.answered = false;
    game.hintsUsed.clear();
    game.ticketCount += 1;

    dom.ticketNumber.textContent = String(game.ticketCount).padStart(3, '0');
    dom.ticketTier.textContent = level.label[0] + level.label.slice(1).toLowerCase();
    dom.illustration.innerHTML = station.svg;
    dom.locationClueText.textContent = 'Hidden \u2014 use a hint to reveal it';
    dom.hintEcho.textContent = '';
    dom.feedback.textContent = '\u00A0';
    dom.feedback.className = 'feedback';
    dom.historyPanel.hidden = true;
    dom.nextBtn.disabled = true;

    [dom.hintLocation, dom.hintEra, dom.hintStyle].forEach((btn) => { btn.disabled = false; });

    const options = shuffle([station.name, ...distractorsFor(station)]);
    dom.options.innerHTML = '';
    options.forEach((name) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn';
      btn.textContent = name;
      btn.addEventListener('click', () => submitAnswer(name, btn));
      dom.options.appendChild(btn);
    });
  }

  function submitAnswer(choice, btn) {
    if (game.answered) return;
    game.answered = true;

    const level = currentLevel();
    const isCorrect = choice === game.current.name;

    // Lock the row and mark the correct / chosen answer.
    [...dom.options.children].forEach((option) => {
      option.disabled = true;
      if (option.textContent === game.current.name) option.classList.add('correct');
      else if (option === btn) option.classList.add('wrong');
    });

    if (isCorrect) {
      game.streak += 1;
      const streakBonus = game.streak >= 3 ? 5 : 0;
      game.score += level.points + streakBonus;
      game.correctAtTier += 1;
      dom.feedback.textContent = streakBonus
        ? `Correct \u2014 +${level.points} points and a +${streakBonus} streak bonus.`
        : `Correct \u2014 +${level.points} points.`;
      dom.feedback.classList.add('correct');
      pushPunch('correct');
      maybeAdvanceTier();
    } else {
      game.streak = 0;
      game.correctAtTier = 0;
      dom.feedback.textContent = `Not quite \u2014 that was ${game.current.name}.`;
      dom.feedback.classList.add('wrong');
      pushPunch('wrong');
    }

    if (game.score > game.best) game.best = game.score;

    // Reveal the railway-history fact regardless of outcome.
    dom.historyFact.textContent = game.current.historyFact;
    dom.historyPanel.hidden = false;

    updateBoard();
    dom.nextBtn.disabled = false;
  }

  function maybeAdvanceTier() {
    if (game.correctAtTier >= ADVANCE_AFTER && game.levelIndex < LEVELS.length - 1) {
      game.levelIndex += 1;
      game.correctAtTier = 0;
      dom.feedback.textContent += ` Difficulty rises to ${currentLevel().label}.`;
    }
  }

  /* ------------------------------------------------------------------
     5. Hints \u2014 each costs points and can only be used once per question
     ------------------------------------------------------------------ */
  function spendHint(cost) {
    game.score = Math.max(0, game.score - cost);
    updateBoard();
  }

  dom.hintLocation.addEventListener('click', () => {
    if (game.answered || game.hintsUsed.has('location')) return;
    game.hintsUsed.add('location');
    spendHint(5);
    dom.locationClueText.textContent = game.current.locationClue;
    dom.hintLocation.disabled = true;
  });

  dom.hintEra.addEventListener('click', () => {
    if (game.answered || game.hintsUsed.has('era')) return;
    game.hintsUsed.add('era');
    spendHint(10);
    dom.hintEcho.textContent = game.current.yearFact;
    dom.hintEra.disabled = true;
  });

  dom.hintStyle.addEventListener('click', () => {
    if (game.answered || game.hintsUsed.has('style')) return;
    game.hintsUsed.add('style');
    spendHint(15);
    dom.hintEcho.textContent = game.current.styleFact;
    dom.hintStyle.disabled = true;
  });

  /* ------------------------------------------------------------------
     6. Controls
     ------------------------------------------------------------------ */
  dom.nextBtn.addEventListener('click', loadQuestion);

  dom.resetBtn.addEventListener('click', () => {
    game.levelIndex = 0;
    game.score = 0;
    game.streak = 0;
    game.correctAtTier = 0;
    game.ticketCount = 0;
    dom.punchTrack.innerHTML = '';
    updateBoard();
    loadQuestion();
  });

  /* ------------------------------------------------------------------
     7. Boot
     ------------------------------------------------------------------ */
  updateBoard();
  loadQuestion();
})();