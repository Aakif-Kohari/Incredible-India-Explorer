/* script.js */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Timeline Data
    const timelineData = [
        {
            year: "1847",
            title: "Birth",
            description: "Born Annie Wood on October 1 in London, England."
        },
        {
            year: "1867",
            title: "Marriage",
            description: "Married clergyman Frank Besant; the couple later separated over her growing religious and political independence."
        },
        {
            year: "1889",
            title: "Turn to Theosophy",
            description: "Joined the Theosophical Society after reviewing H.P. Blavatsky's 'The Secret Doctrine', beginning her lifelong spiritual engagement with India."
        },
        {
            year: "1893",
            title: "Arrival in India",
            description: "Travelled to India for the first time as a leader of the Theosophical Society, and later settled at its headquarters in Adyar, Madras."
        },
        {
            year: "1898",
            title: "Central Hindu College",
            description: "Founded the Central Hindu College in Banaras, which later formed the nucleus of Banaras Hindu University."
        },
        {
            year: "1907",
            title: "Theosophical Society President",
            description: "Elected President of the Theosophical Society, a position she held until her death."
        },
        {
            year: "1916",
            title: "All India Home Rule League",
            description: "Founded the All India Home Rule League at Madras on 1 September, campaigning for dominion status for India through her newspapers and public meetings."
        },
        {
            year: "1917",
            title: "Internment & Congress Presidency",
            description: "Interned by the Madras government under the Defence of India Act in June; released in September amid nationwide protest, and elected the first woman President of the Indian National Congress in December."
        },
        {
            year: "1920",
            title: "Break with Congress Strategy",
            description: "Opposed Gandhi's Non-Cooperation and Satyagraha campaign at the Congress session, a stance that saw her political influence decline."
        },
        {
            year: "1933",
            title: "Death",
            description: "Passed away on September 20 at Adyar, Madras, where she had lived for much of her adult life."
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


    // 2. Home Rule Movement Contributions
    const movementData = [
        {
            title: "All India Home Rule League",
            desc: "Founded at Madras on 1 September 1916, growing to roughly 200 branches across most of India, working alongside Tilak's separate Home Rule League in Maharashtra."
        },
        {
            title: "Uniting Moderates & Extremists",
            desc: "Worked to bring Congress Moderates, Extremists, and the Muslim League behind a shared demand for self-government, helping revive nationalist politics after a period of inactivity."
        },
        {
            title: "Mass Public Campaigning",
            desc: "Toured extensively delivering public lectures and organizing meetings and conferences to build political awareness in areas like Sindh, Punjab, Gujarat, Bihar, and the United Provinces."
        },
        {
            title: "Congress Presidency",
            desc: "Elected President of the Indian National Congress in December 1917 — the first woman to hold the position — following the wave of sympathy after her internment."
        }
    ];

    const movementContainer = document.getElementById('movement-container');
    if (movementContainer) {
        movementData.forEach(item => {
            const el = document.createElement('div');
            el.className = 'contribution-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            `;
            movementContainer.appendChild(el);
        });
    }

    // 3. Publications Data
    const publicationsData = [
        {
            name: "New India",
            lang: "English",
            desc: "A daily newspaper Besant used as the primary mouthpiece of the Home Rule Movement, campaigning for Indian self-government and later banned during her 1917 internment."
        },
        {
            name: "Commonweal",
            lang: "English",
            desc: "A Madras-based weekly journal that carried her political writings and helped spread the case for Home Rule to a wider audience."
        }
    ];

    const publicationsContainer = document.getElementById('publications-container');
    if (publicationsContainer) {
        publicationsData.forEach(item => {
            const el = document.createElement('div');
            el.className = 'newspaper-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <div class="newspaper-name">${item.name}</div>
                <div class="newspaper-lang">${item.lang}</div>
                <p>${item.desc}</p>
            `;
            publicationsContainer.appendChild(el);
        });
    }

    // 4. Gallery Data
    const galleryData = [
        {
            caption: "Annie Besant addressing a public meeting during the Home Rule campaign",
            alt: "Annie Besant speaking to a crowd at a public political meeting"
        },
        {
            caption: "The Theosophical Society headquarters at Adyar, Madras, where Besant lived and worked",
            alt: "Historic buildings and gardens of the Theosophical Society campus at Adyar"
        },
        {
            caption: "Central Hindu College, Banaras, founded by Besant in 1898",
            alt: "Facade of the historic Central Hindu College building in Banaras"
        },
        {
            caption: "A copy of New India, the newspaper Besant used to campaign for Home Rule",
            alt: "Front page of a historic English-language Indian newspaper"
        }
    ];

    const galleryContainer = document.getElementById('gallery-container');
    if (galleryContainer) {
        galleryData.forEach(item => {
            const el = document.createElement('figure');
            el.className = 'gallery-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <div class="gallery-placeholder" role="img" aria-label="${item.alt}">🖼️</div>
                <figcaption>${item.caption}</figcaption>
            `;
            galleryContainer.appendChild(el);
        });
    }

    // 5. Legacy Data
    const legacyText = "Annie Besant is remembered as a rare figure who bridged the Moderate and Extremist eras of Indian nationalism and helped set the stage for the mass movements of the Gandhian period that followed. Her internment in 1917 turned public opinion sharply in favour of self-government, and her election as the first woman President of the Indian National Congress remains a landmark in the movement's history. Though her later opposition to Gandhi's methods cost her influence, her decades of work in education, journalism, and political organizing left a lasting mark on India's path to independence.";
    const legacyContainer = document.getElementById('legacy-container');
    if (legacyContainer) {
        legacyContainer.innerHTML = `<div class="content-card" tabindex="0"><p>${legacyText}</p></div>`;
    }

    // 6. References Data
    const referencesData = [
        { text: "Indian National Congress — Annie Besant, Past Party Presidents", link: "https://inc.in/leadership/past-party-presidents/annie-besant" },
        { text: "Wikipedia — Annie Besant", link: "https://en.wikipedia.org/wiki/Annie_Besant" },
        { text: "Wikipedia — Indian Home Rule Movement", link: "https://en.wikipedia.org/wiki/Indian_Home_Rule_movement" },
        { text: "1914-1918-Online: International Encyclopedia of the First World War — Besant, Annie", link: "https://encyclopedia.1914-1918-online.net/article/besant-annie/" }
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