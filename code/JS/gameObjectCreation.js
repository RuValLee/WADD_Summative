/**
 * A function for creating the player character and NPCs.
 */
function characterCreate() {
    player = new Player(width / 2, height / 4 * 3, 50, 50, 3, 5, walkAnimation);
    fisher = new NPC(125, 500, 100, 70);
    builder = new NPC(230, 320, 75, 50);
    farmer = new NPC(585, 440, 50, 50);
    woodcutter = new NPC(600, 140, 50, 50); 
}

/**
 * A function for drawing NPCs and player character on the game canvas.
 */
function drawCharacters() {
    // NPCs
    fisher.display(characterSprite, 0, spritePixelSize * 2, spritePixelSize * 2, spritePixelSize * 1.5);
    builder.display(characterSprite, 0, spritePixelSize * 3.5, spritePixelSize * 1.5, spritePixelSize);
    farmer.display(characterSprite, 0, spritePixelSize * 4.5, spritePixelSize, spritePixelSize);
    woodcutter.display(characterSprite, 0, spritePixelSize * 5.5, spritePixelSize, spritePixelSize);

    // Player character
    player.display();
    player.update(allObstacles);
}

/**
 * A function for creating NPCs' interactable location/areas.
 * This code is written by generative AI.
 * Author: ChatGPT
 * Date: 23/06/2025
 */
function interactionAreaCreate() {
    rectMode(CENTER);   // I added this line to draw the interaction areas in center mode.
    allInteractionAreas = [];

    // Defines the interaction area names and locations.
    // Code written by ChatGPT, but locations were set by myself.
    const npcPositions = {
        fisher: [150, 485],
        builder: [230, 315],
        farmer: [580, 430],
        woodcutter: [600, 140]
    };

    // Creates the interaction areas if the NPC has not been interacted with.
    for(const [npc, [x, y]] of Object.entries(npcPositions)) {
        const hasInteracted = npcProgress[npc] && npcProgress[npc].length >= currentDay;

        // Creates the interaction areas and the corresponding names.
        const interaction = new GameObject(x, y, 40, 40);
        interaction.name = npc;

        // Pushes the interaction areas to the allInteractionAreas array if the NPC hasn't been interacted.
        if(!hasInteracted) {
            allInteractionAreas.push(interaction);
        }
    }
    
    // For testing and checking interaction areas while coding, not displayed in the actual game.
    // for(let interactionArea of allInteractionAreas) {
    //     interactionArea.display();
    // }
}

/**
 * A function for showing option buttons during the dialogue.
 */
function showOptions() {
    buttonCreate(470, height / 2 + 30, 300, 50, "1 - Help");    // Help option
    buttonCreate(470, height / 2 + 90, 300, 50, "2 - Persuade to skip work");    // Sabotage option
    buttonCreate(470, height / 2 + 150, 300, 50, "3 - Leave");    // Leave option
}

/**
 * A function for creating collision boxes for borders / obstacles.
 * Bottom of a collision box should ideally be 1-1.5 gridSize smaller for more realistic overlappig effect.
 */
function obstacleCreate() {
    borderCollision();
    npcCollision();
    lakeCollision();
    buildingCollision();
    farmCollision();
    forestCollision();
    bigDecorationCollision();
    smallDecorationCollision();

    // For testing and checking collision box locations while coding, not displayed in the actual game.
    // for(let obstacle of allObstacles) {
    //     obstacle.display();
    // }
}

/**
 * Creates canvas borders.
 */
function borderCollision() {
    allObstacles.push(new GameObject(0, -gridSize, width, gridSize));    // Top border
    allObstacles.push(new GameObject(-gridSize, 0, gridSize, height));    // Left border
    allObstacles.push(new GameObject(0, height, width, gridSize));    // Bottom border
    allObstacles.push(new GameObject(width, 0, gridSize, height));    // Left border
}

/**
 * Creates collision boxes for NPCs.
 */
function npcCollision() {
    allObstacles.push(new GameObject(130, 475, spritePixelSize * 0.8, spritePixelSize * 0.7));    // Fisher
    allObstacles.push(new GameObject(205, 305, spritePixelSize * 0.8, spritePixelSize * 0.5));    // Builder
    allObstacles.push(new GameObject(205, 315, spritePixelSize * 1.5, spritePixelSize * 0.25));    // Builder hammer
    allObstacles.push(new GameObject(570, 425, spritePixelSize * 0.8, spritePixelSize * 0.75));    // Farmer
    allObstacles.push(new GameObject(585, 120, spritePixelSize * 0.8, spritePixelSize * 0.75));    // Woodcutter
}

