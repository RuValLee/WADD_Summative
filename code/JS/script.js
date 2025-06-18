let backgroundMap;
let characterSprite;
const spritePixelSize = 32;
let walkAnimation = [];
let player, woodcutter, farmer, fisher, builder;

function preload() {
    backgroundMap = loadImage("../assets/backgroundMap.png");
    characterSprite = loadImage("../assets/Characters.png");
}

function setup() {
    const canvas = createCanvas(640, 640);
    canvas.id("gameCanvas");
    getPlayerSprite(characterSprite, walkAnimation, 8, 0);
    player = new Player(320, 600, 50, 50, 5, 3, walkAnimation);
}

function draw() {
    image(backgroundMap, 0, 0, 640, 640);
    player.display();
    player.updateTemp();
}