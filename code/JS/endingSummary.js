if (localStorage.getItem("hereStillSavedData") === null) {
    document.getElementById("ending-page").innerHTML = '<p id="no-data-text">No saved game data found.</p>' + '<nav><a href"index.html">Close page and return to main menu</a><nav>';
} else {
    createNewHtmlElement("day1-summary", "p", "Hi");
}

//   const {npcProgress, choiceSummary} = JSON.parse(savedData);

//   // 2. NPC choices summary
//   const npcSection = document.getElementById("player-choices");
//   npcSection.innerHTML = "<h2>Choices Made per Villager</h2>";

//   for (const [npc, choices] of Object.entries(npcProgress)) {
//     const formattedChoices = choices.map((c, i) => `Day ${i + 1}: ${c}`).join("<br>");
//     npcSection.innerHTML += `
//       <div>
//         <h3>${npc.charAt(0).toUpperCase() + npc.slice(1)}</h3>
//         <p>${formattedChoices || "No interactions"}</p>
//       </div>
//     `;
//   }

//   // 3. Overall choice count
//   const countSection = document.getElementById("overall-choice-count");
//   countSection.innerHTML = `
//     <h2>Total Choices Made</h2>
//     <ul>
//       <li>Helped: ${choiceSummary.help}</li>
//       <li>Sabotaged: ${choiceSummary.sabotage}</li>
//       <li>Left Alone: ${choiceSummary.leave}</li>
//     </ul>
//   `;

function createNewHtmlElement(elementId, elementType, content) {
    const getElement = document.getElementById(elementId);
    const newElement = document.createElement(elementType);

    newElement.innerText = content;
    getElement.appendChild(newElement);
}