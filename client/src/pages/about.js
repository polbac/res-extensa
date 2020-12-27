import { Base } from './base'

export class About extends Base{

    constructor(router) {
        super(
            router,
            'about',
            '//ee.testeando.website/index.php/about'
        )

        
    }

    destroy() {

    }
}