import { productModel } from '../models/product.js'

export const ProductController = (req, res, next) => {
    const create = async () => {
        const createdProduct = await productModel.create(req.body)
        return res.status(200).json(createdProduct)
    }

    const getAll = async () => {
        const products = await productModel.find()
        return res.status(200).json(products)
    }

    const getById = async () => {
        try{
            const product = await productModel.findById(req.params.id)
            if(!product) return res.status(404).json({ message: 'Product not found'})
            return res.status(200).json(product)
        }catch(err){
            return res.status(404).json({ message: 'Error Listing Product'})
        }
    }

    const updateById = async () => {
        try{
            const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body)    
            return res.status(200).json(updatedProduct)
        } catch(err){
            return res.status(404).json({ message: 'Error Updating Product'})
        }
    }

    const deleteById = async () => {
        try{
            const deletedProduct = await productModel.findByIdAndDelete(req.params.id)
            return res.status(200).json(deletedProduct)
        } catch(err){
            return res.status(404).json({ message: "Error Destroying Product" })
        }
    }

    return {create, getAll, getById, updateById, deleteById}
}