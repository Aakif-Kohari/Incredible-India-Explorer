const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'dist', 'home-data.js');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = {
    // Cuisines
    "assets/butter_chicken.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Chicken_makhani.jpg/800px-Chicken_makhani.jpg",
    "assets/chole_bhature.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Chole_Bhature.jpg/800px-Chole_Bhature.jpg",
    "assets/rogan_josh.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Rogan_Josh.jpg/800px-Rogan_Josh.jpg",
    "assets/masala_dosa.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Dosa_and_ghee.jpg/800px-Dosa_and_ghee.jpg",
    "assets/hyderabadi_biryani.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5ce/Hyderabadi_Biryani.jpg/800px-Hyderabadi_Biryani.jpg",
    "assets/idli_sambar.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Idli_Sambar.jpg/800px-Idli_Sambar.jpg",
    "assets/litti_chokha.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Litti_Chokha_served_in_a_plate.jpg/800px-Litti_Chokha_served_in_a_plate.jpg",
    "assets/machher_jhol.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Machher_Jhol_-_Traditional_Bengali_Fish_Curry.jpg/800px-Machher_Jhol_-_Traditional_Bengali_Fish_Curry.jpg",
    "assets/rasgulla.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Rasgulla_-_A_sweet_dish.jpg/800px-Rasgulla_-_A_sweet_dish.jpg",
    "assets/dhokla.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Dhokla-a_Gujarati_Snack.jpg/800px-Dhokla-a_Gujarati_Snack.jpg",
    "assets/vada_pav.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Vada_Pav.jpg/800px-Vada_Pav.jpg",
    "assets/bebinca.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Bebinca.jpg/800px-Bebinca.jpg",
    "assets/momos.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Momos_with_sauce.jpg/800px-Momos_with_sauce.jpg",
    "assets/smoked_pork_bamboo.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pork_curry_with_bamboo_shoot.jpg/800px-Pork_curry_with_bamboo_shoot.jpg",
    "assets/jadoh.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Jadoh.jpg/800px-Jadoh.jpg",
    "assets/DalBaatiChurma.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Dal_Bati_Churma.jpg/800px-Dal_Bati_Churma.jpg",
    "assets/TundayKabab.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Tunday_Kabab.jpg/800px-Tunday_Kabab.jpg",
    "assets/PohaJalebi.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Indori_Poha.jpg/800px-Indori_Poha.jpg",
    "assets/BajraKhichdi.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Bajra_Khichdi.jpg/800px-Bajra_Khichdi.jpg",
    "assets/Siddu.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Siddu_with_ghee.jpg/800px-Siddu_with_ghee.jpg",
    "assets/KeralaSadya.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Kerala_Sadya.jpg/800px-Kerala_Sadya.jpg",
    "assets/AndhraChickenCurry.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Spicy_Chicken_Curry.jpg/800px-Spicy_Chicken_Curry.jpg",
    "assets/PakhalaBhata.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Pakhala_Thali.jpg/800px-Pakhala_Thali.jpg",
    "assets/Dhuska.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Dhuska_jharkhand.jpg/800px-Dhuska_jharkhand.jpg",
    "assets/AssameseKhar.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Assamese_Thali.jpg/800px-Assamese_Thali.jpg",

    // Festivals
    "assets/diwali.png": "https://images.unsplash.com/photo-1572007010476-80f4f9f7ba37?auto=format&fit=crop&w=800",
    "assets/holi.png": "https://images.unsplash.com/photo-1551805723-888e6a10de4b?auto=format&fit=crop&w=800",
    "assets/eid.png": "https://images.unsplash.com/photo-1563294326-7eeb3467c9c0?auto=format&fit=crop&w=800",
    "assets/pongal.png": "https://images.unsplash.com/photo-1610452331575-d143d2c88f4e?auto=format&fit=crop&w=800",
    "assets/navratri.png": "https://images.unsplash.com/photo-1662993886538-2d2c18d36371?auto=format&fit=crop&w=800",
    "assets/bihu.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Bihu_dance.jpg/800px-Bihu_dance.jpg",

    // Culture
    "assets/bharatanatyam.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Bharatanatyam_Dance.jpg/800px-Bharatanatyam_Dance.jpg",
    "assets/kathakali.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Kathakali_Performance.jpg/800px-Kathakali_Performance.jpg",
    "assets/sitar.png": "https://images.unsplash.com/photo-1596758410222-38d011853ba5?auto=format&fit=crop&w=800",
    "assets/traditional_attires.png": "https://images.unsplash.com/photo-1583391733958-d25e77b22a28?auto=format&fit=crop&w=800",
    "assets/bhangra.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Bhangra_Dance.jpg/800px-Bhangra_Dance.jpg",
    "assets/tabla.png": "https://images.unsplash.com/photo-1635398240578-8baea8df570b?auto=format&fit=crop&w=800",
    
    // Some general fallback for .jpg in assets not found
    "frontend/assets/lohara-dyansty.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Kashmir_Valley.jpg/800px-Kashmir_Valley.jpg",
    "frontend/assets/kamapura-dyansty.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Kamarupa_region.png/800px-Kamarupa_region.png",
    "frontend/assets/gadahavala-dyansty.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Gahadavala_Dynasty.jpg/800px-Gahadavala_Dynasty.jpg",
    "frontend/assets/tomara-dyansty.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tomara_Dynasty.jpg/800px-Tomara_Dynasty.jpg",
    "frontend/assets/koch-dyansty.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Koch_Dynasty.jpg/800px-Koch_Dynasty.jpg",
    "frontend/assets/yadava-dyansty.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Yadava_Dynasty.jpg/800px-Yadava_Dynasty.jpg"
};

for (const [key, value] of Object.entries(replacements)) {
    content = content.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
}

// Ensure Unsplash and Wikimedia fallback if missing any assets
content = content.replace(/"assets\/([^"]+)\.png"/g, '"https://images.unsplash.com/photo-1548811265-27a3c3fce4c4?auto=format&fit=crop&w=800"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed home-data.js images!');
