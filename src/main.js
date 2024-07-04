import { argv } from 'process'
import { crawlPage, normalizeURL } from './crawl.js'

async function main() {
    if (argv.length !== 3) {
        console.log("Error: Exactly one argument is required\nUsage: 'npm run start {site to begin crawl}'")
    } else {
        console.log(`Crawler is starting with baseURL: {${argv[2]}}`)
    }
    const baseURL = argv[2]
    const pagesCrawled = await crawlPage(baseURL)
    console.log(pagesCrawled)
}

main()