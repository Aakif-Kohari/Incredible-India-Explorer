# 💧 Waterfalls of India Interactive Landing Page

## Overview
A central, map-focused explorer for discovering the majestic waterfalls of India. Users can filter by height, region, state, and type, and interact with a visual map to locate cascades across the subcontinent.

## Features
- **Interactive Map:** CSS-based map with hover tooltips and click-to-scroll functionality.
- **Advanced Filtering:** Search by name, filter by state, type, and best visiting season.
- **Dynamic Statistics:** Visual bar charts showing distribution by state and type.
- **Safe DOM Rendering:** All dynamic content is built using `document.createElement()` for security and performance.

## File Structure
- `index.html`: Semantic layout with hero, map, explorer, and stats sections.
- `style.css`: Deep river blue theme with responsive grids and animations.
- `script.js`: Filtering logic, event handling, and IntersectionObserver setup.
- `data.js`: Comprehensive dataset of 10 major Indian waterfalls.
- `components.js`: Safe DOM rendering functions for cards, pins, and stats.
