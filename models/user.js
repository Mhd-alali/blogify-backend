import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstName: { type: String, required: true, min: 2, max: 255 },
    lastName: { type: String, required: true, min: 2, max: 255 },
    userName: { type: String, required: true, min: 2, max: 255, unique: true },
    description: { type: String },
    email: { type: String, required: true, max: 255, unique: true },
    password: { type: String, required: true, min: 5 },
    picturePath: { type: String, default: '' },
}, {
    timestamps: true
})

const User = mongoose.model("User", UserSchema)

export default User