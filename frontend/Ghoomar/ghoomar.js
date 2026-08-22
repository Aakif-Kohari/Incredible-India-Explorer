(() => {
    const items = {
        dance: [
            'MOVEMENT',
            'Dance',
            'Dancers form circles and move through measured steps, turns and coordinated gestures. The repeated circular motion gives Ghoomar its flowing visual identity.',
            ['Circular formations', 'Graceful turns', 'Rhythmic claps and steps']
        ],
        costume: [
            'COSTUME',
            'Costume',
            'The ghagra, choli and odhani create the familiar silhouette of Ghoomar. Fabrics, colours, embroidery and jewellery can differ across communities and occasions.',
            ['Ghagra with a broad flare', 'Odhani/veil and choli', 'Jewellery and regional ornamentation']
        ],
        music: [
            'MUSIC',
            'Music',
            'Folk songs and percussion provide the rhythmic framework for movement. Musical accompaniment can vary according to the performers, locality and occasion.',
            ['Folk singing', 'Percussion-led rhythm', 'Songs adapted to celebration']
        ],
        occasions: [
            'OCCASIONS',
            'Occasions',
            'Ghoomar is associated with celebratory community settings, including weddings and festivals. The exact context varies between communities and performers.',
            ['Weddings', 'Festivals', 'Community celebrations']
        ],
        regions: [
            'REGIONAL CONTEXT',
            'Regional context',
            'Rajasthan contains many local communities and performance traditions. Ghoomar should therefore be understood as a living tradition with variation rather than a single fixed choreography.',
            ['Rajasthan', 'Local community variation', 'Living performance tradition']
        ]
    };
    function select(k) {
        const d = items[k];
        if (!d) return;
        document.querySelectorAll('.explore-card').forEach(b => b.classList.toggle('active', b.dataset.item === k));
        document.getElementById('detail-kicker').textContent = d[0];
        document.getElementById('detail-title').textContent = d[1];
        document.getElementById('detail-text').textContent = d[2];
        document.getElementById('detail-list').innerHTML = d[3].map(x => `<li>${x}</li>`).join('');
    }
    document.querySelectorAll('.explore-card').forEach(b => b.addEventListener('click', () => select(b.dataset.item)));
    select('dance');
})();
