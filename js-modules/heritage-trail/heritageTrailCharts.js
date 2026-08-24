/**
 * Creates a bar chart for category distribution.
 */
export function createCategoryBarChart(sites, container) {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 300;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const counts = {};
  sites.forEach(s => { counts[s.category] = (counts[s.category] || 0) + 1; });
  const data = Object.entries(counts).map(([key, count]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: count,
    color: `hsl(${Object.keys(counts).indexOf(key) * 360 / Object.keys(counts).length}, 70%, 55%)`,
  })).sort((a, b) => b.value - a.value);

  const padding = { top: 30, right: 20, bottom: 50, left: 50 };
  const barWidth = (canvas.width - padding.left - padding.right) / data.length - 10;
  const maxValue = Math.max(...data.map(d => d.value));

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 14px system-ui';
  ctx.fillText('Heritage Sites by Category', padding.left, 20);

  // Grid lines
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (canvas.height - padding.top - padding.bottom) * (1 - i / 4);
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(canvas.width - padding.right, y);
    ctx.stroke();
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px system-ui';
    ctx.fillText(Math.round(maxValue * i / 4).toString(), padding.left - 30, y + 3);
  }

  // Bars
  data.forEach((d, i) => {
    const x = padding.left + i * (barWidth + 10) + 5;
    const barHeight = (d.value / maxValue) * (canvas.height - padding.top - padding.bottom);
    const y = canvas.height - padding.bottom - barHeight;

    ctx.fillStyle = d.color;
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
    ctx.fill();

    // Value label
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 11px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(d.value, x + barWidth / 2, y - 5);

    // Category label
    ctx.fillStyle = '#64748b';
    ctx.font = '10px system-ui';
    ctx.save();
    ctx.translate(x + barWidth / 2, canvas.height - padding.bottom + 15);
    ctx.rotate(-0.4);
    ctx.fillText(d.label, 0, 0);
    ctx.restore();
  });
}

/**
 * Creates a pie chart for regional distribution.
 */
export function createRegionPieChart(regions, container) {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const total = regions.reduce((s, r) => s + r.totalSites, 0);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 100;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 14px system-ui';
  ctx.textAlign = 'center';
  ctx.fillText('Sites by Region', centerX, 20);

  let startAngle = -Math.PI / 2;
  regions.forEach(region => {
    const sliceAngle = (region.totalSites / total) * Math.PI * 2;

    // Draw slice
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = region.color;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label
    const midAngle = startAngle + sliceAngle / 2;
    const labelX = centerX + Math.cos(midAngle) * (radius + 25);
    const labelY = centerY + Math.sin(midAngle) * (radius + 25);
    ctx.fillStyle = '#475569';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(`${region.label.split(' ')[0]}`, labelX, labelY);
    ctx.fillText(`${region.totalSites}`, labelX, labelY + 12);

    startAngle += sliceAngle;
  });

  // Center circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 16px system-ui';
  ctx.textAlign = 'center';
  ctx.fillText(total.toString(), centerX, centerY - 5);
  ctx.font = '10px system-ui';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Total Sites', centerX, centerY + 10);
}

/**
 * Creates a line chart for visitor trends.
 */
export function createVisitorTrendChart(data, container) {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 250;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const padding = { top: 30, right: 20, bottom: 40, left: 60 };
  const chartW = canvas.width - padding.left - padding.right;
  const chartH = canvas.height - padding.top - padding.bottom;
  const maxVal = Math.max(...data.map(d => d.visitors));

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 14px system-ui';
  ctx.fillText('Monthly Visitor Trends', padding.left, 20);

  // Grid
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + chartH * (1 - i / 4);
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(canvas.width - padding.right, y);
    ctx.stroke();
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'right';
    ctx.fillText(`${(maxVal * i / 4 / 1000).toFixed(0)}K`, padding.left - 5, y + 3);
  }

  // Line + area
  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartW,
    y: padding.top + chartH * (1 - d.visitors / maxVal),
  }));

  // Area fill
  ctx.beginPath();
  ctx.moveTo(points[0].x, padding.top + chartH);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, padding.top + chartH);
  ctx.closePath();
  const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
  gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
  gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
  ctx.fillStyle = gradient;
  ctx.fill();

  // Line
  ctx.beginPath();
  points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Dots + labels
  points.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#6366f1';
    ctx.fill();
    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(data[i].month, p.x, canvas.height - padding.bottom + 15);
  });
}

/**
 * Creates a horizontal bar chart for top visited sites.
 */
export function createTopSitesBarChart(sites, container) {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 300;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const topSites = [...sites].sort((a, b) => b.visitors - a.visitors).slice(0, 8);
  const padding = { top: 30, right: 20, bottom: 20, left: 150 };
  const barHeight = (canvas.height - padding.top - padding.bottom) / topSites.length - 6;
  const maxVal = Math.max(...topSites.map(s => s.visitors));

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 14px system-ui';
  ctx.fillText('Most Visited Heritage Sites', padding.left, 20);

  topSites.forEach((site, i) => {
    const y = padding.top + i * (barHeight + 6);
    const barW = (site.visitors / maxVal) * (canvas.width - padding.left - padding.right);

    // Bar
    const gradient = ctx.createLinearGradient(padding.left, 0, padding.left + barW, 0);
    gradient.addColorStop(0, site.categoryConfig?.color || '#6366f1');
    gradient.addColorStop(1, (site.categoryConfig?.color || '#6366f1') + '99');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(padding.left, y, barW, barHeight, [0, 4, 4, 0]);
    ctx.fill();

    // Label
    ctx.fillStyle = '#1e293b';
    ctx.font = '11px system-ui';
    ctx.textAlign = 'right';
    ctx.fillText(site.name, padding.left - 5, y + barHeight / 2 + 3);

    // Value
    ctx.fillStyle = '#475569';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'left';
    ctx.fillText(`${(site.visitors / 1000000).toFixed(1)}M`, padding.left + barW + 5, y + barHeight / 2 + 3);
  });
}
