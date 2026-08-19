import React from 'react';
import { tcsProfileData } from '../data/tcsData';
import { TCSTimeline } from '../components/TCSTimeline';

export function TCSProfile() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Header / Origin */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{tcsProfileData.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{tcsProfileData.origin.story}</p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 pt-2">
          <span>🏛️ Founded: {tcsProfileData.origin.founded}</span>
          <span>👥 Leadership: {tcsProfileData.origin.founder}</span>
          <span>📍 HQ: {tcsProfileData.origin.headquarters}</span>
        </div>
      </div>

      {/* Major Milestones Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Major Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tcsProfileData.milestones.map((m, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-gray-800/60 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">{m.year}</span>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{m.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Services */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Technology Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tcsProfileData.services.map((service, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{service.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Expansion Timeline */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">India-to-Global Expansion Timeline</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Trace TCS's journey from a domestic pioneer to a multinational IT titan.</p>
        </div>
        <TCSTimeline />
      </section>

      {/* Major Achievements & Sources */}
      <section className="bg-blue-50 dark:bg-gray-800/80 p-6 rounded-2xl border border-blue-100 dark:border-gray-700 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Major Achievements</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
            {tcsProfileData.achievements.map((ach, idx) => (
              <li key={idx}>{ach}</li>
            ))}
          </ul>
        </div>
        <div className="pt-4 border-t border-blue-200 dark:border-gray-700">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Sources & References</h4>
          <ul className="list-disc list-inside text-sm text-blue-600 dark:text-blue-400 space-y-1">
            {tcsProfileData.sources.map((src, idx) => (
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
