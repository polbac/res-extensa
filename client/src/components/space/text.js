import * as THREE from 'three';
import{ ItemBase } from './item-base'

import { getAssetsLoader } from './assets-loader'

export const TEXT_ITEM_TYPE = 'text'

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

        this.geometryBody = new THREE.TextGeometry(this.data.subtitle, {
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

        this.sprite = new THREE.Group();
        this.sprite.add(this.title)
        this.sprite.add(this.body)
        

        const areaTitle = new THREE.Box3();
        areaTitle.setFromObject(this.title);
        this.body.position.y = -areaTitle.max.y

        const totalBody = new THREE.Box3();
        totalBody.setFromObject(this.sprite);

        this.iteractiveAreaGeo = new THREE.PlaneGeometry(
            20, 
            8,
            32
        );

        this.iteractiveAreaMaterial = new THREE.MeshPhongMaterial({
            opacity: 0,
            transparent: true,
          });
        this.iteractiveAreaMesh = new THREE.Mesh(this.iteractiveAreaGeo, this.iteractiveAreaMaterial);

        this.iteractiveAreaMesh.position.set(10, -2)
        this.sprite.add(this.iteractiveAreaMesh)
        this.iteractiveAreaMesh._data = this.data
    }

    getItem() {
        return this.sprite
    }

    getItemDetectMouse() {
        return this.iteractiveAreaMesh
    }

    render() {

    }
}