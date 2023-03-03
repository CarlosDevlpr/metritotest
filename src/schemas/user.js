import mongoose from 'mongoose'
import yup from 'yup'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

export const userSchema = new Schema({
    id: ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

export const registerUserSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required()
})

export const rRegisterUserSchema = yup.object({
    body: registerUserSchema
})

export const loginUserSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required()
})

export const rLoginUserSchema = yup.object({
    body: loginUserSchema
})