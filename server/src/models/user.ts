import mongoose, { Schema } from "mongoose";
import { IUserDocument } from "../types/user";

export const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.models.users || mongoose.model<IUserDocument>("users", userSchema);

export default User;
