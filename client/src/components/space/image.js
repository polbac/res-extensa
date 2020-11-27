import * as THREE from 'three';
import{ ItemBase } from './item-base'

export const IMAGE_ITEM_TYPE = 'image'
const IMAGE_WIDTH = 20;

export class ImageItem extends ItemBase{
    constructor(data, obj_z) {
        super()
        this.data = data; 
        this.obj_z = obj_z;       
    }

    build() {
        this.map = new THREE.TextureLoader().load(this.data.src);
        this.material = new THREE.SpriteMaterial( { map: this.map, color: 0xffffff } );
        this.sprite = new THREE.Sprite( this.material );
        this.image = new Image()
        this.image.onload = () => {
            this.sprite.scale.set(IMAGE_WIDTH, IMAGE_WIDTH * (this.image.height / this.image.width), 1);    
        }
        this.image.src = this.data.src

    }

    getItem() {
        return this.sprite
    }

    render() {

    }
}