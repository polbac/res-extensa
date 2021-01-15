import { Base } from './base'
import { getLastUrlPath } from '../utils/url'
import { IMAGE_FOLDER, IMAGE_FOLDER_BLOG } from '../config'
export class Sound extends Base{

    constructor(router) {
        super(
            router, 
            'sound',
            `http://ee.testeando.website/index.php/sound?slug=${getLastUrlPath()}`,
            true,
            'sound'
        )
    }

    mapData(data) {
        data.images = data.images.map(image => ({
            ...image,
            col_id_11: image.col_id_11
                .replace('{filedir_8}', IMAGE_FOLDER)
                .replace('{filedir_6}', IMAGE_FOLDER_BLOG)
        }))
        return data
    }

    destroy() {

    }
}