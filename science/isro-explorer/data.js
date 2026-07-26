export const missions = [
    {
        name: "Chandrayaan-1",
        type: "Lunar Exploration",
        category: "chandrayaan",
        launchDate: "22 October 2008",
        launchVehicle: "PSLV-C11",
        status: "Success",
        orbit: "100 km lunar orbit",
        overview: "India's first lunar mission, which made the groundbreaking discovery of water molecules on the Moon's surface. The orbiter carried 11 scientific instruments from India and international partners.",
        objectives: [
            "Map the lunar surface using remote sensing",
            "Detect and confirm presence of water ice on the Moon",
            "Study the lunar atmosphere and exosphere",
            "Create a 3D atlas of the Moon's surface",
            "Analyze mineral composition of lunar soil"
        ],
        keyMilestones: [
            "12 November 2008 — Moon Impact Probe (MIP) separated and impacted Moon surface",
            "25 November 2008 — NASA's M3 instrument confirmed water molecules",
            "July 2009 — Water discovery officially announced"
        ],
        achievements: [
            "First Indian mission to the Moon",
            "Discovered water molecules on the lunar surface (confirmed by NASA's M3)",
            "Successfully operated for 312 days (beyond planned 2 years)",
            "First Indian probe to impact the Moon"
        ],
        payload: "11 instruments (5 Indian, 3 NASA, 1 ESA, 1 Bulgarian)",
        mass: "1,380 kg (launch), 675 kg (orbiter)",
        cost: "₹386 crore",
        facts: [
            "The Moon Impact Probe hit the lunar south pole, confirming water presence",
            "Carried NASA's Mini-SAR radar that mapped water ice in permanently shadowed craters",
            "Mission was planned for 2 years but operated for 312 days due to attitude control issues"
        ]
    },
    {
        name: "Chandrayaan-2",
        type: "Lunar Exploration",
        category: "chandrayaan",
        launchDate: "22 July 2019",
        launchVehicle: "GSLV Mk III-M1",
        status: "Partial Success",
        orbit: "100 km lunar orbit (orbiter)",
        overview: "India's second lunar mission consisting of an orbiter, lander (Vikram), and rover (Pragyan). While the lander crashed during touchdown, the orbiter continues to operate and provided invaluable scientific data.",
        objectives: [
            "Soft-land on the lunar surface near the south pole",
            "Deploy a rover for surface exploration",
            "Study lunar topography, mineralogy, and exosphere from orbit",
            "Search for water ice at the south pole",
            "Measure lunar seismic activity"
        ],
        keyMilestones: [
            "22 July 2019 — Successful launch on GSLV Mk III",
            "20 August 2019 — Entered lunar orbit",
            "2 September 2019 — Lander and orbiter separated",
            "6 September 2019 — Vikram lander lost contact at 2.1 km altitude",
            "7 September 2019 — Vikram impacted lunar surface"
        ],
        achievements: [
            "Orbiter successfully entered lunar orbit — India's most powerful orbiter",
            "Orbiter continues to operate well beyond its planned 1-year mission",
            "Captured high-resolution images of the Moon's surface",
            "Demonstrated India's capability for lunar orbital insertion"
        ],
        payload: "8 orbiter instruments, 3 lander/rover instruments",
        mass: "3,850 kg (total)",
        cost: "₹978 crore",
        facts: [
            "The orbiter has enough fuel to last over 7 years",
            "Vikram lander lost communication at just 2.1 km above the surface",
            "Pragyan rover was designed to travel 500 m and analyze soil composition",
            "ISRO later found Vikram's impact site on the lunar surface"
        ]
    },
    {
        name: "Chandrayaan-3",
        type: "Lunar Exploration",
        category: "chandrayaan",
        launchDate: "14 July 2023",
        launchVehicle: "LVM3-M4",
        status: "Success",
        orbit: "100 km lunar orbit / South Pole landing",
        overview: "India's third lunar mission and the first to successfully land near the lunar south pole. The lander (Vikram) and rover (Pragyan) conducted in-situ scientific experiments for one lunar day.",
        objectives: [
            "Demonstrate soft landing capability on the lunar surface",
            "Deploy and operate the Pragyan rover",
            "Conduct in-situ chemical analysis of lunar soil",
            "Study the lunar south pole region",
            "Demonstrate roving capability on the Moon"
        ],
        keyMilestones: [
            "14 July 2023 — Launch on LVM3-M4 from SDSC SHAR",
            "1 August 2023 — Lunar orbit insertion",
            "17 August 2023 — Lander separated from propulsion module",
            "23 August 2023 — Successful soft landing near south pole at 69.37°S, 32.35°E",
            "24 August 2023 — Pragyan rover rolled out on lunar surface"
        ],
        achievements: [
            "First mission to land near the Moon's south pole",
            "India became 4th country to soft-land on the Moon",
            "Successfully demonstrated soft landing, roving, and in-situ experiments",
            "Rover confirmed presence of sulphur, iron, and other elements in lunar soil",
            "Cost-effective mission at ₹615 crore"
        ],
        payload: "4 lander instruments, 2 rover instruments",
        mass: "3,900 kg (total)",
        cost: "₹615 crore",
        facts: [
            "Successfully landed on 23 August 2023 — celebrated as National Space Day",
            "Pragyan rover travelled 100+ metres on the lunar surface",
            "Detected sulphur, aluminium, calcium, iron, titanium, and other elements",
            "Vikram lander performed hop experiment on the Moon — a world first"
        ]
    },
    {
        name: "Chandrayaan-4",
        type: "Lunar Sample Return",
        category: "chandrayaan",
        launchDate: "Planned 2026-2027",
        launchVehicle: "LVM3",
        status: "Planned",
        orbit: "Lunar orbit and return",
        overview: "India's ambitious sample return mission designed to bring lunar soil samples back to Earth. This mission will demonstrate rendezvous and docking in lunar orbit — a first for India.",
        objectives: [
            "Land on the Moon and collect 2-3 kg of lunar soil samples",
            "Ascend from the lunar surface to lunar orbit",
            "Dock with the Earth Return Orbiter in lunar orbit",
            "Return samples safely to Earth",
            "Demonstrate rendezvous and docking technology"
        ],
        keyMilestones: [
            "Planned launch in 2026-2027 timeframe",
            "Will require two LVM3 launches or a single heavier launch",
            "Involves 5 modules: Propulsion, Ascender, Descender, Sample Return, Earth Re-entry"
        ],
        achievements: [],
        payload: "Sample collection and return hardware",
        mass: "TBD (~5,000+ kg)",
        cost: "Estimated ₹2,000+ crore",
        facts: [
            "If successful, India will be 4th country to return lunar samples after USSR, USA, and China",
            "Involves complex in-orbit docking — a first for ISRO",
            "Planned to collect samples from a different site than Chang'e-6"
        ]
    },
    {
        name: "Mangalyaan (Mars Orbiter Mission)",
        type: "Mars Exploration",
        category: "mars-solar",
        launchDate: "5 November 2013",
        launchVehicle: "PSLV-C25",
        status: "Success (Mission ended 2022)",
        orbit: "377 km x 86,602 km around Mars",
        overview: "India's first interplanetary mission, which made ISRO the first agency to reach Mars orbit on its first attempt. It cost less than the movie Gravity and provided stunning images of Mars.",
        objectives: [
            "Develop technologies for Mars orbit insertion",
            "Study Martian surface features, morphology, and mineralogy",
            "Study the Martian atmosphere (methane detection)",
            "Study the effect of the solar wind on Mars exosphere",
            "Capture images of the Martian surface"
        ],
        keyMilestones: [
            "5 November 2013 — Launch from SDSC SHAR",
            "24 September 2014 — Mars orbit insertion — India became first Asian nation at Mars",
            "2022 — Mission officially ended after losing communication"
        ],
        achievements: [
            "First Asian nation to reach Mars orbit",
            "First agency in the world to succeed on its first Mars attempt",
            "Lowest-cost Mars mission ever at ₹450 crore ($67 million)",
            "Captured stunning images of Martian craters, Valles Marineris, and atmosphere",
            "Operated for nearly 8 years (planned for 6 months)"
        ],
        payload: "5 scientific instruments (Indian)",
        mass: "1,337 kg (spacecraft), 852 kg (orbiter)",
        cost: "₹450 crore ($67 million)",
        facts: [
            "Cost less than the Hollywood movie Gravity (budget ~$100 million)",
            "ISRO became the 4th agency to reach Mars after Roscosmos, NASA, and ESA",
            "The mission was conceived in just 18 months",
            "Carried the French MSRO instrument for methane detection"
        ]
    },
    {
        name: "Aditya-L1",
        type: "Solar Exploration",
        category: "mars-solar",
        launchDate: "2 September 2023",
        launchVehicle: "PSLV-C57",
        status: "Operational",
        orbit: "Halo orbit at Sun-Earth L1 point (1.5 million km)",
        overview: "India's first dedicated solar observatory mission, stationed at the Sun-Earth Lagrangian point L1. It studies the Sun's corona, chromosphere, and the solar wind in its native environment.",
        objectives: [
            "Study the solar corona and chromosphere",
            "Measure solar wind properties at L1",
            "Study Coronal Mass Ejections (CMEs) and solar flares",
            "Observe the Sun's photosphere and magnetic field",
            "Provide early warnings for solar storms"
        ],
        keyMilestones: [
            "2 September 2023 — Launch from SDSC SHAR",
            "30 September 2023 — Trans-L注入 injection",
            "6 January 2024 — Arrived at Sun-Earth L1 point",
            "January 2024 onwards — Scientific observations began"
        ],
        achievements: [
            "India's first solar observatory at the L1 point",
            "First space-based Indian mission to study the Sun continuously",
            "All 7 instruments functioning normally",
            "Captured first-ever full-disk images of the Sun from an Indian satellite",
            "Provided real-time solar storm monitoring"
        ],
        payload: "7 scientific instruments (VELC, SUIT, ASPEX, PAPA, SoLEXS, LAP, MAG)",
        mass: "1,475 kg (spacecraft)",
        cost: "₹378 crore",
        facts: [
            "Stationed 1.5 million km from Earth at the L1 Lagrange point",
            "L1 provides an uninterrupted view of the Sun",
            "VELC instrument captures solar corona — 10 times better resolution than any previous",
            "ASPEX is studying solar wind for the first time from near the Sun"
        ]
    },
    {
        name: "Gaganyaan",
        type: "Human Spaceflight",
        category: "gaganyaan",
        launchDate: "First crewed mission planned 2025",
        launchVehicle: "LVM3-G",
        status: "Testing Phase",
        orbit: "400 km low Earth orbit",
        overview: "India's first human spaceflight program designed to send Indian astronauts (Gaganauts) to a 400 km low Earth orbit for up to 3 days and return them safely to Earth.",
        objectives: [
            "Demonstrate end-to-end human spaceflight capability",
            "Develop life support and crew escape systems",
            "Train Indian astronauts for spaceflight",
            "Establish a sustainable human spaceflight program",
            "Lay foundation for future space station (Bharatiya Antariksh Station)"
        ],
        keyMilestones: [
            "21 December 2014 — Crew module sub-orbital test (TV-01)",
            "24 October 2023 — TV-D1 in-flight abort test successful",
            "17 February 2024 — TV-D2 second abort test successful",
            "2025 — Planned first crewed mission with 2-3 astronauts"
        ],
        achievements: [
            "First in-flight crew escape system test in India (TV-D1)",
            "Crew module survived 400°C re-entry temperatures",
            "3 Indian astronaut candidates completed training at Gagarin Cosmonaut Training Centre, Russia",
            "Full-scale crew module tested and validated",
            "If successful, India will be 4th country to send humans to space"
        ],
        payload: "3 crew members (Gaganauts)",
        mass: "8,200 kg (crew module), 3,700 kg (orbital module)",
        cost: "₹900 crore (estimated)",
        facts: [
            "The crew module interior was designed with ISRO and HAL collaboration",
            "3 Indian Air Force pilots were selected as astronaut candidates",
            "The mission will use a GSLV Mk III (LVM3) variant",
            "India's first crewed spaceflight will make ISRO the 4th national agency to independently send humans to space"
        ]
    }
];

