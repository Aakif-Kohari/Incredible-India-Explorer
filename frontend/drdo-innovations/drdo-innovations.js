/* drdo-innovations.js — Maximum Animation + Image Cards */

const CATEGORY_IMAGES = {
    "missile-systems": "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600&h=400&fit=crop&q=80",
    "radar": "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&h=400&fit=crop&q=80",
    "uavs": "https://images.unsplash.com/photo-1507582201293-593083e56b32?w=600&h=400&fit=crop&q=80",
    "avionics": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&q=80",
    "weapons": "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&h=400&fit=crop&q=80",
    "cyber": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop&q=80",
    "naval": "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?w=600&h=400&fit=crop&q=80",
    "space": "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=600&h=400&fit=crop&q=80",
    "life-sciences": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop&q=80"
};

const DRDO_DATA = [
    { name:"Agni-V", subtitle:"Intercontinental Ballistic Missile", category:"missile-systems", era:"2010s", year:"2012", lab:"DRDL, Hyderabad", shortDesc:"India's most advanced ICBM with a range of 5,000+ km and MIRV capability.", fullDesc:"<p>Agni-V is India's most powerful intercontinental ballistic missile, developed by DRDL under the Integrated Guided Missile Development Programme.</p><p>It has a range of over 5,000 km, features a three-stage solid-fuel propulsion system, canister-launched design, and MIRV technology for multiple warheads. First tested April 19, 2012.</p>", gradient:"linear-gradient(135deg, rgba(239,68,68,0.25), rgba(127,29,29,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Advanced_Agni_Missile.jpg/960px-Advanced_Agni_Missile.jpg" },
    { name:"Agni-P", subtitle:"Next-Gen Medium Range Ballistic Missile", category:"missile-systems", era:"2020s", year:"2021", lab:"DRDL, Hyderabad", shortDesc:"Advanced MIRV-capable missile with canister launch and enhanced accuracy.", fullDesc:"<p>Agni-P is a next-generation MRBM replacing Agni-I and Agni-II. Features two-stage solid-fuel engine, canister-based launch, and CEP under 10 meters. First tested June 28, 2021.</p>", gradient:"linear-gradient(135deg, rgba(251,146,60,0.25), rgba(234,179,8,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Agni_P_Ballistic_Missile_first_flight_test.jpg/960px-Agni_P_Ballistic_Missile_first_flight_test.jpg" },
    { name:"BrahMos", subtitle:"Supersonic Cruise Missile", category:"missile-systems", era:"2000s", year:"2001", lab:"BrahMos Aerospace, Delhi", shortDesc:"World's fastest cruise missile at Mach 2.8, a joint India-Russia venture.", fullDesc:"<p>BrahMos is a ramjet-powered supersonic cruise missile at Mach 2.8 (3,430 km/h). Range 290+ km. Launched from submarines, ships, aircraft, or land. Inducted into all three services, exported to Philippines.</p>", gradient:"linear-gradient(135deg, rgba(59,130,246,0.25), rgba(99,102,241,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/The_Brahmos_Missile_system_passes_through_the_Rajpath_during_the_full_dress_rehearsal_for_the_Republic_Day_Parade_in_New_Delhi_on_January_23%2C2006.jpg/960px-The_Brahmos_Missile_system_passes_through_the_Rajpath_during_the_full_dress_rehearsal_for_the_Republic_Day_Parade_in_New_Delhi_on_January_23%2C2006.jpg" },
    { name:"Astra", subtitle:"Beyond Visual Range Air-to-Air Missile", category:"missile-systems", era:"2010s", year:"2014", lab:"DRDL, Hyderabad", shortDesc:"Indigenous BVR missile with 100+ km range for IAF fighters.", fullDesc:"<p>Astra is India's first BVR air-to-air missile with 100+ km range. Features solid-propellant rocket motor, inertial mid-course guidance, and active radar terminal homing. Operable from Su-30MKI, Tejas, MiG-29.</p>", gradient:"linear-gradient(135deg, rgba(234,179,8,0.25), rgba(250,204,21,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Astrabvraam.png/960px-Astrabvraam.png" },
    { name:"Prithvi", subtitle:"Tactical Surface-to-Surface Missile", category:"missile-systems", era:"1990s", year:"1994", lab:"DRDL, Hyderabad", shortDesc:"First missile under IGMDP with 150-350 km range variants.", fullDesc:"<p>Prithvi was the first IGMDP missile. Three variants: Prithvi-I (Army, 150 km), Prithvi-II (Air Force, 350 km), Prithvi-III (Navy, 350 km). First tested Feb 25, 1988, inducted 1994.</p>", gradient:"linear-gradient(135deg, rgba(168,85,247,0.25), rgba(192,132,252,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Prithvi-II_missile_launch_on_11_March_2011_%28cropped%29.jpg/960px-Prithvi-II_missile_launch_on_11_March_2011_%28cropped%29.jpg" },
    { name:"Akash", subtitle:"Medium-Range Surface-to-Air Missile", category:"missile-systems", era:"1990s", year:"1997", lab:"DRDL, Hyderabad", shortDesc:"Indigenous SAM system with 25-30 km range for air defence.", fullDesc:"<p>Akash is a medium-range SAM for IAF and Army. Engages targets at 25-30 km, up to 18 km altitude. Uses ramjet propulsion at Mach 2.5, Rajendra phased array radar. Upgraded Akash-NG in development.</p>", gradient:"linear-gradient(135deg, rgba(34,197,94,0.25), rgba(74,222,128,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/AkashPrimeSAM.jpg/960px-AkashPrimeSAM.jpg" },
    { name:"Long Range SAM (LRSAM)", subtitle:"Naval Air Defence Missile System", category:"missile-systems", era:"2010s", year:"2017", lab:"DRDO & IAI", shortDesc:"Advanced naval air defence for Indian Navy warships with 70+ km range.", fullDesc:"<p>LRSAM (Barak-8) is a joint DRDO-IAI naval air defence system. 360-degree protection, 70+ km range, active radar seeker, dual-pulse motor. Installed on Kolkata, Visakhapatnam, Nilgiri destroyers and INS Vikrant.</p>", gradient:"linear-gradient(135deg, rgba(244,63,94,0.25), rgba(251,113,133,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Salon_du_Bourget_20090619_077.jpg/960px-Salon_du_Bourget_20090619_077.jpg" },
    { name:"MRSAM (IAF/Army)", subtitle:"Medium Range Surface-to-Air Missile", category:"missile-systems", era:"2010s", year:"2016", lab:"DRDO & IAI", shortDesc:"Land-based Barak-8 variant with 70 km range for IAF and Army.", fullDesc:"<p>MRSAM is the land-based Barak-8 variant. Active radar seeker, dual-pulse propulsion, 70 km range, 16 km altitude. Inducted into IAF and Army for ground-based air defence.</p>", gradient:"linear-gradient(135deg, rgba(99,102,241,0.25), rgba(129,140,248,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Salon_du_Bourget_20090619_077.jpg/960px-Salon_du_Bourget_20090619_077.jpg" },
    { name:"AFNet", subtitle:"Air Force Network", category:"cyber", era:"2010s", year:"2010", lab:"DRDO & C-DAC", shortDesc:"Secure high-speed network connecting all IAF assets.", fullDesc:"<p>AFNet is a secure fibre-optic backbone connecting all IAF stations and operational assets. Developed by DRDO and C-DAC with encryption and cyber security. Backbone of India's integrated air defence network.</p>", gradient:"linear-gradient(135deg, rgba(20,184,166,0.25), rgba(45,212,191,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/The_Defence_Minister%2C_Shri_A._K._Antony_addressing_at_the_inauguration_of_the_IAF%E2%80%99s_gigabyte_digital_information_grid_%E2%80%93_the_AFNET_%28Air_Force_Network%29%2C_in_New_Delhi_on_September_14%2C_2010.jpg/960px-thumbnail.jpg" },
    { name:"NETRA", subtitle:"Airborne Early Warning & Control", category:"radar", era:"2010s", year:"2012", lab:"LRDE, Bangalore", shortDesc:"Indigenous AEW&C on Embraer ERJ-145 with 240-degree coverage.", fullDesc:"<p>NETRA is India's indigenous AEW&C on Embraer ERJ-145. AESA radar with 200+ km range, 240-degree coverage, 200+ simultaneous target tracking. Enhances India's airspace surveillance.</p>", gradient:"linear-gradient(135deg, rgba(34,197,94,0.25), rgba(74,222,128,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/NetraAwacs.jpg/960px-NetraAwacs.jpg" },
    { name:"Phalcon AWACS", subtitle:"Airborne Warning & Control System", category:"radar", era:"2000s", year:"2004", lab:"DRDO & Israel (IAI)", shortDesc:"360-degree airborne radar with 400 km range on Il-76.", fullDesc:"<p>Phalcon AWACS on Il-76 with 360-degree radar dome, 400+ km detection range. India operates three systems. Detects low-flying aircraft, cruise missiles, and UAVs beyond ground-radar limits.</p>", gradient:"linear-gradient(135deg, rgba(59,130,246,0.25), rgba(96,165,250,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/NetraAwacs.jpg/960px-NetraAwacs.jpg" },
    { name:"Uttam AESA Radar", subtitle:"Active Electronically Scanned Array Radar", category:"radar", era:"2020s", year:"2021", lab:"LRDE, Bangalore", shortDesc:"Indigenous AESA radar for Tejas Mk2 with multi-mode capabilities.", fullDesc:"<p>Uttam is India's first indigenous AESA fire control radar for Tejas Mk2. GaN-based TR modules, 100+ km detection, multi-mode (air-to-air, air-to-ground, SAR, GMTI). India joins the AESA-capable nations.</p>", gradient:"linear-gradient(135deg, rgba(234,179,8,0.25), rgba(250,204,21,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/AAAU_of_DRDO_Uttam_AESA_radar.png/960px-AAAU_of_DRDO_Uttam_AESA_radar.png" },
    { name:"Rustom-2", subtitle:"MALE UAV", category:"uavs", era:"2010s", year:"2016", lab:"ADE, Bangalore", shortDesc:"MALE UAV with 24+ hour endurance for ISR missions.", fullDesc:"<p>Rustom-2 (TAPAS-BH-201) is a MALE UAV from ADE. 21m wingspan, 22,000 ft altitude, 350 kg payload, 24+ hours endurance. Carries EO/IR, SAR, and EW payloads for persistent border surveillance.</p>", gradient:"linear-gradient(135deg, rgba(99,102,241,0.25), rgba(129,140,248,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Rustom_flight_2_%28cropped%29.jpg/960px-Rustom_flight_2_%28cropped%29.jpg" },
    { name:"GHATAK", subtitle:"Autonomous Stealth UCAV", category:"uavs", era:"2020s", year:"2022", lab:"ADE, Bangalore", shortDesc:"India's stealth combat UAV with flying wing design.", fullDesc:"<p>GHATAK is India's autonomous stealth UCAV with flying wing design for low RCS. Internal weapons bays, turbofan engine. Can conduct deep penetration strikes and ISR autonomously.</p>", gradient:"linear-gradient(135deg, rgba(139,92,246,0.25), rgba(167,139,250,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Autonomous_Flying_wing_Tech.jpg/960px-Autonomous_Flying_wing_Tech.jpg" },
    { name:"Tapas BH-201", subtitle:"Tactical Airborne Surveillance Platform", category:"uavs", era:"2010s", year:"2018", lab:"ADE, Bangalore", shortDesc:"Medium-range reconnaissance UAV with 18-hour endurance.", fullDesc:"<p>Tapas BH-201 is a medium-range ISR UAV from ADE. 18-hour endurance, 22,000 ft altitude. Carries EO/IR, SAR radar, and communication relay. Supports BLOS operations via SATCOM.</p>", gradient:"linear-gradient(135deg, rgba(20,184,166,0.25), rgba(45,212,191,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Rustom_flight_2_%28cropped%29.jpg/960px-Rustom_flight_2_%28cropped%29.jpg" },
    { name:"Tejas LCA", subtitle:"Light Combat Aircraft", category:"avionics", era:"2000s", year:"2003", lab:"HAL & ADA, Bangalore", shortDesc:"Indigenous 4th-gen fighter with glass cockpit and fly-by-wire.", fullDesc:"<p>Tejas LCA is India's 4th-gen multirole fighter by ADA/HAL. Composite airframe, quadruple-redundant fly-by-wire, glass cockpit. Mk1A adds AESA radar and BVR capability. 40+ delivered, 83 Mk1A on order.</p>", gradient:"linear-gradient(135deg, rgba(234,179,8,0.25), rgba(250,204,21,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/HAL_Tejas_%28LA-5018%29_of_Squadron_18_Flying_Bullets.jpg/960px-HAL_Tejas_%28LA-5018%29_of_Squadron_18_Flying_Bullets.jpg" },
    { name:"Tejas Mk2", subtitle:"Medium Weight Fighter", category:"avionics", era:"2020s", year:"2026", lab:"ADA & HAL, Bangalore", shortDesc:"Upgraded Tejas with GE F414 engine and AESA radar.", fullDesc:"<p>Tejas Mk2 with GE F414 engine (98 kN), increased fuel, stretched airframe. Integrates Uttam AESA radar, advanced EW, helmet-mounted display, and extended weapon carriage.</p>", gradient:"linear-gradient(135deg, rgba(59,130,246,0.25), rgba(96,165,250,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/HAL_Tejas_%28LA-5018%29_of_Squadron_18_Flying_Bullets.jpg/960px-HAL_Tejas_%28LA-5018%29_of_Squadron_18_Flying_Bullets.jpg" },
    { name:"AMCA", subtitle:"Advanced Medium Combat Aircraft", category:"avionics", era:"2020s", year:"2024", lab:"ADA & HAL", shortDesc:"India's 5th-gen stealth fighter with supercruise.", fullDesc:"<p>AMCA is India's 5th-gen stealth fighter. Diamond-shaped stealth airframe, internal weapons bays, AESA radar, AI-assisted avionics, supercruise capability. Expected first flight late 2020s.</p>", gradient:"linear-gradient(135deg, rgba(244,63,94,0.25), rgba(251,113,133,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/AMCA_model_displayed_during_Aero_India_2021.jpg/960px-AMCA_model_displayed_during_Aero_India_2021.jpg" },
    { name:"INSAS Rifle", subtitle:"Indian Small Arms System", category:"weapons", era:"1990s", year:"1996", lab:"OFB, Ishapore", shortDesc:"Standard issue 5.56mm assault rifle for Indian forces.", fullDesc:"<p>INSAS is India's indigenous 5.56x45mm assault rifle by OFB Ishapore. Gas-operated, rotating bolt, semi-auto and auto modes. Standard-issue since 1996.</p>", gradient:"linear-gradient(135deg, rgba(168,85,247,0.25), rgba(192,132,252,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/a/a5/INSAS_rifle_%28Browngirl06%29.jpg" },
    { name:"AK-203", subtitle:"Modern 7.62mm Infantry Rifle", category:"weapons", era:"2020s", year:"2021", lab:"Korwa Ordnance Factory", shortDesc:"Modern rifle replacing INSAS, joint India-Russia production.", fullDesc:"<p>AK-203 is a 7.62x39mm rifle manufactured at Korwa via OFB-Kalashnikov JV. 700,000+ ordered. Picatinny rails, modern ergonomics, proven Kalashnikov reliability.</p>", gradient:"linear-gradient(135deg, rgba(139,92,246,0.25), rgba(167,139,250,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/IndianArmyAK203_1.jpg/960px-IndianArmyAK203_1.jpg" },
    { name:"Pinaka", subtitle:"Multi-Barrel Rocket Launcher", category:"weapons", era:"1990s", year:"1999", lab:"ARDE, Pune", shortDesc:"MLRS with 75 km range, 12 rockets in 44 seconds.", fullDesc:"<p>Pinaka MLRS fires 12 rockets in 44 seconds. Mk1 (37.5 km), Mk2 (60 km), Mk3 (75+ km with guided rockets). Validated during 1999 Kargil conflict. Tata vehicle chassis, GPS/INS guided.</p>", gradient:"linear-gradient(135deg, rgba(251,146,60,0.25), rgba(253,186,116,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Pinaka_Multi_Launcher_Rocket_System_passes_through_the_Rajpath%2C_at_the_72nd_Republic_Day_Celebrations%2C_in_New_Delhi_on_January_26%2C_2021.jpg/960px-Pinaka_Multi_Launcher_Rocket_System_passes_through_the_Rajpath%2C_at_the_72nd_Republic_Day_Celebrations%2C_in_New_Delhi_on_January_26%2C_2021.jpg" },
    { name:"VSHORADS", subtitle:"Very Short Range Air Defence", category:"weapons", era:"2020s", year:"2022", lab:"DRDO & IAF", shortDesc:"Man-portable SAM for frontline troops, 8 km range.", fullDesc:"<p>VSHORADS is a man-portable SAM with 8 km range. Dual-band IIR seeker, lock-on-before-launch, fire-and-forget. Deployable in under 2 minutes. 80%+ hit probability.</p>", gradient:"linear-gradient(135deg, rgba(234,179,8,0.25), rgba(250,204,21,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/VSHORADS_Test_firing.jpg/960px-VSHORADS_Test_firing.jpg" },
    { name:"DRDO AI Cyber Defence", subtitle:"AI-Powered Network Security", category:"cyber", era:"2020s", year:"2023", lab:"C-DAC & DRDO Labs", shortDesc:"AI-driven cyber defence for critical infrastructure.", fullDesc:"<p>DRDO's AI cyber defence uses ML to detect, analyse, and respond to threats in real-time. Integrates threat intelligence, behavioural analytics, and deep learning for proactive protection against APTs and zero-days.</p>", gradient:"linear-gradient(135deg, rgba(20,184,166,0.25), rgba(45,212,191,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/The_Defence_Minister%2C_Shri_A._K._Antony_addressing_at_the_inauguration_of_the_IAF%E2%80%99s_gigabyte_digital_information_grid_%E2%80%93_the_AFNET_%28Air_Force_Network%29%2C_in_New_Delhi_on_September_14%2C_2010.jpg/960px-thumbnail.jpg" },
    { name:"HUMRA EW Suite", subtitle:"Advanced Electronic Warfare System", category:"cyber", era:"2010s", year:"2018", lab:"LRDE & DRDE, Bangalore", shortDesc:"Integrated EW suite for jamming and signals intelligence.", fullDesc:"<p>HUMRA is an integrated EW suite for ESM, ECM, ECCM. Wideband noise and deceptive jamming. Deployable on vehicles, ships, and aircraft. Ensures electromagnetic superiority.</p>", gradient:"linear-gradient(135deg, rgba(99,102,241,0.25), rgba(129,140,248,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/NetraAwacs.jpg/960px-NetraAwacs.jpg" },
    { name:"INS Vikrant (IAC-1)", subtitle:"Indigenous Aircraft Carrier", category:"naval", era:"2020s", year:"2022", lab:"DRDO, Cochin Shipyard", shortDesc:"India's first indigenous aircraft carrier, 40,000 tonnes.", fullDesc:"<p>INS Vikrant is India's first indigenous AC, commissioned Sept 2, 2022. 40,000 tonnes, 252m flight deck, STOBAR config. Operates MiG-29K and MH-60R. Four GE LM2500+ turbines, 28 knots max.</p>", gradient:"linear-gradient(135deg, rgba(59,130,246,0.25), rgba(96,165,250,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/INS_Vikrant_%28R11%29_and_INS_Vikramaditya_%28R33%29_with_the_carrier_battle_group.jpg/960px-INS_Vikrant_%28R11%29_and_INS_Vikramaditya_%28R33%29_with_the_carrier_battle_group.jpg" },
    { name:"Scorpene Class Submarine", subtitle:"Advanced Diesel-Electric Submarine", category:"naval", era:"2010s", year:"2017", lab:"DRDO & Mazagon Dock", shortDesc:"Stealth submarines for deep-sea and anti-surface warfare.", fullDesc:"<p>Scorpene (Kalvari class) built at Mazagon Dock with Naval Group tech transfer. Advanced stealth, 300m+ depth, heavyweight torpedoes, Exocet missiles. Six boats enhancing India's submarine fleet.</p>", gradient:"linear-gradient(135deg, rgba(99,102,241,0.25), rgba(129,140,248,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kalvari_class_submarine_during_an_exercise.jpg/960px-Kalvari_class_submarine_during_an_exercise.jpg" },
    { name:"K-15 Sagarika", subtitle:"Submarine-Launched Ballistic Missile", category:"space", era:"2000s", year:"2008", lab:"DRDL, Hyderabad", shortDesc:"SLBM with 750 km range for sea-based nuclear deterrent.", fullDesc:"<p>K-15 Sagarika is India's SLBM with 750 km range. Two-stage solid propulsion, inertial guidance. Deployed on Arihant-class SSBNs. Cornerstone of India's sea-based nuclear deterrent.</p>", gradient:"linear-gradient(135deg, rgba(34,197,94,0.25), rgba(74,222,128,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/INS_Arihant_at_sea_%28cropped%29.jpg/960px-INS_Arihant_at_sea_%28cropped%29.jpg" },
    { name:"K-4 SLBM", subtitle:"Intermediate Range SLBM", category:"space", era:"2010s", year:"2014", lab:"DRDL, Hyderabad", shortDesc:"3,500 km range SLBM for second-gen SSBN deterrent.", fullDesc:"<p>K-4 is India's intermediate-range SLBM at 3,500 km. Three-stage solid propulsion, sub-100m CEP. Will arm INS Arighat and subsequent SSBNs. Critical second-strike capability.</p>", gradient:"linear-gradient(135deg, rgba(244,63,94,0.25), rgba(251,113,133,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/INS_Arihant_at_sea_%28cropped%29.jpg/960px-INS_Arihant_at_sea_%28cropped%29.jpg" },
    { name:"HEXO-DRDO Bio Suit", subtitle:"CBRN Protective Suit", category:"life-sciences", era:"2020s", year:"2020", lab:"DRDO Labs (Multiple)", shortDesc:"Multi-layered CBRN protection suit for defence personnel.", fullDesc:"<p>HEXO-DRDO bio suit with activated carbon, biological barrier, radiation-shielding nanoparticles, and SCBA. 45-minute operations in contaminated zones. Inducted into all three services.</p>", gradient:"linear-gradient(135deg, rgba(16,185,129,0.25), rgba(52,211,153,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/AAAU_of_DRDO_Uttam_AESA_radar.png/960px-AAAU_of_DRDO_Uttam_AESA_radar.png" },
    { name:"Life Support Systems", subtitle:"High-Altitude Life Support", category:"life-sciences", era:"2010s", year:"2015", lab:"DEBEL, Bangalore", shortDesc:"Oxygen and environmental systems for extreme altitude ops.", fullDesc:"<p>DEBEL's systems include portable oxygen concentrators, heated clothing (-60C rated), and advanced cold-weather rations. Molecular sieve oxygen at 18,000+ ft. Enhances Siachen/LAC troop survivability.</p>", gradient:"linear-gradient(135deg, rgba(34,197,94,0.25), rgba(74,222,128,0.1))", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/INS_Arihant_at_sea_%28cropped%29.jpg/960px-INS_Arihant_at_sea_%28cropped%29.jpg" }
];

const TIMELINE_DATA = [
    { year:"1958", title:"DRDO Founded", desc:"Defence Science Organisation reconstituted as DRDO.", color:"#f87171" },
    { year:"1962", title:"ADE Established", desc:"Aeronautical Development Establishment set up in Bangalore.", color:"#fb923c" },
    { year:"1983", title:"IGMDP Launched", desc:"Missile programme kicks off under Dr. APJ Abdul Kalam.", color:"#facc15" },
    { year:"1988", title:"First Prithvi Test", desc:"India's first indigenous surface-to-surface missile tested.", color:"#4ade80" },
    { year:"1994", title:"Agni Success", desc:"Agni-I IRBM tested — strategic missile capability established.", color:"#22d3ee" },
    { year:"1999", title:"Kargil Validation", desc:"Akash, Prithvi, Pinaka validated during the Kargil conflict.", color:"#818cf8" },
    { year:"2001", title:"BrahMos First Test", desc:"Mach 2.8 supersonic cruise missile — world's fastest.", color:"#c084fc" },
    { year:"2003", title:"Tejas First Flight", desc:"LCA Tejas maiden flight — landmark in fighter development.", color:"#fb7185" },
    { year:"2008", title:"K-15 Sagarika", desc:"SLBM tested from INS Arihant — sea deterrent achieved.", color:"#f87171" },
    { year:"2012", title:"Agni-V ICBM", desc:"India enters elite ICBM club with 5,000+ km range.", color:"#fb923c" },
    { year:"2017", title:"NETRA Inducted", desc:"Indigenous AEW&C enters IAF service.", color:"#facc15" },
    { year:"2022", title:"INS Vikrant", desc:"India's first indigenous aircraft carrier commissioned.", color:"#4ade80" }
];

const LABS_DATA = [
    { name:"DRDL", location:"Hyderabad, Telangana", focus:"Missile systems, strategic weapons" },
    { name:"LRDE", location:"Bangalore, Karnataka", focus:"Radar systems, electronic warfare" },
    { name:"ADE", location:"Bangalore, Karnataka", focus:"Aircraft, UAVs, flight control" },
    { name:"ARDE", location:"Pune, Maharashtra", focus:"Weapons, ammunition, rockets" },
    { name:"GTRE", location:"Bangalore, Karnataka", focus:"Gas turbine engines, propulsion" },
    { name:"C-DAC", location:"Pune, Maharashtra", focus:"Cyber security, AI, HPC" },
    { name:"DEBEL", location:"Bangalore, Karnataka", focus:"Life sciences, protective equipment" },
    { name:"HEMRL", location:"Pune, Maharashtra", focus:"Propellants, explosives" },
    { name:"DLRL", location:"Hyderabad, Telangana", focus:"Electronic warfare, comms" },
    { name:"R&DE(E)", location:"Pune, Maharashtra", focus:"Armoured vehicles, platforms" },
    { name:"IRDE", location:"Dehradun, Uttarakhand", focus:"Optoelectronics, night vision" },
    { name:"SSPL", location:"Delhi", focus:"Secure systems, computing" }
];

const CATEGORY_META = {
    "missile-systems":{ label:"Missile Systems", tagClass:"drdo-tag-missile" },
    "radar":{ label:"Radar", tagClass:"drdo-tag-radar" },
    "uavs":{ label:"UAVs", tagClass:"drdo-tag-uavs" },
    "avionics":{ label:"Avionics", tagClass:"drdo-tag-avionics" },
    "weapons":{ label:"Weapons", tagClass:"drdo-tag-weapons" },
    "cyber":{ label:"Cyber & EW", tagClass:"drdo-tag-cyber" },
    "naval":{ label:"Naval Systems", tagClass:"drdo-tag-naval" },
    "space":{ label:"Space & Strategic", tagClass:"drdo-tag-space" },
    "life-sciences":{ label:"Life Sciences", tagClass:"drdo-tag-life-sciences" }
};

/* ===== Particles ===== */
function initParticles() {
    const c = document.getElementById("drdo-particles");
    if (!c) return;
    const colors = ["#f87171","#fb923c","#facc15","#4ade80","#818cf8","#60a5fa"];
    for (let i = 0; i < 35; i++) {
        const p = document.createElement("div");
        p.className = "drdo-particle";
        const s = Math.random() * 4 + 1;
        const col = colors[Math.floor(Math.random() * colors.length)];
        p.style.cssText = `width:${s}px;height:${s}px;background:${col};left:${Math.random()*100}%;animation-duration:${Math.random()*18+10}s;animation-delay:${Math.random()*12}s;box-shadow:0 0 ${s*4}px ${col};`;
        c.appendChild(p);
    }
}

/* ===== Counter Animation ===== */
function animateCounters() {
    document.querySelectorAll(".drdo-counter").forEach(counter => {
        const target = parseInt(counter.dataset.target, 10);
        const dur = 2200;
        const start = performance.now();
        function tick(now) {
            const p = Math.min((now - start) / dur, 1);
            const e = 1 - Math.pow(1 - p, 4);
            const v = Math.floor(e * target);
            counter.textContent = target > 1000 ? v.toLocaleString() + "+" : v;
            if (p < 1) requestAnimationFrame(tick);
            else counter.textContent = target > 1000 ? target.toLocaleString() + "+" : target;
        }
        requestAnimationFrame(tick);
    });
}

/* ===== Scroll Reveal ===== */
function initScrollReveal() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    document.querySelectorAll(".drdo-reveal, .drdo-card, .drdo-lab-card, .drdo-timeline-item, .drdo-section-label, .drdo-about h2, .drdo-about p, .drdo-about-divider, .drdo-timeline-section h2, .drdo-timeline-subtitle, .drdo-labs-section h2, .drdo-labs-subtitle, .drdo-labs-stats").forEach(el => obs.observe(el));
}

