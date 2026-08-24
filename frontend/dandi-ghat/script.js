/* ==========================================================================
   DANDI GHAT — INTERACTIVE SCRIPT
   Handles tab switching, ambient soundscape toggle, interactive quiz,
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

            // Deactivate all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Activate target
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
            soundBtn.innerHTML = '<span>⏸️</span> Pause Ambient River Soundscape';
            if (soundStatus) soundStatus.textContent = 'Playing peaceful ambient Ganga water ripples & soft meditative tone...';
        } else {
            stopAmbientAudio();
            isPlayingSound = false;
            soundBtn.innerHTML = '<span>🔊</span> Play Ambient Ganga Soundscape';
            if (soundStatus) soundStatus.textContent = 'Click play to hear serene river ripples and meditative Ganga ambience.';
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

        // Lowpass filter for water sound
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 450;

        // Gentle drone oscillator for meditative vibe (Tanpura / Om hum)
        const droneOsc = audioContext.createOscillator();
        droneOsc.type = 'sine';
        droneOsc.frequency.value = 136.1; // OM Frequency (C3#)

        const droneGain = audioContext.createGain();
        droneGain.gain.value = 0.015;

        whiteNoise.connect(filter);
        filter.connect(audioContext.destination);

        droneOsc.connect(droneGain);
        droneGain.connect(audioContext.destination);

        whiteNoise.start();
        droneOsc.start();

        window.ambientNodes = { whiteNoise, droneOsc };
    } catch (e) {
        console.warn('Web Audio API not supported or blocked:', e);
    }
}

function stopAmbientAudio() {
    if (window.ambientNodes) {
        try {
            window.ambientNodes.whiteNoise.stop();
            window.ambientNodes.droneOsc.stop();
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

            // Reset all buttons in this container
            quizOptBtns.forEach(b => {
                b.classList.remove('correct', 'wrong');
                b.disabled = true;
            });

            if (isCorrect) {
                btn.classList.add('correct');
                if (feedbackEl) {
                    feedbackEl.style.display = 'block';
                    feedbackEl.style.color = 'var(--ganga-teal)';
                    feedbackEl.innerHTML = '✨ Correct! Dandi Sannyasis belong to the Advaita Vedanta tradition organized by Adi Shankaracharya and carry the sacred wooden staff (danda).';
                }
            } else {
                btn.classList.add('wrong');
                // Highlight correct one
                quizOptBtns.forEach(b => {
                    if (b.getAttribute('data-correct') === 'true') {
                        b.classList.add('correct');
                    }
                });
                if (feedbackEl) {
                    feedbackEl.style.display = 'block';
                    feedbackEl.style.color = '#ef4444';
                    feedbackEl.innerHTML = '❌ Incorrect. Dandi Ghat is dedicated to the Dandi Sannyasis of Adi Shankaracharya\'s Dashanami order, carrying the sacred wooden danda.';
                }
            }
        });
    });
}

/* ---------- 4. Theme Toggle Support ---------- */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    // Set initial icon
    const isLight = document.body.classList.contains('light-theme');
    themeBtn.textContent = isLight ? '🌙' : '☀️';

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const nowLight = document.body.classList.contains('light-theme');
        themeBtn.textContent = nowLight ? '🌙' : '☀️';
        localStorage.setItem('theme', nowLight ? 'light' : 'dark');
    });
}