export const launchers = [
    {
        name: "PSLV",
        fullName: "Polar Satellite Launch Vehicle",
        type: "Workhorse",
        color: "#ff6b35",
        stages: "4-stage (solid + liquid)",
        height: "44.4 m",
        diameter: "2.8 m",
        mass: "320,000 kg",
        payloadLEO: "3,200 kg",
        payloadSSO: "1,750 kg",
        totalLaunches: 58,
        successRate: "96%",
        firstFlight: "20 September 1993",
        description: "PSLV is ISRO's most reliable and frequently used launch vehicle. Known as the 'Workhorse of ISRO', it has launched India's most critical missions including Chandrayaan-1, Mangalyaan, and Aditya-L1. It uses a unique combination of solid and liquid propulsion stages.",
        variants: [
            { name: "PSLV-CA (Core Alone)", payload: "2,100 kg SSO", desc: "Without strap-on boosters for lighter payloads" },
            { name: "PSLV-DL", payload: "2,200 kg SSO", desc: "2 strap-on boosters" },
            { name: "PSLV-QL", payload: "2,600 kg SSO", desc: "4 strap-on boosters" },
            { name: "PSLV-XL", payload: "3,200 kg SSO", desc: "6 strap-on boosters — full configuration" }
        ],
        notableMissions: ["Chandrayaan-1", "Mangalyaan", "Aditya-L1", "Cartosat series", "RISAT-2B"],
        achievements: [
            "58 consecutive successful launches (longest streak)",
            "Launched 104 satellites in a single mission (2017 world record)",
            "Successfully launched India's first interplanetary mission (Mangalyaan)",
            "Back-to-back launches in record time"
        ]
    },
    {
        name: "GSLV",
        fullName: "Geosynchronous Satellite Launch Vehicle",
        type: "Medium-lift",
        color: "#003580",
        stages: "3-stage (solid + liquid + cryogenic)",
        height: "49.9 m",
        diameter: "3.4 m",
        mass: "414,000 kg",
        payloadGTO: "2,500 kg",
        payloadLEO: "5,000 kg",
        totalLaunches: 15,
        successRate: "73%",
        firstFlight: "18 April 2001",
        description: "GSLV is India's medium-lift launch vehicle capable of placing satellites in geosynchronous transfer orbit. Its cryogenic upper stage, originally with Russian assistance, is now fully indigenous. It was used for Chandrayaan-2 and is India's primary GTO launcher.",
        variants: [
            { name: "GSLV Mk II", payload: "2,500 kg GTO", desc: "Indigenous cryogenic upper stage (CE-7.5)" },
            { name: "GSLV Mk III (LVM3)", payload: "4,000 kg GTO", desc: "Upgraded version with CE-20 cryogenic engine" }
        ],
        notableMissions: ["Chandrayaan-2", "Chandrayaan-3", "GSAT series", "NavIC satellites", "NVS-01"],
        achievements: [
            "Successfully demonstrated indigenous cryogenic technology",
            "Powered Chandrayaan-3 to lunar orbit",
            "Now known as LVM3 — India's heavy-lift workhorse",
            "Carries crew module for Gaganyaan"
        ]
    },
    {
        name: "LVM3",
        fullName: "Launch Vehicle Mark-3 (formerly GSLV Mk III)",
        type: "Heavy-lift",
        color: "#1a6b3c",
        stages: "3-stage (solid + liquid + cryogenic)",
        height: "51.9 m",
        diameter: "4.0 m",
        mass: "640,000 kg",
        payloadGTO: "4,000 kg",
        payloadLEO: "10,000 kg",
        totalLaunches: 6,
        successRate: "100%",
        firstFlight: "18 December 2014",
        description: "LVM3 is India's heaviest launch vehicle, designed for heavy satellites and human spaceflight. With its powerful CE-20 cryogenic engine, it can carry 4,000 kg to GTO. It is the designated launcher for Gaganyaan and has successfully launched Chandrayaan-2 and Chandrayaan-3.",
        variants: [
            { name: "LVM3-M", payload: "4,000 kg GTO", desc: "Standard configuration" },
            { name: "LVM3-M4", payload: "4,000 kg GTO", desc: "Chandrayaan-3 configuration" },
            { name: "LVM3-G", payload: "Crew module", desc: "Gaganyaan human-rated variant" }
        ],
        notableMissions: ["Chandrayaan-2", "Chandrayaan-3", "OneWeb India constellation"],
        achievements: [
            "100% success rate across all missions",
            "Powered India's first lunar landing (Chandrayaan-3)",
            "Will carry Indian astronauts to space (Gaganyaan)",
            "Commercial launch contract with OneWeb for broadband satellites"
        ]
    },
    {
        name: "SSLV",
        fullName: "Small Satellite Launch Vehicle",
        type: "Small-lift",
        color: "#9b59b6",
        stages: "3-stage (solid + solid + liquid)",
        height: "34 m",
        diameter: "2.0 m",
        mass: "120,000 kg",
        payloadSSO: "500 kg",
        totalLaunches: 3,
        successRate: "67%",
        firstFlight: "28 August 2022",
        description: "SSLV is ISRO's newest and smallest launch vehicle designed for quick, low-cost launches of small satellites. It can be assembled in just 72 hours with minimal infrastructure, making it ideal for commercial small satellite missions.",
        variants: [
            { name: "SSLV-D1", payload: "500 kg SSO", desc: "First development flight (partial success)" },
            { name: "SSLV-D2", payload: "500 kg SSO", desc: "Second development flight (success)" },
            { name: "SSLV-D3", payload: "500 kg SSO", desc: "Operational configuration (success)" }
        ],
        notableMissions: ["Earth Observation Satellite (EOS-02)", "AISATS", "EOS-07"],
        achievements: [
            "India's first dedicated small satellite launch vehicle",
            "Can be assembled in just 72 hours (vs months for larger rockets)",
            "Minimal launch pad infrastructure required",
            "Opens commercial launch market for small satellite operators"
        ]
    }
];

