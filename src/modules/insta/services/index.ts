import puppeteer from 'puppeteer';
import InstaTagsModel from '../models';
import { INSTA_BASE_URL } from '../../../config';
import { IMAGE_EXTENTSIONS } from '../../../shared/constants';
import path from 'path';
import axios from 'axios';
import { writeFileSync } from 'fs';


const getTaggedPosts = async ({ instaId }: { instaId: string }) => {
    try {
        if (!instaId) return { data: null, error: "Insta User Id is required!" };

        const tagPosts = await InstaTagsModel.find({ userId: instaId });

        return { data: tagPosts ?? [], error: null };
    } catch (error: any) {
        console.error(error);
        return { data: null, error: error?.message };
    }
}

const scrapeAndInsertLatestTaggedPosts = async () => {
    try {
        const instaId = process.env.INSTA_TAGGED_USER_ID;

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


        const payload: any[] = [];

        const fileBuffer = taggedPostUrls?.map(async (d: any, i: number) => {
            const url = d?.url;
            const extension = IMAGE_EXTENTSIONS.find(extension => url.includes(extension));

            const filename = `${instaId}${Date.now()}.${extension}`;
            payload[i] = { instaUrl: d?.url, filename, link: d?.link, url: `${process.env.BASE_URL}media/${filename}`, userId: instaId };

            return await axios.get(url, { responseType: 'arraybuffer' });
        });

        const allBUffer = await Promise.all(fileBuffer);


        allBUffer.forEach((buffer, i) => {
            if (!buffer?.data) return;
            const { filename } = payload?.[i];
            let filePath = __dirname?.split("src")?.[0] + "assets/uploads";
            filePath = path.join(filePath, filename);
            writeFileSync(filePath, buffer?.data);
        })

        console.log(allBUffer?.[0]?.data, payload)

        if (payload?.length > 0) await InstaTagsModel.create(payload);

        await page.close();
        return { data: taggedPostUrls ?? [], error: null };
    } catch (error: any) {
        console.error(error);
        return { data: null, error: error?.message };
    }
}

export {
    getTaggedPosts,
    scrapeAndInsertLatestTaggedPosts,
}