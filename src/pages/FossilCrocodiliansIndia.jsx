import React, { useState } from 'react';
import './FossilCrocodiliansIndia.css';

const FossilCrocodiliansIndia = () => {
  const [activeTab, setActiveTab] = useState(0);

  const sites = [
    {
      title: "1. The Triassic \"False Crocs\" of Pranhita-Godavari Valley (Telangana)",
      period: "Late Triassic (~220 to 200 Million Years Ago)",
      habitat: "Vast, slow-moving inland river basins surrounded by dense ferns.",
      discoveries: [
        { name: "Phytosaurs (Parasuchus)", desc: "Though not true crocodiles, these massive semi-aquatic archosaurs are prime examples of evolutionary convergence. They possessed long, tooth-lined snouts and armor plates identical to modern crocodiles, but their nostrils were uniquely placed on a hump right in front of their eyes." },
        { name: "Aetosaurs", desc: "Heavily armored, herbivorous crocodilian relatives that fed on roots and soft vegetation along riverbanks." }
      ]
    },
    {
      title: "2. The Great Gharial Lineages of the Shivalik Hills (Northern India)",
      period: "Miocene to Pliocene (~10 to 2 Million Years Ago)",
      habitat: "The foothills of the newly rising Himalayas, crisscrossed by immense, marshy proto-river channels.",
      discoveries: [
        { name: "Rorristoma & Gavialis variants", desc: "The Shivalik formations have yielded some of the largest gharial fossils ever discovered. These prehistoric giants reached lengths exceeding 8 to 10 meters, easily dwarfing modern river gharials. Their long, slender, fish-catching snouts are crucial to understanding the evolutionary split between true crocodiles and specialized gharials." }
      ]
    },
    {
      title: "3. The Cretaceous Coastline Predators of Central India (Narmada & Bagh)",
      period: "Late Cretaceous (~70 to 66 Million Years Ago)",
      habitat: "Warm, high-salinity marine estuaries and coastal swamps slicing central India.",
      discoveries: [
        { name: "Crocodyliform Teeth and Scutes", desc: "Excavated alongside dinosaur nesting sites in Madhya Pradesh. These marine and estuarine crocodiles lived alongside apex predators like Rajasaurus, feeding on fish, turtles, and juvenile dinosaurs trapped along Cretaceous tidal flats." }
      ]
    }
  ];

  return (
    <div className="crocs-container">
      <header className="crocs-hero">
        <h1>🐊 India’s Crocodilian Heritage</h1>
        <h2>An Evolutionary Overview</h2>
        <p className="hero-description">
          India has a deeply significant, multi-layered paleontological history regarding crocodilian evolution. Long before modern muggers, gharials, and saltwater crocodiles inhabited the subcontinent's rivers, a diverse array of prehistoric crocodylomorphs—ranging from bizarre armor-plated land-dwellers to massive, river-dwelling giants—thrived across the Indian landmass.
        </p>
      </header>

      <section className="timeline-section">
        <h2>⏳ Prehistoric Crocodilian Timeline</h2>
        <div className="timeline-flow">
          <div className="timeline-item">
            <span className="time">210M Years Ago: Late Triassic</span>
            <span className="event">Maleri Phytosaurs</span>
          </div>
          <div className="timeline-item">
            <span className="time">180M Years Ago: Early Jurassic</span>
            <span className="event">Kota Pholidosaurids</span>
          </div>
          <div className="timeline-item">
            <span className="time">68M Years Ago: Late Cretaceous</span>
            <span className="event">Bagh Crocodyliforms</span>
          </div>
          <div className="timeline-item">
            <span className="time">5M Years Ago: Pliocene</span>
            <span className="event">Ror Gharial Giants</span>
          </div>
        </div>
      </section>

      <section className="sites-section">
        <h2>📍 Key Fossil Discoveries & Prehistoric Species</h2>
        <div className="sites-tabs">
          {sites.map((site, index) => (
            <button 
              key={index} 
              className={\`tab-button \${activeTab === index ? 'active' : ''}\`}
              onClick={() => setActiveTab(index)}
            >
              Region {index + 1}
            </button>
          ))}
        </div>
        
        <div className="site-content">
          <h3>{sites[activeTab].title}</h3>
          <p><strong>Geological Period:</strong> {sites[activeTab].period}</p>
          <p><strong>Prehistoric Habitat:</strong> {sites[activeTab].habitat}</p>
          <h4>The Discoveries:</h4>
          <ul>
            {sites[activeTab].discoveries.map((disc, i) => (
              <li key={i}><strong>{disc.name}:</strong> {disc.desc}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="significance-section">
        <h2>🔬 Scientific Significance of Indian Croc Fossils</h2>
        <div className="sig-grid">
          <div className="sig-card">
            <h3>The Gharial Puzzle</h3>
            <p>India is the true ancestral cradle of the gharial family (Gavialidae). The high-density fossil records in the Shivalik Hills provide direct evidence of how climate shifts and river geometry changes influenced snout elongation over millions of years.</p>
          </div>
          <div className="sig-card">
            <h3>Continental Drift Evidence</h3>
            <p>Jurassic and Cretaceous crocodilian fossils found in western India share precise structural similarities with fossils excavated in Madagascar and South America. This acts as a reliable biological anchor proving that these landmasses were once fused together as part of Gondwana.</p>
          </div>
        </div>
      </section>
      
      <section className="quiz-section">
        <h2>📝 Test Your Understanding</h2>
        <div className="quiz-card">
          <h3>Evolutionary Convergence</h3>
          <p><strong>Question:</strong> Why are the Triassic Phytosaur (Parasuchus) fossils discovered in Telangana referred to as "false crocodiles" despite having identical armored bodies and long, tooth-lined snouts?</p>
          <div className="quiz-answer correct">
            <strong>Correct Answer:</strong> Their nostrils were located on a bony hump right in front of their eyes, unlike true crocodiles whose nostrils sit at the tip of the snout.
          </div>
        </div>
        <div className="quiz-card">
          <h3>Himalayan Gharial Giants</h3>
          <p><strong>Question:</strong> What unique insight do the massive, 10-meter fossil gharials discovered in the Shivalik Hills provide to modern evolutionary biologists?</p>
          <div className="quiz-answer correct">
            <strong>Correct Answer:</strong> They document the diversification and maximum size boundaries of the specialized fish-eating gharial family (Gavialidae).
          </div>
        </div>
      </section>
    </div>
  );
};

export default FossilCrocodiliansIndia;
