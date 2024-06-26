require("dotenv").config();

import app from "./src/app";
import initConnections from "./src/shared/bootstrap";

initConnections().then(() => {
    console.log(process.env.NODE_ENV, process.env.PORT)
    app.listen(process.env.PORT || 8000, () => {
        console.log("Server listening on port " + process.env.PORT);
    });
});


