import mongoose from 'mongoose'
import yup from 'yup'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

export const productSchema = new Schema({
    id: ObjectId,
    title: String,
    description: String,
    price: Number
})

const productId = yup.object({
    id: yup.string().required()
})

export const rProductIdSchema = yup.object({
    params: productId
})

const createProductSchema = yup.object({
    title: yup.string().required(),
    description: yup.string(),
    price: yup.string().required()
})

export const rCreateProductSchema = yup.object({
    body: createProductSchema
})

export const updateProductSchema = yup.object({
    title: yup.string(),
    description: yup.string(),
    price: yup.string()
})

export const rUpdateProductSchema = yup.object({
    params: productId,
    body: updateProductSchema
})