import React, { useState } from 'react';
import { Trees, Search, Ticket } from 'lucide-react';
import { MOCK_SANCTUARIES, filterSanctuariesBySpecies } from '../../services/wildlifeSanctuaryEngine';
import { SanctuaryParkCardTile } from './SanctuaryParkCardTile';

export const WildlifeSanctuariesExplorerHub = () => {
    const [parks] = useState(MOCK_SANCTUARIES);
    const [speciesFilter, setSpeciesFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [bookedSafariIds, setBookedSafariIds] = useState([]);

    const filtered = filterSanctuariesBySpecies(parks, speciesFilter).filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleToggleSafari = (id) => {
        setBookedSafariIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 text-slate-100 font-sans p-4">
            {/* Header Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                            <Trees className="w-4 h-4" /> Wild India Ecotourism
                        </div>
                        <h1 className="text-2xl font-black text-slate-100 mt-1">National Parks & Wildlife Sanctuaries</h1>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                        <Ticket className="w-5 h-5 text-emerald-400" />
                        <div>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">Jeep Safaris Booked</span>
                            <span className="text-lg font-black text-emerald-400 font-mono">{bookedSafariIds.length} Reservations</span>
                        </div>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search national park or state (e.g. Corbett, Gujarat)..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                        />
                    </div>

                    <div className="flex gap-2">
                        {['All', 'Bengal Tiger', 'Asiatic Lion'].map(sp => (
                            <button
                                key={sp}
                                type="button"
                                onClick={() => setSpeciesFilter(sp)}
                                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                                    speciesFilter === sp
                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                {sp}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sanctuaries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filtered.map(park => (
                    <SanctuaryParkCardTile
                        key={park.id}
                        park={park}
                        isBooked={bookedSafariIds.includes(park.id)}
                        onBookSafari={handleToggleSafari}
                    />
                ))}
            </div>
        </div>
    );
};

export default WildlifeSanctuariesExplorerHub;
