import { Base } from './base'
import { getLastUrlPath } from '../utils/url'
import { IMAGE_FOLDER, IMAGE_FOLDER_BLOG } from '../config'
import moment from 'moment'

export class Video extends Base{

    constructor(router) {
        super(
            router, 
            'video',
            `//res-extensa.com/index.php/video?slug=${getLastUrlPath()}`,
            true,
            'video'
        )
    }

    mapData(data) {
        data.video = data.video
                .replace('{filedir_5}', IMAGE_FOLDER)
                .replace('{filedir_6}', IMAGE_FOLDER_BLOG)
        data.date = moment(data.date, 'X').format('L')
        return data
    }

    destroy() {

    }
}