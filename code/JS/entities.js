/**
 * A class for all entities/objects in the game.
 */
class GameObjects {
    /**
     * Parameters that specify the location and size of an game object.
     * @param {number} x The x-coordinate of the game object.
     * @param {number} y The y-coordinate of the game object.
     * @param {number} w The width of the game object.
     * @param {number} h The height of the game object.
     */
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    /**
     * A method for displaying the obstacle boxes, not shown in the actual game.
     */
    display() {
        fill(100, 0);
        rect(this.x, this.y, this.w, this.h);
    }
}

/**
 * A class for NPCs, extended from the GameObjects class with all parameters the same in the parent constructor.
 */
class NPC extends GameObjects {
    /**
     * A method for drawing the NPC sprites on the game canvas.
     * @param {p5.Image} spritePng The character sprite sheet image.
     * @param {number} spriteX The x-coordinate of the NPC sprite on the sheet.
     * @param {number} spriteY The y-coordinate of the NPC sprite on the sheet.
     * @param {number} spriteW The width of the NPC sprite on the sheet.
     * @param {number} spriteH The height of the NPC sprite on the sheet.
     */
    display(spritePng, spriteX, spriteY, spriteW, spriteH) {
        let idleMotion = sin(frameCount * 0.1) * 0.5;   // Creating the floating animation as idle animation of NPCs.
        let img = spritePng.get(spriteX, spriteY, spriteW, spriteH);    // Getting the sprite image from the sprite sheet

        // Draws the NPCs in center mode, then returns to corner mode for drawing other game objects.
        imageMode(CENTER);
        image(img, this.x, this.y + idleMotion, this.w, this.h);
        imageMode(CORNER);       
    }
}

/**
 * A class for the player character, extended from the GameObjects class.
 */
class Player extends GameObjects {
    /**
     * Parameters for the player character's location, size and animations.
     * @param {number} x The x-coordinate of the player character.
     * @param {number} y The y-coordinate of the player character.
     * @param {number} w The width of the player character.
     * @param {number} h The height of the player character.
     * @param {number} frameDelay The number of frames to delay before displaying the next sprite image.
     * @param {number} movementSpeed The number of pixels the player character moves per frame.
     * @param {p5.Image[]} animationArray An array holding the sprite images for the movement animation.
     */
    constructor(x, y, w, h, movementSpeed, frameDelay, animationArray) {
        super(x, y, w, h);
        this.movementSpeed = movementSpeed;
        this.frameDelay = frameDelay;
        this.animationArray = animationArray;
        this.index = 0;
        this.prevX = this.x;
        this.prevY = this.y;
        this.isMoving;
    }

    /**
     * A method for drawing the player character with walking animations.
     */
    display() {
        // If the player character moves, the character sprite updates per number of frames specified in frameDelay.
        if(this.isMoving && frameCount % this.frameDelay === 0) {
            this.index = (this.index + 1) % this.animationArray.length;
        }

        // Draws the player character's sprite/animation in center mode, then returns to corner mode for other game objects.
        imageMode(CENTER);
        image(this.animationArray[this.index], this.x, this.y, this.w, this.h);
        imageMode(CORNER);
    }

    /**
     * A method for updating the player character's location as they control it.
     * @param {Obstacle[]} obstacleArray An array holding the obstacle objects' collision boxes.
     */
    update(obstacleArray) {
        // Variables for the player character's location after movement and boolean for the player character's state of movement.
        let nextX = this.x;
        let nextY = this.y;
        this.isMoving = false;

        // Allows player movement with animations by WASD / direction keys and stops the player from moving while inside a dialogue.
        if(!dialogueBoxVisible) {
            if (keyIsDown(87) || keyIsDown(38)) {   // w, up arrow
                nextY -= this.movementSpeed;
                this.isMoving = true;
            }
            if (keyIsDown(65) || keyIsDown(37)) {   // a, left arrow
                nextX -= this.movementSpeed;
                this.animationArray = [];
                getPlayerSprite(characterSprite, this.animationArray, 8, spritePixelSize);
                this.isMoving = true;
            }
            if (keyIsDown(83) || keyIsDown(40)) {   // s, down arrow
                nextY += this.movementSpeed;
                this.isMoving = true;
            }
            if (keyIsDown(68) || keyIsDown(39)) {   // d, right arrow
                nextX += this.movementSpeed;
                this.animationArray = [];
                getPlayerSprite(characterSprite, this.animationArray, 8, 0);
                this.isMoving = true;
            }
        }
        
        // Checks if the player character's location after movement collides with any obstacles.
        let collision = false;
        for (let obstacle of obstacleArray) {
            if (nextX + this.size / 2 >= obstacle.x && nextX - this.size / 2 <= obstacle.x + obstacle.w &&
                nextY + this.size / 2 >= obstacle.y && nextY - this.size / 2 <= obstacle.y + obstacle.h) {
                collision = true;
            break;
            }
        }

        // Updates player character's location only if there is no collision.
        if (!collision) {
            this.x = nextX;
            this.y = nextY;
        }
    }

    // Not commented because the previous update method should be the actual one, not this one.
    updateTemp() {
        // Variables for player locations after movement.
        let nextX = this.x;
        let nextY = this.y;

        this.isMoving = false;

        if (keyIsDown(87) || keyIsDown(38)) {   // w, up arrow
            nextY -= this.movementSpeed;
            this.isMoving = true;
        }
        if (keyIsDown(65) || keyIsDown(37)) {   // a, left arrow
            nextX -= this.movementSpeed;
            this.animationArray = [];
            getPlayerSprite(characterSprite, this.animationArray, 8, spritePixelSize);
            this.isMoving = true;
        }
        if (keyIsDown(83) || keyIsDown(40)) {   // s, down arrow
            nextY += this.movementSpeed;
            this.isMoving = true;
        }
        if (keyIsDown(68) || keyIsDown(39)) {   // d, right arrow
            nextX += this.movementSpeed;
            this.animationArray = [];
            getPlayerSprite(characterSprite, this.animationArray, 8, 0);
            this.isMoving = true;
        }

        this.x = nextX;
        this.y = nextY;
    }
}