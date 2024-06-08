import { Router } from "express";

import { auth } from './middlewares/auth.js'
import { login } from './controllers/auth.js'
import { getUser, getUserBlogs } from './controllers/user.js'
import { getFeedBlogs, getBlog, deleteBlog, getBlogByTag } from './controllers/blog.js'
import { getTags } from './controllers/tag.js'

const router = Router()

// auth
router.post('/auth/login', login)

//user
router.get('/user/:id', getUser)
router.get('/user/:id/blog', getUserBlogs)

//tag
router.get('/tag', getTags)

//blog
router.get('/blog', getFeedBlogs)
router.get('/blog/:id', getBlog)
router.post('/blog/tag', getBlogByTag)
router.delete('/blog/:id', auth, deleteBlog)


export default router