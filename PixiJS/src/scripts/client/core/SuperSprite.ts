import * as PIXI from 'pixi.js';
import { SuperApp } from './SuperApp';

/**
 * Subclass PIXI.Sprite if you want basic sprite functionality.
 * 
 * Subclass SuperSprite if you ALSO want onResize and onTick events
 */
export class SuperSprite extends PIXI.Sprite {

  // Fields ---------------------------------------
  protected _superApp: SuperApp;

  // Initialization -------------------------------
  constructor(superApp: SuperApp, texture?: PIXI.Texture) {
    super(texture);

    this._superApp = superApp;

    // Tick
    superApp.app.ticker.add(this.onTick.bind(this));

    // Resize
    this._superApp.addListener(SuperApp.EVENT_RESIZE, this.onResize.bind(this));

  }

  // Initialization -------------------------------
  public isAddedToStage(): boolean {
    return parent !== null;
  }

  // Event Handlers -------------------------------
  public onAddedToStage() {
    // Empty implementation to be overridden
  }

  public onRemovedFromStage() {
    // Empty implementation to be overridden
  }

  protected onResize(superApp: SuperApp): void {
    // Empty implementation to be overridden
  }

  protected onTick(ticker: PIXI.Ticker): void {
    // Empty implementation, to be overridden by subclasses
  }
}
