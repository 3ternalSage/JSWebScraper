import { test, expect } from "@jest/globals";
import { readFileSync } from 'fs'
import { normalizeURL, getURLsFromHTML } from "../src/crawl.js";

test('https://blog.boot.dev/path/ to blog.boot.dev/path', () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
});

test('https://blog.boot.dev/path to blog.boot.dev/path', () => {
    expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path")
});

test('http://blog.boot.dev/path/ to blog.boot.dev/path', () => {
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
});

test('http://blog.boot.dev/path to blog.boot.dev/path', () => {
    expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path")
});

test('Capitals in host', () => {
    expect(normalizeURL("http://BloG.BoOt.dEV/path")).toBe("blog.boot.dev/path")
});

test('Test getting links from HTML', () => {
    const htmltext = readFileSync('./tests/example.html', 'utf8')
    expect(getURLsFromHTML(htmltext, 'https://example.com')).toStrictEqual([
        'example.com/home', 'example.com/about', 'example.com/contact', 'example.com/link1',
        'example.com/link2', 'example.com/link3', 'twitter.com/example', 'facebook.com/example'
    ])
})