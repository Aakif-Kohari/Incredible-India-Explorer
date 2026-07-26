/**
 * ragas-time-explainer.js
 * How Indian Classical Ragas Work (Time-of-Day Theory) - Dataset & Animated Clock Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// 8 Prahars of the Traditional 24-Hour Samaya Chakra System
export const prahars = [
  { id: "p1", name: "1st Prahar of Day", timeRange: "6:00 AM – 9:00 AM", period: "Morning / Sunrise", angleDeg: 0, color: "#f97316" },
  { id: "p2", name: "2nd Prahar of Day", timeRange: "9:00 AM – 12:00 PM", period: "Late Morning", angleDeg: 45, color: "#eab308" },
  { id: "p3", name: "3rd Prahar of Day", timeRange: "12:00 PM – 3:00 PM", period: "Midday / Afternoon", angleDeg: 90, color: "#f59e0b" },
  { id: "p4", name: "4th Prahar of Day", timeRange: "3:00 PM – 6:00 PM", period: "Late Afternoon", angleDeg: 135, color: "#d97706" },
  { id: "p5", name: "1st Prahar of Night", timeRange: "6:00 PM – 9:00 PM", period: "Dusk / Evening (Sandhiprakash)", angleDeg: 180, color: "#8b5cf6" },
  { id: "p6", name: "2nd Prahar of Night", timeRange: "9:00 PM – 12:00 AM", period: "Late Evening", angleDeg: 225, color: "#6366f1" },
  { id: "p7", name: "3rd Prahar of Night", timeRange: "12:00 AM – 3:00 AM", period: "Midnight (Mahanisitha)", angleDeg: 270, color: "#3b82f6" },
  { id: "p8", name: "4th Prahar of Night", timeRange: "3:00 AM – 6:00 AM", period: "Pre-Dawn / Transition", angleDeg: 315, color: "#ec4899" }
];

// Musicological Principles Explaining How Ragas Function
export const musicologyPillars = [
  {
    title: "Swaras (Seven Microtonal Pitches)",
    icon: "🎼",
    description: "The seven basic notes — Shadja (Sa), Rishabha (Re), Gandhara (Ga), Madhyama (Ma), Panchama (Pa), Dhaivata (Dha), and Nishada (Ni). Notes can be Shuddha (natural), Komal (flat), or Tivra (sharp)."
  },
  {
    title: "Arohana & Avarohana (Scale Contours)",
    icon: "↗️",
    description: "The exact ascending (Arohana) and descending (Avarohana) paths. Ragas are not static scales; certain notes may be skipped in ascent and introduced in descent."
  },
  {
    title: "Vadi & Samvadi (Sonant & Consonant Notes)",
    icon: "👑",
    description: "The Vadi (King note) is the most frequently emphasized pitch establishing tonal gravity. The Samvadi (Queen note) acts as its harmonic fourth or fifth counterpart."
  },
  {
    title: "Samaya Chakra (Time-of-Day Theory)",
    icon: "⏰",
    description: "Centuries of musicological observation linking specific swara combinations (especially Komal Re/Dha vs Tivra Ma) to human circadian body rhythms, solar angles, and emotional rasas."
  }
];

// Sourced & Described Ragas Dataset (Described in original text, NO copyrighted audio/notation)
export const ragas = [
  {
    id: "raga-bhairav",
    name: "Raga Bhairav",
    praharId: "p1",
    timePeriod: "6:00 AM – 9:00 AM (1st Prahar of Day)",
    thaat: "Bhairav",
    vadi: "Dhaivata (Dha)",
    samvadi: "Rishabha (Re)",
    moodRasa: "Shanta & Bhakti (Tranquility, Devotion, Sunrise Solitude)",
    swaraStructure: "Uses Komal Re (flat 2nd) and Komal Dha (flat 6th) with Shuddha Ma and Ni.",
    textDescription: "Associated with early morning sunrise, Raga Bhairav creates an atmosphere of solemn reverence and quiet awakening. The unhurried oscillation on Komal Re and Komal Dha evokes the peaceful stillness of early dawn.",
    icon: "🌅"
  },
  {
    id: "raga-sarang",
    name: "Raga Brindavani Sarang",
    praharId: "p3",
    timePeriod: "12:00 PM – 3:00 PM (3rd Prahar of Day)",
    thaat: "Kafi",
    vadi: "Rishabha (Re)",
    samvadi: "Panchama (Pa)",
    moodRasa: "Veera & Adbhuta (Bright, Refreshing, Midday Heat Relief)",
    swaraStructure: "Pentatonic in ascent (skips Ga and Dha); uses Shuddha Ni in ascent and Komal Ni in descent.",
    textDescription: "Sung during the intense glare of the noon sun, Sarang provides a refreshing, uplifting quality like a cool breeze across a summer landscape. The prominent, straight movement between Re and Pa defines its energetic character.",
    icon: "☀️"
  },
  {
    id: "raga-yaman",
    name: "Raga Yaman (Kalyan)",
    praharId: "p5",
    timePeriod: "6:00 PM – 9:00 PM (1st Prahar of Night)",
    thaat: "Kalyan",
    vadi: "Gandhara (Ga)",
    samvadi: "Nishada (Ni)",
    moodRasa: "Shringara & Shanta (Peaceful, Romantic Twilight Glow)",
    swaraStructure: "Uses Tivra Madhyama (sharp 4th) with all other notes in their natural Shuddha form.",
    textDescription: "Taught as a foundational raga in Indian classical music, Yaman is performed at dusk as day turns into night. The sharp Tivra Ma note creates a soothing, luminous ambience reflecting the calm of evening lamps.",
    icon: "🌆"
  },
  {
    id: "raga-darbari",
    name: "Raga Darbari Kanada",
    praharId: "p6",
    timePeriod: "9:00 PM – 12:00 AM (2nd Prahar of Night)",
    thaat: "Asavari",
    vadi: "Rishabha (Re)",
    samvadi: "Panchama (Pa)",
    moodRasa: "Gambhira & Veera (Imperial Majesty, Gravitas, Deep Contemplation)",
    swaraStructure: "Uses Komal Ga, Komal Dha, and Komal Ni with distinctive slow oscillatory Andolan on Ga and Dha.",
    textDescription: "Attributed to court musician Miyan Tansen in Akbar's royal court, Darbari Kanada is a heavy, majestic raga. Performed late in the evening, its slow, microtonal oscillations evoke profound dignity and royal splendor.",
    icon: "🏰"
  },
  {
    id: "raga-malkauns",
    name: "Raga Malkauns",
    praharId: "p7",
    timePeriod: "12:00 AM – 3:00 AM (3rd Prahar of Night / Midnight)",
    thaat: "Bhairavi",
    vadi: "Madhyama (Ma)",
    samvadi: "Shadja (Sa)",
    moodRasa: "Veera & Gambhira (Deep Meditative Night, Spiritual Intensity)",
    swaraStructure: "Audav (Pentatonic) scale skipping Re and Pa completely; uses Komal Ga, Komal Dha, and Komal Ni.",
    textDescription: "One of the oldest and most revered midnight ragas, Malkauns is performed in total darkness. Omitting Re and Pa, its austere pentatonic structure produces a hypnotic, deeply meditative environment that resonates with the silence of midnight.",
    icon: "🌌"
  },
  {
    id: "raga-lalit",
    name: "Raga Lalit",
    praharId: "p8",
    timePeriod: "3:00 AM – 6:00 AM (4th Prahar of Night / Transition)",
    thaat: "Marwa / Transition",
    vadi: "Madhyama (Shuddha Ma)",
    samvadi: "Shadja (Sa)",
    moodRasa: "Karuna & Yearning (Pre-Dawn Nostalgia, Spiritual Transformation)",
    swaraStructure: "Renowned for using BOTH Shuddha Ma (natural 4th) and Tivra Ma (sharp 4th) side-by-side in juxtaposition.",
    textDescription: "Performed during the delicate transition from darkness to light (Sandhiprakash), Lalit features a rare musical phenomenon—placing natural and sharp 4th notes together. This creates a bittersweet, delicate tension matching the first pale light of dawn.",
    icon: "🌅"
  }
];

/**
 * Get raga by ID.
 */
