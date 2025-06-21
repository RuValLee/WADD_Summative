function preload() {
    backgroundMap = loadImage("../assets/backgroundMap.png");
    characterSprite = loadImage("../assets/Characters.png");
}

function setup() {
    const canvas = createCanvas(640, 640);
    canvas.id("gameCanvas");
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
            else if(currentDialogueGroup === dialogues[`day${currentDay}`][currentNPC].intro && dialogueIndex === currentDialogueGroup.length - 1) {
                dialogueIndex += 0;
            }
            else if(currentDialogueGroup === dialogues[`day${currentDay}`][currentNPC].options[currentDialogueType]
                    && dialogueIndex === currentDialogueGroup.length - 1) {
                interactIndicatorOn = true;
                dialogueBoxVisible = false;
                dialogueIndex = 0;

                // Removes the interaction area after first interaction.
                allInteractionAreas = allInteractionAreas.filter(interactionArea => interactionArea !== currentNPC);
            }
        }
    }

    if(dialogueBoxVisible && playerChoice === null) {
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

/**
 * A function for detecting if interactions are available, displays the interact button when it is available.
 * For loop to check which dialogue to show when the player gets close to an NPC.
 * @param {GameObject[]} objects An array holding all NPC interaction locations.
 */
function interactionDetection(objects) {
    // Hides the interact button when no interaction is available.
    interactIndicatorOn = false;

    // Displays the button when the player is close to any NPCs.
    for(let object of objects) {
        if(player.collides(object) && !dialogueBoxVisible) {
            interactIndicatorOn = true;

            // Draws the interact button.
            buttonCreate(width / 5 * 4, height / 2, 180, 50, "F - Interact");

            break;
        }
    }

    // Gets the corresponding dialogue group to display when the player approaches an NPC.
    for(let object of objects) {
        if(player.collides(object) && playerChoice === null && !dialogueStarted) {
            dialogueToShow(object, dialogues[`day${currentDay}`][object.name].intro);
            break;
        }
    }
}

/**
 * A function for displaying the dialogue and the dialogue box.
 * For loop to display the choice buttons during dialogues.
 */
function showDialogueBox() {
    if(dialogueBoxVisible) {
        textAlign(LEFT, TOP);
        fill(255, 200);
        rectMode(CORNER);
        rect(20, 510, 600, 110);
        fill(0);
        textSize(24);
        text(currentDialogueGroup[dialogueIndex], 35, height - 115, width - 80, height - 30);

        if(currentDialogueGroup === dialogues[`day${currentDay}`][currentNPC].intro && dialogueIndex === currentDialogueGroup.length - 1) {
            showOptions();
        }
    }
}

/**
 * A function for determining which dialogue gropu should be displayed.
 * @param {GameObject} npcInteraction The interaction game object of the NPC.
 * @param {string[]} dialogueGroup An array holding the dialogue strings.
 */
function dialogueToShow(npcInteraction, dialogueGroup) {
    currentNPC = npcInteraction.name;
    currentDialogueGroup = dialogueGroup;
    dialogueIndex = 0;
}

/**
 * A function to switch to the dialogue group corresponding to players' choices.
 * @param {"help" | "sabotage" | "leave"} optionChosen The dialogue chosen by the player.
 */
function selectChoices(optionChosen) {
    playerChoice = optionChosen;
    currentDialogueGroup = dialogues[`day${currentDay}`][currentNPC].options[optionChosen];
    dialogueIndex = 0;
}