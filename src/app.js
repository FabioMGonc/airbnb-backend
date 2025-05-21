import express from "express";
import "dotenv/config";
import { conectDB } from "./config/db.js";

const { PORT } = process.env;
const app = express();

app.listen(PORT, () => {
    console.log(`Server is runnig at ${PORT}`)
})