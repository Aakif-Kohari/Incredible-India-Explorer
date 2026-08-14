const tokens = [
  {
    id: "copper",
    name: "Copper Token",
    material: "Copper",
    color: "#b87333",
    description: "A reconstructed representation of the lower-cost token currency meant to replace silver."
  },
  {
    id: "brass",
    name: "Brass Token",
    material: "Brass",
    color: "#b5a642",
    description: "A reconstructed representation used for the educational simulation."
  }
];

const tughlaqTimeline = [
  {
    id: "context",
    title: "Economic Context",
    description: "The experiment emerged during Muhammad bin Tughlaq's reign as part of wider monetary and administrative policies, aiming to circumvent a shortage of precious metals.",
    type: "documented"
  },
  {
    id: "introduction",
    title: "Token Currency",
    description: "A token currency experiment attempted to introduce less expensive metal currency (copper and brass) into circulation with the intended value of silver tankas.",
    type: "documented"
  },
  {
    id: "circulation",
    title: "Circulation",
    description: "The tokens were intended to function as money within the monetary system, accepted for taxes and market transactions.",
    type: "documented"
  },
  {
    id: "counterfeiting",
    title: "Counterfeiting",
    description: "Counterfeiting severely undermined confidence. Because the minting was relatively simple and lacked a state monopoly on complex striking techniques, every house effectively became a mint.",
    type: "documented"
  },
  {
    id: "withdrawal",
    title: "Withdrawal",
    description: "The experiment was eventually withdrawn. The Sultan had to exchange the counterfeit and genuine tokens with actual gold and silver from the royal treasury, causing immense financial loss.",
    type: "documented"
  }
];

const sources = [
  {
    title: "Encyclopaedia Britannica",
    description: "Background reference for Muhammad bin Tughlaq and his monetary reforms."
  },
  {
    title: "Reserve Bank of India Museum",
    description: "Historical context regarding Indian currency and medieval numismatics."
  },
  {
    title: "Barani's Tarikh-i-Firoz Shahi",
    description: "Contemporary historical account documenting the economic impacts of the Sultan's reign."
  }
];

const steps = ["Token", "Value", "Circulation", "Challenge", "Outcome"];

// State
let currentStage = "select"; // select, value, circulation, counterfeit, withdrawal, complete
let selectedToken = null;

document.addEventListener("DOMContentLoaded", () => {
  renderTokens();
  renderTimeline();
  renderSources();
  renderSimulation();
});

function renderTokens() {
  const container = document.getElementById("tokens-container");
  if (!container) return;
  
  container.innerHTML = tokens.map(token => `
    <article class="card">
      <div class="token-circle" style="background: ${token.color};">
        TOKEN
      </div>
      <h3>${token.name}</h3>
      <p>${token.description}</p>
      <span class="label" style="margin-top: 15px;">Educational reconstruction</span>
    </article>
  `).join("");
}

function renderTimeline() {
  const container = document.getElementById("timeline-container");
  if (!container) return;
  
  container.innerHTML = tughlaqTimeline.map(event => `
    <div class="timeline-event">
      <span class="label">Documented history</span>
      <h3>${event.title}</h3>
      <p class="section-text">${event.description}</p>
    </div>
  `).join("");
}

function renderSources() {
  const container = document.getElementById("sources-container");
  if (!container) return;
  
  container.innerHTML = sources.map(source => `
    <div class="source-card">
      <div class="source-title">${source.title}</div>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 5px;">${source.description}</p>
    </div>
  `).join("");
}

function setStage(stage) {
  currentStage = stage;
  renderSimulation();
}

function selectTokenAction(tokenId) {
  selectedToken = tokens.find(t => t.id === tokenId);
  setStage('value');
}

