# Coastal Erosion Along India's Shoreline

An interactive educational profile exploring coastal erosion along India's 7,517 km shoreline, covering vulnerable regions, causes, impacts, and management strategies.

## Features

### 🗺️ Interactive Erosion Map
- Visual representation of erosion severity across 9 coastal states
- Filter by severity level (severe/moderate)
- Filter by coastline (Arabian Sea/Bay of Bengal)
- Click markers for detailed region information

### 📊 Regional Profiles
Detailed profiles for 9 coastal regions including:
- Kerala Coast (severe erosion: 5-8 m/year)
- Tamil Nadu Coast (severe erosion: 4-7 m/year)
- West Bengal Coast (severe erosion: 6-10 m/year)
- Odisha Coast (moderate erosion: 3-5 m/year)
- And 5 more regions...

### 📚 Educational Content
- **Natural Processes**: Wave action, tidal currents, longshore drift, storm surges
- **Human Acceleration**: Coastal construction, sand mining, deforestation, sea level rise
- **Case Studies**: Sundarbans, Chennai beaches, Kerala coast, Puri beach
- **Management Strategies**: Hard engineering, soft engineering, policy & regulation

### 🎨 Design Features
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **Smooth Animations**: Scroll-based reveal animations
- **Interactive Elements**: Modal popups, filter controls, smooth scrolling

## Statistics

- **Total Coastline**: 7,517 km
- **Coast Under Erosion**: 34% (2,560 km)
- **Coastal States**: 9 states + 4 union territories
- **Average Sea Level Rise**: 3.3 mm/year
- **Affected Villages**: 250+
- **Economic Losses**: ₹10,000 Crore annually

## Installation

1. Navigate to the feature directory:
   ```bash
   cd frontend/coastal-erosion
   ```

2. Open `index.html` in your browser or serve using a local server:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. Access the page at `http://localhost:8000`

## File Structure

```
coastal-erosion/
├── index.html          # Main HTML structure
├── style.css          # Styling and animations
├── data.js            # Coastal erosion data
├── components.js      # Reusable UI components
├── script.js          # Main application logic
├── metadata.json      # Feature metadata
└── README.md          # This file
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

This feature follows WCAG 2.1 Level AA guidelines:
- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Color contrast compliance
- Screen reader friendly

## Contributing

Please read the main [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## Acknowledgments

- Ministry of Earth Sciences, Government of India
- National Centre for Coastal Research (NCCR)
- Space Applications Centre (SAC), ISRO
- IPCC Special Report on Ocean and Cryosphere
- National Institute of Ocean Technology (NIOT)
