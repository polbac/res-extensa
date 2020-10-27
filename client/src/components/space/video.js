import * as THREE from 'three';
import $ from 'jquery'
import { uuidv4 } from '../../utils/uuid'
export const VIDEO_ITEM_TYPE = 'video'
const VIDEO_WIDTH = 20;

export class VideoItem {
    constructor(data, obj_z) {
        this.data = data; 
        this.obj_z = obj_z;       
    }

    build() {
        const idDOMElement = uuidv4()
        
        $("body").append(`<video controls autoplay style='z-index: 0; position: absolute; top: 0; left: 0'  id='${idDOMElement}' src='${this.data.src}'></video>`)
        
        this.video = document.getElementById(idDOMElement);
        
        let width, height
        this.video.addEventListener( "loadedmetadata", () => {

            height = this.video.videoHeight;
            width = this.video.videoWidth;
        
            this.texture = new THREE.VideoTexture(this.video);
            this.texture.minFilter = THREE.LinearFilter;
            this.texture.magFilter = THREE.LinearFilter;
            this.texture.format = THREE.RGBFormat;

            this.material = new THREE.MeshBasicMaterial( { map: this.texture, overdraw: 0.5 } );
            
            this.mesh = new THREE.Mesh( 
                new THREE.PlaneGeometry(VIDEO_WIDTH, VIDEO_WIDTH * (height / width), 32 ),
                this.material
            );    

            this.group.add(this.mesh)
            

		}, false );

        
        

        this.group = new THREE.Group();
        
        

    }

    getItem() {
        return this.group
    }

    render() {

    }
}