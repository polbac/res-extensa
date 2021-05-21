import { Base } from './base'
import { hexToRgb } from '../utils/color'
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
        $('#chrono-content .project-row').on("mouseover", function() {
            this.style.background = 'linear-gradient('+ hexToRgb($(this).attr('data-color')) + ', rgba(255,255,255,0))'
        })

        $('#chrono-content .project-row').on("mouseleave", function() {
            if (!$(this).hasClass('active')) {
                this.style.background = 'transparent'
            }
        })

        $('#chrono-content .category-name').click(function() {
            const category = $(this).text()
            
            if ($(this).parent().parent().hasClass('active')) {
                $('#chrono-content .project-row').css('background', 'transparent')
                $('#chrono-content .project-row').removeClass('active')    
                return
            }
            $('#chrono-content .project-row').css('background', 'transparent')
            $('#chrono-content .project-row').removeClass('active')
            $('#chrono-content .project-row[data-category="'+category+'"]').each(function(){
                this.classList.add('active')
                this.style.background = 'linear-gradient('+ hexToRgb($(this).attr('data-color')) + ', rgba(255,255,255,0))'
            })
            return false;
        })
    }

    destroy() {
        
    }
}