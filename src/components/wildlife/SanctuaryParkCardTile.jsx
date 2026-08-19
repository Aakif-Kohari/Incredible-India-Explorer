import React from 'react';
import { Trees, MapPin, Calendar, Ticket } from 'lucide-react';

export const SanctuaryParkCardTile = ({ park, onBookSafari, isBooked }) => {
    return (
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase">
                        {park.keySpecies} Habitat
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-400" /> {park.bestSeason}
                    </span>
                </div>

                <h3 className="text-base font-bold text-slate-100">{park.name}</h3>
                <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {park.state}, India
                </p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{park.description}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-xs font-mono font-bold text-emerald-400">₹{park.safariFeeINR.toLocaleString()} / jeep</span>

                <button
                    type="button"
                    onClick={() => onBookSafari(park.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                        isBooked
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                    }`}
                >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>{isBooked ? 'Safari Reserved' : 'Book Jeep Safari'}</span>
                </button>
            </div>
        </div>
    );
};
