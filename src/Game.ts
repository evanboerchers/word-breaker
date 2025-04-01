import Renderer from "./Renderer"

export default class Game {
    renderer: Renderer
    constructor(canvas: HTMLCanvasElement) {
        this.renderer = new Renderer(canvas)
    }   

}