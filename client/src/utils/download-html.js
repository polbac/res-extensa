import { saveAs } from 'file-saver';
import $ from 'jquery'
import template from '../templates/extracts-html.hbs'
import { uuidv4 } from './uuid'
import { transformImages } from './image-base64'
import { ABOUT } from '../config'


export function downloadHTML(_extracts) {
    $("#preloader").show()
    fetch(ABOUT)
        .then(res => res.text())
        .then(_aboutContent => {
            let aboutContent = _aboutContent.replace(/(\r\n|\n|\r)/gm, "")
            aboutContent = JSON.parse(aboutContent)
            
            transformImages(_extracts)
                .then(extracts => {
                    var content = template({ extracts, aboutContent });
                    var filename = `extracts-${uuidv4()}.html`;

                    var blob = new Blob([content], {
                        type: "text/plain;charset=utf-8"
                    });

                    saveAs(blob, filename);
                    $("#preloader").hide()
                })
        })
    
}

