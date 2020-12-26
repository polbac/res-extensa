import * as THREE from 'three';
import{ ItemBase } from './item-base'

export const SOUND_ITEM_TYPE = 'sound'
const IMAGE_WIDTH = 25;

export class SoundItem extends ItemBase{
    constructor(data, obj_z) {
        super()
        this.data = data; 
        this.obj_z = obj_z;       
    }

    build() {
        const image = `http://ee.testeando.website/one-line.php?text_1=${this.data.title.toUpperCase()}&text_2=${this.data.author}`
        this.map = new THREE.TextureLoader().load(image);
        this.map.userData = {
            fitTo : 1
        };
        this.map.wrapS = THREE.RepeatWrapping;
        this.map.wrapT = THREE.RepeatWrapping;

        this.material = new THREE.MeshPhongMaterial( {
            color: 0x00ffff, 
            flatShading: true,
            transparent: false,
            opacity: 0.7,
            map: this.map
        }); 

        this.geometry = new THREE.BoxGeometry( 1, 5, 2 );
        this.box = new THREE.Mesh( this.geometry, this.material );
        meshFitUvMap(this.box);

        

        this.material = new THREE.SpriteMaterial( { map: this.map, color: 0xffffff } );
        this.sprite = new THREE.Sprite( this.material );
        this.image = new Image()
        this.image.onload = () => {
            this.sprite.scale.set(IMAGE_WIDTH, IMAGE_WIDTH, 1);    
        }

        
        this.image.src = image
        this.sprite._data = this.data
        console.log(this.sprite)
    }

    getItem() {
        return this.sprite
    }

    getItemDetectMouse() {
        return this.sprite
    }

    render() {
        this.map.offset.x += 0.001
    }
}

function meshFitUvMap(mesh) {
  
    if (mesh.geometry && 
        mesh.material && 
        mesh.material.map && 
        mesh.material.map.userData && 
        mesh.material.map.userData.fitTo > 0) {
      
        
       var geometry = mesh.geometry;
       var textureFitTo = mesh.material.map.userData.fitTo; 
       var faces = mesh.geometry.faces;
      
        for (var i = 0, len = faces.length; i < len; i ++) {
        var face = faces[i];
        var uv = geometry.faceVertexUvs[0][i];
 
        var components = ['x', 'y', 'z'].sort(function(a, b) {
           return Math.abs(face.normal[a]) > Math.abs(face.normal[b]);
        });
      
      var v1 = mesh.geometry.vertices[face.a];
      var v2 = mesh.geometry.vertices[face.b];
      var v3 = mesh.geometry.vertices[face.c];
      
      var newUv0 = new THREE.Vector2(v1[components[0]] / textureFitTo, v1[components[1]] / textureFitTo);
      var newUv1 = new THREE.Vector2(v2[components[0]] / textureFitTo, v2[components[1]] / textureFitTo);
      var newUv2 = new THREE.Vector2(v3[components[0]] / textureFitTo, v3[components[1]] / textureFitTo);
 
        uv[0].copy(newUv0);
        uv[1].copy(newUv1);
        uv[2].copy(newUv2);
 
        }
    }
 }