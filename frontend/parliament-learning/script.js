(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     STATE
     ═══════════════════════════════════════════ */
  let cur = 1, vis = new Set(), total = 8;
  let wfTimer = null, wfIdx = -1;

  /* ═══════════════════════════════════════════
     NAV STEPS
     ═══════════════════════════════════════════ */
  const labels = ['Overview','Lok Sabha','Rajya Sabha','Key Roles','Sessions','Bill → Act','Workflow','Quiz'];

  function buildStepper() {
    const c = document.getElementById('nav-steps');
    c.innerHTML = '';
    labels.forEach((l, i) => {
      const b = document.createElement('button');
      b.className = 'pb-ns' + (i + 1 === cur ? ' on' : '') + (vis.has(i + 1) && i + 1 !== cur ? ' visited' : '');
      b.textContent = (i + 1) + '. ' + l;
      b.onclick = () => go(i + 1);
      c.appendChild(b);
    });
  }

  function go(n) {
    if (n < 1 || n > total) return;
    document.getElementById('s' + cur).classList.remove('active');
    vis.add(cur);
    cur = n;
    document.getElementById('s' + cur).classList.add('active');
    buildStepper();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (n === 7) initWorkflow();
    triggerRevealAnimations();
  }

  function bindNavBtns() {
    document.querySelectorAll('[data-go]').forEach(b => {
      b.addEventListener('click', () => go(+b.dataset.go));
    });
  }

  /* ═══════════════════════════════════════════
     SCROLL REVEAL (IntersectionObserver)
     ═══════════════════════════════════════════ */
  function triggerRevealAnimations() {
    const els = document.querySelectorAll('.pb-s.active .pb-card, .pb-s.active .pb-h2, .pb-s.active .pb-p, .pb-s.active .pb-fact');
    els.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'none';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    });
  }

  /* ═══════════════════════════════════════════
     PARTICLES
     ═══════════════════════════════════════════ */
  function buildParticles() {
    const c = document.getElementById('particles');
    c.innerHTML = '';
    const colors = ['#ff9933', '#138808', '#c9a04c', '#56b4d3'];
    for (let i = 0; i < 35; i++) {
      const s = document.createElement('span');
      const sz = 2 + Math.random() * 4;
      s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${60+Math.random()*40}%;background:${colors[i%4]};animation-duration:${8+Math.random()*12}s;animation-delay:${Math.random()*10}s;opacity:${0.15+Math.random()*0.35}`;
      c.appendChild(s);
    }
  }

  /* ═══════════════════════════════════════════
     PARLIAMENT BUILDING (CSS ART — generated columns)
     ═══════════════════════════════════════════ */
  function buildParliament() {
    // Main colonnade columns
    const colDiv = document.getElementById('pb-colonade');
    if (colDiv) {
      colDiv.innerHTML = '';
      for (let i = 0; i < 18; i++) {
        const c = document.createElement('div');
        c.className = 'pb-col';
        c.style.animationDelay = (i * 0.04) + 's';
        c.style.animation = `colReveal 0.6s ease-out ${i * 0.04}s forwards`;
        c.style.opacity = '0';
        colDiv.appendChild(c);
      }
    }

    // Wing columns
    ['pb-wing-l-cols', 'pb-wing-r-cols'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = '';
      for (let i = 0; i < 10; i++) {
        const c = document.createElement('div');
        c.className = 'pb-wing-col';
        c.style.left = (8 + i * 16) + 'px';
        c.style.opacity = '0';
        c.style.animation = `colReveal 0.4s ease-out ${0.3 + i * 0.03}s forwards`;
        el.appendChild(c);
      }
    });

    // Inject keyframes
    if (!document.getElementById('pb-extra-frames')) {
      const s = document.createElement('style');
      s.id = 'pb-extra-frames';
      s.textContent = `
        @keyframes colReveal { from { opacity:0; transform: scaleY(0.3); } to { opacity:1; transform: scaleY(1); } }
        @keyframes lineFill { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes dotPop { from { transform: scale(0); opacity:0; } to { transform: scale(1); opacity:1; } }
        @keyframes infoSlide { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }
      `;
      document.head.appendChild(s);
    }
  }

  /* ═══════════════════════════════════════════
     INDIA MAP (real paths from data.js)
     ═══════════════════════════════════════════ */
  const RS = { 'Andhra Pradesh':25,'Arunachal Pradesh':1,'Assam':7,'Bihar':16,'Chhattisgarh':5,'Goa':1,'Gujarat':11,'Haryana':5,'Himachal Pradesh':3,'Jharkhand':6,'Karnataka':12,'Kerala':9,'Madhya Pradesh':11,'Maharashtra':19,'Manipur':1,'Meghalaya':1,'Mizoram':1,'Nagaland':1,'Odisha':10,'Punjab':7,'Rajasthan':10,'Sikkim':1,'Tamil Nadu':18,'Telangana':9,'Tripura':1,'Uttar Pradesh':31,'Uttarakhand':3,'West Bengal':16,'Delhi':3,'Jammu and Kashmir':4,'Ladakh':1,'Puducherry':1,'Chandigarh':1,'Andaman & Nicobar Islands':1,'Dadra & Nagar Haveli and Daman & Diu':1,'Lakshadweep':1 };

  function seatColor(n) {
    if (n >= 20) return '#ff6b35';
    if (n >= 10) return '#ff9933';
    if (n >= 5) return '#ffb86c';
    if (n > 0) return 'rgba(255,255,255,0.18)';
    return 'rgba(255,255,255,0.06)';
  }

  function seatTier(n) {
    if (n >= 20) return 'high';
    if (n >= 10) return 'med';
    if (n >= 5) return 'low';
    if (n > 0) return 'min';
    return 'zero';
  }

  function seatFact(n) {
    if (n >= 20) return 'Major state with significant parliamentary influence.';
    if (n >= 10) return 'Strong representation in the Rajya Sabha.';
    if (n >= 5) return 'Moderate representation in the upper house.';
    if (n > 0) return 'Minimal representation in the Rajya Sabha.';
    return 'No direct Rajya Sabha seats.';
  }

  function buildIndiaMap() {
    const svg = document.getElementById('india-map');
    if (!svg || typeof mapData === 'undefined') return;
    svg.innerHTML = '';
    const tip = document.getElementById('map-tip');
    const tipName = document.getElementById('mtt-name');
    const tipSeats = document.getElementById('mtt-seats');
    const tipFact = document.getElementById('mtt-fact');
    const grid = document.getElementById('seats-grid');
    if (grid) grid.innerHTML = '';

    const locs = mapData.locations || [];

    locs.forEach(loc => {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', loc.path);
      p.setAttribute('data-id', loc.id);
      const name = loc.name;
      const seats = RS[name] || 0;
      p.setAttribute('fill', seatColor(seats));
      p.setAttribute('stroke', 'rgba(255,255,255,0.12)');
      p.setAttribute('stroke-width', '0.5');

      p.addEventListener('mouseenter', (e) => {
        p.setAttribute('filter', 'brightness(1.5)');
        p.setAttribute('stroke', '#ff9933');
        p.setAttribute('stroke-width', '1.2');
        tipName.textContent = name;
        tipSeats.textContent = seats + ' RS seat' + (seats !== 1 ? 's' : '');
        tipFact.textContent = seatFact(seats);
        tip.classList.add('vis');
        // Cross-highlight grid
        document.querySelectorAll('.pb-seat').forEach(s => {
          if (s.dataset.name === name) s.classList.add('hl');
        });
      });
      p.addEventListener('mouseleave', () => {
        p.removeAttribute('filter');
        p.setAttribute('stroke', 'rgba(255,255,255,0.12)');
        p.setAttribute('stroke-width', '0.5');
        tip.classList.remove('vis');
        document.querySelectorAll('.pb-seat.hl').forEach(s => s.classList.remove('hl'));
      });
      svg.appendChild(p);

      // Seats grid
      if (grid) {
        const d = document.createElement('div');
        d.className = 'pb-seat';
        d.dataset.name = name;
        d.dataset.tier = seatTier(seats);
        d.title = name + ' — ' + seats + ' RS seat' + (seats !== 1 ? 's' : '');
        d.innerHTML = `<span class="sn">${seats}</span><span class="sa">${name}</span>`;
        d.addEventListener('mouseenter', () => {
          p.setAttribute('filter', 'brightness(1.5)');
          p.setAttribute('stroke', '#ff9933');
          p.setAttribute('stroke-width', '1.2');
          tipName.textContent = name;
          tipSeats.textContent = seats + ' RS seat' + (seats !== 1 ? 's' : '');
          tipFact.textContent = seatFact(seats);
          tip.classList.add('vis');
        });
        d.addEventListener('mouseleave', () => {
          p.removeAttribute('filter');
          p.setAttribute('stroke', 'rgba(255,255,255,0.12)');
          p.setAttribute('stroke-width', '0.5');
          tip.classList.remove('vis');
        });
        grid.appendChild(d);
      }
    });
  }

  /* ═══════════════════════════════════════════
     BILL → ACT VERTICAL TIMELINE
     ═══════════════════════════════════════════ */
  const billSteps = {
    ordinary: [
      { title: 'Introduction', desc: 'Bill introduced in either House by a Minister or Private Member. Read the first time; no discussion.' },
      { title: 'Second Reading', desc: 'Bill published in Gazette. General discussion, clause-by-clause consideration, and amendments.' },
      { title: 'Third Reading', desc: 'Debate on the motion that the bill be passed. Division if demanded. Bill passed by majority.' },
      { title: 'Other House', desc: 'Bill sent to second House. May pass, reject, or amend it. If rejected, President may summon joint sitting.' },
      { title: 'Joint Sitting (if needed)', desc: 'Presided by Lok Sabha Speaker. Simple majority decides. Bill passed by joint sitting is sent to President.' },
      { title: 'Presidential Assent', desc: 'President may give assent, withhold assent, or return for reconsideration (not for joint-sitting bills). Becomes an Act.' },
    ],
    money: [
      { title: 'Money Bill Introduced', desc: 'Only in Lok Sabha, and only with President\'s recommendation. Minister introduces the bill.' },
      { title: 'Lok Sabha Debate', desc: 'Budget discussion, Demands for Grants, voting. Bill passed by Lok Sabha.' },
      { title: 'Rajya Sabha Review', desc: 'Rajya Sabha can only recommend changes within 14 days. Lok Sabha may accept or reject them.' },
      { title: 'Presidential Assent', desc: 'President gives assent. Rajya Sabha has no power to reject — only delay.' },
    ],
    constitutional: [
      { title: 'Introduction', desc: 'Bill introduced in either House. Requires special majority: majority of total membership + 2/3 of members present and voting.' },
      { title: 'Committee Stage', desc: 'Referred to Select/Joint Committee for detailed examination and report.' },
      { title: 'Passage by Parliament', desc: 'Both Houses pass by special majority. If Houses disagree, no joint sitting — bill lapses.' },
      { title: 'Ratification by States', desc: 'If bill affects federal structure, ratification by legislatures of at least half the states required.' },
      { title: 'Presidential Assent', desc: 'President gives assent. No provision for withholding or returning Constitutional Amendment Bills.' },
    ]
  };

  function buildBillTimeline(type) {
    const vtl = document.getElementById('bill-vtl');
    const detail = document.getElementById('bill-detail');
    if (!vtl) return;
    vtl.innerHTML = '';
    const steps = billSteps[type] || billSteps.ordinary;
    steps.forEach((s, i) => {
      const d = document.createElement('div');
      d.className = 'vt-step';
      d.dataset.num = i + 1;
      d.innerHTML = `<h4>${s.title}</h4><p>${s.desc.slice(0, 60)}…</p>`;
      d.addEventListener('click', () => {
        document.querySelectorAll('.vt-step').forEach(el => el.classList.remove('active'));
        d.classList.add('active');
        detail.innerHTML = `<h3>${s.title}</h3><p>${s.desc}</p>`;
        detail.style.animation = 'infoSlide 0.3s ease-out';
        setTimeout(() => detail.style.animation = '', 400);
      });
      vtl.appendChild(d);
    });
  }

  function bindBillTabs() {
    document.querySelectorAll('.pb-tab').forEach(t => {
      t.addEventListener('click', () => {
        document.querySelectorAll('.pb-tab').forEach(b => b.classList.remove('active'));
        t.classList.add('active');
        buildBillTimeline(t.dataset.type);
      });
    });
  }

  /* ═══════════════════════════════════════════
     WORKFLOW (VERTICAL ANIMATED)
     ═══════════════════════════════════════════ */
  const wfSteps = [
    { icon: '💡', title: 'Idea & Drafting', desc: 'Government departments, Law Commission, or individual MPs draft the bill. Public consultation may occur.' },
    { icon: '📋', title: 'Cabinet Approval', desc: 'Union Cabinet examines and approves the bill before introduction. Policy rationale and legislative competence reviewed.' },
    { icon: '🏛️', title: 'Introduction in Parliament', desc: 'Bill introduced in Lok Sabha or Rajya Sabha. Numbered and published in the Gazette of India.' },
    { icon: '🔍', title: 'Committee Examination', desc: 'Referred to Select or Joint Committee for detailed clause-by-clause scrutiny. Report with recommendations submitted.' },
    { icon: '🗳️', title: 'Debate & Voting', desc: 'General discussion, clause-by-clause consideration, amendments debated, and final vote in each House.' },
    { icon: '🤝', title: 'Second House & Joint Sitting', desc: 'Sent to other House for approval. If disagreement persists, President may call a joint sitting.' },
    { icon: '✍️', title: 'Presidential Assent', desc: 'President reviews and gives assent. Bill becomes an Act of Parliament and is published.' },
    { icon: '⚖️', title: 'Implementation', desc: 'Rules framed under the Act. Executive notifies provisions. Enforcement begins across the country.' },
  ];

  function buildWorkflow() {
    const c = document.getElementById('pb-vwf');
    if (!c) return;
    c.innerHTML = '';
    wfSteps.forEach((s, i) => {
      const d = document.createElement('div');
      d.className = 'vw-step';
      d.dataset.idx = i;
      d.innerHTML = `<div class="vw-ico">${s.icon}</div><h4>${s.title}</h4><p>${s.desc}</p>`;
      d.addEventListener('click', () => showWfStep(i));
      c.appendChild(d);
    });
  }

  function showWfStep(idx) {
    wfIdx = idx;
    const steps = document.querySelectorAll('.vw-step');
    steps.forEach((s, i) => {
      s.classList.remove('active', 'done');
      if (i < idx) s.classList.add('done');
      if (i === idx) {
        s.classList.add('active');
        s.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    // Update progress line
    const line = document.querySelector('.vw-progress');
    if (line) {
      const pct = wfSteps.length > 1 ? (idx / (wfSteps.length - 1)) * 100 : 0;
      line.style.transform = `scaleY(${pct / 100})`;
    }
    // Update info
    const info = document.getElementById('wf-info');
    if (info) {
      const s = wfSteps[idx];
      info.innerHTML = `<h4>${s.icon} ${s.title}</h4><p>${s.desc}</p>`;
      info.style.animation = 'infoSlide 0.3s ease-out';
      setTimeout(() => info.style.animation = '', 400);
    }
  }

  function playWorkflow() {
    if (wfTimer) { clearInterval(wfTimer); wfTimer = null; }
    wfIdx = -1;
    const steps = document.querySelectorAll('.vw-step');
    steps.forEach(s => s.classList.remove('active', 'done'));
    const line = document.querySelector('.vw-progress');
    if (line) line.style.transform = 'scaleY(0)';

    wfTimer = setInterval(() => {
      wfIdx++;
      if (wfIdx >= wfSteps.length) { clearInterval(wfTimer); wfTimer = null; return; }
      showWfStep(wfIdx);
    }, 1800);
  }

  function resetWorkflow() {
    if (wfTimer) { clearInterval(wfTimer); wfTimer = null; }
    wfIdx = -1;
    const steps = document.querySelectorAll('.vw-step');
    steps.forEach(s => s.classList.remove('active', 'done'));
    const line = document.querySelector('.vw-progress');
    if (line) line.style.transform = 'scaleY(0)';
    const info = document.getElementById('wf-info');
    if (info) info.innerHTML = '<p>Click <strong>Play</strong> to watch the journey of a bill through Parliament step by step.</p>';
  }

  function initWorkflow() {
    buildWorkflow();
    resetWorkflow();
  }

  /* ═══════════════════════════════════════════
     QUIZ
     ═══════════════════════════════════════════ */
  const quizData = [
    { q: 'How many members are there in the Lok Sabha?', opts: ['450','500','543','600'], ans: 2, exp: 'Lok Sabha has 543 elected members. Two nominated Anglo-Indians were abolished by the 104th Amendment.' },
    { q: 'Who presides over the Rajya Sabha?', opts: ['President','Prime Minister','Vice President','Speaker'], ans: 2, exp: 'The Vice President of India is the ex-officio Chairman of Rajya Sabha.' },
    { q: 'What is the term of a Rajya Sabha member?', opts: ['4 years','5 years','6 years','Lifetime'], ans: 2, exp: 'Each Rajya Sabha member serves a 6-year term, with one-third retiring every 2 years.' },
    { q: 'How many times can a Money Bill be introduced?', opts: ['Only in Rajya Sabha','Only in Lok Sabha','In either House','Only with PM approval'], ans: 1, exp: 'Money Bills can only be introduced in Lok Sabha, and only with the President\'s recommendation.' },
    { q: 'What is the minimum age to become President of India?', opts: ['25 years','30 years','35 years','40 years'], ans: 2, exp: 'The minimum age for becoming President of India is 35 years.' },
    { q: 'How many sessions does Parliament have each year?', opts: ['2','3','4','6'], ans: 1, exp: 'Parliament has three sessions: Budget (Feb-May), Monsoon (Jul-Aug), and Winter (Nov-Dec).' },
    { q: 'What is the total maximum strength of Rajya Sabha?', opts: ['230','245','250','260'], ans: 2, exp: 'Rajya Sabha can have a maximum of 250 members: 238 elected + 12 nominated.' },
    { q: 'Who can dissolve the Lok Sabha?', opts: ['Speaker','Prime Minister','President','Rajya Sabha'], ans: 2, exp: 'The President can dissolve the Lok Sabha on the advice of the Council of Ministers.' },
    { q: 'What special majority is needed for Constitutional Amendment?', opts: ['Simple majority','Absolute majority','Special majority: majority + 2/3','Unanimous'], ans: 2, exp: 'Constitutional Amendments require special majority: majority of total membership AND 2/3 of members present and voting.' },
    { q: 'How many days can Rajya Sabha delay a non-money bill?', opts: ['7 days','14 days','30 days','60 days'], ans: 1, exp: 'Rajya Sabha can delay non-money bills for a maximum of 14 days.' },
  ];

  let qIdx = 0, score = 0, answered = [];

  function renderQuiz() {
    const box = document.getElementById('quiz-box');
    const result = document.getElementById('quiz-result');
    if (!box) return;
    if (qIdx >= quizData.length) { showResult(); return; }
    const q = quizData[qIdx];
    document.getElementById('quiz-progress').textContent = `Question ${qIdx + 1} of ${quizData.length}`;
    document.getElementById('quiz-score').textContent = `Score: ${score} / ${qIdx}`;
    result.style.display = 'none';
    box.style.display = 'block';
    box.innerHTML = `<div class="q-card"><h3>${q.q}</h3><div class="q-opts">${q.opts.map((o, i) => `<button class="q-opt" data-idx="${i}">${o}</button>`).join('')}</div><p></p></div>`;
    box.querySelectorAll('.q-opt').forEach(b => {
      b.addEventListener('click', () => handleAnswer(+b.dataset.idx));
      b.addEventListener('mousemove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        b.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  function handleAnswer(idx) {
    const q = quizData[qIdx];
    const btns = document.querySelectorAll('.q-opt');
    btns.forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
    const chosen = btns[idx];
    const isCorrect = idx === q.ans;
    if (isCorrect) { score++; chosen.classList.add('correct'); }
    else { chosen.classList.add('wrong'); btns[q.ans].classList.add('correct'); }
    answered.push({ q: qIdx, correct: isCorrect });
    document.getElementById('quiz-score').textContent = `Score: ${score} / ${qIdx + 1}`;
    // Show explanation
    const p = document.querySelector('.q-card p');
    if (p) { p.textContent = q.exp; p.style.color = 'rgba(255,255,255,0.75)'; }
    setTimeout(() => { qIdx++; renderQuiz(); }, 2200);
  }

  function showResult() {
    const box = document.getElementById('quiz-box');
    const result = document.getElementById('quiz-result');
    box.style.display = 'none';
    result.style.display = 'block';
    const pct = Math.round((score / quizData.length) * 100);
    document.getElementById('res-title').textContent = pct >= 80 ? 'Outstanding!' : pct >= 60 ? 'Great Job!' : pct >= 40 ? 'Good Effort!' : 'Keep Learning!';
    document.getElementById('res-msg').textContent = pct >= 80 ? 'You have excellent knowledge of Indian Parliament!' : pct >= 60 ? 'You have a solid understanding of parliamentary procedures.' : pct >= 40 ? 'Review the earlier sections to strengthen your knowledge.' : 'Explore the Parliament sections to learn more.';
    document.getElementById('res-score').textContent = `${score}/${quizData.length}`;
  }

  function resetQuiz() {
    qIdx = 0; score = 0; answered = [];
    document.getElementById('quiz-score').textContent = 'Score: 0 / 0';
    renderQuiz();
  }

  /* ═══════════════════════════════════════════
     CARD HOVER GLOW TRACKING
     ═══════════════════════════════════════════ */
  function initCardGlow() {
    document.addEventListener('mousemove', (e) => {
      document.querySelectorAll('.pb-card').forEach(c => {
        const r = c.getBoundingClientRect();
        const g = c.querySelector('.pb-card-glow');
        if (!g) return;
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        if (x >= -40 && x <= r.width + 40 && y >= -40 && y <= r.height + 40) {
          g.style.left = x + 'px';
          g.style.top = y + 'px';
        }
      });
    });
  }

  /* ═══════════════════════════════════════════
     BAR TOOLTIPS
     ═══════════════════════════════════════════ */
  function initBarTooltips() {
    document.querySelectorAll('.pb-bar-seg[data-tip]').forEach(seg => {
      const tip = document.createElement('div');
      tip.className = 'pb-tip';
      tip.textContent = seg.dataset.tip;
      seg.appendChild(tip);
    });
  }

  /* ═══════════════════════════════════════════
     RIPPLE ON CLICK
     ═══════════════════════════════════════════ */
  function initRipple() {
    document.addEventListener('click', (e) => {
      const t = e.target.closest('.pb-btn, .q-opt, .pb-card-nav, .pb-tab');
      if (!t) return;
      const r = document.createElement('span');
      r.className = 'ripple';
      const rect = t.getBoundingClientRect();
      const sz = Math.max(rect.width, rect.height) * 2;
      r.style.width = r.style.height = sz + 'px';
      r.style.left = (e.clientX - rect.left - sz / 2) + 'px';
      r.style.top = (e.clientY - rect.top - sz / 2) + 'px';
      t.style.position = 'relative';
      t.style.overflow = 'hidden';
      t.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  }

  /* ═══════════════════════════════════════════
     INIT
     ═══════════════════════════════════════════ */
  function init() {
    buildStepper();
    buildParticles();
    buildParliament();
    buildIndiaMap();
    buildBillTimeline('ordinary');
    bindBillTabs();
    bindNavBtns();
    renderQuiz();
    initCardGlow();
    initBarTooltips();
    initRipple();

    document.getElementById('btn-retry')?.addEventListener('click', resetQuiz);
    document.getElementById('wf-play')?.addEventListener('click', playWorkflow);
    document.getElementById('wf-reset')?.addEventListener('click', resetWorkflow);

    // Entrance animations
    setTimeout(triggerRevealAnimations, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API (matches election-simulator pattern)
  window.parliamentLearning = { go, resetQuiz, playWorkflow, resetWorkflow };

})();
