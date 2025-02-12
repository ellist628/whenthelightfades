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

    if (enemy.threatLevel === "Minor") {
      enemyCard.classList.add("enemy-card", "minor-frame");
    } else if (enemy.threatLevel === "Moderate") {
      enemyCard.classList.add("enemy-card", "moderate-frame");
    } else if (enemy.threatLevel === "Severe") {
      enemyCard.classList.add("enemy-card", "severe-frame");
    } else if (enemy.threatLevel === "Catastrophic") {
      enemyCard.classList.add("enemy-card", "catastrophic-frame");
    } else if (enemy.threatLevel === "Eldritch") {
      enemyCard.classList.add("enemy-card", "eldritch-frame");
    } else {
      enemyCard.classList.add("enemy-card");
    }

    let content = `
      <div class="enemy-image">
        <img src="${enemy.image}" alt="${enemy.name}">
      </div>
      <h2>${enemy.name}</h2>
      <h3>${enemy.classification} - ${enemy.threatLevel}</h3>
      <p><strong>First Encountered:</strong> ${enemy.firstEncountered}</p>
      <p>${enemy.description}</p>
      <hr>
    `;

    function isUnlocked(section) {
      return enemy.unlockedSections.includes(section);
    }

    content += `
      <div class="blurred ${isUnlocked("lore") ? "unlocked" : ""}">
        <p><strong>Lore:</strong> ${enemy.lore}</p>
      </div>
    `;

    content += `<div class="blurred ${isUnlocked("stats") ? "unlocked" : ""}">`;
    content += `
      <p><strong>HP:</strong> ${enemy.stats.hp}</p>
      <p><strong>AC:</strong> ${enemy.stats.ac}</p>
      <p><strong>Speed: </strong>${enemy.stats.speed}</p>
      </div>
    `;

    content += `
      <div class="blurred ${isUnlocked("weaknesses") ? "unlocked" : ""}">
        <p><strong>Weaknesses:</strong> ${enemy.weaknesses}</p>
        <p><strong>Resistances:</strong> ${enemy.resistances}</p>
        <p><strong>Immunities:</strong> ${enemy.immunities}</p>
      </div>
    `;

    content += `
      <div class="blurred ${isUnlocked("combatBehavior") ? "unlocked" : ""}">
        <p><strong>Combat Behavior:</strong> ${enemy.combatBehavior}</p>`;
    enemy.moveset.forEach(move => {
      content += `<p>${move}</p>`;
    });
    content += `</div>`;

    enemyCard.innerHTML = content;
    enemyList.appendChild(enemyCard);
  });
}

document.getElementById("searchBar").addEventListener("keyup", filterAndSortEnemies);
document.getElementById("sortFilter").addEventListener("change", filterAndSortEnemies);
