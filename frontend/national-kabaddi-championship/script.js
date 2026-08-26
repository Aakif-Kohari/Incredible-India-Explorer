const stateTeams = [
    "Maharashtra", "Haryana", "Punjab", "Tamil Nadu", "Karnataka",
    "Rajasthan", "Uttar Pradesh", "Bihar", "Madhya Pradesh",
    "Chhattisgarh", "Odisha", "West Bengal", "Kerala",
    "Andhra Pradesh", "Telangana", "Gujarat"
];

const majorChampions = [
    { state: "Maharashtra", achievement: "One of the most successful teams" },
    { state: "Haryana", achievement: "Consistent national contender" },
    { state: "Punjab", achievement: "Strong kabaddi tradition" },
    { state: "Tamil Nadu", achievement: "Multiple championship appearances" }
];

const notablePlayers = [
    "Anup Kumar", "Ajay Thakur", "Pardeep Narwal", "Rahul Chaudhari",
    "Deepak Hooda", "Rakesh Kumar", "Manjeet Chhillar"
];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Render Champions
    const championsGrid = document.getElementById("champions-grid");
    majorChampions.forEach(champ => {
        const div = document.createElement("div");
        div.className = "champion-card";
        div.innerHTML = `<h4>${champ.state}</h4><p>${champ.achievement}</p>`;
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

    // 3. Render SVG Map using india-map-data.js (assuming it exposes `indiaMapData` globally like other modules)
    // Actually, `india-map-data.js` usually attaches to window.INDIA_MAP_PATHS or similar, but let's build a simple fallback just in case.
    
    const mapContainer = document.getElementById("india-map-container");
    
    // We will attempt to use window.mapData if available, otherwise draw a simplified placeholder map or standard paths.
    // The previous modules often relied on `window.indiaMapData` array of {id, d, name}
    if (window.indiaMapData) {
        renderMap(window.indiaMapData);
    } else {
        // Simple fallback
        mapContainer.innerHTML = `<div style="text-align:center; padding: 2rem;">Map data not available in this context. Interactive features disabled.</div>`;
    }

    function renderMap(mapPaths) {
        // Create SVG
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 1000 1100"); // typical India SVG viewBox
        
        mapPaths.forEach(state => {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", state.d);
            path.setAttribute("id", state.id);
            path.classList.add("state-path");
            
            // Check if state is in our stateTeams list
            const isParticipating = stateTeams.some(s => s.toLowerCase() === state.name.toLowerCase());
            
            if (isParticipating) {
                path.classList.add("highlighted");
                path.addEventListener("click", () => handleStateClick(state.name, path));
                
                // Add a tooltip title
                const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
                title.textContent = state.name;
                path.appendChild(title);
            }
            
            svg.appendChild(path);
        });
        
        mapContainer.appendChild(svg);
    }

    // 4. Handle State Clicks
    const panel = document.getElementById("state-details-panel");
    const panelTitle = document.getElementById("selected-state-title");
    const panelDesc = document.getElementById("selected-state-desc");
    const closeBtn = document.getElementById("close-panel-btn");

    function handleStateClick(stateName, pathElement) {
        // Reset all active classes
        document.querySelectorAll(".state-path.active").forEach(el => el.classList.remove("active"));
        
        // Add active class to clicked
        pathElement.classList.add("active");
        
        // Update Panel
        panelTitle.textContent = stateName;
        panelDesc.textContent = `Participation history and championship records for ${stateName}. This state regularly competes in both Men's and Women's divisions.`;
        panel.classList.remove("hidden");
    }

    closeBtn.addEventListener("click", () => {
        panel.classList.add("hidden");
        document.querySelectorAll(".state-path.active").forEach(el => el.classList.remove("active"));
    });
});
