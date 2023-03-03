import mongoose from 'mongoose'

export const startDb = async () => {
    await mongoose.connect(`${process.env.MONGO_URL}`)
}