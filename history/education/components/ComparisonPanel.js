export function ComparisonPanel(timeline) {
  const rows = timeline
    .map(
      (entry) => `<tr>
        <td class="comparison-year">${entry.year}</td>
        <td class="comparison-then">${entry.then}</td>
        <td class="comparison-now">${entry.now}</td>
      </tr>`
    )
    .join("");

  return `<div class="comparison-panel">
    <h3>Then vs. Now, at a Glance</h3>
    <div class="comparison-table-wrap">
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Period</th>
            <th>Historical System</th>
            <th>Modern Equivalent</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}