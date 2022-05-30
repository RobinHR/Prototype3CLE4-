import * as PIXI from 'pixi.js'
import coverImage from './images/cover.png'
import { Assets } from './assets'
import { Brandaan } from './brandaan'

export class Game {
    private pixiWidth = 800
    private pixiHeight = 500
    
    pixi: PIXI.Application
    loader: PIXI.Loader
    brandaan: Brandaan

    constructor() {

        // this._pixi = new PIXI.Application({ width: 1440, height: 900})
        this.pixi = new PIXI.Application({ width: this.pixiWidth, height: this.pixiHeight, backgroundColor: 0x1099bb });
        document.body.appendChild(this.pixi.view)

        new Assets(this)

        this.loader = new PIXI.Loader();
        this.loader.add('coverTexture', coverImage)
        this.loader.load(()=>this.spriteLoadCompleted());
    }

    public loadCompleted() {
        //create brandaan mn niffouw
        let frames: PIXI.Texture[][] = this.createBrandaanFrames()
        this.brandaan = new Brandaan(this, frames, 50, 50)
        //let brandaan move
        this.pixi.ticker.add((delta: number) => this.update(delta))

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