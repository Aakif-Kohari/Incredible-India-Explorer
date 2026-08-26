/**
 * Cyclone Michaung 2023 - Interactive Storm Dossier Engine
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

  // 1. WAYPOINTS & TRACK SCRUBBER
  const waypoints = [
    {
      date: "30 Nov 2023",
      title: "Low-pressure area forms",
      note: "A low over the Gulf of Thailand drifts west across the Malay Peninsula toward the Andaman Sea.",
      stage: "Low-pressure area",
      wind: "< 45 km/h",
      pos: "Andaman Sea / SE Bay of Bengal"
    },
    {
      date: "1 Dec 2023",
      title: "Organising over the Bay of Bengal",
      note: "The system consolidates into a well-marked low as it enters the southeast Bay of Bengal.",
      stage: "Well-marked low",
      wind: "~45 km/h",
      pos: "Southeast Bay of Bengal"
    },
    {
      date: "2 Dec 2023",
      title: "Deep depression",
      note: "Steady deepening as the system tracks north-west, gaining organisation and moisture from the warm Bay.",
      stage: "Deep depression",
      wind: "~55–65 km/h",
      pos: "Central Bay of Bengal"
    },
    {
      date: "3 Dec 2023",
      title: "Named Michaung",
      note: "Intensifies into a cyclonic storm and receives its name — the sixth of the 2023 North Indian Ocean season.",
      stage: "Cyclonic storm",
      wind: "~65–75 km/h",
      pos: "West-central Bay of Bengal"
    },
    {
      date: "4 Dec 2023",
      title: "Severe cyclonic storm, record Chennai rain",
      note: "Peak intensity reached as the storm grazes the Tamil Nadu coast, dumping extreme rainfall on Chennai.",
      stage: "Severe cyclonic storm (peak)",
      wind: "~100 km/h, gusts higher",
      pos: "Offshore north Tamil Nadu"
    },
    {
      date: "5 Dec 2023",
      title: "Landfall near Bapatla, Andhra Pradesh",
      note: "Crosses the coast between Nellore and Kavali around early afternoon, then weakens through the evening.",
      stage: "Landfall → weakening",
      wind: "90–100 km/h, gusts to 110 km/h",
      pos: "Bapatla, Andhra Pradesh"
    }
  ];

  const dots = document.querySelectorAll('.track-dot');
  const glow = document.getElementById('glow');
  const scrub = document.getElementById('scrub');
  const infocard = document.getElementById('infocard');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function renderInfo(i) {
    const w = waypoints[i];
    if (!infocard || !w) return;
    infocard.innerHTML = `
      <div class="tl-date">${w.date}</div>
      <h3>${w.title}</h3>
      <p style="font-size:.88rem; color:var(--paper); margin-bottom:0;">${w.note}</p>
      <div class="meta">
        <div>Stage<b>${w.stage}</b></div>
        <div>Winds<b>${w.wind}</b></div>
        <div>Position<b>${w.pos}</b></div>
      </div>
    `;
  }

  function setActive(i) {
    if (!dots.length) return;
    dots.forEach(d => d.classList.toggle('active', Number(d.dataset.i) === i));
    const el = document.querySelector('.track-dot[data-i="' + i + '"]');
    if (el && glow) {
      const t = el.getAttribute('transform').match(/-?\d+\.?\d*/g);
      if (t) {
        glow.setAttribute('cx', t[0]);
        glow.setAttribute('cy', t[1]);
      }
    }
    if (scrub) scrub.value = i;
    renderInfo(i);
  }

  dots.forEach(d => d.addEventListener('click', () => setActive(Number(d.dataset.i))));
  if (scrub) scrub.addEventListener('input', e => setActive(Number(e.target.value)));
  if (prevBtn) prevBtn.addEventListener('click', () => {
    if (scrub) setActive(Math.max(0, Number(scrub.value) - 1));
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    if (scrub) setActive(Math.min(5, Number(scrub.value) + 1));
  });

  setActive(5);

  // 2. QUIZ WIDGET
  const quizQuestions = [
    {
      q: "1. Where did Cyclone Michaung make official landfall on 5 December 2023?",
      options: ["Chennai, Tamil Nadu", "Bapatla, Andhra Pradesh", "Puri, Odisha", "Visakhapatnam, Andhra Pradesh"],
      correct: 1,
      exp: "Michaung made landfall on the south Andhra Pradesh coast near Bapatla (between Nellore and Kavali) with sustained winds of 90–100 km/h."
    },
    {
      q: "2. Which country proposed the name 'Michaung' (meaning strength and resilience)?",
      options: ["Myanmar", "India", "Bangladesh", "Thailand"],
      correct: 0,
      exp: "The name 'Michaung' was contributed by Myanmar as part of the WMO/ESCAP Panel on Tropical Cyclones naming roster."
    },
    {
      q: "3. Why did Chennai experience catastrophic urban flooding despite the storm not making landfall in Tamil Nadu?",
      options: ["Tsunami wave", "Slow-moving rain bands parked over the city for ~36 hours over paved wetlands", "River dam failure", "Snowmelt surge"],
      correct: 1,
      exp: "Michaung's outer rain bands stalled offshore for nearly two days, dumping record rainfall over Chennai's flat coastal plain and encroached wetlands."
    },
    {
      q: "4. What major transportation hub in Chennai had to suspend operations due to runway flooding?",
      options: ["Chennai Central Railway Station only", "Chennai International Airport", "Ennore Seaport only", "Koyambedu Bus Terminus only"],
      correct: 1,
      exp: "Chennai International Airport's airfield and runway flooded, forcing the grounding of flights until water was pumped out the next day."
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
      card.className = 'quiz-q-card';

      const title = document.createElement('div');
      title.className = 'quiz-q-title';
      title.textContent = qObj.q;
      card.appendChild(title);

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

      const fb = document.createElement('div');
      fb.className = 'quiz-fb';
      fb.id = `quizFb_${qIdx}`;
      card.appendChild(fb);

      quizContainer.appendChild(card);
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
