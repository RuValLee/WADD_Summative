function preload() {
    backgroundMap = loadImage("../assets/backgroundMap.png");
    characterSprite = loadImage("../assets/Characters.png");
}

function setup() {
    const canvas = createCanvas(640, 640);
    canvas.id("gameCanvas");
    getPlayerSprite(characterSprite, walkAnimation, 8, 0);

    // Creates the player character and NPCs.
    player = new Player(320, 600, 50, 50, 3, 5, walkAnimation);
    fisher = new NPC(125, 500, 100, 70);
    builder = new NPC(230, 320, 75, 50);
    farmer = new NPC(585, 440, 50, 50);
    woodcutter = new NPC(600, 140, 50, 50);

    // Creates the obstacles and interaction areas.
    obstacleCreate();
    interactionAreaCreate();
}

function draw() {
    // Draws the background image of the village on the game canvas.
    image(backgroundMap, 0, 0, 640, 640);

    // Draws NPCs and player character on the game canvas.
    fisher.display(characterSprite, 0, spritePixelSize * 2, spritePixelSize * 2, spritePixelSize * 1.5);
    builder.display(characterSprite, 0, spritePixelSize * 3.5, spritePixelSize * 1.5, spritePixelSize);
    farmer.display(characterSprite, 0, spritePixelSize * 4.5, spritePixelSize, spritePixelSize);
    woodcutter.display(characterSprite, 0, spritePixelSize * 5.5, spritePixelSize, spritePixelSize);
    player.display();
    player.update(allObstacles);

    interactionDetection(allInteractionAreas);
    showDialogueBox();
    dialogueProgress();

    console.log(dialogueIndex);
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

function interactionAreaCreate() {
    // Creates game objects for the NPC interaction areas. Names for interaction tracking.
    rectMode(CENTER);
    fisherInteraction = new GameObject(150, 485, 40, 40);
    fisherInteraction.name = "fisher";
    builderInteraction = new GameObject(230, 315, 40, 40);
    builderInteraction.name = "builder";
    farmerInteraction = new GameObject(600, 140, 40, 40);
    farmerInteraction.name = "farmer";
    woodcutterInteraction = new GameObject(580, 430, 40, 40);
    woodcutterInteraction.name = "woodcutter";

    allInteractionAreas.push(fisherInteraction, builderInteraction, farmerInteraction, woodcutterInteraction);
    
    // For testing and checking interaction areas while coding, not displayed in the actual game.
    // for(let interactionArea of allInteractionAreas) {
    //     interactionArea.display();
    // }
}

function interactionDetection(objects) {
    interactIndicatorOn = false;

    for(let object of objects) {
        if(player.collides(object) && !dialogueBoxVisible) {
            interactIndicatorOn = true;

            // Draws the interact button when the player gets close to an NPC.
            buttonCreate(width / 5 * 4, height / 2, 180, 50, "F - Interact");

            break;
        }
    }

    for(let object of objects) {
        if(player.collides(object) && playerChoice === null && !dialogueStarted) {
            dialogueToShow(object, dialogues[`day${currentDay}`][object.name]);
            break;
        }
    }
}

function showDialogueBox() {
    if(dialogueBoxVisible) {
        textAlign(LEFT, TOP);
        fill(255, 200);
        rectMode(CORNER);
        rect(20, 510, 600, 110);
        fill(0);
        textSize(24);
        text(currentDialogueGroup[dialogueIndex], 35, height - 115, width - 80, height - 30);
    }
}

function dialogueToShow(npcInteraction, dialogueGroup) {
    currentNPC = npcInteraction.name;
    currentDialogueGroup = dialogueGroup.intro;
    dialogueIndex = 0;
}

function showOptions() {
    buttonCreate(470, height / 2 + 30, 300, 50, "1 - Help");    // Help option
    buttonCreate(470, height / 2 + 90, 300, 50, "2 - Persuade to skip work");    // Sabotage option
    buttonCreate(470, height / 2 + 150, 300, 50, "3 - Leave");    // Leave option
}

function selectChoices(optionChosen) {
    playerChoice = optionChosen;
    currentDialogueGroup = dialogues[`day${currentDay}`][currentNPC].options[optionChosen];
    dialogueIndex = 0;
}

function dialogueProgress() {
    if(dialogueBoxVisible) {
        if(currentDialogueGroup === dialogues[`day${currentDay}`][currentNPC].intro && dialogueIndex === currentDialogueGroup.length - 1) {
            showOptions();
        }

        if(currentDialogueGroup === dialogues[`day${currentDay}`][currentNPC].options[currentDialogueType]
            && dialogueIndex === currentDialogueGroup.length - 1) {
            interactIndicatorOn = true;
            dialogueBoxVisible = false;
            dialogueIndex = 0;
        }
    }
}