export const timeline = [
    { year: "1962", event: "Indian National Committee for Space Research (INCOSPAR) established under Dr. Vikram Sarabhai", type: "milestone" },
    { year: "1963", event: "First rocket launched from Thumba Equatorial Rocket Launching Station", type: "launch" },
    { year: "1969", event: "ISRO formally established on 15 August", type: "milestone" },
    { year: "1972", event: "Space Commission and Department of Space created", type: "milestone" },
    { year: "1975", event: "Aryabhata — India's first satellite launched", type: "satellite" },
    { year: "1979", event: "SLV-3 first developmental flight (partial success)", type: "launch" },
    { year: "1980", event: "SLV-3 launches Rohini — India's first satellite launch from Indian soil", type: "launch" },
    { year: "1984", event: "Rakesh Sharma becomes first Indian in space (Soyuz T-11)", type: "milestone" },
    { year: "1987", event: "ASLV first developmental flight", type: "launch" },
    { year: "1993", event: "PSLV-C1 first flight — India's workhorse rocket", type: "launch" },
    { year: "1994", event: "IRS-P2 launched successfully", type: "satellite" },
    { year: "1997", event: "INSAT-2B operational — India's communication satellite network", type: "satellite" },
    { year: "2001", event: "GSLV-D1 first flight", type: "launch" },
    { year: "2003", event: "GSAT-2 successfully launched", type: "satellite" },
    { year: "2006", event: "PSLV-C8 launches SPADEX — space docking experiment", type: "launch" },
    { year: "2008", event: "Chandrayaan-1 launched — first lunar mission", type: "mission" },
    { year: "2008", event: "Water discovered on the Moon by Chandrayaan-1", type: "discovery" },
    { year: "2013", event: "Mangalyaan (MOM) launched towards Mars", type: "mission" },
    { year: "2014", event: "Mangalyaan enters Mars orbit — India at Mars on first attempt", type: "milestone" },
    { year: "2014", event: "LVM3-X first developmental flight with crew module", type: "launch" },
    { year: "2016", event: "Scramjet engine test — air-breathing propulsion", type: "milestone" },
    { year: "2017", event: "PSLV-C37 launches 104 satellites — world record", type: "launch" },
    { year: "2018", event: "GSLV-F08 launches GSAT-6A", type: "launch" },
    { year: "2019", event: "Chandrayaan-2 launched towards Moon", type: "mission" },
    { year: "2019", event: "Vikram lander lost contact at 2.1 km from Moon surface", type: "mission" },
    { year: "2022", event: "SSLV-D1 first developmental flight", type: "launch" },
    { year: "2023", event: "Chandrayaan-3 lands near lunar south pole — India on the Moon", type: "milestone" },
    { year: "2023", event: "Aditya-L1 launched towards Sun-Earth L1", type: "mission" },
    { year: "2024", event: "Aditya-L1 arrives at L1 point — India's first solar observatory", type: "milestone" },
    { year: "2024", event: "Gaganyaan TV-D1 in-flight abort test successful", type: "test" },
    { year: "2024", event: "Gaganyaan TV-D2 second abort test successful", type: "test" },
    { year: "2025", event: "Gaganyaan first crewed mission planned", type: "mission" },
    { year: "2026", event: "Chandrayaan-4 sample return mission planned", type: "mission" }
];

