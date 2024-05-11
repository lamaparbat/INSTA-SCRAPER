import puppeteer from 'puppeteer';
import { INSTA_BASE_URL } from '../../../config';

const getTaggedPosts = async ({ instaId }: { instaId: string }) => {
    try {
        if (!instaId) return { data: null, error: "Insta User Id is required!" };

        const instaUsername = process.env.INSTA_USERNAME;
        const instaPassword = process.env.INSTA_PASSWORD;
        const instaTargetUserTagsUrl = `${INSTA_BASE_URL}${instaId}/tagged/`;

        if (!instaUsername || !instaPassword) return { data: null, error: "Username or password are empty!" };

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto(INSTA_BASE_URL, { waitUntil: 'networkidle2' });

        await page.type('input[name="username"]', instaUsername);
        await page.type('input[name="password"]', instaPassword);

        await Promise.all([
            page.waitForNavigation(),
            page.click('button[type="submit"]')
        ]);

        await page.goto(instaTargetUserTagsUrl);
        await page.waitForSelector('section');

        const taggedPostUrls = await page.evaluate(() => {
            const imgGrid = document.querySelectorAll('div[style="display: flex; flex-direction: column; padding-bottom: 0px; padding-top: 0px; position: relative;"]');
            const imgUrls: object[] = [];

            imgGrid.forEach(div => {
                const imgTags = div.querySelectorAll('img');
                const postLinkTag = div.querySelectorAll('a');
                imgTags && imgTags.forEach((img, i) => img?.src && imgUrls.push({ url: img.src, link: postLinkTag?.[i]?.href }));
            });

            return imgUrls?.filter(Boolean) ?? [];
        });

        return { data: taggedPostUrls, error: null };
    } catch (error: any) {
        console.log(error);
        return { data: null, error: error?.message };
    }
}

export {
    getTaggedPosts
}