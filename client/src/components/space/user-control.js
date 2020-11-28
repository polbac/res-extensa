import  mouseWheel from 'mouse-wheel'

export const VerticalDirection = {
    TOP: 'top',
    BOTTOM: 'bottom',
}

export const HorizontalDirection = {
    LEFT: 'left',
    RIGHT: 'right',
}

export const MOVE = 'move'
export const MOUSE_MOVE = 'move_move'
export const CLICK = 'click'

const OFFSET = 4
export class UserControl {
    constructor() {
        this.lastX = 0
        this.lastY = 0
        this.verticalDirection = null
        this.horizontalDirection = null

        document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        document.addEventListener('click', this.onClick.bind(this), false);


        mouseWheel((x, y) => {
            if (x > OFFSET) {
                this.horizontalDirection = HorizontalDirection.LEFT
            }

            if (x < -OFFSET) {
                this.horizontalDirection = HorizontalDirection.RIGHT
            }

            if (y < -OFFSET) {
                this.verticalDirection = VerticalDirection.BOTTOM
            }

            if (y > OFFSET) {
                this.verticalDirection = VerticalDirection.TOP
            }
            
            global.eventEmitter.emit(MOVE, { 
                horizontalDirection: this.horizontalDirection,
                verticalDirection: this.verticalDirection,
                x: -x,
                y: -y,
            })


            this.lastX = x
            this.lastY = y

            return false;
        })
    }

    mapMouseCoordinates({clientX, clientY})  {
        return {
            x: clientX,
            y: clientY,
        }
    }

    onClick(event) {
        const { x, y} = this.mapMouseCoordinates(event)

        global.eventEmitter.emit(CLICK, { 
            x,
            y,
        })
    }

    onDocumentMouseMove(event) {
        const { x, y} = this.mapMouseCoordinates(event)
        global.eventEmitter.emit(MOUSE_MOVE, { 
            x,
            y,
        })
    }
}