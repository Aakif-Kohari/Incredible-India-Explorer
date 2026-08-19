import React, { useState } from 'react';
import { UtensilsCrossed, Search, Heart, Flame } from 'lucide-react';
import { MOCK_INDIAN_DISHES, filterDishesByDiet } from '../../services/indianCulinaryEngine';
import { RegionalDishCardTile } from './RegionalDishCardTile';

export const RegionalCuisineExplorerHub = () => {
    const [dishes] = useState(MOCK_INDIAN_DISHES);
    const [dietFilter, setDietFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [foodTrailIds, setFoodTrailIds] = useState([]);

    const filtered = filterDishesByDiet(dishes, dietFilter).filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleToggleTrail = (dishId) => {
        setFoodTrailIds(prev =>
            prev.includes(dishId) ? prev.filter(id => id !== dishId) : [...prev, dishId]
        );
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 text-slate-100 font-sans p-4">
            {/* Header Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                        <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                            <UtensilsCrossed className="w-4 h-4" /> Flavors of India
                        </div>
                        <h1 className="text-2xl font-black text-slate-100 mt-1">Regional Cuisine & Street Food Trails</h1>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                        <Heart className="w-5 h-5 text-rose-400" />
                        <div>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">Food Trail Bucketlist</span>
                            <span className="text-lg font-black text-rose-400 font-mono">{foodTrailIds.length} Dishes</span>
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
                            placeholder="Search dishes or states (e.g. Biryani, Punjab, Dosa)..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                        />
                    </div>

                    <div className="flex gap-2">
                        {['All', 'Veg', 'Non-Veg'].map(diet => (
                            <button
                                key={diet}
                                type="button"
                                onClick={() => setDietFilter(diet)}
                                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                                    dietFilter === diet
                                        ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/20'
                                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                {diet}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dishes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filtered.map(dish => (
                    <RegionalDishCardTile
                        key={dish.id}
                        dish={dish}
                        isBookmarked={foodTrailIds.includes(dish.id)}
                        onBookmarkFoodTrail={handleToggleTrail}
                    />
                ))}
            </div>
        </div>
    );
};

export default RegionalCuisineExplorerHub;
