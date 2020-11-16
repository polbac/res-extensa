export class ItemBase{
    constructor() {}

    setY(y) {
        this.y = y
        this.getItem().position.y = y
    }

    getY() {
        return this.y
    }

    setX(x) {
        this.x = x
        this.getItem().position.x = x
    }

    getX() {
        return this.x
    }
}