import $ from 'jquery'

export function createNavigation(router) {
    $("nav a").on('click', function() {
        console.log($(this).attr("href"))
        router.navigate($(this).attr("href"))
        return false
    })
}