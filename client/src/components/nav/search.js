import $ from 'jquery'

import { SEARCH_FETCH } from '../../config'

const $search = $("#search")
const $input = $("#search-input")
const $results = $("#search #results")

export const SearchModule = {
    isSearching: false,
    results: [],
    
    

    showSearch() {
        $results.html(`<a class='result-search-item'>...</a>`)
    },

    showNotResults() {
        $results.html(`<a class='result-search-item'>[UPS! CANT FIND ANYTHING]</a>`)
    },

    show() {
        $input.val('')
        $results.html(``)
        $search.css("display", "flex");
    },

    hide() {
        $search.css("display", "none");
    },

    shouldSearch(searchText) {
        return searchText.length >= 3
    },

    resetSearch() {
        SearchModule.setResults([])
        
    },

    fetchSearch(searchText) {
        SearchModule.showSearch()
        return fetch(`${SEARCH_FETCH}${searchText}`)
    },

    setResults(results) {
        if (results.length === 0) {
            SearchModule.showNotResults()
            return
        }

        SearchModule.results = results
        SearchModule.render()
    },

    renderRow({ title, type, slug }) {
        return `<a class='result-search-item' href="/${type}/${slug}">${title}</a>`
    },

    render() {
        $results.html(SearchModule.results.map(this.renderRow))

        $results.find('a').on('click', function() {
            SearchModule.hide()
            router.navigate($(this).attr("href"), true)
            return false
        })
        
    },

    assertSearch() {
        const searchText = $input.val()

        if (SearchModule.shouldSearch(searchText)) {
            SearchModule.fetchSearch(searchText)
                .then(res => res.json())
                .then(({ items }) => SearchModule.setResults(items))
        }
    }
}

let router

export function createSearch(_router) {
    router = _router

    $("#search-button").on("click", SearchModule.show)
    $input.on("keydown", SearchModule.assertSearch)
    
    $(document).on("click", function(event) { 
        var $target = $(event.target);
        if(!$target.closest('.search-wrapper').length && 
        $('.search-wrapper').is(":visible")) {
            SearchModule.hide()
        }        
      });
}