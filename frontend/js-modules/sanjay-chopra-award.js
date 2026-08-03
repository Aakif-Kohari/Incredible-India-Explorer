/**
 * Sanjay Chopra Award Explorer JS
 */

document.addEventListener('DOMContentLoaded', () => {
    initFaqAccordion();
    initShareButton();
});

function initFaqAccordion() {
    const acc = document.getElementsByClassName("faq-btn");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
}

function initShareButton() {
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    text: 'Explore the Sanjay Chopra Award - honoring exceptional courage and bravery of children.',
                    url: window.location.href,
                })
                .catch((error) => console.log('Error sharing', error));
            } else {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Link copied to clipboard!');
                });
            }
        });
    }
}
