import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
  token: { type: String, unique: true },
  createdAt: { type: Date, expires: String, default: Date.now },
});

export default mongoose.model("token", tokenSchema);
