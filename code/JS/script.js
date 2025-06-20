let backgroundMap;
let characterSprite;
const gridSize = 16;
const spritePixelSize = 32;
let walkAnimation = [];
let player, woodcutter, farmer, fisher, builder;
let allInteractionAreas = [];
let woodcutterInteraction, farmerInteraction, fisherInteraction, builderInteraction;
let allObstacles = [];
let interactIndicatorOn = false;
let dialogueBoxVisible = false;

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
    console.log(interactIndicatorOn);
    console.log(dialogueBoxVisible);
    // Draws NPCs and player character on the game canvas.
    fisher.display(characterSprite, 0, spritePixelSize * 2, spritePixelSize * 2, spritePixelSize * 1.5);
    builder.display(characterSprite, 0, spritePixelSize * 3.5, spritePixelSize * 1.5, spritePixelSize);
    farmer.display(characterSprite, 0, spritePixelSize * 4.5, spritePixelSize, spritePixelSize);
    woodcutter.display(characterSprite, 0, spritePixelSize * 5.5, spritePixelSize, spritePixelSize);
    player.display();
    player.update(allObstacles);

    interactionDetection(allInteractionAreas);
    showDialogue();
}

function keyPressed() {
    if((key === "f" || key === "F")) {
        if(interactIndicatorOn) {
            interactIndicatorOn = false;
            dialogueBoxVisible = true;            
        }
    }
}

function interactionAreaCreate() {
    // Creates game objects for the NPC interaction areas.
    rectMode(CENTER);
    fisherInteraction = new GameObject(150, 485, 40, 40);
    builderInteraction = new GameObject(230, 315, 40, 40);
    farmerInteraction = new GameObject(600, 140, 40, 40);
    woodcutterInteraction = new GameObject(580, 430, 40, 40);

    allInteractionAreas.push(fisherInteraction, builderInteraction, farmerInteraction, woodcutterInteraction);
    
    // For testing and checking interaction areas while coding, not displayed in the actual game.
    for(let interactionArea of allInteractionAreas) {
        interactionArea.display();
    }
}

function interactionDetection(objects) {
    interactIndicatorOn = false;

    for(let object of objects) {
        if(player.collides(object) && !dialogueBoxVisible) {
            interactIndicatorOn = true;

            // Draws the interact button when the player gets close to an NPC.
            textAlign(CENTER, CENTER);
            fill(255, 200);
            rect(width / 5 * 4, height / 2, 180, 50);
            fill(0);
            textSize(24);
            text("F - Interact", width / 5 * 4, height / 2, 160, height - 30);

            break;
        }
    }
}

function showDialogue() {
    if(dialogueBoxVisible) {
        textAlign(LEFT, TOP);
        fill(255, 200);
        rectMode(CORNER);
        rect(20, 510, 600, 110);
        fill(0);
        textSize(23);
        text("Dialogue", 35, height - 115, width - 80, height - 30);
    }
}