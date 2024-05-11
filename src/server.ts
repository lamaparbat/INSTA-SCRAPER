require("dotenv").config();

import app from "./app";
import initConnections from "./shared/bootstrap";
import initInstaTagsScrapCron from "./modules/insta/utils/cron";

initConnections().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log("Server listening on port " + process.env.PORT);
        initInstaTagsScrapCron();
    });
});


