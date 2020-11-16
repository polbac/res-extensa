import * as THREE from 'three';
import{ ItemBase } from './item-base'

import { getAssetsLoader } from './assets-loader'

export const TEXT_ITEM_TYPE = 'text'
console.log('ItemBase',ItemBase)
export class TextItem extends ItemBase{
    constructor(data, obj_z) {
        super()
        this.data = data;    
        this.obj_z = obj_z;    
        
    }

    build() {
        this.material = new THREE.MeshPhongMaterial({ color: 0x000000, specular: 0xffffff });

        this.title = new THREE.Group();
        this.body = new THREE.Group();

        this.geometryTitle = new THREE.TextGeometry(this.data.title, {
            size: 2,
            height: 0.01,
            curveSegments: 10,

            bevelThickness: 0,
            bevelSize: 0,
            bevelEnabled: true,
            font: getAssetsLoader()['font-1']
        });

        this.geometryBody = new THREE.TextGeometry(this.data.body, {
            size: 1,
            height: 0.01,
            curveSegments: 10,

            bevelThickness: 0,
            bevelSize: 0,
            bevelEnabled: true,
            font: getAssetsLoader()['font-1']
        });

        this.meshTitle = new THREE.Mesh(this.geometryTitle, this.material);
        this.meshBody = new THREE.Mesh(this.geometryBody, this.material);

        this.title.add(this.meshTitle)
        this.body.add(this.meshBody)
        var area = new THREE.Box3();
        area.setFromObject(this.title);
        this.body.position.y = -area.max.y
        
        this.group = new THREE.Group();
        this.group.add(this.title)
        this.group.add(this.body)
    }

    getItem() {
        return this.group
    }

    render() {

    }
}