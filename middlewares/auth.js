import jwt from 'jsonwebtoken'

export const auth = async (req, res, next) => {
    try {
        const bearer = req.headers.authorization
        if (!bearer) return res.status(403).json({ message: "access denied" })

        const [, token] = bearer.split(" ")
        if (!token) return res.status(400).json({ message: "token is not provided" })

        const payload = jwt.verify(token, process.env.JWT_SECERT)
        req.user = payload
        next()
    } catch (error) {
        res.status(500).json({ message: error.message, error })
    }
}