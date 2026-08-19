import React from 'react';
import { MapPin, Calendar, Plus, Check } from 'lucide-react';

export const UnescoSiteCardTile = ({ site, isSelected, onToggleItinerary }) => {
    return (
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase">
                        {site.category} Heritage
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-indigo-400" /> Est. {site.designatedYear}
                    </span>
                </div>

                <h3 className="text-base font-bold text-slate-100">{site.name}</h3>
                <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" /> {site.state}, India
                </p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{site.description}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-xs font-mono font-bold text-emerald-400">₹{site.estimatedCostINR.toLocaleString()} / person</span>

                <button
                    type="button"
                    onClick={() => onToggleItinerary(site.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                        isSelected
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                    }`}
                >
                    {isSelected ? (
                        <>
                            <Check className="w-3.5 h-3.5" /> Added to Plan
                        </>
                    ) : (
                        <>
                            <Plus className="w-3.5 h-3.5" /> Add to Itinerary
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
