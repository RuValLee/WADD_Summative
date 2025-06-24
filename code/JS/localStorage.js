function saveGameData() {
    const gameState = {
        currentDay,
        npcProgress,
        choiceSummary
    };
    localStorage.setItem("hereStillSavedData", JSON.stringify(gameState));
}

function loadGameData() {
    const savedData = localStorage.getItem("hereStillSavedData");

    if(savedData) {
        const gameState = JSON.parse(savedData);
        currentDay = gameState.currentDay;
        npcProgress = gameState.npcProgress;
        choiceSummary = gameState.choiceSummary;
    } else {
        currentDay = 1;
        npcProgress = {
            fisher: [],
            builder: [],
            farmer: [],
            woodcutter: []
        };
        choiceSummary = {
            help: 0,
            sabotage: 0,
            leave: 0
        };
    }
}

function clearGameData() {
    localStorage.removeItem("hereStillSavedData");
}