import React from 'react';
import { ltProfileData } from '../data/landtData';
import { LTExplorer } from '../components/LTExplorer';

export function LTProfile() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Header / Origin */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{ltProfileData.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{ltProfileData.origin.story}</p>
        <div className="flex justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 pt-2">
          <span>🏛️ Founded: {ltProfileData.origin.founded}</span>
          <span>👥 Founders: {ltProfileData.origin.founders.join(' & ')}</span>
          <span>📍 HQ: {ltProfileData.origin.headquarters}</span>
        </div>
      </div>

      {/* Major Milestones */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Major Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ltProfileData.milestones.map((m, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-gray-800/60 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">{m.year}</span>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{m.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Infrastructure Sectors */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Infrastructure Sectors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ltProfileData.sectors.map((sector, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{sector.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{sector.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Project Explorer */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Interactive Project Explorer</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Explore L&T's iconic engineering achievements across various sectors.</p>
        </div>
        <LTExplorer />
      </section>

      {/* Global Presence & Sources */}
      <section className="bg-blue-50 dark:bg-gray-800/80 p-6 rounded-2xl border border-blue-100 dark:border-gray-700 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Global Presence</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{ltProfileData.globalPresence}</p>
        </div>
        <div className="pt-4 border-t border-blue-200 dark:border-gray-700">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Sources & References</h4>
          <ul className="list-disc list-inside text-sm text-blue-600 dark:text-blue-400 space-y-1">
            {ltProfileData.sources.map((src, idx) => (
              <li key={idx}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {src.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
