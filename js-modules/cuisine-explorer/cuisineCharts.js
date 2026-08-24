// Cuisine Charts - Vanilla JS Canvas API chart components for India Cuisine Explorer
import { cuisineData } from './cuisineData.js';

// Base Chart Class
class BaseChart {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.padding = options.padding || { top: 40, right: 20, bottom: 40, left: 60 };
    this.colors = options.colors || ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawTitle(title) {
    this.ctx.fillStyle = '#f1f5f9';
    this.ctx.font = 'bold 14px Inter, sans-serif';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(title, this.padding.left, 24);
  }

  getChartArea() {
    return {
      x: this.padding.left,
      y: this.padding.top,
      width: this.width - this.padding.left - this.padding.right,
      height: this.height - this.padding.top - this.padding.bottom
    };
  }
}

// Bar Chart
export class BarChart extends BaseChart {
  draw(data, options = {}) {
    this.clear();
    this.drawTitle(options.title || 'Bar Chart');

    const chartArea = this.getChartArea();
    const maxValue = Math.max(...data.map(d => d.value)) * 1.1;
    const barWidth = (chartArea.width / data.length) * 0.7;
    const gap = (chartArea.width / data.length) * 0.3;

    // Draw grid lines
    this.ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = chartArea.y + (chartArea.height / 5) * i;
      this.ctx.beginPath();
      this.ctx.moveTo(chartArea.x, y);
      this.ctx.lineTo(chartArea.x + chartArea.width, y);
      this.ctx.stroke();

      // Y-axis labels
      this.ctx.fillStyle = '#94a3b8';
      this.ctx.font = '11px Inter, sans-serif';
      this.ctx.textAlign = 'right';
      this.ctx.fillText(Math.round(maxValue - (maxValue / 5) * i), chartArea.x - 8, y + 4);
    }

    // Draw bars with animation
    data.forEach((d, i) => {
      const x = chartArea.x + i * (barWidth + gap) + gap / 2;
      const barHeight = (d.value / maxValue) * chartArea.height;
      const y = chartArea.y + chartArea.height - barHeight;

      // Bar gradient
      const gradient = this.ctx.createLinearGradient(x, y, x, chartArea.y + chartArea.height);
      gradient.addColorStop(0, d.color || this.colors[i % this.colors.length]);
      gradient.addColorStop(1, (d.color || this.colors[i % this.colors.length]) + '66');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
      this.ctx.fill();

      // Value label
      this.ctx.fillStyle = '#f1f5f9';
      this.ctx.font = 'bold 11px Inter, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(d.value, x + barWidth / 2, y - 8);

      // X-axis label
      this.ctx.fillStyle = '#94a3b8';
      this.ctx.font = '10px Inter, sans-serif';
      this.ctx.fillText(d.label, x + barWidth / 2, chartArea.y + chartArea.height + 20);
    });

    return this;
  }
}

// Pie Chart
export class PieChart extends BaseChart {
  draw(data, options = {}) {
    this.clear();
    this.drawTitle(options.title || 'Pie Chart');

    const centerX = this.width / 2;
    const centerY = this.height / 2 + 20;
    const radius = Math.min(this.width, this.height) / 2 - 60;
    const total = data.reduce((sum, d) => sum + d.value, 0);

    let startAngle = -Math.PI / 2;

    data.forEach((d, i) => {
      const sliceAngle = (d.value / total) * Math.PI * 2;

      // Draw slice
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      this.ctx.closePath();
      this.ctx.fillStyle = d.color || this.colors[i % this.colors.length];
      this.ctx.fill();

      // Slice border
      this.ctx.strokeStyle = '#1e293b';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      // Label
      const midAngle = startAngle + sliceAngle / 2;
      const labelRadius = radius * 0.7;
      const labelX = centerX + Math.cos(midAngle) * labelRadius;
      const labelY = centerY + Math.sin(midAngle) * labelRadius;

      if (sliceAngle > 0.3) {
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 12px Inter, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(d.label, labelX, labelY - 8);
        this.ctx.font = '11px Inter, sans-serif';
        this.ctx.fillText(`${Math.round((d.value / total) * 100)}%`, labelX, labelY + 8);
      }

      startAngle += sliceAngle;
    });

    // Legend
    const legendX = this.width - 120;
    let legendY = this.padding.top + 10;
    data.forEach((d, i) => {
      this.ctx.fillStyle = d.color || this.colors[i % this.colors.length];
      this.ctx.fillRect(legendX, legendY, 12, 12);
      this.ctx.fillStyle = '#94a3b8';
      this.ctx.font = '11px Inter, sans-serif';
      this.ctx.textAlign = 'left';
      this.ctx.fillText(d.label, legendX + 18, legendY + 10);
      legendY += 20;
    });

    return this;
  }
}

