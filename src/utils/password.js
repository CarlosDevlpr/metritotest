import crypto from 'crypto'

export const hashPassword = (password) => crypto.createHash('sha256').update(password.trim(), 'utf8').digest('hex')