// Rajasthani Language Explorer Interactive Script
(function () {
  function speak(text, btn) {
    if (!('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported on this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('hi'));
    if (hindiVoice) utterance.voice = hindiVoice;
    utterance.lang = 'hi-IN';
    utterance.rate = 0.85;

    if (btn) {
      btn.classList.add('speaking');
      utterance.onend = () => btn.classList.remove('speaking');
      utterance.onerror = () => btn.classList.remove('speaking');
    }

    window.speechSynthesis.speak(utterance);
  }

  window.speakRajasthani = speak;

  document.addEventListener('DOMContentLoaded', () => {
    const data = window.RAJASTHANI_DATA;
    const landingView = document.getElementById('landing-view');
    const explorerView = document.getElementById('explorer-view');
    const btnExplore = document.getElementById('btn-explore');
    const btnBack = document.getElementById('btn-back');

    // Switch view
    if (btnExplore && btnBack && landingView && explorerView) {
      btnExplore.addEventListener('click', () => {
        landingView.classList.add('hidden');
        explorerView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      btnBack.addEventListener('click', () => {
        explorerView.classList.add('hidden');
        landingView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Attach speak button click events
    document.querySelectorAll('[data-speak]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = btn.getAttribute('data-speak');
        speak(text, btn);
      });
    });

    // Populate words grid if empty
    const wordsGrid = document.getElementById('words-grid');
    if (wordsGrid && data && data.words) {
      wordsGrid.innerHTML = '';
      data.words.forEach(w => {
        const card = document.createElement('div');
        card.className = 'raj-card';
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.justifyContent = 'space-between';
        card.style.gap = '10px';
        card.innerHTML = `
          <div>
            <p class="raj-deva" style="margin:0; font-size:17px; font-weight:600; color:var(--raj-indigo);">${w.deva}</p>
            <p style="margin:2px 0 0; font-size:12px; color:var(--raj-text-soft);">${w.translit} · ${w.meaning}</p>
          </div>
          <button class="raj-soundbtn" data-speak="${w.deva}" aria-label="Listen to ${w.deva}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
          </button>
        `;
        const soundBtn = card.querySelector('button');
        soundBtn.addEventListener('click', () => speak(w.deva, soundBtn));
        wordsGrid.appendChild(card);
      });
    }

    // Populate dialects grid if empty
    const dialectsGrid = document.getElementById('dialects-grid');
    if (dialectsGrid && data && data.dialects) {
      dialectsGrid.innerHTML = '';
      data.dialects.forEach(d => {
        const card = document.createElement('div');
        card.className = 'raj-card';
        card.innerHTML = `
          <p style="margin:0; font-size:14px; font-weight:600; color:var(--raj-crimson);">${d.name}</p>
          <p style="margin:3px 0 6px; font-size:11.5px; color:var(--raj-text-soft);">${d.region}</p>
          <p style="margin:0; font-size:12px; line-height:1.5; color:var(--raj-text-muted);">${d.note}</p>
        `;
        dialectsGrid.appendChild(card);
      });
    }

    // Populate sources
    const sourcesList = document.getElementById('sources-list');
    if (sourcesList && data && data.sources) {
      sourcesList.innerHTML = '';
      data.sources.forEach(s => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${s.url}" target="_blank" rel="noreferrer" style="color:var(--raj-crimson); text-decoration:underline;">${s.label}</a>`;
        sourcesList.appendChild(li);
      });
    }
  });
})();