// Line Chart
export class LineChart extends BaseChart {
  draw(datasets, options = {}) {
    this.clear();
    this.drawTitle(options.title || 'Line Chart');

    const chartArea = this.getChartArea();
    const allValues = datasets.flatMap(ds => ds.data.map(d => d.value));
    const maxValue = Math.max(...allValues) * 1.1;
    const minValue = 0;

    // Draw grid
    this.ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = chartArea.y + (chartArea.height / 5) * i;
      this.ctx.beginPath();
      this.ctx.moveTo(chartArea.x, y);
      this.ctx.lineTo(chartArea.x + chartArea.width, y);
      this.ctx.stroke();

      this.ctx.fillStyle = '#94a3b8';
      this.ctx.font = '11px Inter, sans-serif';
      this.ctx.textAlign = 'right';
      this.ctx.fillText(Math.round(maxValue - (maxValue / 5) * i), chartArea.x - 8, y + 4);
    }

    // Draw lines for each dataset
    datasets.forEach((dataset, dsIndex) => {
      const color = dataset.color || this.colors[dsIndex % this.colors.length];
      const points = [];

      dataset.data.forEach((d, i) => {
        const x = chartArea.x + (i / (dataset.data.length - 1)) * chartArea.width;
        const y = chartArea.y + chartArea.height - ((d.value - minValue) / (maxValue - minValue)) * chartArea.height;
        points.push({ x, y });
      });

      // Fill area
      if (dataset.fill) {
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, chartArea.y + chartArea.height);
        points.forEach(p => this.ctx.lineTo(p.x, p.y));
        this.ctx.lineTo(points[points.length - 1].x, chartArea.y + chartArea.height);
        this.ctx.closePath();

        const gradient = this.ctx.createLinearGradient(0, chartArea.y, 0, chartArea.y + chartArea.height);
        gradient.addColorStop(0, color + '44');
        gradient.addColorStop(1, color + '00');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
      }

      // Draw line
      this.ctx.beginPath();
      this.ctx.moveTo(points[0].x, points[0].y);
      points.forEach(p => this.ctx.lineTo(p.x, p.y));
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2.5;
      this.ctx.lineJoin = 'round';
      this.ctx.stroke();

      // Draw points
      points.forEach(p => {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.strokeStyle = '#1e293b';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
      });

      // X-axis labels
      if (dsIndex === 0) {
        dataset.data.forEach((d, i) => {
          if (i % Math.ceil(dataset.data.length / 8) === 0 || i === dataset.data.length - 1) {
            const x = chartArea.x + (i / (dataset.data.length - 1)) * chartArea.width;
            this.ctx.fillStyle = '#94a3b8';
            this.ctx.font = '10px Inter, sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(d.label, x, chartArea.y + chartArea.height + 20);
          }
        });
      }
    });

    // Legend
    if (datasets.length > 1) {
      let legendX = chartArea.x;
      let legendY = chartArea.y - 10;
      datasets.forEach((ds, i) => {
        const color = ds.color || this.colors[i % this.colors.length];
        this.ctx.fillStyle = color;
        this.ctx.fillRect(legendX, legendY - 8, 12, 12);
        this.ctx.fillStyle = '#94a3b8';
        this.ctx.font = '11px Inter, sans-serif';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(ds.label, legendX + 16, legendY + 2);
        legendX += this.ctx.measureText(ds.label).width + 36;
      });
    }

    return this;
  }
}

