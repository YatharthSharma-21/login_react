import mongoose from 'mongoose';
const user_details = mongoose.Schema({
    name : String,
    password: String,
    email: String,
    image: String,
    date: { type: Date, default: Date.now },
})

export default mongoose.model("user_details",user_details);