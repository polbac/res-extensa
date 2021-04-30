import { jsPDF } from "jspdf";
import $ from 'jquery'
import { uuidv4 } from './uuid'
import { transformImages, getBase64Image } from './image-base64'
import { ABOUT } from '../config'
import phase from './phase'
import happy from './happy-time'
import favorit from './favorit'
import { strippedString } from './html'
import moment from 'moment'


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

let firstPage = true

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
                        format: [PAGE_WIDTH, PAGE_HEIGHT], 
                        orientation: FORMAT_ORIENTATION
                    });
                    var filename = `extracts-${uuidv4()}.pdf`;
                    
                    loadFonts(doc)
                    
                    for await (const extract of extracts) {
                        await TYPE_STRATEGY_CREATOR[extract.type](doc, extract)
                    }

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
            const dataUrl = getBase64Image(event.currentTarget, 'PNG');
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
    return new Promise(async resolve => {
        let textPage = firstPage ? doc : addPage(doc)
        firstPage = false

        await addLogoHeader(textPage)
        
        let y = MARGIN_TOP

        textPage.setFont("Favorit");    
        textPage.setFontSize(21);    
        textPage.text(extract.date, PAGE_WIDTH / 2, y, {
            align: 'center'
        });

        if (!!extract.rizoma) {
            y += 30
            textPage.setFont("Favorit");    
            textPage.setFontSize(25);    
            textPage.text(`[${extract.rizoma}]`, PAGE_WIDTH / 2, y, {
                align: 'center'
            });

            y += 20
        }

        textPage.setFontSize(31);   
        const title = doc.splitTextToSize(extract.title, PAGE_WIDTH - (MARGIN_HORIZONTAL * 2));
        
        y += 30
        
        textPage.text(title, PAGE_WIDTH / 2, y, {
            align: 'center'
        });

        y += title.length * 24

        textPage.setFont("Phase");    
        textPage.setFontSize(32);    
        textPage.text(extract.author, PAGE_WIDTH / 2, y, {
            align: 'center'
        });

        y += 40

        const { body, images } = extract

        
        textPage.setFont("Happy");    
        textPage.setFontSize(16);  
        const lines = doc.splitTextToSize(strippedString(body), PAGE_WIDTH - (MARGIN_HORIZONTAL * 2));
        
        lines.forEach(line => {
            textPage.setFont("Happy");    
            textPage.setFontSize(16);  
            textPage.text(line, MARGIN_HORIZONTAL, y, {
                align: 'left'
            });
            
           if (y >= PAGE_HEIGHT - 80) {
            textPage = addPage(doc)

            textPage.setFont("Favorit");    
            textPage.setFontSize(17);  
            textPage.text(extract.title, MARGIN_HORIZONTAL, 20);

            textPage.setFont("Phase");    
            textPage.setFontSize(17);    
            textPage.text(extract.author, PAGE_WIDTH - MARGIN_HORIZONTAL, 20, {
                align: 'right'
            });

            y = MARGIN_TOP
           } else {
            y += 15
           }            
        })

        let col1Y = MARGIN_TOP
        let col2Y = MARGIN_TOP
        let currentColum = 1
        const IMAGE_WIDTH = (PAGE_WIDTH - (MARGIN_HORIZONTAL*2) - 10) / 2
        
        const MAX_Y = PAGE_HEIGHT - 20

        textPage = addPage(doc)

        textImageHeader(textPage, extract)

        images.forEach(({ width, height, image, col_id_2 }) => {
            const imageHeight = IMAGE_WIDTH / (width/height)
            const footerLines = doc.splitTextToSize(strippedString(col_id_2), IMAGE_WIDTH);
            const totalBlockHeight = imageHeight + (footerLines.length * 15) + 25
            
            let ix, iy

            if (currentColum === 1) {
                ix = MARGIN_HORIZONTAL
                iy = col1Y
                
                if (iy + totalBlockHeight > MAX_Y) {
                    iy = col2Y
                    currentColum = 2

                    if (iy + totalBlockHeight > MAX_Y) {
                        textPage = addPage(doc)
                        textImageHeader(textPage, extract)
                        currentColum = 1
                        col1Y = MARGIN_TOP
                        col2Y = MARGIN_TOP
                        iy = MARGIN_TOP
                        ix = MARGIN_HORIZONTAL
                    }
                }

            } else {
                ix = PAGE_WIDTH / 2 + 5 
                iy = col2Y

                if (iy + totalBlockHeight > MAX_Y) {
                    iy = col1Y
                    currentColum = 1

                    if (iy + totalBlockHeight > MAX_Y) {
                        textPage = addPage(doc)
                        textImageHeader(textPage, extract)
                        currentColum = 1
                        col1Y = MARGIN_TOP
                        col2Y = MARGIN_TOP
                        iy = MARGIN_TOP
                        ix = MARGIN_HORIZONTAL
                    }
                }
            }

            textPage.addImage(image, getFormat(image), ix, iy, IMAGE_WIDTH, imageHeight)

            iy += imageHeight + 25

            footerLines.forEach(line => {
                textPage.setFont("Favorit");    
                textPage.setFontSize(15);  
                textPage.text(line, ix, iy);
                iy += 15
            })

            iy += 30

            if (currentColum === 1) {
                currentColum = 2
                col1Y = iy
            } else {
                currentColum = 1
                col2Y = iy
            }
           
 
        })



        resolve()
    })

}

