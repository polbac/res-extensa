import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import{ ItemBase } from './item-base'
import { IMAGE_FOLDER } from '../../config'

export const MODEL_ITEM_TYPE = 'model'
const MODEL_WIDTH = 20;


export class ModelItem extends ItemBase{
    constructor(data, obj_z) {
        super()
        this.data = data; 
        this.obj_z = obj_z;       
        this.object = this.data.object.replace('{filedir_8}', IMAGE_FOLDER)
        this.texture = this.data.texture.replace('{filedir_8}', IMAGE_FOLDER)
        this.manager = new THREE.LoadingManager(this.modelLoaded.bind(this));   
    }

    modelLoaded() {
        this.object.traverse( ( child ) => {
            if ( child.isMesh ) {
                console.log('this.textureLoaded',this.textureLoaded)
                child.material.map = this.textureLoaded;
            }
            this.object.scale.set( 0.075, 0.075, 0.075 )
            this.group.z = 20
            this.group.add(this.object)
            
            this.position()
        } );
    }

    position() {
        
    }

    build() {
        this.group = new THREE.Group()
        
        if (this.object.indexOf('gltf') !== -1) {
            this.gltf()        
        }

        if (this.object.indexOf('obj') !== -1) {
            this.obj()        
        }
    }

    obj() {
        const loader = new OBJLoader( this.manager );

        loader.load( this.object, ( obj ) => {
            this.object = obj
            this.loadTexture()
        }, progress => {
            /* console.log(progress) */
        }, error => {
            console.log(error)
        } );

    }

    loadTexture() {
        const textureLoader = new THREE.TextureLoader( this.manager );
        this.textureLoaded = textureLoader.load( this.texture );

    }

    gltf() {
        this.gltfLoader = new GLTFLoader();
        this.gltfLoader.setCrossOrigin( 'anonymous' ) 
        this.gltfLoader.setCrossOrigin( 'use-credentials' ) 
        
        const dracoLoader = new DRACOLoader();
        
        this.gltfLoader.setDRACOLoader( dracoLoader );
        this.gltfLoader.load(this.object, gltf => {
            gltf.scene.scale.set( 0.05, 0.05, 0.05 );
            gltf.scene.position.z = -10
            gltf.scene.position.x = 2
            gltf.scene.position.y = -2
            this.group.add(gltf.scene)
        })
    }

    getItem() {
        return this.group
    }

    getItemDetectMouse() {
        return this.group
    }

    render() {
        //this.group.rotation.x += 0.001
        //this.group.rotation.y += 0.001
        this.group.rotation.y += 0.01
    }
}