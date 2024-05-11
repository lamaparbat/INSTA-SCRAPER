import cors from "cors";
import express from "express";
import instaRouter  from "./modules/insta/routes";


const app = express();

app.use(cors());
app.use(express.json());

app.use([instaRouter]);
app.get("/", (req, res) => res.send("Hello there! from insta scraper."));


export default app;
