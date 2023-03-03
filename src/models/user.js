import { userSchema } from "../schemas/user.js";
import mongoose from 'mongoose'

export const userModel = mongoose.model('users', userSchema)