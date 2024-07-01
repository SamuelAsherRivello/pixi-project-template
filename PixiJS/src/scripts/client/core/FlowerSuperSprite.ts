import * as PIXI from 'pixi.js';
import { SuperSprite } from './SuperSprite';
import { SuperApp } from './SuperApp';

/**
 * Custom Sprite class that handles resizing and positioning
 */
export class FlowerSuperSprite extends SuperSprite {
  private filterList: PIXI.Filter[];
  private filterListIndex: number;

  // Initialization -------------------------------
  constructor(superApp: SuperApp, texture: PIXI.Texture) {
    super(superApp, texture);

    // Give it a name for pretty debugging
    this.label = (FlowerSuperSprite).name;

    // Rotate from center-point
    this.anchor.set(0.5);

    // Set scale, 1 = 100% of texture size
    this.scale.set(1);


    // Opt-in to interactivity
    this.eventMode = 'static';

    // Shows hand cursor
    this.cursor = 'pointer';

    // Initialize filters
    this.filterList = [
      new PIXI.BlurFilter({ strength: 0.0 }), //have 'no filter' by default
      new PIXI.BlurFilter({ strength: 0.8 }),
      new PIXI.NoiseFilter(),
      new PIXI.NoiseFilter()
    ];
    this.filterListIndex = 0;

    // Set the initial filter
    this.filters = [this.filterList[this.filterListIndex]];

    // Pointers normalize touch and mouse (good for mobile and desktop)
    this.on('pointerdown', this.onPointerDown);
  }

  // Event Handlers -------------------------------
  private onPointerDown(): void {
    this.filterListIndex = (this.filterListIndex + 1) % this.filterList.length;
    this.filters = [this.filterList[this.filterListIndex]];
  }

  protected onResize(superApp: SuperApp): void {

    if (!this.isAddedToStage || this.texture.width === 0 || this.texture.height === 0) {
      return;
    }


    // Store the original scale values
    const originalScaleX = this.scale.x;
    const originalScaleY = this.scale.y;

    // Center the sprite on the screen
    this.x = superApp.app.screen.width / 2;
    this.y = superApp.app.screen.height / 2;

    // Calculate the new width and height while maintaining the aspect ratio
    const scale = Math.min(superApp.app.screen.width / this.texture.width, superApp.app.screen.height / this.texture.height);

    // Set the new width and height to the sprite based on the calculated scale
    this.width = this.texture.width * scale;
    this.height = this.texture.height * scale;

    // The code above sets scale, so reset it here.
    this.scale.set(originalScaleX, originalScaleY);
  }

  protected onTick(ticker: PIXI.Ticker): void {
    // Rotate the sprite
    this.rotation += 0.005 * ticker.deltaTime;
  }
}
