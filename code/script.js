let backgroundMap;

function preload() {
    backgroundMap = loadImage("../assets/backgroundMap.png");
}

function setup() {
    const canvas = createCanvas(640, 640);
    canvas.id("gameCanvas");
    image(backgroundMap, 0, 0, 640, 640);
}

function draw() {

}