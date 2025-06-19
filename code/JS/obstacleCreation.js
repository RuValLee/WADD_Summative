/**
 * Creates collision boxes for borders / obstacles.
 * Bottom of a collision box should ideally be 1-1.5 gridSize smaller for more realistic overlappig effect.
 */
function obstacleCreate() {
    // borderCollision();
    // npcCollision();
    // lakeCollision();
    // buildingCollision();
    // farmCollision();
    // forestCollision();
    decorationCollision();

    // For testing and checking collision box locations while coding, not displayed in the actual game.
    for(let obstacle of allObstacles) {
        obstacle.display();
    }
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
 * Creates collision boxes for the decorations in the village.
 */
function decorationCollision() {
    // Bridge fences
    allObstacles.push(new GameObject(gridSize * 18.5, gridSize * 33.25, gridSize * 0.1, gridSize * 7));    // Bridge fence left
    allObstacles.push(new GameObject(gridSize * 21.5, gridSize * 33.25, gridSize * 0.1, gridSize * 7));    // Bridge fence right

    // Trees
    allObstacles.push(new GameObject(gridSize * 22.5, gridSize * 32.4, gridSize, gridSize * 0.5));    // Bridge tree
    allObstacles.push(new GameObject(gridSize * 25.5, gridSize * 25.4, gridSize, gridSize * 0.5));    // Farm tree
    allObstacles.push(new GameObject(gridSize * 13.5, gridSize * 22.4, gridSize * 3, gridSize * 0.5));    // Builder tree, top
    allObstacles.push(new GameObject(gridSize * 13.5, gridSize * 25.4, gridSize * 3, gridSize * 0.5));    // Builder tree, bottom
    allObstacles.push(new GameObject(gridSize * 1.5, gridSize * 12.4, gridSize, gridSize * 0.5));    // Blue building tree
    allObstacles.push(new GameObject(gridSize * 19.5, gridSize * 8.4, gridSize, gridSize * 0.5));    // Purple building tree

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
    allObstacles.push(new GameObject(gridSize * 0.5, gridSize * 24.5, gridSize, gridSize * 0.1));    // Blue building bush
}

// Working note: Continue with decoration collision! (seeds, mushrooms, rocks, statue)