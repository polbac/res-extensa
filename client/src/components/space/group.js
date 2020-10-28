import { ItemFactory } from './item'
import { create2Darray } from '../../utils/array'
import * as THREE from 'three';

const COORDINATE_VELOCITY = .01
const OBJ_Z = -100

export class SpaceGroup {

    constructor(data, scene) {
        this.SIZE = [40, 40];
        this.data = data;
        this.scene = scene;
        this.matrix = create2Darray(this.data)
        this.items = [];
        this.group = new THREE.Group();
    }

    build() {
      let x = 0

      this.matrix = this.matrix.map(row => {
        return row.map(item => {
          const itemFactory = new ItemFactory(item)
          itemFactory.getItem().position.x += x;
          x += this.SIZE[0];
          this.group.add(itemFactory.getItem())
          return itemFactory
        })
      })

      this.scene.add(this.group)
      this.group.position.z = -30
    }

    move(coor) {
        this.group.position.x += coor.x * COORDINATE_VELOCITY
        this.group.position.y -= coor.y * COORDINATE_VELOCITY
    }

    render() {
      
      this.matrix.forEach(row => {
        row.forEach(item => item.render())
      })
    }
}