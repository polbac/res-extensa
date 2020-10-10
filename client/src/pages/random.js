import * as THREE from 'three';
import { arrayDivider } from '../utils/array'
import list from '../mock/random'

export class Random {
    constructor(){
        this.show() 
    }

    show() {
        const areas =  arrayDivider(list)
        console.log(areas)
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 10 );
        this.scene = new THREE.Scene();

        this.light = new THREE.PointLight( 0xffffff, 1, 100 );
        this.ambient = new THREE.AmbientLight( 0xffffff );
        
        this.counter = 0

        document.body.appendChild( this.renderer.domElement );
        this.animate.bind(this)()
        this.scene.add( this.light );
        //this.scene.add( this.ambient );

        console.log(data)
    }

    animate() {
        
        if (this.res) {
            this.res.position.x -= 0.001 
        }

        this.camera.updateProjectionMatrix();
        this.idAnimationFrame = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render( this.scene, this.camera );
     
    }

    destroy() {
        cancelAnimationFrame(this.idAnimationFrame)
        this.renderer.renderLists.dispose()
        $("canvas").remove()
        this.scene = null
        this.camera = null
        this.renderer = null
        
    }

}