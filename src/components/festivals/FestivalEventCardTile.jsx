import React from 'react';
import { Calendar, MapPin, Sparkles, Bell } from 'lucide-react';

export const FestivalEventCardTile = ({ festival, onToggleReminder, isReminderSet }) => {
    return (
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-bold uppercase">
                        {festival.month} Celebration
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-indigo-400" /> {festival.region}
                    </span>
                </div>

                <h3 className="text-base font-bold text-slate-100">{festival.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{festival.significance}</p>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] text-purple-300 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{festival.traditionHighlights}</span>
                </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
                <button
                    type="button"
                    onClick={() => onToggleReminder(festival.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                        isReminderSet
                            ? 'bg-purple-500/10 border border-purple-500/30 text-purple-400'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                    }`}
                >
                    <Bell className="w-3.5 h-3.5" />
                    <span>{isReminderSet ? 'Reminder Set' : 'Notify Me'}</span>
                </button>
            </div>
        </div>
    );
};
