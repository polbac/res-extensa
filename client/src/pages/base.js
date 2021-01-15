import $ from 'jquery'

import ExtractsManager from '../manager/extracts'


export class Base {
    constructor(router, pageSlug, url, addToExtract = false, type) {
        this.type = type
        this.pageSlug = pageSlug
        this.addToExtract = addToExtract
        $("#preloader").show()
        this.router = router
        require(`../styles/${pageSlug}.css`);
        const template = require(`../templates/${pageSlug}.hbs`);
        
        const extracts = ExtractsManager.getExtracts()

        if (url) {
            fetch(url)
                .then(res => res.json())
                .then(content => {
                    let data = content
                    
                    
                    if (this.mapData) data = this.mapData(data)
                    this.data = data
                    $('#section').html(template({
                        ...data,
                        extracts,
                    }))
                    $("#preloader").hide()
                    if (this.show) this.show()
                    window.scrollTo(0, 0)
                    this.bindLinks()
                    this.setAddToExtracts()
                    
                })
                return
        }

        $('#section').html(template({ extracts }))

        this.bindLinks()
        $("#preloader").hide()
        if (this.show) this.show()
        window.scrollTo(0, 0)
        
        this.setAddToExtracts()
    }

    bindLinks() {
        $('#section a').on('click', (event) => {
            event.preventDefault()
            this.router.navigate($(event.target).attr("href"), true)
            return false
        })
    }

    setAddToExtracts() {
        if (this.addToExtract && !ExtractsManager.contains(this.data)) {
            $("#section h2").append("<span class='add-to-extracts'>+ add to EXTRACTS</span>")
            $("#section h2").on("click", this.addExtract.bind(this))
            
            const $m = $(".add-to-extracts")

            $m.css({
                display: "none",
            })

            $("#section h2").on("mouseenter", () => {
                $m.css({
                    display: "block",
                })

            })
            $("#section h2").on("mouseleave", () => {
                $m.css({
                    display: "none",
                })
            })
            $("#section h2").on("mousemove", e => {
                $m.css({
                    top: e.clientY - 20,
                    left: e.clientX - 140,
                    position: 'absolute',
                })
            })
        }
    }

    reRender() {
        const template = require(`../templates/${this.pageSlug}.hbs`);
        const extracts = ExtractsManager.getExtracts()

        $('#section').html(template({ extracts }))
    }
    

    addExtract() {

        ExtractsManager.addExtract({
            ...this.data,
            type: this.type,
        })

        $(".add-to-extracts").remove()

        $("#section h2").on("mouseenter mouseleave mousemove", null)
    }
}