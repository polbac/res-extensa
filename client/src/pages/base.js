import $ from 'jquery'

export class Base {
    constructor(pageSlug, url) {
        require(`../styles/${pageSlug}.css`);
        const template = require(`../templates/${pageSlug}.hbs`);
        if (url) {
            fetch(url)
                .then(res => res.json())
                .then(content => {
                    console.log(content)
                    $('#section').html(template(content))
                })
        } else {
            $('#section').html(template())
        }
        
    }
}