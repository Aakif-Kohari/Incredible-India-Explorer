/**
 * Param Vir Chakra Gallery & Heroes Explorer — Data Module
 * Dataset covering PVC history, Savitri Khanolkar's medal design,
 * 21 bravery citations, historical military conflicts, and image gallery.
 */

const PVC_INFO = {
    id: "param-vir-chakra",
    name: "Param Vir Chakra Gallery & Heroes",
    fullTitle: "India's Highest Military Decoration for Ultimate Valor",
    establishedDate: "26 January 1950 (Retroactive from 15 August 1947)",
    totalRecipients: 21,
    posthumousCount: 14,
    livingRecipients: 3,
    designer: "Savitri Khanolkar (Eva Yononne Linda Deyros)",
    symbolism: "Rishi Dadhichi's Vajra (supreme sacrifice) surrounding the Ashoka Lion Capital and Shivaji Maharaj's Bhavani sword",
    ribbonColor: "Plain Purple (32 mm width)",
    quickStats: [
        { label: "Total Awardees", value: "21 Heroes", icon: "🎖️" },
        { label: "Highest Military Award", value: "Level 1 Valor", icon: "⚔️" },
        { label: "Posthumous Awards", value: "14 Citations", icon: "🌹" },
        { label: "Conflicts Covered", value: "7 Major Wars", icon: "🇮🇳" },
        { label: "IAF Recipient", value: "1 Hero (Sekhon)", icon: "✈️" },
        { label: "Medal Motif", value: "Dadhichi's Vajra", icon: "⚡" }
    ]
};

const MEDAL_HISTORY = {
    overview: "The Param Vir Chakra (PVC) is India's highest military decoration, awarded for the most conspicuous bravery or pre-eminent act of valor in the presence of the enemy on land, sea, or air.",
    designOrigin: "The medal was designed by Savitri Khanolkar, who was drawn to Indian mythology and culture. She selected the motif of Rishi Dadhichi's Vajra — the sage who sacrificed his bones to forge a divine weapon to defeat evil.",
    motto: "Awarded for self-sacrifice, courage beyond the call of duty, and unyielding military leadership."
};

const PVC_HEROES = [
    {
        id: "somnath-sharma",
        name: "Major Somnath Sharma",
        regiment: "4th Battalion, Kumaon Regiment",
        rank: "Major",
        year: 1947,
        conflict: "1947 Indo-Pakistani War (Kashmir)",
        posthumous: true,
        citation: "First recipient of the Param Vir Chakra. Led his company against heavily armed raiders at Badgam near Srinagar airport, holding the position until killed by a mortar shell.",
        famousWords: "'The enemy is only 50 yards from us. We are heavily outnumbered. We are under devastating fire. I shall not withdraw an inch but will fight to the last man and the last round.'",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Major_Somnath_Sharma_PVC.jpg/800px-Major_Somnath_Sharma_PVC.jpg"
    },
    {
        id: "vikram-batra",
        name: "Captain Vikram Batra",
        regiment: "13th Battalion, Jammu and Kashmir Rifles",
        rank: "Captain",
        year: 1999,
        conflict: "1999 Kargil War (Operation Vijay)",
        posthumous: true,
        citation: "Captured Peak 5140 and Peak 4875 in Kargil. Displayed legendary bravery under enemy fire, single-handedly killing enemy soldiers in close combat.",
        famousWords: "'Yeh Dil Maange More!' / 'Either I will come back after hoisting the Tricolour, or I will come back wrapped in it, but I will be back for sure.'",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Captain_Vikram_Batra_PVC.jpg/800px-Captain_Vikram_Batra_PVC.jpg"
    },
    {
        id: "abdul-hamid",
        name: "CQMH Abdul Hamid",
        regiment: "4th Battalion, The Grenadiers",
        rank: "Company Quartermaster Havildar",
        year: 1965,
        conflict: "1965 Indo-Pakistani War (Battle of Asal Uttar)",
        posthumous: true,
        citation: "Mounted on a recoilless gun jeep, destroyed eight enemy Patton tanks single-handedly during the Battle of Asal Uttar before sacrificing his life.",
        famousWords: "Targeted enemy Patton tanks at point-blank range, crippling the Pakistani 1st Armoured Division.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/CQMH_Abdul_Hamid_PVC.jpg/800px-CQMH_Abdul_Hamid_PVC.jpg"
    },
    {
        id: "nirmal-jit-sekhon",
        name: "Flying Officer Nirmal Jit Singh Sekhon",
        regiment: "No. 18 Squadron, Indian Air Force ('Flying Bullets')",
        rank: "Flying Officer",
        year: 1971,
        conflict: "1971 Indo-Pakistani War (Srinagar Air Defence)",
        posthumous: true,
        citation: "Sole Indian Air Force officer awarded the PVC. Single-handedly defended Srinagar Airfield against six enemy Sabre jets in a Folland Gnat fighter.",
        famousWords: "Engaged multiple enemy Sabres at low altitude over Srinagar valley until his aircraft crashed.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Flying_Officer_Nirmal_Jit_Singh_Sekhon_PVC.jpg/800px-Flying_Officer_Nirmal_Jit_Singh_Sekhon_PVC.jpg"
    },
    {
        id: "bana-singh",
        name: "Naib Subedar Bana Singh",
        regiment: "8th Battalion, Jammu and Kashmir Light Infantry",
        rank: "Subedar / Captain (Hony)",
        year: 1987,
        conflict: "1987 Operation Rajiv (Siachen Glacier)",
        posthumous: false,
        citation: "Led assault team across 1,500 ft ice wall at 21,153 feet altitude on Siachen Glacier to capture the highest enemy post, renamed 'Bana Top'.",
        famousWords: "Climbed sheer vertical ice wall under sub-zero temperatures and lobbed grenades into enemy bunker.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Bana_Singh_PVC.jpg/800px-Bana_Singh_PVC.jpg"
    },
    {
        id: "yogendra-yadav",
        name: "Grenadier Yogendra Singh Yadav",
        regiment: "18th Battalion, The Grenadiers",
        rank: "Subedar Major / Captain (Hony)",
        year: 1999,
        conflict: "1999 Kargil War (Tiger Hill)",
        posthumous: false,
        citation: "Sustained 15 bullet wounds while crawling up a vertical 1,000 ft cliff face on Tiger Hill, neutralizing two bunker positions.",
        famousWords: "Climbed rope under heavy enemy fire despite multiple injuries to secure Tiger Hill summit.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Subedar_Major_Yogendra_Singh_Yadav_PVC.jpg/800px-Subedar_Major_Yogendra_Singh_Yadav_PVC.jpg"
    }
];

const CONFLICTS_TIMELINE = [
    { year: "1947–1948", title: "Indo-Pakistani War of 1947 (Kashmir)", recipients: 5 },
    { year: "1961", title: "UN Peacekeeping Mission in Congo", recipients: 1 },
    { year: "1962", title: "Sino-Indian War (Ladakh & NEFA)", recipients: 3 },
    { year: "1965", title: "Indo-Pakistani War of 1965", recipients: 2 },
    { year: "1971", title: "Indo-Pakistani War of 1971 (Liberation War)", recipients: 4 },
    { year: "1987", title: "Operation Rajiv (Siachen Glacier)", recipients: 1 },
    { year: "1999", title: "Kargil War (Operation Vijay)", recipients: 4 }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PVC_INFO, MEDAL_HISTORY, PVC_HEROES, CONFLICTS_TIMELINE };
}
