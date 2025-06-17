let backgroundMap;
let characterSprite;
const spritePixelSize = 32;
let walkAnimation = [];

function preload() {
    backgroundMap = loadImage("../assets/backgroundMap.png");
    characterSprite = loadImage("../assets/Characters.png");
}

function setup() {
    const canvas = createCanvas(640, 640);
    canvas.id("gameCanvas");
    getPlayerSprite(characterSprite, walkAnimation, 8, 0);
}

function draw() {
    image(backgroundMap, 0, 0, 640, 640);
}