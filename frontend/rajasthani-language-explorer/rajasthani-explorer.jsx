import React, { useState } from "react";
import { Volume2, ArrowRight, ArrowLeft, BookOpen, Map, Users, Sparkles } from "lucide-react";

const FONTS = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Noto+Sans+Devanagari:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap');

    .raj-root { font-family: 'Poppins', sans-serif; color: #2B2420; background: #F7F1E3; }
    .raj-deva { font-family: 'Noto Sans Devanagari', sans-serif; }
    .raj-display { font-family: 'Yatra One', cursive; letter-spacing: 0.02em; }

    .raj-arch {
      border-radius: 140px 140px 12px 12px;
      background: #1E2A45;
      position: relative;
    }
    .raj-dotborder {
      background-image: radial-gradient(circle, #E2963C 1.5px, transparent 1.6px);
      background-size: 14px 14px;
    }
    .raj-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
    .raj-scrollbar::-webkit-scrollbar-thumb { background: #C7A968; border-radius: 4px; }

    .raj-btn {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: transform 0.15s ease, opacity 0.15s ease;
    }
    .raj-btn:hover { opacity: 0.9; }
    .raj-btn:active { transform: scale(0.97); }

    .raj-soundbtn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(226,150,60,0.15);
      color: #E2963C;
      border: 1px solid rgba(226,150,60,0.4);
      border-radius: 999px;
      padding: 6px 14px;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
    }
    .raj-soundbtn:hover { background: rgba(226,150,60,0.28); }
    .raj-soundbtn:disabled { opacity: 0.4; cursor: not-allowed; }

    .raj-fade-in { animation: rajFadeIn 0.4s ease both; }
    @keyframes rajFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

    @media (max-width: 640px) {
      .raj-grid2 { grid-template-columns: 1fr !important; }
      .raj-grid3 { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

const WORDS = [
  { deva: "पाणी", translit: "pāṇī", meaning: "water" },
  { deva: "रोटी", translit: "roṭī", meaning: "bread / flatbread" },
  { deva: "घर", translit: "ghar", meaning: "house, home" },
  { deva: "हां", translit: "hāṅ", meaning: "yes" },
  { deva: "कोनी", translit: "koṇī", meaning: "no" },
  { deva: "छोरो / छोरी", translit: "choro / chorī", meaning: "boy / girl" },
  { deva: "सा", translit: "sā", meaning: "respectful suffix added after a name or greeting" },
  { deva: "घणी", translit: "ghaṇī", meaning: "a lot, very much" },
];

const DIALECTS = [
  { name: "Marwari", region: "Western Rajasthan — Jodhpur, Bikaner, Jaisalmer, Barmer", note: "The most widely spoken Rajasthani variety and its de facto lingua franca." },
  { name: "Dhundhari (Jaipuri)", region: "East-central Rajasthan — Jaipur, Dausa, Tonk, Ajmer", note: "Second most spoken; shows some lexical closeness to Gujarati." },
  { name: "Mewari", region: "Southern Rajasthan — Udaipur, Chittorgarh", note: "Has hill (pahadi) and plains (maidani) varieties." },
  { name: "Mewati", region: "Northeastern Rajasthan, bordering Haryana", note: "Blends toward Braj Bhasha near the Uttar Pradesh border." },
  { name: "Hadauti (Harauti)", region: "Southeastern Rajasthan — Kota, Bundi, Jhalawar", note: "Named after the historic Hada Chauhan region." },
  { name: "Shekhawati", region: "Northeastern Rajasthan — Jhunjhunu, Sikar", note: "Spoken across the Shekhawati haveli-painting belt." },
  { name: "Malvi", region: "Southeastern Rajasthan and the Malwa plateau of Madhya Pradesh", note: "Bridges Rajasthani with the languages of central India." },
  { name: "Bagri", region: "Northern Rajasthan and adjoining Punjab / Haryana", note: "Spoken near Hanumangarh and Sri Ganganagar." },
];

const SOURCES = [
  { label: "Rajasthani languages — Wikipedia", url: "https://en.wikipedia.org/wiki/Rajasthani_languages" },
  { label: "Marwari language — Wikipedia", url: "https://en.wikipedia.org/wiki/Marwari_language" },
  { label: "Rājasthānī languages — Encyclopaedia Britannica", url: "https://www.britannica.com/topic/Rajasthani-languages" },
  { label: "Khamma Ghani: Origins and Significance — Linguistica Indica", url: "https://avtans.com/2026/03/17/khamma-ghani-origins-and-significance-explored/" },
  { label: "Vijaydan Detha — Wikipedia", url: "https://en.wikipedia.org/wiki/Vijaydan_Detha" },
];

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const hindiVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("hi"));
  if (hindiVoice) u.voice = hindiVoice;
  u.lang = "hi-IN";
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

function SoundButton({ text, label }) {
  const [supported] = useState(typeof window !== "undefined" && "speechSynthesis" in window);
  return (
    <button className="raj-soundbtn" disabled={!supported} onClick={() => speak(text)} title={supported ? "Hear a Hindi-voice approximation" : "Speech playback isn't supported in this browser"}>
      <Volume2 size={14} />
      {label || "Listen"}
    </button>
  );
}

function LandingCard({ onExplore }) {
  return (
    <div className="raj-root raj-fade-in" style={{ maxWidth: 420, borderRadius: 20, overflow: "hidden", border: "1px solid #E4D3A8", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <div style={{ background: "#1E2A45", padding: "28px 24px 22px", position: "relative" }} className="raj-dotborder">
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(30,42,69,0.55), rgba(30,42,69,0.92))" }} />
        <div style={{ position: "relative" }}>
          <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E2963C", fontWeight: 600 }}>Language of the Thar</p>
          <h2 className="raj-display" style={{ margin: "6px 0 2px", fontSize: 30, color: "#F7F1E3" }}>Rajasthani</h2>
          <p className="raj-deva" style={{ margin: 0, fontSize: 22, color: "#E4D3A8" }}>राजस्थानी</p>
        </div>
      </div>
      <div style={{ padding: "20px 24px 24px" }}>
        <p style={{ margin: "0 0 16px", fontSize: 14, lineHeight: 1.6, color: "#5A4E3E" }}>
          A family of Western Indo-Aryan speech varieties spoken by over 50 million people
          across Rajasthan and its borderlands — from the deserts of Marwar to the havelis of Shekhawati.
        </p>
        <div style={{ display: "flex", gap: 16, marginBottom: 20, fontSize: 12, color: "#8A7A5C" }}>
          <span><strong style={{ color: "#7C2B3B" }}>8+</strong> dialects</span>
          <span><strong style={{ color: "#7C2B3B" }}>52.7M</strong> speakers</span>
          <span><strong style={{ color: "#7C2B3B" }}>Devanagari</strong> script</span>
        </div>
        <button className="raj-btn" onClick={onExplore} style={{ width: "100%", padding: "12px 16px", borderRadius: 999, background: "#7C2B3B", color: "#F7F1E3", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          Explore Rajasthani <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, children }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <Icon size={18} color="#7C2B3B" />
        <h3 className="raj-display" style={{ margin: 0, fontSize: 19, color: "#1E2A45" }}>{title}</h3>
      </div>
      {children}
    </section>
  );
}

function Explorer({ onBack }) {
  return (
    <div className="raj-root raj-fade-in" style={{ maxWidth: 720, padding: 0 }}>
      <button className="raj-btn" onClick={onBack} style={{ background: "none", color: "#7C2B3B", fontSize: 13, display: "flex", alignItems: "center", gap: 6, padding: "4px 0", marginBottom: 18 }}>
        <ArrowLeft size={15} /> Back to card
      </button>

      <div className="raj-dotborder" style={{ background: "#1E2A45", borderRadius: 20, padding: "30px 26px", marginBottom: 32, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(30,42,69,0.5), rgba(30,42,69,0.94))" }} />
        <div style={{ position: "relative" }}>
          <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E2963C", fontWeight: 600 }}>Discover</p>
          <h1 className="raj-display" style={{ margin: "6px 0 4px", fontSize: 32, color: "#F7F1E3" }}>Rajasthani</h1>
          <p className="raj-deva" style={{ margin: "0 0 10px", fontSize: 24, color: "#E4D3A8" }}>राजस्थानी</p>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "#C9BFA6", maxWidth: 520 }}>
            A cluster of Western Indo-Aryan language varieties native to Rajasthan, spoken by
            over 50 million people and carrying centuries of desert folklore, bardic poetry, and
            regional pride.
          </p>
        </div>
      </div>

      <Section icon={Sparkles} title="Greeting">
        <div className="raj-arch" style={{ padding: "34px 24px 22px", textAlign: "center" }}>
          <p className="raj-deva" style={{ margin: 0, fontSize: 30, color: "#F7F1E3", fontWeight: 700 }}>खम्मा घणी</p>
          <p style={{ margin: "6px 0 2px", fontSize: 15, color: "#E2963C", fontWeight: 600 }}>Khamma Ghani</p>
          <p style={{ margin: "0 0 14px", fontSize: 13, color: "#C9BFA6" }}>pronounced roughly <em>khum-maa gha-nee</em></p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <SoundButton text="खम्मा घणी" label="Listen" />
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "#E4D3A8", lineHeight: 1.6, maxWidth: 380, marginInline: "auto" }}>
            Traditionally offered with folded hands and a slight bow. <strong style={{ color: "#F7F1E3" }}>Khamma</strong> traces
            to Sanskrit for respect and well-wishing, and <strong style={{ color: "#F7F1E3" }}>ghaṇī</strong> means
            "a lot" — together, "many greetings." The customary reply is <span className="raj-deva">घणी खम्मा</span> (ghaṇī khammā).
          </p>
        </div>
      </Section>

      <Section icon={BookOpen} title="Common words">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="raj-grid2">
          {WORDS.map((w) => (
            <div key={w.translit} style={{ background: "#FFFDF7", border: "1px solid #E4D3A8", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div>
                <p className="raj-deva" style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "#1E2A45" }}>{w.deva}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#8A7A5C" }}>{w.translit} · {w.meaning}</p>
              </div>
              <SoundButton text={w.deva} label="" />
            </div>
          ))}
        </div>
      </Section>

      <Section icon={Users} title="Language family">
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, fontSize: 12.5, color: "#5A4E3E" }}>
          {["Indo-European", "Indo-Iranian", "Indo-Aryan", "Western Indo-Aryan", "Rajasthani"].map((step, i, arr) => (
            <React.Fragment key={step}>
              <span style={{ background: i === arr.length - 1 ? "#7C2B3B" : "#EDE0C0", color: i === arr.length - 1 ? "#F7F1E3" : "#5A4E3E", padding: "5px 11px", borderRadius: 999, fontWeight: 600 }}>{step}</span>
              {i < arr.length - 1 && <ArrowRight size={13} color="#B9A87D" />}
            </React.Fragment>
          ))}
        </div>
        <p style={{ marginTop: 14, fontSize: 13, lineHeight: 1.7, color: "#5A4E3E" }}>
          Rajasthani descends from Shauraseni Prakrit and is traditionally written in the
          Devanagari script, though a historic Mahajani (Modiya) script was once used by
          merchant communities. It is spoken across Rajasthan and spills into neighbouring
          Haryana, Gujarat, the Malwa and Nimar regions of Madhya Pradesh, Pakistan's Bahawalpur
          division, and Sindh — carried further afield by generations of Marwari traders.
        </p>
      </Section>

      <Section icon={Map} title="Regional diversity">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="raj-grid2">
          {DIALECTS.map((d) => (
            <div key={d.name} style={{ border: "1px solid #E4D3A8", borderRadius: 12, padding: "12px 14px", background: "#FFFDF7" }}>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: "#7C2B3B" }}>{d.name}</p>
              <p style={{ margin: "3px 0 6px", fontSize: 11.5, color: "#8A7A5C" }}>{d.region}</p>
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: "#5A4E3E" }}>{d.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={BookOpen} title="Literature and culture">
        <p style={{ fontSize: 13, lineHeight: 1.75, color: "#5A4E3E", margin: "0 0 12px" }}>
          Rajasthani's literary voice grew out of the <strong>Charani</strong> bardic tradition,
          split broadly into <strong>Dingal</strong> — vigorous heroic poetry praising Rajput
          valour — and <strong>Pingal</strong>, its more lyrical counterpart. The best-known
          performance tradition is the <strong>phad</strong>: a long painted scroll depicting a
          folk deity's life, sung by <strong>Bhopa</strong> performers to the sound of a
          ravanhatha fiddle. <strong>Pabuji ki Phad</strong>, recounting the folk hero-deity
          Pabuji, is the most celebrated of these epics.
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.75, color: "#5A4E3E", margin: 0 }}>
          In the modern era, writer <strong>Vijaydan Detha</strong> ("Bijji") built{" "}
          <em>Bataan ri Phulwari</em>, a fourteen-volume collection retelling Rajasthani folk
          tales, and co-founded Rupayan Sansthan to document the region's oral heritage. India's
          Sahitya Akademi recognises Rajasthani for its own literary awards, even though the
          language is not yet included in the Eighth Schedule of the Constitution — a status
          long sought by language activists in the state.
        </p>
      </Section>

      <section>
        <h3 style={{ fontSize: 13, color: "#8A7A5C", fontWeight: 600, marginBottom: 8 }}>Sources</h3>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: 1.9 }}>
          {SOURCES.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer" style={{ color: "#7C2B3B" }}>{s.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default function RajasthaniExplorer() {
  const [view, setView] = useState("landing");
  return (
    <div style={{ minHeight: 400, display: "flex", justifyContent: "center", padding: "24px 16px", background: "#F7F1E3" }}>
      {FONTS}
      {view === "landing" ? (
        <LandingCard onExplore={() => setView("explorer")} />
      ) : (
        <Explorer onBack={() => setView("landing")} />
      )}
    </div>
  );
}
