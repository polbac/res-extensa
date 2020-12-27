import * as THREE from 'three';
import { arrayDivider, shuffle } from '../utils/array'
import { SpaceGroup } from '../components/space/group'
import { Base } from './base'
import { UserControl, MOVE, MOUSE_MOVE, CLICK } from '../components/space/user-control'
import {TweenMax} from 'gsap'

import $ from 'jquery'
export class Random extends Base{
    constructor(router){
        super(
            router, 
            'random',
            'http://ee.testeando.website/index.php/content',
        )

        this.router = router
        $("nav").addClass("random")
        
    }


    mapData(data) {
        let newData = data.items
        let index = 0
        
        while (newData.length < 10) {
            newData.push(newData[index])
            index++
        }

        return shuffle(newData)
    }

    show() {
        this.currentOver = null
        this.userControl = new UserControl()
        const areas =  arrayDivider(this.data, 1)
        this.renderer = new THREE.WebGLRenderer({alpha: true });
        this.renderer.setClearColor(0xf2f2f2);
        
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.scene = new THREE.Scene();
        this.ambient = new THREE.AmbientLight( 0xffffff );
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2();

        
        this.counter = 0

        document.body.appendChild( this.renderer.domElement );
        

        this.groups = [
            new SpaceGroup(areas[0], this.scene, 0),
            new SpaceGroup(areas[0], this.scene, 1),
        ]
        
        this.groups[0].build()
        this.groups[1].build()
        this.animate.bind(this)()
        
        global.eventEmitter.on(
            MOVE,
            this.move.bind(this)
        )

        global.eventEmitter.on(
            MOUSE_MOVE,
            this.mouseMove.bind(this)
        )

        global.eventEmitter.on(
            CLICK,
            this.click.bind(this)
        )

        TweenMax.set("canvas, video", { opacity: 0 })
        TweenMax.to("canvas", 1, { opacity: 1, delay: 1 })
    }

    move(coor) {
        this.coor = coor
    }

    mouseMove(coor) {
        this.mouse.x = ( coor.x / window.innerWidth ) * 2 - 1;
	    this.mouse.y = - ( coor.y / window.innerHeight ) * 2 + 1;
    }

    click() {
        if(this.currentOver) {
            const { type, slug } = this.currentOver.object._data
            this.router.navigate(`${type}/${slug}`)
        }
    }

    
    animate() {
        if (this.groups){
            this.groups.forEach(group => {
                if (this.coor) group.move(this.coor)
                group.render()
            })
        }
        
        this.camera.updateProjectionMatrix();
        this.idAnimationFrame = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);

        this.raycaster.setFromCamera(this.mouse, this.camera);

        

        if (this.groups) {
            const items = []
            this.groups.forEach(group => {
                group.items.forEach(item => {
                    items.push(item.getItemDetectMouse())
                })
                
            })

            const intersects = this.raycaster.intersectObjects(items);
            
            if (!!intersects.length) {
                document.querySelector('body').style.cursor = 'pointer'
                this.currentOver = intersects[0]
            } else {
                document.querySelector('body').style.cursor = 'initial'
                this.currentOver = null
            }
        }

        
        
    }

    destroy() {
        document.querySelector('body').style.cursor = 'initial'
        cancelAnimationFrame(this.idAnimationFrame)
        this.renderer.renderLists.dispose()
        $("canvas,video").remove()
        this.scene = null
        this.camera = null
        this.renderer = null
        $("nav").removeClass("random")
        
    }

}