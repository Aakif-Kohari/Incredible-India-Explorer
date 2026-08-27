/**
 * Characters Module
 * Documents the major figures involved in the Chakravyuha episode.
 */

const CHARACTERS_DATA = [
    {
        name: "Abhimanyu",
        role: "The Protagonist",
        initial: "A",
        description: "The 16-year-old son of Arjuna and Subhadra. A master archer who bravely breached the Chakravyuha but was tragically killed due to a violation of war ethics."
    },
    {
        name: "Arjuna",
        role: "Father & Greatest Warrior",
        initial: "Ar",
        description: "The third Pandava brother and Abhimanyu's father. He was the only one who knew the full secret of the Chakravyuha but was deliberately lured away from the battlefield."
    },
    {
        name: "Jayadratha",
        role: "The Blockade",
        initial: "J",
        description: "The king of Sindhu and Duryodhana's brother-in-law. He used a divine boon to single-handedly hold back the entire Pandava army, trapping Abhimanyu inside."
    },
    {
        name: "Dronacharya",
        role: "The Commander",
        initial: "D",
        description: "The royal guru of both the Pandavas and Kauravas. He designed the Chakravyuha formation and led the Kaurava forces on the 13th day."
    },
    {
        name: "Karna",
        role: "The Rival",
        initial: "K",
        description: "The greatest archer rival to Arjuna. He participated in the group attack on Abhimanyu, contributing to the breaking of the young warrior's bow."
    },
    {
        name: "Krishna",
        role: "The Divine Guide",
        initial: "K",
        description: "Abhimanyu's maternal uncle. Though he did not intervene to save his nephew, his presence and later guidance ensured that justice was served through Arjuna's actions."
    }
];

/**
 * Renders the character cards into the DOM.
 */
function renderCharacters() {
    const charactersContainer = document.getElementById('characters-grid');
    if (!charactersContainer) return;

    charactersContainer.innerHTML = CHARACTERS_DATA.map(char => `
        <div class="character-card">
            <div class="character-avatar">${char.initial}</div>
            <h4>${char.name}</h4>
            <div class="role">${char.role}</div>
            <p>${char.description}</p>
        </div>
    `).join('');
}

window.renderCharacters = renderCharacters;
