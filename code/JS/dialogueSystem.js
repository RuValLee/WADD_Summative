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

        if(currentDay < 7 && currentDialogueGroup === dialogues[`day${currentDay}`][currentNPC].intro && dialogueIndex === currentDialogueGroup.length - 1) {
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
    npcProgress[currentNPC].push(optionChosen);
    dialogueIndex = 0;
}

/**
 * A function for progressing the game (number of day).
 */
function startNewDay() {
    // Progresses the number of day.
    if(currentDay < 7) {
        currentDay++;
    } else {
        currentDay = 7;
    }

    // Resets variable states.
    dialogueIndex = 0;
    playerChoice = null;
    dialogueStarted = false;

    // Resets player location.
    player.x = width / 2;
    player.y = height / 4 * 3;

    // Resets interactions.
    interactionAreaCreate();

    // Triggers ending dialogue immediately when it is day 7.
    if(currentDay === 7) {
        endingDetermine();
        dialogueBoxVisible = true;
    }
}

function endingDetermine() {
    // Counts the number of each choice made by the player.
    for(let npc in npcProgress) {
        for(let choice of npcProgress[npc]) {
            choiceSummary[choice]++;
        }
    }

    // Determines the conditions for each ending.
    if(choiceSummary.help > 12) {
        currentDialogueGroup = dialogues[`day${currentDay}`].helpEnding;
    }
    else if(choiceSummary.sabotage > 12) {
        currentDialogueGroup = dialogues[`day${currentDay}`].sabotageEnding;
    }
    else if(choiceSummary.leave > 12) {
        currentDialogueGroup = dialogues[`day${currentDay}`].leaveEnding;
    }
    else if(choiceSummary.help === 8 && choiceSummary.sabotage === 8 && choiceSummary.leave === 8) {
        currentDialogueGroup = dialogues[`day${currentDay}`].balanceEnding;
    } else {
        currentDialogueGroup = dialogues[`day${currentDay}`].loopEnding;
    }
}