import * as THREE from 'three';
import { arrayDivider } from '../utils/array'
import list from '../mock/random'
import { SpaceGroup } from '../components/space/group'
import { loadAssets } from '../components/space/assets-loader'
import { Base } from './base'
import { UserControl, MOVE } from '../components/space/user-control'
import { VerticalDirection, HorizontalDirection } from '../components/space/user-control'

export class Random extends Base{
    constructor(){
        super('random')
        this.show() 
    }

    show() {
        this.userControl = new UserControl()
        const areas =  arrayDivider(list, 1)
        this.renderer = new THREE.WebGLRenderer({alpha: true });
        
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.scene = new THREE.Scene();
        this.ambient = new THREE.AmbientLight( 0xffffff );
        
        this.counter = 0

        document.body.appendChild( this.renderer.domElement );

        loadAssets().then(() => {
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
        })   
    }

    move(coor) {
        this.coor = coor
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