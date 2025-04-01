export default class Renderer {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        const context = this.canvas.getContext('2d')
        if(!context) throw Error('Could not get canvas context');
        this.context = context
    }
}