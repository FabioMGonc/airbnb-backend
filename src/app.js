import express from "express";
import "dotenv/config";
import cors from "cors"
import UserRoutes from "../src/routes/routes.js"


const { PORT } = process.env;
const app = express();

app.use(express.json())
app.use(cors())
app.use("/users",UserRoutes)

app.listen(PORT, () => {
    console.log(`Server is runnig at ${PORT}`)
})