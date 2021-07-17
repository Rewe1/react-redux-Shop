import express from 'express'
const router = express.Router()

import post from './post'
import fetch from './fetch'

router.use('/fetch', fetch)
router.use('/post', post)

export default router