import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

//Bucket Config
const app = express()
dotenv.config()
app.use('/media/', express.static('media'))
app.use('/profile_images/', express.static('profile_images'))
app.use('/frontend/', express.static('frontend'))
app.use(express.json({ limit: '50mb', extended: 'true' }))
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: 'true',
    parameterLimit: 1000000
  })
)

app.use(cors())
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('/', (req, res) => res.send('Twigs Bucket Connected'))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log('bucket Connected')
})

console.log(__dirname)

//FIREBASE CONFIG

//Router imports
import MediaRoute from './Routes/Media-Route.js'
import ProfileImageRoute from './Routes/Profile-Media-Route.js'

//Route Configs
app.use('/post_media', MediaRoute)
app.use('/profile_image_media', ProfileImageRoute)
