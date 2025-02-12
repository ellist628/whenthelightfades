let npcData = [];

document.addEventListener("DOMContentLoaded", function () {
  fetch("npcData.json")
    .then(response => response.json())
    .then(data => {
      npcData = data;
      displayNPCs(data);
    });
});

function displayNPCs(npcs) {
  const npcList = document.getElementById("npc-list");
  npcList.innerHTML = "";

  npcs.forEach(npc => {
    const npcCard = document.createElement("div");
    npcCard.classList.add("npc-card");

    const imageClass = npc.status === "Deceased" ? "greyed-out" : "";

    npcCard.innerHTML = `
      <img src="${npc.image}" alt="${npc.name}" class="${imageClass}">
      <h2>${npc.name}</h2>
      <p><strong>Occupation:</strong> ${npc.class}</p>
      <hr>
      <p><strong>Relation:</strong> ${npc.relation}</p>
      <p><strong>Status:</strong> ${npc.status}</p>
    `;

    npcList.appendChild(npcCard);
  });
}

function sortNPCs() {
  const sortValue = document.getElementById("sortFilter").value;

  let sortedNPCs = [...npcData];

  if (sortValue === "a-z") {
    sortedNPCs.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "z-a") {
    sortedNPCs.sort((a, b) => b.name.localeComppare(a.name));
  }

  dislayNPCs(sortedNPCs);
}

function filterNPCs() {
  const searchQuery = document.getElementById("searchBar").value.toLowerCase();
  const statusFilter = document.getElementById("statusFilter").value;

  fetch("npcData.json").then(response => response.json()).then(data => {
    let filteredNPCs = data.filter(npc => npc.name.toLowerCase().includes(searchQuery) && (statusFilter === "" || npc.status === statusFilter));
    displayNPCs(filteredNPCs);
  });
}
