import $ from 'jquery'

import ExtractsManager from '../manager/extracts'

import {shuffle} from '../utils/array'
import {mapIdChannelType} from '../utils/channel'

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

                    const { categories } = content
                    
                    document.querySelector('.entries-nav #arrow-prev').style.display = 'none'
                    document.querySelector('.entries-nav #arrow-next').style.display = 'none'
                
                    
                    Object.keys(categories).forEach(category => {
                        categories[category] = categories[category].filter(post => {
                            return post.url != this.data.slug && post.channel_id !=10
                        })
                    })

                    let posts = []

                    Object.keys(categories).forEach(category => {
                        categories[category].forEach(post => {
                            posts.push(post)
                        })
                    })

                    posts = shuffle(posts)

                    
                    const next = posts[0] || null
                    const prev = posts[1] || null

                    
                    if (next) {
                        document.querySelector('.entries-nav #arrow-next').setAttribute('href', `/${mapIdChannelType(next.channel_id)}/${next.url}`)
                        document.querySelector('.entries-nav #arrow-next').style.display = 'block'
                    }

                    if (prev) {
                        document.querySelector('.entries-nav #arrow-prev').setAttribute('href', `/${mapIdChannelType(prev.channel_id)}/${prev.url}`)
                        document.querySelector('.entries-nav #arrow-prev').style.display = 'block'
                    }

                    
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
        $('#section a').not("[target]").on('click', (event) => {
            event.preventDefault()
            this.router.navigate($(event.target).attr("href"), true)
            return false
        })
    }

    setAddToExtracts() {
        if (this.addToExtract && !ExtractsManager.contains(this.data)) {
            $("#section").append(`
            <div class='add-to-extracts'>
                <img class='extracts-icon' src="/extracts.svg">
                <span>+ add to EXTRACTS</span>
            </div>
            `)
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
            $(document).on("mousemove", e => {
                $m.css({
                    top: e.clientY - $m.height() / 2,
                    left: e.clientX + 10,
                    position: 'fixed',
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

        $("#section h2").on("mouseenter mouseleave", null)
        $(document).on("mousemove", null)
    }
}