import User from "../models/user.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if (!user) return res.status(401).json({ message: "User does not exist." })

        if (!await bcrypt.compare(password, user.password)) return res.status(401).json({ message: "incorrect password." })

        const token = jwt.sign({ id: user._id, userName: user.userName }, process.env.JWT_SECERT)

        res.json({ token, user })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            userName,
            description,
            email,
            password,
            picturePath
        } = req.body
        const user = new User({
            firstName,
            lastName,
            userName,
            description,
            email,
            password: await bcrypt.hash(password, await bcrypt.genSalt()),
            picturePath
        })

        await user.save()
        res.status(200).json({ user })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}