function textImageHeader(textPage, extract) {
    textPage.setFont("Favorit");    
    textPage.setFontSize(17);  
    textPage.text(extract.title, MARGIN_HORIZONTAL, 20);

    textPage.setFont("Phase");    
    textPage.setFontSize(17);    
    textPage.text(extract.author, PAGE_WIDTH - MARGIN_HORIZONTAL, 20, {
        align: 'right'
    });
}

function addImage(doc, extract){
    return new Promise(async resolve => {
        let imagePage = firstPage ? doc : addPage(doc)
        firstPage = false
        await addLogoHeader(imagePage)

        let y = MARGIN_TOP
        
        imagePage.setFont("Favorit");    
        imagePage.setFontSize(21);    
        imagePage.text(extract.date, PAGE_WIDTH / 2, y, {
            align: 'center'
        });

        if (!!extract.rizoma) {
            y += 30
            imagePage.setFont("Favorit");    
            imagePage.setFontSize(25);    
            imagePage.text(`[${extract.rizoma}]`, PAGE_WIDTH / 2, y, {
                align: 'center'
            });

            y += 20
        }
   
        imagePage.setFontSize(31);   
        
        const title = doc.splitTextToSize(extract.title, PAGE_WIDTH - (MARGIN_HORIZONTAL * 2));
        
        y += 30
        
        imagePage.text(title, PAGE_WIDTH / 2, y, {
            align: 'center'
        });

        y += title.length * 24

        imagePage.setFont("Phase");    
        imagePage.setFontSize(32);    
        imagePage.text(extract.author, PAGE_WIDTH / 2, y, {
            align: 'center'
        });

        y += 20

        const { image, width, height, col_id_1 : epigraphe } = extract.images[0]
        let imageWidth, imageHeight
        const res = width / height

        if (width > height) {
            imageWidth = PAGE_WIDTH - (MARGIN_HORIZONTAL * 2)
            imageHeight = imageWidth / res
        } else {
            imageHeight = PAGE_HEIGHT - y - 40
            imageWidth = imageHeight * res
        }

        y += 20

        imagePage.addImage(image, getFormat(image), PAGE_WIDTH / 2 - imageWidth / 2, y, imageWidth, imageHeight)

        y += imageHeight + 20

        imagePage.setFont("Favorit");    
        imagePage.setFontSize(10);    

        const ep = doc.splitTextToSize(epigraphe, PAGE_WIDTH - (MARGIN_HORIZONTAL * 2));

        imagePage.text(ep, MARGIN_HORIZONTAL, y);

        resolve()
    })
    
}

async function addPageAbout(doc, about){
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
    aboutPage.text("CONTACT", MARGIN_HORIZONTAL, y);

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
    aboutPage.text("FOUNDERS", MARGIN_HORIZONTAL, y);
}

function addPage(doc) {
    return doc.addPage([PAGE_WIDTH, PAGE_HEIGHT], FORMAT_ORIENTATION)
}

function getFormat(path){
    if (path.indexOf('image/jpeg')) return 'JPEG'
    if (path.indexOf('image/jpg')) return 'JPEG'
    if (path.indexOf('image/png')) return 'PNG'
    if (path.indexOf('image/gif')) return 'GIF'
}