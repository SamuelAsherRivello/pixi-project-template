/**
 * Replace with comments...
 *
 * Inspiration: <see cref="https://google.github.io/styleguide/tsguide.html#naming" />
 */
export class TemplateClass {
  // Events ---------------------------------------

  // Properties -----------------------------------
  get samplePublicText(): string {
    return this._samplePrivateText;
  }
  set samplePublicText(value: string) {
    this._samplePrivateText = value;
  }

  // Fields ---------------------------------------
  private _samplePrivateText: string;
  public static SAMPLE_MESSAGE: string = 'sample message';

  // Initialization -------------------------------
  constructor() {
    this._samplePrivateText = '';
  }

  // Methods ------------------------------
  add(a: number, b: number): number {
    return a + b;
  }

  // Event Handlers -------------------------------
  private target_OnCompleted(message: string): void {
    // Event handler code here
  }
}
