import { Game } from "./game"
import { Character } from "./character"
import * as PIXI from 'pixi.js'

export class Landlord extends Character{
    public game: Game

    constructor(texture: PIXI.Texture, game: Game, x: number, y:number){
        super(texture, game)
        this.game = game
        this.x = x
        this.y = y

        this.interactive = true
    }
}

