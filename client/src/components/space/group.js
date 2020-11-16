import { ItemFactory } from './item'
import { create2Darray } from '../../utils/array'
import * as THREE from 'three';
import { VerticalDirection, HorizontalDirection } from './user-control'

const COORDINATE_VELOCITY = .01
const MAX_VALUE = 9999999999
const MIN_VALUE = -9999999999
export class SpaceGroup {
    constructor(data, scene) {
        this.SIZE = [45, 20];
        this.data = data;
        this.scene = scene;
        this.matrix = create2Darray(this.data)
        this.items = [];
        this.group = new THREE.Group();
    }

    getCanvasWidth() {
      return this.SIZE[0]
    }

    getCanvasHeight() {
      return this.SIZE[1]
    }

    build() {

      this.matrix = this.matrix.map((row, x) => {
        return row.map((item, y) => {
          const itemFactory = new ItemFactory(item)
          itemFactory.setX(x * this.getCanvasWidth());
          itemFactory.setY(-y * this.getCanvasHeight());
          this.group.add(itemFactory.getItem())
          this.items.push(itemFactory)
          return itemFactory
        })
      })

      this.scene.add(this.group)
      this.group.position.z = -30
    }

    checkEquals() {
      for (let i = 0; i < this.items.length; i++) {
        const currentItem =  this.items[i]
        let shouldMode = false
        console.log(currentItem.getX(), currentItem.getY())
        for (let j = 0; j < this.items.length; j++) {
          
          if (i !== j) {
            
            if (currentItem.getX() === this.items[j].getX() &&
              currentItem.getY() === this.items[j].getY()) {
                
              }
          }
        }
      }
    }

    move(coor) {
        this.didMoveVerticalOne = false
        this.didMoveHorizontalOne = false

        for (let i = 0; i < this.items.length; i++) {
          this.items[i].setX(this.items[i].getX() + (coor.x * COORDINATE_VELOCITY))
          this.items[i].setY(this.items[i].getY() - (coor.y * COORDINATE_VELOCITY))
        }

        for (let i = 0; i < this.items.length; i++) {
          this.assertMove(this.items[i], coor)
        }

        this.checkEquals() 
    }

    isInViewport(item) {
      const VIEWPORT_SIZE = {
        width: 40,
        height: 50,
      }
      return item.getItem().position.x > -VIEWPORT_SIZE.width && item.getItem().position.x < VIEWPORT_SIZE.width &&
        item.getItem().position.y > -VIEWPORT_SIZE.height && item.getItem().position.x < VIEWPORT_SIZE.height
    }

    getNextPosVertical(direction, item) {
      if (direction === VerticalDirection.TOP) {
        const nextPos = this.items
        .filter(it => {
          return Math.abs(it.getX() - item.getX()) < 1
        })
          .reduce((prev, current) =>  {
            return current.getY() < prev ?
              current.getY() : 
              prev
            }, 
            MAX_VALUE)
        
        if (nextPos === MAX_VALUE) {
          return -this.getCanvasHeight()
        }

        return nextPos - this.getCanvasHeight()
      } else if (direction === VerticalDirection.BOTTOM) {
        const nextPos = this.items
          .filter(it => {
            return Math.abs(it.getX() - item.getX()) < 1
          })
          .reduce((prev, current) =>  {
            return current.getY() > prev ?
              current.getY() : 
              prev
            }, 
            MIN_VALUE)
        
        if (nextPos === MIN_VALUE) {
          console.log(1)
          return this.SIZE[1]
        }

        return nextPos + this.getCanvasHeight()
      }

    }

    getNextPosHorizontal(direction, item) {
      if (direction === HorizontalDirection.RIGHT) {
        const nextPos = this.items
        .filter(it => {
          return Math.abs(it.getY() - item.getY()) < 1
        })
          .reduce((prev, current) =>  {
            return current.getX() < prev ?
              current.getX() : 
              prev
            }, 
            MAX_VALUE)
        
        if (nextPos === MAX_VALUE) {
          return -this.getCanvasWidth()
        }

        return nextPos - this.SIZE[0]
      } else if (direction === HorizontalDirection.LEFT) {
        const nextPos = this.items
          .filter(it => {
            return Math.abs(it.getY() - item.getY()) < 1
          })
          .reduce((prev, current) =>  {
            return current.getX() > prev ?
              current.getX() : 
              prev
            }, 
            MIN_VALUE)
        
        if (nextPos === MIN_VALUE) {
          return this.SIZE[0]
        }

        return nextPos + this.SIZE[0]
      }

    }

    assertMoveBottomVertical(item, verticalDirection) {
      if (verticalDirection === VerticalDirection.BOTTOM) {
        if (item.getY() < -this.SIZE[1]) {
          item.setY(this.getNextPosVertical(verticalDirection, item))
          this.didMoveVerticalOne = true
        } 
      }
    }

    assertMoveTopVertical(item, verticalDirection) {
      if (verticalDirection === VerticalDirection.TOP) {
        if (item.getY() > this.SIZE[1]) {
          item.setY(this.getNextPosVertical(verticalDirection, item))
          this.didMoveVerticalOne = true
        } 
      }
    }

    assertMoveLeftHorizontal(item, horizontalDirection) {  
      if (horizontalDirection === HorizontalDirection.LEFT && !this.didMoveHorizontalOne) {

        if (item.getX() < -this.SIZE[0]) {
          item.setX(this.getNextPosHorizontal(horizontalDirection, item))
          this.didMoveHorizontalOne = true
        } 
      }
    }

    assertMoveRightHorizontal(item, horizontalDirection) {
      if (horizontalDirection === HorizontalDirection.RIGHT && !this.didMoveHorizontalOne) {
        if (item.getX() > this.SIZE[0]) {
          item.setX(this.getNextPosHorizontal(horizontalDirection, item))
          this.didMoveHorizontalOne = true
        } 
      }
    }

    assertMove(item, { verticalDirection, horizontalDirection }) {
        this.assertMoveBottomVertical(item, verticalDirection)
        this.assertMoveTopVertical(item, verticalDirection)
        this.assertMoveLeftHorizontal(item, horizontalDirection)
        this.assertMoveRightHorizontal(item, horizontalDirection)
    }


    render() {
      this.matrix.forEach(row => {
        row.forEach(item => item.render())
      })
    }
}