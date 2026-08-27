import React, { useState } from 'react';
import './AncientStoneCirclesIndia.css';

const AncientStoneCirclesIndia = () => {
  const [activeRegion, setActiveRegion] = useState(0);

  const regions = [
    {
      name: "Central India (Vidarbha)",
      description: "Characterized by large circles filled with cairn (heap of stones) packing, often yielding a rich array of iron horse-trappings, suggesting a pastoral, warrior-centric society."
    },
    {
      name: "South India (Deccan & South)",
      description: "Often feature stone circles bounding cist burials (box-like stone tombs) or urn burials. The use of massive granite or laterite stones is common."
    },
    {
      name: "Northeast India",
      description: "The tradition involves both memorial stones and circular arrangements, often continuing into much later historical periods compared to the peninsular megaliths."
    }
  ];

  return (
    <div className="stone-circles-container">
      <header className="stone-circles-hero">
        <h1>⭕ Explore India's Ancient Stone Circles</h1>
        <h2>Prehistoric Megalithic Rings</h2>
        <p className="hero-description">
          Scattered across the Indian subcontinent are mysterious prehistoric monuments known as stone circles. Belonging primarily to the megalithic tradition of the Iron Age, these rings of standing or laid stones are enduring monuments to ancient spiritual practices, astronomical observations, and funerary rituals.
        </p>
      </header>

      <section className="definition-section">
        <div className="card-box">
          <h2>What is a Stone Circle?</h2>
          <p>
            A stone circle is a megalithic monument consisting of a number of stones arranged in a circle. In the Indian context, they are often associated with burials (cairn circles) or memorial sites. While Stonehenge in the UK is the world's most famous example, India boasts a vast and diverse collection of these enigmatic rings, particularly concentrated in the southern and central regions.
          </p>
        </div>
        <div className="card-box context">
          <h2>Archaeological Context</h2>
          <ul>
            <li><strong>Chronology:</strong> Most date to the Iron Age (circa 1500 BCE – 500 CE), though some could have older Neolithic roots.</li>
            <li><strong>Purpose:</strong> Used as burial sites (containing cists, urns) or as commemorative memorials for community leaders. Some evidence suggests they served as astronomical observatories to track solstices.</li>
            <li><strong>Artifacts:</strong> Excavations yield iron tools, weapons, black-and-red ware pottery, and occasionally gold and copper ornaments.</li>
          </ul>
        </div>
      </section>

      <section className="locations-section">
        <h2>📍 Major Locations Across India</h2>
        <div className="location-grid">
          <div className="location-card">
            <h3>Junapani, Maharashtra</h3>
            <p>Located near Nagpur, Junapani is one of the largest megalithic sites in India, featuring over 300 stone circles noted for their varying sizes and rich iron artifacts.</p>
          </div>
          <div className="location-card">
            <h3>Brahmagiri, Karnataka</h3>
            <p>A key archaeological site providing clear stratigraphy. The stone circles here often enclose cist burials and have been pivotal in dating the South Indian Iron Age.</p>
          </div>
          <div className="location-card">
            <h3>Nilaskal, Karnataka</h3>
            <p>Features a remarkable alignment of standing stones and stone circles. Some researchers believe the layout possesses astronomical significance aligned to the sun.</p>
          </div>
          <div className="location-card">
            <h3>Vangchhia, Mizoram</h3>
            <p>The Kawtchhuah Ropui site contains fascinating clusters of megalithic stones arranged in circular patterns, highlighting the distinct traditions of Northeast India.</p>
          </div>
        </div>
      </section>

      <section className="regions-section">
        <h2>🌍 Regional Differences & Construction Patterns</h2>
        <div className="regions-tabs">
          {regions.map((region, index) => (
            <button 
              key={index} 
              className={\`tab-button \${activeRegion === index ? 'active' : ''}\`}
              onClick={() => setActiveRegion(index)}
            >
              {region.name}
            </button>
          ))}
        </div>
        
        <div className="region-content">
          <h3>{regions[activeRegion].name}</h3>
          <p>{regions[activeRegion].description}</p>
        </div>
      </section>
    </div>
  );
};

export default AncientStoneCirclesIndia;
