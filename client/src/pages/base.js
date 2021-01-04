import $ from 'jquery'

export class Base {
    constructor(router, pageSlug, url) {
        $("#preloader").show()
        this.router = router
        require(`../styles/${pageSlug}.css`);
        const template = require(`../templates/${pageSlug}.hbs`);
        
        if (url) {
            fetch(url)
                .then(res => res.json())
                .then(content => {
                    let data = content
                    
                    if (this.mapData) data = this.mapData(data)
                    this.data = data
                    $('#section').html(template(data))
                    if (this.show) this.show()
                    window.scrollTo(0, 0)
                    this.bindLinks()
                    $("#preloader").hide()
                })
                return
        }

        $('#section').html(template())

        this.bindLinks()

        if (this.show) this.show()
        window.scrollTo(0, 0)
        $("#preloader").hide()
    }

    bindLinks() {
        $('#section a').on('click', (event) => {
            event.preventDefault()
            this.router.navigate($(event.target).attr("href"), true)
            return false
        })
    }
}