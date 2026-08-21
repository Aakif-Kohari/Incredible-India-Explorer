import fs from 'fs';

const stateData = {
    "an": { capital: "Port Blair", food: "Seafood Platter", festival: "Island Tourism Festival" },
    "ap": { capital: "Amaravati", food: "Gongura Pachadi", festival: "Ugadi" },
    "ar": { capital: "Itanagar", food: "Thukpa", festival: "Losar" },
    "as": { capital: "Dispur", food: "Masor Tenga", festival: "Bihu" },
    "br": { capital: "Patna", food: "Litti Chokha", festival: "Chhath Puja" },
    "ch": { capital: "Chandigarh", food: "Chole Bhature", festival: "Rose Festival" },
    "ct": { capital: "Raipur", food: "Muthia", festival: "Bastar Dussehra" },
    "dd": { capital: "Daman", food: "Fish Koliwada", festival: "Garba" },
    "dl": { capital: "New Delhi", food: "Butter Chicken", festival: "Diwali" },
    "dn": { capital: "Silvassa", food: "Ubadiyu", festival: "Tarpa Festival" },
    "ga": { capital: "Panaji", food: "Fish Curry Rice", festival: "Goa Carnival" },
    "gj": { capital: "Gandhinagar", food: "Dhokla", festival: "Navratri" },
    "hp": { capital: "Shimla", food: "Dham", festival: "Kullu Dussehra" },
    "hr": { capital: "Chandigarh", food: "Bajre Ki Khichdi", festival: "Baisakhi" },
    "jh": { capital: "Ranchi", food: "Dhuska", festival: "Sarhul" },
    "jk": { capital: "Srinagar/Jammu", food: "Rogan Josh", festival: "Shikara Festival" },
    "ka": { capital: "Bengaluru", food: "Bisi Bele Bath", festival: "Mysore Dasara" },
    "kl": { capital: "Thiruvananthapuram", food: "Appam with Stew", festival: "Onam" },
    "ld": { capital: "Kavaratti", food: "Mus Kavaab", festival: "Eid-ul-Fitr" },
    "mh": { capital: "Mumbai", food: "Vada Pav", festival: "Ganesh Chaturthi" },
    "ml": { capital: "Shillong", food: "Jadoh", festival: "Wangala Festival" },
    "mn": { capital: "Imphal", food: "Eromba", festival: "Yaoshang" },
    "mp": { capital: "Bhopal", food: "Poha Jalebi", festival: "Khajuraho Dance Festival" },
    "mz": { capital: "Aizawl", food: "Bai", festival: "Chapchar Kut" },
    "nl": { capital: "Kohima", food: "Smoked Pork", festival: "Hornbill Festival" },
    "or": { capital: "Bhubaneswar", food: "Dalma", festival: "Rath Yatra" },
    "pb": { capital: "Chandigarh", food: "Makki Di Roti & Sarson Da Saag", festival: "Lohri" },
    "py": { capital: "Pondicherry", food: "Quiche", festival: "Pongal" },
    "rj": { capital: "Jaipur", food: "Dal Baati Churma", festival: "Pushkar Camel Fair" },
    "sk": { capital: "Gangtok", food: "Momos", festival: "Losoong" },
    "tg": { capital: "Hyderabad", food: "Hyderabadi Biryani", festival: "Bathukamma" },
    "tn": { capital: "Chennai", food: "Idli Dosa", festival: "Pongal" },
    "tr": { capital: "Agartala", food: "Mui Borok", festival: "Kharchi Puja" },
    "up": { capital: "Lucknow", food: "Tunday Kababi", festival: "Kumbh Mela" },
    "ut": { capital: "Dehradun", food: "Kafuli", festival: "Ganga Dussehra" },
    "wb": { capital: "Kolkata", food: "Macher Jhol", festival: "Durga Puja" }
};

const path = './frontend/dist/map-data.js';
let content = fs.readFileSync(path, 'utf8');

const prefix = 'const mapData = ';
if (content.startsWith(prefix)) {
    let jsonStr = content.substring(prefix.length);
    if (jsonStr.endsWith(';')) jsonStr = jsonStr.substring(0, jsonStr.length - 1);
    
    let mapData = JSON.parse(jsonStr);
    let updated = 0;
    
    mapData.locations.forEach(loc => {
        const data = stateData[loc.id];
        if (data) {
            loc.capital = data.capital;
            loc.food = data.food;
            loc.festival = data.festival;
            updated++;
        }
    });
    
    const newContent = prefix + JSON.stringify(mapData) + ';';
    fs.writeFileSync(path, newContent, 'utf8');
    console.log(`Successfully added capital, food, and festival data to ${updated} states!`);
} else {
    console.log("Could not find the mapData prefix in the file.");
}
