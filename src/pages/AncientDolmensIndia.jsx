import React, { useState } from 'react';
import './AncientDolmensIndia.css';

const AncientDolmensIndia = () => {
  const [activeLocation, setActiveLocation] = useState(0);

  const locations = [
    {
      name: "Marayoor, Kerala (The Muniyaras)",
      description: "Marayoor in the Idukki district is famous for its dense concentration of dolmens, known locally as 'Muniyaras' (dwellings of the sages). Scattered across the rocky hills, these dolmens overlook the lush Western Ghats and are a testament to ancient Iron Age settlements in the region."
    },
    {
      name: "Hire Benakal, Karnataka",
      description: "One of the most spectacular megalithic sites in India, Hire Benakal features hundreds of dolmens. The site contains port-holed chambers and massive capstones, some weighing several tons, showcasing the incredible cooperative effort of the ancient communities."
    },
    {
      name: "Pandavula Gutta, Telangana",
      description: "This site not only features dolmenoid cists but also boasts prehistoric rock art. The association with the Pandavas is strong here, highlighting how prehistoric structures were later woven into living Hindu mythology."
    },
    {
      name: "Northeast India (Meghalaya and Manipur)",
      description: "The tradition of erecting megaliths continued much later in Northeast India. The Khasi and Jaintia hills of Meghalaya are dotted with monoliths and dolmens erected to honor ancestors."
    }
  ];

  return (
    <div className="dolmens-container">
      <header className="dolmens-hero">
        <h1>🪨 Explore India's Ancient Dolmens</h1>
        <h2>Megalithic Stone Guardians</h2>
        <p className="hero-description">
          India is home to an incredible array of megalithic structures, the most fascinating of which are the ancient dolmens. These large stone monuments are part of India's rich prehistoric tapestry, dotting the landscape from the southern states up to the northeast.
        </p>
      </header>

      <section className="definition-section">
        <div className="card-box">
          <h2>What is a Dolmen?</h2>
          <p>
            A dolmen is a type of single-chamber megalithic tomb, usually consisting of two or more vertical megaliths supporting a large flat horizontal capstone or "table." The word "dolmen" itself has origins in the Breton language, meaning "stone table." In India, these structures are often referred to locally by various names such as <em>Muniyara</em> in Kerala or <em>Pandavan Para</em> across different regions, often associated in local folklore with the Pandavas from the Mahabharata.
          </p>
        </div>
        <div className="card-box context">
          <h2>Archaeological Context and Chronology</h2>
          <p>
            The dolmens in India primarily date back to the <strong>Megalithic period (Iron Age)</strong>, spanning roughly from 1500 BCE to 500 CE. These structures were predominantly used for funerary or memorial purposes.
          </p>
          <ul>
            <li>Iron implements (weapons and tools)</li>
            <li>Black and red ware pottery</li>
            <li>Human skeletal remains or secondary burials (urns)</li>
            <li>Beads and ornaments</li>
          </ul>
        </div>
      </section>

      <section className="construction-section">
        <h2>Construction Styles</h2>
        <div className="style-grid">
          <div className="style-card">
            <h3>Orthostats and Capstones</h3>
            <p>They typically consist of massive orthostats (upright stones) forming a square or rectangular chamber, topped with a colossal capstone.</p>
          </div>
          <div className="style-card">
            <h3>Porthole Dolmens</h3>
            <p>Many South Indian dolmens feature a distinct circular "porthole" carved into one of the vertical slabs. This was likely used to introduce secondary offerings or remains.</p>
          </div>
          <div className="style-card">
            <h3>Cist Burials</h3>
            <p>Dolmens are sometimes half-buried (cists) or surrounded by a stone circle (cairn circles).</p>
          </div>
        </div>
      </section>

      <section className="locations-section">
        <h2>📍 Major Locations Across India</h2>
        <div className="locations-tabs">
          {locations.map((loc, index) => (
            <button 
              key={index} 
              className={\`tab-button \${activeLocation === index ? 'active' : ''}\`}
              onClick={() => setActiveLocation(index)}
            >
              {loc.name.split(',')[0]}
            </button>
          ))}
        </div>
        
        <div className="location-content">
          <h3>{locations[activeLocation].name}</h3>
          <p>{locations[activeLocation].description}</p>
        </div>
      </section>

      <section className="scientific-section">
        <h2>🔬 Scientific Significance</h2>
        <div className="sig-card">
          <p>
            The dolmens of India provide crucial insights into the socio-economic structure of Iron Age communities. The sheer effort required to quarry, transport, and erect these massive stones indicates a highly organized society with shared spiritual or ancestral beliefs. The alignment of some dolmens also hints at early astronomical knowledge.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AncientDolmensIndia;
