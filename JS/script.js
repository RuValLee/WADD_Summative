function preload() {
    backgroundMap = loadImage("assets/backgroundMap.png");
    characterSprite = loadImage("assets/Characters.png");
}

function setup() {
    const canvas = createCanvas(640, 640);
    canvas.id("game-canvas");

    // Loads the saved game data from localStorage if there's any.
    loadGameData();

    // Gets the initial player character walk animation sprites and creates all game objects.
    getPlayerSprite(characterSprite, walkAnimation, 8, 0);
    characterCreate();
    obstacleCreate();
    interactionAreaCreate();
}

function draw() {
    // Draws the background image of the village on the game canvas.
    image(backgroundMap, 0, 0, 640, 640);

    // Draws the player character and NPCs onto the game canvas.
    drawCharacters();

    // Allows interaction detection and shows the dialogue box when interactions are triggered.
    interactionDetection(allInteractionAreas);
    showDialogueBox();

    // Fades out and in between days as a transition animation.
    fadeTransition();
}

function keyPressed() {
    // Disables the interact button and allows dialogue box to be displayed when F key is pressed.
    if((key === "f" || key === "F")) {
        if(interactIndicatorOn) {
            interactIndicatorOn = false;
            dialogueBoxVisible = true;
            dialogueStarted = true;
        }
    }

    // Progresses the dialogue to the following lines / closes the dialogue when SPACE key is pressed.
    if(key === " ") {
        if(dialogueBoxVisible) {
            if(dialogueIndex < currentDialogueGroup.length - 1) {
                dialogueIndex++;
            }

            // Stops the intro dialogue from going over the final line, so that the line stays on display when options are available.
            else if(currentDay < 7 && currentDialogueGroup === dialogues[`day${currentDay}`][currentNPC].intro && dialogueIndex === currentDialogueGroup.length - 1) {
                dialogueIndex += 0;
            }

            // Closes the dialogue and the box after the final NPC dialogue line has been displayed.
            else if(currentDay < 7 && currentDialogueGroup === dialogues[`day${currentDay}`][currentNPC].options[currentDialogueType]
                    && dialogueIndex === currentDialogueGroup.length - 1) {
                // Resetting dialogue and dialogue box states.
                interactIndicatorOn = true;
                dialogueBoxVisible = false;
                dialogueStarted = false;
                playerChoice = null;

                // Removes the interaction area after first time interaction.
                allInteractionAreas = allInteractionAreas.filter(interactionArea => interactionArea.name !== currentNPC);

                // Automatically starts the dayEnd dialogue if all NPCs are interacted.
                if(allInteractionAreas.length === 0) {
                    currentDialogueGroup = dialogues[`day${currentDay}`].dayEnd;
                    dialogueBoxVisible = true;
                    dialogueIndex = 0;
                }
            }

            // Triggers the day transition animation automatically after the dialogue box closes.
            else if(currentDialogueGroup === dialogues[`day${currentDay}`].dayEnd && dialogueIndex === currentDialogueGroup.length - 1 && !dayTransitionOngoing) {
                dialogueBoxVisible = false;
                dayTransitionOngoing = true;
                isFadingOut = true;
            }

            // Triggers the ending fade out animation after the final dialogue line on the last day (day 7).
            else if(currentDay === 7 && dialogueIndex === currentDialogueGroup.length - 1) {
                endingTransition(); 
            }
        }
    }

    // Allows players to choose their actions with number keys 1, 2 and 3 when the final line in "intro" is being displayed on screen.
    if(currentDay < 7 && dialogueBoxVisible && playerChoice === null
        && currentDialogueGroup === dialogues[`day${currentDay}`][currentNPC].intro && dialogueIndex === currentDialogueGroup.length - 1) {
        if(key === "1") {
            selectChoices("help");
            currentDialogueType = "help";
        }
        else if(key === "2") {
            selectChoices("sabotage");
            currentDialogueType = "sabotage";
        }
        else if(key === "3") {
            selectChoices("leave");
            currentDialogueType = "leave";
        }
    }
}