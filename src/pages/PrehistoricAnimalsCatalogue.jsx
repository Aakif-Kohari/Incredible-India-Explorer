import React, { useState } from 'react';
import './PrehistoricAnimalsCatalogue.css';

const PrehistoricAnimalsCatalogue = () => {
  const [activeAnimal, setActiveAnimal] = useState(0);

  const animals = [
    {
      name: "Rajasaurus narmadensis",
      subtitle: "The Princely Lizard of Narmada",
      period: "Late Cretaceous (~70 to 66 Million Years Ago)",
      location: "Lameta Formation along the Narmada River Valley (Rahioli, Gujarat & Jabalpur, Madhya Pradesh)",
      size: "Stood roughly 2.4 meters tall, stretched 9 meters in length, and weighed around 4 tonnes.",
      anatomy: "A heavy-bodied, carnivorous theropod (abelisaurid) distinguished by an unusual, low rounded horn crown atop its skull. It was the apex predator of its ecosystem, hunting in warm, marshy riverine corridors and coastal estuaries.",
      significance: "Its discovery proves that the Indian plate maintained a distinctive, isolated biological evolutionary nursery while drifting away from Gondwana."
    },
    {
      name: "Sivatherium giganteum",
      subtitle: "The Giant Beast of Shiva",
      period: "Pliocene to Late Pleistocene (~5 Million to 100,000 Years Ago)",
      location: "The Shivalik Hills foothills (Himachal Pradesh and Jammu & Kashmir)",
      size: "Stood over 2.2 meters tall at the shoulder, with total heights crossing 3 meters, weighing nearly 1.5 tonnes.",
      anatomy: "The largest relative of modern giraffes ever known to exist. It possessed a heavy, moose-like body profile and featured two massive, branching ossicones (horn-like structures) expanding from its skull. It grazed on mixed shrublands and savannas bordering the early sub-Himalayan plains.",
      significance: "It links ancient African giraffe lines with the migration bridges that connected India to Eurasia."
    },
    {
      name: "Palaeoloxodon namadicus",
      subtitle: "The Colossal Narmada Elephant",
      period: "Middle to Late Pleistocene (~500,000 to 50,000 Years Ago)",
      location: "Ancient river gravel banks of the Narmada Valley (Madhya Pradesh)",
      size: "Shoulder heights crossing 5 to 5.2 meters, with weight boundaries scaling up to 22 tonnes.",
      anatomy: "Universally recognized as one of the largest land mammals to ever walk the earth—more than triple the mass of a modern African elephant. It featured straight, thick tusks and adapted its massive skeletal frame to navigate the highly productive Pleistocene savannas and riverine forests of central India.",
      significance: "Highlights the hyper-favorable ecological productivity of India’s ancient grassland corridors before the arrival of modern climates."
    },
    {
      name: "Hyperodapedon",
      subtitle: "The Triassic Beaked Reptile",
      period: "Late Triassic (~230 to 220 Million Years Ago)",
      location: "Maleri and Tiki Formations (Pranhita-Godavari Basin, Telangana & Madhya Pradesh)",
      size: "Stood short and stocky, measuring about 1.3 meters in length and weighing around 40 kg.",
      anatomy: "A specialized, thick-bodied reptile (rhynchosaur) featuring a sharp, downward-curving beak and rows of crushing dental plates. It burrowed and fed on tough seed ferns in vast, low-lying alluvial plains before dinosaurs rose to dominance.",
      significance: "Shows the early diversification of reptiles in the Indian subcontinent prior to the dominance of dinosaurs."
    }
  ];

  return (
    <div className="catalogue-container">
      <header className="catalogue-hero">
        <h1>🦣 Prehistoric Animals of India</h1>
        <h2>An Interactive Catalogue</h2>
        <p className="hero-description">
          Explore the fascinating array of extinct creatures that once roamed the Indian subcontinent, from apex dinosaur predators to the largest land mammals in Earth's history.
        </p>
      </header>

      <section className="timeline-section">
        <h2>⏳ The deep-Time Indian Paleontological Timeline</h2>
        <div className="timeline-flow">
          <div className="timeline-item" onClick={() => setActiveAnimal(3)}>
            <span className="time">220M Years Ago: Triassic</span>
            <span className="event">Hyperodapedon (Rhynchosaur)</span>
          </div>
          <div className="timeline-item" onClick={() => setActiveAnimal(0)}>
            <span className="time">70M Years Ago: Cretaceous</span>
            <span className="event">Rajasaurus narmadensis</span>
          </div>
          <div className="timeline-item" onClick={() => setActiveAnimal(1)}>
            <span className="time">15M Years Ago: Miocene</span>
            <span className="event">Sivatherium giganteum</span>
          </div>
          <div className="timeline-item" onClick={() => setActiveAnimal(2)}>
            <span className="time">100,000 Years Ago: Pleistocene</span>
            <span className="event">Palaeoloxodon namadicus</span>
          </div>
        </div>
      </section>

      <section className="catalogue-section">
        <h2>🦖 The Interactive Prehistoric Animals Catalogue</h2>
        <div className="animal-tabs">
          {animals.map((animal, index) => (
            <button 
              key={index} 
              className={\`tab-button \${activeAnimal === index ? 'active' : ''}\`}
              onClick={() => setActiveAnimal(index)}
            >
              {animal.name.split(' ')[0]}
            </button>
          ))}
        </div>
        
        <div className="animal-content">
          <h3>{animals[activeAnimal].name}</h3>
          <h4>{animals[activeAnimal].subtitle}</h4>
          
          <div className="animal-details-grid">
            <div className="detail-box period">
              <strong>Geological Period:</strong>
              <p>{animals[activeAnimal].period}</p>
            </div>
            <div className="detail-box location">
              <strong>Fossil Locations:</strong>
              <p>{animals[activeAnimal].location}</p>
            </div>
            <div className="detail-box size">
              <strong>Size Dimensions:</strong>
              <p>{animals[activeAnimal].size}</p>
            </div>
          </div>
          
          <div className="detail-box text-heavy">
            <strong>Anatomy & Habitat:</strong>
            <p>{animals[activeAnimal].anatomy}</p>
          </div>
          <div className="detail-box text-heavy sig">
            <strong>Scientific Significance:</strong>
            <p>{animals[activeAnimal].significance}</p>
          </div>
        </div>
      </section>

      <section className="quiz-section">
        <h2>📝 Test Your Understanding</h2>
        <div className="quiz-card">
          <h3>Abelisaurid Distribution</h3>
          <p><strong>Question:</strong> Why is the discovery of the horned predatory dinosaur 'Rajasaurus narmadensis' in Gujarat of immense importance to scientists tracking continental drift?</p>
          <div className="quiz-answer correct">
            <strong>Correct Answer:</strong> Its close anatomical links to abelisaurids in Madagascar and South America prove these landmasses were once fused as part of Gondwana.
          </div>
        </div>
        <div className="quiz-card">
          <h3>Shivalik Megafauna</h3>
          <p><strong>Question:</strong> The giant fossil animal 'Sivatherium giganteum', discovered in the sub-Himalayan Shivalik Hills, represents a massive prehistoric member of which modern mammal family?</p>
          <div className="quiz-answer correct">
            <strong>Correct Answer:</strong> The giraffe family (Giraffidae), despite having short necks and heavy, moose-like horn antlers.
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrehistoricAnimalsCatalogue;
