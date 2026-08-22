(function() {
  'use strict';

  // --- Mughal Coinage Datasets ---
  const emperors = [
    {
      id: "akbar",
      name: "Akbar the Great",
      reign: "1556–1605 CE",
      bio: "Akbar reformed and standardized the Mughal currency. He introduced the Jalali (square) coin and the Ilahi coinage featuring solar calendar years, along with bilingual Devanagari coins portraying Hindu deities like Ram and Sita.",
      coins: [
        {
          name: "Gold Mohur (Jalali)",
          metal: "gold",
          denomination: "Mohur (1 Jalali)",
          weight: "10.95 grams",
          diameter: "21 mm",
          script: "Persian",
          inscriptionObv: "Allahu Akbar Jalla Jalalahu",
          inscriptionObvTrans: "God is Great, Eminent is His Glory",
          inscriptionRev: "Regnal Year (Ilahi era) and Mint Name",
          inscriptionRevTrans: "Year of the Divine Era, Struck at Delhi",
          obverseIcon: "🔆",
          reverseIcon: "🏰",
          context: "Issued as part of Akbar's syncretic Din-i-Ilahi era, replacing traditional Islamic calendar years with regnal years to ensure secular administrative uniformity."
        },
        {
          name: "Ram-Sita Silver Rupee",
          metal: "silver",
          denomination: "Rupee (Rupaya)",
          weight: "11.3 grams",
          diameter: "22 mm",
          script: "Persian & Devanagari",
          inscriptionObv: "Rama-Siya portrayed with bows and arrows",
          inscriptionObvTrans: "Lord Ram and Goddess Sita",
          inscriptionRev: "Devanagari: 'Rama-Siya' / Ilahi year 50",
          inscriptionRevTrans: "Lord Ram and Sita / Regnal Year 50",
          obverseIcon: "🏹",
          reverseIcon: "🌸",
          context: "Struck in the final year of Akbar's reign (1604-1605 CE), this exceptionally rare coin reflects Akbar's profound respect for Hindu culture and religious pluralism."
        }
      ]
    },
    {
      id: "jahangir",
      name: "Jahangir",
      reign: "1605–1627 CE",
      bio: "Jahangir's reign is celebrated as the artistic pinnacle of Mughal coinage. He defied orthodox conventions by portraying himself on coins holding a wine cup, issuing the legendary Zodiac series, and honoring Queen Nur Jahan on state currency.",
      coins: [
        {
          name: "Zodiac Gold Mohur (Leo)",
          metal: "gold",
          denomination: "Mohur",
          weight: "10.92 grams",
          diameter: "20 mm",
          script: "Persian",
          inscriptionObv: "Leo (Lion standing before a rising sun)",
          inscriptionObvTrans: "Symbolic astrological representation of the Emperor's birth sign / august power",
          inscriptionRev: "Yaft Dar Agra Ruye Zahar Zewar / Jahangir Shah Shah Akbar Shah",
          inscriptionRevTrans: "Received at Agra gold face ornament / Jahangir King, King Akbar's Son",
          obverseIcon: "🦁",
          reverseIcon: "👑",
          context: "Struck at the Akbarabad (Agra) mint. Jahangir ordered that instead of the name of the month, the figure of the zodiac sign corresponding to that month should be struck on the obverse."
        },
        {
          name: "Nur Jahan Silver Rupee",
          metal: "silver",
          denomination: "Rupee (Rupaya)",
          weight: "11.45 grams",
          diameter: "21.5 mm",
          script: "Persian",
          inscriptionObv: "Ze Hukme Jahangir Shah Zewar Yaft",
          inscriptionObvTrans: "By order of King Jahangir, received ornament",
          inscriptionRev: "Ba Name Nur Jahan Badshah Begum",
          inscriptionRevTrans: "In the name of Nur Jahan, the Queen Begum",
          obverseIcon: "👸",
          reverseIcon: "🛡️",
          context: "Struck to declare Empress Nur Jahan's co-sovereignty. She is the only female ruler in Mughal history to have coins struck in her name."
        }
      ]
    },
    {
      id: "shahjahan",
      name: "Shah Jahan",
      reign: "1628–1658 CE",
      bio: "Shah Jahan discontinued artistic pictorial coins, returning to Islamic orthodoxy. His coinage is characterized by beautiful geometric borders containing the Kalima and the names of the four Rightly-Guided Caliphs.",
      coins: [
        {
          name: "Imperial Silver Rupee",
          metal: "silver",
          denomination: "Rupee (Rupaya)",
          weight: "11.5 grams",
          diameter: "23 mm",
          script: "Persian",
          inscriptionObv: "Kalima inside a square frame: 'La ilaha illallah Muhammadur rasulullah'",
          inscriptionObvTrans: "There is no god but Allah; Muhammad is the messenger of Allah",
          inscriptionRev: "Shah Jahan Badshah Ghazi / Sahib Qiran-i-Sani",
          inscriptionRevTrans: "Shah Jahan, Emperor Victorious / Second Lord of the Conjunction",
          obverseIcon: "🕋",
          reverseIcon: "⚔️",
          context: "Minted at Surat. Features the title 'Sahib Qiran-i-Sani' (Second Lord of the Conjunction), directly linking Shah Jahan's lineage back to the conqueror Timur."
        }
      ]
    },
    {
      id: "aurangzeb",
      name: "Aurangzeb",
      reign: "1658–1707 CE",
      bio: "Aurangzeb completely banned the Kalima from coinage to prevent the sacred creed from being handled by non-believers or dirtied. He introduced a poetic couplet referencing the sun and moon, and expanded Deccani mint operations.",
      coins: [
        {
          name: "Mihr-i-Munir Gold Mohur",
          metal: "gold",
          denomination: "Mohur",
          weight: "11.05 grams",
          diameter: "22 mm",
          script: "Persian",
          inscriptionObv: "Sikka Zad Dar Jahan Chu Mihr Munir / Shah Aurangzeb Alamgir",
          inscriptionObvTrans: "Struck coin in the world like the shining sun, Shah Aurangzeb Alamgir",
          inscriptionRev: "Manus Maimanat Sanah 38 Julus / Zarb Shahjahanabad",
          inscriptionRevTrans: "Associated with prosperity, Year 38 of the Reign / Minted at Delhi",
          obverseIcon: "☀️",
          reverseIcon: "💎",
          context: "Minted at Shahjahanabad. Aurangzeb's coins are highly uniform, reflecting his puritanical focus on administrative efficiency over artistic individuality."
        }
      ]
    }
  ];

  const mints = [
    {
      name: "Akbarabad (Agra)",
      lat: 250,
      lng: 230,
      desc: "Agra was the primary capital of the empire during Akbar and Jahangir's reigns. Its mint produced the finest gold mohurs, including Jahangir's Zodiac coins.",
      coins: ["Zodiac Gold Mohur (Leo)", "Gold Mohur (Jalali)"]
    },
    {
      name: "Shahjahanabad (Delhi)",
      lat: 230,
      lng: 210,
      desc: "Delhi was rebuilt by Shah Jahan as Shahjahanabad. The mint there struck premium high-purity gold mohurs and silver rupees under Aurangzeb.",
      coins: ["Mihr-i-Munir Gold Mohur", "Imperial Silver Rupee"]
    },
    {
      name: "Lahore",
      lat: 170,
      lng: 150,
      desc: "A massive strategic mint in the Punjab province. Struck high-volume silver and copper coinage to fund campaigns in Kabul, Kashmir, and Kandahar.",
      coins: ["Gold Mohur (Jalali)", "Nur Jahan Silver Rupee"]
    },
    {
      name: "Surat",
      lat: 210,
      lng: 330,
      desc: "The primary trade gateway mint on the western coast. Handled silver bullion imported by European traders (East India Company), restriking it into high-purity Mughal rupees.",
      coins: ["Imperial Silver Rupee", "Mihr-i-Munir Gold Mohur"]
    },
    {
      name: "Ahmedabad",
      lat: 180,
      lng: 290,
      desc: "A prominent provincial mint in Gujarat. Highly active under Jahangir and Akbar due to its connection to cotton and spice trade networks.",
      coins: ["Zodiac Gold Mohur (Leo)", "Ram-Sita Silver Rupee"]
    },
    {
      name: "Kabul",
      lat: 110,
      lng: 90,
      desc: "Struck early Timurid-style silver Shahrukhis for Babur and Humayun. Maintained as a northern frontier mint.",
      coins: ["Gold Mohur (Jalali)"]
    }
  ];

  const timelineEvents = [
    {
      year: "1526 CE",
      title: "Timurid Silver Shahrukhis",
      desc: "Babur founds the empire and continues striking thin, wide silver Shahrukhis (4.6g) modeled after Timurid patterns in Central Asia."
    },
    {
      year: "1540 CE",
      title: "Sher Shah Suri's Monetary Reforms",
      desc: "During Humayun's exile, Sher Shah Suri introduces the Rupiya (silver, 11.5g) and the Dam (copper), establishing the tripartite system later adopted by Akbar."
    },
    {
      year: "1579 CE",
      title: "Akbar's Standardization",
      desc: "Akbar standardizes the weight of the Gold Mohur (~11g) and Rupee (~11.5g) across all imperial mints, creating a world-class trade currency."
    },
    {
      year: "1618 CE",
      title: "Jahangir's Zodiac Series",
      desc: "Jahangir defies Islamic conventions, issuing gold mohurs depicting astrological signs and portraiture, representing the pinnacle of numismatic art."
    },
    {
      year: "1628 CE",
      title: "Return to Geometric Orthodoxy",
      desc: "Shah Jahan removes portraits and zodiac signs, introducing calligraphic designs displaying the Kalima inside decorative circles and squares."
    },
    {
      year: "1658 CE",
      title: "Removal of the Kalima",
      desc: "Aurangzeb bans the Kalima from coins to prevent sacred verses from being handled with dirty hands, replacing it with poetic Persian couplets."
    }
  ];

  // --- State Variables ---
  let activeEmperorIndex = 0;

  // --- Init Functions ---
  function init() {
    renderEmperorList();
    renderCoinViewer();
    renderMintMap();
    initCoinComparison();
    renderTimeline();
  }

  // --- 1. Emperor & Coin Gallery ---
  function renderEmperorList() {
    const listContainer = document.getElementById("emperor-list");
    if (!listContainer) return;

    listContainer.innerHTML = emperors.map((emp, index) => `
      <button class="emperor-btn ${index === activeEmperorIndex ? 'active' : ''}" 
              role="tab" 
              aria-selected="${index === activeEmperorIndex}" 
              data-index="${index}">
        <span>${emp.name}</span>
        <span class="emperor-btn-years">${emp.reign}</span>
      </button>
    `).join('');

    // Attach click events
    listContainer.querySelectorAll('.emperor-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        activeEmperorIndex = parseInt(this.getAttribute('data-index'), 10);
        renderEmperorList();
        renderCoinViewer();
      });
    });
  }

  function renderCoinViewer() {
    const displayPanel = document.getElementById("coin-display-panel");
    if (!displayPanel) return;

    const emp = emperors[activeEmperorIndex];

    displayPanel.innerHTML = `
      <div class="coin-header">
        <h3>Coins of ${emp.name}</h3>
        <p style="color: #cbd5e1; line-height: 1.6; margin-bottom: 1rem;">${emp.bio}</p>
      </div>

      <div class="coins-gallery">
        ${emp.coins.map(coin => `
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
              <h4 style="margin: 0; font-size: 1.3rem; font-family: 'Playfair Display', serif; color: #fbbf24;">${coin.name}</h4>
              <span class="meta-pill ${coin.metal}-pill">${coin.metal}</span>
            </div>

            <!-- Obverse / Reverse Sides -->
            <div class="coin-image-container">
              <div class="coin-side obverse">
                <div class="coin-img-placeholder">${coin.obverseIcon}</div>
                <span class="coin-side-label">Obverse</span>
              </div>
              <div class="coin-side reverse">
                <div class="coin-img-placeholder">${coin.reverseIcon}</div>
                <span class="coin-side-label">Reverse</span>
              </div>
            </div>

            <!-- Coin Specifications -->
            <div class="coin-details-grid" style="margin-top: 1.5rem;">
              <div class="detail-card">
                <h4>Denomination</h4>
                <p>${coin.denomination}</p>
              </div>
              <div class="detail-card">
                <h4>Weight & Size</h4>
                <p>${coin.weight} / ${coin.diameter}</p>
              </div>
              <div class="detail-card">
                <h4>Obverse Inscription</h4>
                <p><strong>Arabic/Persian:</strong> ${coin.inscriptionObv}</p>
                <p style="font-size: 0.9rem; color: #fbbf24; margin-top: 0.25rem;"><i>Trans: "${coin.inscriptionObvTrans}"</i></p>
              </div>
              <div class="detail-card">
                <h4>Reverse Inscription</h4>
                <p><strong>Arabic/Persian:</strong> ${coin.inscriptionRev}</p>
                <p style="font-size: 0.9rem; color: #fbbf24; margin-top: 0.25rem;"><i>Trans: "${coin.inscriptionRevTrans}"</i></p>
              </div>
            </div>

            <!-- Historical Context -->
            <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.06);">
              <h5 style="margin: 0 0 0.5rem; color: #94a3b8; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Historical Context</h5>
              <p style="margin: 0; color: #cbd5e1; font-size: 0.95rem; line-height: 1.6;">${coin.context}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // --- 2. Interactive Mint Map ---
  function renderMintMap() {
    const markersContainer = document.getElementById("map-mint-markers");
    if (!markersContainer) return;

    markersContainer.innerHTML = mints.map((mint, index) => `
      <circle class="map-mint-marker" 
              cx="${mint.lng}" 
              cy="${mint.lat}" 
              r="7" 
              data-index="${index}" 
              tabindex="0"
              aria-label="Mint at ${mint.name}"></circle>
    `).join('');

    const tooltip = document.getElementById("map-tooltip");
    const markers = markersContainer.querySelectorAll(".map-mint-marker");

    markers.forEach(marker => {
      // Hover tooltip
      marker.addEventListener("mouseenter", function(e) {
        const index = parseInt(this.getAttribute("data-index"), 10);
        const mint = mints[index];
        if (tooltip) {
          tooltip.textContent = mint.name;
          tooltip.style.opacity = "1";
          tooltip.style.left = `${e.offsetX + 15}px`;
          tooltip.style.top = `${e.offsetY - 15}px`;
        }
      });

      marker.addEventListener("mouseleave", function() {
        if (tooltip) tooltip.style.opacity = "0";
      });

      // Click to load details
      marker.addEventListener("click", function() {
        const index = parseInt(this.getAttribute("data-index"), 10);
        markers.forEach(m => m.classList.remove("active"));
        this.classList.add("active");
        renderMintDetails(index);
      });
    });
  }

  function renderMintDetails(index) {
    const infoPanel = document.getElementById("mint-info-panel");
    if (!infoPanel) return;

    const mint = mints[index];

    infoPanel.innerHTML = `
      <div class="mint-details animate-fade">
        <h3>📍 ${mint.name} Mint</h3>
        <div class="mint-coord">Coordinates: ${mint.lng}° E, ${mint.lat}° N (Imperial Grid)</div>
        <p class="mint-desc">${mint.desc}</p>
        
        <div class="mint-coins-list">
          <h4>Coins Minted Here:</h4>
          <ul>
            ${mint.coins.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  // --- 3. Coin Comparison ---
  function initCoinComparison() {
    const selectA = document.getElementById("coin-a-select");
    const selectB = document.getElementById("coin-b-select");
    if (!selectA || !selectB) return;

    // Gather all coins
    const allCoins = [];
    emperors.forEach(emp => {
      emp.coins.forEach(coin => {
        allCoins.push({ ...coin, emperor: emp.name });
      });
    });

    // Populate dropdowns
    const optionsHtml = allCoins.map((coin, index) => `
      <option value="${index}">${coin.name} (${coin.emperor})</option>
    `).join('');

    selectA.innerHTML = optionsHtml;
    selectB.innerHTML = optionsHtml;

    // Select second option for B by default
    if (allCoins.length > 1) {
      selectB.value = 1;
    }

    // Render initial table
    renderComparison(allCoins);

    // Event listeners
    selectA.addEventListener("change", () => renderComparison(allCoins));
    selectB.addEventListener("change", () => renderComparison(allCoins));
  }

  function renderComparison(allCoins) {
    const indexA = parseInt(document.getElementById("coin-a-select").value, 10);
    const indexB = parseInt(document.getElementById("coin-b-select").value, 10);
    const resultsContainer = document.getElementById("comparison-results");
    if (!resultsContainer) return;

    const coinA = allCoins[indexA];
    const coinB = allCoins[indexB];

    resultsContainer.innerHTML = `
      <table class="comparison-table">
        <thead>
          <tr>
            <th class="attribute-name">Attribute</th>
            <th class="comp-column-value">${coinA.name}</th>
            <th class="comp-column-value">${coinB.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="attribute-name">Emperor</td>
            <td>${coinA.emperor}</td>
            <td>${coinB.emperor}</td>
          </tr>
          <tr>
            <td class="attribute-name">Metal</td>
            <td style="text-transform: capitalize;">${coinA.metal}</td>
            <td style="text-transform: capitalize;">${coinB.metal}</td>
          </tr>
          <tr>
            <td class="attribute-name">Denomination</td>
            <td>${coinA.denomination}</td>
            <td>${coinB.denomination}</td>
          </tr>
          <tr>
            <td class="attribute-name">Weight</td>
            <td>${coinA.weight}</td>
            <td>${coinB.weight}</td>
          </tr>
          <tr>
            <td class="attribute-name">Script</td>
            <td>${coinA.script}</td>
            <td>${coinB.script}</td>
          </tr>
          <tr>
            <td class="attribute-name">Obverse Inscription</td>
            <td>
              <div>${coinA.inscriptionObv}</div>
              <div style="font-size: 0.85rem; color: #fbbf24; margin-top: 0.25rem;"><i>"${coinA.inscriptionObvTrans}"</i></div>
            </td>
            <td>
              <div>${coinB.inscriptionObv}</div>
              <div style="font-size: 0.85rem; color: #fbbf24; margin-top: 0.25rem;"><i>"${coinB.inscriptionObvTrans}"</i></div>
            </td>
          </tr>
          <tr>
            <td class="attribute-name">Reverse Inscription</td>
            <td>
              <div>${coinA.inscriptionRev}</div>
              <div style="font-size: 0.85rem; color: #fbbf24; margin-top: 0.25rem;"><i>"${coinA.inscriptionRevTrans}"</i></div>
            </td>
            <td>
              <div>${coinB.inscriptionRev}</div>
              <div style="font-size: 0.85rem; color: #fbbf24; margin-top: 0.25rem;"><i>"${coinB.inscriptionRevTrans}"</i></div>
            </td>
          </tr>
          <tr>
            <td class="attribute-name">Historical Context</td>
            <td style="font-size: 0.9rem; line-height: 1.5;">${coinA.context}</td>
            <td style="font-size: 0.9rem; line-height: 1.5;">${coinB.context}</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  // --- 4. Historical Timeline ---
  function renderTimeline() {
    const listContainer = document.getElementById("timeline-list");
    if (!listContainer) return;

    listContainer.innerHTML = timelineEvents.map(event => `
      <div class="timeline-card">
        <h3>${event.year} — ${event.title}</h3>
        <p style="color: #cbd5e1; line-height: 1.6; margin: 0.5rem 0 0;">${event.desc}</p>
      </div>
    `).join('');
  }

  // --- DOMContentLoaded Hook ---
  document.addEventListener("DOMContentLoaded", init);
})();
