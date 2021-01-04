import * as THREE from 'three';

const loader = new THREE.FontLoader();


class AssetsLoader {
    constructor() {
        this.assets = {}
    }

    load() {
        return new Promise(resolve => {
            loader.load('Favorit_Pro_Light_Regular.json', font => {
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