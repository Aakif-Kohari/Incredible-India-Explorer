import React, { useState } from 'react';
import { tcsProfileData } from '../data/tcsData';

export function TCSTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-6">
      {/* Timeline Selector Buttons */}
      <div className="flex flex-col md:flex-row gap-3">
        {tcsProfileData.timeline.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex-1 p-4 rounded-xl text-left border transition-all ${
              activeIndex === index
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400'
            }`}
          >
            <span className="block text-xs font-semibold uppercase tracking-wider opacity-80">{item.period}</span>
            <span className="block text-base font-bold mt-1">{item.title}</span>
          </button>
        ))}
      </div>

      {/* Active Timeline Content Display */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
        <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-md">
          Phase Era: {tcsProfileData.timeline[activeIndex].period}
        </span>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {tcsProfileData.timeline[activeIndex].title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {tcsProfileData.timeline[activeIndex].description}
        </p>
      </div>
    </div>
  );
}
