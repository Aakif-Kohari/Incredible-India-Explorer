import React, { useState } from 'react';
import { ShoppingBag, Search, Tag, Sparkles } from 'lucide-react';
import { MOCK_HANDICRAFTS, calculateCraftCartTotal } from '../../services/handicraftEmporiumEngine';
import { HandicraftCraftCardTile } from './HandicraftCraftCardTile';

export const HandicraftsEmporiumShowcaseHub = () => {
    const [crafts] = useState(MOCK_HANDICRAFTS);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItemIds, setCartItemIds] = useState([]);

    const filtered = crafts.filter(c => {
        const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.state.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleToggleCart = (id) => {
        setCartItemIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const cartTotal = calculateCraftCartTotal(cartItemIds, crafts);

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 text-slate-100 font-sans p-4">
            {/* Header Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                            <Sparkles className="w-4 h-4" /> Indigenous Heritage Crafts
                        </div>
                        <h1 className="text-2xl font-black text-slate-100 mt-1">Traditional Indian Handicrafts & Artisan Emporium</h1>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                        <ShoppingBag className="w-5 h-5 text-amber-400" />
                        <div>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">Artisan Support Cart ({cartItemIds.length})</span>
                            <span className="text-lg font-black text-amber-400 font-mono">₹{cartTotal.toLocaleString()}</span>
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
                            placeholder="Search crafts or states (e.g. Pashmina, Kashmir, Jaipur)..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                        />
                    </div>

                    <div className="flex gap-2">
                        {['All', 'Silk & Textile', 'Pottery', 'Metalcraft'].map(cat => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all ${
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

            {/* Handicrafts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filtered.map(craft => (
                    <HandicraftCraftCardTile
                        key={craft.id}
                        craft={craft}
                        isInCart={cartItemIds.includes(craft.id)}
                        onToggleCart={handleToggleCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default HandicraftsEmporiumShowcaseHub;
