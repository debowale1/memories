import express from 'express'
import { getPost, createPost } from '../controllers/postCtrl.js'

const router = express.Router()
router.get('/', getPost)
router.post('/', createPost)

export default router