import { saveAs } from 'file-saver';
import $ from 'jquery'
import template from '../templates/extracts-html.hbs'
import { uuidv4 } from './uuid'
import { transformImages } from './image-base64'


export function downloadHTML(_extracts) {
    $("#preloader").show()
    transformImages(_extracts)
        .then(extracts => {
            var content = template({ extracts });
            var filename = `extracts-${uuidv4()}.html`;

            var blob = new Blob([content], {
                type: "text/plain;charset=utf-8"
            });

            saveAs(blob, filename);
            $("#preloader").hide()
        })
}

