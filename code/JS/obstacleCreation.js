/**
 * Creates collision boxes for borders / obstacles.
 */
function obstacleCreate() {
    borderCollision();
    npcCollision();
    lakeCollision();
    buildingCollision();
    farmCollision();
    forestCollision();
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
    allObstacles.push(new GameObject(130, 470, spritePixelSize, spritePixelSize));    // Fisher
    allObstacles.push(new GameObject(205, 300, spritePixelSize * 1.5, spritePixelSize));    // Builder
    allObstacles.push(new GameObject(565, 420, spritePixelSize, spritePixelSize));    // Farmer
    allObstacles.push(new GameObject(580, 120, spritePixelSize, spritePixelSize));    // Woodcutter
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
    allObstacles.push(new GameObject(gridSize * 27.5, gridSize * 26.25, gridSize * 0.1, gridSize * 14));    // Purple houses
    allObstacles.push(new GameObject(gridSize * 27.5, gridSize * 26.25, gridSize * 7.5, gridSize * 0.1));    // Blue house roof
    allObstacles.push(new GameObject(gridSize * 37., gridSize * 26.25, gridSize * 3, gridSize * 0.1));    // Blue house body
}

/**
 * Creates collision boxes for the fences surrounding the farm.
 */
function farmCollision() {
    allObstacles.push(new GameObject(gridSize * 27.5, gridSize * 26.25, gridSize * 0.1, gridSize * 14));    // Left fence
    allObstacles.push(new GameObject(gridSize * 27.5, gridSize * 26.25, gridSize * 7.5, gridSize * 0.1));    // Top fence, left part
    allObstacles.push(new GameObject(gridSize * 37., gridSize * 26.25, gridSize * 3, gridSize * 0.1));    // Top fence, right part
}

/**
 * Creates collision boxes for the fences surrounding the forest and the forest itself.
 */
function forestCollision() {
    allObstacles.push(new GameObject(gridSize * 27.5, gridSize * 26.25, gridSize * 0.1, gridSize * 14));    // Left fence
    allObstacles.push(new GameObject(gridSize * 27.5, gridSize * 26.25, gridSize * 7.5, gridSize * 0.1));    // Bottom fence
    allObstacles.push(new GameObject(gridSize * 37., gridSize * 26.25, gridSize * 3, gridSize * 0.1));    // Trees in the forest
}

/**
 * Creates collision boxes for the decorations in the village.
 */
function decorationCollision() {
    allObstacles.push(new GameObject(gridSize * 27.5, gridSize * 26.25, gridSize * 0.1, gridSize * 14));    // Left fence
    allObstacles.push(new GameObject(gridSize * 27.5, gridSize * 26.25, gridSize * 7.5, gridSize * 0.1));    // Top fence, left part
    allObstacles.push(new GameObject(gridSize * 37., gridSize * 26.25, gridSize * 3, gridSize * 0.1));    // Top fence, right part
}

// Working note: Continue with building, forest and decoration collision!