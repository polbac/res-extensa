import { TextItem, TEXT_ITEM_TYPE } from './text'
import * as THREE from 'three';

export class SpaceGroup {
    constructor(data, scene) {
        this.SIZE = [50, 50];
        this.data = data;
        this.scene = scene;
        this.types = {
            [TEXT_ITEM_TYPE]: TextItem,
        };
        this.items = []
        this.group = new THREE.Group();
    }

    build() {
        this.items = this.data.map(item => {
            if (this.types[item.type]) {
                const a = new this.types[item.type](item);
                a.build()
                return a;
            }
        })

        let x = 0
        
        this.items.forEach(element => {
          if(element) {    
            element.getItem().position.x += x;
            x += this.SIZE[0];
            this.group.add(element.getItem())
          }
        });

        this.scene.add(this.group)
        
    }

    render() {
        this.group.position.x -= 0.1 
        
    }
}