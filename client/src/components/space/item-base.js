import * as THREE from 'three';

const OUTSIDE = 'outside'
const INSIDE = 'inside'
export class ItemBase{
    constructor() {
        this.mouseState = false
        this.SIZE = [45, 20];
        this.inViewport = false
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2(1, 1);
    }

    
    setY(y) {
        this.y = y
        this.getItem().position.y = y
        this.setIsInViewport()
    }

    getY() {
        return this.y
    }

    setX(x) {
        this.x = x
        this.getItem().position.x = x
        this.setIsInViewport()
    }

    getX() {
        return this.x
    }

    setZ(z) {
        this.z = z
        this.getItem().position.z = z
    }

    getZ() {
        return this.z
    }

    setIsInViewport() {
        const lastInViewport = this.inViewport

        if (
            this.getX() > -this.SIZE[0] &&
            this.getX() < this.SIZE[0] &&
            this.getY() > -this.SIZE[1] &&
            this.getY() < this.SIZE[1]
        ) {
            this.inViewport = true
        } else {
            this.inViewport = false
        }

        if (lastInViewport !== this.inViewport) {

            if (this.inViewport) {
                if (this.show) this.show()
            } else {
                if (this.hide) this.hide()
            }

        }
    }

    setMousePosition(coor) {
        const { x, y } = coor;

        const midWidth = 0.3
        const midHeight = 0.2

        if (x > this.getX() - midWidth & x < this.getX() + midWidth &&
            y > this.getY() - midHeight & y < this.getY() + midHeight) {
                if (this.mouseState === OUTSIDE || !this.mouseState ) {
                    this.mouseState = INSIDE
                    if (this.mouseEnter) this.mouseEnter()
                }
        } else {
            if (this.mouseState === INSIDE || !this.mouseState ) {
                this.mouseState = OUTSIDE
                if (this.mouseEnter) this.mouseLeave()
            }
        }
    }

    isMouseInside() {
        return this.mouseState === INSIDE
    }
}