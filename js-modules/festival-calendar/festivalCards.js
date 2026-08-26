// Festival Cards - Vanilla JS card components for India Festival Calendar
import { FESTIVAL_CATEGORIES, FESTIVAL_SEASONS, CELEBRATION_TYPES, FORMATTERS } from './festivalTypes.js';
import { festivalStats, getUpcomingFestivals, formatCountdown } from './festivalData.js';

// Create Stat Card
export function createStatCard(value, label, icon = '', color = '#FF6B6B') {
  const card = document.createElement('div');
  card.className = 'festival-stat-card';
  card.style.cssText = `
    background: linear-gradient(135deg, ${color}22, ${color}11);
    border: 1px solid ${color}33;
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    transition: transform 0.3s ease;
  `;
  card.innerHTML = `
    <div style="font-size: 28px; margin-bottom: 8px;">${icon}</div>
    <div style="font-size: 28px; font-weight: 700; color: ${color};">${value}</div>
    <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">${label}</div>
  `;
  card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.02)');
  card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
  return card;
}

// Create Festival Card
export function createFestivalCard(festival, onSelect) {
  const card = document.createElement('div');
  card.className = 'festival-card';
  card.style.cssText = `
    background: linear-gradient(135deg, ${festival.color}22, ${festival.color}11);
    border: 1px solid ${festival.color}44;
    border-radius: 16px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  `;

  const countdown = formatCountdown(festival.date);
  const category = FESTIVAL_CATEGORIES.find(c => c.id === festival.category);
  const celebrationIcons = festival.celebrations.slice(0, 3).map(c => {
    const type = CELEBRATION_TYPES.find(ct => ct.id === c);
    return type?.icon || '🎉';
  }).join(' ');

  card.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
      <div style="font-size: 36px;">${festival.images[0]}</div>
      <div style="
        background: ${festival.color}33;
        color: ${festival.color};
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 500;
      ">${category?.icon || '🎉'} ${category?.name || festival.category}</div>
    </div>
    <h3 style="margin: 0 0 4px; color: #f1f5f9; font-size: 18px; font-weight: 600;">${festival.name}</h3>
    <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">${festival.englishName}</p>
    <p style="margin: 0 0 12px; color: #cbd5e1; font-size: 13px; line-height: 1.4;">${festival.description.substring(0, 100)}...</p>
    <div style="display: flex; gap: 12px; margin-bottom: 12px;">
      <span style="font-size: 12px; color: #94a3b8;">📅 ${festival.month}</span>
      <span style="font-size: 12px; color: #94a3b8;">⏰ ${festival.duration} day${festival.duration > 1 ? 's' : ''}</span>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div style="font-size: 14px;">${celebrationIcons}</div>
      <div style="
        background: ${countdown === 'Today!' ? '#34d39933' : countdown === 'Tomorrow!' ? '#fbbf2433' : 'rgba(255,255,255,0.1)'};
        color: ${countdown === 'Today!' ? '#34d399' : countdown === 'Tomorrow!' ? '#fbbf24' : '#94a3b8'};
        padding: 4px 10px;
        border-radius: 8px;
        font-size: 11px;
        font-weight: 500;
      ">${countdown}</div>
    </div>
  `;

  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)';
    card.style.borderColor = festival.color;
    card.style.boxShadow = `0 8px 24px ${festival.color}33`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.borderColor = `${festival.color}44`;
    card.style.boxShadow = 'none';
  });
  if (onSelect) card.addEventListener('click', () => onSelect(festival));

  return card;
}

// Create Festival Detail Panel
export function createFestivalDetailPanel(festival) {
  const panel = document.createElement('div');
  panel.className = 'festival-detail-panel';
  panel.style.cssText = `
    background: rgba(30, 41, 59, 0.95);
    border: 2px solid ${festival.color}44;
    border-radius: 20px;
    padding: 24px;
    margin-top: 20px;
    position: relative;
  `;

  const category = FESTIVAL_CATEGORIES.find(c => c.id === festival.category);
  const season = FESTIVAL_SEASONS.find(s => s.id === festival.season);

  const celebrationList = festival.celebrations.map(c => {
    const type = CELEBRATION_TYPES.find(ct => ct.id === c);
    return `
      <div style="
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: ${type?.color || '#666'}22;
        border-radius: 8px;
        font-size: 13px;
        color: #cbd5e1;
      ">
        <span>${type?.icon || '🎉'}</span>
        <span>${type?.name || c}</span>
      </div>
    `;
  }).join('');

  const traditionsList = festival.traditions.map(t => `
    <li style="
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      margin-bottom: 6px;
      font-size: 13px;
      color: #cbd5e1;
      list-style: none;
    ">✦ ${t}</li>
  `).join('');

  const recipesList = festival.recipes.map(r => `
    <span style="
      background: ${festival.color}22;
      color: ${festival.color};
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      display: inline-block;
      margin: 0 6px 6px 0;
    ">🍽 ${r}</span>
  `).join('');

  const regionsList = festival.region.map(r => {
    const regionNames = {
      north: 'North India', south: 'South India', east: 'East India',
      west: 'West India', central: 'Central India', northeast: 'Northeast India'
    };
    return `<span style="
      background: rgba(255,255,255,0.1);
      color: #cbd5e1;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 11px;
      margin-right: 6px;
    ">📍 ${regionNames[r] || r}</span>`;
  }).join('');

  panel.innerHTML = `
    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
      <div style="
        width: 100px;
        height: 100px;
        background: linear-gradient(135deg, ${festival.color}44, ${festival.color}22);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 56px;
      ">${festival.images[0]}</div>
      <div style="flex: 1;">
        <h2 style="margin: 0 0 4px; color: #f1f5f9; font-size: 24px;">${festival.name}</h2>
        <p style="margin: 0 0 8px; color: #94a3b8; font-size: 14px;">${festival.englishName}</p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <span style="background: ${festival.color}33; color: ${festival.color}; padding: 4px 10px; border-radius: 12px; font-size: 11px;">
            ${category?.icon || '🎉'} ${category?.name}
          </span>
          <span style="background: ${season?.color || '#666'}33; color: ${season?.color || '#ccc'}; padding: 4px 10px; border-radius: 12px; font-size: 11px;">
            ${season?.icon || '🗓'} ${season?.name || festival.season}
          </span>
          <span style="background: rgba(255,255,255,0.1); color: #94a3b8; padding: 4px 10px; border-radius: 12px; font-size: 11px;">
            ⏰ ${festival.duration} day${festival.duration > 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>

    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
      <h4 style="margin: 0 0 8px; color: #f1f5f9; font-size: 14px;">📖 About the Festival</h4>
      <p style="margin: 0 0 8px; color: #cbd5e1; font-size: 13px; line-height: 1.5;">${festival.description}</p>
      <p style="margin: 0; color: #94a3b8; font-size: 12px;"><strong>Significance:</strong> ${festival.significance}</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
      <div>
        <h4 style="color: #f1f5f9; margin: 0 0 12px; font-size: 14px;">🎉 How It's Celebrated</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">${celebrationList}</div>
      </div>
      <div>
        <h4 style="color: #f1f5f9; margin: 0 0 12px; font-size: 14px;">🎊 Key Traditions</h4>
        <ul style="padding: 0; margin: 0;">${traditionsList}</ul>
      </div>
    </div>

    <div style="margin-bottom: 20px;">
      <h4 style="color: #f1f5f9; margin: 0 0 12px; font-size: 14px;">🍽 Festival Recipes</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">${recipesList}</div>
    </div>

    <div style="margin-bottom: 16px;">
      <h4 style="color: #f1f5f9; margin: 0 0 8px; font-size: 14px;">📍 Celebrated In</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">${regionsList}</div>
    </div>

    <div style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16px;
      border-top: 1px solid rgba(255,255,255,0.1);
      font-size: 12px;
      color: #94a3b8;
    ">
      <span>📅 ${FORMATTERS.formatDate(festival.date)}</span>
      <span>🗓 Hindu Month: ${festival.hinduMonth || 'N/A'}</span>
    </div>
  `;

  return panel;
}

