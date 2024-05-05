import cors from "cors";
import express from "express";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
    res.send("Hello there! from insta scraper.");
});


export default app;
