import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { TweenMax } from 'gsap'
import { Base } from './base'
import addListener from 'the-listener';



import $ from 'jquery'

export class Landing  extends Base{
    constructor(router){
        super(router, 'landing')
    }
    show() {
        $("nav").addClass("landing")
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor( 0xB08AFC );
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
        this.camera.position.set( 0, 0, 20 );

        
        this.scene = new THREE.Scene();

        
        
        this.loader = new GLTFLoader();
        this.loader.setCrossOrigin( 'anonymous' ) 
        this.loader.setCrossOrigin( 'use-credentials' ) 
        this.counter = 0
        
        $("#preloader").show()

        $("body").addClass("section-landing")

        let loaded = 0
        

        this.loader.load('ResExtensa_deSaturated_violet_Lighting_deSaturated_02.glb', (gltf) => {
                $("#preloader").hide()
                if (window.innerWidth < 600) {
                    gltf.scene.scale.set( 0.3, 0.3, 0.3)
                }
                /* addListener(document.querySelector("#landing-section-mouse"), {
                    'mousedown touchstart': (e) => {
                        this.touching = true
                        
                        this.lastX = e.pageX
                        this.lastY = e.pageY
                    },
                    'mousemove capture passive touchmove': (e) => {
                        if (this.touching ) {
                            if (this.el) {
                                const currentX = e.pageX
                                const currentY = e.pageY

                                const diffX = currentX - this.lastX
                                const diffY = currentY - this.lastY

                                if (diffX) {
                                    this.el.rotation.y += diffX/100
                                }

                                if (diffY) {
                                    this.el.rotation.x += diffY/100
                                }

                                

                                this.lastX = e.pageX
                                this.lastY = e.pageY
                            }
                        }
                        
                    },
                    'mouseup touchend': e => {
                        this.touching = false
                        this.lastX = e.pageX
                        this.lastY = e.pageY
                    }
                }) */
                
            this.res = gltf
            
            this.mesh = gltf.scene;
            var box = new THREE.Box3().setFromObject( this.mesh );
            box.center( this.mesh.position ); 
            this.mesh.position.multiplyScalar( - 1 );
    
            this.pivot = new THREE.Group();
            this.pivot.add( this.mesh );
            this.el = this.pivot

            TweenMax.from(this.pivot.rotation, 4, { y: 0.3 })

            this.scene.add( this.pivot );


            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
            
            const pmremGenerator = new THREE.PMREMGenerator( this.renderer );
			pmremGenerator.compileEquirectangularShader();

        
        }, undefined, function ( error ) {
            console.error( error );
        
        } );
        
        
        document.body.appendChild( this.renderer.domElement );
        this.animate.bind(this)()
        

        
        //this.scene.add( this.ambient );

        
        
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        this.camera.updateProjectionMatrix();
        this.idAnimationFrame = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render( this.scene, this.camera );
     
    }

    destroy() {
        $("body").removeClass("section-landing")
        $("nav").removeClass("landing")
        cancelAnimationFrame(this.idAnimationFrame)
        this.renderer.renderLists.dispose()
        $("canvas").remove()
        this.scene = null
        this.camera = null
        this.renderer = null
        
    }
}