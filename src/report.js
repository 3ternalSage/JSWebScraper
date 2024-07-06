// Pretty-printer for crawl results
function printReport(pages) {
    console.log("\n--------------- Crawl Report ---------------\n")
    let sortedPages = sortPages(pages)
    for (let i = 0; i < sortedPages.length; i++) {
        console.log(`Found (${sortedPages[i][1]}) internal links to: '${sortedPages[i][0]}'`)
    }
    console.log("\n--------------- End Report ---------------\n")
}

// Sort pages by number of internal links, then by alphabetical order
function sortPages(pages) {
    let arr = Object.entries(pages)
    arr.sort((x, y) => {
        if (x[1] < y[1]) {
            return 1
        } else if (x[1] > y[1]) {
            return -1
        } else {
            return x[0].localeCompare(y[0])
        }
    })
    return arr
}

export { printReport }