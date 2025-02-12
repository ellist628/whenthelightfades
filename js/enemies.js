let enemyData = [];

document.addEventListener("DOMContentLoaded", function () {
  fetch("enemyData.json")
    .then(response => response.json())
    .then(data => {
      enemyData = data.sort((a, b) => a.name.localeCompare(b.name));
      filterAndSortEnemies();
    });
});

function filterAndSortEnemies() {
  const searchQuery = document.getElementById("searchBar").value.toLowerCase();
  const sortValue = document.getElementById("sortFilter").value;

  let filteredEnemies = enemyData.filter(enemy => enemy.name.toLowerCase().includes(searchQuery));

  if (sortValue === "a-z") {
    filteredEnemies.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "z-a") {
    filteredEnemies.sort((a, b) => b.name.localeCompare(a.name));
  }

  displayEnemies(filteredEnemies);
}

function displayEnemies(enemies) {
  const enemyList = document.getElementById("enemy-list");
  enemyList.innerHTML = "";

  enemies.forEach(enemy => {
    const enemyCard = document.createElement("div");
    enemyCard.classList.add("enemy-card");

    enemyCard.innerHTML = `
      <img src="${enemy.image}" alt="${enemy.name}">
      <h2>${enemy.name}</h2>
    `;

    enemyList.appendChild(enemyCard);
  });
}

document.getElementById("searchBar").addEventListener("keyup", filterAndSortEnemies);
document.getElementById("sortFilter").addEventListener("change", filterAndSortEnemies);
