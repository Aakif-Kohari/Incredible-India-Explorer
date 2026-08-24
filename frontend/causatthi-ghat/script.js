/* ==========================================================================
   CAUSATTHI GHAT — INTERACTIVE SCRIPT
   Handles interactive tabs, ambient Shakta Ganga soundscape, knowledge quiz,
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
            soundBtn.innerHTML = '<span>⏸️</span> Pause Ambient River & Temple Audio';
            if (soundStatus) soundStatus.textContent = 'Playing ambient Ganga water ripples & Shakta temple bell chimes...';
        } else {
            stopAmbientAudio();
            isPlayingSound = false;
            soundBtn.innerHTML = '<span>🔊</span> Play Ambient Temple Soundscape';
            if (soundStatus) soundStatus.textContent = 'Click play to hear river currents and resonant temple bells of Chausath Yogini.';
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

        // Pink noise generator for gentle water ripples
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
            output[i] *= 0.03; // Gentle volume
            b6 = white * 0.115926;
        }

        const whiteNoise = audioContext.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 460;

        // Resonant temple gong / bell tone simulator (A4 pitch - 440Hz)
        const bellOsc = audioContext.createOscillator();
        bellOsc.type = 'sine';
        bellOsc.frequency.value = 440;

        const bellGain = audioContext.createGain();
        bellGain.gain.value = 0.01;

        whiteNoise.connect(filter);
        filter.connect(audioContext.destination);

        bellOsc.connect(bellGain);
        bellGain.connect(audioContext.destination);

        whiteNoise.start();
        bellOsc.start();

        window.ambientNodes = { whiteNoise, bellOsc };
    } catch (e) {
        console.warn('Web Audio API not supported or blocked:', e);
    }
}

function stopAmbientAudio() {
    if (window.ambientNodes) {
        try {
            window.ambientNodes.whiteNoise.stop();
            window.ambientNodes.bellOsc.stop();
        } catch (e) {}
    }
}

/* ---------- 3. Interactive Knowledge Quiz ---------- */
function initQuiz() {
    const quizOptBtns = document.querySelectorAll('.quiz-opt-btn');
    const feedbackEl = document.getElementById('quizFeedback');

    quizOptBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isCorrect = btn.getAttribute('data-correct') === 'true';

            quizOptBtns.forEach(b => {
                b.classList.remove('correct', 'wrong');
                b.disabled = true;
            });

            if (isCorrect) {
                btn.classList.add('correct');
                if (feedbackEl) {
                    feedbackEl.style.display = 'block';
                    feedbackEl.style.color = 'var(--primary-color)';
                    feedbackEl.innerHTML = '✨ Correct! According to the Skanda Purana, Lord Shiva sent the 64 Yoginis to King Divodasa\'s Kashi, but they were so enchanted by the city\'s spiritual beauty that they chose to permanently settle here at Causatthi Ghat.';
                }
            } else {
                btn.classList.add('wrong');
                quizOptBtns.forEach(b => {
                    if (b.getAttribute('data-correct') === 'true') {
                        b.classList.add('correct');
                    }
                });
                if (feedbackEl) {
                    feedbackEl.style.display = 'block';
                    feedbackEl.style.color = '#ef4444';
                    feedbackEl.innerHTML = '❌ Incorrect. The 64 Yoginis settled at Causatthi Ghat after being sent by Lord Shiva during the reign of King Divodasa.';
                }
            }
        });
    });
}

/* ---------- 4. Theme Toggle Support ---------- */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    const isLight = document.body.classList.contains('light-theme');
    themeBtn.textContent = isLight ? '🌙' : '☀️';

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const nowLight = document.body.classList.contains('light-theme');
        themeBtn.textContent = nowLight ? '🌙' : '☀️';
        localStorage.setItem('theme', nowLight ? 'light' : 'dark');
    });
}
