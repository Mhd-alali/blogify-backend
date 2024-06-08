import Tag from '../models/tag.js'

export const getTags = async (req, res) => {
    try {
        const tags = await Tag.find({})
        res.status(200).json({ tags })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}