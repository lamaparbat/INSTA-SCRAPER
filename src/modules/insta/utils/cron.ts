import cron from "node-cron";
import { scrapeAndInsertLatestTaggedPosts } from "../services";

const initInstaTagsScrapCron = () => {
    let intervalCount = 0;
    const interval = "0 */12 * * *";

    cron.schedule(interval, async () => {
        if (intervalCount === 1) return;
        intervalCount++;
        console.log('Scraping initialized...');
        await scrapeAndInsertLatestTaggedPosts();
        console.log('Scraping completed!!');
    });
}

export default initInstaTagsScrapCron;