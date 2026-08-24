/**
 * Enterprise Folk & Classical Dance Music Engine
 * Sangeet Natak Akademi Telemetry, Raga/Tala Acoustic Matching, and Masterclass Reservation Engine
 */

class DanceMusicEngine {
    constructor(config = {}) {
        this.selectedCategory = config.selectedCategory || 'all';
        this.includeCertificate = config.includeCertificate !== undefined ? config.includeCertificate : true;
        this.defaultDuration = config.defaultDuration || 60;

        this.artsCatalog = [];
        this.initDefaultCatalog();
    }

    initDefaultCatalog() {
        this.artsCatalog = [
            {
                artId: 'ART-301',
                name: 'Bharatanatyam',
                region: 'Tamil Nadu',
                category: 'Classical Dance',
                rhythmInstrument: 'Mridangam / Solkattu',
                status: 'Sangeet Recognized',
                rating: 4.9,
                students: '14.2K'
            },
            {
                artId: 'ART-302',
                name: 'Kathak',
                region: 'Uttar Pradesh / North India',
                category: 'Classical Dance',
                rhythmInstrument: 'Tabla / Tatkar',
                status: 'Sangeet Recognized',
                rating: 4.9,
                students: '12.8K'
            },
            {
                artId: 'ART-303',
                name: 'Kathakali',
                region: 'Kerala',
                category: 'Classical Dance',
                rhythmInstrument: 'Chenda & Maddalam',
                status: 'Sangeet Recognized',
                rating: 4.8,
                students: '6.4K'
            },
            {
                artId: 'ART-304',
                name: 'Carnatic Veena & Raga Music',
                region: 'South India',
                category: 'Carnatic Music Systems',
                rhythmInstrument: 'Saraswati Veena',
                status: 'Master Streamed',
                rating: 4.9,
                students: '9.1K'
            },
            {
                artId: 'ART-305',
                name: 'Garba & Dandiya Raas',
                region: 'Gujarat',
                category: 'Regional Folk Dance',
                rhythmInstrument: 'Dhol & Shehnai',
                status: 'UNESCO Intangible Cultural Heritage',
                rating: 4.9,
                students: '18.5K'
            }
        ];
    }

    calculateMasterclassBooking(artName, durationMins, includeCertificate) {
        const ratePerMinute = 15; // INR rate per minute
        const certificateFee = includeCertificate ? 350 : 0;
        const totalCost = (ratePerMinute * durationMins) + certificateFee;
        const registrationId = 'REG-' + Math.floor(100000 + Math.random() * 900000);

        return {
            registrationId,
            artName,
            durationMins: `${durationMins} Mins`,
            includeCertificate,
            totalCost: `₹${totalCost}`,
            status: 'CONFIRMED'
        };
    }

    updateConfig(newConfig) {
        if (newConfig.selectedCategory) {
            this.selectedCategory = newConfig.selectedCategory;
        }
        if (newConfig.includeCertificate !== undefined) {
            this.includeCertificate = newConfig.includeCertificate;
        }
        if (newConfig.defaultDuration !== undefined) {
            this.defaultDuration = parseInt(newConfig.defaultDuration, 10);
        }
    }

    getCatalogFiltered(query = '', categoryFilter = 'all') {
        return this.artsCatalog.filter(item => {
            const matchesQuery = !query || 
                item.artId.toLowerCase().includes(query.toLowerCase()) ||
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.region.toLowerCase().includes(query.toLowerCase()) ||
                item.rhythmInstrument.toLowerCase().includes(query.toLowerCase());

            const matchesCat = categoryFilter === 'all' || 
                item.category.toLowerCase().replace(/\s+/g, '-').includes(categoryFilter.toLowerCase());

            return matchesQuery && matchesCat;
        });
    }
}

// UI Controller Binding
document.addEventListener('DOMContentLoaded', () => {
    const engine = new DanceMusicEngine();

    const searchInput = document.getElementById('arts-search-input');
    const catSelect = document.getElementById('art-category-select');
    const durationRange = document.getElementById('range-session-duration');
    const durationLabel = document.getElementById('lbl-duration');
    const tableBody = document.getElementById('arts-table-body');
    const btnSync = document.getElementById('btn-sync-arts');
    const btnConfirmMasterclass = document.getElementById('btn-confirm-masterclass');
    const artBookingSelect = document.getElementById('select-art-booking');
    const chkCert = document.getElementById('chk-certificate');

    function renderTable(data) {
        if (!tableBody) return;
        tableBody.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${item.artId}</strong></td>
                <td><strong>${item.name}</strong></td>
                <td>${item.region}</td>
                <td>${item.category}</td>
                <td>${item.rhythmInstrument}</td>
                <td><span class="badge badge-success">${item.status}</span></td>
                <td>★ ${item.rating} (${item.students})</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="alert('Launching Live Workshop Stream for ${item.name}')">Stream Art</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    if (durationRange && durationLabel) {
        durationRange.addEventListener('input', (e) => {
            durationLabel.textContent = `${e.target.value} Mins`;
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const q = searchInput.value;
            const cat = catSelect ? catSelect.value : 'all';
            renderTable(engine.getCatalogFiltered(q, cat));
        });
    }

    if (catSelect) {
        catSelect.addEventListener('change', () => {
            const q = searchInput ? searchInput.value : '';
            renderTable(engine.getCatalogFiltered(q, catSelect.value));
        });
    }

    if (btnConfirmMasterclass) {
        btnConfirmMasterclass.addEventListener('click', () => {
            const artName = artBookingSelect ? artBookingSelect.options[artBookingSelect.selectedIndex].text : 'Bharatanatyam';
            const duration = durationRange ? parseInt(durationRange.value, 10) : 60;
            const cert = chkCert ? chkCert.checked : true;

            const res = engine.calculateMasterclassBooking(artName, duration, cert);
            alert(`Masterclass Registered!\nRegistration ID: ${res.registrationId}\nArt Form: ${res.artName}\nDuration: ${res.durationMins}\nTotal Cost: ${res.totalCost}`);
        });
    }

    if (btnSync) {
        btnSync.addEventListener('click', () => {
            renderTable(engine.getCatalogFiltered(searchInput ? searchInput.value : '', catSelect ? catSelect.value : 'all'));
            alert('Sangeet Natak Akademi Performance Telemetry Synchronized.');
        });
    }

    renderTable(engine.getCatalogFiltered());
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DanceMusicEngine };
}
