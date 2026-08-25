const stateTeams = [
    "Kerala", "Tamil Nadu", "Punjab", "Haryana", 
    "Services", "Railways", "Karnataka", "Andhra Pradesh", 
    "Telangana", "Maharashtra", "Odisha", "West Bengal", 
    "Uttar Pradesh", "Rajasthan", "Gujarat", "Madhya Pradesh"
];

const championStates = [
    "Kerala", "Tamil Nadu", "Punjab", "Services"
];

const majorChampions = [
    { team: "Services", achievement: "Multiple national titles" },
    { team: "Railways", achievement: "Consistent championship contender" },
    { team: "Kerala", achievement: "Strong volleyball legacy" },
    { team: "Tamil Nadu", achievement: "Historic championship success" }
];

const notablePlayers = [
    "Jimmy George", "Tom Joseph", "K. Udayakumar", "Abdul Basith", 
    "Jerome Vinith", "Minu Mani", "Annie Bright"
];

const historicVenues = [
    { name: "Indira Gandhi Indoor Stadium", city: "New Delhi" },
    { name: "KD Jadhav Indoor Hall", city: "New Delhi" },
    { name: "EMS Stadium", city: "Kozhikode" },
    { name: "Jawaharlal Nehru Indoor Stadium", city: "Chennai" }
];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Render Champions
    const championsGrid = document.getElementById("champions-grid");
    majorChampions.forEach(champ => {
        const div = document.createElement("div");
        div.className = "champion-card";
        div.innerHTML = `<h4>${champ.team}</h4><p>${champ.achievement}</p>`;
        championsGrid.appendChild(div);
    });

    // 2. Render Notable Players
    const playersContainer = document.getElementById("players-container");
    notablePlayers.forEach(player => {
        const span = document.createElement("span");
        span.className = "player-tag";
        span.textContent = player;
        playersContainer.appendChild(span);
    });

    // 3. Render Venues
    const venuesGrid = document.getElementById("venues-grid");
    historicVenues.forEach(venue => {
        const div = document.createElement("div");
        div.className = "venue-card";
        div.innerHTML = `<h4>${venue.name}</h4><p>${venue.city}</p>`;
        venuesGrid.appendChild(div);
    });

    // 4. Render SVG Map using india-map-data.js
    const mapContainer = document.getElementById("india-map-container");
    
    if (window.indiaMapData) {
        renderMap(window.indiaMapData);
    } else {
        mapContainer.innerHTML = `<div style="text-align:center; padding: 2rem;">Map data not available in this context. Interactive features disabled.</div>`;
    }

    function renderMap(mapPaths) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 1000 1100"); 
        
        mapPaths.forEach(state => {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", state.d);
            path.setAttribute("id", state.id);
            path.classList.add("state-path");
            
            // Note: Services and Railways are organizational teams, not geographic states.
            // We highlight the geographic states that are in the stateTeams array.
            const isParticipating = stateTeams.some(s => s.toLowerCase() === state.name.toLowerCase());
            const isChampion = championStates.some(s => s.toLowerCase() === state.name.toLowerCase());
            
            if (isParticipating) {
                path.classList.add("highlighted");
                if (isChampion) {
                    path.classList.add("champion");
                }
                
                path.addEventListener("click", () => handleStateClick(state.name, isChampion, path));
                
                const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
                title.textContent = state.name;
                path.appendChild(title);
            }
            
            svg.appendChild(path);
        });
        
        mapContainer.appendChild(svg);
    }

    // 5. Handle State Clicks
    const panel = document.getElementById("state-details-panel");
    const panelTitle = document.getElementById("selected-state-title");
    const panelDesc = document.getElementById("selected-state-desc");
    const panelBadge = document.getElementById("selected-state-badge");
    const closeBtn = document.getElementById("close-panel-btn");

    function handleStateClick(stateName, isChampion, pathElement) {
        // Reset active
        document.querySelectorAll(".state-path.active").forEach(el => el.classList.remove("active"));
        pathElement.classList.add("active");
        
        // Update Panel
        panelTitle.textContent = stateName;
        panelDesc.textContent = `Championship appearances, participation records, and volleyball achievements for ${stateName}.`;
        
        if (isChampion) {
            panelBadge.textContent = "National Champion";
            panelBadge.classList.add("champ-badge");
        } else {
            panelBadge.textContent = "Active Participant";
            panelBadge.classList.remove("champ-badge");
        }
        
        panel.classList.remove("hidden");
    }

    closeBtn.addEventListener("click", () => {
        panel.classList.add("hidden");
        document.querySelectorAll(".state-path.active").forEach(el => el.classList.remove("active"));
    });
});
