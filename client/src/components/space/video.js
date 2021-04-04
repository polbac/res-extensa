import * as THREE from 'three';
import $ from 'jquery'
import { uuidv4 } from '../../utils/uuid'
import{ ItemBase } from './item-base'

import { IMAGE_FOLDER } from '../../config'

export const VIDEO_ITEM_TYPE = 'video'
const VIDEO_WIDTH = 20;

export class VideoItem extends ItemBase{
    constructor(data, obj_z) {
        super()
        this.data = data; 
        this.obj_z = obj_z;       
    }

    build() {
        const idDOMElement = uuidv4()
        const videoPath = this.data.video_preview.replace('{filedir_5}', IMAGE_FOLDER)
        $("body").append(`<video controls autoplay style='z-index: 0; position: absolute; top: 0; left: 0'  id='${idDOMElement}' src='${videoPath}' muted="muted" loop></video>`)
        
        this.video = document.getElementById(idDOMElement);
        this.video.setAttribute('crossorigin', 'anonymous');
        this.video.load(); // must call after setting/changing source
        this.video.play();
        let width, height
        this.video.addEventListener("loadedmetadata", () => {

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

        this.iteractiveAreaMesh.position.set(0, 0)
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

    }

    show() {
        
    }

    hide() {
        
    }
}