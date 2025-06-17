class Characters {
    constructor(x, y, w, h, animationSpeed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.animationSpeed = animationSpeed;
        this.index = 0;
    }

    display(spritePng, frameX, frameY, frameW, frameH) {
        let img = spritePng.get(frameX, frameY, frameW, frameH);
        image(img, this.x, this.y, this.w, this.h);
    }
}

class Player extends Characters {
    constructor(x, y, animationSpeed, size, movementSpeed) {
        super(x, y, animationSpeed);
        super.index;
        this.size = size;
        this.movementSpeed = movementSpeed;
        this.prevX = this.x;
        this.prevY = this.y;
    }

    display(animationArray) {
    if(frameCount % animationSpeed === 0) {
        index = (index + 1) % animationArray.length;
    }

    imageMode(CENTER);
    image(animationArray[index], this.x, this.y, this.w, this.h);
    imageMode(CORNER);
    }

    update(currentObstacles) {
        // Variables for player locations after movement.
        let nextX = this.x;
        let nextY = this.y;

        // Allows player movement with animations by WASD / direction keys and stops player from moving while inside a dialogue.
        if(!dialogueBoxVisible) {
            if (keyIsDown(87) || keyIsDown(38)) {   // w
                nextY -= this.speed;
            }
            if (keyIsDown(65) || keyIsDown(37)) {   // a
                nextX -= this.speed;
                animationArray = [];
                getPlayerSprite(characterSprite, walkAnimation, 8, spritePixelSize);
            }
            if (keyIsDown(83) || keyIsDown(40)) {   // s
                nextY += this.speed;
                animationArray = [];
            }
            if (keyIsDown(68) || keyIsDown(39)) {   // d
                nextX += this.speed;
                animationArray = [];
                getPlayerSprite(characterSprite, walkAnimation, 8, 0);
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
}