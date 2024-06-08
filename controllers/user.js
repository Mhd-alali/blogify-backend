import User from "../models/user.js"
import Blog from "../models/blog.js"

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ message: `User with ID ${req.params.id} does not exist` })
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const getUserBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ userId: req.params.id })
        res.status(200).json({ blogs })
    } catch (error) {
        res.status(500).json({ error })
    }
}