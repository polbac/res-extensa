import { Base } from './base'
import moment from 'moment'
import $ from 'jquery'
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

    show() {
        $('#chrono-content .category-name').click(function() {
            const category = $(this).text()
            $('#chrono-content .project-row').removeClass('active')
            $('#chrono-content .project-row[data-category="'+category+'"]').addClass('active')
            return false;
        })
    }

    destroy() {
        
    }
}