// Horizontal Bar Chart
export class HorizontalBarChart extends BaseChart {
  draw(data, options = {}) {
    this.clear();
    this.drawTitle(options.title || 'Horizontal Bar Chart');

    const chartArea = this.getChartArea();
    const maxValue = Math.max(...data.map(d => d.value)) * 1.1;
    const barHeight = (chartArea.height / data.length) * 0.7;
    const gap = (chartArea.height / data.length) * 0.3;
    const labelWidth = 100;

    data.forEach((d, i) => {
      const y = chartArea.y + i * (barHeight + gap) + gap / 2;
      const barWidth = (d.value / maxValue) * (chartArea.width - labelWidth);

      // Label
      this.ctx.fillStyle = '#cbd5e1';
      this.ctx.font = '12px Inter, sans-serif';
      this.ctx.textAlign = 'right';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(d.label, chartArea.x + labelWidth - 10, y + barHeight / 2);

      // Bar background
      this.ctx.fillStyle = 'rgba(255,255,255,0.05)';
      this.ctx.beginPath();
      this.ctx.roundRect(chartArea.x + labelWidth, y, chartArea.width - labelWidth, barHeight, 4);
      this.ctx.fill();

      // Bar
      const gradient = this.ctx.createLinearGradient(chartArea.x + labelWidth, y, chartArea.x + labelWidth + barWidth, y);
      gradient.addColorStop(0, d.color || this.colors[i % this.colors.length]);
      gradient.addColorStop(1, (d.color || this.colors[i % this.colors.length]) + '88');
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.roundRect(chartArea.x + labelWidth, y, barWidth, barHeight, 4);
      this.ctx.fill();

      // Value
      this.ctx.fillStyle = '#f1f5f9';
      this.ctx.font = 'bold 11px Inter, sans-serif';
      this.ctx.textAlign = 'left';
      this.ctx.fillText(d.value + (options.suffix || ''), chartArea.x + labelWidth + barWidth + 8, y + barHeight / 2);
    });

    return this;
  }
}

// Radar Chart
export class RadarChart extends BaseChart {
  draw(data, options = {}) {
    this.clear();
    this.drawTitle(options.title || 'Radar Chart');

    const centerX = this.width / 2;
    const centerY = this.height / 2 + 20;
    const radius = Math.min(this.width, this.height) / 2 - 60;
    const sides = data.length;
    const angleStep = (Math.PI * 2) / sides;

    // Draw grid rings
    for (let ring = 1; ring <= 5; ring++) {
      const ringRadius = (radius / 5) * ring;
      this.ctx.beginPath();
      for (let i = 0; i <= sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * ringRadius;
        const y = centerY + Math.sin(angle) * ringRadius;
        if (i === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);
      }
      this.ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }

    // Draw axis lines and labels
    data.forEach((d, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.lineTo(x, y);
      this.ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      this.ctx.stroke();

      // Label
      const labelX = centerX + Math.cos(angle) * (radius + 20);
      const labelY = centerY + Math.sin(angle) * (radius + 20);
      this.ctx.fillStyle = '#cbd5e1';
      this.ctx.font = '11px Inter, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(d.label, labelX, labelY);
    });

    // Draw data polygon
    this.ctx.beginPath();
    data.forEach((d, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const valueRadius = (d.value / 100) * radius;
      const x = centerX + Math.cos(angle) * valueRadius;
      const y = centerY + Math.sin(angle) * valueRadius;
      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    });
    this.ctx.closePath();

    // Fill
    const gradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, (options.color || '#FF6B6B') + '66');
    gradient.addColorStop(1, (options.color || '#FF6B6B') + '22');
    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    // Stroke
    this.ctx.strokeStyle = options.color || '#FF6B6B';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Draw points
    data.forEach((d, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const valueRadius = (d.value / 100) * radius;
      const x = centerX + Math.cos(angle) * valueRadius;
      const y = centerY + Math.sin(angle) * valueRadius;

      this.ctx.beginPath();
      this.ctx.arc(x, y, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = options.color || '#FF6B6B';
      this.ctx.fill();
      this.ctx.strokeStyle = '#1e293b';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    });

    return this;
  }
}

