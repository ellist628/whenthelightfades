document.addEventListener("DOMContentLoaded", function () {
  fetch("npcData.json").then(response => response.json()).then(data => displayNPCs(data));
});

function displayNPCs(npcs) {
  const npcList = document.getElementById("npc-list");
  npcList.innerHTML = "";

  npcs.forEach(npc => {
    const npcCard = document.createElement("div");
    npcCard.classList.add("npc-card");

    npcCard.innerHTML = `
      <img src="${npc.image}" alt="${npc.name}">
      <h2>${npc.name}</h2>
      <p><strong>Relation:</strong> ${npc.relation}</p>
      <p><strong>Status:</strong> ${npc.status}</p>
    `;

    npcList.appendChild(npcCard);
  });
}

function filterNPCs() {
  const searchQuery = document.getElementById("searchBar").value.toLowerCase();
  const statusFilter = document.getElementById("statusFilter").value;

  fetch("npcData.json").then(response => response.json()).then(data => {
    let filteredNPCs = data.filter(npc => npc.name.toLowerCase().includes(searchQuery) && (statusFilter === "" || npc.status === statusFilter));
    displayNPCs(filteredNPCs);
  });
}
