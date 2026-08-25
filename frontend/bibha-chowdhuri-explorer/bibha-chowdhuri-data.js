// bibha-chowdhuri-data.js
// Data for the Bibha Chowdhuri explorer page.

const BIBHA_DATA = {
    quickFacts: {
        fullName: 'Dr. Bibha Chowdhuri',
        lifespan: '13 June 1913 - 2 June 1991',
        birthplace: 'Calcutta, Bengal Presidency, British India (now Kolkata, West Bengal)',
        primaryFields: ['Cosmic Ray Physics', 'Nuclear Physics', 'Particle Physics'],
        education: [
            'B.Sc. (Hons) in Physics, Scottish Church College, Calcutta - 1936 (ranked first in Physics)',
            'M.Sc. in Physics, University of Calcutta - 1939 (only woman in her cohort)'
        ],
        keyPositions: [
            'Researcher, Indian Association for the Cultivation of Science (IACS), Calcutta - 1939-1945',
            'Senior Research Fellow, Tata Institute of Fundamental Research (TIFR), Bombay - 1949-1976'
        ],
        keyHonors: [
            'First Indian woman to publish cosmic-ray research in Nature (1944, 1945)',
            'First woman scientist to join TIFR under Homi J. Bhabha',
            'CSIR Senior Research Fellow',
            'Subject of the 2020 biography "A Jewel Unexplored: Bibha Chowdhuri and Her Science" by Rajinder Singh'
        ]
    },

    biographySections: [
        {
            id: 'early-life',
            title: 'Early Life in Calcutta',
            subtitle: '1913 - 1933',
            icon: '🏠',
            content: 'Bibha Chowdhuri was born on 13 June 1913 in Calcutta (now Kolkata) into an educated Bengali family from the Brahmo Samaj tradition that valued women\'s education. Her father, Banku Behari Chowdhuri, was a medical doctor who encouraged his daughters to pursue higher studies. Bibha grew up during the height of the Bengali renaissance and the Indian freedom movement - a time when Calcutta was the intellectual capital of British India, with the University of Calcutta producing some of Asia\'s first modern scientists. The atmosphere of inquiry, social reform, and nationalist awakening shaped her worldview and her decision to study physics at a time when almost no Indian women entered the field.'
        },
        {
            id: 'physics-education',
            title: 'Physics Education',
            subtitle: 'Scottish Church College & Calcutta University',
            icon: '🎓',
            content: 'Bibha Chowdhuri enrolled at Scottish Church College in Calcutta, an institution known for admitting women students when most colleges refused. She earned her B.Sc. (Honours) in Physics in 1936, ranking first in Physics - a remarkable achievement for any student, and extraordinary for a woman in 1930s India. She then pursued her M.Sc. in Physics at the University of Calcutta, completing it in 1939 as the only woman in her cohort. Her professors recognised her exceptional talent, and she soon caught the attention of Debendra Mohan (D.M.) Bose, then a leading Indian physicist and director of the Indian Association for the Cultivation of Science.'
        },
        {
            id: 'iacs-research',
            title: 'Cosmic Ray Research at IACS',
            subtitle: '1939 - 1945',
            icon: '✨',
            content: 'At IACS, Bibha Chowdhuri joined D.M. Bose\'s cosmic-ray research group. Together they pioneered the use of photographic nuclear emulsions as particle detectors in India - exposing Ilford photographic plates at high altitudes in Darjeeling to capture the tracks of cosmic-ray particles. When charged cosmic-ray particles passed through the emulsion\'s silver bromide crystals, they left ionisation tracks that could later be developed and examined under high-power microscopes. Bose and Chowdhuri published two landmark papers in Nature in 1944 and 1945 reporting tracks of slow protons, alpha particles, and heavier nuclei. Their work predated Cecil Powell\'s Nobel Prize-winning discovery of the pion by the same technique - but wartime supply disruptions of improved emulsions limited further development, and the recognition went elsewhere.'
        },
        {
            id: 'tifr-era',
            title: 'Move to TIFR & The Bhabha Years',
            subtitle: '1949 - 1976',
            icon: '⚛️',
            content: 'In 1949, Bibha Chowdhuri moved to Bombay to join the newly founded Tata Institute of Fundamental Research (TIFR) at the invitation of its director, Homi Jehangir Bhabha - architect of India\'s atomic energy program. She became the first woman scientist at TIFR and joined Bhabha\'s cosmic-ray group. With access to improved Kodak NT4 emulsions and high-altitude balloon flights, she extended her IACS work to study muons, pions, and other elementary particles. She also participated in TIFR\'s experiments at the Kolar Gold Fields - one of the deepest underground physics laboratories in the world at the time - which shielded detectors from cosmic-ray background to study neutrino interactions and high-energy muons. She remained at TIFR until her retirement in 1976.'
        },
        {
            id: 'women-in-physics',
            title: 'Women in Indian Physics',
            subtitle: 'A Quiet Trailblazer',
            icon: '♀',
            content: 'During Bibha Chowdhuri\'s career, Indian physics was almost entirely male. She was one of a tiny handful of women - alongside contemporaries such as E.K. Janaki Ammal (botanist), Anna Mani (meteorologist), and Kamala Sohonie (biochemist) - pursuing original scientific research. Social expectations, lack of fellowships for women, and the cultural norm of early marriage made a research career extraordinarily difficult. Bibha never married, devoting her life to physics. Despite her pioneering publications and senior role at TIFR, she did not receive the public recognition accorded to male peers like Homi Bhabha or Meghnad Saha. Her story exemplifies the "leaky pipeline" of women in physics that persists today - only about 15% of India\'s physics faculty are women in the 2020s.'
        },
        {
            id: 'scientific-legacy',
            title: 'Scientific Legacy & Modern Recognition',
            subtitle: 'Posthumous Rediscovery',
            icon: '🌟',
            content: 'Bibha Chowdhuri retired from TIFR in 1976 and lived quietly in Bombay until her death on 2 June 1991. For decades her work was largely forgotten - even within the Indian physics community. That changed with the 2020 publication of "A Jewel Unexplored: Bibha Chowdhuri and Her Science" by science historian Rajinder Singh, which brought her story back to light. Today, she is recognised as a founding figure of India\'s cosmic-ray and particle-physics program, whose nuclear-emulsion work at IACS laid the technical foundation for TIFR\'s later achievements - including the Kolar Gold Fields neutrino experiments and India\'s ongoing India-based Neutrino Observatory (INO) project. Her career also helped pave the way for women scientists at India\'s national laboratories.'
        }
    ],

    researchTopics: [
        {
            id: 'nuclear-emulsion',
            researchTitle: 'Nuclear Emulsion Technique',
            coreFinding: 'Demonstrated that photographic emulsions could detect and identify individual cosmic-ray particles by their ionisation tracks - measuring charge, mass, and energy from track geometry.',
            methodology: 'Exposed Ilford C2 and later Kodak NT4 photographic plates at high altitudes (Darjeeling, ~2,200m) for weeks, then developed them like photographs and examined tracks under high-power microscopes.',
            impact: 'The same technique won Cecil Powell the 1950 Nobel Prize in Physics for the discovery of the pion. Bose & Chowdhuri\'s 1944-45 Nature papers preceded Powell\'s announcement but were overlooked due to wartime isolation.'
        },
        {
            id: 'heavy-primaries',
            researchTitle: 'Cosmic Ray Heavy Primary Particles',
            coreFinding: 'Detected tracks of slow protons, alpha particles, and heavier nuclei (up to iron) in cosmic rays - confirming that cosmic rays include fully ionised heavy atoms accelerated to relativistic energies.',
            methodology: 'High-altitude emulsion exposures at Darjeeling; microscopic scanning for tracks of high ionisation density characteristic of heavy nuclei.',
            impact: 'Established cosmic-ray physics as a serious research area in India and provided early evidence for the elemental composition of cosmic rays - now known to originate in supernovae and active galactic nuclei.'
        },
        {
            id: 'extensive-air-showers',
            researchTitle: 'Extensive Air Showers (EAS)',
            coreFinding: 'Studied cascades of secondary particles produced when high-energy cosmic-ray primaries collide with Earth\'s atmosphere - showers that can spread over square kilometres at ground level.',
            methodology: 'Arrays of Geiger counters and scintillation detectors at TIFR and Kolar Gold Fields, triggered in coincidence to reconstruct the primary cosmic ray\'s energy and direction.',
            impact: 'EAS research at TIFR contributed to global cosmic-ray astronomy and informed later experiments like the GRAPES-3 array at Ooty and the Pierre Auger Observatory.'
        },
        {
            id: 'muon-pion-physics',
            researchTitle: 'Muon & Pion Decay Studies',
            coreFinding: 'Investigated the decay modes and energy spectra of muons (heavy electrons, ~207x electron mass) and pions (Yukawa particles mediating the strong nuclear force) using nuclear emulsions.',
            methodology: 'Tracked particle decays in emulsion stacks, measured range and ionisation to identify decay products; cross-referenced with theoretical predictions of the emerging Standard Model of particle physics.',
            impact: 'Contributed to the catalogue of elementary particle interactions that defined mid-20th-century particle physics - a golden era culminating in the quark model and the 1973 Standard Model.'
        },
        {
            id: 'kolar-gold-fields',
            researchTitle: 'Kolar Gold Fields Experiments',
            coreFinding: 'At depths of up to 3,200 metres below ground, the Kolar Gold Fields (KGF) mines in Karnataka provided one of the world\'s deepest underground physics laboratories - shielding detectors from cosmic-ray background to study neutrino interactions and high-energy atmospheric muons.',
            methodology: 'Deployed emulsion stacks and particle detectors at various depths in the working gold mines; collaborated with French and Japanese cosmic-ray groups on long-duration exposures.',
            impact: 'The KGF experiments set early limits on proton decay, measured atmospheric neutrino fluxes, and pioneered deep-underground physics - directly inspiring later experiments like Super-Kamiokande (Japan) and India\'s planned India-based Neutrino Observatory (INO).'
        }
    ],

    institutions: [
        {
            name: 'Scottish Church College',
            location: 'Calcutta (Kolkata), West Bengal',
            period: '1933 - 1936',
            description: 'Where Bibha Chowdhuri earned her B.Sc. (Honours) in Physics in 1936, ranked first in Physics. Founded in 1830, the college was one of the few in India to admit women students at the time.',
            coords: { lat: 22.60, lng: 88.37 }
        },
        {
            name: 'University of Calcutta',
            location: 'Calcutta (Kolkata), West Bengal',
            period: '1936 - 1939',
            description: 'Where she completed her M.Sc. in Physics in 1939 - the only woman in her cohort. Founded in 1857, Calcutta University was the cradle of modern Indian science (C.V. Raman, Meghnad Saha, S.N. Bose all worked here).',
            coords: { lat: 22.57, lng: 88.37 }
        },
        {
            name: 'Indian Association for the Cultivation of Science (IACS)',
            location: 'Calcutta (Kolkata), West Bengal',
            period: '1939 - 1945',
            description: 'Founded in 1876 by Dr. Mahendra Lal Sircar, IACS is Asia\'s oldest scientific research institute. Here Bibha Chowdhuri worked with D.M. Bose on cosmic-ray detection using photographic emulsions, leading to her landmark Nature papers.',
            coords: { lat: 22.50, lng: 88.36 }
        },
        {
            name: 'Tata Institute of Fundamental Research (TIFR)',
            location: 'Bombay (Mumbai), Maharashtra',
            period: '1949 - 1976',
            description: 'Founded by Homi J. Bhabha in 1945, TIFR became India\'s premier physics research institute. Bibha Chowdhuri was the first woman scientist to join TIFR, where she continued her cosmic-ray research for 27 years.',
            coords: { lat: 18.90, lng: 72.81 }
        },
        {
            name: 'Kolar Gold Fields (KGF)',
            location: 'Kolar District, Karnataka',
            period: '1960s - 1990s',
            description: 'One of the deepest underground physics laboratories in the world (~3,200 m depth). Bibha Chowdhuri participated in TIFR\'s cosmic-ray experiments here, where the rock overburden shielded detectors from cosmic-ray background for neutrino studies.',
            coords: { lat: 13.14, lng: 78.25 }
        }
    ],

    milestonesCatalog: [
        {
            topic: 'Pioneering Nuclear Emulsion Detection in India',
            category: 'methodology',
            status: 'verified',
            significance: 'First Indian group to systematically use photographic nuclear emulsions for cosmic-ray detection - a technique later recognised by the 1950 Nobel Prize in Physics (Cecil Powell).'
        },
        {
            topic: 'First Woman M.Sc. in Physics Cohort at Calcutta University',
            category: 'education',
            status: 'verified',
            significance: 'In 1939, Bibha Chowdhuri was the only woman in her M.Sc. Physics cohort - a near-unprecedented achievement in 1930s India.'
        },
        {
            topic: 'Co-authored Landmark Nature Papers (1944, 1945)',
            category: 'discovery',
            status: 'verified',
            significance: 'With D.M. Bose, published two seminal papers in Nature on cosmic-ray tracks in photographic emulsions - among the first such publications from India.'
        },
        {
            topic: 'First Woman Scientist at TIFR',
            category: 'leadership',
            status: 'verified',
            significance: 'Joined the Tata Institute of Fundamental Research in 1949 under Homi Bhabha - opening the door for women researchers at India\'s premier physics institute.'
        },
        {
            topic: 'Kolar Gold Fields Underground Experiments',
            category: 'discovery',
            status: 'verified',
            significance: 'Participated in TIFR\'s deep-underground experiments at KGF that searched for proton decay and measured atmospheric neutrino fluxes - precursors to modern neutrino astronomy.'
        },
        {
            topic: 'International Cosmic-Ray Conference Participation',
            category: 'international',
            status: 'verified',
            significance: 'Represented India at international cosmic-ray conferences, contributing to the global cosmic-ray research community throughout the 1950s-1970s.'
        },
        {
            topic: 'Mentored Next-Generation Indian Physicists',
            category: 'mentoring',
            status: 'verified',
            significance: 'Trained a generation of Indian physicists in nuclear-emulsion technique and cosmic-ray research, helping build India\'s post-independence physics capability.'
        }
    ],

    timelineEvents: [
        { year: '1913', title: 'Born in Calcutta', description: 'Bibha Chowdhuri was born on 13 June 1913 in Calcutta, Bengal Presidency, into an educated Bengali family from the Brahmo Samaj tradition.' },
        { year: '1936', title: 'B.Sc. in Physics from Scottish Church College', description: 'Graduated with Honours in Physics from Scottish Church College, Calcutta - ranked first in Physics.' },
        { year: '1939', title: 'M.Sc. in Physics at Calcutta University', description: 'Earned her M.Sc. in Physics from the University of Calcutta as the only woman in her cohort.' },
        { year: '1939', title: 'Joined IACS as a Researcher', description: 'Joined the Indian Association for the Cultivation of Science as a researcher under Prof. D.M. Bose - beginning her cosmic-ray research career.' },
        { year: '1944', title: 'First Nature Paper Published', description: 'Co-authored with D.M. Bose a seminal Nature paper on cosmic-ray tracks in photographic emulsions.' },
        { year: '1945', title: 'Second Nature Paper on Heavy Cosmic-Ray Nuclei', description: 'Published a follow-up Nature paper reporting tracks of heavy nuclei in cosmic-ray emulsion exposures at Darjeeling.' },
        { year: '1949', title: 'Joined TIFR under Homi Bhabha', description: 'Moved to Bombay to join the Tata Institute of Fundamental Research as its first woman scientist, working under Homi J. Bhabha.' },
        { year: '1954', title: 'Continued Cosmic-Ray Research with Improved Emulsions', description: 'Extended her IACS work using Kodak NT4 emulsions at high altitudes - studying muons, pions, and other elementary particles.' },
        { year: '1965', title: 'Kolar Gold Fields Experiments Begin', description: 'TIFR launched deep-underground cosmic-ray experiments at Kolar Gold Fields, Karnataka - Bibha Chowdhuri participated in this pioneering neutrino and muon research.' },
        { year: '1970', title: 'International Cosmic-Ray Conference', description: 'Represented India at international cosmic-ray conferences, presenting TIFR\'s research findings to the global physics community.' },
        { year: '1976', title: 'Retired from TIFR', description: 'Retired after 27 years at TIFR, having helped build India\'s cosmic-ray and particle-physics program.' },
        { year: '1991', title: 'Passed Away in Bombay', description: 'Bibha Chowdhuri passed away on 2 June 1991 in Bombay, leaving behind a quiet but profound legacy in Indian physics.' },
        { year: '2020', title: 'Biography Published', description: 'Science historian Rajinder Singh published "A Jewel Unexplored: Bibha Chowdhuri and Her Science" - bringing her story to a wider audience.' }
    ],

    quizQuestions: [
        {
            id: 'q1',
            question: 'In which city was Bibha Chowdhuri born?',
            options: ['Bombay (Mumbai)', 'Calcutta (Kolkata)', 'Madras (Chennai)', 'Delhi'],
            correctIndex: 1,
            explanation: 'Bibha Chowdhuri was born on 13 June 1913 in Calcutta (now Kolkata) in the Bengal Presidency of British India.'
        },
        {
            id: 'q2',
            question: 'From which college did Bibha Chowdhuri earn her B.Sc. (Hons) in Physics in 1936?',
            options: ['St. Xavier\'s College', 'Presidency College', 'Scottish Church College', 'Bethune College'],
            correctIndex: 2,
            explanation: 'She graduated from Scottish Church College, Calcutta - ranked first in Physics in 1936.'
        },
        {
            id: 'q3',
            question: 'With whom did Bibha Chowdhuri work at the Indian Association for the Cultivation of Science?',
            options: ['C. V. Raman', 'Homi J. Bhabha', 'D. M. Bose', 'Meghnad Saha'],
            correctIndex: 2,
            explanation: 'She worked under Prof. Debendra Mohan (D.M.) Bose at IACS, co-authoring two Nature papers on cosmic-ray emulsion tracks.'
        },
        {
            id: 'q4',
            question: 'Which institute did Bibha Chowdhuri join in 1949 as its first woman scientist?',
            options: ['ISRO', 'Bhabha Atomic Research Centre (BARC)', 'Tata Institute of Fundamental Research (TIFR)', 'Indian Institute of Science (IISc)'],
            correctIndex: 2,
            explanation: 'In 1949 she joined TIFR in Bombay under Homi J. Bhabha, becoming the institute\'s first woman scientist.'
        },
        {
            id: 'q5',
            question: 'Which particle-detection technique did Bibha Chowdhuri pioneer in India?',
            options: ['Cloud chamber', 'Nuclear emulsion', 'Geiger-Muller counter', 'Spark chamber'],
            correctIndex: 1,
            explanation: 'She pioneered the use of photographic nuclear emulsions to detect cosmic-ray particle tracks - the same technique that won Cecil Powell the 1950 Nobel Prize in Physics.'
        },
        {
            id: 'q6',
            question: 'Where did Bibha Chowdhuri conduct deep-underground particle physics experiments?',
            options: ['Kolar Gold Fields (Karnataka)', 'Hutti Gold Mines (Karnataka)', 'Jaduguda Uranium Mines (Jharkhand)', 'Raniganj Coal Mines (West Bengal)'],
            correctIndex: 0,
            explanation: 'The Kolar Gold Fields in Karnataka hosted TIFR\'s deep-underground physics laboratory (~3,200 m depth) for neutrino and high-energy muon research.'
        },
        {
            id: 'q7',
            question: 'In which year was the biography "A Jewel Unexplored: Bibha Chowdhuri and Her Science" published?',
            options: ['2005', '2010', '2015', '2020'],
            correctIndex: 3,
            explanation: 'Science historian Rajinder Singh published the biography in 2020, bringing Bibha Chowdhuri\'s story back to public attention.'
        }
    ],

    sources: [
        {
            title: 'Singh, R. (2020). Bibha Chowdhuri: A Jewel Unexplored - Bibha Chowdhuri and Her Science. Springer.',
            url: 'https://link.springer.com/book/10.1007/978-981-15-5394-8'
        },
        {
            title: 'Bibha Chowdhuri - Wikipedia, The Free Encyclopedia',
            url: 'https://en.wikipedia.org/wiki/Bibha_Chowdhuri'
        },
        {
            title: 'Indian Association for the Cultivation of Science (IACS) - Official Archive',
            url: 'https://www.iacs.res.in/'
        },
        {
            title: 'Tata Institute of Fundamental Research (TIFR) - History & Archives',
            url: 'https://www.tifr.res.in/'
        },
        {
            title: 'Indian Academy of Sciences - Biographical Memoirs of Indian Scientists',
            url: 'https://www.ias.ac.in/listing/biographical-memoirs'
        },
        {
            title: 'Bose, D.M. & Chowdhuri, B. (1945). "On the Tracks of Heavy Nuclei in Photographic Plates Exposed to Cosmic Rays." Nature, 155, 521-522.',
            url: 'https://www.nature.com/articles/155521a0'
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BIBHA_DATA };
}
