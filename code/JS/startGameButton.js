newEventListener("new-game-button", "click", newButtonClicked);
newEventListener("continue-game-button", "click", continueButtonClicked);
disableButton();

function newEventListener(elementId, eventType, functionName) {
    const element = document.getElementById(elementId);
    element.addEventListener(eventType, functionName);
}

/**
 * A function for clearing game data stored inside localStorage when new game button is pressed.
 */
function newButtonClicked() {
    localStorage.removeItem("hereStillSavedData");
}

function continueButtonClicked(e) {
    const savedData = localStorage.getItem("hereStillSavedData");

    if (savedData === null) {
        // Prevent link and alert if no save
        e.preventDefault();
        alert("No saved game found. Please start a new game.");
    }
}

function disableButton() {
    const savedData = localStorage.getItem("hereStillSavedData");
    const continueButton = document.getElementById("continue-game-button");

    if(savedData === null) {
        continueButton.classList.add("disabled-button");
        continueButton.removeAttribute("href");        
    }
}