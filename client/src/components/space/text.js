import * as THREE from 'three';

import { getAssetsLoader } from './assets-loader'

export const TEXT_ITEM_TYPE = 'text'

export class TextItem {
    constructor(data) {
        this.data = data;    
    }

    build() {
        console.log(this.data)
        this.geometry = new THREE.TextGeometry(this.data.title, {
            size: 2,
            height: 10,
            curveSegments: 10,

            bevelThickness: 0,
            bevelSize: 0,
            bevelEnabled: true,
            font: getAssetsLoader()['font-1']
        })
        
        
        
        
        
        this.material =new THREE.MeshPhongMaterial( 
            { color: 0x000000, specular: 0xffffff }
          );
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        
        this.group = new THREE.Group();
        
        this.group.add(this.mesh)

        this.group.position.z = -20
    }

    getItem() {
        return this.group
    }

    render() {

    }
}