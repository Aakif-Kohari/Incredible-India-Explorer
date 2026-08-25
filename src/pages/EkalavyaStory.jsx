import React, { useState } from 'react';
import './EkalavyaStory.css';

const EkalavyaStory = () => {
  const [activeTab, setActiveTab] = useState(0);

  const journeySteps = [
    {
      title: "1. The Social Rejection at the Royal Academy",
      content: "Ekalavya sought out Guru Dronacharya, the greatest military preceptor of Hastinapur, begging to be initiated into the art of warfare. However, Drona refused to accept him. As the exclusive teacher to the royal family, Drona was bound by state laws and social codes that prohibited him from training a non-royal forest-dweller alongside princes."
    },
    {
      title: "2. The Clay Idol & Devotion-Driven Practice",
      content: "Undeterred by the rejection, Ekalavya returned to the deep forests. He gathered loose river clay and sculpted a lifelike idol of Dronacharya, establishing the master in his heart. Treating the silent idol as his live guru, he began a grueling daily regimen of self-directed practice. Every morning, he bowed before the earth model, collected his bow, and practiced with absolute focus. Through pure observation, trial, and unshakeable belief, his skills surpassed human limits."
    },
    {
      title: "3. The Barking Dog and the Instantaneous Shot",
      content: "Years later, the Pandava princes traveled to the same forest for a royal hunting expedition. Their hunting dog strayed near Ekalavya's clearing and began barking loudly, disrupting his practice. Without looking back and without causing a single drop of blood or injury, Ekalavya unleashed seven arrows in rapid succession, sealing the dog's open mouth with an intricate web of arrows. When the dog returned to the royal camp, Drona and Arjuna were astonished by this supernatural feat of rapid archery. Tracking the footprints, they discovered a humble forest youth practicing before a clay statue of Drona."
    },
    {
      title: "4. The Guru-Dakshina: The Ultimate Sacrifice",
      content: 'When Drona questioned the boy about his identity and teacher, Ekalavya bowed deeply and pointed to the clay idol, saying, "I am your disciple, Master." Arjuna, witnessing the boy’s superior skill, reminded Drona of his solemn promise that no archer would ever surpass him. Trapped between his oath to the crown, his love for Arjuna, and the ancient rules of mentoring, Drona demanded his Guru-Dakshina (the traditional token of gratitude owed to a teacher upon completing education). He asked for Ekalavya’s right thumb. Without a single moment of hesitation, tear, or regret, Ekalavya drew his knife and severed his own right thumb, placing it at Drona\'s feet—willingly giving up his absolute supremacy as an archer to honor the master who had rejected him.'
    }
  ];

  return (
    <div className="ekalavya-container">
      <header className="ek-hero">
        <h1>🏹 Ekalavya</h1>
        <h2>The Archer Who Learned Without a Teacher</h2>
        <p className="hero-description">
          Ekalavya is one of the most poignant, deeply revered, and ethically complex figures in the ancient Indian epic, the Mahabharata. A young prince of the forest-dwelling Nishadha tribe, Ekalavya possessed an unparalleled passion for archery. Despite being rejected by the royal guru due to the rigid social hierarchies of the era, his absolute dedication led him to achieve mastery through an extraordinary feat of self-learning, sealing his legacy as the ultimate symbol of Guru-Bhakti (devotion to a teacher) and personal grit.
        </p>
      </header>

      <section className="key-characters">
        <h2>👥 Major Characters of the Lore</h2>
        <div className="character-grid">
          <div className="character-card">
            <h3>Ekalavya</h3>
            <p>A brilliant young hunter-prince of the Nishadha tribe whose focus and self-discipline made him the greatest archer of his time.</p>
          </div>
          <div className="character-card">
            <h3>Guru Dronacharya</h3>
            <p>The royal preceptor of military arts for both the Pandava and Kaurava princes. Bound by his oath to the throne and his favorite pupil, he faces an intense moral dilemma.</p>
          </div>
          <div className="character-card">
            <h3>Arjuna</h3>
            <p>The third Pandava prince and Drona’s prized student, who was promised the title of the absolute greatest archer in the world.</p>
          </div>
        </div>
      </section>

      <section className="journey-section">
        <h2>⏳ Chronological Journey of Self-Mastery</h2>
        <div className="journey-flowchart">
          [Social Rejection] ──&gt; [The Clay Idol & Practice] ──&gt; [The Instantaneous Shot] ──&gt; [The Ultimate Sacrifice]
        </div>
        
        <div className="tales-tabs">
          {journeySteps.map((step, index) => (
            <button 
              key={index} 
              className={\`tab-button \${activeTab === index ? 'active' : ''}\`}
              onClick={() => setActiveTab(index)}
            >
              Step {index + 1}
            </button>
          ))}
        </div>
        
        <div className="tale-content">
          <h3>{journeySteps[activeTab].title}</h3>
          <p>{journeySteps[activeTab].content}</p>
        </div>
      </section>

      <section className="ethical-perspectives">
        <h2>⚖️ Ethical Questions & Different Perspectives</h2>
        <p>The tale of Ekalavya is not a simple fable of obedience; it is a profound critique of institutional power and societal boundaries:</p>
        <div className="perspectives-grid">
          <div className="perspective-card">
            <h3>The Traditional Devotion Lens</h3>
            <p>This view celebrates Ekalavya as the peak of spiritual surrender and character. His willingness to sacrifice his life's passion without anger proves that his character was even greater than his legendary archery.</p>
          </div>
          <div className="perspective-card critique">
            <h3>The Critique of Institutional Injustice</h3>
            <p>Modern literary and sociological analyses view Dronacharya’s demand as an act of institutional cruelty designed to protect royal monopoly. It questions the ethics of a teacher demanding a sacrifice from a student he refused to teach, highlighting how systems crush independent merit to preserve dynastic privilege.</p>
          </div>
          <div className="perspective-card strategic">
            <h3>Drona's Strategic Dilemma</h3>
            <p>Some classical commentators argue Drona foresaw that the Nishadha tribe was allied with forces hostile to the kingdom (such as Jarasandha). De-arming Ekalavya was a ruthless political decision to safeguard the future security of the state.</p>
          </div>
        </div>
      </section>

      <section className="cultural-significance">
        <h2>💡 Cultural and Literary Significance</h2>
        <ul className="significance-list">
          <li><strong>The Living Symbol:</strong> Even without his thumb, Ekalavya adapted his technique, learning to shoot using his index and middle fingers. This gave rise to modern finger-based archery holds, cementing his status as the father of modern adaptable archery.</li>
          <li><strong>National Honors:</strong> In India, the government's highest award for outstanding sports coaches is named the Dronacharya Award, while residential schools built to empower tribal students across the nation are proudly named Ekalavya Model Residential Schools (EMRS).</li>
          <li><strong>A Lesson in Autodidactism:</strong> His story serves as the ultimate historical inspiration for self-taught individuals worldwide, proving that a lack of formal access cannot block a dedicated mind.</li>
        </ul>
      </section>
    </div>
  );
};

export default EkalavyaStory;
