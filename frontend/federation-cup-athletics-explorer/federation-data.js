/**
 * Federation Cup Athletics Explorer — Data Module
 * Comprehensive dataset covering the Federation Cup National Athletics Championships,
 * event history, disciplines, major athletes, records, venues, and champions.
 */

const FEDERATION_INFO = {
    id: "federation-cup-athletics",
    title: "Federation Cup Athletics",
    foundedYear: "1991",
    organizer: "Athletics Federation of India (AFI)",
    significance: "India's premier annual national athletics championship and a key selection event for international competitions.",
    quickStats: [
        { label: "Editions Held", value: "34+", icon: "🏃" },
        { label: "Organizer", value: "AFI", icon: "🏟️" },
        { label: "First Edition", value: "1991", icon: "📅" },
        { label: "Disciplines", value: "40+", icon: "🎯" },
        { label: "Top Athlete", value: "Neeraj Chopra", icon: "⭐" },
        { label: "Purpose", value: "National Selection", icon: "🇮🇳" }
    ]
};

const DISCIPLINES = [
    {
        category: "Sprints",
        icon: "💨",
        events: ["100m", "200m", "400m"],
        description: "Short-distance explosive speed events ranging from 100m to 400m."
    },
    {
        category: "Middle Distance",
        icon: "🔄",
        events: ["800m", "1500m"],
        description: "Events requiring a balance of speed and endurance over 800m to 1500m."
    },
    {
        category: "Long Distance",
        icon: "🏃",
        events: ["5000m", "10000m"],
        description: "Endurance events demanding sustained pace over 5000m and 10000m."
    },
    {
        category: "Hurdles",
        icon: "🚧",
        events: ["110m Hurdles", "400m Hurdles", "100m Hurdles (Women)"],
        description: "Sprint events with barriers requiring rhythm, speed, and technical precision."
    },
    {
        category: "Relays",
        icon: "🏃‍♂️🏃‍♀️",
        events: ["4x100m Relay", "4x400m Relay"],
        description: "Team sprint events showcasing baton-passing precision and combined speed."
    },
    {
        category: "Jumps",
        icon: "🦘",
        events: ["Long Jump", "Triple Jump", "High Jump", "Pole Vault"],
        description: "Field events testing explosive power through horizontal and vertical leaps."
    },
    {
        category: "Throws",
        icon: "🤾",
        events: ["Shot Put", "Discus Throw", "Hammer Throw", "Javelin Throw"],
        description: "Power events testing strength and technique in propelling implements."
    },
    {
        category: "Combined Events",
        icon: "🏅",
        events: ["Decathlon (Men)", "Heptathlon (Women)"],
        description: "Multi-event competitions testing all-around athletic ability over two days."
    },
    {
        category: "Race Walk",
        icon: "🚶",
        events: ["20km Race Walk"],
        description: "Endurance events with strict technique rules requiring continuous ground contact."
    }
];

const MAJOR_ATHLETES = [
    {
        name: "Neeraj Chopra",
        discipline: "Javelin Throw",
        achievement: "Olympic Gold Medalist (Tokyo 2020), World Championships Silver",
        federationCup: "Multiple-time Federation Cup champion with national record throws",
        highlight: "First Indian track-and-field Olympic gold medalist"
    },
    {
        name: "Hima Das",
        discipline: "Sprints",
        achievement: "2018 World U-20 Champion (400m), Asian Games Gold (4x400m)",
        federationCup: "Won 100m and 200m titles at Federation Cup",
        highlight: "India's fastest woman in the 400m"
    },
    {
        name: "Dutee Chand",
        discipline: "Sprints",
        achievement: "Silver at 2018 Asian Games (100m & 200m), Commonwealth Games medalist",
        federationCup: "Dominant sprinter with multiple 100m and 200m Federation Cup titles",
        highlight: "First Indian woman to win an Asian Games sprint gold"
    },
    {
        name: "Murali Sreeshankar",
        discipline: "Long Jump",
        achievement: "2022 Commonwealth Games Silver, Asian Games Gold",
        federationCup: "Consistent Federation Cup performer with 8.30m+ jumps",
        highlight: "India's leading long jumper"
    },
    {
        name: "Eldhose Paul",
        discipline: "Triple Jump",
        achievement: "2022 Commonwealth Games Gold Medalist",
        federationCup: "Multiple Federation Cup triple jump titles",
        highlight: "India's Commonwealth Games champion in triple jump"
    },
    {
        name: "Parul Chaudhary",
        discipline: "Long Distance",
        achievement: "Asian Games Gold (3000m Steeplechase & 5000m)",
        federationCup: "Dominant distance runner with multiple Federation Cup distance titles",
        highlight: "Double gold medalist at Asian Games 2023"
    },
    {
        name: "Tejaswin Shankar",
        discipline: "Combined Events / High Jump",
        achievement: "National Record holder in Decathlon, Commonwealth Games medalist",
        federationCup: "Decathlon champion and high jump specialist at Federation Cup",
        highlight: "Versatile multi-event athlete and high jump specialist"
    },
    {
        name: "Sreeshankar Murali's Legacy — Anju Bobby George",
        discipline: "Long Jump",
        achievement: "2003 World Championships Bronze, first Indian World Championships medalist in long jump",
        federationCup: "Pioneer who set multiple Federation Cup records in long jump",
        highlight: "Trailblazer for Indian women in field events"
    }
];

