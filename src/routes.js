import { Router } from 'express'
import { validate } from './utils/validate.js'
import { ProductController } from './controllers/product.js'
import { UserController } from './controllers/user.js'
import { rCreateProductSchema, rProductIdSchema, rUpdateProductSchema } from './schemas/products.js'
import { rLoginUserSchema, rRegisterUserSchema } from './schemas/user.js'
import { verifyJWT } from './utils/jwt.js'

export const routes = Router()

const renderController = (controller, method) => async (request, response) => controller(request, response)[method]()

routes.get('/status', (req, res) => {
    return res.status(200).json({"status": "ok"})
})

routes.post('/register', [validate(rRegisterUserSchema)], renderController(UserController, "register"))
routes.post('/login', [validate(rLoginUserSchema)], renderController(UserController, "login"))

routes.post('/products', [validate(rCreateProductSchema), verifyJWT], renderController(ProductController, "create"))

routes.get('/products', [verifyJWT, validate(rCreateProductSchema)], renderController(ProductController, "getAll"))
routes.get('/products/:id', [verifyJWT, validate(rProductIdSchema)], renderController(ProductController, "getById"))
routes.put('/products/:id', [verifyJWT, validate(rUpdateProductSchema)], renderController(ProductController, "updateById"))
routes.delete('/products/:id', [verifyJWT, validate(rProductIdSchema)], renderController(ProductController, "deleteById"))

export default routes