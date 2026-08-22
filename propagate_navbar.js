import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT_DIR = path.dirname(fileURLToPath(import.meta.url));

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('tests')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

const NAVBAR_TEMPLATE = `<header class="navbar" id="navbar">
    <div class="nav-container">
        <a href="{{PREFIX}}index.html#home" class="nav-logo" id="nav-logo">
            <span class="saffron">Incredible</span>
            <span class="gold">India</span>
            <span class="green">Explorer</span>
        </a>
        <button class="menu-toggle" id="menu-toggle" aria-label="Toggle Menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>
        <nav class="nav-menu" id="nav-menu">
            <a href="{{PREFIX}}index.html#home" class="nav-link active" id="link-home">Home</a>
            
            <div class="nav-dropdown">
                <button class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">
                    Safety ▾
                </button>
                <div class="dropdown-menu">
                    <a
                        href="{{PREFIX}}frontend/emergency-assistance/emergency.html"
                        class="dropdown-item"
                    >
                        🚨 Emergency Assistance
                    </a>
                </div>
            </div>

            <div class="nav-dropdown">
                <button class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">Destinations ▾</button>
                <div class="dropdown-menu">
                    <a href="{{PREFIX}}index.html#map" class="dropdown-item">Interactive Map</a>
                    <a href="{{PREFIX}}frontend/travel/travel.html" class="dropdown-item">Travel & Destinations</a>
                    <a href="{{PREFIX}}frontend/ancient-ports-explorer/index.html" class="dropdown-item">Ancient Ports of India</a>
                    <a href="{{PREFIX}}frontend/islands/islands.html" class="dropdown-item">Islands of India</a>
                    <a href="{{PREFIX}}frontend/heritage/heritage.html" class="dropdown-item">Heritage Sites</a>
                    <a href="{{PREFIX}}frontend/route-planner/route-planner.html" class="dropdown-item">Route Planner</a>
                </div>
            </div>

            <div class="nav-dropdown">
                <button class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">Culture ▾</button>
                <div class="dropdown-menu">
                    <a href="{{PREFIX}}frontend/culture/culture.html" class="dropdown-item">Culture Overview</a>
                    <a href="{{PREFIX}}frontend/cuisine/cuisine.html" class="dropdown-item">Cuisine</a>
                    <a href="{{PREFIX}}frontend/festivals/festivals.html" class="dropdown-item">Festivals</a>
                    <a href="{{PREFIX}}frontend/event-discovery/index.html" class="dropdown-item">Festival & Event Discovery</a>
                    <a href="{{PREFIX}}frontend/historical-timeline/index.html" class="dropdown-item">Historical Timeline</a>
                    <a href="{{PREFIX}}frontend/national-symbols-gallery/national-symbols-gallery.html" class="dropdown-item">National Symbols</a>
                    <a href="{{PREFIX}}frontend/cuisine-discovery-hub/index.html" class="dropdown-item">UP Cuisine</a>
                    <a href="{{PREFIX}}frontend/handicrafts-showcase/index.html" class="dropdown-item">UP Handicrafts</a>
                    <a href="{{PREFIX}}frontend/national-days-calendar/index.html" class="dropdown-item">National Days</a>
                    <a href="{{PREFIX}}frontend/ganga-ghats-experience/index.html" class="dropdown-item">Ganga Ghats</a>
                </div>
            </div>

            <div class="nav-dropdown">
                <button class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">Nature ▾</button>
                <div class="dropdown-menu">
                    <a href="{{PREFIX}}frontend/national-parks-explorer/index.html" class="dropdown-item">National Parks</a>
                    <a href="{{PREFIX}}frontend/wildlife/wildlife.html" class="dropdown-item">Nature & Wildlife</a>
                    <a href="{{PREFIX}}frontend/wildlife-rescue/wildlife-rescue.html" class="dropdown-item">Wildlife Rescue</a>
                    <a href="{{PREFIX}}frontend/endemic-flora-fauna-explorer/index.html" class="dropdown-item">Endemic Flora & Fauna</a>
                    <a href="{{PREFIX}}frontend/harike-wetland/harike-wetland.html" class="dropdown-item">Harike Wetland</a>
                    <a href="{{PREFIX}}frontend/wular-lake/wular-lake.html" class="dropdown-item">Wular Lake</a>
                    <a href="{{PREFIX}}frontend/crowd-density/index.html" class="dropdown-item">Crowd Density Predictor</a>
                </div>
            </div>

            <div class="nav-dropdown">
                <button class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">Games ▾</button>
                <div class="dropdown-menu">
                    <a href="{{PREFIX}}frontend/passport-quest/passport-quest.html" class="dropdown-item">Passport Quest</a>
                    <a href="{{PREFIX}}frontend/culinary-game/culinary-game.html" class="dropdown-item">Culinary Challenge</a>
                    <a href="{{PREFIX}}frontend/monsoon-game/monsoon-game.html" class="dropdown-item">Monsoon Game</a>
                    <a href="{{PREFIX}}frontend/river-game/river-game.html" class="dropdown-item">River Explorer</a>
                    <a href="{{PREFIX}}frontend/geo-guesser-india/index.html" class="dropdown-item">GeoGuesser</a>
                </div>
            </div>

            <div class="nav-dropdown">
                <button class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">Community ▾</button>
                <div class="dropdown-menu">
                    <a href="{{PREFIX}}frontend/contributors/contributors.html" class="dropdown-item">Contributors</a>
                    <a href="{{PREFIX}}frontend/world-records-india/index.html" class="dropdown-item">World Records</a>
                </div>
            </div>
            
            <button id="theme-toggle" class="btn-theme-toggle" aria-label="Toggle Dark/Light Mode">☀️</button>
        </nav>
    </div>
</header>`;

const htmlFiles = walk(ROOT_DIR);
let updated = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Calculate prefix (e.g. "../" or "../../")
    const relativePath = path.relative(ROOT_DIR, file);
    const depth = relativePath.split(path.sep).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    
    const localizedNavbar = NAVBAR_TEMPLATE.replace(/\{\{PREFIX\}\}/g, prefix);
    
    // Regex to match from <header ... id="navbar" ...> to </header>
    // Includes any classes like "navbar scrolled" or just "navbar"
    const regex = /<header[^>]*id="navbar"[^>]*>[\s\S]*?<\/header>/i;
    
    if (regex.test(content)) {
        // Also check if the file currently has a hardcoded theme-toggle so we don't duplicate it or lose it
        content = content.replace(regex, localizedNavbar);
        fs.writeFileSync(file, content, 'utf8');
        updated++;
    } else {
        // Fallback for some files that might use <nav class="navbar global-nav"> instead
        const regex2 = /<nav[^>]*class="[^"]*navbar[^"]*"[^>]*>[\s\S]*?<\/nav>/i;
        if (regex2.test(content)) {
            content = content.replace(regex2, localizedNavbar);
            fs.writeFileSync(file, content, 'utf8');
            updated++;
        }
    }
});

console.log('Successfully updated ' + updated + ' HTML files with the new Mega Menu navbar.');
