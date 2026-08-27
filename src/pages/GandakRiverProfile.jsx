import React, { useState } from 'react';
import './GandakRiverProfile.css';

const GandakRiverProfile = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "1. Origin & Alpine Course",
      content: "The river rises at an altitude of approximately 6,268 metres in the Nhubine Himal Glacier within the Mustang region of Nepal, close to the Tibet border. In its upper mountain course, it is called the Kali Gandaki. It flows south between two 8,000-metre massifs—Annapurna and Dhaulagiri—carving out the Kali Gandaki Gorge. Measuring over 5,500 metres deep, it stands as one of the deepest gorges on Earth."
    },
    {
      title: "2. Nepal-Bihar Connection",
      content: "The river exits the Himalayan foothills and enters the flat plains of India at Valmikinagar in the West Champaran district of Bihar, India. Upon crossing the frontier, it directly flanks the Valmiki National Park and Tiger Reserve, supporting a highly sensitive riparian ecosystem. Under a joint treaty between India and Nepal, a massive international barrage controls transboundary water shares, seasonal flood defense, and irrigation distribution."
    },
    {
      title: "3. Etymology & Names",
      content: "Narayani: In the lowlands of Nepal, it is called the Narayani. Its rocky bed is the exclusive source of Shaligrams—black, fossilized ammonite stones. Sadanira: In ancient Vedic texts, the river is named Sadanira ('always full of water'). The Great Gandak: Historically distinguished from the Burhi ('Old') Gandak, an older, parallel paleochannel located further to the east."
    },
    {
      title: "4. Tributaries",
      content: "Before reaching the plains, seven major alpine mountain branches converge in central Nepal to form the main stem, known locally as the Sapta Gandaki ('Seven Gandaks'): Trishuli, Marsyangdi, Seti Gandaki, Budhi Gandaki, Kali Gandaki, Madi, and Daraudi."
    },
    {
      title: "5. Confluence with Ganga",
      content: "After traversing 630 kilometres (380 km in Nepal, 250 km in Bihar), the Gandak joins the Ganga River near Hajipur and Sonpur, directly opposite Patna. This convergence point hosts the ancient Sonpur Harihar Kshetra Mela every November during Kartik Poornima."
    },
    {
      title: "6. Agricultural Infrastructure",
      content: "The Valmikinagar Barrage feeds two key networks: the Triveni (Western) Canal and the Eastern Gandak Canal. These channels distribute water to millions of hectares across West Champaran, East Champaran, Gopalganj, Siwan, Saran, Muzaffarpur, and Vaishali. The consistent supply of silt-rich water fuels heavy yields of cash crops like sugarcane, paddy (rice), wheat, and tobacco."
    },
    {
      title: "7. Silt-Loading & Floods",
      content: "The river shifts abruptly from steep mountain gradients into flat agricultural plains. This drop in speed causes massive volumes of Himalayan silt to settle, raising the riverbed. The shallow, elevated bed causes lateral course changes. During intense monsoonal downpours, the overflowing river frequently breaches banks, causing seasonal flooding across rural North Bihar."
    }
  ];

  return (
    <div className="gandak-container">
      <header className="gandak-hero">
        <h1>🌊 The Gandak River</h1>
        <h2>From Himalayas to the Ganga</h2>
        <p className="hero-description">
          The Gandak River is one of the major transboundary rivers of India and Nepal, acting as a critical northern tributary of the Ganga. It cuts through the high mountains to form deep canyons before feeding vast irrigation grids across the northern plains.
        </p>
      </header>

      <section className="profile-section">
        <div className="tabs-container">
          <div className="tabs-sidebar">
            {tabs.map((tab, index) => (
              <button 
                key={index} 
                className={\`tab-button \${activeTab === index ? 'active' : ''}\`}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </button>
            ))}
          </div>
          
          <div className="tab-content">
            <h3>{tabs[activeTab].title}</h3>
            <p>{tabs[activeTab].content}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GandakRiverProfile;
