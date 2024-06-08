import mongoose from "mongoose";

const TagSchema = mongoose.Schema({
    label: { type: String, required: true, min: 2, max: 255 },
    value: { type: String, required: true, min: 2, max: 255 },
})

const Tag = mongoose.model("Tag", TagSchema)

export default Tag