/* ===== Card 3D Tilt ===== */
function initCardTilt() {
    document.querySelectorAll(".drdo-card, .drdo-lab-card, .drdo-stat-card").forEach(card => {
        card.addEventListener("mousemove", e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `perspective(600px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-8px) scale(1.02)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}

/* ===== Gallery ===== */
function renderGallery(items) {
    const g = document.getElementById("drdo-gallery");
    const emp = document.getElementById("drdo-empty-state");
    const cnt = document.getElementById("drdo-results-count");
    if (!items.length) { g.innerHTML=""; g.style.display="none"; emp.hidden=false; cnt.textContent="no results"; return; }
    emp.hidden=true; g.style.display="";
    cnt.textContent = `${items.length} innovation${items.length!==1?"s":""}`;
    g.innerHTML = items.map((item, i) => {
        const cm = CATEGORY_META[item.category]||{label:item.category,tagClass:""};
        const grad = item.gradient || "linear-gradient(135deg,rgba(248,113,113,0.2),rgba(255,255,255,0.02))";
        const imgSrc = item.image || CATEGORY_IMAGES[item.category] || "";
        return `<div class="drdo-card" data-index="${i}" style="transition-delay:${Math.min(i*0.04,0.4)}s">
            <div class="drdo-card-visual">
                <div class="drdo-card-visual-bg" style="background:${grad}"></div>
                ${imgSrc ? `<img class="drdo-card-image" src="${imgSrc}" alt="${item.name}" loading="lazy" onerror="this.style.display='none'">` : ''}
                <div class="drdo-card-visual-overlay">
                    <span class="drdo-card-year-badge">${item.year}</span>
                </div>
                <div class="drdo-card-shine"></div>
                <div class="drdo-card-dots"><span class="drdo-card-dot"></span><span class="drdo-card-dot"></span><span class="drdo-card-dot"></span></div>
            </div>
            <div class="drdo-card-body">
                <div class="drdo-card-tags">
                    <span class="drdo-tag ${cm.tagClass}">${cm.label}</span>
                    <span class="drdo-tag drdo-tag-era">${item.era}</span>
                </div>
                <h3 class="drdo-card-title">${item.name}</h3>
                <div class="drdo-card-subtitle">${item.subtitle}</div>
                <p class="drdo-card-desc">${item.shortDesc}</p>
                <div class="drdo-card-footer">
                    <span class="drdo-card-lab">${item.lab}</span>
                    <span class="drdo-card-arrow">→</span>
                </div>
            </div>
        </div>`;
    }).join("");
    g.querySelectorAll(".drdo-card").forEach(c => {
        c.addEventListener("click", () => openModal(items[parseInt(c.dataset.index,10)]));
    });
    initScrollReveal();
    setTimeout(initCardTilt, 100);
}

/* ===== Timeline ===== */
function renderTimeline() {
    const t = document.getElementById("drdo-timeline");
    if (!t) return;
    t.innerHTML = TIMELINE_DATA.map(item => `
        <div class="drdo-timeline-item">
            <div class="drdo-timeline-dot" style="background:${item.color};color:${item.color}"></div>
            <div class="drdo-timeline-year">${item.year}</div>
            <div class="drdo-timeline-title">${item.title}</div>
            <div class="drdo-timeline-desc">${item.desc}</div>
        </div>
    `).join("");
}

/* ===== Labs ===== */
const LAB_ICONS = {
    "DRDL": "🚀", "LRDE": "📡", "ADE": "✈️", "ARDE": "🎯",
    "GTRE": "🔥", "C-DAC": "💻", "DEBEL": "🧬", "HEMRL": "💥",
    "DLRL": "📻", "R&DE(E)": "🛡️", "IRDE": "🔭", "SSPL": "🔒"
};

const LAB_HIGHLIGHTS = {
    "DRDL": "Developed Agni & Prithvi missile families",
    "LRDE": "Pioneered Uttam AESA & NETRA radar",
    "ADE": "Created Rustom & Tapas UAV platforms",
    "ARDE": "Designed Pinaka MLRS & artillery systems",
    "GTRE": "Developing Kaveri jet engine",
    "C-DAC": "Built AFNet & AI cyber defence",
    "DEBEL": "Life support for Siachen troops",
    "HEMRL": "Advanced solid propellants",
    "DLRL": "Electronic warfare suites",
    "R&DE(E)": "Armoured vehicle systems",
    "IRDE": "Night vision & optronics",
    "SSPL": "Secure computing platforms"
};

function renderLabs() {
    const g = document.getElementById("drdo-labs-grid");
    const stats = document.getElementById("drdo-labs-stats");
    if (!g) return;
    g.innerHTML = LABS_DATA.map((l, i) => {
        const icon = LAB_ICONS[l.name] || "🔬";
        const highlight = LAB_HIGHLIGHTS[l.name] || l.focus;
        return `<div class="drdo-lab-card" style="transition-delay:${i * 0.06}s">
            <div class="drdo-lab-card-inner">
                <div class="drdo-lab-icon-wrap">
                    <span class="drdo-lab-icon">${icon}</span>
                    <div class="drdo-lab-icon-ring"></div>
                </div>
                <div class="drdo-lab-info">
                    <div class="drdo-lab-name">${l.name}</div>
                    <div class="drdo-lab-location"><i class="fa-solid fa-location-dot"></i> ${l.location}</div>
                    <div class="drdo-lab-focus">${l.focus}</div>
                    <div class="drdo-lab-highlight">${highlight}</div>
                </div>
            </div>
            <div class="drdo-lab-card-glow"></div>
        </div>`;
    }).join("");

    if (stats) {
        stats.innerHTML = `
            <div class="drdo-labs-stat-card">
                <span class="drdo-labs-stat-num">${LABS_DATA.length}</span>
                <span class="drdo-labs-stat-label">Key Laboratories</span>
            </div>
            <div class="drdo-labs-stat-card">
                <span class="drdo-labs-stat-num">7+</span>
                <span class="drdo-labs-stat-label">Cities Across India</span>
            </div>
            <div class="drdo-labs-stat-card">
                <span class="drdo-labs-stat-num">9</span>
                <span class="drdo-labs-stat-label">Technology Domains</span>
            </div>
            <div class="drdo-labs-stat-card">
                <span class="drdo-labs-stat-num">65+</span>
                <span class="drdo-labs-stat-label">Years of Innovation</span>
            </div>
        `;
    }
}

/* ===== Category Counts ===== */
function updateCategoryCounts() {
    const c = {};
    for (const k of Object.keys(CATEGORY_META)) c[k] = 0;
    for (const i of DRDO_DATA) if (c[i.category] !== undefined) c[i.category]++;
    for (const [k, v] of Object.entries(c)) { const el = document.getElementById(`count-${k}`); if (el) el.textContent = v; }
}

/* ===== Modal ===== */
function openModal(item) {
    const m = document.getElementById("drdo-modal");
    const cm = CATEGORY_META[item.category]||{label:item.category,tagClass:""};
    const grad = item.gradient || "linear-gradient(135deg,rgba(248,113,113,0.2),rgba(255,255,255,0.02))";
    const imgSrc = item.image || CATEGORY_IMAGES[item.category] || "";
    document.getElementById("drdo-modal-icon").innerHTML = `<div class="drdo-modal-icon-visual" style="background:${grad}">${imgSrc ? `<img src="${imgSrc}" alt="${item.name}" class="drdo-modal-icon-img" onerror="this.style.display='none'">` : ''}</div>`;
    document.getElementById("drdo-modal-title").textContent = item.name;
    document.getElementById("drdo-modal-year").textContent = `${item.year} · ${item.era}`;
    document.getElementById("drdo-modal-tags").innerHTML = `<span class="drdo-tag ${cm.tagClass}">${cm.label}</span><span class="drdo-tag drdo-tag-era">${item.lab}</span>`;
    document.getElementById("drdo-modal-body").innerHTML = item.fullDesc;
    m.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById("drdo-modal").classList.remove("open");
    document.body.style.overflow = "";
}

/* ===== Init ===== */
function initDRDOPage() {
    initParticles();
    updateCategoryCounts();
    renderGallery(DRDO_DATA);
    renderTimeline();
    renderLabs();
    setTimeout(animateCounters, 900);
    initScrollReveal();

    const si = document.getElementById("drdo-search");
    const cf = document.getElementById("category-filter");
    const ef = document.getElementById("era-filter");

    function filter() {
        const q = si.value.toLowerCase().trim();
        let f = DRDO_DATA;
        if (cf.value !== "all") f = f.filter(i => i.category === cf.value);
        if (ef.value !== "all") f = f.filter(i => i.era === ef.value);
        if (q) f = f.filter(i => i.name.toLowerCase().includes(q)||i.subtitle.toLowerCase().includes(q)||i.shortDesc.toLowerCase().includes(q)||i.lab.toLowerCase().includes(q)||i.category.includes(q)||i.era.includes(q));
        renderGallery(f);
    }

    si.addEventListener("input", filter);
    cf.addEventListener("change", filter);
    ef.addEventListener("change", filter);

    document.getElementById("drdo-modal-close").addEventListener("click", closeModal);
    document.getElementById("drdo-modal").addEventListener("click", e => { if (e.target === e.currentTarget) closeModal(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initDRDOPage);
else initDRDOPage();
