import $ from 'jquery'


export class Base {
    constructor(pageSlug) {
        require(`../styles/${pageSlug}.css`);
        const template = require(`../templates/${pageSlug}.hbs`);
        $('#section').html(template)
    }
}