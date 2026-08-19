import React, { useState } from 'react';
import { ltProfileData } from '../data/landtData';

export function LTExplorer() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(ltProfileData.projects.map(p => p.category))];

  const filteredProjects = selectedCategory === 'All' 
    ? ltProfileData.projects 
    : ltProfileData.projects.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-md mb-3">
                {project.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
              <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {project.location}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
