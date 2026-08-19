import React, { useState } from 'react';
import { Calendar, Search, Bell } from 'lucide-react';
import { MOCK_FESTIVALS, filterFestivalsByMonth } from '../../services/festivalCalendarEngine';
import { FestivalEventCardTile } from './FestivalEventCardTile';

export const FestivalsCulturalCalendarHub = () => {
    const [festivals] = useState(MOCK_FESTIVALS);
    const [selectedMonth, setSelectedMonth] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [reminderIds, setReminderIds] = useState([]);

    const filtered = filterFestivalsByMonth(festivals, selectedMonth).filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.region.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleToggleReminder = (id) => {
        setReminderIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 text-slate-100 font-sans p-4">
            {/* Header Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                        <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                            <Calendar className="w-4 h-4" /> Cultural Traditions & Lore
                        </div>
                        <h1 className="text-2xl font-black text-slate-100 mt-1">Traditional Indian Festival Calendar</h1>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                        <Bell className="w-5 h-5 text-purple-400" />
                        <div>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">Reminders Saved</span>
                            <span className="text-lg font-black text-purple-400 font-mono">{reminderIds.length} Festivals</span>
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
                            placeholder="Search festival name or region (e.g. Diwali, Kolkata)..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    <div className="flex gap-2">
                        {['All', 'October', 'November', 'March'].map(m => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setSelectedMonth(m)}
                                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                                    selectedMonth === m
                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Festivals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filtered.map(festival => (
                    <FestivalEventCardTile
                        key={festival.id}
                        festival={festival}
                        isReminderSet={reminderIds.includes(festival.id)}
                        onToggleReminder={handleToggleReminder}
                    />
                ))}
            </div>
        </div>
    );
};

export default FestivalsCulturalCalendarHub;
