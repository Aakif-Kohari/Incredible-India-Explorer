/**
 * Police Medal for Gallantry Explorer JS
 */

document.addEventListener('DOMContentLoaded', () => {
    initShareButton();
});

function initShareButton() {
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    text: 'Explore the Police Medal for Gallantry - honoring exceptional courage and bravery.',
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
