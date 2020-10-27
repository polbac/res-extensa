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

export class UserControl {
    constructor() {
        this.lastX = 0
        this.lastY = 0
        this.verticalDirection = null
        this.horizontalDirection = null

        mouseWheel((x, y) => {
            if (this.lastX > x) {
                this.horizontalDirection = HorizontalDirection.LEFT
            }

            if (this.lastX < x) {
                this.horizontalDirection = HorizontalDirection.RIGHT
            }

            if (this.lastY > y) {
                this.verticalDirection = VerticalDirection.TOP
            }

            if (this.lastY < y) {
                this.verticalDirection = VerticalDirection.BOTTOM
            }

            this.lastX = x
            this.lastY = y

            global.eventEmitter.emit(MOVE, { 
                horizontalDirection: this.horizontalDirection,
                verticalDirection: this.verticalDirection,
                x: -x,
                y: -y,
            })

            return false;
        })
    }
}