/**
 * Canonical Waterfalls of India dataset.
 *
 * This is the single source of truth for waterfall entries used across the
 * Waterfalls of India landing page and the Explore by Trek Difficulty map.
 * Do not duplicate this list elsewhere — import/reference window.WATERFALLS_DATA
 * and window.WATERFALL_REGION_BY_STATE instead.
 *
 * trek.difficulty / trek.approach are only populated when the existing
 * project description text for a waterfall already documents something
 * about how it is reached. Nothing here is an invented distance, duration,
 * or difficulty guess — see trek.documented.
 */
(function (root) {
    'use strict';

    const WATERFALLS_DATA = [
        {
            id: "jog-falls",
            name: "Jog Falls",
            state: "Karnataka",
            river: "Sharavati",
            height: "253 meters",
            season: "Monsoon",
            tags: ["monsoon", "tallest"],
            description: "Jog Falls is the second-highest plunge waterfall in India. It is a major tourist attraction and is ranked 13th in the world by the waterfall database.",
            flow: "Varies greatly with the season; highly spectacular during the monsoon.",
            attractions: "Linganamakki Dam, Honnemaradu, Sigandur.",
            image: "https://images.unsplash.com/photo-1622117655866-8b233395581a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8am9nJTIwZmFsbHMlMkMlMjBpbmRpYXxlbnwwfHwwfHx8MA%3D%3D",
            thumb: "https://images.unsplash.com/photo-1622117655866-8b233395581a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8am9nJTIwZmFsbHMlMkMlMjBpbmRpYXxlbnwwfHwwfHx8MA%3D%3D",
            coordinates: { x: 36, y: 68 },
            trek: { difficulty: null, approach: null, documented: false }
        },
        {
            id: "dudhsagar",
            name: "Dudhsagar Falls",
            state: "Goa",
            river: "Mandovi",
            height: "310 meters",
            season: "Monsoon",
            tags: ["monsoon", "tallest"],
            description: "Dudhsagar literally translates to 'Sea of Milk'. This four-tiered waterfall is located on the Mandovi River in the Indian state of Goa.",
            flow: "Heavy during monsoons, creating a milky white appearance as it cascades down.",
            attractions: "Bhagwan Mahavir Wildlife Sanctuary, Tambdi Surla Temple.",
            image: "https://images.unsplash.com/photo-1652120704209-14cbc87b603f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHVkaHNhZ2FyLWZhbGxzfGVufDB8fDB8fHww",
            thumb: "https://images.unsplash.com/photo-1652120704209-14cbc87b603f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHVkaHNhZ2FyLWZhbGxzfGVufDB8fDB8fHww",
            coordinates: { x: 28, y: 63 },
            trek: { difficulty: null, approach: null, documented: false }
        },
        {
            id: "nohkalikai",
            name: "Nohkalikai Falls",
            state: "Meghalaya",
            river: "Rainwater fed",
            height: "340 meters",
            season: "Year-round",
            tags: ["year-round", "tallest"],
            description: "The tallest plunge waterfall in India. Its name means 'Jump of Ka Likai', referring to a local legend. It plunges over the red sandstone cliffs of Cherrapunji.",
            flow: "Consistent throughout the year, but strongest during the heavy monsoons of Meghalaya.",
            attractions: "Mawsmai Cave, Seven Sisters Falls, Double Decker Living Root Bridge.",
            image: "https://images.unsplash.com/photo-1685346388921-26dd3ae934be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm9oa2FsaWthaSUyMGZhbGxzfGVufDB8fDB8fHww",
            thumb: "https://images.unsplash.com/photo-1685346388921-26dd3ae934be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm9oa2FsaWthaSUyMGZhbGxzfGVufDB8fDB8fHww",
            coordinates: { x: 78, y: 42 },
            trek: { difficulty: null, approach: null, documented: false }
        },
        {
            id: "athirappilly",
            name: "Athirappilly Falls",
            state: "Kerala",
            river: "Chalakudy",
            height: "25 meters",
            season: "Monsoon",
            tags: ["monsoon"],
            description: "Often called the 'Niagara of India', Athirappilly is the largest waterfall in Kerala, situated in Thrissur district.",
            flow: "Powerful and wide during the monsoon, offering a majestic view.",
            attractions: "Vazhachal Waterfalls, Charpa Falls, Sholayar Dam.",
            image: "https://plus.unsplash.com/premium_photo-1672652838473-6581dda3ff65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXRoaXJhcHBpbGx5JTIwZmFsbHN8ZW58MHx8MHx8fDA%3D",
            thumb: "https://plus.unsplash.com/premium_photo-1672652838473-6581dda3ff65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXRoaXJhcHBpbGx5JTIwZmFsbHN8ZW58MHx8MHx8fDA%3D",
            coordinates: { x: 38, y: 85 },
            trek: { difficulty: null, approach: null, documented: false }
        },
        {
            id: "shivanasamudra",
            name: "Shivanasamudra Falls",
            state: "Karnataka",
            river: "Kaveri",
            height: "98 meters",
            season: "Monsoon",
            tags: ["monsoon"],
            description: "A famous segmented waterfall on the Kaveri river. The island town of Shivanasamudra divides the river into twin waterfalls: Gaganachukki and Bharachukki.",
            flow: "Best visited during the monsoon when the Kaveri river is at its peak.",
            attractions: "Talakadu, Somnathpur Temple.",
            image: "https://images.unsplash.com/photo-1650133606764-961b67b57db6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hpdmFuYXNhbXVkcmElMjBmYWxsc3xlbnwwfHwwfHx8MA%3D%3D",
            thumb: "https://images.unsplash.com/photo-1650133606764-961b67b57db6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hpdmFuYXNhbXVkcmElMjBmYWxsc3xlbnwwfHwwfHx8MA%3D%3D",
            coordinates: { x: 39, y: 72 },
            trek: { difficulty: null, approach: null, documented: false }
        },
        {
            id: "chitrakote",
            name: "Chitrakote Falls",
            state: "Chhattisgarh",
            river: "Indravati",
            height: "29 meters",
            season: "Monsoon",
            tags: ["monsoon"],
            description: "The widest waterfall in India, often referred to as the 'Niagara Falls of India'. Located in the Bastar district.",
            flow: "Extremely wide and muddy during the monsoon; calmer and clearer in winter.",
            attractions: "Kanger Valley National Park, Tirathgarh Falls.",
            image: "https://images.unsplash.com/photo-1673462107499-97848ff888b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpdHJha290ZSUyMGZhbGxzfGVufDB8fDB8fHww",
            thumb: "https://images.unsplash.com/photo-1673462107499-97848ff888b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpdHJha290ZSUyMGZhbGxzfGVufDB8fDB8fHww",
            coordinates: { x: 54, y: 55 },
            trek: { difficulty: null, approach: null, documented: false }
        },
        {
            id: "kempty",
            name: "Kempty Falls",
            state: "Uttarakhand",
            river: "Mountain Streams",
            height: "12 meters",
            season: "Year-round",
            tags: ["year-round"],
            description: "A popular tourist destination near Mussoorie. The name 'Kempty' is probably derived from the word 'camp-tea'.",
            flow: "Perennial flow, though highest during the monsoon.",
            attractions: "Mussoorie Mall Road, Gun Hill, Lal Tibba.",
            image: "https://plus.unsplash.com/premium_photo-1669750820162-0720de281305?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2VtcHR5JTIwZmFsbHN8ZW58MHx8MHx8fDA%3D",
            thumb: "https://plus.unsplash.com/premium_photo-1669750820162-0720de281305?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2VtcHR5JTIwZmFsbHN8ZW58MHx8MHx8fDA%3D",
            coordinates: { x: 42, y: 20 },
            trek: {
                difficulty: "easy",
                approach: "Listed in the project as a popular, easily reached roadside destination near Mussoorie — no trek required.",
                documented: true
            }
        },
        {
            id: "hebbe",
            name: "Hebbe Falls",
            state: "Karnataka",
            river: "Bhadra",
            height: "168 meters",
            season: "Monsoon",
            tags: ["monsoon"],
            description: "Hidden inside the Bhadra Wildlife Sanctuary, this waterfall descends in two stages to form Dodda Hebbe (Big Falls) and Chikka Hebbe (Small Falls).",
            flow: "Strong during monsoon; requires an adventurous jeep ride to reach.",
            attractions: "Kemmangundi Hill Station, Z Point, Mullayanagiri.",
            image: "https://images.unsplash.com/photo-1662872803648-c677c13af6b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGViYmUlMjBmYWxsc3xlbnwwfHwwfHx8MA%3D%3D",
            thumb: "https://images.unsplash.com/photo-1662872803648-c677c13af6b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGViYmUlMjBmYWxsc3xlbnwwfHwwfHx8MA%3D%3D",
            coordinates: { x: 37, y: 66 },
            trek: {
                difficulty: "challenging",
                approach: "The project's own listing notes this waterfall requires an adventurous jeep ride through Bhadra Wildlife Sanctuary to reach.",
                documented: true
            }
        },
        {
            id: "hogenakkal",
            name: "Hogenakkal Falls",
            state: "Tamil Nadu",
            river: "Kaveri",
            height: "20 meters",
            season: "Year-round",
            tags: ["year-round"],
            description: "Referred to as the 'Niagara Falls of India', it is famous for medicinal baths and hide boat (coracle) rides.",
            flow: "Good flow year-round, but highly spectacular (and sometimes restricted for boating) during heavy monsoons.",
            attractions: "Coracle Rides, Melagiri Hills.",
            image: "https://images.unsplash.com/photo-1592927946945-c98511f87bcc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9nZW5ha2thbCUyMGZhbGxzfGVufDB8fDB8fHww",
            thumb: "https://images.unsplash.com/photo-1592927946945-c98511f87bcc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9nZW5ha2thbCUyMGZhbGxzfGVufDB8fDB8fHww",
            coordinates: { x: 44, y: 76 },
            trek: {
                difficulty: "easy",
                approach: "Listed as a popular spot for coracle rides and bathing directly at the falls — a roadside, low-effort visit.",
                documented: true
            }
        },
        {
            id: "bhimlat",
            name: "Bhimlat Falls",
            state: "Rajasthan",
            river: "Mangli",
            height: "60 meters",
            season: "Monsoon",
            tags: ["monsoon"],
            description: "A well-kept secret in the arid state of Rajasthan. According to legend, it was created by Bhima (from the Mahabharata) to quench the thirst of his family.",
            flow: "Strictly seasonal; heavily dependent on monsoon rains.",
            attractions: "Bundi Fort, Taragarh Fort.",
            image: "https://media.istockphoto.com/id/1409468214/photo/amritdhara-waterfall-in-koriya-district.webp?a=1&b=1&s=612x612&w=0&k=20&c=DW32R_0oVTJBCwCZFlAq66UWKqqitJVk420Hppi9mj0=",
            thumb: "https://media.istockphoto.com/id/1409468214/photo/amritdhara-waterfall-in-koriya-district.webp?a=1&b=1&s=612x612&w=0&k=20&c=DW32R_0oVTJBCwCZFlAq66UWKqqitJVk420Hppi9mj0=",
            coordinates: { x: 32, y: 40 },
            trek: { difficulty: null, approach: null, documented: false }
        },
        {
            id: "bishop",
            name: "Bishop Falls",
            state: "Meghalaya",
            river: "Umiam River",
            height: "135 meters",
            season: "Post-Monsoon",
            tags: ["monsoon"],
            description: "A spectacular three-tiered cascade plunging down the steep gorges of Shillong, famed for its twin relationship with Beadon Falls.",
            flow: "Powerful roar during monsoon; clearer three-tiered cascade post-monsoon.",
            attractions: "Beadon Falls, Umiam Lake.",
            image: "https://plus.unsplash.com/premium_photo-1675314799584-9f0569dd47a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlzaG9wJTIwZmFsbHN8ZW58MHx8MHx8fDA%3D",
            thumb: "https://plus.unsplash.com/premium_photo-1675314799584-9f0569dd47a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlzaG9wJTIwZmFsbHN8ZW58MHx8MHx8fDA%3D",
            url: "../bishop-falls-explorer/index.html",
            coordinates: { x: 79, y: 44 },
            trek: { difficulty: null, approach: null, documented: false }
        },
        {
            id: "nohsngithiang",
            name: "Nohsngithiang Falls",
            state: "Meghalaya",
            river: "Monsoon Rainfall",
            height: "315 meters",
            season: "Monsoon",
            tags: ["monsoon"],
            description: "Also known as the Seven Sisters Falls, this majestic 315m segmented waterfall transforms the Khasi Hills cliffs during the monsoon.",
            flow: "Thundering seven streams in monsoon; completely dry in winter.",
            attractions: "Mawsmai Cave, Cherrapunji.",
            image: "https://images.unsplash.com/photo-1622117655866-8b233395581a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2V2ZW4lMjBTaXN0ZXJzJTIwZmFsbHN8ZW58MHx8MHx8fDA%3D",
            thumb: "https://images.unsplash.com/photo-1622117655866-8b233395581a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2V2ZW4lMjBTaXN0ZXJzJTIwZmFsbHN8ZW58MHx8MHx8fDA%3D",
            url: "../nohsngithiang-falls-explorer/index.html",
            coordinates: { x: 77, y: 43 },
            trek: { difficulty: null, approach: null, documented: false }
        },
        {
            id: "vantawng",
            name: "Vantawng Falls",
            state: "Mizoram",
            river: "Vanva River",
            height: "229 meters",
            season: "Monsoon",
            tags: ["monsoon", "year-round"],
            description: "Mizoram's tallest waterfall, cascading 229 metres in a stunning two-tiered drop amid deep bamboo forests.",
            flow: "Massive roaring curtain in monsoon; clearer two-tiered cascade in winter.",
            attractions: "Thenzawl, Chhingpuii Thlan.",
            image: "https://images.unsplash.com/photo-1743392121908-e8386bc237dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2F0ZXJmYWxscyUyMGluJTIwZWFzdCUyMGluZGlhJTIwbWl6b3JhbXxlbnwwfHwwfHx8MA%3D%3D",
            thumb: "https://images.unsplash.com/photo-1743392121908-e8386bc237dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2F0ZXJmYWxscyUyMGluJTIwZWFzdCUyMGluZGlhJTIwbWl6b3JhbXxlbnwwfHwwfHx8MA%3D%3D",
            url: "../vantawng-falls-explorer/index.html",
            coordinates: { x: 80, y: 49 },
            trek: { difficulty: null, approach: null, documented: false }
        },
        {
            id: "nuranang",
            name: "Nuranang Falls",
            state: "Arunachal Pradesh",
            river: "Nuranang River",
            height: "100 meters",
            season: "Monsoon",
            tags: ["monsoon", "year-round"],
            description: "Also known as Bong Bong Falls, a spectacular ~100m drop in the Himalayas.",
            flow: "Powerful in monsoon, serene and crystal clear in winter.",
            attractions: "Tawang, Sela Pass.",
            image: "https://media.istockphoto.com/id/2248848678/photo/nuranang-falls-in-arunachal-pradesh.webp?a=1&b=1&s=612x612&w=0&k=20&c=_YDfAwkFUpasBUIWIPLH21dX4tRq4GN4iCoVcmW5BYc=",
            thumb: "https://media.istockphoto.com/id/2248848678/photo/nuranang-falls-in-arunachal-pradesh.webp?a=1&b=1&s=612x612&w=0&k=20&c=_YDfAwkFUpasBUIWIPLH21dX4tRq4GN4iCoVcmW5BYc=",
            url: "../nuranang-falls-explorer/index.html",
            coordinates: { x: 81, y: 33 },
            trek: { difficulty: null, approach: null, documented: false }
        }
    ];

    // Well-established geographic groupings of Indian states/UTs — used only
    // for the "region" label shown on cards, not for any trek/difficulty claim.
    const REGION_BY_STATE = {
        "Karnataka": "South India",
        "Goa": "West India",
        "Meghalaya": "Northeast India",
        "Kerala": "South India",
        "Chhattisgarh": "Central India",
        "Uttarakhand": "North India",
        "Tamil Nadu": "South India",
        "Rajasthan": "West India",
        "Mizoram": "Northeast India",
        "Arunachal Pradesh": "Northeast India"
    };

    const DIFFICULTY_LEVELS = [
        { id: "easy", label: "Easy", icon: "🟢" },
        { id: "moderate", label: "Moderate", icon: "🟡" },
        { id: "challenging", label: "Challenging", icon: "🟠" },
        { id: "difficult", label: "Difficult", icon: "🔴" }
    ];

    WATERFALLS_DATA.forEach(function (item) {
        item.region = REGION_BY_STATE[item.state] || "India";
    });

    root.WATERFALLS_DATA = WATERFALLS_DATA;
    root.WATERFALL_REGION_BY_STATE = REGION_BY_STATE;
    root.WATERFALL_DIFFICULTY_LEVELS = DIFFICULTY_LEVELS;

})(window);