export const achievements = [
    { title: "First Asian at Mars", description: "ISRO became the first Asian agency to reach Mars orbit with Mangalyaan in 2014, and the first in the world to succeed on its first attempt.", category: "First", year: "2014" },
    { title: "Moon's South Pole Landing", description: "Chandrayaan-3 achieved the first-ever soft landing near the Moon's south pole, making India the 4th country to land on the Moon.", category: "First", year: "2023" },
    { title: "Water on the Moon", description: "Chandrayaan-1's M3 instrument confirmed the presence of water molecules on the lunar surface — a groundbreaking discovery.", category: "Discovery", year: "2008" },
    { title: "104 Satellites in One Launch", description: "PSLV-C37 launched 104 satellites in a single mission in 2017, setting a world record at the time.", category: "Record", year: "2017" },
    { title: "Lowest-Cost Mars Mission", description: "Mangalyaan cost just ₹450 crore ($67 million) — less than the budget of the movie Gravity.", category: "Record", year: "2014" },
    { title: "First Indian in Space", description: "Squadron Leader Rakesh Sharma flew aboard Soyuz T-11 in 1984, becoming the first Indian cosmonaut.", category: "First", year: "1984" },
    { title: "Indigenous Cryogenic Engine", description: "ISRO developed the CE-7.5 and CE-20 cryogenic engines domestically after being denied technology transfer.", category: "Technology", year: "2010" },
    { title: "Reusable Launch Vehicle", description: "ISRO successfully tested the Reusable Launch Vehicle Technology Demonstrator (RLV-TD) for reusable space access.", category: "Technology", year: "2016" },
    { title: "Solar Observatory at L1", description: "Aditya-L1 is India's first dedicated solar observatory, stationed 1.5 million km from Earth at the Sun-Earth L1 point.", category: "First", year: "2024" },
    { title: "Mars Methane Detection", description: "Mangalyaan's Methane sensor detected trace amounts of methane in the Martian atmosphere, contributing to Mars science.", category: "Discovery", year: "2015" },
    { title: "Human-Rated LVM3", description: "ISRO developed a human-rated version of LVM3 (GSLV Mk III) for the Gaganyaan crewed spaceflight mission.", category: "Technology", year: "2024" },
    { title: "World Record Satellite Launch", description: "PSLV launched 104 satellites from 7 countries in a single flight — a feat unmatched by any other launch vehicle at the time.", category: "Record", year: "2017" }
];

export const timelineCategories = {
    milestone: { label: "Milestone", color: "#ff9933" },
    launch: { label: "Launch", color: "#1a6b3c" },
    satellite: { label: "Satellite", color: "#003580" },
    mission: { label: "Mission", color: "#9b59b6" },
    discovery: { label: "Discovery", color: "#e74c3c" },
    test: { label: "Test", color: "#3498db" }
};
