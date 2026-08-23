/**
 * Enterprise UNESCO Heritage Monuments Engine
 * Archaeological Survey of India (ASI) Telemetry, Architectural Era Filtering, and Virtual Pass Ticketing Engine
 */

class HeritageMonumentsEngine {
    constructor(config = {}) {
        this.selectedEra = config.selectedEra || 'all';
        this.audioGuideEnabled = config.audioGuideEnabled !== undefined ? config.audioGuideEnabled : true;
        this.defaultVisitors = config.defaultVisitors || 2;

        this.heritageSites = [];
        this.initDefaultSites();
    }

    initDefaultSites() {
        this.heritageSites = [
            {
                siteCode: 'UNESCO-101',
                name: 'Taj Mahal',
                location: 'Agra, Uttar Pradesh',
                era: 'Mughal & Indo-Islamic',
                century: '17th Century (1632 AD)',
                status: 'Protected (ASI)',
                rating: 4.9,
                footfall: '6.5M / yr'
            },
            {
                siteCode: 'UNESCO-102',
                name: 'Brihadisvara Temple',
                location: 'Thanjavur, Tamil Nadu',
                era: 'Dravidian Temple Style',
                century: '11th Century (1010 AD)',
                status: 'Protected (ASI)',
                rating: 4.9,
                footfall: '2.1M / yr'
            },
            {
                siteCode: 'UNESCO-103',
                name: 'Ajanta & Ellora Caves',
                location: 'Chhatrapati Sambhajinagar, Maharashtra',
                era: 'Ancient Rock-Cut Caves',
                century: '2nd Century BCE - 10th Century AD',
                status: 'Protected (ASI)',
                rating: 4.8,
                footfall: '1.9M / yr'
            },
            {
                siteCode: 'UNESCO-104',
                name: 'Sun Temple',
                location: 'Konark, Odisha',
                era: 'Kalinga / Nagara Style',
                century: '13th Century (1250 AD)',
                status: 'Protected (ASI)',
                rating: 4.8,
                footfall: '1.4M / yr'
            },
            {
                siteCode: 'UNESCO-105',
                name: 'Group of Monuments at Hampi',
                location: 'Vijayanagara, Karnataka',
                era: 'Vijayanagara Empire',
                century: '14th Century (1336 AD)',
                status: 'Protected (ASI)',
                rating: 4.9,
                footfall: '1.8M / yr'
            }
        ];
    }

    calculateVirtualBookingPass(siteName, visitorCount, includeAudio) {
        const baseRatePerVisitor = 250; // INR virtual pass rate
        const audioGuideFee = includeAudio ? 100 : 0;
        const totalAmount = (baseRatePerVisitor * visitorCount) + audioGuideFee;
        const bookingId = 'PASS-' + Math.floor(100000 + Math.random() * 900000);

        return {
            bookingId,
            siteName,
            visitorCount,
            includeAudio,
            totalAmount: `₹${totalAmount}`,
            status: 'CONFIRMED'
        };
    }

    updateConfig(newConfig) {
        if (newConfig.selectedEra) {
            this.selectedEra = newConfig.selectedEra;
        }
        if (newConfig.audioGuideEnabled !== undefined) {
            this.audioGuideEnabled = newConfig.audioGuideEnabled;
        }
        if (newConfig.defaultVisitors !== undefined) {
            this.defaultVisitors = parseInt(newConfig.defaultVisitors, 10);
        }
    }

    getSitesFiltered(query = '', eraFilter = 'all') {
        return this.heritageSites.filter(site => {
            const matchesQuery = !query || 
                site.siteCode.toLowerCase().includes(query.toLowerCase()) ||
                site.name.toLowerCase().includes(query.toLowerCase()) ||
                site.location.toLowerCase().includes(query.toLowerCase()) ||
                site.era.toLowerCase().includes(query.toLowerCase());

            const matchesEra = eraFilter === 'all' || 
                site.era.toLowerCase().includes(eraFilter.toLowerCase());

            return matchesQuery && matchesEra;
        });
    }
}

// UI Controller Binding
document.addEventListener('DOMContentLoaded', () => {
    const engine = new HeritageMonumentsEngine();

    const searchInput = document.getElementById('heritage-search-input');
    const eraSelect = document.getElementById('architecture-era-select');
    const visitorRange = document.getElementById('range-visitor-count');
    const visitorLabel = document.getElementById('lbl-visitors');
    const tableBody = document.getElementById('heritage-table-body');
    const btnSync = document.getElementById('btn-sync-heritage');
    const btnConfirmPass = document.getElementById('btn-confirm-pass');
    const monumentBookingSelect = document.getElementById('select-monument-booking');
    const chkAudioGuide = document.getElementById('chk-audio-guide');

    function renderTable(data) {
        if (!tableBody) return;
        tableBody.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${item.siteCode}</strong></td>
                <td><strong>${item.name}</strong></td>
                <td>${item.location}</td>
                <td>${item.era}</td>
                <td>${item.century}</td>
                <td><span class="badge badge-success">${item.status}</span></td>
                <td>★ ${item.rating} (${item.footfall})</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="alert('Launching 3D Virtual Expedition for ${item.name}')">3D Tour</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    if (visitorRange && visitorLabel) {
        visitorRange.addEventListener('input', (e) => {
            const count = e.target.value;
            visitorLabel.textContent = `${count} Visitor${count > 1 ? 's' : ''}`;
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const q = searchInput.value;
            const era = eraSelect ? eraSelect.value : 'all';
            renderTable(engine.getSitesFiltered(q, era));
        });
    }

    if (eraSelect) {
        eraSelect.addEventListener('change', () => {
            const q = searchInput ? searchInput.value : '';
            renderTable(engine.getSitesFiltered(q, eraSelect.value));
        });
    }

    if (btnConfirmPass) {
        btnConfirmPass.addEventListener('click', () => {
            const monument = monumentBookingSelect ? monumentBookingSelect.options[monumentBookingSelect.selectedIndex].text : 'Taj Mahal';
            const count = visitorRange ? parseInt(visitorRange.value, 10) : 2;
            const audio = chkAudioGuide ? chkAudioGuide.checked : true;

            const res = engine.calculateVirtualBookingPass(monument, count, audio);
            alert(`Virtual Pass Confirmed!\nBooking ID: ${res.bookingId}\nMonument: ${res.siteName}\nVisitors: ${res.visitorCount}\nTotal: ${res.totalAmount}`);
        });
    }

    if (btnSync) {
        btnSync.addEventListener('click', () => {
            renderTable(engine.getSitesFiltered(searchInput ? searchInput.value : '', eraSelect ? eraSelect.value : 'all'));
            alert('ASI World Heritage Telemetry Synchronized.');
        });
    }

    renderTable(engine.getSitesFiltered());
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HeritageMonumentsEngine };
}
