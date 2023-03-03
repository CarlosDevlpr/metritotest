import mongoose from 'mongoose'
import { productSchema } from '../schemas/products.js'

export const productModel = mongoose.model('products', productSchema)