import React from 'react';
import { Flame, MapPin, Utensils } from 'lucide-react';

export const RegionalDishCardTile = ({ dish, onBookmarkFoodTrail, isBookmarked }) => {
    return (
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        dish.dietary === 'Veg' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                        dish.dietary === 'Non-Veg' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' :
                        'bg-teal-500/10 border-teal-500/30 text-teal-400'
                    }`}>
                        {dish.dietary}
                    </span>

                    <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-rose-500" /> {dish.spiceLevel}
                    </span>
                </div>

                <h3 className="text-base font-bold text-slate-100">{dish.name}</h3>
                <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {dish.state}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{dish.description}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 truncate max-w-[150px]">
                    📍 {dish.popularHub}
                </span>

                <button
                    type="button"
                    onClick={() => onBookmarkFoodTrail(dish.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                        isBookmarked
                            ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                    }`}
                >
                    {isBookmarked ? 'Saved in Trail' : 'Add to Food Trail'}
                </button>
            </div>
        </div>
    );
};
