import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export const MODEL_ITEM_TYPE = 'model'
const MODEL_WIDTH = 20;

export class ModelItem {
    constructor(data, obj_z) {
        this.data = data; 
        this.obj_z = obj_z;       
    }

    build() {
        this.group = new THREE.Group()
        
        if (this.data.obj.indexOf('gltf') !== -1) {
            this.gltf()        
        }
    }

    gltf() {
        this.gltfLoader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        
        this.gltfLoader.setDRACOLoader( dracoLoader );
        this.gltfLoader.load(this.data.obj, gltf => {
            gltf.scene.scale.set( 0.1, 0.1, 1 );
            gltf.scene.position.z = -10
            this.group.add(gltf.scene)
        })
    }

    getItem() {
        return this.group
    }

    render() {
        this.group.rotation.x += 0.001
        this.group.rotation.y += 0.001
        this.group.rotation.z += 0.001
    }
}