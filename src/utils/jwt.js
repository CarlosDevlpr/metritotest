import jwt from 'jsonwebtoken'
import { isNil, propOr } from 'ramda'
import { userModel } from '../models/user.js'

export const createJWT = (user, expiresIn = 48000) => {
    return jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET || '', {
        expiresIn
    }) 
}

export const verifyJWT = (req, res, next) => {
    const token = propOr(null, 'x-access-token')(req.headers)
    if (isNil(token)) return res.status(401).json({message: 'NO TOKEN PROVIDED'})
    
    jwt.verify(token, process.env.JWT_SECRET || '', async (err, decoded) => {
        if(err) return res.status(500).json({message: 'FAILED TO AUTHENTICATE'})
        if(!decoded?.id) return res.status(500).json({message: 'FAILED TO AUTHENTICE'})
        const currentUser = await userModel.findById(decoded?.id)
        res.locals.currentUser = currentUser
        next()
    })
}