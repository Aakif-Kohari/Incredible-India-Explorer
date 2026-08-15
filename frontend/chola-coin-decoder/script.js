// Chola Coin Decoder Logic

const symbolData = {
    'symbol-tiger': {
        name: 'The Chola Tiger',
        desc: 'The royal crest of the Chola Empire. The seated or standing tiger represents the Chola dynasty\'s supremacy. Rajaraja I famously popularized this on his coins.',
        context: 'Found widely on copper and gold Kahavanus.'
    },
    'symbol-fish': {
        name: 'The Pandya Fish',
        desc: 'Two fishes were the dynastic emblem of the Pandyas. The Chola coins often depicted the Chola tiger flanked by the Pandya fish and Chera bow, symbolising the Cholas\' victory over them.',
        context: 'A powerful political statement of hegemony over South India.'
    },
    'symbol-bow': {
        name: 'The Chera Bow',
        desc: 'The bow was the emblem of the Chera dynasty. Placing it behind the tiger signified the subjugation of the Cheras by the Chola emperors.',
        context: 'Highlights the geopolitical landscape of the 10th-11th centuries.'
    },
    'symbol-umbrella': {
        name: 'Royal Umbrella (Chattra)',
        desc: 'The royal umbrella and flywhisk (chamara) above the tiger symbolize imperial sovereignty and divine right to rule.',
        context: 'Commonly seen on coins of Rajendra Chola I after his naval conquests.'
    }
};

const rulers = [
    { name: 'Aditya Chola I (871-907 CE)', desc: 'Early silver and gold coins.' },
    { name: 'Rajaraja Chola I (985-1014 CE)', desc: 'Introduced the iconic "Ceylon Man" type coin in copper and gold, which became a numismatic standard.' },
    { name: 'Rajendra Chola I (1014-1044 CE)', desc: 'Issued coins with the legend "Gangaikonda Chola" celebrating his expedition to the Ganges.' },
    { name: 'Kulottunga Chola I (1070-1122 CE)', desc: 'Coins featured complex imperial titles blending Eastern Chalukyan and Chola traditions.' }
];

document.addEventListener('DOMContentLoaded', () => {
    initDecoder();
    initTimeline();
});

function initDecoder() {
    const symbols = document.querySelectorAll('.coin-symbol');
    const panelTitle = document.querySelector('#decoder-panel h3');
    const panelDesc = document.querySelector('#decoder-desc');

    symbols.forEach(sym => {
        sym.addEventListener('click', () => {
            symbols.forEach(s => s.classList.remove('active'));
            sym.classList.add('active');
            
            const data = symbolData[sym.id];
            if (data) {
                panelTitle.textContent = data.name;
                panelDesc.innerHTML = `<strong>Context:</strong> ${data.desc}<br><br><strong>Note:</strong> ${data.context}`;
            }
        });
    });
}

function initTimeline() {
    const timeline = document.getElementById('ruler-timeline');
    if (!timeline) return;
    
    rulers.forEach(ruler => {
        const div = document.createElement('div');
        div.className = 'timeline-event';
        div.innerHTML = `<h3>${ruler.name}</h3><p>${ruler.desc}</p>`;
        timeline.appendChild(div);
    });
}