/**
 * Creates collision boxes for the lake.
 */
function lakeCollision() {
    allObstacles.push(new GameObject(0, gridSize * 29, gridSize * 7, gridSize * 11));    // Left-most part
    allObstacles.push(new GameObject(gridSize * 7.5, gridSize * 30, gridSize * 0.5, gridSize * 4));    // Left of fisher, right next to it
    allObstacles.push(new GameObject(gridSize * 7.5, gridSize * 34, gridSize * 7, gridSize * 6));    // Below fisher
    allObstacles.push(new GameObject(gridSize * 14.5, gridSize * 35, gridSize * 3.5, gridSize * 5));    // Under the bridge, on the left
    allObstacles.push(new GameObject(gridSize * 22, gridSize * 35, gridSize * 5, gridSize * 5));    // Under the bridge, on the right
}

/**
 * Creates collision boxes for the buidings.
 */
function buildingCollision() {
    allObstacles.push(new GameObject(gridSize * 3, gridSize * 1.5, gridSize * 5.2, gridSize * 1));    // Purple house roof
    allObstacles.push(new GameObject(gridSize * 1.7, gridSize * 2.5, gridSize * 16.7, gridSize * 6));    // Purple house body
    allObstacles.push(new GameObject(gridSize * 3.7, gridSize * 15.5, gridSize * 8.6, gridSize * 5.5));    // Blue house roof base
    allObstacles.push(new GameObject(gridSize * 5, gridSize * 14.5, gridSize * 6, gridSize));    // Blue house roof top side
    allObstacles.push(new GameObject(gridSize * 6.5, gridSize * 13, gridSize * 3, gridSize * 1.5));    // Blue house roof top centre
    allObstacles.push(new GameObject(gridSize * 4.7, gridSize * 21, gridSize * 6.6, gridSize * 1.5));    // Blue house body
}

/**
 * Creates collision boxes for the fences surrounding the farm.
 */
function farmCollision() {
    allObstacles.push(new GameObject(gridSize * 27.5, gridSize * 26.25, gridSize * 0.1, gridSize * 14));    // Left fence
    allObstacles.push(new GameObject(gridSize * 27.5, gridSize * 26.25, gridSize * 7.5, gridSize * 0.1));    // Top fence, left part
    allObstacles.push(new GameObject(gridSize * 37, gridSize * 26.25, gridSize * 3, gridSize * 0.1));    // Top fence, right part
}

/**
 * Creates collision boxes for the fences surrounding the forest and the forest itself.
 */
function forestCollision() {
    allObstacles.push(new GameObject(gridSize * 24.5, 0, gridSize * 0.1, gridSize * 7.1));    // Left fence
    allObstacles.push(new GameObject(gridSize * 24.5, gridSize * 7.1, gridSize * 11.5, gridSize * 0.1));    // Bottom fence
    allObstacles.push(new GameObject(gridSize * 25, 0, gridSize * 15, gridSize * 6.5));    // Trees in the forest
}

/**
 * Creates collision boxes for the big decorations in the village.
 */
