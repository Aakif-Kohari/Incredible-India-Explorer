/**
 * Enterprise Ecotourism & Himalayan Trekking Engine
 * Forestry Department Permit Telemetry, Alpine Altitude Calculation, and Carbon-Neutral Offset Engine
 */

class EcotourismTrekkingEngine {
    constructor(config = {}) {
        this.selectedGrade = config.selectedGrade || 'all';
        this.includeCarbonOffset = config.includeCarbonOffset !== undefined ? config.includeCarbonOffset : true;
        this.defaultTrekkers = config.defaultTrekkers || 2;

        this.trekkingRegistry = [];
        this.initDefaultRegistry();
    }

    initDefaultRegistry() {
        this.trekkingRegistry = [
            {
                trekCode: 'TREK-501',
                name: 'Kedarkantha Summit Trek',
                region: 'Uttarakhand',
                altitude: 12500,
                difficulty: 'Easy-Moderate',
                permitStatus: 'Forest Permit Active',
                rating: 4.9,
                traversedBy: '8,400 / yr'
            },
            {
                trekCode: 'TREK-502',
                name: 'Valley of Flowers & Hemkund',
                region: 'Uttarakhand',
                altitude: 14100,
                difficulty: 'Moderate High-Altitude',
                permitStatus: 'Forest Permit Active',
                rating: 4.9,
                traversedBy: '6,200 / yr'
            },
            {
                trekCode: 'TREK-503',
                name: 'Hampta Pass & Chandratal',
                region: 'Himachal Pradesh',
                altitude: 14065,
                difficulty: 'Moderate High-Altitude',
                permitStatus: 'Forest Permit Active',
                rating: 4.8,
                traversedBy: '5,900 / yr'
            },
            {
                trekCode: 'TREK-504',
                name: 'Chembra Peak Canopy Walk',
                region: 'Wayanad, Kerala',
                altitude: 6900,
                difficulty: 'Western Ghats Ecotour',
                permitStatus: 'Eco-Guide Verified',
                rating: 4.8,
                traversedBy: '4,100 / yr'
            },
            {
                trekCode: 'TREK-505',
                name: 'Sandakphu Kanchenjunga View',
                region: 'West Bengal / Sikkim',
                altitude: 11930,
                difficulty: 'Moderate High-Altitude',
                permitStatus: 'Singalila Permit Active',
                rating: 4.9,
                traversedBy: '4,800 / yr'
            }
        ];
    }

    calculateEcoPermitReservation(trailName, trekkerCount, includeOffset) {
        const basePermitFee = 650; // INR forest permit rate per trekker
        const carbonOffsetFee = includeOffset ? 300 : 0;
        const totalAmount = (basePermitFee * trekkerCount) + carbonOffsetFee;
        const permitId = 'PERMIT-' + Math.floor(100000 + Math.random() * 900000);

        return {
            permitId,
            trailName,
            trekkerCount,
            includeOffset,
            totalAmount: `₹${totalAmount}`,
            status: 'PERMIT_ISSUED'
        };
    }

    updateConfig(newConfig) {
        if (newConfig.selectedGrade) {
            this.selectedGrade = newConfig.selectedGrade;
        }
        if (newConfig.includeCarbonOffset !== undefined) {
            this.includeCarbonOffset = newConfig.includeCarbonOffset;
        }
        if (newConfig.defaultTrekkers !== undefined) {
            this.defaultTrekkers = parseInt(newConfig.defaultTrekkers, 10);
        }
    }

    getRegistryFiltered(query = '', gradeFilter = 'all') {
        return this.trekkingRegistry.filter(item => {
            const matchesQuery = !query || 
                item.trekCode.toLowerCase().includes(query.toLowerCase()) ||
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.region.toLowerCase().includes(query.toLowerCase()) ||
                item.difficulty.toLowerCase().includes(query.toLowerCase());

            const matchesGrade = gradeFilter === 'all' || 
                item.difficulty.toLowerCase().replace(/\s+/g, '-').includes(gradeFilter.toLowerCase());

            return matchesQuery && matchesGrade;
        });
    }
}

// UI Controller Binding
document.addEventListener('DOMContentLoaded', () => {
    const engine = new EcotourismTrekkingEngine();

    const searchInput = document.getElementById('trek-search-input');
    const gradeSelect = document.getElementById('trek-grade-select');
    const trekkerRange = document.getElementById('range-trekker-count');
    const trekkerLabel = document.getElementById('lbl-trekkers');
    const tableBody = document.getElementById('treks-table-body');
    const btnSync = document.getElementById('btn-sync-treks');
    const btnConfirmPermit = document.getElementById('btn-confirm-eco-permit');
    const trekBookingSelect = document.getElementById('select-trek-booking');
    const chkOffset = document.getElementById('chk-carbon-offset');

    function renderTable(data) {
        if (!tableBody) return;
        tableBody.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${item.trekCode}</strong></td>
                <td><strong>${item.name}</strong></td>
                <td>${item.region}</td>
                <td>${item.altitude.toLocaleString()} ft</td>
                <td>${item.difficulty}</td>
                <td><span class="badge badge-success">${item.permitStatus}</span></td>
                <td>★ ${item.rating} (${item.traversedBy})</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="alert('Viewing GPS Altitude Profile & Eco-Guide Details for ${item.name}')">Trail GPS</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    if (trekkerRange && trekkerLabel) {
        trekkerRange.addEventListener('input', (e) => {
            const t = e.target.value;
            trekkerLabel.textContent = `${t} Trekker${t > 1 ? 's' : ''}`;
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const q = searchInput.value;
            const gr = gradeSelect ? gradeSelect.value : 'all';
            renderTable(engine.getRegistryFiltered(q, gr));
        });
    }

    if (gradeSelect) {
        gradeSelect.addEventListener('change', () => {
            const q = searchInput ? searchInput.value : '';
            renderTable(engine.getRegistryFiltered(q, gradeSelect.value));
        });
    }

    if (btnConfirmPermit) {
        btnConfirmPermit.addEventListener('click', () => {
            const trailName = trekBookingSelect ? trekBookingSelect.options[trekBookingSelect.selectedIndex].text : 'Kedarkantha Trek';
            const count = trekkerRange ? parseInt(trekkerRange.value, 10) : 2;
            const offset = chkOffset ? chkOffset.checked : true;

            const res = engine.calculateEcoPermitReservation(trailName, count, offset);
            alert(`Eco-Permit Issued!\nPermit ID: ${res.permitId}\nTrail: ${res.trailName}\nTrekkers: ${res.trekkerCount}\nTotal Fee: ${res.totalAmount}`);
        });
    }

    if (btnSync) {
        btnSync.addEventListener('click', () => {
            renderTable(engine.getRegistryFiltered(searchInput ? searchInput.value : '', gradeSelect ? gradeSelect.value : 'all'));
            alert('Forest Department Eco-Permit Telemetry Synchronized.');
        });
    }

    renderTable(engine.getRegistryFiltered());
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EcotourismTrekkingEngine };
}
