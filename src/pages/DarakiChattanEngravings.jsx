import React, { useState } from 'react';
import './DarakiChattanEngravings.css';

const DarakiChattanEngravings = () => {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: "1. The Deep Antiquity of Cupules",
      attributes: "The cave walls are heavily carved with over 500 distinct cupules. These are hemispherical, cup-like depressions hammered directly into the incredibly hard quartzite surface.",
      significance: "Multi-disciplinary research conducted under the Eurasian Prehistory Archaeological Project (EPCO) using scientific excavation techniques revealed that these cupules are of extreme antiquity.",
      evidence: "Hammerstones used to peck these cupules were recovered from the cave floor deposits, explicitly buried underneath undisturbed soil layers containing Acheulean (Lower Paleolithic) stone tools. This proves that the art was created by early human ancestors (likely Homo erectus or archaic Homo sapiens) over 200,000 years ago, matching or exceeding the age of the famous Bhimbetka petroglyphs."
    },
    {
      title: "2. The Mechanics of Lower Paleolithic Art",
      attributes: "Quartzite is an exceptionally hard metamorphic rock. To create a single cupule, a Paleolithic human had to strike the rock face tens of thousands of times with a heavy, pointed hammerstone.",
      significance: "The immense, physically exhausting investment of human labor suggests deep cognitive intent.",
      evidence: "The purpose behind these cupules remains an fascinating mystery. Hypotheses range from ritualistic sound-making (as striking these spots creates loud, echoing percussive clicks) to early symbolic markers, territorial signals, or communal communication."
    }
  ];

  return (
    <div className="daraki-container">
      <header className="daraki-hero">
        <h1>🪨 The Quartzite Sanctuary</h1>
        <h2>An Archaeological Overview of Daraki-Chattan</h2>
        <p className="hero-description">
          Located in the Chambal River Valley of the Mandsaur district in Madhya Pradesh, India, Daraki-Chattan is a small, narrow quartzite cave that holds a monumental place in global paleoanthropology.
        </p>
        <p className="hero-description">
          Unlike the famous painted rock shelters of nearby Bhimbetka, Daraki-Chattan is a repository of petroglyphs (rock engravings). This cave features hundreds of deeply engraved circular depressions known as cupules, along with grooved lines, carved directly onto its vertical quartzite walls.
        </p>
      </header>

      <section className="timeline-section">
        <h2>⏳ Prehistoric Evolutionary Timeline</h2>
        <div className="timeline-flow">
          <div className="timeline-item">
            <span className="time">Lower Paleolithic (Acheulean)</span>
            <span className="event">Oldest Cupules Engraved (~200,000+ Years Ago)</span>
          </div>
          <div className="timeline-item">
            <span className="time">Middle Paleolithic</span>
            <span className="event">Tool Marks Evolve</span>
          </div>
          <div className="timeline-item">
            <span className="time">Upper Paleolithic / Mesolithic</span>
            <span className="event">Painted Overlays Begin</span>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>📍 Key Archaeological Discoveries & Scientific Research</h2>
        <div className="features-tabs">
          {features.map((feature, index) => (
            <button 
              key={index} 
              className={\`tab-button \${activeTab === index ? 'active' : ''}\`}
              onClick={() => setActiveTab(index)}
            >
              Discovery {index + 1}
            </button>
          ))}
        </div>
        
        <div className="feature-content">
          <h3>{features[activeTab].title}</h3>
          
          <div className="feature-details-grid">
            <div className="detail-box text-heavy">
              <strong>Physical Attributes / Process:</strong>
              <p>{features[activeTab].attributes}</p>
            </div>
            <div className="detail-box text-heavy">
              <strong>Scientific Significance:</strong>
              <p>{features[activeTab].significance}</p>
            </div>
            <div className="detail-box text-heavy context">
              <strong>Evidence & Purpose:</strong>
              <p>{features[activeTab].evidence}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="global-impact-section">
        <h2>🔬 Global Scientific Impact</h2>
        <div className="sig-card">
          <p>
            Before the scientific documentation of Daraki-Chattan and Bhimbetka’s Audny Cave, the global scientific consensus held that symbolic behavior and cognitive art tracking originated exclusively in Europe during the Upper Paleolithic (around 40,000 years ago).
          </p>
          <p>
            The concrete, stratified evidence from Daraki-Chattan completely re-wrote global textbooks. It proved that early hominids in the Indian subcontinent were executing complex, deliberate, and physically demanding symbolic expressions hundreds of thousands of years earlier than previously thought.
          </p>
        </div>
      </section>

      <section className="quiz-section">
        <h2>📝 Test Your Understanding</h2>
        <div className="quiz-card">
          <h3>Scientific Significance</h3>
          <p><strong>Question:</strong> Why did the scientific excavations at Daraki-Chattan dramatically alter the global textbook consensus regarding the origins of human art and symbolic cognition?</p>
          <div className="quiz-answer correct">
            <strong>Correct Answer:</strong> It established that symbolic rock art was created in India over 200,000 years ago during the Lower Paleolithic, long before the European Upper Paleolithic cave art era.
          </div>
        </div>
        <div className="quiz-card">
          <h3>Mechanical Execution</h3>
          <p><strong>Question:</strong> What physical characteristic of the Daraki-Chattan cave wall carvings highlights the immense focus and dedication of its prehistoric creators?</p>
          <div className="quiz-answer correct">
            <strong>Correct Answer:</strong> The cupules were hammered directly into exceptionally hard quartzite rock, requiring tens of thousands of deliberate stone strikes per depression.
          </div>
        </div>
      </section>
    </div>
  );
};

export default DarakiChattanEngravings;
