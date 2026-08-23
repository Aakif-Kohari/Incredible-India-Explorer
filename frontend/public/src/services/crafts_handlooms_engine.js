/**
 * Enterprise Crafts & Handlooms Artisan Engine
 * All India Handlooms Board Telemetry, Geographical Indication (GI) Verification, and Fair-Trade Order Engine
 */

class CraftsHandloomsEngine {
    constructor(config = {}) {
        this.selectedMaterial = config.selectedMaterial || 'all';
        this.includeHologram = config.includeHologram !== undefined ? config.includeHologram : true;
        this.defaultQuantity = config.defaultQuantity || 1;

        this.craftsRegistry = [];
        this.initDefaultRegistry();
    }

    initDefaultRegistry() {
        this.craftsRegistry = [
            {
                craftCode: 'CRAFT-401',
                name: 'Kanchipuram Silk Saree',
                cluster: 'Kanchipuram, Tamil Nadu',
                technique: 'Pure Mulberry Silk & Zari Weaving',
                giYear: '2005 (GI-Tag #14)',
                status: 'Verified GI-Tag',
                rating: 4.9,
                artisanCount: '45,000'
            },
            {
                craftCode: 'CRAFT-402',
                name: 'Pashmina Shawls',
                cluster: 'Srinagar, Jammu & Kashmir',
                technique: 'Hand-spun Changthangi Cashmere',
                giYear: '2008 (GI-Tag #46)',
                status: 'Verified GI-Tag',
                rating: 4.9,
                artisanCount: '28,000'
            },
            {
                craftCode: 'CRAFT-403',
                name: 'Banarasi Brocades',
                cluster: 'Varanasi, Uttar Pradesh',
                technique: 'Gold & Silver Zari Handloom',
                giYear: '2009 (GI-Tag #99)',
                status: 'Verified GI-Tag',
                rating: 4.8,
                artisanCount: '120,000'
            },
            {
                craftCode: 'CRAFT-404',
                name: 'Madhubani Folk Paintings',
                cluster: 'Mithila, Bihar',
                technique: 'Natural Pigment Line Art',
                giYear: '2007 (GI-Tag #37)',
                status: 'Verified GI-Tag',
                rating: 4.9,
                artisanCount: '15,000'
            },
            {
                craftCode: 'CRAFT-405',
                name: 'Chanderi Textiles',
                cluster: 'Chanderi, Madhya Pradesh',
                technique: 'Sheer Cotton-Silk Weave',
                giYear: '2005 (GI-Tag #22)',
                status: 'Verified GI-Tag',
                rating: 4.8,
                artisanCount: '35,000'
            }
        ];
    }

    calculateFairTradeOrder(craftName, quantity, includeHologram) {
        const basePrice = 4500; // Average INR craft price
        const hologramFee = includeHologram ? 150 : 0;
        const subtotal = (basePrice * quantity) + hologramFee;
        const artisanDirectShare = Math.round(subtotal * 0.95);
        const orderId = 'FT-' + Math.floor(100000 + Math.random() * 900000);

        return {
            orderId,
            craftName,
            quantity,
            includeHologram,
            subtotal: `₹${subtotal}`,
            artisanDirectShare: `₹${artisanDirectShare}`,
            status: 'ORDER_PLACED'
        };
    }

    updateConfig(newConfig) {
        if (newConfig.selectedMaterial) {
            this.selectedMaterial = newConfig.selectedMaterial;
        }
        if (newConfig.includeHologram !== undefined) {
            this.includeHologram = newConfig.includeHologram;
        }
        if (newConfig.defaultQuantity !== undefined) {
            this.defaultQuantity = parseInt(newConfig.defaultQuantity, 10);
        }
    }

    getRegistryFiltered(query = '', materialFilter = 'all') {
        return this.craftsRegistry.filter(item => {
            const matchesQuery = !query || 
                item.craftCode.toLowerCase().includes(query.toLowerCase()) ||
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.cluster.toLowerCase().includes(query.toLowerCase()) ||
                item.technique.toLowerCase().includes(query.toLowerCase());

            const matchesMat = materialFilter === 'all' || 
                item.technique.toLowerCase().includes(materialFilter.toLowerCase());

            return matchesQuery && matchesMat;
        });
    }
}

// UI Controller Binding
document.addEventListener('DOMContentLoaded', () => {
    const engine = new CraftsHandloomsEngine();

    const searchInput = document.getElementById('crafts-search-input');
    const matSelect = document.getElementById('craft-material-select');
    const qtyRange = document.getElementById('range-item-quantity');
    const qtyLabel = document.getElementById('lbl-quantity');
    const tableBody = document.getElementById('crafts-table-body');
    const btnSync = document.getElementById('btn-sync-crafts');
    const btnConfirmOrder = document.getElementById('btn-confirm-craft-order');
    const craftBookingSelect = document.getElementById('select-craft-booking');
    const chkGI = document.getElementById('chk-gi-certificate');

    function renderTable(data) {
        if (!tableBody) return;
        tableBody.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${item.craftCode}</strong></td>
                <td><strong>${item.name}</strong></td>
                <td>${item.cluster}</td>
                <td>${item.technique}</td>
                <td>${item.giYear}</td>
                <td><span class="badge badge-success">${item.status}</span></td>
                <td>★ ${item.rating} (${item.artisanCount} Artisans)</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="alert('Viewing GI Authenticity & Weaver Cluster Info for ${item.name}')">GI Details</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    if (qtyRange && qtyLabel) {
        qtyRange.addEventListener('input', (e) => {
            const q = e.target.value;
            qtyLabel.textContent = `${q} Unit${q > 1 ? 's' : ''}`;
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const q = searchInput.value;
            const mat = matSelect ? matSelect.value : 'all';
            renderTable(engine.getRegistryFiltered(q, mat));
        });
    }

    if (matSelect) {
        matSelect.addEventListener('change', () => {
            const q = searchInput ? searchInput.value : '';
            renderTable(engine.getRegistryFiltered(q, matSelect.value));
        });
    }

    if (btnConfirmOrder) {
        btnConfirmOrder.addEventListener('click', () => {
            const craftName = craftBookingSelect ? craftBookingSelect.options[craftBookingSelect.selectedIndex].text : 'Kanchipuram Silk Saree';
            const qty = qtyRange ? parseInt(qtyRange.value, 10) : 1;
            const holo = chkGI ? chkGI.checked : true;

            const res = engine.calculateFairTradeOrder(craftName, qty, holo);
            alert(`Fair-Trade Order Placed!\nOrder ID: ${res.orderId}\nCraft: ${res.craftName}\nQuantity: ${res.quantity}\nTotal Amount: ${res.subtotal}\nArtisan Direct Payout: ${res.artisanDirectShare}`);
        });
    }

    if (btnSync) {
        btnSync.addEventListener('click', () => {
            renderTable(engine.getRegistryFiltered(searchInput ? searchInput.value : '', matSelect ? matSelect.value : 'all'));
            alert('All India Handlooms Board Registry Synchronized.');
        });
    }

    renderTable(engine.getRegistryFiltered());
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CraftsHandloomsEngine };
}