const RECORDS = [
    {
        event: "Javelin Throw (Men)",
        athlete: "Neeraj Chopra",
        record: "88.07m",
        year: "2021",
        venue: "Patiala",
        note: "Olympic qualification mark set ahead of Tokyo 2020"
    },
    {
        event: "100m (Women)",
        athlete: "Dutee Chand",
        record: "11.17s",
        year: "2021",
        venue: "Patiala",
        note: "National record, broke her own previous mark"
    },
    {
        event: "Long Jump (Women)",
        athlete: "Anju Bobby George",
        record: "6.83m",
        year: "2003",
        venue: "Various",
        note: "National record that stood for over 15 years"
    },
    {
        event: "400m (Women)",
        athlete: "Hima Das",
        record: "50.79s",
        year: "2018",
        venue: "Various",
        note: "National record set during breakthrough season"
    },
    {
        event: "Shot Put (Men)",
        athlete: "Tajinder Singh Toor",
        record: "21.77m",
        year: "2023",
        venue: "Bhubaneswar",
        note: "Asian Games gold medal-winning form"
    },
    {
        event: "Triple Jump (Men)",
        athlete: "Eldhose Paul",
        record: "17.02m",
        year: "2022",
        venue: "Various",
        note: "Commonwealth Games gold-winning distance"
    }
];

const CHAMPIONS = [
    { year: "2024", edition: "34th", venue: "Various", highlights: "Neeraj Chopra headlines javelin; new sprint stars emerge" },
    { year: "2023", edition: "33rd", venue: "Bhubaneswar", highlights: "Tajinder Singh Toor dominates shot put; Parul Chaudhary wins distance double" },
    { year: "2022", edition: "32nd", venue: "Thiruvananthapuram", highlights: "Eldhose Paul shines in triple jump; Sreeshankar excels in long jump" },
    { year: "2021", edition: "31st", venue: "Patiala", highlights: "Olympic preparation edition; Neeraj Chopra sets national mark in javelin" },
    { year: "2019", edition: "29th", venue: "Ranchi", highlights: "Pre-pandemic edition with strong performances across disciplines" },
    { year: "2018", edition: "28th", venue: "Guwahati", highlights: "Hima Das bursts onto scene; Dutee Chand dominates sprints" },
    { year: "2017", edition: "27th", venue: "Mangaluru", highlights: "Consolidation year with several junior athletes breaking through" },
    { year: "2016", edition: "26th", venue: "Hotki", highlights: "Distance runners and throwers post impressive national-level marks" }
];

const VENUES = [
    {
        name: "Jawaharlal Nehru Stadium, Delhi",
        location: "New Delhi",
        significance: "India's premier athletics venue; hosted multiple Federation Cup editions and the 2010 Commonwealth Games athletics events."
    },
    {
        name: "Birsa Munda Athletics Stadium, Ranchi",
        location: "Ranchi, Jharkhand",
        significance: "Modern athletics facility that has hosted recent Federation Cup championships with world-class track and field infrastructure."
    },
    {
        name: "Gachibowli Stadium, Hyderabad",
        location: "Hyderabad, Telangana",
        significance: "Historic venue for South Indian athletics that has hosted several national-level Federation Cup events."
    },
    {
        name: "Netaji Subhas Open University Stadium, Kolkata",
        location: "Kolkata, West Bengal",
        significance: "Eastern India hub for athletics; hosted Federation Cup editions attracting large crowds and top national athletes."
    },
    {
        name: "SAI Stadium, Patiala",
        location: "Patiala, Punjab",
        significance: "Major training and competition hub; hosted the 2021 Federation Cup where multiple national records were set."
    },
    {
        name: "Kalinga Stadium, Bhubaneswar",
        location: "Bhubaneswar, Odisha",
        significance: "State-of-the-art facility that has become a regular venue for high-profile Federation Cup championships."
    }
];

const TOURNAMENT_MILESTONES = [
    { year: "1991", title: "Inaugural Federation Cup", description: "The first Federation Cup Athletics Championships held in India, establishing a premier national platform for track and field." },
    { year: "1998", title: "International-Level Timing Introduced", description: "Electronic timing systems introduced to Federation Cup, aligning Indian athletics with global standards." },
    { year: "2003", title: "Anju Bobby George Creates History", description: "Anju Bobby George sets national records in long jump at the Federation Cup, paving the way for her World Championships bronze." },
    { year: "2012", title: "Kerala Dominance Era", description: "Athletes from Kerala begin a sustained period of excellence, winning multiple national titles at the Federation Cup." },
    { year: "2018", title: "Hima Das Breakthrough", description: "Hima Das announces herself on the national stage with stunning performances at the Federation Cup ahead of her World U-20 triumph." },
    { year: "2021", title: "Patiala Records Edition", description: "Multiple national records set at Patiala as athletes peaked for Tokyo Olympics qualification at the Federation Cup." },
    { year: "2022", title: "Post-Pandemic Resurgence", description: "Federation Cup returns to full-scale format with record participation and several Asian Games qualifying marks." },
    { year: "2023", title: "Bhubaneswar High-Performance Edition", description: "Federation Cup at Kalinga Stadium sees outstanding performances across throws and jumps, setting up Asian Games success." }
];

const REFERENCES = [
    { text: "Athletics Federation of India (AFI) — Official Federation Cup Records.", link: "https://www.indianathletics.com" },
    { text: "Sports Authority of India (SAI) — National Athletics Championships Archive.", link: "https://www.sai.gov.in" },
    { text: "World Athletics — Indian Athletics National Records and Statistics.", link: "https://worldathletics.org" },
    { text: "The Hindu & Sportstar — Federation Cup Athletics Coverage and Results.", link: "https://www.thehindu.com/sport/" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FEDERATION_INFO, DISCIPLINES, MAJOR_ATHLETES, RECORDS, CHAMPIONS, VENUES, TOURNAMENT_MILESTONES, REFERENCES };
}
