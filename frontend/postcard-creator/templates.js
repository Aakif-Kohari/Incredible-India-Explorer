/* ==========================================================================
   Postcard Templates & Monument Data
   Contains configuration for backgrounds, drawing instructions, and presets.
   ========================================================================== */

/**
 * Monument configurations.
 * Since external images can cause CORS tainting on canvas.toDataURL(),
 * we use programmatic Canvas drawing instructions for guaranteed export reliability.
 * @type {Array<Object>}
 */
const monumentsData = [
    {
        id: 'taj-mahal',
        name: 'Taj Mahal',
        location: 'Agra',
        gradient: ['#FFDAB9', '#E9967A', '#CD5C5C'],
        draw: function (ctx, w, h) {
            // Sky gradient
            const grad = ctx.createLinearGradient(0, 0, 0, h);
            grad.addColorStop(0, '#FFDAB9');
            grad.addColorStop(0.6, '#E9967A');
            grad.addColorStop(1, '#8B4513');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);

            // Silhouette of Taj Mahal
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.beginPath();
            ctx.moveTo(w * 0.3, h * 0.7); ctx.lineTo(w * 0.7, h * 0.7);
            ctx.lineTo(w * 0.7, h * 0.5); ctx.lineTo(w * 0.6, h * 0.5);
            ctx.lineTo(w * 0.6, h * 0.4); ctx.lineTo(w * 0.4, h * 0.4);
            ctx.lineTo(w * 0.4, h * 0.5); ctx.lineTo(w * 0.3, h * 0.5);
            ctx.closePath(); ctx.fill();

            // Main Dome
            ctx.beginPath();
            ctx.arc(w * 0.5, h * 0.4, w * 0.1, Math.PI, 0);
            ctx.fill();

            // Minarets
            ctx.fillRect(w * 0.2, h * 0.4, w * 0.03, h * 0.3);
            ctx.fillRect(w * 0.77, h * 0.4, w * 0.03, h * 0.3);
        }
    },
    {
        id: 'gateway-india',
        name: 'Gateway of India',
        location: 'Mumbai',
        gradient: ['#87CEEB', '#4682B4', '#2F4F4F'],
        draw: function (ctx, w, h) {
            const grad = ctx.createLinearGradient(0, 0, 0, h);
            grad.addColorStop(0, '#87CEEB');
            grad.addColorStop(0.7, '#4682B4');
            grad.addColorStop(1, '#1A365D');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = '#D2B48C';
            // Main Arch
            ctx.fillRect(w * 0.35, h * 0.4, w * 0.3, h * 0.4);
            ctx.fillStyle = '#1A365D';
            ctx.beginPath();
            ctx.arc(w * 0.5, h * 0.6, w * 0.08, Math.PI, 0);
            ctx.fillRect(w * 0.42, h * 0.6, w * 0.16, h * 0.2);
            ctx.fill();

            // Dome
            ctx.fillStyle = '#D2B48C';
            ctx.beginPath();
            ctx.arc(w * 0.5, h * 0.4, w * 0.12, Math.PI, 0);
            ctx.fill();
        }
    },
    {
        id: 'hawa-mahal',
        name: 'Hawa Mahal',
        location: 'Jaipur',
        gradient: ['#FFB6C1', '#FF69B4', '#C71585'],
        draw: function (ctx, w, h) {
            const grad = ctx.createLinearGradient(0, 0, 0, h);
            grad.addColorStop(0, '#FFB6C1');
            grad.addColorStop(1, '#C71585');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = '#D45D79';
            // Pyramidal structure
            ctx.beginPath();
            ctx.moveTo(w * 0.2, h * 0.8); ctx.lineTo(w * 0.8, h * 0.8);
            ctx.lineTo(w * 0.65, h * 0.3); ctx.lineTo(w * 0.35, h * 0.3);
            ctx.closePath(); ctx.fill();

            // Windows (Jharokhas)
            ctx.fillStyle = '#FFB6C1';
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 3 + i; j++) {
                    ctx.fillRect(w * (0.3 + i * 0.05) + j * w * 0.04, h * (0.4 + i * 0.1), w * 0.02, h * 0.05);
                }
            }
        }
    },
    {
        id: 'india-gate',
        name: 'India Gate',
        location: 'New Delhi',
        gradient: ['#FFD700', '#FF8C00', '#8B0000'],
        draw: function (ctx, w, h) {
            const grad = ctx.createLinearGradient(0, 0, 0, h);
            grad.addColorStop(0, '#FFD700');
            grad.addColorStop(0.5, '#FF8C00');
            grad.addColorStop(1, '#8B0000');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = '#8B0000';
            // Archway
            ctx.fillRect(w * 0.3, h * 0.3, w * 0.4, h * 0.6);
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(w * 0.5, h * 0.6, w * 0.1, Math.PI, 0);
            ctx.fillRect(w * 0.4, h * 0.6, w * 0.2, h * 0.3);
            ctx.fill();
        }
    },
    {
        id: 'charminar',
        name: 'Charminar',
        location: 'Hyderabad',
        gradient: ['#DEB887', '#D2691E', '#8B4513'],
        draw: function (ctx, w, h) {
            const grad = ctx.createLinearGradient(0, 0, 0, h);
            grad.addColorStop(0, '#DEB887');
            grad.addColorStop(1, '#8B4513');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = '#F5DEB3';
            ctx.fillRect(w * 0.3, h * 0.5, w * 0.4, h * 0.4);
            // 4 Minarets
            ctx.fillRect(w * 0.25, h * 0.3, w * 0.05, h * 0.6);
            ctx.fillRect(w * 0.7, h * 0.3, w * 0.05, h * 0.6);
            // Domes
            ctx.beginPath(); ctx.arc(w * 0.275, h * 0.3, w * 0.03, Math.PI, 0); ctx.fill();
            ctx.beginPath(); ctx.arc(w * 0.725, h * 0.3, w * 0.03, Math.PI, 0); ctx.fill();
        }
    },
    {
        id: 'konark',
        name: 'Konark Sun Temple',
        location: 'Odisha',
        gradient: ['#F4A460', '#CD853F', '#8B4513'],
        draw: function (ctx, w, h) {
            const grad = ctx.createLinearGradient(0, 0, 0, h);
            grad.addColorStop(0, '#F4A460');
            grad.addColorStop(1, '#8B4513');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);

            // Giant Wheel
            ctx.strokeStyle = '#5C3A21';
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.arc(w * 0.5, h * 0.5, w * 0.25, 0, Math.PI * 2);
            ctx.stroke();
            // Spokes
            for (let i = 0; i < 12; i++) {
                ctx.beginPath();
                ctx.moveTo(w * 0.5, h * 0.5);
                ctx.lineTo(w * 0.5 + Math.cos(i * Math.PI / 6) * w * 0.25, h * 0.5 + Math.sin(i * Math.PI / 6) * w * 0.25);
                ctx.stroke();
            }
        }
    }
];

/**
 * Quick preset configurations.
 * @type {Object}
 */
const presetsData = {
    royal: { monument: 'hawa-mahal', font: "'Playfair Display', serif", color: '#5B2C1A', deco: 'border' },
    mughal: { monument: 'taj-mahal', font: "'Playfair Display', serif", color: '#1A365D', deco: 'mandala' },
    coastal: { monument: 'gateway-india', font: "'Caveat', cursive", color: '#FFFFFF', deco: 'stamp' }
};
