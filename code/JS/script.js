function preload() {
    backgroundMap = loadImage("../assets/backgroundMap.png");
    characterSprite = loadImage("../assets/Characters.png");
}

function setup() {
    const canvas = createCanvas(640, 640);
    canvas.id("game-canvas");
    getPlayerSprite(characterSprite, walkAnimation, 8, 0);

    characterCreate();

    // Creates the obstacles and interaction areas.
    obstacleCreate();
    interactionAreaCreate();
}

function draw() {
    // Draws the background image of the village on the game canvas.
    image(backgroundMap, 0, 0, 640, 640);

    drawCharacters();

    interactionDetection(allInteractionAreas);
    showDialogueBox();

    fadeTransition();
}

function keyPressed() {
    if((key === "f" || key === "F")) {
        if(interactIndicatorOn) {
            interactIndicatorOn = false;
            dialogueBoxVisible = true;
            dialogueStarted = true;
        }
    }

    if(key === " ") {
        if(dialogueBoxVisible) {
            if(dialogueIndex < currentDialogueGroup.length - 1) {
                dialogueIndex++;
            }
            else if(currentDay < 7 && currentDialogueGroup === dialogues[`day${currentDay}`][currentNPC].intro && dialogueIndex === currentDialogueGroup.length - 1) {
                dialogueIndex += 0;
            }
            else if(currentDay < 7 && currentDialogueGroup === dialogues[`day${currentDay}`][currentNPC].options[currentDialogueType]
                    && dialogueIndex === currentDialogueGroup.length - 1) {
                // Resetting dialogue and dialogue box states.
                interactIndicatorOn = true;
                dialogueBoxVisible = false;
                dialogueStarted = false;
                playerChoice = null;

                // Removes the interaction area after first interaction.
                allInteractionAreas = allInteractionAreas.filter(interactionArea => interactionArea.name !== currentNPC);

                // Automatically starts the dayEnd dialogue if all NPCs are interacted.
                if(allInteractionAreas.length === 0) {
                    currentDialogueGroup = dialogues[`day${currentDay}`].dayEnd;
                    dialogueBoxVisible = true;
                    dialogueIndex = 0;
                }
            }
            else if(currentDialogueGroup === dialogues[`day${currentDay}`].dayEnd && dialogueIndex === currentDialogueGroup.length - 1 && !dayTransitionOngoing) {
                dialogueBoxVisible = false;
                dayTransitionOngoing = true;
                isFadingOut = true;
            }
            else if(currentDay === 7 && dialogueIndex === currentDialogueGroup.length - 1) {
                endingTransition(); 
            }
        }
    }

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