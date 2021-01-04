export function getLastUrlPath() {
    return document.location.pathname.split('/').slice(-1).pop()
}