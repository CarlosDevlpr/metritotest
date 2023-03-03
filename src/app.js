import express from 'express'
import {routes} from './routes.js'
import dotenv from 'dotenv'

import moduleAlias from 'module-alias';
moduleAlias();

dotenv.config()

export const app = express()
app.use(express.json())
app.use(routes)