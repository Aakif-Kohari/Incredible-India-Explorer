import React, { useState } from 'react';
import './PrehistoricElephantsIndia.css';

const PrehistoricElephantsIndia = () => {
  const [activeTab, setActiveTab] = useState(0);

  const sites = [
    {
      title: "1. The Shivalik Foothills: An Evolutionary Hotspot (Himachal & J&K)",
      period: "Miocene to Early Pleistocene (~15 to 1.5 Million Years Ago)",
      habitat: "Sub-Himalayan alluvial floodplains, dense tropical forests, and swampy grasslands.",
      discoveries: [
        { name: "Stegodon ganesa", desc: "One of the most famous prehistoric elephants of India, named after the Hindu deity Ganesha due to its spectacular ivory. It possessed massive, closely packed, parallel tusks that grew over 3 meters long, twisting outwards with slight upward curves." },
        { name: "Deinotherium", desc: "A bizarre, early offshoot of the elephant family tree. Unlike modern elephants, its tusks grew exclusively out of its lower jaw, curving downwards and backwards. These teeth acted like giant hooks to strip bark from trees and pull down branches." }
      ]
    },
    {
      title: "2. The Narmada Valley River Beds (Central India)",
      period: "Middle to Late Pleistocene (~500,000 to 50,000 Years Ago)",
      habitat: "Warm, savanna-like grasslands bordered by dense riverine forests across Madhya Pradesh and Gujarat.",
      discoveries: [
        { name: "Palaeoloxodon namadicus (The Narmada Straight-Tusked Elephant)", desc: "This absolute titan is considered by many paleontologists to be the largest land mammal that ever lived, potentially rivaling or exceeding the giant indricotheres. Fossilized skull and limb structures excavated in central India indicate that mature bulls stood over 5 to 5.2 meters tall at the shoulder and weighed upwards of 22 tonnes (more than triple the weight of a modern African bush elephant)." }
      ]
    },
    {
      title: "3. The Siwalik Gomphotheres (Northern & Western India)",
      period: "Late Miocene (~10 to 5 Million Years Ago)",
      habitat: "Primeval marshlands.",
      discoveries: [
        { name: "Anancus & Choerolophodon", desc: "Shovel-tusked and four-tusked ancestral giants that wallowed in primeval marshlands, using elongated lower jaws and flattened teeth to scoop up soft aquatic vegetation before grasses became dominant." }
      ]
    }
  ];

  return (
    <div className="elephants-container">
      <header className="elephants-hero">
        <h1>🐘 India’s Proboscidean Cradle</h1>
        <h2>An Evolutionary Overview</h2>
        <p className="hero-description">
          The Indian subcontinent holds one of the most complete and spectacular fossil records of elephant evolution in the world. Long before the modern Indian elephant (Elephas maximus) emerged, a massive array of ancient proboscideans roamed the prehistoric landscapes of India.
        </p>
        <p className="hero-description">
          As the shifting tectonic plates fused India to Eurasia, ancient land bridges allowed ancestral elephant lineages to migrate out of Africa and settle into the warm, lush floodplains of northern and central India. Here, they grew to colossal sizes, developed diverse tusk configurations, and adapted to changing climates over millions of years.
        </p>
      </header>

      <section className="timeline-section">
        <h2>⏳ Prehistoric Elephant Timeline</h2>
        <div className="timeline-flow">
          <div className="timeline-item">
            <span className="time">15M Years Ago: Miocene</span>
            <span className="event">Deinotherium Giants</span>
          </div>
          <div className="timeline-item">
            <span className="time">5M Years Ago: Pliocene</span>
            <span className="event">Anancus Gomphotheres</span>
          </div>
          <div className="timeline-item">
            <span className="time">2.5M Years Ago: Pleistocene</span>
            <span className="event">Stegodon Ganesa</span>
          </div>
          <div className="timeline-item">
            <span className="time">50,000 Years Ago: Late Pleistocene</span>
            <span className="event">Palaeoloxodon Namadicus</span>
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
        <h2>🔬 Scientific & Evolutionary Significance</h2>
        <div className="sig-grid">
          <div className="sig-card">
            <h3>The Size Envelope</h3>
            <p>The discovery of Palaeoloxodon namadicus in central Indian river gravels pushes our understanding of mammalian growth limits to its upper boundaries, illustrating the immense productivity of India's Pleistocene savanna ecosystems.</p>
          </div>
          <div className="sig-card">
            <h3>Climate Proving Grounds</h3>
            <p>The transformation of flat, crushing molar teeth seen across Stegodon to the highly complex, compressed enamel ridges in modern Elephas provides a perfect evolutionary timeline of India’s vegetation shifting from soft forest leaves to tough, silica-rich prairie grasses as the monsoons intensified.</p>
          </div>
        </div>
      </section>
      
      <section className="quiz-section">
        <h2>📝 Test Your Understanding</h2>
        <div className="quiz-card">
          <h3>Megafaunal Size Limits</h3>
          <p><strong>Question:</strong> The fossilized remains of the straight-tusked elephant Palaeoloxodon namadicus discovered in the Narmada Valley are of immense interest to global paleontologists because:</p>
          <div className="quiz-answer correct">
            <strong>Correct Answer:</strong> It represents one of the largest land mammals ever known, with shoulder heights crossing 5 meters and weights exceeding 22 tonnes.
          </div>
        </div>
        <div className="quiz-card">
          <h3>Jaw Adaptations</h3>
          <p><strong>Question:</strong> How did the ancient Miocene elephant relative 'Deinotherium', whose fossils have been excavated in western India, differ completely from modern Indian elephants?</p>
          <div className="quiz-answer correct">
            <strong>Correct Answer:</strong> Its tusks grew downwards and backwards directly out of its lower jaw instead of its upper jaw.
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrehistoricElephantsIndia;
