(function () {
    'use strict';

    const services = [
        {
            type: 'ticketing',
            icon: '🎫',
            title: 'Online railway ticketing',
            tag: 'Ticketing',
            text: 'IRCTC brought railway reservation to the web: i-ticketing began in 2002 and e-ticketing followed in 2005.'
        },
        {
            type: 'catering',
            icon: '🍱',
            title: 'Catering & eCatering',
            tag: 'Catering',
            text: 'IRCTC manages railway catering and its eCatering service lets passengers order meals from partner restaurants for delivery during journeys.'
        },
        {
            type: 'tourism',
            icon: '🕌',
            title: 'Tourism & packaged travel',
            tag: 'Tourism',
            text: 'Tourism services include destination packages, pilgrimage journeys, hotels and themed tourist trains such as Bharat Gaurav.'
        },
        {
            type: 'digital',
            icon: '📱',
            title: 'Rail Connect & digital tools',
            tag: 'Digital services',
            text: 'Web and mobile services extend booking, PNR access, booking history and other passenger workflows beyond the station counter.'
        },
        {
            type: 'tourism',
            icon: '🏨',
            title: 'Hotels, retiring rooms & travel',
            tag: 'Tourism',
            text: 'IRCTC connects rail travel with accommodation and other travel services, supporting a broader door-to-destination experience.'
        },
        {
            type: 'catering',
            icon: '🥗',
            title: 'Food on Track',
            tag: 'Catering',
            text: 'The Food on Track experience uses PNR and route information to show available restaurants and meal options at selected stations.'
        }
    ];

    const timeline = [
        {
            year: 1999,
            era: 'foundation',
            title: 'IRCTC is incorporated',
            text: 'Indian Railway Catering and Tourism Corporation is incorporated on 27 September 1999 as an extended arm of Indian Railways.',
            tag: 'Foundation'
        },
        {
            year: 2002,
            era: 'online',
            title: 'Internet i-ticketing begins',
            text: 'IRCTC links the passenger reservation system to a web front-end, moving railway ticket access onto the internet.',
            tag: 'Digital booking'
        },
        {
            year: 2005,
            era: 'online',
            title: 'E-ticketing begins',
            text: 'IRCTC introduces e-ticketing, allowing passengers to reserve without receiving a physical ticket through the delivery channel.',
            tag: 'Paper-light travel'
        },
        {
            year: 2007,
            era: 'online',
            title: 'More channels reach passengers',
            text: 'Railway reservation access expands through additional channels, reinforcing the shift toward distributed passenger services.',
            tag: 'Access'
        },
        {
            year: 2014,
            era: 'ecosystem',
            title: 'eCatering launches',
            text: 'IRCTC eCatering begins its food-on-train journey, allowing passengers to choose meals from partner restaurants and receive them at their journey station.',
            tag: 'Catering + digital'
        },
        {
            year: 2016,
            era: 'modern',
            title: 'IRCTC Air broadens the travel ecosystem',
            text: 'IRCTC enters online air-ticketing, extending its digital travel footprint beyond railway reservations.',
            tag: 'Travel ecosystem'
        },
        {
            year: 2018,
            era: 'modern',
            title: 'Rail Connect receives digital-transformation recognition',
            text: 'The IRCTC Rail Connect mobile app receives a National Award for e-Governance for excellence in government-process re-engineering for digital transformation.',
            tag: 'Recognition'
        },
        {
            year: 2022,
            era: 'modern',
            title: 'eCatering passes 50,000 orders in one day',
            text: 'IRCTC eCatering reports more than 50,000 food orders delivered on 6 August 2022, illustrating the scale of digital meal ordering.',
            tag: 'Scale'
        }
    ];

    const servicesGrid = document.getElementById('services-grid');
    const timelineContainer = document.getElementById('timeline-container');

    function renderServices(filter) {
        const items = filter === 'all' ? services : services.filter(item => item.type === filter);
        servicesGrid.innerHTML = items
            .map(
                item => `
      <article class="service-card">
        <div class="service-icon" aria-hidden="true">${item.icon}</div>
        <div><span class="tag">${item.tag}</span><h3>${item.title}</h3><p>${item.text}</p></div>
      </article>
    `
            )
            .join('');
    }

    function renderTimeline(filter) {
        const items = filter === 'all' ? timeline : timeline.filter(item => item.era === filter);
        timelineContainer.innerHTML = items
            .map(
                item => `
      <article class="timeline-item">
        <span class="timeline-dot" aria-hidden="true"></span>
        <div class="timeline-card">
          <div class="timeline-year">${item.year}</div>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
          <span class="timeline-tag">${item.tag}</span>
        </div>
      </article>
    `
            )
            .join('');
    }

    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            renderServices(button.dataset.service);
        });
    });

    document.querySelectorAll('.era-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.era-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            renderTimeline(button.dataset.era);
        });
    });

    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        themeToggle.setAttribute(
            'aria-label',
            document.body.classList.contains('dark-mode') ? 'Switch to light theme' : 'Switch to dark theme'
        );
    });

    renderServices('all');
    renderTimeline('all');
})();
