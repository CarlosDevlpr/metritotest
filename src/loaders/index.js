import { startDb } from './mongodb.js'

const Loaders = () => {
    const start = () => {
        return startDb()
    }
}