export function getRagaById(id, list = ragas) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = id.trim().toLowerCase();
  return list.find(r => r.id.toLowerCase() === target || r.name.toLowerCase().includes(target));
}

/**
 * Get all ragas associated with a specific Prahar ID.
 */
export function getRagasByPrahar(praharId, list = ragas) {
  if (!praharId || !Array.isArray(list)) return [];
  const target = praharId.trim().toLowerCase();
  return list.filter(r => r.praharId.toLowerCase() === target);
}

/**
 * Calculate clock needle rotation angle in degrees for a prahar index.
 */
export function calculateClockAngle(index, totalPrahars = 8) {
  if (totalPrahars <= 0) return 0;
  const clamped = Math.max(0, Math.min(index, totalPrahars - 1));
  return Math.round((clamped / totalPrahars) * 360);
}

/**
 * Filter ragas by search query and prahar ID.
 */
export function filterRagas(query = "", praharFilter = "all", list = ragas) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  const p = praharFilter.trim().toLowerCase();

  return list.filter(r => {
    const matchesQuery = !q || [
      r.name,
      r.timePeriod,
      r.thaat,
      r.moodRasa,
      r.swaraStructure,
      r.textDescription
    ].some(field => field && field.toLowerCase().includes(q));

    const matchesPrahar = p === "all" || r.praharId.toLowerCase() === p;

    return matchesQuery && matchesPrahar;
  });
}

