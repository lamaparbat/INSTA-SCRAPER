# Instagram Tagged Post Scraper

This Instagram Tagged Post Scraper is a powerful tool built with Express, Node.js, and TypeScript, making it efficient and easy to use. Leveraging the headless scraping capabilities of Puppeteer and DOM selectors, this scraper extracts valuable data from Instagram's tagged posts.

## Features

- **Efficient Scraping:** Utilizes Puppeteer for efficient headless scraping.
- **Flexible API:** Allows users to specify the target Instagram user ID as an API parameter.
- **Custom Media Server:** Allows users to render insta tagged photos from our customer server instead of instagram server (Due to restriction and auth issues).
- **Optional MongoDB Integration:** Users can optionally specify a MongoDB URL in .env of project to store fetched data directly into a MongoDB database.

## API Usage

### Request

`GET /insta/tags?instaId=lamaDev`

### Parameters

- `instaId`: The target Instagram user ID whose tagged posts you want to scrape.

### Response

The response will be an array of objects, each containing the URL and link of the scraped images:

```json
[
  { "url": "https://instagram.com/acaks..", "link": "post_link_1" },
  { "url": "https://instagram.com/acaks..", "link": "post_link_2" },
  ...
]
