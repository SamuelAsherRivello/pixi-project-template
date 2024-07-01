import * as PIXI from 'pixi.js';

export class InstructionsText extends PIXI.Text {

    // Initialization -------------------------------
    constructor(message: string) {
        const textStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 8,
            fill: '#ffffff',
            align: 'center'
        });

        const textOptions: PIXI.TextOptions = {
            text: message,
            style: textStyle,
            resolution: 2 // Ensure text is sharp
        };

        super(textOptions);
        this.resolution = 2; // Ensure text is sharp
    }
}
