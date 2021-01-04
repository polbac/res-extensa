import { Base } from './base'
import { getLastUrlPath } from '../utils/url'


export class Video extends Base{

    constructor(router) {
        super(
            router, 
            'video',
            `http://ee.testeando.website/index.php/video?slug=${getLastUrlPath()}`)
    }

    destroy() {

    }
}