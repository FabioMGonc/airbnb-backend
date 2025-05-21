import "dotenv/config";
import mongoose from "mongoose";

const { MONGO_URL } = process.env;
export const conectDB = async() => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log ('Banco conectado')    
    } catch (error) {
        console.log(`Banco não conectou devido ao erro ${error}`)
    }
}
