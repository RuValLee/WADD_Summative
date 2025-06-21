/**
 * Gets the sprites for player character animations and pushes them into an array.
 * @param {p5.Image} spritePng The character sprite sheet image.
 * @param {p5.Image[]} animationArray An array that stores the sprite images for the movement animation.
 * @param {number} numberOfFrames The number of sprites to get the complete walking animation.
 * @param {number} frameHeight The height of the player character's sprite.
 * @returns {p5.Image[]} An array holding the sprite images for the movement animation.
 */
function getPlayerSprite(spritePng, animationArray, numberOfSprites, frameHeight) {
    numberOfSprites = 8;
    for(let i = 0; i < numberOfSprites; i++) {
        let img = spritePng.get(i * spritePixelSize, frameHeight, spritePixelSize, spritePixelSize);
        animationArray.push(img);
    }
    return animationArray;
}

function buttonCreate(x, y, w, h, message) {
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    fill(255, 200);
    rect(x, y, w, h);
    fill(0);
    textSize(24);
    text(message, x, y, w - 20, h - 20);
}