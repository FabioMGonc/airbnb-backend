import { Router } from "express";
import { conectDB } from "../config/db.js";
import User from "../domains/users/model.js"
import bcrypt from "bcryptjs";

const router = Router();
const bcryptSalt = bcrypt.genSaltSync();


router.get('/', async (req, res) => {
    conectDB();

    try {
        const userDoc = await User.find()
        res.json(userDoc)
    } catch (error) {
        res.status(500).json(error);
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
        res.json(newUserDoc);
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
            passwordCorrect ? res.json({_id, name, email}) : res.status(401).json("Unauthorized - Senha invalida!")
        } else {
            res.status(404).json('Usuário nao encontrado')
        }

    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;