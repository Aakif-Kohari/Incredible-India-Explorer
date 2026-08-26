import React, { useState } from 'react';
import './KupgalPetroglyphs.css';

const KupgalPetroglyphs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: "1. The Neolithic \"Cattle Bruisings\"",
      technique: "Bruising (repeatedly striking the rock face with harder hammerstones to pulverize the surface layer) rather than deep incision carving.",
      motifs: "Dominating the oldest layers are hundreds of long-horned humped cattle (Bos indicus). These humped bulls are often depicted in dynamic postures, occasionally decorated with body patterns or shown standing in clusters.",
      context: "This phase directly matches the emergence of Southern Neolithic pastoral communities. Cattle were the economic and spiritual backbone of these societies, a fact underscored by the close proximity of the rock art to prehistoric ash mounds (fossilized mounds of accumulated cattle dung)."
    },
    {
      title: "2. Anthropomorphic Figures & Ritual Scenes",
      technique: "Stylized Geometric Bruisings and Etchings.",
      motifs: "Geometric human figures with stylized torsos. Some scenes explicitly depict dancing groups, while others showcase figures holding hands or engaging in ritualistic hunting sequences. Kupgal uniquely contains a high volume of erotic or phallic human stick figures.",
      context: "Archaeologists interpret these explicit motifs as symbolic representations of fertility rites, territorial tracking boundaries, or initiation markers."
    },
    {
      title: "3. Iron Age and Later Imprints",
      technique: "Metal Tool Engravings and Inscriptions.",
      motifs: "Later layers introduce human figures riding caparisoned horses, warriors wielding shields and iron swords, and abstract geometric wheels. The youngest layers feature early South Indian scripts and classic auspicious symbols.",
      context: "Proves the hill remained a sacred or prominent landscape marker for millennia as metal tools emerged and civilizations advanced."
    }
  ];

  return (
    <div className="kupgal-container">
      <header className="kupgal-hero">
        <h1>🪨 The Granite Landscape of Kupgal</h1>
        <h2>An Archaeological Overview</h2>
        <p className="hero-description">
          Located in the Bellary district of Karnataka, Kupgal Hill is one of the most prolific prehistoric rock-art stations in Southern India. The site is a rugged granitic landscape characterized by massive boulders and dark dolerite dykes slicing through the hills.
        </p>
        <p className="hero-description">
          Prehistoric humans engraved thousands of motifs on these dark, smooth dolerite surfaces. By chipping away the weathered dark outer layer of the rock, they exposed the fresh, lighter silicate stone beneath—creating stark, highly visible, long-lasting rock art known as petroglyphs.
        </p>
      </header>

      <section className="timeline-section">
        <h2>⏳ Cultural and Technological Chronology</h2>
        <div className="timeline-flow">
          <div className="timeline-item">
            <span className="time">3000 BCE: Neolithic</span>
            <span className="event">Cattle & Bruising</span>
          </div>
          <div className="timeline-item">
            <span className="time">1200 BCE: Iron Age / Megalithic</span>
            <span className="event">Human Figures & Weapons</span>
          </div>
          <div className="timeline-item">
            <span className="time">300 BCE: Early Historic</span>
            <span className="event">Scripts & Symbols</span>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>📍 Key Archaeological Features & Motifs</h2>
        <div className="features-tabs">
          {features.map((feature, index) => (
            <button 
              key={index} 
              className={\`tab-button \${activeTab === index ? 'active' : ''}\`}
              onClick={() => setActiveTab(index)}
            >
              Layer {index + 1}
            </button>
          ))}
        </div>
        
        <div className="feature-content">
          <h3>{features[activeTab].title}</h3>
          
          <div className="feature-details-grid">
            <div className="detail-box text-heavy">
              <strong>Primary Technique:</strong>
              <p>{features[activeTab].technique}</p>
            </div>
            <div className="detail-box text-heavy">
              <strong>The Motifs:</strong>
              <p>{features[activeTab].motifs}</p>
            </div>
            <div className="detail-box text-heavy context">
              <strong>Cultural Context:</strong>
              <p>{features[activeTab].context}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="musical-rocks-section">
        <h2>🔬 The Phenomenon of "Musical Rocks"</h2>
        <div className="sig-card">
          <p>
            One of Kupgal’s most famous scientific and sensory dimensions is its ringing rocks or lithophones. Certain large boulders on the hill contain circular depression percussion marks. When struck with hand-held stones, these resonant granite boulders emit deep, metallic, bell-like musical tones.
          </p>
          <p>
            Archaeologists believe that acoustic performance was deeply woven into the petroglyph creation process. Prehistoric rituals at Kupgal likely combined visual art creation with percussive sonic rhythms echoing across the Bellary plains.
          </p>
        </div>
      </section>

      <section className="quiz-section">
        <h2>📝 Test Your Understanding</h2>
        <div className="quiz-card">
          <h3>Dynamic Art Inscriptions</h3>
          <p><strong>Question:</strong> The ancient petroglyphs at Kupgal are primarily referred to as "rock bruisings" rather than deep rock carvings because of which technological reason?</p>
          <div className="quiz-answer correct">
            <strong>Correct Answer:</strong> Creators repeatedly hammered and pulverized the dark weathered rock skin using hard stone tools to expose the lighter underlying mineral layer.
          </div>
        </div>
        <div className="quiz-card">
          <h3>Socio-Economic Context</h3>
          <p><strong>Question:</strong> Why do humped cattle (Bos indicus) dominate the earliest, oldest layers of the petroglyph matrices at Kupgal?</p>
          <div className="quiz-answer correct">
            <strong>Correct Answer:</strong> The art reflects the socio-economic reality of Southern Neolithic pastoralists, for whom cattle were central to livelihood, wealth, and ritual life.
          </div>
        </div>
      </section>
    </div>
  );
};

export default KupgalPetroglyphs;
