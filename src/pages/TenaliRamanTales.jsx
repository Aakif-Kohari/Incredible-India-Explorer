import React, { useState } from 'react';
import './TenaliRamanTales.css';

const TenaliRamanTales = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tales = [
    {
      title: "1. Tenali Raman and the Three Thieves",
      narrative: `One summer night, Raman overheard three thieves whispering in his backyard bushes, plotting to burgle his home. Turning to his wife, he spoke loudly enough for the thieves to hear: "My dear, with robberies on the rise, let us hide our gold and valuables in a trunk and drop it into our deep well for safety." He then dragged a heavy iron trunk filled completely with large rocks and dumped it into the well with a loud splash.

The ecstatic thieves spent the entire night drawing bucket after bucket of water from the well to reach the treasure. Raman quietly used the channeled overflow water to irrigate his parched vegetable beds. By dawn, as the completely exhausted thieves hauled up the box only to find smooth river rocks, Raman stepped out and thanked them cheerfully for watering his garden all night. The thieves fled in shame.`,
      lesson: "Resourcefulness transforms a direct threat into an asset. True intelligence lies in remaining calm, reading an adversary's greed, and redirecting their energy to work to your advantage."
    },
    {
      title: "2. The Bricks of Gold and the Royal Cats",
      narrative: `To counter a severe rat infestation in the kingdom, King Krishnadevaraya distributed cats to every household, along with a daily allotment of fresh milk to keep the felines healthy. Rajguru Thathacharya schemed to prove Raman was ungrateful for royal charity.

Raman, knowing that the milk was meant for children rather than well-fed cats, served boiling hot milk to his assigned cat on the very first day. The cat burned its tongue and refused to go near a bowl of milk ever again. During court inspections, while all the other courtiers presented plump cats, Raman presented a lean cat that ran away in terror when the King offered it milk. Enraged, the King demanded an explanation. Raman replied, "Your Majesty, a cat's primary duty is to hunt rats, not lazily drink royal milk." When tested with a room full of mice, Raman's cat hunted aggressively, while the others slept.`,
      lesson: "Blind compliance breeds dependency. Subsidies and charity should never replace core responsibilities or mask underlying institutional inefficiencies."
    },
    {
      title: "3. Counting the Crows in Vijayanagara",
      narrative: `Seeking to stump his ministers, King Krishnadevaraya threw down an impossible question in court: "Exactly how many crows reside within the city limits of our capital, Hampi? If no one answers by tomorrow morning, the entire court will be fined." The ministers fell silent in panic.

The next morning, Tenali Raman smiled confidently and announced: "Your Majesty, there are exactly 47,433 crows in Hampi." Amazed, the King questioned, "How can you be so certain? What if we count them and find your number is wrong?" Raman wittily replied, "If there are more, it means their relatives from neighboring kingdoms are visiting them. If there are fewer, it means our local crows have gone on vacation to visit their relatives outside Vijayanagara." The King laughed and rewarded his clever perspective.`,
      lesson: "When faced with absurd metrics, use creative wit to reframe the problem. Not all tracking parameters require mechanical precision; some require intellectual perspective."
    }
  ];

  return (
    <div className="tenali-container">
      <header className="tenali-hero">
        <h1>👑 The Wit of Vijayanagara Explorer</h1>
        <p className="hero-description">
          Tenali Ramakrishna, popularly known as Tenali Raman, was an Indian poet, scholar, thinker, and special advisor in the court of King Krishnadevaraya of the Vijayanagara Empire (which ruled the southern Deccan region during the 16th century CE). Celebrated for his extraordinary wit, brilliance, and uncanny humor, Raman used satire and intellect to solve complex state issues, expose court corruption, and teach valuable lessons. He stands as a pillar of Indian folklore alongside figures like Birbal.
        </p>
      </header>

      <section className="historical-context">
        <h2>🏛️ Historical Context: The Golden Age of Vijayanagara</h2>
        <p>The tales of Tenali Raman unfold against the backdrop of the majestic Vijayanagara Empire, specifically centered in its brilliant capital city, Hampi.</p>
        <ul>
          <li><strong>The Ruler:</strong> King Krishnadevaraya presided over a flourishing renaissance of art, music, literature, and architecture.</li>
          <li><strong>The Court:</strong> Known as the Bhuvana Vijayam (Conquest of the World), the royal court was patronized by the Ashtadiggajas—eight legendary scholars and poets representing the pillars of literary society, among whom Tenali Raman was the most unconventional and sharp-witted.</li>
        </ul>
      </section>

      <section className="key-characters">
        <h2>👥 Key Characters of the Lore</h2>
        <div className="character-grid">
          <div className="character-card">
            <h3>Tenali Raman</h3>
            <p>The primary protagonist. A brilliant scholar who uses humor, psychological insight, and quick thinking to outsmart greedy courtiers and resolve dilemmas.</p>
          </div>
          <div className="character-card">
            <h3>King Krishnadevaraya</h3>
            <p>The benevolent, powerful, yet occasionally impulsive emperor who respects intellect but frequently tests Raman's resourcefulness.</p>
          </div>
          <div className="character-card">
            <h3>Rajguru Thathacharya</h3>
            <p>The royal priest and chief court scholar. He is proud, highly conservative, and constantly schemes to humiliate Raman, only to end up outwitted himself.</p>
          </div>
          <div className="character-card">
            <h3>The Court Courtiers</h3>
            <p>A group of envious ministers who routinely challenge Raman's standing with impossible tasks.</p>
          </div>
        </div>
      </section>

      <section className="tales-section">
        <h2>📚 Celebrated Tales & Moral Insights</h2>
        <div className="tales-tabs">
          {tales.map((tale, index) => (
            <button 
              key={index} 
              className={\`tab-button \${activeTab === index ? 'active' : ''}\`}
              onClick={() => setActiveTab(index)}
            >
              Tale {index + 1}
            </button>
          ))}
        </div>
        <div className="tale-content">
          <h3>{tales[activeTab].title}</h3>
          <div className="narrative">
            <strong>The Narrative:</strong>
            <p>{tales[activeTab].narrative}</p>
          </div>
          <div className="lesson">
            <strong>The Core Lesson:</strong>
            <p>{tales[activeTab].lesson}</p>
          </div>
        </div>
      </section>

      <section className="interesting-facts">
        <h2>💡 Interesting Facts About Tenali Raman</h2>
        <ul>
          <li><strong>The Title:</strong> He was given the honorary title of "Vikatakavi" by the King, a unique palindrome in Telugu script (Vi-ka-ta-ka-vi), translating to "Clown-Poet" or "Witty Jester-Scholar".</li>
          <li><strong>Literary Contributions:</strong> Beyond his humor, Raman was a masterful classical poet. His epic work, Panduranga Mahatmyam, is recognized as one of the five great linguistic compositions (Pancha Kavyas) of Telugu literature.</li>
          <li><strong>The Name:</strong> He belonged to the village of Tenali in Andhra Pradesh, which became his lifelong moniker when he traveled to the court of Vijayanagara.</li>
        </ul>
      </section>
    </div>
  );
};

export default TenaliRamanTales;
