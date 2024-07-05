import { argv } from 'process'
import { crawlPage } from './crawl.js'
import { printReport } from './report.js'

async function main() {
    if (argv.length !== 3) {
        console.log("Error: Exactly one argument is required\nUsage: 'npm run start {site to crawl}'")
    } else {
        console.log(`Crawler is starting with baseURL: {${argv[2]}}`)
    }
    const baseURL = argv[2]
    const pagesCrawled = await crawlPage(baseURL)
    printReport(pagesCrawled)
}

main()