const savedData = localStorage.getItem("hereStillSavedData");
let parsedData;

if (savedData === null) {
    document.getElementById("ending-page").innerHTML =
    '<p id="no-data-text">No saved game data found.</p>' + 
    '<nav><a href="index.html">Close page and return to main menu</a></nav>';
} else {
    parsedData = JSON.parse(savedData);
    displayNpcData();
    displayChoiceCount();
    displayFinalMessage();
}

function createNewHtmlElement(elementId, elementType, content) {
    const getElement = document.getElementById(elementId);
    const newElement = document.createElement(elementType);

    newElement.innerText = content;
    getElement.appendChild(newElement);
}

function displayNpcData() {
    const npcProgressData = parsedData.npcProgress;

    // Loops through the 6 days with choices (day 7 dialogue only, no choices).
    for(let day = 0; day < 6; day++) {
        const dayId = `day${day + 1}-summary`;

        // Loops through all NPCs in the parsed npcProgress object.
        for (let npc in npcProgressData) {
            // Gets the value of the choice made according to their array index.
            const dailyChoice = npcProgressData[npc][day];

            let sentence = "";

            // Displays the choice made by the player each day.
            switch (dailyChoice) {
                case "help":
                    sentence = `You helped the ${npc}.`;
                    break;
                case "sabotage":
                    sentence = `You persuaded the ${npc} to skip work.`;
                    break;
                case "leave":
                    sentence = `You left the ${npc} alone.`;
                    break;
                default:
                    sentence = `You haven't met the ${npc} on this day.`;
            }

            createNewHtmlElement(dayId, "p", sentence);
        }
    }
}

function displayChoiceCount() {
    const choiceSummaryData = parsedData.choiceSummary;

    // Loops through all choice types ("help", "sabotage", "leave") in the parsed choiceSummary object.
    for (let choiceType in choiceSummaryData) {
        const choiceId = choiceType + "-count";

        let sentence = "";

        // Displays the choice made by the player each day.
        switch (choiceType) {
            case "help":
                sentence = `Helped the villagers with work: ${choiceSummaryData[choiceType]} times`;
                break;
            case "sabotage":
                sentence = `Persuaded the villagers to skip work: ${choiceSummaryData[choiceType]} times`;
                break;
            case "leave":
                sentence = `Left the villagers alone for personal time: ${choiceSummaryData[choiceType]} times`;
                break;
            }
        createNewHtmlElement(choiceId, "p", sentence);
    }
}

function displayFinalMessage() {
    const choiceSummaryData = parsedData.choiceSummary;;

    let finalText = "";

    if(choiceSummaryData.help > 12) {
        finalText = "You have helped the villagers many times throughout your journey. They appreciated your help. Thanks to you, this place started to grow. It has always remained still here, but change began with you and the little hero who's staying here, still.";
    }
    else if(choiceSummaryData.sabotage > 12) {
        finalText = "You often persuaded the villagers to skip their work. Over-resting could lead to their own suffering, and the little hero has decided to step in before it's too late. It has always remained still here, but change will begin with the little hero who's staying here, still.";
    }
    else if(choiceSummaryData.leave > 12) {
        finalText = "You often chose not to intervene and observed from a distance. Your decision inspired the little hero to become independent, leading them to growth. It has always remained still here, but that change will begin with the little hero who's staying here, still.";
    }
    else if(choiceSummaryData.help === 8 && choiceSummaryData.sabotage === 8 && choiceSummaryData.leave === 8) {
        finalText = "You have perfectly balanced between helping the villagers, persuading them to rest, and leaving them with private moments. Thanks to you, this village has become more lively, and it will surely become even better. It has always remained still here, but change will begin with the little hero who's staying here, still.";
    } else {
        finalText = "You walked through the same days and the same place, again and again. Even though you didn't bring concrete changes to this place, the day when the village grows will come. It has always remained still here, but that change will begin eventually, with the little hero who's staying here, still.";
    }

    createNewHtmlElement("final-message", "p", finalText)
}