// Donut Chart
export class DonutChart extends BaseChart {
  draw(data, options = {}) {
    this.clear();
    this.drawTitle(options.title || 'Donut Chart');

    const centerX = this.width / 2;
    const centerY = this.height / 2 + 20;
    const outerRadius = Math.min(this.width, this.height) / 2 - 60;
    const innerRadius = outerRadius * 0.6;
    const total = data.reduce((sum, d) => sum + d.value, 0);

    let startAngle = -Math.PI / 2;

    data.forEach((d, i) => {
      const sliceAngle = (d.value / total) * Math.PI * 2;

      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + sliceAngle);
      this.ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
      this.ctx.closePath();
      this.ctx.fillStyle = d.color || this.colors[i % this.colors.length];
      this.ctx.fill();

      startAngle += sliceAngle;
    });

    // Center text
    this.ctx.fillStyle = '#f1f5f9';
    this.ctx.font = 'bold 24px Inter, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(options.centerValue || total, centerX, centerY - 8);
    this.ctx.fillStyle = '#94a3b8';
    this.ctx.font = '12px Inter, sans-serif';
    this.ctx.fillText(options.centerLabel || 'Total', centerX, centerY + 16);

    // Legend
    let legendY = this.padding.top + 10;
    data.forEach((d, i) => {
      this.ctx.fillStyle = d.color || this.colors[i % this.colors.length];
      this.ctx.fillRect(this.padding.left, legendY, 12, 12);
      this.ctx.fillStyle = '#94a3b8';
      this.ctx.font = '11px Inter, sans-serif';
      this.ctx.textAlign = 'left';
      this.ctx.fillText(`${d.label}: ${d.value}`, this.padding.left + 18, legendY + 10);
      legendY += 20;
    });

    return this;
  }
}

// Heatmap Chart
export class HeatmapChart extends BaseChart {
  draw(data, options = {}) {
    this.clear();
    this.drawTitle(options.title || 'Heatmap');

    const chartArea = this.getChartArea();
    const rows = data.length;
    const cols = data[0]?.values.length || 0;
    const cellWidth = chartArea.width / cols;
    const cellHeight = chartArea.height / rows;
    const maxValue = Math.max(...data.flatMap(r => r.values));

    // Draw cells
    data.forEach((row, rowIdx) => {
      row.values.forEach((val, colIdx) => {
        const x = chartArea.x + colIdx * cellWidth;
        const y = chartArea.y + rowIdx * cellHeight;
        const intensity = val / maxValue;

        // Color based on intensity (green to red)
        const r = Math.round(34 + intensity * (248 - 34));
        const g = Math.round(197 - intensity * (197 - 113));
        const b = Math.round(94 - intensity * (94 - 113));
        this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        this.ctx.fillRect(x + 1, y + 1, cellWidth - 2, cellHeight - 2);

        // Value text
        this.ctx.fillStyle = intensity > 0.5 ? '#fff' : '#1e293b';
        this.ctx.font = '10px Inter, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(val, x + cellWidth / 2, y + cellHeight / 2);
      });

      // Row label
      this.ctx.fillStyle = '#94a3b8';
      this.ctx.font = '10px Inter, sans-serif';
      this.ctx.textAlign = 'right';
      this.ctx.fillText(row.label, chartArea.x - 5, chartArea.y + rowIdx * cellHeight + cellHeight / 2);
    });

    // Column labels
    if (data[0]?.columnLabels) {
      data[0].columnLabels.forEach((label, i) => {
        const x = chartArea.x + i * cellWidth + cellWidth / 2;
        this.ctx.fillStyle = '#94a3b8';
        this.ctx.font = '10px Inter, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(label, x, chartArea.y + rows * cellHeight + 16);
      });
    }

    return this;
  }
}

