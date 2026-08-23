/* ==========================================================================
   PANCHGANGA GHAT — INTERACTIVE SCRIPT
   Handles interactive tabs, ambient five-river soundscape, knowledge quiz,
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
            soundBtn.innerHTML = '<span>⏸️</span> Pause Confluence Soundscape';
            if (soundStatus) soundStatus.textContent = 'Playing mystical five-stream flowing water & acoustic conch drone...';
        } else {
            stopAmbientAudio();
            isPlayingSound = false;
            soundBtn.innerHTML = '<span>🔊</span> Play Panchganga Confluence Soundscape';
            if (soundStatus) soundStatus.textContent = 'Click play to experience gentle river resonance and acoustic conch shell harmonics.';
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

        // Multi-frequency noise generator for turbulent multi-river confluence
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
            output[i] *= 0.028;
            b6 = white * 0.115926;
        }

        const whiteNoise = audioContext.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 460;

        // Conch Shell / Shankha Harmonic Drone (F#3 / 185 Hz & C#4 / 277.18 Hz)
        const conchFundamental = audioContext.createOscillator();
        conchFundamental.type = 'sine';
        conchFundamental.frequency.setValueAtTime(185.00, audioContext.currentTime);

        const conchHarmonic = audioContext.createOscillator();
        conchHarmonic.type = 'sine';
        conchHarmonic.frequency.setValueAtTime(277.18, audioContext.currentTime);

        const droneGain = audioContext.createGain();
        droneGain.gain.setValueAtTime(0.03, audioContext.currentTime);

        whiteNoise.connect(filter);
        filter.connect(audioContext.destination);

        conchFundamental.connect(droneGain);
        conchHarmonic.connect(droneGain);
        droneGain.connect(audioContext.destination);

        whiteNoise.start();
        conchFundamental.start();
        conchHarmonic.start();

        window._panchgangaNodes = { whiteNoise, conchFundamental, conchHarmonic };
    } catch (e) {
        console.warn('Web Audio API not supported or blocked:', e);
    }
}

function stopAmbientAudio() {
    if (window._panchgangaNodes) {
        try {
            window._panchgangaNodes.whiteNoise.stop();
            window._panchgangaNodes.conchFundamental.stop();
            window._panchgangaNodes.conchHarmonic.stop();
        } catch (e) {
            // Safe cleanup
        }
        window._panchgangaNodes = null;
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
                    b.classList.remove('correct');
                }
            });

            if (isCorrect) {
                btn.classList.add('correct');
                feedback.innerHTML = '<span style="color: #16a34a;">🎉 Correct! Sant Kabir was initiated by Swami Ramananda on the stone steps of Panchganga Ghat.</span>';
            } else {
                btn.classList.add('incorrect');
                feedback.innerHTML = '<span style="color: #dc2626;">❌ Incorrect! The correct answer is <strong>Sant Kabir</strong>, who received the sacred Ram mantra here.</span>';
            }
        });
    });
}

/* ---------- 4. Theme Toggle ---------- */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeBtn.textContent = '🌙';
    } else {
        document.body.classList.remove('light-theme');
        themeBtn.textContent = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeBtn.textContent = isLight ? '🌙' : '☀️';
    });
}
