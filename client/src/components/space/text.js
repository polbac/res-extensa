import * as THREE from 'three';
import{ ItemBase } from './item-base'
import { IMAGE_FOLDER } from '../../config'

export const TEXT_ITEM_TYPE = 'text'
const IMAGE_WIDTH = 35;

export class TextItem extends ItemBase{
    constructor(data, rendered) {
        super()
        this.data = data; 
        this.rendered = rendered;       
    }

    build() {
        const image = `https://res-extensa.com/image-generator.php?title=${this.data.title.toUpperCase()}&body=${this.data.subtitle}`
        this.map = new THREE.TextureLoader().load(image);
        this.map.anisotropy = this.rendered.getMaxAnisotropy();
        this.map.minFilter = THREE.LinearFilter;
        this.material = new THREE.SpriteMaterial( { map: this.map, color: 0xffffff } );
        this.sprite = new THREE.Sprite( this.material );
        this.image = new Image()
        this.image.onload = () => {
            this.sprite.scale.set(IMAGE_WIDTH, IMAGE_WIDTH * (this.image.height / this.image.width), 1);    
        }
        this.image.src = image
        this.sprite._data = this.data
    }

    getItem() {
        return this.sprite
    }

    getItemDetectMouse() {
        return this.sprite
    }

    render() {

    }
}