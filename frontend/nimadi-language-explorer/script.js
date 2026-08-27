document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('nimadi-play-btn');
    let utterance = null;
    let voices = [];

    // Pre-load voices
    function loadVoices() {
        if ('speechSynthesis' in window) {
            voices = window.speechSynthesis.getVoices();
        }
    }

    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            if (!('speechSynthesis' in window)) {
                alert('Text-to-speech is not supported in your browser.');
                return;
            }

            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                playBtn.innerHTML = '▶ Listen to TTS Pronunciation';
                playBtn.classList.remove('playing');
                return;
            }

            // Creating the utterance
            utterance = new SpeechSynthesisUtterance("Ram Ram");
            // Nimadi (noe) does not have a dedicated voice in most browsers/OSes.
            // Since Nimadi is written in Devanagari and closely related to Hindi,
            // we fall back to a Hindi voice for the closest available pronunciation.
            utterance.lang = 'hi-IN';

            const bestVoice = voices.find(v => v.lang.startsWith('hi-IN')) || voices[0];
            if (bestVoice) {
                utterance.voice = bestVoice;
            }

            // Keep global reference
            window.currentUtterance = utterance;

            utterance.onstart = () => {
                playBtn.innerHTML = '⏸ Stop';
                playBtn.classList.add('playing');
            };

            utterance.onend = () => {
                playBtn.innerHTML = '▶ Listen to TTS Pronunciation';
                playBtn.classList.remove('playing');
            };

            utterance.onerror = (e) => {
                if (e.error === 'canceled' || e.error === 'interrupted') return;
                console.warn("Speech synthesis error", e);
                playBtn.innerHTML = '▶ Listen to TTS Pronunciation';
                playBtn.classList.remove('playing');
            };

            setTimeout(() => {
                window.speechSynthesis.speak(utterance);
            }, 50);
        });
    }
});