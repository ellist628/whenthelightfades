let npcData = [];

document.addEventListener("DOMContentLoaded", function () {
  fetch("npcData.json")
    .then(response => response.json())
    .then(data => {
      npcData = data.sort((a, b) => a.name.localeCompare(b.name));
      filterAndSortNPCs();
    });
});

function filterAndSortNPCs() {
  const searchQuery = document.getElementById("searchBar").value.toLowerCase();
  const statusFilter = document.getElementById("statusFilter").value;
  const sortValue = document.getElementById("sortFilter").value;

  let filteredNPCs = npcData.filter(npc =>
    npc.name.toLowerCase().includes(searchQuery) && (statusFilter === "" || npc.status.toLowerCase() === statusFilter.toLowerCase())
  );

  if (sortValue === "a-z") {
    filteredNPCs.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "z-a") {
    filteredNPCs.sort((a, b) => b.name.localeCompare(a.name));
  }

  displayNPCs(filteredNPCs);
}

function displayNPCs(npcs) {
  const npcList = document.getElementById("npc-list");
  npcList.innerHTML = "";

  npcs.forEach(npc => {
    const npcCard = document.createElement("div");
    
    if (npc.playerCharacter) {
      npcCard.classList.add("npc-card", "player-frame");
    } else {
      npcCard.classList.add("npc-card");
    }
  
    const imageClass = npc.status.toLowerCase() === "deceased" ? "greyed-out" : "";

    let containerClass = npc.altImg ? "npc-image-container has-alt" : "npc-image-container";

    let imageContent = `
      <div class="${containerClass}">
        <img src="${npc.image}" alt="${npc.name}" class="default-image ${imageClass}">
    `;

    if (npc.altImg) {
      imageContent += `
        <img src="${npc.altImg}" alt="${npc.name} Plasmoid Form" class="alt-image ${imageClass}">
      `;
    }

    imageContent += `</div>`;

    npcCard.innerHTML = `
      ${imageContent}
      <h2>${npc.name}</h2>
      <p><strong>Occupation:</strong> ${npc.class}</p>
      <hr>
      <p><strong>Last Seen:</strong> ${npc.seen}</p>
      <p><strong>Status:</strong> ${npc.status}</p>
    `;

    npcList.appendChild(npcCard);
  });
}

document.getElementById("searchBar").addEventListener("keyup", filterAndSortNPCs);
document.getElementById("statusFilter").addEventListener("change", filterAndSortNPCs);
document.getElementById("sortFilter").addEventListener("change", filterAndSortNPCs);
