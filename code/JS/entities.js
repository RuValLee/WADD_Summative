class GameObjects {
    constructor(x, y, w, h, frameDelay) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    display() {
        fill(100, 0);
        rect(this.x, this.y, this.w, this.h);
    }
}

class NPC extends GameObjects {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    display(spritePng, frameX, frameY, frameW, frameH) {
        let idleMotion = sin(frameCount * 0.1) * 0.5;
        let img = spritePng.get(frameX, frameY, frameW, frameH);

        imageMode(CENTER);
        image(img, this.x, this.y + idleMotion, this.w, this.h);
        imageMode(CORNER);       
    }
}

class Player extends NPC {
    constructor(x, y, w, h, frameDelay, movementSpeed, animationArray, obstacleArray) {
        super(x, y, w, h);
        this.frameDelay = frameDelay;
        this.movementSpeed = movementSpeed;
        this.animationArray = animationArray;
        this.obstacleArray = obstacleArray;
        this.index = 0;
        this.prevX = this.x;
        this.prevY = this.y;
        this.isMoving;
    }

    display() {
    if(this.isMoving && frameCount % this.frameDelay === 0) {
        this.index = (this.index + 1) % this.animationArray.length;
    }

    imageMode(CENTER);
    image(this.animationArray[this.index], this.x, this.y, this.w, this.h);
    imageMode(CORNER);
    }

    update() {
        // Variables for player locations after movement.
        let nextX = this.x;
        let nextY = this.y;

        // Allows player movement with animations by WASD / direction keys and stops player from moving while inside a dialogue.
        if(!dialogueBoxVisible) {
            if (keyIsDown(87) || keyIsDown(38)) {   // w
                nextY -= this.speed;
                this.animationArray = [];
            }
            if (keyIsDown(65) || keyIsDown(37)) {   // a
                nextX -= this.speed;
                this.animationArray = [];
                getPlayerSprite(characterSprite, this.animationArray, 8, spritePixelSize);
            }
            if (keyIsDown(83) || keyIsDown(40)) {   // s
                nextY += this.speed;
                this.animationArray = [];
            }
            if (keyIsDown(68) || keyIsDown(39)) {   // d
                nextX += this.speed;
                this.animationArray = [];
                getPlayerSprite(characterSprite, this.animationArray, 8, 0);
            }
        }
        
        // Checks if the player position after movement collides with any obstacles.
        let collision = false;
        for (let obstacle of currentObstacles) {
            if (nextX + this.size / 2 >= obstacle.x && nextX - this.size / 2 <= obstacle.x + obstacle.w &&
                nextY + this.size / 2 >= obstacle.y && nextY - this.size / 2 <= obstacle.y + obstacle.h) {
                collision = true;
            break;
            }
        }

        // Updates player position only if there is no collision.
        if (!collision) {
            this.x = nextX;
            this.y = nextY;
        }
    }

    updateTemp() {
        // Variables for player locations after movement.
        let nextX = this.x;
        let nextY = this.y;

        this.isMoving = false;

        if (keyIsDown(87) || keyIsDown(38)) {   // w
            nextY -= this.movementSpeed;
            this.isMoving = true;
        }
        if (keyIsDown(65) || keyIsDown(37)) {   // a
            nextX -= this.movementSpeed;
            this.animationArray = [];
            getPlayerSprite(characterSprite, this.animationArray, 8, spritePixelSize);
            this.isMoving = true;
        }
        if (keyIsDown(83) || keyIsDown(40)) {   // s
            nextY += this.movementSpeed;
            this.isMoving = true;
        }
        if (keyIsDown(68) || keyIsDown(39)) {   // d
            nextX += this.movementSpeed;
            this.animationArray = [];
            getPlayerSprite(characterSprite, this.animationArray, 8, 0);
            this.isMoving = true;
        }

        this.x = nextX;
        this.y = nextY;
    }
}