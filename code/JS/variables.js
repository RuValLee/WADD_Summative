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

// Variables for interactions and dialogues.
let woodcutterInteraction, farmerInteraction, fisherInteraction, builderInteraction;
let interactIndicatorOn = false;
let dialogueBoxVisible = false;
let dialogues;
let dialogueIndex = 0;
let dialogueStarted = false;
let playerChoice = null;

// Variables for tracking current states/objects.
let currentDay = 1;
let currentNPC;
let currentDialogueGroup;
let currentDialogueType;