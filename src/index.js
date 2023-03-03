import { app } from './app.js'
import { startDb } from './loaders/mongodb.js'
import 'module-alias/register.js';

startDb()
app.listen(3001, () => console.log('Listening'))