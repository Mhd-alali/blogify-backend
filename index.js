import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import mongoose, { Model } from 'mongoose'
import morgan from 'morgan'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

import router from './router.js'
import { register } from './controllers/auth.js'
import { createBlog } from './controllers/blog.js'
import { auth } from './middlewares/auth.js'
import Tag from './models/tag.js'
import Blog from './models/blog.js'

/**
 * config
 */
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

app.use(express.json({ limit: '30mb' }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('dev'))
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))


/**
 * file storage
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

app.get('/', (req, res) => {
    res.json({ message: "hello there" })
})


/**
 * routes with files (they should be written here so that it use the upload object)
 */
app.post('/auth/register', upload.single('picture'), register)
app.post('/blog', auth, upload.single('picture'), createBlog)

/**
 * routes without files
 */
app.use('/', router)


/**
 * mongoose and listining
 */
const PORT = process.env.PORT || 5050
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`server is working on http://localhost:${PORT}`))
}).catch((error) => {
    console.log(`did not connect error:${error}`);
})