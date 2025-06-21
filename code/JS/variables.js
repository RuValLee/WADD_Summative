// Variables for grid/sprite sizes.
const gridSize = 16;
const spritePixelSize = 32;

// Variables for background map/image.
let backgroundMap;
let allInteractionAreas = [];
let allObstacles = [];

// Variables for player character and NPCs.
let characterSprite;
let walkAnimation = [];
let player, woodcutter, farmer, fisher, builder;
let woodcutterInteraction, farmerInteraction, fisherInteraction, builderInteraction;

// Variables for interactions and dialogues.
let interactIndicatorOn = false;
let dialogueBoxVisible = false;
let dialogueIndex = 0;
let dialogues;