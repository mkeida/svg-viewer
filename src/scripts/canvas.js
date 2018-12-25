// Imports
// Load paper.js library
import paper from 'paper';

// Load JQuery library
import $ from 'jquery';

// Load Grid
import SvgObject from './svgObject';

// Canvas class. Creates drawing surface using Paper.js
// library and establish basic application life-cycle.
class Canvas {
    // Constructor method. Takes vm - view-model => vue
    // instance variable. Initializes Paper.js library.
    // Second parameter is an ID of canvas HTML element.
    constructor(vm, id) {
        // Install paper.js content to current scope
        paper.install(window);

        // Setup paper.js canvas
        paper.setup(document.getElementById(id));

        // Update view-model (vue instance) property
        this.vm = vm;

        // Update canvas id
        this.id = id;

        // Initializes background and foreground layers used
        // for rendering purposes.
        // Background layer - respects scaling, translate,
        // rotation and other transforms.
        this.background = new Layer();
        this.background.applyMatrix = false;

        // Foreground layer - ignores all transforms. Serves
        // like a HUD layer.
        this.foreground = new Layer();
        this.foreground.applyMatrix = false;

        // Cursor position - current position of mouse.
        this.mousePoint = new Point(0, 0);

        // True if mouse button (left or right) is pressed.
        this.mouseDown = false;

        // Position of cursor where mouse button (left or
        // right) was pressed last time.
        this.mouseDownPoint = new Point(0, 0);

        // Array of all canvas items
        this.items = [];

        // Canvas rotation
        this.rotation = 0;

        // Create new SVG object
        this.svgObject = new SvgObject(this);
        this.svgObject.add();
    }

    // Render method. Initializes (and draws) all paths. Render
    // function is called every time when Vue property related to
    // paper canvas is changed. See more in the 'watch' method of
    // Vue instance.
    render() {
        // Activate background layer
        this.background.activate();

        // Set URL
        this.svgObject.url = this.vm.paper.imageUrl;

        // Iterate over all canvas items and draw them
        this.items.forEach((item) => {
            // Render item
            item.render();
        });
    }

    // Update method. Overloads onFrame function internally.
    update() {
        // OnFrame function is called sixty times per second.
        // Serves as the main update function of paper.js library.
        view.onFrame = (event) => {
            // Set rotation from control panel
            this.background.rotate(this.vm.paperNoRedraw.rotation);
        };
    }

    // Control method. Handles user input.
    control() {
        // Hooks up on mouse down handle function.
        view.onMouseDown = (event) => {
            // Left or right mouse button was pressed. Update
            // canvas property.
            this.mouseDown = true;

            // Update mouse down point
            this.mouseDownPoint = event.point;
        }

        // Hooks up on mouse up handle function.
        view.onMouseUp = (event) => {
            // Mouse button (left or right) was released.
            // Update mouseDown property.
            this.mouseDown = false;
        }

        // Hooks up on mouse move handle function.
        view.onMouseMove = (event) => {
            // Update current mouse position
            this.mousePoint = event.point;

            // Is mouse button pressed?
            if (this.mouseDown) {
                // Translate background layer
                this.background.translate(new Point(
                    this.mousePoint.x - this.mouseDownPoint.x,
                    this.mousePoint.y - this.mouseDownPoint.y
                ));

                // Update mouse down point. Remove this line if translate above
                // is performed on the view. If a translate is performed on
                // activeLayer, we also need to update a mouse down position.
                this.mouseDownPoint = event.point;
            }
        }

        // Variable that stores 'this' rereference - reference on this canvas object.
        // 'this' keyword in JQuery 'on' function references 'window' object.
        var _this = this;

        // Handles scrolling (using JQuery)
        $(document).ready(() => {
            // On mouse-wheel scroll handle function
            $(window).on('wheel', function(e) {
                // Is mouse hovering over canvas?
                if ($('#' + _this.id).is(":hover")) {
                    // Gets delta
                	var delta = e.originalEvent.deltaY;

                    // Is delta bigger than zero?
                	if (delta > 0) {
                        // User scrolled down
                        // Scales background layer down
                        _this.background.scale(0.9, _this.mousePoint);
                    } else {
                        // User scrolled up
                        // Scales background layer up
                        _this.background.scale(1.1, _this.mousePoint)
                    }
                }

                // This line is only added so the whole page won't scroll
                return false;
            });
        });
    }

    // Wipe out whole paper.js canvas
    clean() {
        // Removes everything from bacgkround layer
        this.background.removeChildren();

        // Removes everything from foreground layer
        this.foreground.removeChildren();
    }

    // Redraws whole paper.js canvas
    redraw() {
        // Clean everything
        this.clean();

        // Draw everything again (usually with updated values)
        this.render();
    }
}

// Export our class
export default Canvas;
