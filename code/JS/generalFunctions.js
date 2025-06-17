function getPlayerSprite(spritePng, animationArray, numberOfFrames, frameHeight) {
    numberOfFrames = 8;
    for(let i = 0; i < numberOfFrames; i++) {
        let img = spritePng.get(i * spritePixelSize, frameHeight, spritePixelSize, spritePixelSize);
        animationArray.push(img);
    }
    return animationArray;
}