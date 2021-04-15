import { Base } from './base'
import moment from 'moment'
export class Chronological extends Base{

    constructor(router) {
        super(
            router,
            'chronological',
            '//res-extensa.com/index.php/content',
        )
        
    }

    mapData(data) {
        return {
            items: data.items.filter(i => i.type !== 'model')
                .map(item => ({
                ...item,
                date: moment(item.date, 'X').format('MMM Do YY')
            }))
        }
    }

    destroy() {
        
    }
}