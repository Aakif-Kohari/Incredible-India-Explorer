function initOlympicsPage() {
    const medalGrid = document.getElementById('olympic-medal-grid');
    const medalFilters = document.getElementById('olympic-medal-filters');
    const searchInput = document.getElementById('olympic-search-input');
    const sportFilterButtons = document.querySelectorAll('[data-olympic-sport-filter]');
    const timelineGrid = document.getElementById('olympic-timeline');
    const timelineDetail = document.getElementById('olympic-timeline-detail');
    const medalMapContainer = document.getElementById('olympic-medal-map');
    const athleteGrid = document.getElementById('olympic-athlete-grid');
    const historicGrid = document.getElementById('olympic-historic-grid');
    const momentsGrid = document.getElementById('olympic-moments-grid');
    const modal = document.getElementById('olympic-modal');
    const modalClose = document.getElementById('olympic-modal-close');
    const modalAvatar = document.getElementById('olympic-modal-avatar');
    const modalCategory = document.getElementById('olympic-modal-category');
    const modalTitle = document.getElementById('olympic-modal-title');
    const modalSubtitle = document.getElementById('olympic-modal-subtitle');
    const modalStory = document.getElementById('olympic-modal-story');
    const modalHighlights = document.getElementById('olympic-modal-highlights');
    const modalStats = document.getElementById('olympic-modal-stats');
    const olympicSection = document.getElementById('olympic-hero-section');

    if (!medalGrid || !medalFilters || !timelineGrid || !timelineDetail || !medalMapContainer || !athleteGrid || !historicGrid || !momentsGrid || !modal || !modalClose) {
        return;
    }

    document.querySelectorAll('.fade-in-section').forEach(section => {
        section.classList.add('is-visible');
    });

    const olympicEditions = [
        {
            id: '1900',
            year: 1900,
            hostCity: 'Paris',
            hostCountry: 'France',
            indianParticipation: 'First Olympic participation',
            sports: ['Athletics'],
            medals: 0,
            medalists: [],
            eventNames: []
        },
        {
            id: '1920',
            year: 1920,
            hostCity: 'Antwerp',
            hostCountry: 'Belgium',
            indianParticipation: 'Limited participation',
            sports: ['Athletics', 'Hockey'],
            medals: 0,
            medalists: [],
            eventNames: []
        },
        {
            id: '1924',
            year: 1924,
            hostCity: 'Paris',
            hostCountry: 'France',
            indianParticipation: 'Hockey debut',
            sports: ['Hockey'],
            medals: 1,
            medalists: [{
                name: 'Team India',
                sport: 'Hockey',
                event: 'Men\'s Hockey',
                medal: 'Gold',
                achievement: 'First Olympic medal; began hockey dynasty'
            }],
            eventNames: ['Men\'s Hockey - Gold']
        },
        {
            id: '1928',
            year: 1928,
            hostCity: 'Amsterdam',
            hostCountry: 'Netherlands',
            indianParticipation: 'Hockey gold defense',
            sports: ['Hockey'],
            medals: 1,
            medalists: [{
                name: 'Team India',
                sport: 'Hockey',
                event: 'Men\'s Hockey',
                medal: 'Gold',
                achievement: 'First Olympic gold; started 8-gold streak'
            }],
            eventNames: ['Men\'s Hockey - Gold']
        },
        {
            id: '1932',
            year: 1932,
            hostCity: 'Los Angeles',
            hostCountry: 'USA',
            indianParticipation: 'Hockey gold hat-trick',
            sports: ['Hockey'],
            medals: 1,
            medalists: [{
                name: 'Team India',
                sport: 'Hockey',
                event: 'Men\'s Hockey',
                medal: 'Gold',
                achievement: 'Unbeaten run continued; 24-0 Olympic hockey record'
            }],
            eventNames: ['Men\'s Hockey - Gold']
        },
        {
            id: '1936',
            year: 1936,
            hostCity: 'Berlin',
            hostCountry: 'Germany',
            indianParticipation: 'Hockey fourth gold',
            sports: ['Hockey'],
            medals: 1,
            medalists: [{
                name: 'Team India',
                sport: 'Hockey',
                event: 'Men\'s Hockey',
                medal: 'Gold',
                achievement: 'Hitler shook hands with Indian team; dominant performance'
            }],
            eventNames: ['Men\'s Hockey - Gold']
        },
        {
            id: '1948',
            year: 1948,
            hostCity: 'London',
            hostCountry: 'UK',
            indianParticipation: 'Post-independence debut',
            sports: ['Hockey'],
            medals: 1,
            medalists: [{
                name: 'Team India',
                sport: 'Hockey',
                event: 'Men\'s Hockey',
                medal: 'Gold',
                achievement: 'First Olympic gold as independent nation'
            }],
            eventNames: ['Men\'s Hockey - Gold']
        },
        {
            id: '1952',
            year: 1952,
            hostCity: 'Helsinki',
            hostCountry: 'Finland',
            indianParticipation: 'Hockey fifth gold',
            sports: ['Hockey'],
            medals: 1,
            medalists: [{
                name: 'Team India',
                sport: 'Hockey',
                event: 'Men\'s Hockey',
                medal: 'Gold',
                achievement: 'First Asian nation to win Olympic hockey gold'
            }],
            eventNames: ['Men\'s Hockey - Gold']
        },
        {
            id: '1956',
            year: 1956,
            hostCity: 'Melbourne',
            hostCountry: 'Australia',
            indianParticipation: 'Hockey sixth gold',
            sports: ['Hockey'],
            medals: 1,
            medalists: [{
                name: 'Team India',
                sport: 'Hockey',
                medal: 'Gold',
                achievement: 'Unbeaten streak of 30+ matches continued'
            }],
            eventNames: ['Men\'s Hockey - Gold']
        },
        {
            id: '1960',
            year: 1960,
            hostCity: 'Rome',
            hostCountry: 'Italy',
            indianParticipation: 'Hockey silver ends streak',
            sports: ['Hockey'],
            medals: 1,
            medalists: [{
                name: 'Team India',
                sport: 'Hockey',
                event: 'Men\'s Hockey',
                medal: 'Silver',
                achievement: 'Ended 6-gold streak; silver in close final vs Pakistan'
            }],
            eventNames: ['Men\'s Hockey - Silver']
        },
        {
            id: '1964',
            year: 1964,
            hostCity: 'Tokyo',
            hostCountry: 'Japan',
            indianParticipation: 'Hockey gold return',
            sports: ['Hockey'],
            medals: 1,
            medalists: [{
                name: 'Team India',
                sport: 'Hockey',
                event: 'Men\'s Hockey',
                medal: 'Gold',
                achievement: 'Hockey gold returned to Tokyo; 1964 Tokyo Olympics'
            }],
            eventNames: ['Men\'s Hockey - Gold']
        },
        {
            id: '1968',
            year: 1968,
            hostCity: 'Mexico City',
            hostCountry: 'Mexico',
            indianParticipation: 'Hockey bronze',
            sports: ['Hockey'],
            medals: 1,
            medalists: [{
                name: 'Team India',
                sport: 'Hockey',
                event: 'Men\'s Hockey',
                medal: 'Bronze',
                achievement: 'Bronze medal after semi-final loss'
            }],
            eventNames: ['Men\'s Hockey - Bronze']
        },
        {
            id: '1972',
            year: 1972,
            hostCity: 'Munich',
            hostCountry: 'West Germany',
            indianParticipation: 'Hockey bronze',
            sports: ['Hockey'],
            medals: 1,
            medalists: [{
                name: 'Team India',
                sport: 'Hockey',
                event: 'Men\'s Hockey',
                medal: 'Bronze',
                achievement: 'Back-to-back bronze medals'
            }],
            eventNames: ['Men\'s Hockey - Bronze']
        },
        {
            id: '1976',
            year: 1976,
            hostCity: 'Montreal',
            hostCountry: 'Canada',
            indianParticipation: 'Hockey 5th place',
            sports: ['Hockey'],
            medals: 0,
            medalists: [],
            eventNames: []
        },
        {
            id: '1980',
            year: 1980,
            hostCity: 'Moscow',
            hostCountry: 'Soviet Union',
            indianParticipation: 'Hockey gold (boycott affected)',
            sports: ['Hockey'],
            medals: 1,
            medalists: [{
                name: 'Team India',
                sport: 'Hockey',
                event: 'Men\'s Hockey',
                medal: 'Gold',
                achievement: 'Gold medal impacted by boycotting nations; last Olympic hockey gold to date'
            }],
            eventNames: ['Men\'s Hockey - Gold']
        },
        {
            id: '1984',
            year: 1984,
            hostCity: 'Los Angeles',
            hostCountry: 'USA',
            indianParticipation: 'First individual participation',
            sports: ['Athletics', 'Wrestling', 'Shooting'],
            medals: 0,
            medalists: [],
            eventNames: []
        },
        {
            id: '1988',
            year: 1988,
            hostCity: 'Seoul',
            hostCountry: 'South Korea',
            indianParticipation: 'Expanded sports',
            sports: ['Athletics', 'Wrestling', 'Boxing', 'Shooting'],
            medals: 0,
            medalists: [],
            eventNames: []
        },
        {
            id: '1992',
            year: 1992,
            hostCity: 'Barcelona',
            hostCountry: 'Spain',
            indianParticipation: 'Modern era begins',
            sports: ['Athletics', 'Boxing', 'Shooting', 'Tennis', 'Weightlifting'],
            medals: 0,
            medalists: [],
            eventNames: []
        },
        {
            id: '1996',
            year: 1996,
            hostCity: 'Atlanta',
            hostCountry: 'USA',
            indianParticipation: 'First individual Olympic medal',
            sports: ['Athletics', 'Boxing', 'Shooting', 'Tennis', 'Weightlifting'],
            medals: 1,
            medalists: [{
                name: 'Leander Paes',
                sport: 'Tennis',
                event: 'Men\'s Singles',
                medal: 'Bronze',
                achievement: 'First individual Olympic medal since 1952'
            }],
            eventNames: ['Tennis - Bronze']
        },
        {
            id: '2000',
            year: 2000,
            hostCity: 'Sydney',
            hostCountry: 'Australia',
            indianParticipation: 'Multiple sports',
            sports: ['Athletics', 'Boxing', 'Hockey', 'Shooting', 'Tennis', 'Weightlifting'],
            medals: 2,
            medalists: [{
                name: 'Leander Paes',
                sport: 'Tennis',
                event: 'Men\'s Singles',
                medal: 'Bronze',
                achievement: 'Back-to-back Olympic bronze in tennis'
            }, {
                name: 'Karanam Malleshwari',
                sport: 'Weightlifting',
                event: 'Women\'s 69kg',
                medal: 'Bronze',
                achievement: 'First Indian woman to win Olympic medal'
            }],
            eventNames: ['Tennis - Bronze', 'Weightlifting - Bronze']
        },
        {
            id: '2004',
            year: 2004,
            hostCity: 'Athens',
            hostCountry: 'Greece',
            indianParticipation: 'Strong showing',
            sports: ['Athletics', 'Boxing', 'Hockey', 'Shooting', 'Tennis', 'Weightlifting'],
            medals: 1,
            medalists: [{
                name: 'Karanam Malleshwari',
                sport: 'Weightlifting',
                event: 'Women\'s 69kg',
                medal: 'Silver',
                achievement: 'Second Olympic medal; consistent weightlifting performance'
            }],
            eventNames: ['Weightlifting - Silver']
        },
        {
            id: '2008',
            year: 2008,
            hostCity: 'Beijing',
            hostCountry: 'China',
            indianParticipation: 'Breakthrough gold',
            sports: ['Athletics', 'Boxing', 'Hockey', 'Shooting', 'Weightlifting'],
            medals: 3,
            medalists: [{
                name: 'Abhinav Bindra',
                sport: 'Shooting',
                event: '10m Air Rifle',
                medal: 'Gold',
                achievement: 'India\'s first individual Olympic gold'
            }, {
                name: 'Sunita Rani',
                sport: 'Athletics',
                event: '800m',
                medal: 'N/A',
                achievement: 'Top-eight finish in 800m'
            }, {
                name: 'Team India',
                sport: 'Hockey',
                event: 'Men\'s Hockey',
                medal: 'Bronze',
                achievement: 'Hockey bronze; end of 28-year medal drought'
            }],
            eventNames: ['Shooting - Gold', 'Hockey - Bronze']
        },
        {
            id: '2012',
            year: 2012,
            hostCity: 'London',
            hostCountry: 'UK',
            indianParticipation: 'Best ever medal tally at time',
            sports: ['Athletics', 'Boxing', 'Hockey', 'Shooting', 'Weightlifting', 'Wrestling'],
            medals: 6,
            medalists: [{
                name: 'Sushil Kumar',
                sport: 'Wrestling',
                event: '66kg Freestyle',
                medal: 'Silver',
                achievement: 'Silver in wrestling'
            }, {
                name: 'Vijay Kumar',
                sport: 'Shooting',
                event: '25m Rapid Fire Pistol',
                medal: 'Silver',
                achievement: 'Silver in shooting'
            }, {
                name: 'Gagan Narang',
                sport: 'Shooting',
                event: '10m Air Rifle',
                medal: 'Bronze',
                achievement: 'Bronze in shooting'
            }, {
                name: 'Saina Nehwal',
                sport: 'Badminton',
                event: 'Women\'s Singles',
                medal: 'Bronze',
                achievement: 'First Olympic badminton medal for India'
            }, {
                name: 'Mary Kom',
                sport: 'Boxing',
                event: 'Women\'s 51kg',
                medal: 'Bronze',
                achievement: 'First Olympic medal for women\'s boxing'
            }, {
                name: 'Team India',
                sport: 'Hockey',
                event: 'Men\'s Hockey',
                medal: 'Bronze',
                achievement: 'Hockey bronze after 40-year drought'
            }],
            eventNames: ['Wrestling - Silver', 'Shooting - Silver', 'Shooting - Bronze', 'Badminton - Bronze', 'Boxing - Bronze', 'Hockey - Bronze']
        },
        {
            id: '2016',
            year: 2016,
            hostCity: 'Rio de Janeiro',
            hostCountry: 'Brazil',
            indianParticipation: 'Historic gold medal',
            sports: ['Athletics', 'Badminton', 'Boxing', 'Cycling', 'Shooting', 'Weightlifting', 'Wrestling'],
            medals: 2,
            medalists: [{
                name: 'P. V. Sindhu',
                sport: 'Badminton',
                event: 'Women\'s Singles',
                medal: 'Silver',
                achievement: 'Silver in badminton; first badminton final'
            }, {
                name: 'Dipa Karmakar',
                sport: 'Gymnastics',
                event: 'Vault',
                medal: 'N/A',
                achievement: '4th place in vault; near-medal with Tsukahara double'
            }],
            eventNames: ['Badminton - Silver']
        },
        {
            id: '2020',
            year: 2021,
            hostCity: 'Tokyo',
            hostCountry: 'Japan',
            indianParticipation: 'Most successful Olympics',
            sports: ['Athletics', 'Badminton', 'Boxing', 'Hockey', 'Shooting', 'Weightlifting', 'Wrestling'],
            medals: 7,
            medalists: [{
                name: 'Neeraj Chopra',
                sport: 'Javelin',
                event: 'Javelin Throw',
                medal: 'Gold',
                achievement: 'Olympic gold in javelin throw; first athletics gold'
            }, {
                name: 'P. V. Sindhu',
                sport: 'Badminton',
                event: 'Women\'s Singles',
                medal: 'Silver',
                achievement: 'Second Olympic medal; silver in badminton final'
            }, {
                name: 'Mirabai Chanu',
                sport: 'Weightlifting',
                event: 'Women\'s 49kg',
                medal: 'Silver',
                achievement: 'Silver in weightlifting'
            }, {
                name: 'Bajrang Punia',
                sport: 'Wrestling',
                event: '65kg Freestyle',
                medal: 'Bronze',
                achievement: 'Bronze in wrestling'
            }, {
                name: ' Lovlina Borgohain',
                sport: 'Boxing',
                event: 'Women\'s 69kg',
                medal: 'Bronze',
                achievement: 'Bronze in boxing'
            }, {
                name: 'Sumit Antil',
                sport: 'Javelin',
                event: 'Javelin Throw (F64)',
                medal: 'Gold',
                achievement: 'Gold in Paralympic-style event'
            }, {
                name: 'Hardik Singh',
                sport: 'Hockey',
                event: 'Men\'s Hockey',
                medal: 'Bronze',
                achievement: 'Hockey bronze; return to podium'
            }],
            eventNames: ['Javelin - Gold', 'Badminton - Silver', 'Weightlifting - Silver', 'Wrestling - Bronze', 'Boxing - Bronze', 'Javelin - Gold (Para)', 'Hockey - Bronze']
        },
        {
            id: '2024',
            year: 2024,
            hostCity: 'Paris',
            hostCountry: 'France',
            indianParticipation: 'Continued participation',
            sports: ['Athletics', 'Badminton', 'Boxing', 'Hockey', 'Shooting', 'Swimming', 'Weightlifting', 'Wrestling'],
            medals: 1,
            medalists: [{
                name: 'Arshad Nadeem',
                sport: 'Javelin',
                event: 'Javelin Throw',
                medal: 'N/A',
                achievement: 'Pakistan; reference for comparative performance'
            }],
            eventNames: []
        }
    ];

    const timelineData = [
        {
            id: '1928',
            year: '1928',
            title: 'Hockey gold dynasty begins',
            summary: 'India wins first Olympic medal in Amsterdam',
            detail: 'The 1928 Olympic gold in hockey became India\'s first Olympic medal and set the tone for a dominant era in field hockey that would last decades.'
        },
        {
            id: '1948',
            year: '1948',
            title: 'First gold as independent nation',
            summary: 'India wins hockey gold in London post-independence',
            detail: 'The 1948 Olympic gold in hockey became India\'s first gold as an independent nation, symbolizing newfound sporting pride.'
        },
        {
            id: '1952',
            year: '1952',
            title: 'First Asian Olympic hockey gold',
            summary: 'India becomes first Asian nation to win Olympic hockey gold',
            detail: 'The 1952 Helsinki Olympics marked India as the first Asian nation to win Olympic hockey gold, inspiring future generations.'
        },
        {
            id: '1983-cricket',
            year: '1983',
            title: 'Cricket World Cup triumph',
            summary: 'India wins first Cricket World Cup (not Olympic but major milestone)',
            detail: 'While not an Olympic event, the 1983 World Cup victory transformed Indian sport culture and inspired greater Olympic ambition.'
        },
        {
            id: '2008',
            year: '2008',
            title: 'First individual Olympic gold',
            summary: 'Abhinav Bindra wins gold in shooting',
            detail: 'Bindra\'s gold medal in 2008 changed the emotional ceiling of Indian sport. It showed that an individual Indian athlete could deliver gold at the highest level of global competition.'
        },
        {
            id: '2012',
            year: '2012',
            title: 'Best-ever Olympic medal tally',
            summary: 'India wins 6 medals at London 2012',
            detail: 'The London 2012 Olympics saw India win its most medals at a single Games with 6 medals across wrestling, shooting, badminton, boxing, and hockey.'
        },
        {
            id: '2020',
            year: '2021',
            title: 'Most successful Olympics ever',
            summary: 'India wins 7 medals including 2 golds in Tokyo 2020',
            detail: 'Tokyo 2020 was India\'s most successful Olympics ever with 7 medals including historic golds in javelin throw and strong performances across multiple sports.'
        },
        {
            id: '2024',
            year: '2024',
            title: 'Paris Olympics continuation',
            summary: 'India continues its Olympic journey in Paris',
            detail: 'Paris 2024 continues India\'s growing Olympic presence with increased participation across more sports and athletes.'
        }
    ];

    const medalMapData = [
        {
            id: 'punjab',
            name: 'Punjab',
            medalists: [{
                name: 'Dhyan Chand',
                sport: 'Hockey',
                edition: '1928-1936',
                medal: 'Gold',
                achievement: 'Hockey legend; 3 Olympic golds'
            }, {
                name: 'Balbir Singh Senior',
                sport: 'Hockey',
                edition: '1948, 1952',
                medal: 'Gold',
                achievement: 'Hockey legend; 2 Olympic gold medals'
            }]
        },
        {
            id: 'uttar-pradesh',
            name: 'Uttar Pradesh',
            medalists: [{
                name: 'Leander Paes',
                sport: 'Tennis',
                edition: '1992-2004',
                medal: 'Bronze',
                achievement: 'First individual Olympic medal; 8 appearances'
            }, {
                name: 'Saina Nehwal',
                sport: 'Badminton',
                edition: '2012',
                medal: 'Bronze',
                achievement: 'First Olympic badminton medal'
            }]
        },
        {
            id: 'haryana',
            name: 'Haryana',
            medalists: [{
                name: 'Sushil Kumar',
                sport: 'Wrestling',
                edition: '2012',
                medal: 'Silver',
                achievement: 'Silver in wrestling 66kg'
            }, {
                name: 'Bajrang Punia',
                sport: 'Wrestling',
                edition: '2020',
                medal: 'Bronze',
                achievement: 'Bronze in wrestling 65kg'
            }]
        },
        {
            id: 'gujarat',
            name: 'Gujarat',
            medalists: [{
                name: 'Karanam Malleshwari',
                sport: 'Weightlifting',
                edition: '2000-2004',
                medal: 'Bronze/Silver',
                achievement: 'First Indian woman Olympic medal'
            }]
        },
        {
            id: 'trichirapalli',
            name: 'Tamil Nadu',
            medalists: [{
                name: 'Vijay Kumar',
                sport: 'Shooting',
                edition: '2012',
                medal: 'Silver',
                achievement: 'Silver in shooting 25m Rapid Fire Pistol'
            }]
        },
        {
            id: 'delhi',
            name: 'Delhi',
            medalists: [{
                name: 'Abhinav Bindra',
                sport: 'Shooting',
                edition: '2008',
                medal: 'Gold',
                achievement: 'India\'s first individual Olympic gold'
            }]
        },
        {
            id: 'mizoram',
            name: 'Mizoram',
            medalists: [{
                name: 'Mirabai Chanu',
                sport: 'Weightlifting',
                edition: '2020',
                medal: 'Silver',
                achievement: 'Silver in weightlifting 49kg'
            }]
        },
        {
            id: 'rajasthan',
            name: 'Rajasthan',
            medalists: [{
                name: 'Sunita Rani',
                sport: 'Athletics',
                edition: '2008',
                medal: 'N/A',
                achievement: 'Top-eight finish in 800m'
            }]
        }
    ];

    const medalDashboardData = [
        {
            id: 'gold',
            label: 'Gold',
            count: 10,
            category: 'gold'
        },
        {
            id: 'silver',
            label: 'Silver',
            count: 10,
            category: 'silver'
        },
        {
            id: 'bronze',
            label: 'Bronze',
            count: 12,
            category: 'bronze'
        }
    ];

    const sportsData = [
        { id: 'hockey', name: 'Hockey', participations: 12, medals: 12, gold: 8, silver: 1, bronze: 3, firstParticipation: '1928' },
        { id: 'athletics', name: 'Athletics', participations: 15, medals: 5, gold: 1, silver: 2, bronze: 2, firstParticipation: '1900' },
        { id: 'wrestling', name: 'Wrestling', participations: 8, medals: 5, gold: 0, silver: 2, bronze: 3, firstParticipation: '1984' },
        { id: 'shooting', name: 'Shooting', participations: 14, medals: 6, gold: 1, silver: 2, bronze: 3, firstParticipation: '2000' },
        { id: 'badminton', name: 'Badminton', participations: 8, medals: 3, gold: 0, silver: 2, bronze: 1, firstParticipation: '1992' },
        { id: 'boxing', name: 'Boxing', participations: 11, medals: 3, gold: 0, silver: 0, bronze: 3, firstParticipation: '1992' },
        { id: 'weightlifting', name: 'Weightlifting', participations: 12, medals: 4, gold: 0, silver: 2, bronze: 2, firstParticipation: '2000' },
        { id: 'tennis', name: 'Tennis', participations: 9, medals: 2, gold: 0, silver: 0, bronze: 2, firstParticipation: '1992' },
        { id: 'archery', name: 'Archery', participations: 6, medals: 0, gold: 0, silver: 0, bronze: 0, firstParticipation: '1984' },
        { id: 'table-tennis', name: 'Table Tennis', participations: 7, medals: 0, gold: 0, silver: 0, bronze: 0, firstParticipation: '1992' },
        { id: 'swimming', name: 'Swimming', participations: 5, medals: 0, gold: 0, silver: 0, bronze: 0, firstParticipation: '2008' },
        { id: 'cycling', name: 'Cycling', participations: 4, medals: 0, gold: 0, silver: 0, bronze: 0, firstParticipation: '1984' }
    ];

    const featuredOlympiansData = [
        {
            id: 'abhinav-bindra',
            name: 'Abhinav Bindra',
            sport: 'Shooting',
            editions: ['2008', '2012'],
            medals: [{ medal: 'Gold', edition: '2008' }],
            achievement: 'India\'s first individual Olympic gold medalist in shooting (10m Air Rifle, Beijing 2008)',
            biography: 'Abhinav Bindra is India\'s first individual Olympic gold medalist. He won gold in the 10m Air Rifle event at the Beijing 2008 Olympics, ending India\'s 28-year Olympic medal drought and becoming the first Indian to win an individual gold. His victory marked a turning point for Indian sports, proving that individual athletes could reach the pinnacle of global competition.'
        },
        {
            id: 'pv-sindhu',
            name: 'P. V. Sindhu',
            sport: 'Badminton',
            editions: ['2016', '2020'],
            medals: [{ medal: 'Silver', edition: '2016' }, { medal: 'Silver', edition: '2020' }],
            achievement: 'First Indian woman to win two Olympic medals; badminton trailblazer',
            biography: 'P. V. Sindhu is a badminton champion who became the first Indian woman to win two Olympic medals. Her speed, discipline, and clutch play turned badminton into a major national success story. She won silver in Rio 2016 and silver in Tokyo 2020, inspiring a generation of young badminton players.'
        },
        {
            id: 'neeraj-chopra',
            name: 'Neeraj Chopra',
            sport: 'Javelin Throw',
            editions: ['2020', '2024'],
            medals: [{ medal: 'Gold', edition: '2020' }],
            achievement: 'Olympic gold in javelin throw; first Indian athletics gold',
            biography: 'Neeraj Chopra won Olympic gold in javelin throw at Tokyo 2020, becoming India\'s first athletics Olympic gold medalist. His victory inspired a wave of interest in track and field and showed that Indian athletes could dominate in throwing events on the world stage. He also won gold at the 2022 Commonwealth Games and 2023 World Championships.'
        },
        {
            id: 'karanam-malleshwari',
            name: 'Karanam Malleshwari',
            sport: 'Weightlifting',
            editions: ['2000', '2004'],
            medals: [{ medal: 'Bronze', edition: '2000' }, { medal: 'Silver', edition: '2004' }],
            achievement: 'First Indian woman to win an Olympic medal',
            biography: 'Karanam Malleshwari created history by becoming the first Indian woman to win an Olympic medal. She won bronze in Sydney 2000 and silver in Athens 2004 in weightlifting, breaking barriers and paving the way for future female Indian Olympians.'
        },
        {
            id: 'sushil-kumar',
            name: 'Sushil Kumar',
            sport: 'Wrestling',
            editions: ['2008', '2012'],
            medals: [{ medal: 'Bronze', edition: '2008' }, { medal: 'Silver', edition: '2012' }],
            achievement: 'Two-medal wrestler; India\'s most decorated Olympic wrestler',
            biography: 'Sushil Kumar is India\'s most decorated Olympic wrestler, winning bronze in Beijing 2008 and silver in London 2012. He carried India\'s wrestling hopes and inspired many young wrestlers to take up the sport professionally.'
        },
        {
            id: 'bajrang-punia',
            name: 'Bajrang Punia',
            sport: 'Wrestling',
            editions: ['2016', '2020'],
            medals: [{ medal: 'Bronze', edition: '2020' }],
            achievement: 'Consistent medal contender in freestyle wrestling',
            biography: 'Bajrang Punia is a consistent medal contender in freestyle wrestling, winning bronze at Tokyo 2020. Known for his technical brilliance and aggressive wrestling style, he is among India\'s top Olympic wrestling hopes.'
        },
        {
            id: 'mirabai-chanu',
            name: 'Mirabai Chanu',
            sport: 'Weightlifting',
            editions: ['2020'],
            medals: [{ medal: 'Silver', edition: '2020' }],
            achievement: 'Silver in weightlifting 49kg; consistent podium finisher',
            biography: 'Mirabai Chanu won silver in weightlifting at Tokyo 2020 in the 49kg category. She had previously finished fourth in Rio 2016 but bounced back strongly to claim silver in Tokyo, becoming one of India\'s most consistent weightlifting Olympians.'
        },
        {
            id: 'lovina-borgohain',
            name: 'Lovlina Borgohain',
            sport: 'Boxing',
            editions: ['2020'],
            medals: [{ medal: 'Bronze', edition: '2020' }],
            achievement: 'Bronze in boxing women\'s 69kg',
            biography: 'Lovlina Borgohain won bronze in boxing at Tokyo 2020 in the women\'s 69kg category. She became only the third Indian boxer to win an Olympic medal and continues to be a top contender in women\'s boxing.'
        },
        {
            id: 'sumit-antil',
            name: 'Sumit Antil',
            sport: 'Javelin Throw',
            editions: ['2020'],
            medals: [{ medal: 'Gold', edition: '2020' }],
            achievement: 'Gold in men\'s javelin throw F64 (paralympic event)',
            biography: 'Sumit Antil won gold in the men\'s javelin throw F64 event at Tokyo 2020. His victory was a landmark moment for para-sports in India and showcased India\'s growing strength in Paralympic athletics.'
        }
    ];

    const historicFirstsData = [
        {
            id: 'first-participation',
            title: 'India\'s first Olympic participation',
            year: '1900',
            description: 'India participated in the Paris Olympics for the first time, with athletics being the first sport represented.'
        },
        {
            id: 'first-medal',
            title: 'First Olympic medal',
            year: '1928',
            description: 'India won its first Olympic medal - gold in men\'s hockey in Amsterdam 1928.'
        },
        {
            id: 'first-gold',
            title: 'First Olympic gold',
            year: '1928',
            description: 'India won its first Olympic gold medal in men\'s hockey in Amsterdam 1928, beginning a dominant era.'
        },
        {
            id: 'first-individual-medal',
            title: 'First individual Olympic medal',
            year: '2000',
            description: 'Karanam Malleshwari won bronze in weightlifting at Sydney 2000, becoming the first Indian to win an individual Olympic medal (separate from team hockey).'
        },
        {
            id: 'first-individual-gold',
            title: 'First individual Olympic gold',
            year: '2008',
            description: 'Abhinav Bindra won gold in 10m Air Rifle at Beijing 2008, India\'s first individual Olympic gold.'
        },
        {
            id: 'first-woman-medal',
            title: 'First Indian woman Olympic medal',
            year: '2000',
            description: 'Karanam Malleshwari became the first Indian woman to win an Olympic medal with her bronze in weightlifting at Sydney 2000.'
        },
        {
            id: 'first-woman-gold',
            title: 'First individual Olympic gold by woman',
            year: 'N/A',
            description: 'No Indian woman has yet won an individual Olympic gold, though several have won medals (silver and bronze).'
        },
        {
            id: 'first-hockey-gold',
            title: 'First Olympic gold in hockey',
            year: '1928',
            description: 'India won its first Olympic gold in field hockey in Amsterdam 1928, beginning an 8-gold medal streak.'
        }
    ];

    const iconicMomentsData = [
        {
            id: 'hockey-1928',
            year: '1928',
            athlete: 'Team India',
            sport: 'Hockey',
            event: 'Men\'s Hockey Final',
            achievement: 'Won first Olympic gold medal',
            context: 'India defeated Netherlands 3-1 in the final to win its first Olympic gold, beginning a dynasty that would see India win 8 consecutive gold medals in hockey.'
        },
        {
            id: 'bindra-2008',
            year: '2008',
            athlete: 'Abhinav Bindra',
            sport: 'Shooting',
            event: '10m Air Rifle Final',
            achievement: 'Won India\'s first individual Olympic gold',
            context: 'Abhinav Bindra won gold in the 10m Air Rifle event, becoming India\'s first individual Olympic gold medalist and ending a 28-year medal drought.'
        },
        {
            id: 'sindhu-2016',
            year: '2016',
            athlete: 'P. V. Sindhu',
            sport: 'Badminton',
            event: 'Women\'s Singles Final',
            achievement: 'Reached first badminton final; won silver',
            context: 'P. V. Sindhu became the first Indian badminton player to win an Olympic silver medal, reaching the final and putting badminton on the Indian sporting map.'
        },
        {
            id: 'chopra-2020',
            year: '2020',
            athlete: 'Neeraj Chopra',
            sport: 'Javelin Throw',
            achievement: 'Won India\'s first Olympic gold in athletics',
            context: 'Neeraj Chopra won gold in javelin throw at Tokyo 2020, becoming India\'s first athletics Olympic gold medalist and marking a historic moment for Indian track and field.'
        },
        {
            id: 'malleshwari-2000',
            year: '2000',
            athlete: 'Karanam Malleshwari',
            sport: 'Weightlifting',
            achievement: 'First Indian woman Olympic medalist',
            context: 'Karanam Malleshwari won bronze in weightlifting at Sydney 2000, becoming the first Indian woman to win an Olympic medal and opening the door for future female medalists.'
        },
        {
            id: 'tokyo-2020-medal-tally',
            year: '2020',
            athlete: 'Indian contingent',
            sport: 'Multiple',
            achievement: 'Best-ever Olympic performance with 7 medals',
            context: 'Tokyo 2020 was India\'s most successful Olympics ever with 7 medals including 2 golds, marking a new era of Olympic success across multiple sports.'
        }
    ];

    let activeFilter = 'all';
    let activeTimelineId = 'all';
    let lastFocusedTrigger = null;
    let isModalOpen = false;

    renderTimeline();
    renderMedalDashboard();
    renderMedalMap();
    renderSports();
    renderFeaturedOlympians();
    renderHistoricFirsts();
    renderIconicMoments();

    const cleanup = window.ResourceCleanup;

    filterButtons.forEach(btn => {
        cleanup.addManagedListener(btn, 'click', () => {
            const sport = btn.getAttribute('data-olympic-sport-filter');
            activeFilter = sport || 'all';
            setActiveFilterButton(activeFilter);
            renderMedalDashboard();
            renderAthletes();
        });
    });

    sportFilterButtons.forEach(btn => {
        cleanup.addManagedListener(btn, 'click', () => {
            const sport = btn.getAttribute('data-olympic-sport-filter');
            activeFilter = sport || 'all';
            setActiveFilterButton(activeFilter);
            renderMedalDashboard();
            renderAthletes();
        });
    });

    cleanup.addManagedListener(searchInput, 'input', () => {
        renderAthletes();
    });

    cleanup.addManagedListener(timelineGrid, 'click', (event) => {
        const button = event.target.closest('[data-timeline-filter]');
        if (!button) return;

        const filter = button.getAttribute('data-timeline-filter') || 'all';
        activeTimelineId = button.getAttribute('data-timeline-id') || 'all';
        activeFilter = filter;
        setActiveFilterButton(filter);
        setActiveTimelineButton(button);

        const milestone = timelineData.find(item => item.id === activeTimelineId) || timelineData[0];
        renderTimelineDetail(milestone);
        renderAthletes();
        medalMapContainer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    cleanup.addManagedListener(modalClose, 'click', closeModal);
    cleanup.addManagedListener(modal, 'click', (event) => {
        if (event.target === modal) closeModal();
    });

    cleanup.addManagedListener(document, 'keydown', (event) => {
        if (!isModalOpen) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
        }
    });

    function setActiveFilterButton(filterValue) {
        const buttons = medalFilters ? medalFilters.querySelectorAll('[data-medal-filter]') : [];
        buttons.forEach(btn => {
            const isActive = (btn.getAttribute('data-medal-filter') || 'all') === filterValue;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });

        const sportButtons = sportFilterButtons ? sportFilterButtons.length > 0 ? document.querySelectorAll('[data-olympic-sport-filter]') : [] : [];
        sportButtons.forEach(btn => {
            const isActive = btn.getAttribute('data-olympic-sport-filter') === filterValue;
            btn.classList.toggle('active', isActive);
        });
    }

    function setActiveTimelineButton(activeButton) {
        const buttons = timelineGrid.querySelectorAll('[data-timeline-filter]');
        buttons.forEach(btn => {
            const isActive = activeButton ? btn === activeButton : false;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function renderTimeline() {
        timelineGrid.innerHTML = '';

        timelineData.forEach(item => {
            const timelineButton = document.createElement('button');
            timelineButton.type = 'button';
            timelineButton.className = `olympic-timeline-item glass-card ${item.category}`;
            timelineButton.setAttribute('data-timeline-filter', item.category);
            timelineButton.setAttribute('data-timeline-id', item.id);
            timelineButton.setAttribute('aria-pressed', 'false');
            timelineButton.innerHTML = `
                <span class="timeline-year">${item.year}</span>
                <span class="sports-badge ${item.category}">${getCategoryLabel(item.category)}</span>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
            `;

            timelineGrid.appendChild(timelineButton);
        });
    }

    function renderTimelineDetail(item) {
        timelineDetail.innerHTML = `
            <div class="timeline-detail-head">
                <span class="sports-badge ${item.category}">${getCategoryLabel(item.category)}</span>
                <span class="timeline-detail-year">${item.year}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.detail}</p>
        `;
    }

    function renderMedalDashboard() {
        medalGrid.innerHTML = '';

        const filteredData = medalDashboardData.filter(item => {
            const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
            return matchesFilter;
        });

        if (filteredData.length === 0) {
            medalGrid.innerHTML = `
                <div class="sports-empty-state glass-card">
                    <h3>No data found</h3>
                    <p>Try adjusting the filters.</p>
                </div>
            `;
            return;
        }

        filteredData.forEach(item => {
            const medalCard = document.createElement('div');
            medalCard.className = 'olympic-medal-card glass-card';
            medalCard.innerHTML = `
                <div class="olympic-medal-icon">${getMedalLabel(item.category)}</div>
                <div class="olympic-medal-label">${item.label}</div>
                <div class="olympic-medal-count">${item.count}</div>
            `;
            medalGrid.appendChild(medalCard);
        });
    }

    function renderMedalMap() {
        medalMapContainer.innerHTML = '';

        const mapSvg = `
            <svg viewBox="0 0 612 696" class="olympic-svg-map">
                <defs>
                    <style>
                        .olympic-state-path {
                            fill: var(--glass-bg);
                            stroke: var(--glass-border);
                            cursor: pointer;
                            transition: var(--transition-smooth);
                        }
                        .olympic-state-path:hover {
                            fill: rgba(255, 153, 51, 0.2);
                        }
                        .olympic-state-path.active {
                            fill: var(--primary-gold);
                        }
                        .olympic-state-path.selected {
                            fill: var(--primary-saffron);
                            stroke: var(--primary-gold);
                        }
                        .olympic-state-label {
                            font-size: 8px;
                            fill: var(--text-muted);
                            cursor: pointer;
                        }
                    </style>
                </defs>
        `;

        medalMapData.forEach(region => {
            mapSvg += `
                <path
                    class="olympic-state-path"
                    data-region="${region.id}"
                    data-name="${region.name}"
                    d="${region.path}"
                    aria-label="Click to view medalists from ${region.name}"
                    role="button"
                    tabindex="0"
                >
                    <title>${region.name} - ${region.medalists.length} medal(s)</title>
                </path>
                <path
                    class="olympic-state-label"
                    data-region="${region.id}"
                    d="${region.labelPath || region.path}"
                >
                    ${region.name}
                </path>
            `;
        });

        mapSvg += `</svg>`;
        medalMapContainer.innerHTML = mapSvg;

        // Add click handlers for state paths
        const statePaths = medalMapContainer.querySelectorAll('.olympic-state-path');
        statePaths.forEach(path => {
            path.addEventListener('click', () => handleStateClick(path.getAttribute('data-region')));
            path.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleStateClick(path.getAttribute('data-region'));
                }
            });
        });
    }

    function handleStateClick(regionId) {
        const region = medalMapData.find(r => r.id === regionId);
        if (!region) return;

        // Show athlete cards for this region
        renderAthletesByRegion(region.medalists);
        
        // Update visual state
        const paths = medalMapContainer.querySelectorAll('.olympic-state-path');
        paths.forEach(path => {
            path.classList.remove('active', 'selected');
            if (path.getAttribute('data-region') === regionId) {
                path.classList.add('selected');
            }
        });
    }

    function renderAthletesByRegion(medalists) {
        athleteGrid.innerHTML = '';

        if (medalists.length === 0) {
            athleteGrid.innerHTML = `
                <div class="sports-empty-state glass-card">
                    <h3>No athletes found</h3>
                    <p>This region has no Olympic medalists listed.</p>
                </div>
            `;
            return;
        }

        medalists.forEach(athlete => {
            const card = document.createElement('article');
            card.className = 'athlete-card glass-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View details for ${athlete.name}`);
            card.setAttribute('data-sport', athlete.sport);

            card.innerHTML = `
                <div class="athlete-card-header">
                    <div class="athlete-media ${athlete.sport.toLowerCase()}">
                        <img src="../assets/sports/${athlete.id}.png" alt="${athlete.name}" loading="lazy">
                    </div>
                    <div class="athlete-card-title">
                        <span class="sports-badge ${athlete.sport.toLowerCase()}">${capitalizeFirst(athlete.sport)}</span>
                        <h3>${athlete.name}</h3>
                        <p>${athlete.sport}</p>
                    </div>
                </div>
                <p class="athlete-summary">${athlete.achievement}</p>
                <div class="achievement-chip-row">
                    ${athlete.medal ? `<span class="achievement-chip">${athlete.medal}</span>` : ''}
                </div>
                <div class="athlete-card-footer">
                    <span class="card-sport-note">Olympic edition: ${athlete.edition || 'Various'}</span>
                    <button type="button" class="btn btn-secondary athlete-view-btn">View Details</button>
                </div>
            `;

            card.addEventListener('click', () => openModal(athlete, card));
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openModal(athlete, card);
                }
            });

            athleteGrid.appendChild(card);
        });
    }

    function renderSports() {
        olympicSportsGrid.innerHTML = '';

        sportsData.forEach(sport => {
            const sportCard = document.createElement('div');
            sportCard.className = 'olympic-sports-card glass-card';
            sportCard.innerHTML = `
                <div class="olympic-sport-icon">${getFirstLetter(sport.name)}</div>
                <div class="olympic-sport-name">${sport.name}</div>
                <div class="olympic-sport-stats">
                    <span>• ${sport.participations} participations</span>
                    <span>• ${sport.medals} medals</span>
                    <span>• ${sport.gold} gold</span>
                </div>
            `;

            olympicSportsGrid.appendChild(sportCard);
        });
    }

    function renderFeaturedOlympians() {
        athleteGrid.innerHTML = '';

        featuredOlympiansData.forEach(athlete => {
            const card = document.createElement('article');
            card.className = 'athlete-card glass-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View details for ${athlete.name}`);

            const medalHtml = athlete.medals.map(m => `<span class="achievement-chip">${m.medal} ${m.edition}</span>`).join('');

            card.innerHTML = `
                <div class="athlete-card-header">
                    <div class="athlete-media olympics">
                        <img src="../assets/sports/${athlete.id}.png" alt="${athlete.name}" loading="lazy">
                    </div>
                    <div class="athlete-card-title">
                        <span class="sports-badge olympics">Olympics</span>
                        <h3>${athlete.name}</h3>
                        <p>${athlete.sport}</p>
                    </div>
                </div>
                <p class="athlete-summary">${athlete.biography.substring(0, 100)}...</p>
                <div class="achievement-chip-row">
                    ${medalHtml}
                </div>
                <div class="athlete-card-footer">
                    <span class="card-sport-note">View full profile</span>
                    <button type="button" class="btn btn-secondary athlete-view-btn">View Details</button>
                </div>
            `;

            card.addEventListener('click', () => openModal(athlete, card));
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openModal(athlete, card);
                }
            });

            athleteGrid.appendChild(card);
        });
    }

    function renderHistoricFirsts() {
        historicGrid.innerHTML = '';

        historicFirstsData.forEach(item => {
            const firstCard = document.createElement('div');
            firstCard.className = 'olympic-historic-card glass-card';
            firstCard.innerHTML = `
                <div class="olympic-historic-year">${item.year}</div>
                <div class="olympic-historic-title">${item.title}</div>
                <p>${item.description}</p>
            `;

            historicGrid.appendChild(firstCard);
        });
    }

    function renderIconicMoments() {
        momentsGrid.innerHTML = '';

        iconicMomentsData.forEach(item => {
            const momentCard = document.createElement('div');
            momentCard.className = 'olympic-moment-card glass-card';
            momentCard.innerHTML = `
                <div class="olympic-moment-year">${item.year}</div>
                <div>
                    <h4>${item.athlete}</h4>
                    <p>${item.sport} - ${item.achievement}</p>
                </div>
            `;

            momentsGrid.appendChild(momentCard);
        });
    }

    function openModal(athlete, trigger) {
        modalCategory.className = `sports-badge ${athlete.editions.includes('2008') || athlete.editions.includes('2012') || athlete.editions.includes('2016') || athlete.editions.includes('2020') ? 'olympics' : 'all'}`;
        modalCategory.textContent = 'Olympics';
        modalTitle.textContent = athlete.name;
        modalSubtitle.textContent = athlete.sport;
        modalStory.textContent = athlete.biography;

        modalHighlights.innerHTML = athlete.achievement ? `[${athlete.achievement}]` : '';

        modalStats.innerHTML = athlete.medals.map(stat => `
            <div class="modal-stat">
                <span class="modal-stat-label">${stat.medal}</span>
                <span class="modal-stat-value">${stat.edition}</span>
            </div>
        `).join('');

        modalAvatar.className = `sports-modal-avatar olympics`;
        modalAvatar.innerHTML = `<img src="${athlete.image || `../assets/sports/${athlete.id}.png`}" alt="${athlete.name}" loading="lazy">`;

        window.ModalUtils.openModal({
            modalEl: modal,
            triggerEl: trigger || document.activeElement,
            onOpen: () => {
                isModalOpen = true;
            },
            onClose: () => {
                isModalOpen = false;
            }
        });
    }

    function closeModal() {
        window.ModalUtils.closeModal(modal);
    }

    function getCategoryLabel(category) {
        if (category === 'olympics') return 'Olympics';
        if (category === 'all') return 'All';
        return 'All';
    }

    function getMedalLabel(category) {
        if (category === 'gold') return 'Gold';
        if (category === 'silver') return 'Silver';
        if (category === 'bronze') return 'Bronze';
        return 'Medals';
    }

    function capitalizeFirst(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase();
    }
}