function bigDecorationCollision() {
    // Bridge fences
    allObstacles.push(new GameObject(gridSize * 18.5, gridSize * 33.25, gridSize * 0.1, gridSize * 7));    // Bridge fence left
    allObstacles.push(new GameObject(gridSize * 21.5, gridSize * 33.25, gridSize * 0.1, gridSize * 7));    // Bridge fence right

    // Trees
    allObstacles.push(new GameObject(gridSize * 22.5, gridSize * 32.4, gridSize, gridSize * 0.5));    // Bridge tree
    allObstacles.push(new GameObject(gridSize * 25.5, gridSize * 25.4, gridSize, gridSize * 0.5));    // Farm tree
    allObstacles.push(new GameObject(gridSize * 13.5, gridSize * 22.4, gridSize * 3, gridSize * 0.5));    // Builder tree, top
    allObstacles.push(new GameObject(gridSize * 13.5, gridSize * 25.4, gridSize * 3, gridSize * 0.5));    // Builder tree, bottom
    allObstacles.push(new GameObject(gridSize * 1.5, gridSize * 12.4, gridSize, gridSize * 0.5));    // Blue house tree
    allObstacles.push(new GameObject(gridSize * 19.5, gridSize * 8.4, gridSize, gridSize * 0.5));    // Purple house tree

    // Tree trunks
    allObstacles.push(new GameObject(gridSize * 32, gridSize * 16, gridSize * 7, gridSize * 0.1));    // Top row tree trunks
    allObstacles.push(new GameObject(gridSize * 33, gridSize * 18.1, gridSize * 7, gridSize * 0.1));    // Middle row tree trunks
    allObstacles.push(new GameObject(gridSize * 32, gridSize * 20.2, gridSize * 7, gridSize * 0.1));    // Bottom row tree trunks

    // Bushes
    allObstacles.push(new GameObject(gridSize * 38.5, gridSize * 24.5, gridSize, gridSize * 0.1));    // Farm bush
    allObstacles.push(new GameObject(gridSize * 23.5, gridSize * 19.5, gridSize, gridSize * 0.1));    // Statue bush
    allObstacles.push(new GameObject(gridSize * 38.5, gridSize * 13.5, gridSize, gridSize * 0.1));    // Tree trunk bush
    allObstacles.push(new GameObject(gridSize * 25.5, gridSize * 9.5, gridSize, gridSize * 0.1));    // Forest bush
    allObstacles.push(new GameObject(gridSize * 19.5, gridSize * 0.5, gridSize, gridSize * 0.1));    // Short purple house bush
    allObstacles.push(new GameObject(gridSize * 0.5, gridSize * 0.5, gridSize, gridSize * 0.1));    // Tall purple house bush
    allObstacles.push(new GameObject(gridSize * 15.5, gridSize * 13.5, gridSize, gridSize * 0.1));    // Builder bush
    allObstacles.push(new GameObject(gridSize * 0.5, gridSize * 24.5, gridSize, gridSize * 0.1));    // Blue house bush

    // Statue
    allObstacles.push(new GameObject(gridSize * 27, gridSize * 14.5, gridSize * 2, gridSize * 2));    // The rock-made statue
}

/**
 * Creates collision boxes for the small decorations in the village.
 */
function smallDecorationCollision() {
    // Rocks
    allObstacles.push(new GameObject(gridSize * 24.25, gridSize * 34, gridSize * 0.5, gridSize * 0.1));    // Bridge rock
    allObstacles.push(new GameObject(gridSize * 9.25, gridSize * 32, gridSize * 0.5, gridSize * 0.1));    // Fisher rock
    allObstacles.push(new GameObject(gridSize * 3.25, gridSize * 14, gridSize * 0.5, gridSize * 0.1));    // Blue house rock, near the single tree
    allObstacles.push(new GameObject(gridSize * 9.25, gridSize, gridSize * 0.5, gridSize * 0.1));    // Purple house rock
    allObstacles.push(new GameObject(gridSize * 39.25, gridSize * 10, gridSize * 0.5, gridSize * 0.1));    // Forest rock
    allObstacles.push(new GameObject(gridSize * 37.25, gridSize * 13, gridSize * 0.5, gridSize * 0.1));    // Tree trunk rock
    allObstacles.push(new GameObject(gridSize * 23.25, gridSize * 22, gridSize * 0.5, gridSize * 0.1));    // Statue rock
    allObstacles.push(new GameObject(gridSize * 15.25, gridSize * 0.1, gridSize * 0.5, gridSize * 0.1));    // Purple house double rock
    allObstacles.push(new GameObject(gridSize * 23.25, gridSize * 2.1, gridSize * 0.5, gridSize * 0.1));    // Forest double rock
    allObstacles.push(new GameObject(gridSize * 23.25, gridSize * 25.1, gridSize * 0.5, gridSize * 0.1));    // Farm double rock
    allObstacles.push(new GameObject(gridSize * 12.25, gridSize * 25.1, gridSize * 0.5, gridSize * 0.1));    // Blue house double rock
    allObstacles.push(new GameObject(gridSize * 16.3, gridSize * 18.3, gridSize * 0.3, gridSize * 0.1));    // Builder small rock

    // Mushrooms
    allObstacles.push(new GameObject(gridSize * 15.5, gridSize * 34.25, gridSize * 0.25, gridSize * 0.1));    // Bridge mushroom
    allObstacles.push(new GameObject(gridSize * 24.5, gridSize * 27.25, gridSize * 0.25, gridSize * 0.1));    // Farm mushroom
    allObstacles.push(new GameObject(gridSize * 1.75, gridSize * 10.25, gridSize * 0.1, gridSize * 0.1));    // Tall purple house mushroom
    allObstacles.push(new GameObject(gridSize * 18.25, gridSize * 10.25, gridSize * 0.25, gridSize * 0.1));    // Small purple house mushroom
}