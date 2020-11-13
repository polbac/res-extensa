import { ItemFactory } from './item'
import { create2Darray } from '../../utils/array'
import * as THREE from 'three';
import { VerticalDirection, HorizontalDirection } from './user-control'

const COORDINATE_VELOCITY = .01
const MAX_VALUE = 9999999999
const MIN_VALUE = -9999999999
export class SpaceGroup {

    constructor(data, scene) {
        this.SIZE = [40, 20];
        this.data = data;
        this.scene = scene;
        this.matrix = create2Darray(this.data)
        this.items = [];
        this.group = new THREE.Group();
    }


    build() {

      this.matrix = this.matrix.map((row, x) => {
        return row.map((item, y) => {
          const itemFactory = new ItemFactory(item)
          itemFactory.getItem().position.x = x * this.SIZE[0];
          itemFactory.getItem().position.y = -(y * this.SIZE[1]);
          this.group.add(itemFactory.getItem())
          this.items.push(itemFactory)
          return itemFactory
        })
      })

      this.scene.add(this.group)
      this.group.position.z = -30
    }

    move(coor) {
        this.matrix.forEach((row) => {
          row.forEach((item) => {
            item.getItem().position.x += coor.x * COORDINATE_VELOCITY
            item.getItem().position.y -= coor.y * COORDINATE_VELOCITY  
            this.assertMove(item, coor)
          })
        })
          
        
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
      /* if (direction === VerticalDirection.TOP) {
        const nextPos = this.items
          .filter(it => it.getItem().position.x === item.getItem().position.x)
          .reduce((prev, current) =>  {
            return current.getItem().position.y < prev ?
              current.getItem().position.y : 
              prev
            }, 
            MAX_VALUE)
        
        if (nextPos === MAX_VALUE) {
          return -this.SIZE[1]
        }

        return nextPos - this.SIZE[1]
      } */

      if (direction === VerticalDirection.BOTTOM) {
        const nextPos = this.items
          .filter(it => it.getItem().position.x === item.getItem().position.x)
          .reduce((prev, current) =>  {
            return current.getItem().position.y > prev ?
              current.getItem().position.y : 
              prev
            }, 
            MIN_VALUE)
        
        if (nextPos === MIN_VALUE) {
          return this.SIZE[1]
        }

        return nextPos + this.SIZE[1]
      }

    }

    assertMoveBottomVertical(item, verticalDirection) {
      if (verticalDirection === VerticalDirection.BOTTOM) {
        if (item.getItem().position.y < -this.getHeight()) {
          item.getItem().position.y = this.getNextPosVertical(verticalDirection, item)
        } 
      }
    }

    assertMoveTopVertical(item, verticalDirection) {
      if (verticalDirection === VerticalDirection.TOP) {
        if (item.getItem().position.y > this.getHeight()) {
          item.getItem().position.y = this.getNextPosVertical(verticalDirection, item)
        } 
      }
    }

    assertMoveLeftHorizontal(item, horizontalDirection) {
      
      if (horizontalDirection === HorizontalDirection.LEFT) {
        
      }
    }

    assertMoveRightHorizontal(item, horizontalDirection) {
      if (horizontalDirection === HorizontalDirection.RIGHT) {
        
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