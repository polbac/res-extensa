import { Base } from './base'

export class About extends Base{

    constructor(router) {
        super(
            router,
            'about',
            '//res-extensa.com/index.php/about'
        )

        
    }

    destroy() {

    }
}