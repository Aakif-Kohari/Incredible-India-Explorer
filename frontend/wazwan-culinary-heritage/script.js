document.addEventListener('DOMContentLoaded', () => {
    const traamiParts = document.querySelectorAll('.traami-part');
    const detailsContainer = document.getElementById('traami-details');

    const itemData = {
        'rice': {
            title: '🍚 The Rice Bed (Base)',
            desc: 'The foundation of the entire meal. A large mound of fragrant Kashmiri basmati rice is spread across the Traami platter, which four guests will share simultaneously.'
        },
        'methimaaz': {
            title: '🌿 Methi Maaz (Corner)',
            desc: 'Chopped mutton tripe cooked with fresh fenugreek leaves. It is placed on one quadrant of the rice bed to kick off the feast.'
        },
        'tabakmaaz': {
            title: '🥩 Tabak Maaz (Corner)',
            desc: 'Crispy fried mutton ribs. Served as one of the essential dry starters decorating the perimeter of the rice.'
        },
        'seekh': {
            title: '🍢 Seekh Kababs (Corner)',
            desc: 'Long, minced mutton kababs cut in half and distributed around the edges of the Traami for the guests to share.'
        },
        'kokur': {
            title: '🍗 Waza Kokur (Corner)',
            desc: 'A chicken preparation, usually deep-fried or simmered in saffron broth, completing the dry/starting corner courses.'
        },
        'gravy': {
            title: '🍲 The Gravy Progression',
            desc: 'After the initial dry courses are consumed, the Waza continuously serves a hot progression of rich, aromatic gravies (like Roganjosh and Gushtaba) directly onto the center of the shared rice pile.'
        }
    };

    traamiParts.forEach(part => {
        part.addEventListener('click', () => {
            // Remove active from all
            traamiParts.forEach(p => p.classList.remove('active'));
            
            // Add active to clicked
            part.classList.add('active');
            
            // Update details
            const itemKey = part.getAttribute('data-item');
            const data = itemData[itemKey];
            
            if(data) {
                detailsContainer.innerHTML = `
                    <h3>${data.title}</h3>
                    <p>${data.desc}</p>
                `;
            }
        });

        // Keyboard accessibility
        part.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                part.click();
            }
        });
    });
});
