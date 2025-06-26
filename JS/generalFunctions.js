/**
 * A function for getting the sprites for player character animations and pushing them into an array.
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

/**
 * A function for creating UI buttons.
 * @param {number} x The starting x-coordinate of the button.
 * @param {number} y The starting y-coordinate of the button.
 * @param {number} w The width of the button.
 * @param {number} h The height of the button.
 * @param {string} message The words to display within the button.
 */
function buttonCreate(x, y, w, h, message) {
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    fill(255, 200);
    rect(x, y, w, h);
    fill(0);
    textSize(24);
    text(message, x, y, w - 20, h - 20);
}

/**
 * A function for creating a fade-in/out transition between days.
 */
function fadeTransition() {
    // Canvas fades out to black.
    if(isFadingOut) {
        fadeOpacity += 10;
        if(fadeOpacity >= 255) {
            fadeOpacity = 255;
            isFadingOut = false;

            // Checks if the fade in transtition should keep going, not if it's the final day.
            if(!isGameEnding) {
                startNewDay();
                isFadingIn = true;
            } else {
                onEndingFadeComplete();
            }

        }
    }

    // Canvas fades in to the game.
    if(isFadingIn) {
        fadeOpacity -= 10;
        if(fadeOpacity <= 0) {
            fadeOpacity = 0;
            isFadingIn = false;
            dayTransitionOngoing = false;
        }
    }

    // Draws the fading in/out effect when the function is called.
    if(isFadingOut || isFadingIn) {
        fill(0, fadeOpacity);
        rectMode(CORNER);
        rect(0, 0, width, height);
    }
}

/**
 * A function for handling states for the ending transition from game.html to ending.html.
 */
function endingTransition() {
    isFadingOut = true;
    isGameEnding = true;
    dayTransitionOngoing = true;
    fadeOpacity = 0;
}

/**
 * A function for redirecting players to the ending.html after the final dialogue line.
 */
function onEndingFadeComplete() {
    window.location.href = "../docs/ending.html";
}