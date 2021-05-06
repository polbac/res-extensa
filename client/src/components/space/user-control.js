
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
    destroy() {
        document.removeEventListener("touchstart", this.touchstart, false);
        document.removeEventListener("mousemove", this.onDocumentMouseMove, false);
        document.removeEventListener("touchmove", this.touchMove, false);
        window.removeEventListener('wheel', this.wheel, true)   
    }

    wheel(e) {
        if (!window.isInRandom) {
            return
        }
        
        e.preventDefault()
        const x = e.deltaX
        const y = e.deltaY

        this.processVector(x, y)

        return false
    }

    processVector(x, y) {
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
    }
    
    constructor() {
        this.lastX = 0
        this.lastY = 0
        this.verticalDirection = null
        this.horizontalDirection = null

        document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        document.addEventListener('click', this.onClick.bind(this), false);


        window.addEventListener('wheel', this.wheel.bind(this));


        let touchstartX, touchstartY, touchendX, touchendY

        
        
        this.touchStart = (e) => {
            touchstartX = e.touches[0].clientX;
            touchstartY = e.touches[0].clientY;
            e.preventDefault()
            return false
        }

        document.addEventListener('touchstart', this.touchStart, false);
        
        

        this.touchMove = (e) => {
            
            touchendX = e.touches[0].clientX;
            touchendY = e.touches[0].clientY;

            const x = (touchstartX - touchendX) / 10
            const y = (touchstartY - touchendY) / 10
            
            this.processVector(x, y)

            e.preventDefault()

            touchendX = e.touches[0].clientX;
            touchendY = e.touches[0].clientY;
            return false
        }

        document.addEventListener('touchmove', this.touchMove, false); 
        

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
        event.preventDefault();
        const { x, y} = this.mapMouseCoordinates(event)
        global.eventEmitter.emit(MOUSE_MOVE, { 
            x,
            y,
        })
    }
}