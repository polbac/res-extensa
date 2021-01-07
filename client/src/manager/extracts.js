const KEY_EXTRACTS = 'extracts'

class Extracts{
    constructor() {
        this.extracts = []

        const localStorageExtracts = localStorage.getItem(KEY_EXTRACTS)
        
        if (localStorageExtracts) {
            this.extracts = JSON.parse(localStorageExtracts)
        }

        console.log('this.extracts', this.extracts)
    }

    getExtracts() {
        return this.extracts
    }

    saveExtracts() {
        localStorage.setItem(KEY_EXTRACTS, JSON.stringify(this.extracts))
        console.log('this.extracts', this.extracts)
    }

    addExtract(content) {
        if (this.extracts.find(e => e.slug === content.slug)) {
            return
        }

        this.extracts.push(content)
        this.saveExtracts()
    }

    contains(content) {
        if (this.extracts.find(e => e.slug === content.slug)) {
            return true
        }

        return false
    }

    remove(slug) {
        this.extracts = this.extracts.filter(e => e.slug !== slug)
        this.saveExtracts()
    }
}

export default new Extracts()