// Represents item on the canvas
export default class CanvasItem {
    // Constructor method
    constructor(canvas) {
        this.canvas = canvas;
    }

    // Initialization method
    init() {
        console.log(this.vm);
    }

    // Update method
    update() {

    }

    // Render method
    render() {

    }

    // Adds an item to the canvas
    add() {
        this.canvas.items.push(this);
    }

    // Removes an item from canvas
    remove() {
        // Index of an item
        var index = this.canvas.items.indexOf(this);

        // Is item in items array?
        if (index != -1) {
            // Remove item by index
            this.canvas.items.splice(index, 1);
        }
    }
}
