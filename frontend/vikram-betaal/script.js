const tales = {
    "1": {
        title: "Tale 1: The Dilemma of True Bravery",
        characters: "Characters: King Yasahketu, his beautiful daughter, a brave commoner youth, and a ferocious wild beast.",
        summary: "A terrifying wild beast menaces a royal city. The King declares that whoever slays the beast will win his daughter's hand in marriage. A brave young commoner risks his life and slays the beast. However, during the intense battle, a royal guard captain hides in fear. Once the beast falls, the guard captain emerges, steals the beast's severed head, rushes to the palace, and claims credit for the kill. The King discovers the true commoner hero before the wedding.",
        riddle: "Tell me, O Wise King, who displayed the truest bravery here—the commoner who fought for love and honor, or the guard captain who successfully manipulated the situation?",
        judgment: "The guard captain displayed no courage. The commoner fought bravely, but he was driven by a great reward—the princess's hand. The truest bravery was shown by the commoner's loyal friend, who stood by his side to protect him throughout the fight without asking for any reward, title, or recognition.",
        outcome: "As soon as King Vikramaditya speaks this profound judgment, Betaal breaks into a loud laugh and flies right back to his banyan tree."
    },
    "2": {
        title: "Tale 2: The Three Fastidious Brothers",
        characters: "Characters: Three hyper-sensitive brothers, a local landlord, and a community council.",
        summary: "Three brothers possess miraculous, hyper-sensitive senses. The first brother can detect a single grain of bad rice at the bottom of a massive feast pot. The second brother can smell the exact flower from which a lady's perfume was made from miles away. The third brother can sleep on a stack of seven soft mattresses and wake up bruised because a single strand of hair was caught under the very bottom mattress.",
        riddle: "Who among these three hyper-sensitive brothers is the most genuinely delicate and refined?",
        judgment: "The first two brothers rely on learned skills of culinary selection and perfumery. The third brother, whose body naturally bruised from a hidden strand of hair through seven layers of mattresses, is the only one whose fastidiousness is an inherent, unfeigned physical reality. He is the most delicate.",
        outcome: "The riddle is solved, the silence is broken, and Betaal escapes once more."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('riddle-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.getElementById('close-modal');
    const nodes = document.querySelectorAll('.tale-node');

    function openModal(taleId) {
        const tale = tales[taleId];
        if (!tale) return;

        modalBody.innerHTML = `
            <h2 class="tale-story-title">${tale.title}</h2>
            <p class="characters">${tale.characters}</p>
            <p>${tale.summary}</p>
            <div class="betaal-riddle">
                <strong>Betaal's Riddle:</strong><br>
                <em>"${tale.riddle}"</em>
            </div>
            <button id="reveal-judgment" class="judgment-btn">Speak Vikramaditya's Judgment</button>
            <div id="judgment-container" class="vikram-judgment">
                <strong>Vikramaditya’s Judgment:</strong>
                <p>"${tale.judgment}"</p>
                <div class="outcome">▶ ${tale.outcome}</div>
            </div>
        `;

        modal.classList.remove('hidden');

        document.getElementById('reveal-judgment').addEventListener('click', function() {
            this.style.display = 'none';
            document.getElementById('judgment-container').classList.add('visible');
        });
    }

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            const taleId = node.getAttribute('data-tale');
            openModal(taleId);
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});
