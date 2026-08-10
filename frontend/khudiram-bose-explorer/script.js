/* script.js */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Timeline Data
    const timelineData = [
        {
            year: "1889",
            title: "Birth",
            description: "Born in Habibpur village of Midnapore district, Bengal."
        },
        {
            year: "1905",
            title: "Entry into Revolution",
            description: "Deeply affected by the partition of Bengal, he joined the Anushilan Samiti at age 15."
        },
        {
            year: "1908",
            title: "Muzaffarpur Bombing",
            description: "Tasked with assassinating Magistrate Douglas Kingsford. A bomb was thrown at a carriage believed to carry Kingsford, but it accidentally killed two European women."
        },
        {
            year: "August 1908",
            title: "Martyrdom",
            description: "He was tried and sentenced to death. At just 18 years old, he walked to the gallows with a smile and a copy of the Bhagavad Gita."
        }
    ];

    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) {
        timelineData.forEach(item => {
            const el = document.createElement('div');
            el.className = 'timeline-item';
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


    // 2. Revolutionary Activities Data
    const activitiesData = [
        {
            title: "Anushilan Samiti",
            desc: "Joined this prominent revolutionary organization, engaging in physical culture and militant nationalism."
        },
        {
            title: "Distribution of Literature",
            desc: "Actively distributed secret pamphlets like 'Sonar Bangla' to inspire the youth."
        },
        {
            title: "Targeting Kingsford",
            desc: "Volunteered alongside Prafulla Chaki for the mission to assassinate Douglas Kingsford, the oppressive British magistrate."
        }
    ];

    const activitiesContainer = document.getElementById('activities-container');
    if (activitiesContainer) {
        activitiesData.forEach(item => {
            const el = document.createElement('div');
            el.className = 'activity-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            `;
            activitiesContainer.appendChild(el);
        });
    }

    // 3. Trial Data
    const trialData = [
        { step: "Arrest", desc: "Arrested at Waini station on May 1, 1908. He took full responsibility to protect his organization." },
        { step: "Investigation", desc: "British authorities conducted a swift investigation, relying on eyewitness accounts and confessions." },
        { step: "Trial", desc: "The trial began on May 21, 1908. Despite efforts by his defense lawyer, the verdict was predetermined." },
        { step: "Verdict & Execution", desc: "Sentenced to death. Executed on August 11, 1908." }
    ];

    const trialContainer = document.getElementById('trial-container');
    if (trialContainer) {
        trialData.forEach(item => {
            const el = document.createElement('div');
            el.className = 'trial-step';
            el.innerHTML = `
                <h3>${item.step}</h3>
                <p>${item.desc}</p>
            `;
            trialContainer.appendChild(el);
        });
    }

    // 4. Legacy Data
    const legacyText = "Khudiram Bose's execution ignited a fire of patriotism across India. His sacrifice became a powerful symbol of resistance against British rule. Songs celebrating his courage, like the famous 'Ekbar Biday De Ma Ghure Ashi', became anthems of the freedom struggle in Bengal.";
    const legacyContainer = document.getElementById('legacy-container');
    if (legacyContainer) {
        legacyContainer.innerHTML = `<div class="content-card"><p>${legacyText}</p></div>`;
    }

    // 5. References Data
    const referencesData = [
        { text: "National Archives of India - Records of the Muzaffarpur Conspiracy Case", link: "#" },
        { text: "Dictionary of National Biography - Institute of Historical Studies", link: "#" },
        { text: "History of the Freedom Movement in India - Tara Chand", link: "#" }
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
