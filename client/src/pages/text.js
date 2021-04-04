import { Base } from './base'
import { getLastUrlPath } from '../utils/url'
import { IMAGE_FOLDER, IMAGE_FOLDER_BLOG } from '../config'
import moment from 'moment'
export class Text extends Base{

    constructor(router) {
        super(
            router, 
            'text',
            `//res-extensa.com/index.php/text?slug=${getLastUrlPath()}`,
            true,
            'text'
        )
    }

    mapData(data) {
        data.date = moment(data.date, 'X').format('L'),
        data.images = data.images.map(image => ({
            ...image,
            
            col_id_1: image.col_id_1.replace('{filedir_5}', IMAGE_FOLDER)
                .replace('{filedir_6}', IMAGE_FOLDER_BLOG)
        }))
        return data
    }

    destroy() {

    }
}