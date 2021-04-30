import $ from 'jquery'

export function createNavigation(router) {
    $("nav a").on('click', function() {
        if (window.currentPage = 'Random' && window.page.reRandom && $(this).attr("href") === '/') {
            window.page.reRandom()
        }
        router.navigate($(this).attr("href"), true)
        return false
    })
}