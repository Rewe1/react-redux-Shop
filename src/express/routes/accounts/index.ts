import express from 'express'
const router = express.Router()

import register from './register'
import login from './login'
import fetch from './fetch'
import edit from './edit'
import deleteAcc from './delete'

router.use('/register', register)
router.use('/login', login)
router.use('/fetch', fetch)
router.use('/edit', edit)
router.use('/delete', deleteAcc)

export default router