import $ from 'jquery'

export function createNavigation(router) {
    $("nav a").on('click', function() {
        router.navigate($(this).attr("href"), true)
        return false
    })
}