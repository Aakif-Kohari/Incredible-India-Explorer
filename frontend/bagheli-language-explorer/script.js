function goExplorer() {
    document.getElementById('landing').classList.add('hidden');
    document.getElementById('explorer').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'instant' });
}
function goLanding() {
    document.getElementById('explorer').classList.add('hidden');
    document.getElementById('landing').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function speakWord(text, btn) {
    if (!('speechSynthesis' in window)) {
        alert('Speech playback is not supported in this browser.');
        return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('en-in')) ||
        voices.find(v => v.lang && v.lang.toLowerCase().startsWith('en'));
    if (enVoice) utter.voice = enVoice;
    utter.lang = 'en-IN';
    utter.rate = 0.85;
    btn.classList.add('playing');
    utter.onend = () => btn.classList.remove('playing');
    utter.onerror = () => btn.classList.remove('playing');
    window.speechSynthesis.speak(utter);
}

const WORDS = [
    { native: "Khublei", tr: "khu-blay", en: "Hello / thank you" },
    { native: "Kumno?", tr: "kum-no", en: "How are you? (informal hello)" },
    { native: "Nga", tr: "ngah", en: "I / me" },
    { native: "Phi", tr: "fee", en: "You" },
    { native: "Nga khlain", tr: "ngah kh-lain", en: "I am fine" },
    { native: "Ïeid", tr: "yeid", en: "Love" },
    { native: "Iew", tr: "yeaw", en: "Market" },
    { native: "Leit suk", tr: "leit sook", en: "Safe journey" }
];
const grid = document.getElementById('wordGrid');
WORDS.forEach(w => {
    const card = document.createElement('div');
    card.className = 'word-card';
    card.innerHTML = `
      <div class="top">
        <div class="native-word">${w.native}</div>
        <button class="speak" aria-label="Play ${w.tr}" onclick="speakWord('${w.native}', this)">🔊</button>
      </div>
      <div class="translit">${w.tr}</div>
      <div class="meaning">${w.en}</div>
    `;
    grid.appendChild(card);
});