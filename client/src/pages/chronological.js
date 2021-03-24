import { Base } from './base'
import $ from 'jquery'
export class Chronological extends Base{

    constructor(router) {
        super(
            router,
            'chronological',
            '//ee.testeando.website/index.php/content',
        )
        
    }

    mapData(data) {
        return {
            items: data.items.filter(i => i.type !== 'model')
                .map(item => ({
                ...item,
                date: new Date(item.date).toLocaleDateString("en-US")
            }))
        }
    }

    destroy() {
        
    }
}