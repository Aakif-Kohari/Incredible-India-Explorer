/**
 * Creates a stat card element with icon, value, label, and optional trend.
 */
export function createStatCard({ icon, label, value, subValue, color = '#6366f1', delay = 0 }) {
  const card = document.createElement('div');
  card.className = 'heritage-stat-card';
  card.style.cssText = `
    background: var(--bg-card, #ffffff); border: 1px solid var(--border-color, #e2e8f0);
    border-radius: 1rem; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    opacity: 0; transform: translateY(20px); transition: all 0.4s ease ${delay}s;
  `;
  card.innerHTML = `
    <div style="display:flex;align-items:flex-start;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:0.75rem">
        <div style="width:2.75rem;height:2.75rem;border-radius:0.75rem;background:${color}15;color:${color};display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">${icon}</div>
        <div>
          <p style="font-size:0.7rem;font-weight:600;color:var(--muted,#64748b);text-transform:uppercase;letter-spacing:0.05em;margin:0">${label}</p>
          <p style="font-size:1.5rem;font-weight:800;color:var(--text-primary,#1e293b);margin:0;line-height:1.2">${value}</p>
        </div>
      </div>
    </div>
    ${subValue ? `<p style="font-size:0.7rem;color:var(--muted,#94a3b8);margin:0.5rem 0 0">${subValue}</p>` : ''}
  `;
  requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; });
  return card;
}

/**
 * Creates a heritage site card with category badge, rating, and visit info.
 */
export function createSiteCard({ site, delay = 0, onSelect }) {
  const card = document.createElement('div');
  card.className = 'heritage-site-card';
  card.style.cssText = `
    background: var(--bg-card, #ffffff); border: 1px solid var(--border-color, #e2e8f0);
    border-radius: 0.75rem; padding: 0.85rem 1rem; cursor: pointer;
    transition: all 0.2s ease; opacity: 0; transform: translateY(10px);
    transition: all 0.3s ease ${delay}s;
  `;
  const stars = '⭐'.repeat(site.rating);
  card.innerHTML = `
    <div style="display:flex;align-items:center;gap:0.6rem">
      <span style="font-size:1.25rem">${site.categoryConfig?.icon || '🏛️'}</span>
      <div style="flex:1;min-width:0">
        <p style="font-size:0.75rem;font-weight:700;color:var(--text-primary,#1e293b);margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${site.name}</p>
        <p style="font-size:0.6rem;color:var(--muted,#94a3b8);margin:0.1rem 0 0">${site.city}, ${site.state} • ${site.periodConfig?.label || ''}</p>
      </div>
      <div style="text-align:right">
        <span style="font-size:0.55rem">${stars}</span>
        <p style="font-size:0.5rem;color:#94a3b8;margin:0">${(site.visitors / 1000000).toFixed(1)}M visitors</p>
      </div>
    </div>
    <div style="display:flex;gap:0.4rem;margin-top:0.5rem;flex-wrap:wrap">
      <span style="font-size:0.5rem;padding:0.15rem 0.35rem;border-radius:9999px;background:${site.categoryConfig?.color || '#6366f1'}15;color:${site.categoryConfig?.color || '#6366f1'}">${site.categoryConfig?.label || site.category}</span>
      <span style="font-size:0.5rem;padding:0.15rem 0.35rem;border-radius:9999px;background:${site.unescoConfig?.color || '#f59e0b'}15;color:${site.unescoConfig?.color || '#f59e0b'}">${site.unescoConfig?.icon || '🏛️'} ${site.unescoConfig?.label || site.unesco}</span>
      <span style="font-size:0.5rem;padding:0.15rem 0.35rem;border-radius:9999px;background:#f1f5f9;color:#64748b">📍 ${site.regionConfig?.label || site.region}</span>
    </div>
  `;
  card.addEventListener('click', () => onSelect && onSelect(site));
  requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; });
  return card;
}

/**
 * Creates a trail route card with type badge, duration, and highlights.
 */
