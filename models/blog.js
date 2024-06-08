import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
    title: { type: String, required: true },
    userName: { type: String, required: true, min: 2, max: 255 },
    userId: { type: String, required: true },
    blogPicturePath: { type: String, default: '' },
    tags: { type: Array, default: [] },
    body: { type: String, required: true },
    minutes: Number
}, { timestamps: true })

// to calculate how many minutes it needs for a user to read
BlogSchema.pre('save', function (next) {
    this.minutes = Math.ceil(this.body.split(" ").length / 200)
    next()
})

const Blog = mongoose.model('Blog', BlogSchema)

export default Blog