const Components = {

    buildPandals: (container, data) => {
        data.forEach(p => {
            const card = Utils.createElement('div', 'pandal-card animate-on-scroll');
            const img = Utils.createElement('div', 'pandal-img');
            img.style.backgroundImage = `url(${p.img})`;
            const content = Utils.createElement('div', 'pandal-content');
            content.appendChild(Utils.createElement('h3', '', p.name));
            content.appendChild(Utils.createElement('p', '', `Theme: ${p.theme}`));
            content.appendChild(Utils.createElement('p', '', p.desc));
            card.appendChild(img); card.appendChild(content);
            container.appendChild(card);
        });
    },

    buildMap: (container, data) => {
        data.forEach(r => {
            const pin = Utils.createElement('div', 'map-pin');
            pin.style.top = r.top; pin.style.left = r.left;
            pin.title = r.name;
            container.appendChild(pin);
        });
    },

    buildTimeline: (container, data) => {
        data.forEach(t => {
            const node = Utils.createElement('div', 'timeline-node animate-on-scroll');
            node.appendChild(Utils.createElement('h3', '', t.day));
            node.appendChild(Utils.createElement('p', '', t.desc));
            container.appendChild(node);
        });
    },

    buildFood: (container, data) => {
        data.forEach(f => {
            const card = Utils.createElement('div', 'food-card animate-on-scroll');
            card.appendChild(Utils.createElement('h3', '', f.name));
            card.appendChild(Utils.createElement('p', '', f.desc));
            container.appendChild(card);
        });
    }

};
