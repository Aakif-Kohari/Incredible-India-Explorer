import React, { useState } from 'react';
import './MarineFossilsIndia.css';

const MarineFossilsIndia = () => {
  const [activeTab, setActiveTab] = useState(0);

  const sites = [
    {
      title: "1. The Spiti Valley Shales (Himachal Pradesh)",
      period: "Triassic to Jurassic (~240 to 140 Million Years Ago)",
      context: "Deep-water sediment beds of the Tethys Ocean.",
      organisms: [
        { name: "Ammonites (Shaligrams)", desc: "Coiled, chambered marine mollusks related to modern nautiluses. Locally revered as sacred stones, these fossils are direct evidence of an ancient seafloor pushed thousands of meters high into the Himalayas." },
        { name: "Belemnoidea", desc: "Ancient squid-like cephalopods with internal hard shells." },
        { name: "Ichthyosaurs", desc: "Massive marine reptiles that hunted in open Tethyan waters." }
      ]
    },
    {
      title: "2. The Kutch Basin (Gujarat)",
      period: "Jurassic to Cretaceous (~180 to 66 Million Years Ago)",
      context: "A warm, shallow extension of the western Tethys Sea that regularly flooded western India.",
      organisms: [
        { name: "Bivalves & Brachiopods", desc: "Well-preserved ancient clams and shelled organisms anchoring prehistoric reef barriers." },
        { name: "Belemnoidea & Ammonites", desc: "Abundant index fossils used to date the rock layers of western India." }
      ]
    },
    {
      title: "3. The Narmada Valley (Madhya Pradesh & Gujarat)",
      period: "Late Cretaceous (~90 to 66 Million Years Ago)",
      context: "A dramatic structural marine estuary cut right through the heart of central India.",
      organisms: [
        { name: "Prehistoric Ray & Shark Teeth", desc: "Found near Bagh (Madhya Pradesh), proving that central India once housed high-salinity oceanic bays." },
        { name: "Echinoids (Sea Urchins)", desc: "Fossilized bottom-dwellers found deep inland, far from modern coastlines." }
      ]
    }
  ];

  return (
    <div className="fossils-container">
      <header className="fossils-hero">
        <h1>🌊 India's Ancient Seas: A Geological Overview</h1>
        <p className="hero-description">
          Millions of years before the Indian plate collided with Asia to form the Himalayas, massive parts of the present-day Indian landmass lay completely submerged under prehistoric oceans.
        </p>
      </header>

      <section className="water-bodies">
        <h2>The Ancient Oceans</h2>
        <div className="ocean-grid">
          <div className="ocean-card">
            <h3>The Tethys Sea</h3>
            <p>A vast ancient ocean that separated the supercontinents of Gondwana and Laurasia. The sediment bed of this sea was crushed and lifted up during continental collisions, trapping millions of marine fossils at the roof of the world.</p>
          </div>
          <div className="ocean-card">
            <h3>The Mesozoic Sea Incursions</h3>
            <p>Narrow marine channels that slashed deep into central India (along the current Narmada Rift Valley) due to continental drifting and fluctuating sea levels.</p>
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <h2>⏳ Prehistoric Marine Timeline</h2>
        <div className="timeline-flow">
          <div className="timeline-item">
            <span className="time">410M Years Ago: Devonian</span>
            <span className="event">Zanskar Corals</span>
          </div>
          <div className="timeline-item">
            <span className="time">240M Years Ago: Triassic</span>
            <span className="event">Spiti Ammonites</span>
          </div>
          <div className="timeline-item">
            <span className="time">140M Years Ago: Jurassic</span>
            <span className="event">Kutch Marine Reefs</span>
          </div>
          <div className="timeline-item">
            <span className="time">70M Years Ago: Cretaceous</span>
            <span className="event">Narmada Shark Teeth</span>
          </div>
        </div>
      </section>

      <section className="sites-section">
        <h2>📍 Major Marine Fossil Sites & Organisms</h2>
        <div className="sites-tabs">
          {sites.map((site, index) => (
            <button 
              key={index} 
              className={\`tab-button \${activeTab === index ? 'active' : ''}\`}
              onClick={() => setActiveTab(index)}
            >
              Site {index + 1}
            </button>
          ))}
        </div>
        
        <div className="site-content">
          <h3>{sites[activeTab].title}</h3>
          <p><strong>Geological Period:</strong> {sites[activeTab].period}</p>
          <p><strong>Ancient Sea Context:</strong> {sites[activeTab].context}</p>
          <h4>Organisms Discovered:</h4>
          <ul>
            {sites[activeTab].organisms.map((org, i) => (
              <li key={i}><strong>{org.name}:</strong> {org.desc}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="key-profiles">
        <h2>👤 Key Indian Fossil Profiles</h2>
        <ul>
          <li><strong>Indonaia:</strong> Prehistoric freshwater and estuarine bivalves documenting the shift from open seas to river deltas as the land emerged.</li>
          <li><strong>Rajasaurus narmadensis:</strong> While a terrestrial apex dinosaur, its bones are found in close proximity to marine sediment layers, proving it hunted along Cretaceous coastal estuaries in central India.</li>
        </ul>
      </section>
      
      <section className="quiz-section">
        <h2>📝 Test Your Understanding</h2>
        <div className="quiz-card">
          <h3>Geological Context</h3>
          <p><strong>Question:</strong> Why are marine fossils like ammonites routinely discovered thousands of meters above sea level in the high-altitude Spiti Valley of the Himalayas?</p>
          <div className="quiz-answer correct">
            <strong>Correct Answer:</strong> The Himalayan mountains were formed by the collision of tectonic plates, which crumpled and lifted the ancient Tethys Sea bed.
          </div>
        </div>
        <div className="quiz-card">
          <h3>Central Indian Estuaries</h3>
          <p><strong>Question:</strong> The discovery of fossilized shark teeth and marine sea urchins (echinoids) in the Narmada Valley of Madhya Pradesh proves which geological fact?</p>
          <div className="quiz-answer correct">
            <strong>Correct Answer:</strong> A narrow marine sea channel once cut deep into the heart of central India during the Cretaceous period.
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarineFossilsIndia;
