const halbiVocab = [
    {
        english: "Hello / Greetings",
        halbi: "Johar",
        script: "जोहार",
        pronunciation: "Johar"
    },
    {
        english: "Water",
        halbi: "Pani",
        script: "पानी",
        pronunciation: "Pani"
    },
    {
        english: "Rice",
        halbi: "Bhat",
        script: "भात",
        pronunciation: "Bhaat"
    },
    {
        english: "House",
        halbi: "Ghar",
        script: "घर",
        pronunciation: "Ghar"
    },
    {
        english: "Mother",
        halbi: "Mai",
        script: "माई",
        pronunciation: "Ma-i"
    },
    {
        english: "Elder Brother",
        halbi: "Dada",
        script: "दादा",
        pronunciation: "Dada"
    },
    {
        english: "Forest",
        halbi: "Jangal",
        script: "जंगल",
        pronunciation: "Jangal"
    },
    {
        english: "Village",
        halbi: "Gaon",
        script: "गाँव",
        pronunciation: "Gaon"
    },
    {
        english: "Food",
        halbi: "Khana",
        script: "खाना",
        pronunciation: "Khana"
    },
    {
        english: "Child",
        halbi: "Baccha",
        script: "बच्चा",
        pronunciation: "Baccha"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('vocab-grid');
    let synth = window.speechSynthesis;

    // Generate Cards
    halbiVocab.forEach((word) => {
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
                    <div class="word-kurmali">${word.halbi}</div> <!-- Kept class name for generic styling -->
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
