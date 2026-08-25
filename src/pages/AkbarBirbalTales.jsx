import React, { useState } from 'react';
import './AkbarBirbalTales.css';

const AkbarBirbalTales = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tales = [
    {
      title: "1. The Broken Pot of Wisdom",
      problem: `Enraged by a minor disagreement, Emperor Akbar banished Birbal from Agra. Soon after, the Emperor missed his friend's council and ordered his guards to find him, but Birbal had vanished under a disguise. To locate him, Akbar sent a royal decree to neighboring kingdoms: "Send us a pot filled completely with wisdom, or pay a massive chest of gold in fine." Most kingdoms despaired at the absurd request, but one village where Birbal was hiding quietly accepted the challenge.`,
      solution: `Birbal took an empty clay pot, placed it over a tiny, growing pumpkin on a vine, and left it untouched for weeks. As the pumpkin grew, it filled the entire interior space of the pot. Birbal carefully severed the vine, sealed the pot, and sent it to Agra with a message: "Here is your pot of wisdom. You must extract the wisdom completely without breaking the pot or damaging the fruit." Akbar immediately recognized Birbal's signature wit and sent a royal escort to bring him home.`,
      lesson: "True wisdom is identifying creative, out-of-the-box paths to neutralize unreasonable demands. Do not waste energy fighting an absurd premise; match its logic instead."
    },
    {
      title: "2. The True Owner of the Mango Tree",
      problem: `Two brothers, Ram and Shyam, dragged a dispute before the court. Both claimed ownership of a single, highly valuable mango tree loaded with sweet, ripe fruit. Neighbors gave conflicting accounts, and there were no written land deeds. The court was deadlocked until Akbar handed the case to Birbal.`,
      solution: `Birbal listened to the arguments, then calmly announced: "Since we cannot determine the true owner, let the soldiers cut the tree down, divide the wood exactly in half, and split the harvested mango fruit evenly between the brothers."
Hearing this, Shyam eagerly agreed, praising the absolute fairness of the judgment. Ram, however, burst into tears and pleaded: "Your Majesty, do not destroy the tree! I have nurtured it from a sapling for ten years. Let Shyam take the tree and all its fruit—just please let it live!" Birbal smiled, halted the soldiers, and declared Ram the true owner, punishing Shyam for his greed.`,
      lesson: "True ownership and love are defined by a willingness to protect and sacrifice, not destroy. Greed exposes itself when it values division over preservation."
    },
    {
      title: "3. The Just Reward of Whacks",
      problem: `A poor, elderly scholar traveled from a distant village to present a beautiful, custom-written poem to Emperor Akbar. However, the greedy royal palace gatekeeper refused to let him enter unless the scholar signed a binding contract promising to give the guard exactly half of whatever reward the Emperor granted. The scholar agreed and entered. Akbar was deeply moved by the poem and asked, "What reward do you seek from the empire?" The scholar replied, "Your Majesty, I request exactly one hundred whacks from your stick."`,
      solution: `The court was shocked, assuming the old man had lost his mind. Birbal, sensing a deeper story, stepped forward and whispered to the King to proceed gently. When the scholar had received fifty light strikes, he called a halt and announced: "Stop! I must now fulfill my contract. The palace gatekeeper demanded exactly half of my reward before allowing me inside." The corrupt guard was immediately dragged into court and given the remaining fifty hard lashes, while the clever scholar was rewarded with gold.`,
      lesson: "Greed creates its own trap. Those who exploit others for unearned gain will eventually be forced to share the negative consequences of their actions."
    }
  ];

  return (
    <div className="akbar-birbal-container">
      <header className="ab-hero">
        <h1>👑 The Wisdom of the Mughal Court</h1>
        <p className="hero-description">
          Mahesh Das, universally remembered as Birbal, was a brilliant courtier, poet, and trusted advisor in the royal court of the third Mughal Emperor, Akbar the Great, who ruled over the Indian subcontinent during the 16th century CE. Celebrated for his lightning-fast wit, deep psychological insight, and razor-sharp logic, Birbal served as one of the Emperor's Navratnas (Nine Jewels). He used humor and unmatched problem-solving skills to resolve complex legal disputes, smooth over royal impetuosity, and defuse court rivalries.
        </p>
      </header>

      <section className="historical-context">
        <h2>🏛️ Historical Context vs. Traditional Folklore</h2>
        <p>When exploring these timeless tales, it is essential to distinguish between documented court histories and oral storytelling traditions:</p>
        <div className="context-cards">
          <div className="context-card">
            <h3>The Historical Reality</h3>
            <p>Official contemporary texts like the Akbarnama (Book of Akbar) and the Ain-i-Akbari document Mahesh Das as a highly respected military commander, diplomat, and close personal friend of Akbar who eventually perished in battle.</p>
          </div>
          <div className="context-card">
            <h3>The Folklore Tradition</h3>
            <p>Over centuries, oral storytelling transformed Birbal into a witty, comedic folk hero. This dynamic mirrors the traditional "wise jester" archetype, designed to check absolute monarchical power with humor and grassroots logic.</p>
          </div>
        </div>
      </section>

      <section className="key-characters">
        <h2>👥 Key Characters of the Lore</h2>
        <div className="character-grid">
          <div className="character-card">
            <h3>Emperor Akbar</h3>
            <p>The powerful, naturally curious, and occasionally short-tempered ruler who loves testing the intellect of his courtiers with cryptic puzzles.</p>
          </div>
          <div className="character-card">
            <h3>Birbal</h3>
            <p>The sharp-witted advisor who uses simple metaphors, clever logical traps, and common sense to find justice where raw power fails.</p>
          </div>
          <div className="character-card">
            <h3>Courtiers & Ministers</h3>
            <p>Envious rivals (like Mullah Do-Piyaza) who frequently concoct impossible traps to undermine Birbal's standing, only to have their schemes turned against them.</p>
          </div>
        </div>
      </section>

      <section className="tales-section">
        <h2>📚 Celebrated Tales: Problems & Solutions</h2>
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
          
          <div className="problem-box">
            <strong>The Problem:</strong>
            <p>{tales[activeTab].problem}</p>
          </div>
          
          <div className="solution-box">
            <strong>Birbal's Solution:</strong>
            <p>{tales[activeTab].solution}</p>
          </div>
          
          <div className="lesson-box">
            <strong>The Core Lesson:</strong>
            <p>{tales[activeTab].lesson}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AkbarBirbalTales;
