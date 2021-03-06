import * as PIXI from 'pixi.js'
import coverImage from './images/cover.png'
import knightImage from "./images/knight.png"
import farmerImage from "./images/farmer.png"
import landlordImage from "./images/landlord.png"
import { Character } from './character'
import { Knight } from './knight'
import { Farmer } from './farmer'
import { Assets } from './assets'
import { Brandaan } from './brandaan'
import { Button } from './button'
import { Landlord } from './landlord'

export class Game {
    private pixiWidth = 800
    private pixiHeight = 500

    public pixi: PIXI.Application
    private loader: PIXI.Loader
    private brandaan: Brandaan
    private characters: Character[] = []

    constructor() {

        // this._pixi = new PIXI.Application({ width: 1440, height: 900})
        this.pixi = new PIXI.Application({ width: this.pixiWidth, height: this.pixiHeight, backgroundColor: 0x1099bb });
        document.body.appendChild(this.pixi.view)

        new Assets(this)

        this.loader = new PIXI.Loader();
        this.loader.add('coverTexture', coverImage)
        this.loader.add('knightTexture', knightImage)
        this.loader.add('farmerTexture', farmerImage)
        this.loader.add('landlordTexture', landlordImage)
        this.loader.load(() => this.spriteLoadCompleted());
    }

    public loadCompleted() {
        //create brandaan mn niffouw
        let frames: PIXI.Texture[][] = this.createBrandaanFrames()
        this.brandaan = new Brandaan(this, frames, 50, 50)
        //let brandaan move
        this.pixi.ticker.add((delta: number) => this.update(delta))

        //create knight
        let knight = new Knight(this.loader.resources["knightTexture"].texture!, this, 700, 50)
        this.characters.push(knight)
        this.pixi.stage.addChild(knight)

        //create farmer
        let farmer = new Farmer(this.loader.resources["farmerTexture"].texture!, this, 750, 400)
        this.characters.push(farmer)
        this.pixi.stage.addChild(farmer)

        //create landlord
        let landlord = new Landlord(this.loader.resources["landlordTexture"].texture!, this, 100, 300)
        this.characters.push(landlord)
        this.pixi.stage.addChild(landlord)

        landlord.on('click', () => this.onClick() )
    }

    private onClick() {
        let button = new Button(100, 250, 'hoi')
        this.pixi.stage.addChild(button)
    }

    public spriteLoadCompleted() {
        //create background
        let cover = new PIXI.Sprite(this.loader.resources["coverTexture"].texture!);
        cover.height = this.pixiHeight;
        cover.width = this.pixiWidth;
        this.pixi.stage.addChild(cover);
    }

    private update(delta: number) {
        this.brandaan.update(delta)
    }

    private createBrandaanFrames(): PIXI.Texture[][] {
        // create an array of textures from an image path
        let frames: PIXI.Texture[] = [];
        let runFrames: PIXI.Texture[] = [];

        for (let i = 1; i <= 6; i++) {
            // magically works since the spritesheet was loaded with the pixi loader
            frames.push(PIXI.Texture.from(`brandaan_${i}`));
        }
        for (let i = 7; i <= 12; i++) {
            // magically works since the spritesheet was loaded with the pixi loader
            runFrames.push(PIXI.Texture.from(`brandaan_${i}`));
        }
        return [frames, runFrames]
    }
}

let game = new Game()