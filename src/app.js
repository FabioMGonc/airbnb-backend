import express from "express";
import "dotenv/config";
import cors from "cors"
import UserRoutes from "../src/routes/routes.js";
import cookieParser from "cookie-parser";


const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use("/users",UserRoutes)

app.listen(PORT, () => {
    console.log(`Server is runnig at ${PORT}`)
})