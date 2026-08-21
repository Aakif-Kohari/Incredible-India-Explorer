const kurmaliVocab = [
    {
        english: "Hello / Greetings",
        kurmali: "Johar",
        script: "जोहार",
        pronunciation: "Johar" // Phonetic approximation for Hindi TTS engine
    },
    {
        english: "Water",
        kurmali: "Pani",
        script: "पानी",
        pronunciation: "Pani"
    },
    {
        english: "Mother",
        kurmali: "Maio",
        script: "माइयो",
        pronunciation: "Ma-i-yo"
    },
    {
        english: "Father",
        kurmali: "Bapa",
        script: "बापा",
        pronunciation: "Baapa"
    },
    {
        english: "House",
        kurmali: "Ghar",
        script: "घर",
        pronunciation: "Ghar"
    },
    {
        english: "Food / Rice",
        kurmali: "Bhat",
        script: "भात",
        pronunciation: "Bhaat"
    },
    {
        english: "How are you?",
        kurmali: "Keson aaha?",
        script: "केसन आहा?",
        pronunciation: "Keson aaha?"
    },
    {
        english: "I am fine.",
        kurmali: "Moi bhal achi.",
        script: "मोइ भाल अछि।",
        pronunciation: "Moi bhal achi."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('vocab-grid');
    let synth = window.speechSynthesis;

    // Generate Cards
    kurmaliVocab.forEach((word, index) => {
        const card = document.createElement('div');
        card.className = 'vocab-card';
        
        card.innerHTML = `
            <div class="card-inner">
                <!-- Front of Card -->
                <div class="card-front">
                    <div class="word-english">${word.english}</div>
                    <div class="click-hint">Click to flip</div>
                </div>
                <!-- Back of Card -->
                <div class="card-back">
                    <div class="word-kurmali">${word.kurmali}</div>
                    <div class="word-script">${word.script}</div>
                    <button class="audio-btn" data-speak="${word.pronunciation}" aria-label="Listen to pronunciation">🔊</button>
                </div>
            </div>
        `;

        // Flip logic
        card.addEventListener('click', (e) => {
            // Prevent flip if clicking audio button
            if (e.target.closest('.audio-btn')) return;
            card.classList.toggle('is-flipped');
        });

        // Audio logic
        const audioBtn = card.querySelector('.audio-btn');
        audioBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent card flip
            const textToSpeak = audioBtn.getAttribute('data-speak');
            
            // Web Speech API
            if (synth.speaking) {
                synth.cancel();
            }

            const utterThis = new SpeechSynthesisUtterance(textToSpeak);
            
            // Try to find a Hindi or Indian English voice for better phonetic accuracy
            const voices = synth.getVoices();
            const hiVoice = voices.find(v => v.lang.includes('hi-IN') || v.lang.includes('hi'));
            if(hiVoice) {
                utterThis.voice = hiVoice;
            }
            
            utterThis.rate = 0.9; // Slightly slower for clarity
            synth.speak(utterThis);
        });

        grid.appendChild(card);
    });
});
