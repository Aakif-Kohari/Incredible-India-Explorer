/**
 * The Megalithic Heritage of India - Interactive Explorer Engine
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

  /* ============ DATA ============ */
  const TYPE_COLORS = {
    dolmen:   '#B5541E',
    circle:   '#A79C89',
    menhir:   '#7A3418',
    living:   '#5F6B4A',
    urn:      '#8f4419'
  };

  const TYPE_LABELS = {
    dolmen: 'Dolmens & Cists',
    circle: 'Stone/Cairn Circles',
    menhir: 'Menhirs',
    living: 'Living Tradition (NE India)',
    urn:    'Urn / Sarcophagus Burials'
  };

  const sites = [
    { id:'S.01', name:'Hirebenkal', state:'Karnataka (Koppal dist.)', lat:15.516, lng:76.267, type:'dolmen',
      note:'One of the largest megalithic necropolises in India, with an estimated 400+ port-hole dolmens spread across a granite plateau, some aligned to solstice sunrise.' },
    { id:'S.02', name:'Brahmagiri', state:'Karnataka (Chitradurga dist.)', lat:14.71, lng:76.68, type:'circle',
      note:'Stone circles dated to roughly 900 BCE; excavations here in the 1940s by Mortimer Wheeler helped establish the megalithic sequence for South India.' },
    { id:'S.03', name:'Junapani', state:'Maharashtra (Nagpur dist., Vidarbha)', lat:21.20, lng:78.95, type:'circle',
      note:'The site that first revealed Vidarbha’s megalithic stone-circle culture, with burials accompanied by horse remains and iron weapons.' },
    { id:'S.04', name:'Mahurjhari', state:'Maharashtra (Nagpur dist., Vidarbha)', lat:21.25, lng:79.02, type:'circle',
      note:'A large stone-circle cemetery associated with a probable warrior class — horse bits, iron spearheads, and cairn-filled circles.' },
    { id:'S.05', name:'Adichanallur', state:'Tamil Nadu (Thoothukudi dist.)', lat:8.70, lng:77.75, type:'urn',
      note:'Famous urn-burial site on the Tamiraparani river; terracotta sarcophagi and burial urns point to trade contact as far as central India.' },
    { id:'S.06', name:'Nilgiri Hills (Toda cairns)', state:'Tamil Nadu', lat:11.41, lng:76.70, type:'circle',
      note:'Cairn circles associated with the Toda pastoralists, whose funerary customs still echo megalithic burial practice — a living link to the prehistoric tradition.' },
    { id:'S.07', name:'Marayur (Muniyara)', state:'Kerala (Idukki dist.)', lat:10.25, lng:77.15, type:'dolmen',
      note:'A cluster of dolmens locally called “muniyara” (sage’s stones), cut and assembled from local gneiss on a forested hillside.' },
    { id:'S.08', name:'Ariyannur', state:'Kerala (Thrissur dist.)', lat:10.34, lng:76.32, type:'dolmen',
      note:'Known for mushroom-shaped “umbrella stones” (topikal) and hood stones (kudaikal) capping underground burial pits — forms distinctive to Kerala.' },
    { id:'S.09', name:'Nartiang', state:'Meghalaya (West Jaintia Hills)', lat:25.50, lng:92.10, type:'living',
      note:'The largest concentration of monoliths in Meghalaya: menhirs (moo shynrang) for men and dolmens (moo kynthai) for women, still tended by Jaintia clans.' }
  ];

  /* ============ MAP INITIALIZATION ============ */
  if (typeof L !== 'undefined' && document.getElementById('map')) {
    const map = L.map('map', { scrollWheelZoom: false, zoomControl: true }).setView([17.5, 81], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 12,
      minZoom: 4
    }).addTo(map);

    function pinIcon(color) {
      return L.divIcon({
        className: '',
        html: `<svg width="26" height="34" viewBox="0 0 26 34" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 0C5.8 0 0 5.8 0 13c0 9.5 13 21 13 21s13-11.5 13-21C26 5.8 20.2 0 13 0z" fill="${color}" stroke="#211F1B" stroke-width="1"/>
          <circle cx="13" cy="13" r="5.4" fill="#F6F1E4"/>
        </svg>`,
        iconSize: [26, 34],
        iconAnchor: [13, 32],
        popupAnchor: [0, -30]
      });
    }

    const markers = sites.map(s => {
      const m = L.marker([s.lat, s.lng], { icon: pinIcon(TYPE_COLORS[s.type]) }).addTo(map);
      m.bindPopup(`<div class="popup-type">${TYPE_LABELS[s.type]}</div>
        <div class="popup-title">${s.name}</div>
        <div>${s.note}</div>
        <div class="popup-meta">${s.state} &middot; ${s.lat.toFixed(2)}, ${s.lng.toFixed(2)}</div>`);
      m._type = s.type;
      return m;
    });

    /* Legend / Filters */
    const legend = document.getElementById('legend');
    if (legend) {
      const allBtn = document.createElement('button');
      allBtn.className = 'legend-btn active';
      allBtn.innerHTML = `<span class="dot" style="background:#B5541E"></span> All types`;
      allBtn.onclick = () => filterType(null, allBtn);
      legend.appendChild(allBtn);

      Object.keys(TYPE_LABELS).forEach(t => {
        const b = document.createElement('button');
        b.className = 'legend-btn';
        b.innerHTML = `<span class="dot" style="background:${TYPE_COLORS[t]}"></span> ${TYPE_LABELS[t]}`;
        b.onclick = () => filterType(t, b);
        legend.appendChild(b);
      });
    }

    function filterType(type, btn) {
      if (!legend) return;
      [...legend.children].forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      markers.forEach(m => {
        if (!type || m._type === type) {
          if (!map.hasLayer(m)) m.addTo(map);
        } else {
          map.removeLayer(m);
        }
      });
    }
  }

  /* ============ TYPOLOGY CARDS ============ */
  const types = [
    { code: 'TY.01', name: 'Menhir', vern: 'single standing stone · memorial', desc: 'A single upright monolith, planted without a burial beneath it. Purely commemorative — raised to mark an event, a warrior, or an ancestor rather than to hold remains.',
      svg: `<svg viewBox="0 0 200 110"><line x1="10" y1="100" x2="190" y2="100" stroke="#C9BEA7" stroke-width="1"/>
       <rect x="88" y="20" width="24" height="80" rx="3" fill="none" stroke="#211F1B" stroke-width="2"/>
       <path d="M92 20 L100 8 L108 20" fill="none" stroke="#211F1B" stroke-width="2"/>
       <line x1="70" y1="100" x2="130" y2="100" stroke="#211F1B" stroke-width="2"/></svg>` },
    { code: 'TY.02', name: 'Dolmen / Cist', vern: 'dolmenoid cist · sepulchral', desc: 'A box-shaped chamber of upright stone slabs (orthostats) capped with a flat roofing stone. Often built to hold a single burial; a round “port-hole” in one slab sometimes allowed later access.',
      svg: `<svg viewBox="0 0 200 110"><line x1="10" y1="100" x2="190" y2="100" stroke="#C9BEA7" stroke-width="1"/>
       <rect x="60" y="30" width="14" height="60" fill="none" stroke="#211F1B" stroke-width="2"/>
       <rect x="126" y="30" width="14" height="60" fill="none" stroke="#211F1B" stroke-width="2"/>
       <rect x="55" y="18" width="90" height="14" rx="2" fill="none" stroke="#B5541E" stroke-width="2.4"/>
       <circle cx="67" cy="60" r="5" fill="none" stroke="#211F1B" stroke-width="1.4"/></svg>` },
    { code: 'TY.03', name: 'Stone / Cairn Circle', vern: 'sepulchral · defined periphery', desc: 'A ring of boulders enclosing a burial pit, often packed with rubble (cairn fill). The most numerous megalithic form in the Deccan, sometimes found in clusters of dozens.',
      svg: `<svg viewBox="0 0 200 110"><line x1="10" y1="100" x2="190" y2="100" stroke="#C9BEA7" stroke-width="1"/>
       <ellipse cx="100" cy="82" rx="70" ry="16" fill="none" stroke="#211F1B" stroke-width="1.2" stroke-dasharray="3 4"/>
       <g fill="#A79C89"><circle cx="34" cy="82" r="6"/><circle cx="58" cy="90" r="6"/><circle cx="90" cy="94" r="6"/><circle cx="130" cy="93" r="6"/><circle cx="160" cy="86" r="6"/><circle cx="170" cy="76" r="6"/><circle cx="40" cy="72" r="6"/></g></svg>` },
    { code: 'TY.04', name: 'Umbrella / Hood Stone', vern: 'topikal · kudaikal · Kerala', desc: 'A mushroom-shaped capstone set over a laterite pit burial — topikal (“hat stone”) and kudaikal (“umbrella stone”) are regional forms found almost exclusively in Kerala.',
      svg: `<svg viewBox="0 0 200 110"><line x1="10" y1="100" x2="190" y2="100" stroke="#C9BEA7" stroke-width="1"/>
       <ellipse cx="100" cy="40" rx="60" ry="18" fill="none" stroke="#B5541E" stroke-width="2.4"/>
       <line x1="100" y1="55" x2="100" y2="90" stroke="#211F1B" stroke-width="2"/>
       <ellipse cx="100" cy="92" rx="18" ry="6" fill="none" stroke="#211F1B" stroke-width="1.4" stroke-dasharray="2 3"/></svg>` },
    { code: 'TY.05', name: 'Urn / Sarcophagus Burial', vern: 'terracotta · Tamil Nadu', desc: 'The dead, or their remains, placed within a large fired-clay urn or a legged terracotta sarcophagus and buried directly in the earth — no standing stone above.',
      svg: `<svg viewBox="0 0 200 110"><line x1="10" y1="100" x2="190" y2="100" stroke="#C9BEA7" stroke-width="1"/>
       <path d="M75 40 Q75 20 100 20 Q125 20 125 40 L120 90 Q100 100 80 90 Z" fill="none" stroke="#211F1B" stroke-width="2"/>
       <line x1="60" y1="40" x2="140" y2="40" stroke="#211F1B" stroke-width="1.4"/>
       <line x1="82" y1="95" x2="82" y2="100" stroke="#211F1B" stroke-width="2"/><line x1="118" y1="95" x2="118" y2="100" stroke="#211F1B" stroke-width="2"/></svg>` },
    { code: 'TY.06', name: 'Living Monolith', vern: 'moo shynrang · moo kynthai · Meghalaya', desc: 'Among the Khasi and Jaintia, upright menhirs (for men) and flat dolmens (for women) are still erected today to honour the recently dead — the only megalithic tradition in India still in active practice.',
      svg: `<svg viewBox="0 0 200 110"><line x1="10" y1="100" x2="190" y2="100" stroke="#C9BEA7" stroke-width="1"/>
       <rect x="50" y="30" width="16" height="70" rx="3" fill="none" stroke="#5F6B4A" stroke-width="2.2"/>
       <rect x="85" y="45" width="20" height="55" rx="3" fill="none" stroke="#5F6B4A" stroke-width="2.2"/>
       <rect x="118" y="20" width="14" height="80" rx="3" fill="none" stroke="#5F6B4A" stroke-width="2.2"/>
       <rect x="150" y="88" width="34" height="12" rx="2" fill="none" stroke="#211F1B" stroke-width="1.6"/></svg>` }
  ];

  const typegrid = document.getElementById('typegrid');
  if (typegrid) {
    typegrid.innerHTML = '';
    types.forEach(t => {
      const el = document.createElement('div');
      el.className = 'type-card';
      el.innerHTML = `<div class="type-code"><span>${t.code}</span><span>FORM</span></div>
        ${t.svg}
        <h3>${t.name}</h3>
        <span class="vern">${t.vern}</span>
        <p>${t.desc}</p>`;
      typegrid.appendChild(el);
    });
  }

  /* ============ REGIONS ============ */
  const regions = [
    { name: 'Vidarbha', sub: 'Maharashtra', accent: '#B5541E',
      text: 'The megalithic heartland of central India, centred on Nagpur. Excavations at Junapani, Mahurjhari, Khapa and Naikund revealed stone-circle cemeteries where horses were buried alongside the dead — likely the graves of a warrior elite.',
      chips: ['Stone circles', 'Cairn fill', 'Horse burials', 'Iron weapons'] },
    { name: 'Karnataka', sub: 'Deccan plateau', accent: '#A79C89',
      text: 'Dense fields of port-hole dolmens and stone circles across the granite uplands — Hirebenkal alone holds several hundred. Brahmagiri’s excavation by Mortimer Wheeler in 1947 anchored the chronology for the entire South Indian Iron Age.',
      chips: ['Port-hole cists', 'Dolmens', 'Astronomical alignment'] },
    { name: 'Andhra Pradesh & Telangana', sub: 'Eastern Deccan', accent: '#7A3418',
      text: 'Known for stone coffins and rare anthropomorphic (human-shaped) memorial stones alongside the more common cairns and circles — a regional signature not seen as strongly elsewhere.',
      chips: ['Stone coffins', 'Anthropomorphic figures', 'Cairns'] },
    { name: 'Tamil Nadu', sub: 'Far south', accent: '#8f4419',
      text: 'The longest-running tradition, from roughly 1300 BCE to 300 CE. Adichanallur’s urn and sarcophagus burials, alongside dolmens and cairns across Coimbatore, Salem and the Nilgiris, show the widest typological range of any single state.',
      chips: ['Urn burials', 'Sarcophagi', 'Dolmens', 'Cairns'] },
    { name: 'Kerala', sub: 'Western coast', accent: '#5F6B4A',
      text: 'The most visually distinct regional style: mushroom-capped topikal and kudaikal (“umbrella” and “hood” stones) over laterite pit burials, plus rock-cut chamber tombs carved directly into hillsides.',
      chips: ['Umbrella stones', 'Hood stones', 'Rock-cut caves'] },
    { name: 'Northeast India', sub: 'Khasi & Jaintia Hills, Meghalaya', accent: '#5F6B4A',
      text: 'A different lineage altogether — likely linked to Southeast Asian megalithic practice rather than the peninsular tradition — and the only one still living. Menhirs and dolmens continue to be raised at sites like Nartiang to honour the dead.',
      chips: ['Living tradition', 'Menhirs', 'Dolmens', 'Clan memorials'] }
  ];

  const regionlist = document.getElementById('regionlist');
  if (regionlist) {
    regionlist.innerHTML = '';
    regions.forEach(r => {
      const el = document.createElement('div');
      el.className = 'region-strip';
      el.innerHTML = `<div><div class="region-name" style="color:${r.accent}">${r.name}</div><span class="region-sub">${r.sub}</span></div>
        <div class="region-body"><p>${r.text}</p>
        <div class="chip-row">${r.chips.map(c => `<span class="chip">${c}</span>`).join('')}</div></div>`;
      regionlist.appendChild(el);
    });
  }

  /* ============ SITE REGISTER ============ */
  const registergrid = document.getElementById('registergrid');
  if (registergrid) {
    registergrid.innerHTML = '';
    sites.forEach(s => {
      const el = document.createElement('div');
      el.className = 'site-card';
      el.style.borderLeftColor = TYPE_COLORS[s.type];
      el.innerHTML = `<div class="sc-top"><h3>${s.name}</h3><span class="sc-id mono">${s.id}</span></div>
        <div class="sc-loc mono">${s.state}</div>
        <p>${s.note}</p>`;
      registergrid.appendChild(el);
    });
  }

  /* ============ QUIZ ============ */
  const quizQuestions = [
    {
      q: "1. Which Karnataka site contains over 400 port-hole dolmens aligned to solar solstices?",
      options: ["Brahmagiri", "Hirebenkal", "Junapani", "Adichanallur"],
      correct: 1,
      exp: "Hirebenkal in Koppal district, Karnataka, is one of India's largest megalithic necropolises with over 400 port-hole dolmens and prehistoric rock art."
    },
    {
      q: "2. What are the distinctive mushroom-shaped capstones and hood stones in Kerala called?",
      options: ["Topikal & Kudaikal", "Moo Shynrang", "Menhir & Dolmenoid", "Orthostats"],
      correct: 0,
      exp: "Topikal ('hat stones') and Kudaikal ('umbrella stones') are unique Kerala megalithic burial covers sculpted from laterite rock."
    },
    {
      q: "3. In which region is the megalithic tradition still actively practiced today by local clans?",
      options: ["Vidarbha (Maharashtra)", "Nilgiri Hills (Tamil Nadu)", "Khasi & Jaintia Hills (Meghalaya)", "Konkan Coast"],
      correct: 2,
      exp: "Meghalaya's Khasi and Jaintia communities continue the living megalithic tradition at sites like Nartiang, erecting Moo Shynrang (menhirs) and Moo Kynthai (dolmens)."
    },
    {
      q: "4. What unique grave goods were unearthed in the Vidarbha stone circles of Mahurjhari and Junapani?",
      options: ["Horse bits and iron warrior weapons", "Roman gold coins", "Terracotta boats", "Bronze chariots"],
      correct: 0,
      exp: "Excavations at Mahurjhari and Junapani revealed stone-circle burials with horse remains, iron bits, and spearheads representing an Iron Age equestrian society."
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
      card.className = 'quiz-card';

      const title = document.createElement('div');
      title.className = 'quiz-q-title';
      title.textContent = qObj.q;
      card.appendChild(title);

      const optsDiv = document.createElement('div');
      optsDiv.className = 'quiz-opts';

      qObj.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-btn';
        btn.textContent = optText;
        btn.setAttribute('type', 'button');
        btn.addEventListener('click', () => handleOptionClick(qIdx, optIdx, btn, optsDiv));
        optsDiv.appendChild(btn);
      });

      card.appendChild(optsDiv);

      const feedback = document.createElement('div');
      feedback.className = 'quiz-fb';
      feedback.id = `quizFb_${qIdx}`;
      card.appendChild(feedback);

      quizContainer.appendChild(card);
    });
  }

  function handleOptionClick(qIdx, optIdx, btn, optsDiv) {
    const qObj = quizQuestions[qIdx];
    const allBtns = optsDiv.querySelectorAll('.quiz-btn');
    allBtns.forEach(b => b.disabled = true);

    const fb = document.getElementById(`quizFb_${qIdx}`);
    answeredCount++;

    if (optIdx === qObj.correct) {
      btn.classList.add('correct');
      currentScore++;
      if (fb) {
        fb.className = 'quiz-fb show correct';
        fb.innerHTML = `<b>✓ Correct!</b> ${qObj.exp}`;
      }
    } else {
      btn.classList.add('wrong');
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
