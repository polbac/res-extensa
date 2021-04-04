import * as THREE from 'three';
import{ ItemBase } from './item-base'
import { uuidv4 } from '../../utils/uuid'
import $ from 'jquery'

export const SOUND_ITEM_TYPE = 'sound'
const IMAGE_HEIGHT = 2.5;

export class SoundItem extends ItemBase{
    constructor(data, rendered) {
        super()
        this.data = data; 
        this.rendered = rendered;       
        this.loaded = false
        this.marqueX = 0
    }

    createMarqueeCanvas(idDOMElement) {
        const idElement = uuidv4()
        const mult = 50
        const width = (IMAGE_HEIGHT * 6) * mult
        const height = IMAGE_HEIGHT * mult
    
        
        this.ctx = document.createElement('canvas').getContext('2d');

        this.ctx.canvas.width = width;
        this.ctx.canvas.height = height;

        this.ctx.fillStyle = "#f2f2f2";
        this.ctx.fillRect(0, 0, width, height);


        this.image = new Image()
        this.image.height = height
        this.image.crossOrigin = "anonymous";
        this.image.onload = () => {
            this.ctx.drawImage(this.image, 0, 30);    

            this.canvasTexture = new THREE.CanvasTexture(this.ctx.canvas);
            this.canvasTexture.anisotropy = this.rendered.getMaxAnisotropy();
            this.canvasTexture.minFilter = THREE.LinearFilter;

            this.textMaterial = new THREE.MeshBasicMaterial( {
                map: this.canvasTexture,
            }); 

            const geometry = new THREE.BoxGeometry(IMAGE_HEIGHT * 6, IMAGE_HEIGHT, 0);

            this.textMesh = new THREE.Mesh(geometry, this.textMaterial);
            this.textMesh.position.x = IMAGE_HEIGHT * 2.5
            this.group.add(this.textMesh)

            this.loaded = true

            this.borderGeometry = new THREE.BoxGeometry( IMAGE_HEIGHT * 6, IMAGE_HEIGHT, 0 );
            this.edges = new THREE.EdgesGeometry( this.borderGeometry );
            this.line = new THREE.LineSegments( this.edges, new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 3  } ) );
            this.line.position.x = IMAGE_HEIGHT * 2.5
            this.group.add(this.line)
        }

        this.image.src = `https://res-extensa.com//one-line.php?text_2=${this.data.author}&text_1=${this.data.title}`
        
        
        
    }

    build() {
        this.group = new THREE.Group();
        this.createMarqueeCanvas()


        /* ICON */
        const icon = 'img/sound-icon.jpg'
        this.iconMap = new THREE.TextureLoader().load(icon);
        this.iconMaterial = new THREE.SpriteMaterial( { map: this.iconMap} );
        
        this.iconSprite = new THREE.Sprite( this.iconMaterial );
        this.iconSprite.scale.set(IMAGE_HEIGHT, IMAGE_HEIGHT, 1);    
        this.group.add(this.iconSprite)


        /* BORDER */
        
        
        //this.image.src = image
        //this.sprite._data = this.data

        

        this.iteractiveAreaGeo = new THREE.PlaneGeometry(
            20, 
            10,
            32
        );


        this.iteractiveAreaMaterial = new THREE.MeshPhongMaterial({
            opacity: 0,
            transparent: true,
          });
        this.iteractiveAreaMesh = new THREE.Mesh(this.iteractiveAreaGeo, this.iteractiveAreaMaterial);

        this.iteractiveAreaMesh.position.x = IMAGE_HEIGHT * 2.5
        this.group.add(this.iteractiveAreaMesh)

        this.iteractiveAreaMesh._data = this.data
    }

    getItem() {
        return this.group
    }

    getItemDetectMouse() {
        return this.iteractiveAreaMesh
    }

    render() {
        if (this.loaded) {
            const mult = 50

            const width = (IMAGE_HEIGHT * 6) * mult
            const height = IMAGE_HEIGHT * mult
            
            this.marqueX -= 2

            if (this.marqueX < 0 - this.image.width) {
                this.marqueX = width
            }

            
            
            this.ctx.fillStyle = "#f2f2f2";
            this.ctx.fillRect(0, 0, width, height);
            this.ctx.drawImage(this.image, this.marqueX, 30);    
            this.canvasTexture.needsUpdate = true
        }
        //this.map.offset.x += 0.001
    }
}
