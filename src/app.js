import express from "express";
import "dotenv/config";
import { conectDB } from "./config/db.js";
import User from "./models/User.js";

const { PORT } = process.env;
const app = express();

app.get('/users', async (req, res) => {
    conectDB();
    const userDoc = await User.find()
    res.json(userDoc)
})

app.listen(PORT, () => {
    console.log(`Server is runnig at ${PORT}`)
})