export function createTrailCard({ trail, delay = 0 }) {
  const card = document.createElement('div');
  card.style.cssText = `
    background: var(--bg-card, #ffffff); border: 1px solid var(--border-color, #e2e8f0);
    border-radius: 0.75rem; padding: 1rem; transition: all 0.3s ease ${delay}s;
    opacity: 0; transform: translateY(10px);
  `;
  card.innerHTML = `
    <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.5rem">
      <span style="font-size:1.25rem">${trail.typeConfig?.icon || '🏛️'}</span>
      <div style="flex:1">
        <p style="font-size:0.8rem;font-weight:700;color:var(--text-primary,#1e293b);margin:0">${trail.name}</p>
        <p style="font-size:0.6rem;color:var(--muted,#94a3b8);margin:0.1rem 0 0">${trail.days} days • ${trail.totalKm} km • ${trail.difficulty}</p>
      </div>
      <span style="font-size:0.6rem;font-weight:700;padding:0.15rem 0.4rem;border-radius:9999px;background:${trail.typeConfig?.color || '#6366f1'}15;color:${trail.typeConfig?.color || '#6366f1'}">${trail.typeConfig?.label || trail.type}</span>
    </div>
    <p style="font-size:0.65rem;color:var(--text-secondary,#64748b);margin:0 0 0.5rem;line-height:1.4">${trail.description}</p>
    <div style="display:flex;gap:0.3rem;flex-wrap:wrap">
      <span style="font-size:0.5rem;padding:0.15rem 0.3rem;background:#f8fafc;border-radius:9999px;color:#64748b">⭐ ${trail.rating.toFixed(1)}</span>
      <span style="font-size:0.5rem;padding:0.15rem 0.3rem;background:#f8fafc;border-radius:9999px;color:#64748b">${trail.season}</span>
      <span style="font-size:0.5rem;padding:0.15rem 0.3rem;background:#f8fafc;border-radius:9999px;color:#64748b">💰 ${trail.costRange}</span>
    </div>
    ${trail.highlights ? `<div style="margin-top:0.5rem;padding-top:0.5rem;border-top:1px solid #f1f5f9">
      <p style="font-size:0.55rem;font-weight:600;color:var(--text-secondary,#64748b);margin:0 0 0.2rem">Highlights:</p>
      <div style="display:flex;gap:0.3rem;flex-wrap:wrap">
        ${trail.highlights.map(h => `<span style="font-size:0.5rem;padding:0.1rem 0.3rem;background:#fef3c7;border-radius:9999px;color:#92400e">${h}</span>`).join('')}
      </div>
    </div>` : ''}
  `;
  requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; });
  return card;
}

/**
 * Creates a region stats card with site count and conservation score.
 */
export function createRegionCard({ region, delay = 0 }) {
  const card = document.createElement('div');
  card.style.cssText = `
    background: var(--bg-card, #ffffff); border-left: 4px solid ${region.color};
    border-radius: 0 0.75rem 0.75rem 0; padding: 0.85rem 1rem;
    transition: all 0.3s ease ${delay}s; opacity: 0; transform: translateX(-10px);
  `;
  card.innerHTML = `
    <div style="display:flex;align-items:center;gap:0.6rem">
      <div style="flex:1">
        <p style="font-size:0.8rem;font-weight:700;color:var(--text-primary,#1e293b);margin:0">${region.label}</p>
        <p style="font-size:0.55rem;color:var(--muted,#94a3b8);margin:0.1rem 0 0">${region.states.slice(0, 3).join(', ')}${region.states.length > 3 ? '...' : ''}</p>
      </div>
      <div style="text-align:right">
        <p style="font-size:1rem;font-weight:900;color:${region.color};margin:0">${region.totalSites}</p>
        <p style="font-size:0.5rem;color:#94a3b8;margin:0">sites</p>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.4rem;margin-top:0.6rem">
      <div style="text-align:center;padding:0.25rem;background:#f8fafc;border-radius:0.375rem">
        <p style="font-size:0.65rem;font-weight:800;color:${region.color};margin:0">${region.unescoSites}</p>
        <p style="font-size:0.4rem;color:#94a3b8;margin:0">UNESCO</p>
      </div>
      <div style="text-align:center;padding:0.25rem;background:#f8fafc;border-radius:0.375rem">
        <p style="font-size:0.65rem;font-weight:800;color:#1e293b;margin:0">${region.avgRating.toFixed(1)}</p>
        <p style="font-size:0.4rem;color:#94a3b8;margin:0">avg rating</p>
      </div>
      <div style="text-align:center;padding:0.25rem;background:#f8fafc;border-radius:0.375rem">
        <p style="font-size:0.65rem;font-weight:800;color:#22c55e;margin:0">${region.conservationScore}%</p>
        <p style="font-size:0.4rem;color:#94a3b8;margin:0">conservation</p>
      </div>
    </div>
  `;
  requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = 'translateX(0)'; });
  return card;
}

/**
 * Creates a timeline period card.
 */
