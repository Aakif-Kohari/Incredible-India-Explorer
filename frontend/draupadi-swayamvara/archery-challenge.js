/**
 * Archery Challenge Module
 */

const CHALLENGE_STEPS = [

    {
        step: 1,
        title: "The Heavy Bow",
        description: "A massive, ancient bow, said to be too heavy and stiff for ordinary men to even lift, was placed in the center of the assembly."
    },

    {
        step: 2,
        title: "The Stringing",
        description: "The first test was to simply string the bow. Many mighty kings and warriors attempted this and failed, exhausting themselves."
    },

    {
        step: 3,
        title: "The Rotating Target",
        description: "Above the assembly, a mechanical fish (Yantra) was set to rotate rapidly. The archer had to look only at the reflection of the target in a pool of oil below, not at the target directly."
    },

    {
        step: 4,
        title: "The Five Arrows",
        description: "The final, impossible feat: string the bow, take five arrows, and shoot them in rapid succession to pierce the eye of the rotating fish."
    }

];

function renderArcheryChallenge() {

    const container = document.getElementById('challenge-details');

    if (!container) return;

    container.innerHTML = CHALLENGE_STEPS.map(step => `
        <div class="challenge-step">
            <div class="step-number">${step.step}</div>
            <h4>${step.title}</h4>
            <p>${step.description}</p>
        </div>
    `).join('');

}

window.renderArcheryChallenge = renderArcheryChallenge;
