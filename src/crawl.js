import { JSDOM } from 'jsdom'


// Normalize URLs to contain only the host and pathname
// Used to recognize duplicates
// Warning: Normalized URLs can't be used for things like fetch()
function normalizeURL(url) {
    const URLobj = new URL(url)
    url = `${URLobj.host}${URLobj.pathname}`
    if (url.slice(-1) === '/') {
        url = url.slice(0, -1)
    }
    return url
}

// Gets all URLs in hrefs in <a> tags from a HTML string
function getURLsFromHTML(html, url) {
    const JSDOMobj = new JSDOM(html)
    let anchors = Array.from(JSDOMobj.window.document.querySelectorAll('a')).map(anchor => new URL(anchor.href, url).toString())
    return anchors
}

// Makes sure both links are not from the same domain
function notSameDomain(one, other) {
    const baseURL = new URL(one)
    const otherURL = new URL(other)
    return baseURL.host !== otherURL.host
}

// Main function
// Recursively crawls within the same domain as the starting URL
// Made for small domains, as it is using recursion
// Is not polite. No delays. Doesn't read robots.txt.
// Do not use in mid-big domains
async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    if (notSameDomain(baseURL, currentURL)) {
        return pages
    }
    
    const normURL = normalizeURL(currentURL)

    if (!pages[normURL]) {
        pages[normURL] = 1
    } else {
        pages[normURL]++
        return pages
    }

    console.log(`Crawling ${currentURL}`)

    let pageHTML
    try {
        pageHTML = await fetchPage(currentURL)
    } catch (err) {
        console.log(`${err.message}`)
        return pages
    }

    if (!pageHTML) {
        return pages
    }

    let pageURLS
    try {
        pageURLS = getURLsFromHTML(pageHTML, currentURL)
    } catch (err) {
        console.log(`${err.message}`)
        return pages
    }
    
    for (let i = 0; i < pageURLS.length; i++) {
        pages = await crawlPage(baseURL, pageURLS[i], pages)
    }
    return pages
}

// Fetch HTML content of the page if possible
async function fetchPage(url) {
    let resp
    try {
        resp = await fetch(url)
    } catch(err) {
        throw new Error(`Network error: ${err.message}`)
    }

    if (resp.status >= 400) {
        throw new Error(`Error: Status code {${resp.status}}: {${resp.statusText}}`)
    }

    if (!resp.headers.get('content-type') || !resp.headers.get('content-type').includes('text/html')) {
        throw new Error(`Error: Returned content type not 'text/html' but '${resp.headers.get('content-type')}'`)
    }
    return await resp.text()
}

export { normalizeURL, getURLsFromHTML, crawlPage };