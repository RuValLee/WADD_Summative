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

// Variables for tracking current states/objects.
let playerChoice = null;
let currentDay;
let currentNPC;
let currentDialogueGroup;
let currentDialogueType;
let isGameEnding = false;

// Variables for day transition.
let fadeOpacity = 0;
let isFadingOut = false;
let isFadingIn = false;
let dayTransitionOngoing = false;

// Variables for the object literals storing/tracking user choices.
let npcProgress;
let choiceSummary;