// Harike Wetland Explorer — no external API calls, purely local interactivity

document.addEventListener('DOMContentLoaded', function () {
  var zones = document.querySelectorAll('.hw-map-zone');

  zones.forEach(function (zone) {
    zone.addEventListener('click', function () {
      zones.forEach(function (z) { z.classList.remove('hw-zone-active'); });
      zone.classList.add('hw-zone-active');
    });
  });
});