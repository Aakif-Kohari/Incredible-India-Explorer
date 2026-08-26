/**
 * Cyclone Remal 2024 - Interactive Field Profile Engine
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

  // 1. Bulletin Nav active state on scroll
  const navLinks = document.querySelectorAll('.bulletin-nav a');
  const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href')));
  function onScroll() {
    let idx = 0;
    const y = window.scrollY + 120;
    sections.forEach((s, i) => { if (s && s.offsetTop <= y) idx = i; });
    navLinks.forEach((a, i) => a.classList.toggle('active', i === idx));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. Track map readout
  const readout = document.getElementById('mapReadout');
  if (readout) {
    document.querySelectorAll('#trackSvg .node').forEach(node => {
      const update = () => {
        readout.innerHTML = '<span class="r-title">' + node.dataset.title + '</span><span class="r-sub">' + node.dataset.sub + '</span>';
      };
      node.addEventListener('mouseenter', update);
      node.addEventListener('click', update);
    });
  }

  // 3. Impact map readout
  const impactReadout = document.getElementById('impactReadout');
  if (impactReadout) {
    document.querySelectorAll('#impactSvg .impact-pin').forEach(pin => {
      const update = () => {
        impactReadout.innerHTML = '<span class="r-title">' + pin.dataset.title + '</span><span class="r-sub">' + pin.dataset.sub + '</span>';
      };
      pin.addEventListener('mouseenter', update);
      pin.addEventListener('click', update);
    });
  }

  // 4. Bar chart animation
  const bars = document.querySelectorAll('.bar-fill');
  const chartWrap = document.querySelector('.chart-wrap');
  if (chartWrap && bars.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          bars.forEach(b => {
            b.style.width = b.dataset.w + '%';
          });
          io.disconnect();
        }
      });
    }, { threshold: 0.3 });
    io.observe(chartWrap);
  }

  // 5. Quiz widget
  const quizQuestions = [
    {
      q: "1. Where did Cyclone Remal make landfall on the night of 26–27 May 2024?",
      options: [
        "Between Sagar Island (West Bengal) and Khepupara (Bangladesh), near Mongla",
        "Paradip, Odisha",
        "Chennai, Tamil Nadu",
        "Digha, West Bengal"
      ],
      correct: 0,
      exp: "Cyclone Remal made landfall along the West Bengal–Bangladesh coast between Sagar Island and Khepupara (near Mongla) with sustained winds of 110–120 km/h and gusts to 135 km/h."
    },
    {
      q: "2. How many days in advance did the IMD forecast the genesis zone of Cyclone Remal?",
      options: ["1 day", "5 days", "12 hours", "10 days"],
      correct: 1,
      exp: "The IMD flagged the genesis area roughly 5 days prior to formation, issuing pre-genesis track and intensity forecasts that enabled massive pre-landfall evacuations."
    },
    {
      q: "3. How many people were evacuated to relief shelters across West Bengal ahead of landfall?",
      options: ["20,000", "50,000", "207,060+", "10,000"],
      correct: 2,
      exp: "Over 207,060 people were evacuated to 1,438 designated government relief shelters across vulnerable coastal blocks in West Bengal."
    },
    {
      q: "4. What was the meaning and naming origin of 'Remal'?",
      options: [
        "Arabic for 'sand', contributed by Oman",
        "Sanskrit for 'wind', contributed by India",
        "Bengali for 'storm', contributed by Bangladesh",
        "Burmese for 'strength', contributed by Myanmar"
      ],
      correct: 0,
      exp: "'Remal' is an Arabic word meaning 'sand', contributed by the Sultanate of Oman as part of the WMO/ESCAP tropical cyclone naming panel."
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
      box.className = 'quiz-q-box';

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
