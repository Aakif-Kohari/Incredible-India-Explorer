import React, { useState } from 'react';
import { Compass, Search, Landmark, Wallet } from 'lucide-react';
import { MOCK_UNESCO_SITES, calculateItineraryTotalCost } from '../../services/unescoHeritageEngine';
import { UnescoSiteCardTile } from './UnescoSiteCardTile';

export const UnescoHeritageExplorerHub = () => {
    const [sites] = useState(MOCK_UNESCO_SITES);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [itinerarySiteIds, setItinerarySiteIds] = useState([]);

    const filteredSites = sites.filter(s => {
        const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.state.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleToggleItinerary = (siteId) => {
        setItinerarySiteIds(prev =>
            prev.includes(siteId) ? prev.filter(id => id !== siteId) : [...prev, siteId]
        );
    };

    const totalEstimatedCost = calculateItineraryTotalCost(itinerarySiteIds, sites);

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 text-slate-100 font-sans p-4">
            {/* Header Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                            <Landmark className="w-4 h-4" /> UNESCO World Heritage India
                        </div>
                        <h1 className="text-2xl font-black text-slate-100 mt-1">Cultural Monuments & Itinerary Planner</h1>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                        <Wallet className="w-5 h-5 text-emerald-400" />
                        <div>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">Itinerary Total ({itinerarySiteIds.length} Sites)</span>
                            <span className="text-lg font-black text-emerald-400 font-mono">₹{totalEstimatedCost.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Search & Category Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search heritage sites by name or state (e.g. Taj Mahal, Karnataka)..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                        />
                    </div>

                    <div className="flex gap-2">
                        {['All', 'Cultural', 'Natural'].map(cat => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                                    selectedCategory === cat
                                        ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Heritage Sites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredSites.map(site => (
                    <UnescoSiteCardTile
                        key={site.id}
                        site={site}
                        isSelected={itinerarySiteIds.includes(site.id)}
                        onToggleItinerary={handleToggleItinerary}
                    />
                ))}
            </div>
        </div>
    );
};

export default UnescoHeritageExplorerHub;
