import { Base } from './base'
import $ from 'jquery'
import ExtractsManager from '../manager/extracts'
import { validateEmail } from '../utils/email'
import { SAVE_EMAIL } from '../config'
import { downloadHTML } from '../utils/download-html'
export class Extracts extends Base{

    constructor(router) {
        super(router, 'extracts')

        $(".delete-button").on("click", (event) => {
            this.deleteExtract.call(this, event.target)
        })

        $("#download").on("click", this.submitAndDownload.bind(this))
    }

    submitAndDownload() {
        $(".errors").html("")
        const email = $("#email").val()
        const validations = {
            email: validateEmail(email),
            conditions: $("#conditions").prop('checked'),
        }

        const errors = []

        if (!validations.email) {
            errors.push("<p>Please complete your email")
        }

        if (!validations.conditions) {
            errors.push("<p>Please accept conditions")
        }
        
        $(".errors").html(errors.join(""))

        if (errors.length === 0) {
            this.subscribeEmail(email)
        }
    }

    subscribeEmail(email) {
        /* fetch(`${SAVE_EMAIL}${email}&t=${new Date()}`)
            .then(res => console.log(res)) */
        this.download()
    }

    download() {
        const format = $(".download-format[checked]").val()
        const extracts = ExtractsManager.getExtracts()
        
        if (format === "html") {
            downloadHTML(extracts)
        }
    }

    

    deleteExtract(item) {
        ExtractsManager.remove(item.getAttribute('slug'))
        this.reRender()

        $(".delete-button").on("click", (event) => {
            this.deleteExtract.call(this, event.target)
        })
    }

    destroy() {

    }
}