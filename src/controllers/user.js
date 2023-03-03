import {userModel} from '../models/user.js'
import {createJWT, verifyJWT} from '../utils/jwt.js'
import {hashPassword} from '../utils/password.js'

export const UserController = (req, res) => {
    const register = async () => {
        try{
            const {name, email, password} = req.body
            if (!email.includes('@')) return res.status(400).json({message: "EMAIL NOT VALID"}) 
            const hasUser = await userModel.findOne({email})

            if (hasUser) return res.status(400).json({message: "User With That Email Already Exists"})

            const createdUser = await userModel.create({name, email, password: hashPassword(password)})
            return res.status(200).json(createdUser)
        } catch(err) {
            return res.status(400).json({message: "INTERNAL SERVER ERROR"})
        }
    }

    const login = async () => {
        try{
            const {email, password} = req.body
            const userLogin = await userModel.findOne({email: email, password: hashPassword(password)})
            if (userLogin) return res.status(200).json({ token: createJWT(userLogin) })
            else return res.status(404).json({message: "INVALID CREDENTIALS"})
        } catch(err) {
            return res.status(400).json({message: "INTERNAL SERVER ERROR"})
        }
    }

    return {register, login}
}