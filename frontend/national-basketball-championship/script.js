const stateTeams = [
    "Tamil Nadu", "Punjab", "Kerala", "Karnataka", 
    "Maharashtra", "Delhi", "Rajasthan", "West Bengal", 
    "Uttar Pradesh", "Madhya Pradesh", "Haryana", 
    "Gujarat", "Telangana", "Andhra Pradesh", "Chhattisgarh",
    "Railways", "Services"
];

const championshipTimeline = [
    { year: 2024, category: "Men", champion: "Tamil Nadu" },
    { year: 2024, category: "Women", champion: "Railways" },
    { year: 2023, category: "Men", champion: "Tamil Nadu" },
    { year: 2023, category: "Women", champion: "Railways" },
    { year: 2022, category: "Men", champion: "Services" },
    { year: 2022, category: "Women", champion: "Railways" },
    { year: 2021, category: "Men", champion: "Tamil Nadu" },
    { year: 2021, category: "Women", champion: "Railways" },
    { year: 2020, category: "Men", champion: "Punjab" },
    { year: 2020, category: "Women", champion: "Kerala" }
];

const notablePlayers = [
    "Satnam Singh", "Vishesh Bhriguvanshi", "Amjyot Singh", 
    "Geethu Anna Jose", "Anitha Pauldurai", "Prashanti Singh", "Akilan Pari"
];

const importantVenues = [
    { name: "KD Jadhav Indoor Hall", city: "New Delhi" },
    { name: "Sree Kanteerava Indoor Stadium", city: "Bengaluru" },
    { name: "Jawaharlal Nehru Indoor Stadium", city: "Chennai" },
    { name: "Balewadi Sports Complex", city: "Pune" }
];

const sources = [
    "Basketball Federation of India (BFI)",
    "Sports Authority of India",
    "National Championship Records",
    "Indian Olympic Association Archives"
];

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Render Notable Players
    const playersContainer = document.getElementById("players-container");
    notablePlayers.forEach(player => {
        const span = document.createElement("span");
        span.className = "player-tag";
        span.textContent = player;
        playersContainer.appendChild(span);
    });

    // 2. Render Venues
    const venuesGrid = document.getElementById("venues-grid");
    importantVenues.forEach(venue => {
        const div = document.createElement("div");
        div.className = "venue-card";
        div.innerHTML = `<h4>${venue.name}</h4><p>${venue.city}</p>`;
        venuesGrid.appendChild(div);
    });

    // 3. Render State Teams
    const teamsContainer = document.getElementById("teams-container");
    const sortedTeams = [...stateTeams].sort();
    sortedTeams.forEach(team => {
        const span = document.createElement("span");
        span.className = "team-tag";
        span.textContent = team;
        teamsContainer.appendChild(span);
    });

    // 4. Render Sources
    const sourcesList = document.getElementById("sources-list");
    sources.forEach(source => {
        const li = document.createElement("li");
        li.textContent = source;
        sourcesList.appendChild(li);
    });

    // 5. Initialize Filter and Timeline
    const stateFilter = document.getElementById("state-filter");
    const timelineContainer = document.getElementById("timeline-container");
    
    // Populate select
    sortedTeams.forEach(team => {
        const option = document.createElement("option");
        option.value = team;
        option.textContent = team;
        stateFilter.appendChild(option);
    });

    function renderTimeline(filterState) {
        timelineContainer.innerHTML = "";
        
        const filtered = championshipTimeline.filter(item => {
            return filterState === "all" || item.champion === filterState;
        });

        if (filtered.length === 0) {
            timelineContainer.innerHTML = `<div class="timeline-empty">No championships found for ${filterState} in the recent timeline.</div>`;
            return;
        }

        filtered.forEach(item => {
            const div = document.createElement("div");
            div.className = "timeline-item";
            div.innerHTML = `
                <div class="timeline-year">${item.year} - ${item.category}'s</div>
                <div class="timeline-champ">🏆 ${item.champion}</div>
            `;
            timelineContainer.appendChild(div);
        });
    }

    stateFilter.addEventListener("change", (e) => {
        renderTimeline(e.target.value);
    });

    // Initial render
    renderTimeline("all");
});