// Create Upcoming Festival Card
export function createUpcomingCard(festival) {
  const card = document.createElement('div');
  card.className = 'festival-upcoming-card';
  card.style.cssText = `
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    margin-bottom: 12px;
    transition: all 0.3s ease;
  `;

  const countdown = formatCountdown(festival.date);
  const category = FESTIVAL_CATEGORIES.find(c => c.id === festival.category);

  card.innerHTML = `
    <div style="
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, ${festival.color}44, ${festival.color}22);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
    ">${festival.images[0]}</div>
    <div style="flex: 1;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <h4 style="margin: 0; color: #f1f5f9; font-size: 16px;">${festival.name}</h4>
        <span style="font-size: 12px; color: #94a3b8;">${festival.englishName}</span>
      </div>
      <p style="margin: 4px 0 0; font-size: 12px; color: #94a3b8;">${category?.icon || '🎉'} ${festival.month} • ${festival.duration} day${festival.duration > 1 ? 's' : ''}</p>
    </div>
    <div style="text-align: right;">
      <div style="
        background: ${countdown === 'Today!' ? '#34d39933' : countdown === 'Tomorrow!' ? '#fbbf2433' : 'rgba(255,255,255,0.1)'};
        color: ${countdown === 'Today!' ? '#34d399' : countdown === 'Tomorrow!' ? '#fbbf24' : '#94a3b8'};
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 4px;
      ">${countdown}</div>
      <div style="font-size: 11px; color: #64748b;">${FORMATTERS.formatShortDate(festival.date)}</div>
    </div>
  `;

  card.addEventListener('mouseenter', () => {
    card.style.borderColor = festival.color;
    card.style.transform = 'translateX(4px)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    card.style.transform = 'translateX(0)';
  });

  return card;
}

