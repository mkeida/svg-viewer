// Imports
// Load CanvasItem class
import CanvasItem from './canvasItem';

// Grid class. Handles grid drawing.
export default class SvgObject extends CanvasItem {
    // Constructor method
    constructor(canvas) {
        // Calls parent constructor
        super(canvas);

        // Parameters
        this.url = '';
    }

    // Render method. Draws grid.
    render() {
        // Call parent method
        super.render();

        // Loads and display SVG object from
        // ulr address
        project.importSVG(this.url);
    }
}