/* ==========================================================================
   BROWSER DOM & ANIMATED CLOCK-FACE ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.ragasData = ragas;
  window.praharsData = prahars;
  window.musicologyPillarsData = musicologyPillars;
  window.getRagaById = getRagaById;
  window.getRagasByPrahar = getRagasByPrahar;
  window.calculateClockAngle = calculateClockAngle;
  window.filterRagas = filterRagas;

  document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const clockDial = document.getElementById("clock-dial-wheel");
    const clockNeedle = document.getElementById("clock-needle");
    const praharButtonsContainer = document.getElementById("prahar-buttons");
    const activePraharLabel = document.getElementById("active-prahar-label");
    const ragasGridContainer = document.getElementById("ragas-cards-grid");
    const searchInput = document.getElementById("raga-search");

    let currentActivePraharIndex = 0;

    // Render Prahar Buttons around clock
    function renderPraharButtons() {
      if (!praharButtonsContainer) return;
      praharButtonsContainer.innerHTML = "";

      prahars.forEach((p, index) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `btn-prahar-slot ${index === currentActivePraharIndex ? "active" : ""}`;
        btn.style.setProperty("--slot-angle", `${p.angleDeg}deg`);

        btn.innerHTML = `
          <span class="slot-time">${p.timeRange.split(" – ")[0]}</span>
          <span class="slot-name">${p.period.split(" / ")[0]}</span>
        `;

        btn.addEventListener("click", () => {
          currentActivePraharIndex = index;
          updateClockAndRagas();
        });

        praharButtonsContainer.appendChild(btn);
      });
    }

    // Update Clock Rotation & Ragas Display
    function updateClockAndRagas() {
      const selectedPrahar = prahars[currentActivePraharIndex];
      const angle = calculateClockAngle(currentActivePraharIndex, prahars.length);

      // Rotate Clock Needle
      if (clockNeedle) {
        clockNeedle.style.transform = `rotate(${angle}deg)`;
      }

      // Rotate Dial Wheel slightly for dynamic effect
      if (clockDial) {
        clockDial.style.transform = `rotate(${angle * 0.1}deg)`;
      }

      // Update Active Prahar Label
      if (activePraharLabel) {
        activePraharLabel.innerHTML = `
          <span class="active-time-badge" style="background: ${selectedPrahar.color}25; color: ${selectedPrahar.color}">
            ⏰ ${selectedPrahar.timeRange}
          </span>
          <h3>${selectedPrahar.name} (${selectedPrahar.period})</h3>
        `;
      }

      // Update Button active states
      const slots = praharButtonsContainer?.querySelectorAll(".btn-prahar-slot");
      slots?.forEach((slot, i) => {
        slot.classList.toggle("active", i === currentActivePraharIndex);
      });

      renderRagasGrid(selectedPrahar.id);
    }

    // Render Ragas Grid
    function renderRagasGrid(praharId = "all") {
      if (!ragasGridContainer) return;
      ragasGridContainer.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const filtered = filterRagas(query, praharId);

      if (filtered.length === 0) {
        ragasGridContainer.innerHTML = `
          <div class="empty-msg-card">
            <h3>No Ragas Found for This Time Period</h3>
            <p>Select another Prahar on the clock or adjust your search query.</p>
          </div>
        `;
        return;
      }

      filtered.forEach(raga => {
        const card = document.createElement("article");
        card.className = "raga-card";

        card.innerHTML = `
          <div class="raga-card-header">
            <span class="raga-icon">${raga.icon}</span>
            <span class="thaat-badge">Thaat: ${raga.thaat}</span>
          </div>

          <h2>${raga.name}</h2>
          <p class="raga-time-tag">⏰ <strong>Time:</strong> ${raga.timePeriod}</p>
          <p class="raga-rasa">🎭 <strong>Mood / Rasa:</strong> ${raga.moodRasa}</p>

          <div class="swara-box">
            <h4>🎼 Swara Structure & Vadi/Samvadi:</h4>
            <p><strong>Vadi:</strong> ${raga.vadi} · <strong>Samvadi:</strong> ${raga.samvadi}</p>
            <p class="swara-detail">${raga.swaraStructure}</p>
          </div>

          <div class="musicological-desc">
            <h4>📖 Musicological Narrative:</h4>
            <p>${raga.textDescription}</p>
          </div>
        `;

        ragasGridContainer.appendChild(card);
      });
    }

    // Search Input Event Listener
    searchInput?.addEventListener("input", () => {
      renderRagasGrid(prahars[currentActivePraharIndex].id);
    });

    // Initializations
    renderPraharButtons();
    updateClockAndRagas();
  });
}
