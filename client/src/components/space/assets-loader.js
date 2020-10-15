import * as THREE from 'three';

const loader = new THREE.FontLoader();


class AssetsLoader {
    constructor() {
        this.assets = {}
    }

    load() {
        return new Promise(resolve => {
            loader.load('https://raw.githubusercontent.com/rollup/three-jsnext/master/examples/fonts/helvetiker_regular.typeface.json', font => {
                this.assets['font-1'] = font
                resolve()
            });
        })
    }
}

export function loadAssets() {
    getAssetsLoader.prototype.instance = new AssetsLoader();
    return getAssetsLoader.prototype.instance.load()
}

export function getAssetsLoader() {
    if (getAssetsLoader.prototype.instance) {
        return getAssetsLoader.prototype.instance.assets;
    }

    throw new Error('Assets not loaded!')

}