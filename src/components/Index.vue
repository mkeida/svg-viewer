<!-- Template -->
<template>
    <div id='component-wrapper'>
        <!-- Panel wrapper -->
        <div id='panel-wrapper'>
            <el-collapse accordion v-model='collapse'>
                <!-- Image section -->
                <el-collapse-item title='Image' name='1'>
                    <!-- URL address -->
                    <label class='panel-label'>URL address</label>
                    <el-input class='panel-input' placeholder='' v-model='paper.imageUrl' prefix-icon='el-icon-picture'>
                    </el-input>
                </el-collapse-item>
                <!-- Editor section -->
                <el-collapse-item title='Editor' name='2'>
                    <!-- Rotation -->
                    <label class='panel-label'>Rotation</label>
                    <el-input class='panel-input' placeholder='' v-model='paperNoRedraw.rotation' prefix-icon='el-icon-refresh'>
                    </el-input>
                </el-collapse-item>
            </el-collapse>
        </div>
        <!-- Canvas wrapper -->
        <div id='canvas-wrapper'>
            <canvas id='canvas' resize></canvas>
        </div>
    </div>
</template>

<!-- Script -->
<script>
// Import Canvas class
import Canvas from '../scripts/canvas.js';

// Default export
export default {
    name: 'Index',
    data () {
        return {
            // Canvas object. Stores reference on our
            // canvas instance.
            canvas: '',
            // Paper properties which require canvas redraw
            paper: {
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Firefox_Logo%2C_2017.svg'
            },
            // Paper properties which do not need canvas redraw
            paperNoRedraw: {
                rotation: 0
            },
            // Other properties
            collapse: '1'
        }
    },
    watch: {
        // Watches over paper object / property. When one of properties is
        // changed, then whole paper.js canvas is redrawn.
        paper: {
            // Handler function
            handler: function() {
                // Update vm variable in canvas instance. This is
                // necessary because we always want to have canvas
                // up to date with our Vue instance data model.
                this.canvas.vm = this;

                // Redraw whole paper.js canvas so changes in Vue paper
                // property takes effect.
                this.canvas.redraw();
            },
            // Watch for internal changes
            deep: true
        }
    },
    // Called on creation of the component (view)
    mounted: function() {
        // Creates new canvas instance.
        var canvas = new Canvas(this, 'canvas');

        // Pass our canvas object to Vue instance
        this.canvas = canvas;

        // Canvas render method.
        canvas.render();

        // Canvas update method.
        canvas.update();

        // Canvas control method.
        canvas.control();
    }
}
</script>

<!-- Style -->
<style scoped>
    #component-wrapper {
        width: 100%;
        height: 100%;
    }

    /* Panel wrapper - holds control panel */
    #panel-wrapper {
        width: 30%;
        height: 100%;
        float: left;

        /* Other */
        padding: 20px;
    }

    /* Canvas wrapper - holds drawing canvas */
    #canvas-wrapper {
        width: 70%;
        height: 100%;
        float: right;
    }

    /* Canvas */
    canvas[resize] {
        width: 100%;
        height: 100%;
        background-color: #F4F4F4;
        border-left: 1px solid #dcdfe6;
    }

    /* Panel controls */
    /* Panel label */
    .panel-label {
        color: #818387;
        width: 100%;
        display: block;
    }

    .panel-label {
        padding-top: 10px;
    }
</style>
