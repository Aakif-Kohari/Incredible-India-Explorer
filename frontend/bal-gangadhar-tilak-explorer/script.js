/* script.js */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Timeline Data
    const timelineData = [
        {
            year: "1856",
            title: "Birth",
            description: "Born on July 23 in Ratnagiri, Maharashtra."
        },
        {
            year: "1884",
            title: "Deccan Education Society",
            description: "Co-founded the Deccan Education Society to teach nationalist ideas to the youth."
        },
        {
            year: "1890",
            title: "Indian National Congress",
            description: "Joined the Indian National Congress and soon became a strong critic of its moderate policies."
        },
        {
            year: "1893-1895",
            title: "Public Festivals",
            description: "Popularized the Ganesh Chaturthi (1893) and Shivaji Utsav (1895) to build national spirit beyond the educated elite."
        },
        {
            year: "1908",
            title: "Sedition & Imprisonment",
            description: "Sentenced to six years of imprisonment in Mandalay, Burma, for his writings in Kesari defending revolutionaries."
        },
        {
            year: "1916",
            title: "Home Rule League",
            description: "Founded the All India Home Rule League, demanding self-government for India."
        },
        {
            year: "1920",
            title: "Death",
            description: "Passed away on August 1. His death was mourned by millions, marking the end of an era."
        }
    ];

    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) {
        timelineData.forEach(item => {
            const el = document.createElement('div');
            el.className = 'timeline-item';
            el.tabIndex = 0;
            el.innerHTML = `
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            timelineContainer.appendChild(el);
        });
    }

    // Timeline Animation Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));


    // 2. Political Contributions
    const contributionsData = [
        {
            title: "Nationalist Politics",
            desc: "Shifted the political discourse from petitions and prayers to assertive demands for rights."
        },
        {
            title: "Swadeshi Movement",
            desc: "A strong proponent of the Swadeshi (indigenous goods) movement and boycott of foreign goods following the 1905 Bengal partition."
        },
        {
            title: "Public Mobilization",
            desc: "Pioneered the use of mass mobilization through cultural festivals, transforming nationalism into a grassroots movement."
        },
        {
            title: "Home Rule Movement",
            desc: "Unified factions of the Congress and led the Home Rule Movement to demand dominion status for India."
        }
    ];

    const contributionsContainer = document.getElementById('contributions-container');
    if (contributionsContainer) {
        contributionsData.forEach(item => {
            const el = document.createElement('div');
            el.className = 'contribution-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            `;
            contributionsContainer.appendChild(el);
        });
    }

    // 3. Newspapers Data
    const newspapersData = [
        {
            name: "Kesari",
            lang: "Marathi",
            desc: "A daily newspaper used as a mouthpiece for the Indian national freedom movement, heavily critical of British policies."
        },
        {
            name: "The Mahratta",
            lang: "English",
            desc: "An English weekly aimed at a broader Indian and international audience, disseminating nationalist ideology."
        }
    ];

    const newspapersContainer = document.getElementById('newspapers-container');
    if (newspapersContainer) {
        newspapersData.forEach(item => {
            const el = document.createElement('div');
            el.className = 'newspaper-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <div class="newspaper-name">${item.name}</div>
                <div class="newspaper-lang">${item.lang}</div>
                <p>${item.desc}</p>
            `;
            newspapersContainer.appendChild(el);
        });
    }

    // 4. Legacy Data
    const legacyText = "Tilak was famously called 'The Father of the Indian Unrest' by British author Valentine Chirol. Mahatma Gandhi referred to him as 'The Maker of Modern India'. His uncompromising stance on Swaraj laid the foundation for the mass movements that would eventually lead to India's independence.";
    const legacyContainer = document.getElementById('legacy-container');
    if (legacyContainer) {
        legacyContainer.innerHTML = `<div class="content-card" tabindex="0"><p>${legacyText}</p></div>`;
    }

    // 5. References Data
    const referencesData = [
        { text: "National Archives of India - Records on Bal Gangadhar Tilak", link: "#" },
        { text: "Bal Gangadhar Tilak: His Writings and Speeches - Academic Publication", link: "#" },
        { text: "Deccan Education Society Archives", link: "#" }
    ];

    const refContainer = document.getElementById('references-container');
    if (refContainer) {
        referencesData.forEach(item => {
            const el = document.createElement('li');
            el.innerHTML = item.link !== '#' 
                ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.text}</a>` 
                : `<span>${item.text}</span>`;
            refContainer.appendChild(el);
        });
    }

});
