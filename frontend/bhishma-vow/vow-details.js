/**
 * Vow Details Module
 */

function initVowDetails() {
    console.log("Vow details module initialized.");
    const vowSection = document.getElementById('the-vow');
    if (vowSection) {
        vowSection.setAttribute('data-vow-type', 'bhishma-pratigya');
    }
}

window.initVowDetails = initVowDetails;