function renderSimulation() {
  const root = document.getElementById("simulation-root");
  const progressContainer = document.getElementById("sim-progress");
  if (!root || !progressContainer) return;

  // Render Progress
  const stageMap = { "select": 0, "value": 1, "circulation": 2, "counterfeit": 3, "withdrawal": 4, "complete": 5 };
  const currentIndex = stageMap[currentStage];
  
  progressContainer.innerHTML = steps.map((step, idx) => `
    <div class="progress-step ${idx <= currentIndex ? 'active' : ''}">
      <span class="step-num">${idx + 1}</span>
      <span>${step}</span>
    </div>
  `).join("");

  // Render Stage Content
  let content = "";
  
  if (currentStage === "select") {
    content = `
      <div>
        <h3 style="font-size: 1.5rem; margin-bottom: 20px;">1. Select a token</h3>
        <div class="grid-2">
          ${tokens.map(token => `
            <button class="sim-btn" onclick="selectTokenAction('${token.id}')">
              <span style="font-size: 1.2rem; font-weight: bold; display: block;">${token.name}</span>
              <span style="font-size: 0.9rem; color: var(--text-muted); margin-top: 5px; display: block;">Select token to begin</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;
  } 
  else if (currentStage === "value") {
    content = `
      <div class="sim-box">
        <span class="label">Step 2</span>
        <h3 style="font-size: 2rem; margin: 10px 0;">Intended Value</h3>
        <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.6;">
          You selected the ${selectedToken.name}. The experiment attempted to give this token currency a value equal to a silver tanka, far beyond the intrinsic value of its ${selectedToken.material.toLowerCase()}.
        </p>
        <button class="action-btn" onclick="setStage('circulation')">Put Token Into Circulation &rarr;</button>
      </div>
    `;
  }
  else if (currentStage === "circulation") {
    content = `
      <div class="sim-box">
        <span class="label">Step 3</span>
        <h3 style="font-size: 2rem; margin: 10px 0;">Circulation</h3>
        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin: 30px 0;">
          <div class="token-circle" style="background: ${selectedToken.color}; width: 80px; height: 80px; margin: 0; font-size: 0.8rem;">TOKEN</div>
          <i class="fa-solid fa-arrow-right" style="font-size: 2rem; color: var(--text-muted);"></i>
          <div style="border: 2px dashed var(--accent-orange); border-radius: 12px; padding: 20px; font-weight: bold;">Market</div>
        </div>
        <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.6;">
          The token now enters the reconstructed circulation sequence, being used for trade and taxes.
        </p>
        <button class="action-btn" onclick="setStage('counterfeit')">Continue &rarr;</button>
      </div>
    `;
  }
  else if (currentStage === "counterfeit") {
    content = `
      <div class="sim-box">
        <span class="label">Step 4</span>
        <h3 style="font-size: 2rem; margin: 10px 0;">The Counterfeiting Problem</h3>
        <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.6;">
          The experiment faced a major challenge when counterfeit tokens undermined confidence in the currency.
        </p>
        <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; margin-top: 20px; text-align: left;">
          <p style="font-weight: bold; color: var(--accent-orange);"><i class="fa-solid fa-triangle-exclamation"></i> Historical challenge</p>
          <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 10px; line-height: 1.5;">
            When a token's accepted value is much greater than the value of its material (and the minting design is easy to copy), maintaining trust and controlling counterfeiting becomes critical.
          </p>
        </div>
        <button class="action-btn" onclick="setStage('withdrawal')">See the Outcome &rarr;</button>
      </div>
    `;
  }
  else if (currentStage === "withdrawal") {
    content = `
      <div class="sim-box">
        <span class="label">Step 5</span>
        <h3 style="font-size: 2rem; margin: 10px 0;">Withdrawal</h3>
        <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.6;">
          Due to rampant counterfeiting and economic chaos, the token currency experiment was eventually withdrawn, bringing the experiment to a costly end.
        </p>
        <button class="action-btn" onclick="setStage('complete')">Complete Case Study</button>
      </div>
    `;
  }
  else if (currentStage === "complete") {
    content = `
      <div class="sim-box" style="border-color: var(--accent-gold);">
        <h3 style="font-size: 2rem; margin: 10px 0; color: var(--accent-gold);">Simulation Complete</h3>
        <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px;">
          You have completed the educational reconstruction. Scroll down to read the documented historical timeline.
        </p>
        <button class="action-btn" style="background: transparent; border: 1px solid var(--accent-gold); color: var(--accent-gold);" onclick="setStage('select')"><i class="fa-solid fa-rotate-right"></i> Restart Simulation</button>
      </div>
    `;
  }

  root.innerHTML = content;
}
