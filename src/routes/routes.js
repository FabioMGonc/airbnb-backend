import "dotenv/config"
import { Router } from "express";
import { conectDB } from "../config/db.js";
import User from "../domains/users/model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const bcryptSalt = bcrypt.genSaltSync();
const { JWT_PRIVATE_KEY } = process.env;


router.get('/', async (req, res) => {
    conectDB();

    try {
        const userDoc = await User.find()
        res.json(userDoc)
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/profile', async (req, res) => {
    const { token } = req.cookies;

    if (token) {
        try {
            const userInfo = jwt.verify(token, JWT_PRIVATE_KEY)
            res.json(userInfo)
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.json(null)
    }
    
})

router.post("/", async (req, res) => {
    conectDB();

    const { name, email, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, bcryptSalt)
   
    try {
        const newUserDoc = await User.create({
            name,
            email,
            password: encryptedPassword,
        })

        const { _id } = newUserDoc;
        const newUserObj = { name, email, _id }

        const token = jwt.sign(newUserObj, JWT_PRIVATE_KEY)
        res.cookie("token", token).json(newUserObj)
        
    } catch (error) {
        res.status(500).json(error);
    }
})
router.post("/login", async (req, res) => {
    conectDB();

    const { email, password } = req.body;
    
    try {
        const userDoc = await User.findOne({email});
        const { _id, name} = userDoc;
        
        if (userDoc) {
            const passwordCorrect = bcrypt.compareSync(password, userDoc.password)
           
            if (passwordCorrect) {
                const newUserObj = {_id, name, email}
                const token = jwt.sign(newUserObj, JWT_PRIVATE_KEY)

                res.cookie("token", token).json(newUserObj)
            } else {
                res.status(401).json("Unauthorized - Senha invalida!")
            }
             
        } else {
            res.status(404).json('Usuário nao encontrado')
        }

    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;