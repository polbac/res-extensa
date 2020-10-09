import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

class Landing {
    constructor(){}
    show() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 10 );
        this.scene = new THREE.Scene();

        this.light = new THREE.PointLight( 0xffffff, 1, 100 );
        this.ambient = new THREE.AmbientLight( 0xffffff );
        this.loader = new OBJLoader();
        this.counter = 0

        this.loader.load( 'res-extensa.obj', (object) => {
            object.traverse(function (child) {
                var diffuseColor = new THREE.Color().setRGB(1,1,1);
                child.material = new THREE.MeshPhysicalMaterial({
                    color: diffuseColor,
					metalness: 0,
                });
                child.position.y = -0.25
                child.rotation.y = 0.2

            });
            this.res = object
            this.scene.add( this.res );
        
        }, undefined, function ( error ) {
            console.error( error );
        
        } );
        
        
        
        document.body.appendChild( this.renderer.domElement );
        this.animate.bind(this)()
        this.scene.add( this.light );
        //this.scene.add( this.ambient );

        
        
    }

    animate() {
        
        if (this.res) {
            this.res.position.x -= 0.001 
        }

        this.camera.updateProjectionMatrix();
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render( this.scene, this.camera );
     
    }
}



const landing = new Landing()
export default landing