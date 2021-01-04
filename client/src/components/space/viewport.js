export default class Viewport {
    getSize() {
        const win = window,
            doc = document,
            docElem = doc.documentElement,
            body = doc.getElementsByTagName('body')[0],
            width = win.innerWidth || docElem.clientWidth || body.clientWidth,
            height = win.innerHeight|| docElem.clientHeight|| body.clientHeight

        return {
            width,
            height,
        }
    }
}