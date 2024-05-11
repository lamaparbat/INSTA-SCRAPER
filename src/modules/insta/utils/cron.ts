import cron from "node-cron";
import { scrapeAndInsertLatestTaggedPosts } from "../services";

const initInstaTagsScrapCron = () => {
    const interval = "0 */12 * * *";

    cron.schedule(interval, async () => {
        console.log('Scraping initialized...');
        await scrapeAndInsertLatestTaggedPosts();
        console.log('Scraping completed!!');
    });
}

export default initInstaTagsScrapCron;