// Gauge Chart
export class GaugeChart extends BaseChart {
  draw(value, options = {}) {
    this.clear();
    this.drawTitle(options.title || 'Gauge');

    const centerX = this.width / 2;
    const centerY = this.height * 0.65;
    const radius = Math.min(this.width, this.height) / 2 - 40;
    const startAngle = Math.PI;
    const endAngle = Math.PI * 2;
    const maxValue = options.maxValue || 100;
    const valueAngle = startAngle + (value / maxValue) * Math.PI;

    // Background arc
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    this.ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    this.ctx.lineWidth = 20;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();

    // Value arc
    const gradient = this.ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
    gradient.addColorStop(0, options.colorLow || '#34d399');
    gradient.addColorStop(0.5, options.colorMid || '#fbbf24');
    gradient.addColorStop(1, options.colorHigh || '#f87171');

    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, startAngle, valueAngle);
    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = 20;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();

    // Center text
    this.ctx.fillStyle = '#f1f5f9';
    this.ctx.font = 'bold 32px Inter, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(Math.round(value), centerX, centerY - 10);

    this.ctx.fillStyle = '#94a3b8';
    this.ctx.font = '12px Inter, sans-serif';
    this.ctx.fillText(options.label || `/ ${maxValue}`, centerX, centerY + 20);

    // Min/Max labels
    this.ctx.fillStyle = '#34d399';
    this.ctx.font = '11px Inter, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('0', centerX - radius, centerY + 30);

    this.ctx.fillStyle = '#f87171';
    this.ctx.fillText(maxValue, centerX + radius, centerY + 30);

    return this;
  }
}

// Create Cuisine-specific charts using the base chart classes
export function createCuisineTypePieChart(canvas, data) {
  return new PieChart(canvas).draw(data, { title: '🍽 Cuisine Distribution' });
}

export function createSpiceLevelBarChart(canvas, data) {
  return new BarChart(canvas).draw(data, { title: '🌶 Spice Level Distribution' });
}

export function createPopularityLineChart(canvas, datasets) {
  return new LineChart(canvas).draw(datasets, { title: '📈 Popularity Trends (12 Months)' });
}

export function createRegionRadarChart(canvas, data) {
  return new RadarChart(canvas).draw(data, { title: '🗺 Regional Cuisine Profile', color: '#4ECDC4' });
}

export function createDietaryDonutChart(canvas, data, options = {}) {
  return new DonutChart(canvas).draw(data, { title: '🥗 Dietary Preferences', ...options });
}

export function createCookingMethodChart(canvas, data) {
  return new HorizontalBarChart(canvas).draw(data, { title: '👨‍🍳 Popular Cooking Methods', suffix: ' recipes' });
}

export function createRatingHeatmap(canvas, data) {
  return new HeatmapChart(canvas).draw(data, { title: '⭐ Ratings by Cuisine & Course' });
}

export function createNutritionGauge(canvas, value, options = {}) {
  return new GaugeChart(canvas).draw(value, { title: '📊 Average Nutrition Score', ...options });
}

// Export chart classes
export const CuisineCharts = {
  BarChart,
  PieChart,
  LineChart,
  HorizontalBarChart,
  RadarChart,
  DonutChart,
  HeatmapChart,
  GaugeChart,
  createCuisineTypePieChart,
  createSpiceLevelBarChart,
  createPopularityLineChart,
  createRegionRadarChart,
  createDietaryDonutChart,
  createCookingMethodChart,
  createRatingHeatmap,
  createNutritionGauge
};

export default CuisineCharts;