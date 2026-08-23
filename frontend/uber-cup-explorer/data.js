/**
 * Uber Cup Explorer - Data Module (#2540)
 * Verified facts about India's journey in the Uber Cup (World Women's Team
 * Badminton Championships), sourced from BWF, Wikipedia and contemporary
 * press reports. See the Sources section of index.html.
 *
 * Exposed as a single global so script.js can render the interactive
 * player & tournament timeline from it.
 */
window.UBER_CUP_DATA = {
    tournaments: [
        { year: 1957, edition: '1st', host: 'Lytham St Annes, England', champion: 'United States', india: 'Semi-finals', note: 'India reached the last four on debut in the inaugural edition; USA beat Denmark 6-1 in the final.' },
        { year: 2014, edition: '25th', host: 'New Delhi, India (Siri Fort Sports Complex)', champion: 'China', india: 'Semi-finals - first-ever medal (bronze)', note: 'India hosted for the first time. Saina Nehwal and P.V. Sindhu put India 2-0 up on Japan before the doubles rubbers slipped away.' },
        { year: 2016, edition: '26th', host: 'Kunshan, China', champion: 'China', india: 'Semi-finals', note: "India's second consecutive last-four finish confirmed its arrival among Asia's elite." },
        { year: 2022, edition: '29th', host: 'Bangkok, Thailand', champion: 'South Korea', india: 'Group stage', note: 'South Korea stunned China 3-2 in the final to end a decade of Chinese dominance.' },
        { year: 2024, edition: '30th', host: 'Chengdu, China', champion: 'China (16th title)', india: 'Quarter-finals (lost 0-3 to Japan)', note: "A rebuilt young squad featuring Ashmita Chaliha, Isharani Baruah and the Konjengbam-Mishra pairing pushed into the knockouts." },
        { year: 2026, edition: '31st', host: 'Horsens, Denmark', champion: 'South Korea (3rd title)', india: 'Group stage', note: 'Korea regained the crown, beating China 3-1 in the final.' }
    ],
    players: [
        { name: 'Saina Nehwal', initials: 'SN', role: 'Singles', era: '2000s-2020s', highlight: 'Olympic bronze medallist (London 2012), former World No. 1, spearhead of the 2014 bronze run with straight-set wins in the semifinal push.', uberCups: 'Multiple campaigns incl. 2014' },
        { name: 'P.V. Sindhu', initials: 'PS', role: 'Singles', era: '2010s-2020s', highlight: "Two-time Olympic medallist (silver Rio 2016, bronze Tokyo 2020) and 2019 World Champion. Saved four match points to win 26-24 in the third of the 2014 Uber Cup semifinal.", uberCups: '2014, 2016 campaigns' },
        { name: 'Jwala Gutta', initials: 'JG', role: 'Doubles', era: '2000s-2010s', highlight: 'Left-handed doubles specialist who, with Ashwini Ponnappa, formed the backbone of the 2014 bronze-winning doubles line-up.', uberCups: '2014' },
        { name: 'Ashwini Ponnappa', initials: 'AP', role: 'Doubles', era: '2010s-2020s', highlight: 'Commonwealth Games gold medallist and long-serving doubles mainstay across multiple Uber Cup cycles.', uberCups: '2014 and beyond' },
        { name: 'P.C. Thulasi', initials: 'PT', role: 'Singles', era: '2010s', highlight: 'Fought world-class opposition in the 2014 semifinal tie against Japan as the second singles option behind Saina and Sindhu.', uberCups: '2014' },
        { name: 'Ashmita Chaliha', initials: 'AC', role: 'Singles', era: '2020s', highlight: 'Led the new-generation singles unit at Chengdu 2024, taking the court against Japan in the quarter-final.', uberCups: '2024' },
        { name: 'Isharani Baruah', initials: 'IB', role: 'Singles', era: '2020s', highlight: 'Part of the 2024 quarter-final squad that kept India competitive against eventual heavyweights.', uberCups: '2024' },
        { name: 'Priya Konjengbam & Shruti Mishra', initials: 'PK', role: 'Doubles pair', era: '2020s', highlight: 'Young pairing entrusted with the crucial doubles rubber at the 2024 Uber Cup in Chengdu.', uberCups: '2024' }
    ],
    milestones: [
        { year: 1950, title: 'The idea is born', text: "England's Betty Uber, supported by New Zealand's Nancy Fleming, proposes a world team championship for women's badminton." },
        { year: 1956, title: 'Trophy presented', text: 'Betty Uber donates and designs the trophy - crafted by Mappin & Webb of London - featuring a female player atop a shuttlecock on a rotating globe.' },
        { year: 1957, title: 'First edition - India shines on debut', text: 'USA wins the inaugural Uber Cup at Lytham St Annes, England. India reaches the semi-finals in its very first appearance.' },
        { year: 1984, title: 'Modern format', text: 'Schedule merges with the Thomas Cup and ties move to three singles and two doubles, contested every two years.' },
        { year: 2014, title: "India hosts - history made", text: 'New Delhi stages the finals for the first time. India beats Indonesia to reach a maiden semi-final and claims its first-ever Uber Cup medal - bronze.' },
        { year: 2016, title: 'Back-to-back semis', text: 'India repeats a last-four finish at Kunshan, China, underlining the 2014 breakthrough was no fluke.' },
        { year: 2024, title: 'Next generation steps up', text: 'A young Indian squad reaches the quarter-finals in Chengdu against a field where China reclaim their 16th title.' },
        { year: 2026, title: 'Present day', text: 'South Korea lift their third Uber Cup in Horsens, Denmark. India continues building toward its first final.' }
    ]
};