// Create Calendar Month Card
export function createCalendarMonthCard(month, festivals) {
  const card = document.createElement('div');
  card.className = 'festival-month-card';
  card.style.cssText = `
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 16px;
    text-align: center;
    transition: all 0.3s ease;
  `;

  const festivalBadges = festivals.slice(0, 3).map(f => `
    <span style="
      background: ${f.color}33;
      color: ${f.color};
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 10px;
      margin: 2px;
      display: inline-block;
    ">${f.images[0]} ${f.name}</span>
  `).join('');

  card.innerHTML = `
    <div style="
      font-size: 24px;
      font-weight: 700;
      color: ${festivals.length > 0 ? '#FFB347' : '#94a3b8'};
      margin-bottom: 8px;
    ">${month}</div>
    <div style="
      font-size: 32px;
      font-weight: 700;
      color: #f1f5f9;
      margin-bottom: 12px;
    ">${festivals.length}</div>
    <div style="font-size: 12px; color: #94a3b8; margin-bottom: 12px;">Festival${festivals.length !== 1 ? 's' : ''}</div>
    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 4px;">
      ${festivalBadges}
    </div>
    ${festivals.length > 3 ? `<div style="margin-top: 8px; font-size: 11px; color: #64748b;">+${festivals.length - 3} more</div>` : ''}
  `;

  card.addEventListener('mouseenter', () => {
    if (festivals.length > 0) card.style.borderColor = '#FFB347';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
  });

  return card;
}

