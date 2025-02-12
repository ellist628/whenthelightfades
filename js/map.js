var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var locations = [];

locations.forEach(location => {
  var marker = L.marker(location.coords).addTo(map);
  marker.bindPopup(`<b>${location.name}</b><br><a href="${location.link}">View NPCs</a>`);
});
