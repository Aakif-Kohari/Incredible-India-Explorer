import fs from 'fs';
const path = './frontend/dist/map-data.js';

let content = fs.readFileSync(path, 'utf8');

// The file starts with "const mapData = {" and ends with "};"
// Let's extract the JSON part
const prefix = 'const mapData = ';
if (content.startsWith(prefix)) {
    let jsonStr = content.substring(prefix.length);
    if (jsonStr.endsWith(';')) {
        jsonStr = jsonStr.substring(0, jsonStr.length - 1);
    }
    
    let mapData = JSON.parse(jsonStr);
    let updated = 0;
    
    mapData.locations.forEach(loc => {
        if (!loc.description) {
            loc.description = "Explore the vibrant culture, rich history, and spectacular landscapes of " + loc.name + ". Discover hidden gems, traditional cuisines, and local heritage.";
            updated++;
        }
        if (!loc.story) {
            loc.story = "From its ancient roots to its modern charm, " + loc.name + " offers an unforgettable journey. Experience the breathtaking sights and unique local traditions that make this region an incredible part of India.";
        }
    });
    
    console.log("Added descriptions to " + updated + " locations.");
    
    const newContent = prefix + JSON.stringify(mapData) + ';';
    fs.writeFileSync(path, newContent, 'utf8');
    console.log("Successfully updated map-data.js");
} else {
    console.log("Could not find prefix");
}