// Create Season Card
export function createSeasonCard(season, festivals) {
  const card = document.createElement('div');
  card.className = 'festival-season-card';
  card.style.cssText = `
    background: linear-gradient(135deg, ${season.color}22, ${season.color}11);
    border: 1px solid ${season.color}44;
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;
  `;

  const festivalIcons = festivals.slice(0, 4).map(f => f.images[0]).join(' ');

  card.innerHTML = `
    <div style="font-size: 40px; margin-bottom: 12px;">${season.icon}</div>
    <h4 style="margin: 0 0 8px; color: ${season.color}; font-size: 18px;">${season.name}</h4>
    <p style="margin: 0 0 12px; color: #94a3b8; font-size: 12px;">${season.months.join(', ')}</p>
    <div style="
      font-size: 28px;
      font-weight: 700;
      color: #f1f5f9;
      margin-bottom: 4px;
    ">${festivals.length}</div>
    <div style="font-size: 12px; color: #94a3b8; margin-bottom: 12px;">Festivals</div>
    <div style="font-size: 24px;">${festivalIcons}</div>
  `;

  card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.02)');
  card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');

  return card;
}

// Create Recipe Card
export function createRecipeCard(recipe, festivalName) {
  const card = document.createElement('div');
  card.className = 'festival-recipe-card';
  card.style.cssText = `
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    transition: all 0.3s ease;
  `;

  card.innerHTML = `
    <div style="font-size: 36px; margin-bottom: 8px;">🍽</div>
    <h5 style="margin: 0 0 8px; color: #f1f5f9; font-size: 14px;">${recipe}</h5>
    <p style="margin: 0; font-size: 11px; color: #94a3b8;">${festivalName}</p>
  `;

  card.addEventListener('mouseenter', () => {
    card.style.borderColor = '#FFB347';
    card.style.transform = 'translateY(-2px)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    card.style.transform = 'translateY(0)';
  });

  return card;
}

// Create Filter Button Group
export function createFilterButtonGroup(options, onSelect) {
  const container = document.createElement('div');
  container.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  `;

  let selectedId = options[0]?.id;

  options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'festival-filter-btn';
    btn.style.cssText = `
      padding: 8px 16px;
      border-radius: 20px;
      border: 1px solid ${option.color || 'rgba(255,255,255,0.2)'}44;
      background: ${option.id === selectedId ? (option.color || '#FFB347') + '33' : 'rgba(255,255,255,0.05)'};
      color: ${option.id === selectedId ? (option.color || '#FFB347') : '#94a3b8'};
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    `;
    btn.innerHTML = `${option.icon || ''} ${option.name}`;
    btn.dataset.id = option.id;

    btn.addEventListener('click', () => {
      selectedId = option.id;
      container.querySelectorAll('.festival-filter-btn').forEach(b => {
        b.style.background = 'rgba(255,255,255,0.05)';
        b.style.color = '#94a3b8';
      });
      btn.style.background = (option.color || '#FFB347') + '33';
      btn.style.color = option.color || '#FFB347';
      if (onSelect) onSelect(option.id);
    });

    container.appendChild(btn);
  });

  return container;
}

// Create Search Input
export function createSearchInput(placeholder, onSearch) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    position: relative;
    margin-bottom: 16px;
  `;
  wrapper.innerHTML = `
    <input type="text" placeholder="${placeholder}" style="
      width: 100%;
      padding: 12px 16px 12px 44px;
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: #f1f5f9;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s ease;
    " />
    <span style="
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
      color: #94a3b8;
    ">🔍</span>
  `;

  const input = wrapper.querySelector('input');
  input.addEventListener('focus', () => input.style.borderColor = '#FFB347');
  input.addEventListener('blur', () => input.style.borderColor = 'rgba(255, 255, 255, 0.1)');
  input.addEventListener('input', (e) => {
    if (onSearch) onSearch(e.target.value);
  });

  return wrapper;
}

// Export all creators
export const FestivalCards = {
  createStatCard,
  createFestivalCard,
  createFestivalDetailPanel,
  createUpcomingCard,
  createCalendarMonthCard,
  createSeasonCard,
  createRecipeCard,
  createFilterButtonGroup,
  createSearchInput
};

export default FestivalCards;