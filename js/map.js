var mapWidth = 2000;
var mapHeight = 1500;
var bounds = [[0, 0], [mapHeight, mapWidth]];

var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2,
  maxZoom: 2
});

var imageUrl = "images/solvaris.jpg";
L.imageOverlay(imageUrl, bounds).addTo(map);
map.fitBounds(bounds);

var locations = [];

locations.forEach(location => {
  var marker = L.marker(location.coords).addTo(map);
  marker.bindPopup(`<b>${location.name}</b><br><a href="${location.link}">View NPCs</a>`);
});
