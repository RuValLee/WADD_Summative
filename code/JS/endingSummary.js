document.addEventListener("DOMContentLoaded", () => {
  const savedData = localStorage.getItem("hereStillSavedData");

  if (!savedData) {
    document.getElementById("ending-page").innerHTML = "<p>No saved game data found.</p>";
    return;
  }

  const { currentDay, npcProgress, choiceSummary } = JSON.parse(savedData);

  // 1. Final day info
  document.getElementById("final-day-info").innerHTML = `
    <h2>Day Reached</h2>
    <p>You reached Day ${currentDay} out of 7.</p>
  `;

  // 2. NPC choices summary
  const npcSection = document.getElementById("npc-choices-summary");
  npcSection.innerHTML = "<h2>Choices Made per Villager</h2>";

  for (const [npc, choices] of Object.entries(npcProgress)) {
    const formattedChoices = choices.map((c, i) => `Day ${i + 1}: ${c}`).join("<br>");
    npcSection.innerHTML += `
      <div>
        <h3>${npc.charAt(0).toUpperCase() + npc.slice(1)}</h3>
        <p>${formattedChoices || "No interactions"}</p>
      </div>
    `;
  }

  // 3. Overall choice count
  const countSection = document.getElementById("overall-choice-count");
  countSection.innerHTML = `
    <h2>Total Choices Made</h2>
    <ul>
      <li>Helped: ${choiceSummary.help}</li>
      <li>Sabotaged: ${choiceSummary.sabotage}</li>
      <li>Left Alone: ${choiceSummary.leave}</li>
    </ul>
  `;
});