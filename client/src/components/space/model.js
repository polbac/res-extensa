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
        this.color = data.color
        if (!!this.color.length) {
            this.color = this.color.replace('#', '')
        }
        this.obj_z = obj_z;       
        this.object = this.data.object.replace('{filedir_5}', IMAGE_FOLDER)
        this.texture = this.data.texture.replace('{filedir_5}', IMAGE_FOLDER)
        this.manager = new THREE.LoadingManager(this.modelLoaded.bind(this));   
    }

    modelLoaded() {
        this.object.traverse( ( child ) => {
            if ( child.isMesh ) {
                child.castShadow = true; //default is false
                child.receiveShadow = true; //default
                child.material.map = this.textureLoaded;
            }
            
            
            
            this.positionAndAdd()
        } );
    }

    positionAndAdd() {
        const scale = this.data.scale || 1
        this.object.scale.set( 0.075 * scale, 0.075* scale, 0.075 * scale)
        this.object.position.y = -10
        this.group.z = 20
        
        this.group.add(this.object)
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
            
            if (this.texture) {
                this.loadTexture()
                return
            } else {
                this.object.traverse( ( child ) => {
                    if ( child instanceof THREE.Mesh ) {
                        /* if (this.color) {
                            //child.material.emissive.setHex('0x000000');
                            child.material.color.setHex('0x' + this.color);
                            child.material.shininess = 60
                            child.castShadow = true; //default is false
                            child.receiveShadow = true; //default
                        } */
                    }
                } );
            }

            this.positionAndAdd()
            
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
            this.object = gltf
            this.object.scene.scale.set( this.data.scale || 1, this.data.scale || 1, this.data.scale || 1 );

            this.mesh = gltf.scene;

            var box = new THREE.Box3().setFromObject( this.mesh );
            box.center( this.mesh.position ); 
            this.mesh.position.multiplyScalar( - 1 );
    
            this.pivot = new THREE.Group();
            this.pivot.add( this.mesh );
    
            
            

            this.group.add(this.pivot)
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
        
    if (this.pivot) {
        this.pivot.rotation.y += 0.01;
        return
    }
        this.group.rotation.y += 0.01
    }
}