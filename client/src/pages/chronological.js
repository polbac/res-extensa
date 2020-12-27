import { Base } from './base'

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
            items: data.items.map(item => ({
                ...item,
                date: new Date(item.date).toLocaleDateString("en-US")
            }))
        }
    }

    destroy() {

    }
}