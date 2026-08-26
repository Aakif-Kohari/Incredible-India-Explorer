/**
 * The 1999 Odisha Super Cyclone - Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeToggle.textContent = next === 'dark' ? '☀️ Light' : '🌙 Dark';
    });
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
      themeToggle.textContent = saved === 'dark' ? '☀️ Light' : '🌙 Dark';
    }
  }

  // 1. GAUGE ANIMATION
  const gaugeArc = document.getElementById('gaugeArc');
  const gaugeVal = document.getElementById('gaugeVal');
  const CIRC = 327;

  function animateGauge(start = 1005, end = 912, dur = 1800) {
    if (!gaugeArc || !gaugeVal) return;
    const t0 = performance.now();
    function step(t) {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(start - (start - end) * eased);
      gaugeVal.textContent = val;
      const frac = (start - val) / (start - end);
      gaugeArc.setAttribute('stroke-dashoffset', CIRC - CIRC * frac * 0.82);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  animateGauge();

  const resetGaugeBtn = document.getElementById('resetGaugeBtn');
  if (resetGaugeBtn) {
    resetGaugeBtn.addEventListener('click', () => animateGauge(1005, 912, 1800));
  }

  // 2. TIMELINE SLIDER
  const tlData = [
    {
      day: "21 – 24 October 1999",
      title: "A disturbance crosses the Malay Peninsula",
      body: "Convection first noted over the Sulu Sea in the western Pacific drifts westward across the Malay Peninsula and enters the Bay of Bengal, where exceptionally warm sea surface temperatures (~29-30°C) provide thermodynamic fuel."
    },
    {
      day: "25 October 1999",
      title: "Tropical Depression forms in Andaman Sea",
      body: "The system organizes into a tropical depression east of Port Blair. The India Meteorological Department (IMD) designates it BOB 06. Low vertical wind shear allows the vortex to rapidly intensify into a Cyclonic Storm by 26 October."
    },
    {
      day: "27 – 28 October 1999",
      title: "Explosive intensification to Super Cyclonic Storm",
      body: "In under 24 hours, central pressure collapses from 986 hPa to a historic 912 hPa with 260 km/h (160 mph) sustained 3-minute winds and gusts exceeding 300 km/h, making it the most intense cyclone in North Indian Ocean history."
    },
    {
      day: "29 October 1999 (Landfall)",
      title: "Landfall near Paradip and Ersama, Jagatsinghpur",
      body: "The eyewall strikes the Odisha coast between Paradip and Ersama at ~10:30 AM IST. A catastrophic storm surge of 5 to 8 metres inundates coastal plains up to 20–30 km inland, obliterating hundreds of villages."
    },
    {
      day: "30 – 31 October 1999",
      title: "Stationary vortex unleashes torrential downpours",
      body: "Trapped by upper-level steering ridges, the cyclone stalls along the coastal belt for over 36 hours. Over 400–950 mm of rain falls continuously, triggering epic flash floods in the Mahanadi, Baitarani, and Brahmani river basins."
    },
    {
      day: "1 – 4 November 1999",
      title: "Remnants drift offshore and dissipate",
      body: "The weakening system curves southward back over the Bay of Bengal before dissipating as a low-pressure area off Andhra Pradesh on 4 November, leaving behind total devastation and a nation resolved to rebuild."
    }
  ];

  const tlSlider = document.getElementById('tlSlider');
  const tlDay = document.getElementById('tlDay');
  const tlTitle = document.getElementById('tlTitle');
  const tlBody = document.getElementById('tlBody');
  const tlPrev = document.getElementById('tlPrev');
  const tlNext = document.getElementById('tlNext');

  function updateTimeline(index) {
    if (!tlSlider || !tlData[index]) return;
    tlSlider.value = index;
    tlDay.textContent = tlData[index].day;
    tlTitle.textContent = tlData[index].title;
    tlBody.textContent = tlData[index].body;
  }

  if (tlSlider) {
    tlSlider.addEventListener('input', (e) => updateTimeline(parseInt(e.target.value, 10)));
  }
  if (tlPrev) {
    tlPrev.addEventListener('click', () => {
      const cur = parseInt(tlSlider.value, 10);
      if (cur > 0) updateTimeline(cur - 1);
    });
  }
  if (tlNext) {
    tlNext.addEventListener('click', () => {
      const cur = parseInt(tlSlider.value, 10);
      if (cur < tlData.length - 1) updateTimeline(cur + 1);
    });
  }

  // 3. DISTRICT INTERACTIVE MAP
  const districtData = {
    jagatsinghpur: {
      name: "Jagatsinghpur (Epicenter)",
      badge: "Landfall Zone · Peak Surge 5–8m",
      fact: "The Ersama and Balikuda blocks took the direct hit from a 5–8m tidal surge that penetrated 25 km inland. Over 8,000 deaths occurred in this district alone, with tens of thousands of livestock lost.",
      fatalities: "8,119+",
      surge: "5.0 – 8.0 m"
    },
    kendrapara: {
      name: "Kendrapara",
      badge: "Severe Surge & Estuarine Floods",
      fact: "Suffered catastrophic saline flooding from the Mahanadi and Brahmani deltas. Mangrove forests in Bhitarkanika provided a natural barrier that blunted surge velocity in protected pockets.",
      fatalities: "466+",
      surge: "3.5 – 5.0 m"
    },
    puri: {
      name: "Puri",
      badge: "Coastal Surge & Wind Ingress",
      fact: "Heavy storm surge inundated coastal tourist infrastructure and fishing hamlets. Extensive power grid and telecom annihilation left Puri temple city isolated for days.",
      fatalities: "300+",
      surge: "2.5 – 4.0 m"
    },
    bhadrak: {
      name: "Bhadrak",
      badge: "Riverine Flooding & Crop Loss",
      fact: "Intense river surges pushed saline waters up agricultural channels, destroying 90% of standing winter paddy crops across Chandbali and Dhamra blocks.",
      fatalities: "400+",
      surge: "2.5 – 4.0 m"
    },
    balasore: {
      name: "Balasore",
      badge: "Northern Outer Bands",
      fact: "Experienced gale-force winds of 180+ km/h and massive flash flooding as the Subarnarekha and Budhabalanga rivers overflowed into residential sectors.",
      fatalities: "200+",
      surge: "2.0 – 3.0 m"
    },
    cuttack: {
      name: "Cuttack",
      badge: "Inland Structural Collapse",
      fact: "Severe inland wind damage unroofed thousands of asbestos and tile homes, toppled 220kV power transmission towers, and flooded historic Barabati fort grounds.",
      fatalities: "470+",
      surge: "1.5 – 2.5 m (Riverine)"
    },
    ganjam: {
      name: "Ganjam",
      badge: "Southern Coast Periphery",
      fact: "Hit by the outer vortex core with high seas and torrential rain. Though less severe than earlier storms, the coastal port of Gopalpur recorded heavy beach erosion.",
      fatalities: "100+",
      surge: "1.5 – 2.0 m"
    }
  };

  const mapPanel = document.getElementById('mapPanel');
  const districtDots = document.querySelectorAll('.district-dot');

  districtDots.forEach(dot => {
    dot.addEventListener('click', () => {
      districtDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const dKey = dot.getAttribute('data-d');
      const info = districtData[dKey];
      if (info && mapPanel) {
        mapPanel.innerHTML = `
          <div class="name">${info.name}</div>
          <span class="badge">${info.badge}</span>
          <p class="fact">${info.fact}</p>
          <div class="stat-pill">
            <div>Fatalities: <b>${info.fatalities}</b></div>
            <div>Surge: <b>${info.surge}</b></div>
          </div>
          <p class="map-hint">Click any marker to inspect other affected coastal districts.</p>
        `;
      }
    });
  });

  // 4. METEOROLOGY ANATOMY TABS
  const anatomyData = {
    eye: {
      title: "The Calm Eye (Diameter: ~25–30 km)",
      desc: "A central region of clear skies, light subsiding winds (<25 km/h), and record-low atmospheric pressure (912 hPa). When the eye passed over Paradip, residents experienced deceptive calm for ~30 minutes before the violent rear eyewall hit with reverse wind direction.",
      m1: "Diameter: ~25 km",
      m2: "Pressure: 912 hPa",
      m3: "Vertical Motion: Subsidence"
    },
    eyewall: {
      title: "The Eyewall (Core of Destruction)",
      desc: "A ring of towering cumulonimbus clouds surrounding the eye containing the storm's most catastrophic 260 km/h 3-minute sustained winds with gusts above 300 km/h. Eyewall mesovortices generated localized tornado-like microbursts that snapped concrete pillars.",
      m1: "Sustained: 260 km/h",
      m2: "Max Gusts: 300+ km/h",
      m3: "Cloud Heights: >17 km"
    },
    rainbands: {
      title: "Spiral Rainbands & Feeder Bands",
      desc: "Curved bands of thunderstorm cells spiraling inward across hundreds of kilometers. These bands dumped 400–950 mm of rain over 48 hours, creating widespread inland inundation and washing away embankments, roads, and rail tracks.",
      m1: "Rainfall: 400–950 mm",
      m2: "Span: 600+ km",
      m3: "Duration: 36+ hrs"
    },
    engine: {
      title: "Warm Sea Surface Temperature & Outflow Engine",
      desc: "The Bay of Bengal sea surface temperatures hovered between 29°C and 30°C with deep oceanic heat content. Coupled with low vertical wind shear (<10 knots) and strong upper-tropospheric radial outflow, the tropical cyclone explosive intensification was rapid.",
      m1: "SST: 29–30°C",
      m2: "Wind Shear: <10 knots",
      m3: "Basin: Bay of Bengal"
    }
  };

  const anatomyTabs = document.querySelectorAll('.anatomy-tab-btn');
  const anatomyTitle = document.getElementById('anatomyTitle');
  const anatomyDesc = document.getElementById('anatomyDesc');
  const anatomyM1 = document.getElementById('anatomyM1');
  const anatomyM2 = document.getElementById('anatomyM2');
  const anatomyM3 = document.getElementById('anatomyM3');

  anatomyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      anatomyTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabKey = tab.getAttribute('data-tab');
      const data = anatomyData[tabKey];
      if (data) {
        anatomyTitle.textContent = data.title;
        anatomyDesc.textContent = data.desc;
        anatomyM1.textContent = data.m1;
        anatomyM2.textContent = data.m2;
        anatomyM3.textContent = data.m3;
      }
    });
  });

  // 5. STORM SURGE SIMULATOR
  const surgeData = {
    "1": {
      heightPct: "20%",
      label: "1.5m High Tide Surge",
      desc: "Beachfront erosion, flooding of low-lying fish ponds, and wave overtopping along open sandy beaches."
    },
    "3": {
      heightPct: "45%",
      label: "3.5m Severe Surge",
      desc: "Breaching of village dykes and earthen roads. Salinization of coastal soil up to 5 km inland."
    },
    "5": {
      heightPct: "70%",
      label: "5.5m Extreme Surge (1999 Average)",
      desc: "Overtopping of 4m saline embankments. Complete destruction of non-engineered homes and inundation of 15 km inland."
    },
    "8": {
      heightPct: "95%",
      label: "8.0m Peak Super Surge (Ersama / Paradip)",
      desc: "Catastrophic wall of seawater sweeping 25–30 km inland. Uprooted reinforced concrete buildings, obliterated thousands of villages, and deposited marine sediment over 1.8 million hectares of cropland."
    }
  };

  const surgeBtns = document.querySelectorAll('.surge-btn');
  const surgeWater = document.getElementById('surgeWater');
  const surgeDesc = document.getElementById('surgeDesc');

  surgeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      surgeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const level = btn.getAttribute('data-surge');
      const s = surgeData[level];
      if (s && surgeWater && surgeDesc) {
        surgeWater.style.height = s.heightPct;
        surgeWater.textContent = s.label;
        surgeDesc.textContent = s.desc;
      }
    });
  });

  // 6. ACCORDION
  const accHeads = document.querySelectorAll('.acc-head');
  accHeads.forEach(head => {
    head.addEventListener('click', () => {
      const item = head.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // 7. INTERSECTION OBSERVER FOR BARS
  const bars = document.querySelectorAll('.bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        bars.forEach(b => {
          b.style.width = (parseFloat(b.dataset.w)) + '%';
        });
        barObserver.disconnect();
      }
    });
  }, { threshold: 0.25 });

  const compareSection = document.getElementById('compare');
  if (compareSection) {
    barObserver.observe(compareSection);
  }

  // 8. INTERACTIVE QUIZ
  const quizQuestions = [
    {
      q: "1. What was the lowest recorded central barometric pressure of the 1999 Odisha Super Cyclone?",
      options: ["940 hPa", "912 hPa", "885 hPa", "965 hPa"],
      correct: 1,
      exp: "Central pressure plunged to 912 hPa on 28 October 1999, which remains the lowest central pressure ever officially recorded in the North Indian Ocean basin."
    },
    {
      q: "2. Which block in Jagatsinghpur district suffered the most catastrophic casualties from the 5–8m storm surge?",
      options: ["Ersama block", "Chandbali block", "Gopalpur block", "Konark block"],
      correct: 0,
      exp: "Ersama block near Paradip suffered over 7,000 deaths as a massive wall of seawater penetrated up to 25 km inland across flat delta terrain."
    },
    {
      q: "3. What dedicated state authority was established in December 1999 as India's first disaster management body?",
      options: ["NDRF", "OSDMA (Odisha State Disaster Management Authority)", "IMD Rapid Response", "NIDM"],
      correct: 1,
      exp: "OSDMA was formed in December 1999, pioneering institutional disaster management years before India passed the national Disaster Management Act in 2005."
    },
    {
      q: "4. By how much did Odisha expand its network of permanent cyclone shelters between 1999 and modern times?",
      options: ["From 5 to 50", "From 23 to over 870+", "From 100 to 200", "No change"],
      correct: 1,
      exp: "Odisha grew its shelter network from only 23 shelters in 1999 to over 879 multi-purpose, elevated cyclone shelters equipped with emergency power and helipads."
    }
  ];

  let currentScore = 0;
  let answeredCount = 0;

  function renderQuiz() {
    const quizContainer = document.getElementById('quizQuestionsContainer');
    if (!quizContainer) return;
    quizContainer.innerHTML = '';
    currentScore = 0;
    answeredCount = 0;
    updateQuizScore();

    quizQuestions.forEach((qObj, qIdx) => {
      const card = document.createElement('div');
      card.className = 'quiz-question-card';
      card.id = `quizCard_${qIdx}`;

      const qTitle = document.createElement('div');
      qTitle.className = 'quiz-q-text';
      qTitle.textContent = qObj.q;
      card.appendChild(qTitle);

      const optsDiv = document.createElement('div');
      optsDiv.className = 'quiz-options';

      qObj.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn';
        btn.textContent = optText;
        btn.setAttribute('type', 'button');
        btn.addEventListener('click', () => handleOptionClick(qIdx, optIdx, btn, optsDiv));
        optsDiv.appendChild(btn);
      });

      card.appendChild(optsDiv);

      const feedback = document.createElement('div');
      feedback.className = 'quiz-feedback';
      feedback.id = `quizFeedback_${qIdx}`;
      card.appendChild(feedback);

      quizContainer.appendChild(card);
    });
  }

  function handleOptionClick(qIdx, selectedIdx, clickedBtn, optsDiv) {
    const qObj = quizQuestions[qIdx];
    const allBtns = optsDiv.querySelectorAll('.quiz-opt-btn');
    allBtns.forEach(b => b.disabled = true);

    const feedback = document.getElementById(`quizFeedback_${qIdx}`);
    answeredCount++;

    if (selectedIdx === qObj.correct) {
      clickedBtn.classList.add('correct');
      currentScore++;
      if (feedback) {
        feedback.className = 'quiz-feedback show correct';
        feedback.innerHTML = `<b>✓ Correct!</b> ${qObj.exp}`;
      }
    } else {
      clickedBtn.classList.add('wrong');
      allBtns[qObj.correct].classList.add('correct');
      if (feedback) {
        feedback.className = 'quiz-feedback show wrong';
        feedback.innerHTML = `<b>✗ Incorrect.</b> ${qObj.exp}`;
      }
    }
    updateQuizScore();
  }

  function updateQuizScore() {
    const scoreBadge = document.getElementById('quizScoreBadge');
    if (scoreBadge) {
      scoreBadge.textContent = `Score: ${currentScore} / ${quizQuestions.length} completed (${answeredCount}/${quizQuestions.length})`;
    }
  }

  const resetQuizBtn = document.getElementById('resetQuizBtn');
  if (resetQuizBtn) {
    resetQuizBtn.addEventListener('click', renderQuiz);
  }

  renderQuiz();
});
