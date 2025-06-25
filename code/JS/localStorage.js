/**
 * A function for saving game data into localStorage.
 */
function saveGameData() {
    const gameState = {
        currentDay,
        npcProgress,
        choiceSummary
    };
    localStorage.setItem("hereStillSavedData", JSON.stringify(gameState));
}

/**
 * A function for loading game data from localStorage.
 */
function loadGameData() {
    const savedData = localStorage.getItem("hereStillSavedData");

    // Loads and applies the saved data if there is any in localStorage.
    if(savedData !== null) {
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

/**
 * A function for clearing game data stored inside localStorage.
 */
function clearGameData() {
    localStorage.removeItem("hereStillSavedData");
}