/* ==========================================================================
   MANASAROVAR GHAT — INTERACTIVE SCRIPT
   Handles interactive tabs, ambient Himalayan river soundscape, knowledge quiz,
   and theme switching logic.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initSoundscape();
    initQuiz();
    initThemeToggle();
});

/* ---------- 1. Interactive Tabs ---------- */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/* ---------- 2. Ambient Soundscape Audio ---------- */
let audioContext = null;
let isPlayingSound = false;

function initSoundscape() {
    const soundBtn = document.getElementById('soundToggleBtn');
    const soundStatus = document.getElementById('soundStatus');

    if (!soundBtn) return;

    soundBtn.addEventListener('click', () => {
        if (!isPlayingSound) {
            startAmbientAudio();
            isPlayingSound = true;
            soundBtn.innerHTML = '<span>⏸️</span> Pause Himalayan Audio';
            if (soundStatus) soundStatus.textContent = 'Playing tranquil Ganga water lapping & soft Himalayan flute drone...';
        } else {
            stopAmbientAudio();
            isPlayingSound = false;
            soundBtn.innerHTML = '<span>🔊</span> Play Manasarovar Ghat Soundscape';
            if (soundStatus) soundStatus.textContent = 'Click play to experience tranquil river water lapping against the stone steps paired with meditative Himalayan flute harmonics.';
        }
    });
}

function startAmbientAudio() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!audioContext) {
            audioContext = new AudioCtx();
        } else if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        // River water noise generator
        const bufferSize = audioContext.sampleRate * 2;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            output[i] *= 0.025;
            b6 = white * 0.115926;
        }

        const whiteNoise = audioContext.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 520;

        // Meditative Himalayan Flute / Drone Resonance (E3 / 164.81 Hz & B3 / 246.94 Hz)
        const fluteRoot = audioContext.createOscillator();
        fluteRoot.type = 'sine';
        fluteRoot.frequency.setValueAtTime(164.81, audioContext.currentTime);

        const fluteFifth = audioContext.createOscillator();
        fluteFifth.type = 'sine';
        fluteFifth.frequency.setValueAtTime(246.94, audioContext.currentTime);

        const fluteGain = audioContext.createGain();
        fluteGain.gain.setValueAtTime(0.03, audioContext.currentTime);

        whiteNoise.connect(filter);
        filter.connect(audioContext.destination);

        fluteRoot.connect(fluteGain);
        fluteFifth.connect(fluteGain);
        fluteGain.connect(audioContext.destination);

        whiteNoise.start();
        fluteRoot.start();
        fluteFifth.start();

        window._manasarovarNodes = { whiteNoise, fluteRoot, fluteFifth };
    } catch (e) {
        console.warn('Web Audio API not supported or blocked:', e);
    }
}

function stopAmbientAudio() {
    if (window._manasarovarNodes) {
        try {
            window._manasarovarNodes.whiteNoise.stop();
            window._manasarovarNodes.fluteRoot.stop();
            window._manasarovarNodes.fluteFifth.stop();
        } catch (e) {
            // Safe cleanup
        }
        window._manasarovarNodes = null;
    }
    if (audioContext && audioContext.state !== 'closed') {
        audioContext.suspend();
    }
}

/* ---------- 3. Interactive Quiz ---------- */
function initQuiz() {
    const optBtns = document.querySelectorAll('.quiz-opt-btn');
    const feedback = document.getElementById('quizFeedback');

    if (!optBtns.length || !feedback) return;

    optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isCorrect = btn.getAttribute('data-correct') === 'true';

            optBtns.forEach(b => {
                b.disabled = true;
                if (b.getAttribute('data-correct') === 'true') {
                    b.classList.add('correct');
                } else {
                    b.classList.add('wrong');
                }
            });

            if (isCorrect) {
                feedback.innerHTML = '🎉 <strong>Correct!</strong> Raja Man Singh of Amber (Jaipur) built Manasarovar Ghat and its sacred shrines in 1585 CE.';
                feedback.style.color = '#059669';
                feedback.style.backgroundColor = 'rgba(5, 150, 105, 0.1)';
            } else {
                feedback.innerHTML = '❌ <strong>Incorrect!</strong> Manasarovar Ghat was constructed in 1585 CE by <strong>Raja Man Singh of Amber (Jaipur)</strong>.';
                feedback.style.color = '#dc2626';
                feedback.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
            }
        });
    });
}

/* ---------- 4. Dark / Light Theme Toggle ---------- */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    if (!themeBtn) return;

    // Check localStorage preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeBtn.textContent = '🌙';
    } else {
        body.classList.remove('light-theme');
        themeBtn.textContent = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        themeBtn.textContent = isLight ? '🌙' : '☀️';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}
