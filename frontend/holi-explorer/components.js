const Components = {

    buildMap: (container, data, onSelect) => {
        data.forEach(region => {
            const pin = Utils.createElement('button', 'map-pin');
            pin.style.top = region.top; pin.style.left = region.left;
            pin.setAttribute('aria-label', `View ${region.name}`);
            pin.addEventListener('click', () => {
                container.querySelectorAll('.map-pin').forEach(p => p.classList.remove('active'));
                pin.classList.add('active');
                onSelect(region);
            });
            container.appendChild(pin);
        });
    },

    buildTimeline: (container, data) => {
        data.forEach(item => {
            const node = Utils.createElement('div', 'timeline-node animate-on-scroll');
            node.appendChild(Utils.createElement('h3', '', item.day));
            node.appendChild(Utils.createElement('p', '', item.desc));
            container.appendChild(node);
        });
    },

    buildFoodGrid: (container, data) => {
        data.forEach(food => {
            const card = Utils.createElement('div', 'food-card animate-on-scroll');
            card.appendChild(Utils.createElement('h3', '', food.name));
            card.appendChild(Utils.createElement('p', '', food.desc));
            container.appendChild(card);
        });
    },

    buildGallery: (container, data, onImageClick) => {
        data.forEach(img => {
            const item = Utils.createElement('div', 'gallery-item');
            const image = Utils.createElement('img');
            image.src = img.src; image.alt = img.alt; image.loading = 'lazy';
            item.appendChild(image);
            item.addEventListener('click', () => onImageClick(img));
            container.appendChild(item);
        });
    }

};
