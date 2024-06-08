import Blog from "../models/blog.js"


export const getFeedBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: 'desc' }).limit(10)
        res.status(200).json({ blogs })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        res.status(200).json({ blog })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const createBlog = async (req, res) => {
    try {
        const {
            title,
            blogPicturePath,
            tags,
            body
        } = req.body

        const blog = new Blog({
            title,
            userName: req.user.userName,
            userId: req.user.id,
            blogPicturePath,
            tags,
            body
        })

        await blog.save()
        res.status(200).json({ blog })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.deleteOne({
            _id: req.params.id,
            userId: req.user.id
        })
        res.status(200).json({ blog })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const getBlogByTag = async (req, res) => {
    try {
        const { tags } = req.body
        const blogs = await Blog.find({ tags: { $all: tags } }).sort({ createdAt: 'desc' }).limit(10)
        res.status(200).json({ blogs })
    } catch (error) {
        res.status(500).json({ error })
    }
}