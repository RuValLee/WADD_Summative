function saveGameState() {
    const gameState = {
        currentDay,
        totalOptionCount,
        dailyChoices
    };
    localStorage.setItem("hereStillSavedData", JSON.stringify(gameState));
}

function loadGameState() {
    const savedData = localStorage.getItem("hereStillSavedData");

    if(savedData) {
        const gameState = JSON.parse(savedData);
        currentDay = gameState.currentDay;
        totalOptionCount = gameState.totalOptionCount;
        dailyChoices = gameState.dailyChoices;
    } else {
        currentDay = 1;
    }
}

function clearGameStates() {
    localStorage.removeItem("hereStillSavedData");
}