newEventListener("new-game-button", "click", newButtonClicked);
newEventListener("continue-game-button", "click", continueButtonClicked);
disableButton();

/**
 * A function for adding new event listeners to HTML elements.
 * @param {string} elementId The string for the ID of the element to add an event listener to.
 * @param {string} eventType The string for the type of event to listen for.
 * @param {Function} functionName The event handler function to call when the event occurs.
 */
function newEventListener(elementId, eventType, functionName) {
    const element = document.getElementById(elementId);
    element.addEventListener(eventType, functionName);
}

/**
 * A function for clearing game and endingState data stored inside localStorage when new game button is pressed.
 */
function newButtonClicked() {
    localStorage.removeItem("hereStillSavedData");
    localStorage.removeItem("endingState");
}

/**
 * A function for resuming the game with stored data when continue game button is pressed.
 * The alert part in this function is written by generative AI.
 * Author: ChatGPT
 * Date: 25/06/2025
 * @param {MouseEvent} event The event that is passed to the event handler.
 */
function continueButtonClicked(event) {
    const savedData = localStorage.getItem("hereStillSavedData");

    // Prevents link redirection and displays pop-up alert if there is no save data in localStorage.
    if (savedData === null) {
        // These two lines were written by ChatGPT.
        event.preventDefault();
        alert("No saved game found. Please start a new game.");
        // End of AI-generated code.
    }
}

/**
 * A function for disabling the continue game button when there is no stored game data / ending summary has been viewed.
 */
function disableButton() {
    const savedData = localStorage.getItem("hereStillSavedData");
    const endingData = localStorage.getItem("endingState");
    const continueButton = document.getElementById("continue-game-button");

    if(savedData === null || endingData === "viewed") {
        // Class added to ID for CSS styling, removes href attribute to prevent accidental redirection.
        continueButton.classList.add("disabled-button");
        continueButton.removeAttribute("href");        
    }
}