import cors from "cors";
import express from "express";
import instaRouter from "./modules/insta/routes";
import mediaRouter from "./modules/media/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use([instaRouter, mediaRouter]);
app.get("/", (req, res) => res.send("Hello there! from insta scraper."));


export default app;
