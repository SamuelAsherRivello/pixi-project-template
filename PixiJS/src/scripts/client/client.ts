import * as PIXI from 'pixi.js';
import Stats from 'stats.js';
import { InstructionsText } from './core/InstructionsText';
import { SuperApp } from './core/SuperApp';
import { FlowerSuperSprite } from './core/FlowerSuperSprite';
import { io } from 'socket.io-client';
import '../../styles/styles.css';

/////////////////////////////
// PIXI Configuration
/////////////////////////////
PIXI.AbstractRenderer.defaultOptions.roundPixels = true; // Crisp pixels
PIXI.AbstractRenderer.defaultOptions.resolution = window.devicePixelRatio || 1; // Crisp pixels

/////////////////////////////
// Project Configuration
/////////////////////////////
const FLOWER_IMAGE_URL: string = 'assets/images/pixijs-flower-400x400.png';


/////////////////////////////
// Create App
/////////////////////////////
const superAppConst = new SuperApp(1920, 1080, 'pixi-application-canvas');
let myFlowerSuperSprite: FlowerSuperSprite;


/////////////////////////////
// Setup Stats
/////////////////////////////
const stats = new Stats();
stats.showPanel(0);
stats.dom.className = 'stats-panel2';
document.body.appendChild(stats.dom);


/////////////////////////////
// Setup Pixi JS DevTools
// https://bit.ly/pixijs-devtools
/////////////////////////////
(globalThis as any).__PIXI_APP__ = superAppConst.app;

/////////////////////////////
// Handle App Initialize
/////////////////////////////
function onInitializeCompleted(superApp: SuperApp) {


  /////////////////////////////
  // Update Systems Every Frame
  /////////////////////////////
  superApp.app.ticker.add((ticker) => {
    stats.begin();
    stats.end();
  });

  /////////////////////////////
  // Create Instruction Text
  /////////////////////////////
  const instructionsText = new InstructionsText('Click Sprite For Filters');
  instructionsText.x = 2;
  instructionsText.y = stats.dom.clientHeight - 15;
  superApp.addToStage(instructionsText);

  /////////////////////////////
  // Load an image asset
  /////////////////////////////
  PIXI.Assets.load([FLOWER_IMAGE_URL]).then(() => {
    const myTexture = PIXI.Texture.from(FLOWER_IMAGE_URL);
    myFlowerSuperSprite = new FlowerSuperSprite(superApp, myTexture);
    superApp.addToStage(myFlowerSuperSprite);
  }).catch((error) => {
    /////////////////////////////
    // Handle any errors 
    /////////////////////////////
    console.error(`PIXI.Assets.load() failed. error = ${error}`);
  });
}


/////////////////////////////
// Handle App Error
/////////////////////////////
function onInitializeError(error: Error) {
  console.error(`PIXI.Application.init() failed. error = ${error}`);
}
superAppConst.addListener(SuperApp.EVENT_INITIALIZE_COMPLETE, onInitializeCompleted);
superAppConst.addListener(SuperApp.EVENT_INITIALIZE_ERROR, onInitializeError);

(async () => {

  /////////////////////////////
  // Initialize App
  /////////////////////////////
  await superAppConst.init();

  /////////////////////////////
  // Optional : Connect to 
  // Socket Server (See Server.ts)
  /////////////////////////////
  const socket = io("http://localhost:3001");

  socket.on("connect", () => {
    console.log(`[Client] Connected to server with socket id = ${socket.id}`);
  });

  socket.on("disconnect", () => {
    console.log(`[Client] Disconnected from server`);
  });

})();