export function createPeriodCard({ period, delay = 0 }) {
  const card = document.createElement('div');
  card.style.cssText = `
    display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.75rem;
    border-radius:0.5rem;border-left:3px solid ${period.color};
    background:${period.color}08;transition:all 0.3s ease ${delay}s;
    opacity:0;transform:translateX(-10px);
  `;
  card.innerHTML = `
    <div style="flex:1">
      <p style="font-size:0.7rem;font-weight:700;color:var(--text-primary,#1e293b);margin:0">${period.label}</p>
      <p style="font-size:0.5rem;color:var(--muted,#94a3b8);margin:0.1rem 0 0">${period.range} • ${period.sitesCount} sites • Top: ${period.topSite}</p>
    </div>
    <span style="font-size:0.55rem;font-weight:700;padding:0.1rem 0.3rem;border-radius:9999px;background:${period.color}15;color:${period.color}">${period.sitesCount}</span>
  `;
  requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = 'translateX(0)'; });
  return card;
}

/**
 * Creates a site detail panel with full information.
 */
export function createSiteDetailPanel({ site, onClose }) {
  const panel = document.createElement('div');
  panel.style.cssText = `
    background: var(--bg-card, #ffffff); border: 1px solid var(--border-color, #e2e8f0);
    border-radius: 1rem; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    position: sticky; top: 1rem;
  `;
  panel.innerHTML = `
    <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
      <span style="font-size:2rem">${site.categoryConfig?.icon || '🏛️'}</span>
      <div style="flex:1">
        <h3 style="font-size:1.1rem;font-weight:800;color:var(--text-primary,#1e293b);margin:0">${site.name}</h3>
        <p style="font-size:0.7rem;color:var(--muted,#94a3b8);margin:0.2rem 0 0">${site.city}, ${site.state} • ${site.periodConfig?.range || ''}</p>
      </div>
      <button id="close-detail" style="background:#f1f5f9;border:none;border-radius:50%;width:1.5rem;height:1.5rem;cursor:pointer;font-size:0.75rem">✕</button>
    </div>
    <p style="font-size:0.75rem;color:var(--text-secondary,#64748b);line-height:1.5;margin:0 0 1rem">${site.description}</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-bottom:1rem">
      ${[
        { label: 'Rating', value: '⭐'.repeat(site.rating) + ` (${site.rating}/5)` },
        { label: 'Visitors', value: `${(site.visitors / 1000000).toFixed(1)}M/year` },
        { label: 'Entry Fee', value: `₹${site.entryFee}` },
        { label: 'Visit Duration', value: `${site.avgVisitDuration}h avg` },
        { label: 'Best Time', value: site.bestTimeToVisit },
        { label: 'Conservation', value: site.conservationStatus },
      ].map(item => `
        <div style="padding:0.5rem;background:#f8fafc;border-radius:0.375rem">
          <p style="font-size:0.5rem;color:#94a3b8;margin:0">${item.label}</p>
          <p style="font-size:0.7rem;font-weight:700;color:#1e293b;margin:0.15rem 0 0">${item.value}</p>
        </div>
      `).join('')}
    </div>
    <div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:1rem">
      <span style="font-size:0.55rem;padding:0.2rem 0.4rem;border-radius:9999px;background:${site.categoryConfig?.color || '#6366f1'}15;color:${site.categoryConfig?.color || '#6366f1'}">${site.categoryConfig?.label}</span>
      <span style="font-size:0.55rem;padding:0.2rem 0.4rem;border-radius:9999px;background:${site.unescoConfig?.color || '#f59e0b'}15;color:${site.unescoConfig?.color || '#f59e0b'}">${site.unescoConfig?.icon} ${site.unescoConfig?.label}</span>
      <span style="font-size:0.55rem;padding:0.2rem 0.4rem;border-radius:9999px;background:#f1f5f9;color:#64748b">📍 ${site.regionConfig?.label}</span>
    </div>
    <div style="padding:0.75rem;background:#f8fafc;border-radius:0.5rem">
      <p style="font-size:0.6rem;font-weight:600;color:var(--text-secondary,#64748b);margin:0 0 0.3rem">Quick Info</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.3rem">
        <span style="font-size:0.55rem;color:#64748b">📸 ${site.photosCount?.toLocaleString() || 'N/A'} photos</span>
        <span style="font-size:0.55rem;color:#64748b">💬 ${site.reviewsCount?.toLocaleString() || 'N/A'} reviews</span>
        <span style="font-size:0.55rem;color:#64748b">📍 ${site.nearbySites || 0} nearby sites</span>
        <span style="font-size:0.55rem;color:#64748b">📅 Year built: ${site.yearBuilt < 0 ? Math.abs(site.yearBuilt) + ' BCE' : site.yearBuilt + ' CE'}</span>
      </div>
    </div>
  `;
  panel.querySelector('#close-detail').addEventListener('click', onClose);
  return panel;
}
