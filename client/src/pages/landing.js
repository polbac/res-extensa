import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
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
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
        this.camera.position.set( 0, 0, 15 );

        
        this.scene = new THREE.Scene();
        this.light = new THREE.DirectionalLight( 0xffffff, 1, 100);
        this.light.position.set( 0, 1, 10 ); //default; light shining from top
        this.light.castShadow = true
        this.ambient = new THREE.AmbientLight( 0xffffff );

        this.ambient.position.z = -1000
        
        this.loader = new OBJLoader();
        this.counter = 0
        
        $("#preloader").show()

        $("body").addClass("section-landing")

        

        this.loader.load('res-extensa.obj', (object) => {
            object.traverse( (child) => {
                
                child.material =  new THREE.MeshStandardMaterial( { 
                    color: 0xffffff
                } );
                child.position.z = 0
                child.position.x = 0
                child.position.y = 0
                this.el = child
                
                if (this.el.geometry) {
                    this.el.geometry.center()
                }

                this.el.rotation.y = 0.2

                this.el.castShadow = true; //default is false
                this.el.receiveShadow = true; //default
                
                //TweenMax.from(this.el.position, 2, { z: -10 })
                TweenMax.from(this.el.rotation, 2, { y: -1 })
                TweenMax.from(this.el.material, 2, { opacity: 0 })
                
                
                addListener(document.querySelector("#landing-section-mouse"), {
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
                })
                

            });
            this.res = object
            this.scene.add( this.res );
            //this.camera.lookAt(this.scene.position);
            $("#preloader").hide()
        
        }, undefined, function ( error ) {
            console.error( error );
        
        } );
        
        
        document.body.appendChild( this.renderer.domElement );
        this.animate.bind(this)()
        this.scene.add( this.light );
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