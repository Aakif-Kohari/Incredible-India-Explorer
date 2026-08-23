const DOGRI_WORDS = [
    {
        script: 'हां',
        roman: 'hā̃',
        meaning: 'Yes',
        ipa: '[ã̀ː]',
        audio: 'https://www.languageshome.com/Dogri_Audio/09.mp3'
    },
    { script: 'नेईं', roman: 'neī̃', meaning: 'No', ipa: '[neː.ĩː]' },
    { script: 'केह्', roman: 'keh', meaning: 'What', ipa: '[kéː]' },
    { script: 'की', roman: 'kī', meaning: 'Why', ipa: '[kiː]' },
    { script: 'कन्नै', roman: 'kannai', meaning: 'With', ipa: '[kən.nɛː]' },
    { script: 'हिरख', roman: 'hirkh', meaning: 'Love', ipa: '[ɪ̀ɾkʰ]' },
    { script: 'गास', roman: 'gās', meaning: 'Sky', ipa: '[gaːs]' },
    { script: "ब'रा", roman: "b'rā", meaning: 'Year', ipa: '[bə́.ɾaː]' },
    { script: 'धन्नवाद', roman: 'dhanvād', meaning: 'Thank you', ipa: '' },
    { script: 'खरा फ्ही', roman: 'kharā phī', meaning: 'Goodbye / okay then', ipa: '' }
];

function speak(text, lang = 'hi-IN') {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.82;
    const voices = window.speechSynthesis.getVoices();
    u.voice =
        voices.find(v => v.lang.toLowerCase().startsWith('doi')) ||
        voices.find(v => v.lang.toLowerCase().startsWith('hi')) ||
        voices.find(v => v.lang.toLowerCase().startsWith('en-in')) ||
        null;
    window.speechSynthesis.speak(u);
}
function renderWords(query = '') {
    const grid = document.getElementById('word-grid');
    if (!grid) return;
    const q = query.trim().toLowerCase();
    grid.innerHTML =
        DOGRI_WORDS.map((w, i) => {
            const hay = [w.script, w.roman, w.meaning, w.ipa].join(' ').toLowerCase();
            if (q && !hay.includes(q)) return '';
            return `<article class="word-card"><div class="script" lang="doi">${w.script}</div><div class="roman">${w.roman}</div><div class="meaning">${w.meaning}</div><div class="ipa">${w.ipa || 'Pronunciation reference'}</div>${w.audio ? `<audio controls preload="none" src="${w.audio}" aria-label="Recorded pronunciation of ${w.meaning}"></audio>` : `<button type="button" data-speak="${w.script}">🔊 Browser pronunciation</button>`}</article>`;
        }).join('') || '<p>No matching words found.</p>';
    grid.querySelectorAll('[data-speak]').forEach(b => b.addEventListener('click', () => speak(b.dataset.speak)));
}
document.addEventListener('DOMContentLoaded', () => {
    renderWords();
    document.getElementById('word-search')?.addEventListener('input', e => renderWords(e.target.value));
    document
        .querySelectorAll('[data-speech]')
        .forEach(b => b.addEventListener('click', () => speak(b.dataset.speech, b.dataset.lang)));
});
