import { jsPDF } from "jspdf";
import $ from 'jquery'
import { uuidv4 } from './uuid'
import { transformImages, getBase64Image } from './image-base64'
import { ABOUT } from '../config'
import phase from './phase'
import happy from './happy-time'
import favorit from './favorit'
import { strippedString } from './html'

const RES = 1

const PAGE_WIDTH = 595 * RES
const PAGE_HEIGHT = 841 * RES
const MARGIN_TOP = 100
const MARGIN_BOTTOM = 54
const MARGIN_HORIZONTAL = 23

const FORMAT_PAGE = 'a4'
const FORMAT_ORIENTATION = 'portrait'

const TYPE_STRATEGY_CREATOR = {
    'text': addText,
    'image': addImage,
}

export function downloadPdf(_extracts) {
    $("#preloader").show()

    fetch(ABOUT)
        .then(res => res.text())
        .then(_aboutContent => {
            const filteredExtracts = _extracts.filter(e => e.type === 'image' || e.type === 'text')
            let aboutContent = _aboutContent.replace(/(\r\n|\n|\r)/gm, "")

            aboutContent = JSON.parse(aboutContent)
            
            transformImages(filteredExtracts)
                .then(async extracts => {
                    const doc = new jsPDF({
                        unit: 'px',
                    });
                    var filename = `extracts-${uuidv4()}.pdf`;
                    
                    extracts.forEach(extract => {
                        TYPE_STRATEGY_CREATOR[extract.type](doc, extract)
                    })

                    loadFonts(doc)
                    await addPageAbout(doc, aboutContent)
                    
                    doc.save(filename);
                    $("#preloader").hide()
                })
            })
}

function loadFonts(doc) {
    doc.addFileToVFS("Phase-G 100-0-0.ttf", phase);
    doc.addFont("Phase-G 100-0-0.ttf", "Phase", "normal");

    doc.addFileToVFS("Happy.ttf", happy);
    doc.addFont("Happy.ttf", "Happy", "normal");

    doc.addFileToVFS("Favorit.ttf", favorit);
    doc.addFont("Favorit.ttf", "Favorit", "normal");
}

function addLogoHeader(page){
    return new Promise(resolve => {
        const img = new Image()
        img.setAttribute('crossorigin', 'anonymous')
        img.addEventListener('load', function (event) {
            const dataUrl = getBase64Image(event.currentTarget, console);
            const res = 1254/192
            const width = PAGE_WIDTH / 2
            const height = width / res

            page.addImage(dataUrl, 'PNG', PAGE_WIDTH / 2 - width / 2, 10, width, height)
            resolve()
         });
         img.src = "res-extensa.png"
        
    })
    
}

function addText(doc, extract){
    console.log('text', extract)
}

function addImage(doc, extract){
    console.log('image', extract)
}

async function addPageAbout(doc, about){
    console.log(about)
    const aboutPage = addPage(doc)
    
    await addLogoHeader(aboutPage)
    
    aboutPage.setFont("Phase");    
    aboutPage.setFontSize(32);    
    aboutPage.text(about.title, MARGIN_HORIZONTAL, MARGIN_TOP);

    aboutPage.setFont("Favorit");    
    aboutPage.setFontSize(31);    
    
    const aboutParr = doc.splitTextToSize(about.about_paragraph, PAGE_WIDTH - (MARGIN_HORIZONTAL * 2));
    aboutPage.text(aboutParr, MARGIN_HORIZONTAL, MARGIN_TOP + 50);


    aboutPage.setFont("Happy");    
    aboutPage.setFontSize(16);  

    const contactParraph = about.contact_info
        .split('<br/>')
        .reverse()

    let y = PAGE_HEIGHT - MARGIN_BOTTOM

    contactParraph.map(p => {
        aboutPage.text(strippedString(p), MARGIN_HORIZONTAL, y);    
        y -= 20
    })

    aboutPage.setFont("Phase");    
    aboutPage.setFontSize(25);    
    aboutPage.text(about.contact_title, MARGIN_HORIZONTAL, y);

    y -= 40

    aboutPage.setFont("Happy");    
    aboutPage.setFontSize(16);  

    const foundersParraph = about.founders_info
        .split('<br/>')
        .reverse()
    
    foundersParraph.map(p => {
        aboutPage.text(strippedString(p), MARGIN_HORIZONTAL, y);    
        y -= 20
    })

    aboutPage.setFont("Phase");    
    aboutPage.setFontSize(25);    
    aboutPage.text(about.founders_title, MARGIN_HORIZONTAL, y);
    
}

function addPage(doc) {
    return doc.addPage([PAGE_WIDTH, PAGE_HEIGHT], FORMAT_ORIENTATION)
}