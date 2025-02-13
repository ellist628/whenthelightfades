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

    function isUnlocked(section) {
      return enemy.unlockedSections.includes(section);
    }

    // General Info
    let content = `
      <div class="blurred ${isUnlocked("general") ? "unlocked" : ""}">
        <div class="enemy-image">
          <img src="${enemy.image}" alt="${enemy.name}">
        </div>
        <h2>${enemy.name}</h2>
        <h3>${enemy.classification} - ${enemy.threatLevel}</h3>
        <p><strong>First Encountered:</strong> ${enemy.firstEncountered}</p>
        <p>${enemy.description}</p>
        <div class="divider"></div>
      </div>
    `;

    content += `
      <div class="blurred ${isUnlocked("lore") ? "unlocked" : ""}">
        <p>${enemy.lore}</p>
        <div class="divider"></div>
      </div>
    `;

    // Base Stats
    content += `
      <table class="enemy-stats blurred ${isUnlocked("stats") ? "unlocked" : ""}">
        <tr><th>🩸 HP</th><td>${enemy.stats.HP}</td></tr>
        <tr><th>🛡️ AC</th><td>${enemy.stats.AC}</td></tr>
        <tr><th>⚡ Speed</th><td>${enemy.stats.Speed}</td></tr>
      </table>
    `;

    // Weaknesses // Resistances // Immunities
    content += `
      <table class="damage-section enemy-stats blurred ${isUnlocked("resistances") ? "unlocked" : ""}">
        <tr><th>Weaknesses</th><td>${enemy.stats.Weaknesses}</td></tr>
        <tr><th>Resistances</th><td>${enemy.stats.Resistances}</td></tr>
        <tr><th>Immunities</th><td>${enemy.stats.Immunities}</td></tr>
        <tr><th>Conditions</th><td>${enemy.stats.Conditions}</td></tr>
      </table>
    `;

    // Attack Info
    content += `
      <table class="attack-behavior enemy-stats blurred ${isUnlocked("attack") ? "unlocked" : ""}">
        <tr><th>Damage Types</th><td>${enemy.stats["Damage Types"]}</td></tr>
        <tr><th>Attack Behavior</th><td>${enemy.stats["Attack Behavior"]}</td></tr>
      </table>
    `;

    content += `</div>`;

    enemyCard.innerHTML = content;
    enemyList.appendChild(enemyCard);
  });
}

document.getElementById("searchBar").addEventListener("keyup", filterAndSortEnemies);
document.getElementById("sortFilter").addEventListener("change", filterAndSortEnemies);
