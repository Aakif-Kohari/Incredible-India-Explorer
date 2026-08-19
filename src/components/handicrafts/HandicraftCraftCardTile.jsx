import React from 'react';
import { Tag, MapPin, ShoppingBag, Check } from 'lucide-react';

export const HandicraftCraftCardTile = ({ craft, onToggleCart, isInCart }) => {
    return (
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase">
                        {craft.category}
                    </span>
                    {craft.isGiTagged && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[9px] font-bold flex items-center gap-1">
                            <Tag className="w-3 h-3" /> GI Tagged
                        </span>
                    )}
                </div>

                <h3 className="text-base font-bold text-slate-100">{craft.name}</h3>
                <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" /> {craft.state} ({craft.artisanCluster})
                </p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{craft.description}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-xs font-mono font-bold text-emerald-400">₹{craft.priceINR.toLocaleString()}</span>

                <button
                    type="button"
                    onClick={() => onToggleCart(craft.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                        isInCart
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                    }`}
                >
                    {isInCart ? (
                        <>
                            <Check className="w-3.5 h-3.5" /> Added to Cart
                        </>
                    ) : (
                        <>
                            <ShoppingBag className="w-3.5 h-3.5" /> Support Artisan
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
