/* ==========================================================================
   CHET SINGH GHAT — INTERACTIVE SCRIPT
   Handles interactive tabs, ambient fortified river soundscape, knowledge quiz,
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
            soundBtn.innerHTML = '<span>⏸️</span> Pause Citadel Audio';
            if (soundStatus) soundStatus.textContent = 'Playing ambient Ganges water lapping against stone bastions & soft traditional drums...';
        } else {
            stopAmbientAudio();
            isPlayingSound = false;
            soundBtn.innerHTML = '<span>🔊</span> Play Chet Singh Ghat Soundscape';
            if (soundStatus) soundStatus.textContent = 'Click play to experience ambient Ganges water lapping against the stone bastions paired with rhythmic traditional percussion.';
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
            output[i] *= 0.032;
            b6 = white * 0.115926;
        }

        const whiteNoise = audioContext.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 420;

        // Fortified Drum / Drone Resonance (D2 / 73.42 Hz & A2 / 110.00 Hz)
        const fortRoot = audioContext.createOscillator();
        fortRoot.type = 'triangle';
        fortRoot.frequency.setValueAtTime(73.42, audioContext.currentTime);

        const fortFifth = audioContext.createOscillator();
        fortFifth.type = 'sine';
        fortFifth.frequency.setValueAtTime(110.00, audioContext.currentTime);

        const fortGain = audioContext.createGain();
        fortGain.gain.setValueAtTime(0.04, audioContext.currentTime);

        whiteNoise.connect(filter);
        filter.connect(audioContext.destination);

        fortRoot.connect(fortGain);
        fortFifth.connect(fortGain);
        fortGain.connect(audioContext.destination);

        whiteNoise.start();
        fortRoot.start();
        fortFifth.start();

        window._chetSinghNodes = { whiteNoise, fortRoot, fortFifth };
    } catch (e) {
        console.warn('Web Audio API not supported or blocked:', e);
    }
}

function stopAmbientAudio() {
    if (window._chetSinghNodes) {
        try {
            window._chetSinghNodes.whiteNoise.stop();
            window._chetSinghNodes.fortRoot.stop();
            window._chetSinghNodes.fortFifth.stop();
        } catch (e) {
            // Safe cleanup
        }
        window._chetSinghNodes = null;
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
                feedback.innerHTML = '🎉 <strong>Correct!</strong> In August 1781, Raja Chet Singh\'s forces revolted against Warren Hastings, forcing Hastings to flee Varanasi to Chunar.';
                feedback.style.color = '#059669';
                feedback.style.backgroundColor = 'rgba(5, 150, 105, 0.1)';
            } else {
                feedback.innerHTML = '❌ <strong>Incorrect!</strong> The historic Benaras uprising occurred at Chet Singh Ghat in <strong>1781 CE</strong>.';
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
