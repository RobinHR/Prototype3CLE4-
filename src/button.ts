
import * as PIXI from 'pixi.js'
import { Graphics } from 'pixi.js'
import { Game } from './game'

export class Button extends PIXI.Graphics {
    private game: Game
    private innerHTML: string
    
    constructor(x: number, y: number, text: string) {
        super()
        this.innerHTML = text
        this.beginFill(0xFF0000)
        this.drawRoundedRect(0, 0, 380, 90, 15)
        this.endFill()

        this.x = x - this.getBounds().width/2
        this.y = y - this.getBounds().height/2

        const buttonText = new PIXI.Text(this.innerHTML, {
            "align": "center",
            "fontFamily": "Comic Sans MS",
            "fontSize": 50,
        })

        buttonText.x = this.getBounds().width /2
        buttonText.y = this.getBounds().height /2
        buttonText.anchor.set(0.5)

        this.addChild(buttonText)

        this.buttonMode = true
        this.interactive = true

    }
}