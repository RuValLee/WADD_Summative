let backgroundMap;
let bodySprite, hairSprite, bodyFrames, hairFrames;
const spriteWidth = 96;

function preload() {
    backgroundMap = loadImage("../assets/backgroundMap.png");
    // bodySprite = loadImage("../assets/base_walk_strip8.png");
    // hairSprite = loadImage("../assets/Characters.png");
}

function setup() {
    const canvas = createCanvas(640, 640);
    canvas.id("gameCanvas");
}

function draw() {
    image(backgroundMap, 0, 0, 640, 640);
}

function getSprite(spritePng, startingFrame, endingFrame, animationArray) {
    const totalFrames = 8;
    for(let i = startingFrame; i < totalFrames; i++) {
        let img = spritePng.get(pos.x, pos.y, pos.w, pos.h);
        animationArray.push(img);
    }
    return animationArray;
}