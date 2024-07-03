import { JSDOM } from 'jsdom'

function normalizeURL(url) {
    const URLobj = new URL(url)
    url = `${URLobj.host}${URLobj.pathname}`
    if (url.slice(-1) === '/') {
        url = url.slice(0, -1)
    }
    return url
}

function getURLsFromHTML(html, url) {
    const JSDOMobj = new JSDOM(html)
    let anchors = Array.from(JSDOMobj.window.document.querySelectorAll('a')).map(anchor => normalizeURL(new URL(anchor.href, url).toString()))
    return anchors
}


export { normalizeURL, getURLsFromHTML };