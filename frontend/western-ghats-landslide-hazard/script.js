/**
 * Western Ghats Landslide Hazard Profile - Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
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

  // Hero Rain drops
  const rainGroup = document.getElementById('rainGroup');
  if (rainGroup) {
    const n = 26;
    for (let i = 0; i < n; i++) {
      const x = Math.random() * 1200;
      const delay = Math.random() * 3;
      const dur = 1.1 + Math.random() * 1.3;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x);
      line.setAttribute('x2', x - 6);
      line.setAttribute('y1', 0);
      line.setAttribute('y2', 16);
      line.setAttribute('stroke', '#A9C0C7');
      line.setAttribute('stroke-width', '1.4');
      line.setAttribute('class', 'rain-drop');
      line.style.animationDuration = dur + 's';
      line.style.animationDelay = delay + 's';
      rainGroup.appendChild(line);
    }
  }

  // Cross-section interactivity
  const layerData = {
    topsoil: {
      tag: 'Topsoil & roots',
      title: 'A thin living skin',
      text: 'Forest and plantation roots bind a shallow organic layer to the slope. It is rarely more than a metre deep — nowhere near enough to anchor what lies beneath it.'
    },
    laterite: {
      tag: 'Laterite crust',
      title: 'Porous — and the usual failure line',
      text: 'Millions of years of tropical weathering built an iron-rich, porous laterite crust. Water moves through it easily but struggles to pass the denser layer below, so pore pressure builds right at this boundary.'
    },
    saprolite: {
      tag: 'Saprolite',
      title: 'Weakened parent rock',
      text: 'Chemically rotted bedrock that still looks like rock but behaves like soil. It holds water poorly and loses shear strength fast once saturated, especially where it meets the laterite above.'
    },
    bedrock: {
      tag: 'Jointed bedrock',
      title: 'The strong part, cut by weak lines',
      text: 'Basalt or gneiss bedrock is mechanically strong, but vertical cooling joints and tectonic fractures channel water deep into the mountain and define where deeper slip surfaces break away.'
    }
  };

  window.showLayer = function(key) {
    const d = layerData[key];
    if (!d) return;
    const panel = document.getElementById('layerInfo');
    if (panel) {
      panel.innerHTML = `<div class="tag">${d.tag}</div><h4>${d.title}</h4><p>${d.text}</p>`;
    }
    document.querySelectorAll('.layer-btn').forEach(el => el.classList.remove('active-layer'));
    const target = document.querySelector(`.layer-btn[data-layer="${key}"]`);
    if (target) target.classList.add('active-layer');
  };

  window.setSeason = function(mode) {
    const btnDry = document.getElementById('btnDry');
    const btnWet = document.getElementById('btnWet');
    if (btnDry && btnWet) {
      btnDry.classList.toggle('active', mode === 'dry');
      btnWet.classList.toggle('active', mode === 'wet');
    }
    const arrows = document.getElementById('arrows');
    const water = document.getElementById('waterfill');
    const failblock = document.getElementById('failblock');
    const blockPath = failblock ? failblock.querySelector('path') : null;

    if (mode === 'wet') {
      if (arrows) arrows.style.opacity = 1;
      if (water) water.style.opacity = 0.85;
      if (blockPath) blockPath.style.opacity = 0.92;
      if (failblock) failblock.setAttribute('transform', 'translate(90,55)');
    } else {
      if (arrows) arrows.style.opacity = 0;
      if (water) water.style.opacity = 0;
      if (blockPath) blockPath.style.opacity = 0;
      if (failblock) failblock.setAttribute('transform', 'translate(0,0)');
    }
  };

  // Rainfall bar chart
  const rainData = [
    { m: 'Jun', wind: 1450, lee: 120 },
    { m: 'Jul', wind: 2050, lee: 160 },
    { m: 'Aug', wind: 1600, lee: 140 },
    { m: 'Sep', wind: 900, lee: 110 },
    { m: 'Oct', wind: 400, lee: 90 }
  ];

  const wrap = document.getElementById('rainBars');
  if (wrap) {
    const maxV = Math.max(...rainData.map(d => d.wind));
    wrap.innerHTML = '';
    rainData.forEach(d => {
      const grp = document.createElement('div');
      grp.className = 'bargroup';
      const b1 = document.createElement('div');
      b1.className = 'bar wind';
      b1.style.height = (d.wind / maxV * 100) + '%';
      b1.innerHTML = `<span class="val">${d.wind} mm</span>`;
      const b2 = document.createElement('div');
      b2.className = 'bar lee';
      b2.style.height = (d.lee / maxV * 100) + '%';
      b2.innerHTML = `<span class="val">${d.lee} mm</span>`;
      grp.appendChild(b1);
      grp.appendChild(b2);
      wrap.appendChild(grp);
    });
  }

  // Interactive ridge map
  const pinData = {
    raigad: {
      name: 'Raigad',
      state: 'Maharashtra',
      text: 'Site of the July 2023 Irshalwadi disaster — a bifurcated debris flow on a slope with no visible prior warning signs, on the Deccan Trap basalt–laterite contact.',
      s1: ['Lives lost', '27+'],
      s2: ['Rock type', 'Basalt']
    },
    konkan: {
      name: 'Satara & Ratnagiri',
      state: 'Maharashtra',
      text: 'Chronic monsoon slope failures along the Konkan coast and the Mumbai–Goa highway corridor, repeated across multiple monsoon seasons on steep basalt scarps.',
      s1: ['Corridor', 'Konkan coast'],
      s2: ['Rock type', 'Basalt']
    },
    kodagu: {
      name: 'Kodagu, Chikkamagaluru & Uttara Kannada',
      state: 'Karnataka',
      text: 'A 2026 six-district susceptibility study found these three districts held the highest share of highly susceptible zones in the state; Kodagu saw widespread slides in the extreme 2018 monsoon.',
      s1: ['Study year', '2026'],
      s2: ['Rock type', 'Gneiss']
    },
    wayanad: {
      name: 'Wayanad',
      state: 'Kerala',
      text: 'Puthumala (2019) erased an entire village; the catastrophic Mundakkai–Chooralmala disaster of 30 July 2024 followed roughly 570 mm of rain in 48 hours, striking tea-estate settlements before dawn.',
      s1: ['Lives lost, 2024', '~420'],
      s2: ['Rainfall, 48 h', '570 mm']
    },
    idukki: {
      name: 'Idukki',
      state: 'Kerala',
      text: 'The Pettimudi disaster of August 2020 tore a 1,200 m scar through Shola forest and tea plantation, killing estate workers. Now home to the real-time SLIP-K early-warning pilot.',
      s1: ['Scar length', '1,200 m'],
      s2: ['EWS pilot', 'SLIP-K']
    },
    malappuram: {
      name: 'Malappuram & Kozhikode',
      state: 'Kerala',
      text: 'The Kavalappara slide of 2019 and repeated failures elsewhere are linked to forest fragmentation and land-use change eating into steep, thinly-forested slopes.',
      s1: ['Key event', 'Kavalappara, 2019'],
      s2: ['Driver', 'Land-use change']
    },
    nilgiris: {
      name: 'Nilgiris',
      state: 'Tamil Nadu',
      text: "Chosen alongside Darjeeling as one of India's first pilot districts for GSI's regional Landslide Early Warning System, developed with the British Geological Survey.",
      s1: ['EWS role', 'National pilot'],
      s2: ['Partner', 'GSI + BGS']
    }
  };

  window.showPin = function(id) {
    const d = pinData[id];
    if (!d) return;
    const panel = document.getElementById('mapPanel');
    if (panel) {
      panel.innerHTML = `<div class="tag">${d.state}</div><h4>${d.name}</h4><p>${d.text}</p>
        <div class="stat-row">
          <div>${d.s1[0]}<b>${d.s1[1]}</b></div>
          <div>${d.s2[0]}<b>${d.s2[1]}</b></div>
        </div>`;
    }
    document.querySelectorAll('.pin').forEach(p => p.classList.remove('active'));
    const targetPin = document.querySelector(`.pin[data-id="${id}"]`);
    if (targetPin) targetPin.classList.add('active');
  };

  // Nav active state on scroll
  const navLinks = document.querySelectorAll('.navlinks a');
  const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href')));
  function updateNav() {
    let idx = 0;
    const y = window.scrollY + 120;
    sections.forEach((s, i) => { if (s && s.offsetTop <= y) idx = i; });
    navLinks.forEach((a, i) => a.classList.toggle('active', i === idx));
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Quiz
  const quizQuestions = [
    {
      q: "1. Where do most slope failures in the Western Ghats initiate geologically?",
      options: [
        "Along the laterite–saprolite boundary interface under high pore pressure",
        "Inside solid, unweathered granite core",
        "At sea level within coastal sand dunes",
        "Exclusively on flat plateaus"
      ],
      correct: 0,
      exp: "Porous laterite crust allows rain to infiltrate quickly, but water pools at the denser, less permeable saprolite boundary, building high pore pressure that triggers debris flows."
    },
    {
      q: "2. What meteorological condition triggered the July 2024 Wayanad landslide disaster?",
      options: [
        "Roughly 570 mm of extreme rainfall in 48 hours",
        "A tropical cyclone making direct landfall in Wayanad",
        "A major 7.5 magnitude earthquake",
        "Prolonged drought causing soil desiccation"
      ],
      correct: 0,
      exp: "An extreme orographic burst dumped approximately 570 mm of rain over 48 hours onto saturated slopes in Wayanad, triggering catastrophic multi-stage debris flows."
    },
    {
      q: "3. Which agency serves as India's nodal body for landslide investigation and early-warning forecasting?",
      options: [
        "Geological Survey of India (GSI)",
        "Indian Space Research Organisation (ISRO) exclusively",
        "Central Water Commission (CWC)",
        "National Highways Authority of India (NHAI)"
      ],
      correct: 0,
      exp: "GSI was designated as India's nodal agency for landslide hazard zonation, monitoring, and forecasting by the Government of India in 2004."
    },
    {
      q: "4. Why does replacing native Shola forest with monoculture tea/rubber plantations increase landslide susceptibility?",
      options: [
        "Reduces root cohesion and canopy rainfall interception",
        "Makes the underlying basalt rock melt",
        "Stops groundwater from forming",
        "Increases earthquake frequency"
      ],
      correct: 0,
      exp: "Shola forests and deep root mats absorb and slow heavy rain infiltration; commercial plantations have shallow root systems and artificial terraces that concentrate surface runoff."
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
      const box = document.createElement('div');
      box.className = 'quiz-q-card';

      const title = document.createElement('div');
      title.className = 'quiz-q-title';
      title.textContent = qObj.q;
      box.appendChild(title);

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

      box.appendChild(optsDiv);

      const fb = document.createElement('div');
      fb.className = 'quiz-fb';
      fb.id = `quizFb_${qIdx}`;
      box.appendChild(fb);

      quizContainer.appendChild(box);
    });
  }

  function handleOptionClick(qIdx, selectedIdx, clickedBtn, optsDiv) {
    const qObj = quizQuestions[qIdx];
    const allBtns = optsDiv.querySelectorAll('.quiz-opt-btn');
    allBtns.forEach(b => b.disabled = true);

    const fb = document.getElementById(`quizFb_${qIdx}`);
    answeredCount++;

    if (selectedIdx === qObj.correct) {
      clickedBtn.classList.add('correct');
      currentScore++;
      if (fb) {
        fb.className = 'quiz-fb show correct';
        fb.innerHTML = `<b>✓ Correct!</b> ${qObj.exp}`;
      }
    } else {
      clickedBtn.classList.add('wrong');
      allBtns[qObj.correct].classList.add('correct');
      if (fb) {
        fb.className = 'quiz-fb show wrong';
        fb.innerHTML = `<b>✗ Incorrect.</b> ${qObj.exp}`;
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
