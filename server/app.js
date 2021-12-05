import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import firebase from 'firebase'
import { createProxyMiddleware } from 'http-proxy-middleware';

//FILE IMPORTS
import keys from './keys.js'
import feedRoute from './routes/feed_route.js'
import postRoute from './routes/post_router.js'
import authRoute from './routes/auth_router.js'
import profileRoute from './routes/profile_routes.js'
import helpRoute from './routes/helpRoute.js'
import SupportRoute from './routes/support_route.js'

// BACKENED CONFIG
const app = express()
dotenv.config()

app.use('/uploads/', express.static('uploads'))
app.use(express.json({ limit: '30mb', extended: 'true' }))
app.use(express.urlencoded({ limit: '30mb', extended: 'true' }))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Twigs Server is Live!')
})

//INITIALIZING FIREBASE
firebase.initializeApp(keys.firebaseConfig)

//DATABASE SETUP

const PORT = process.env.PORT || 5000

mongoose
  .connect(keys.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server Connected')
      console.log('Database Connected')
    })
  })
  .catch(err => console.log(err))

//ROUTES SETUP
app.use('/feed', feedRoute)
app.use('/posts', postRoute)
app.use('/auth', authRoute)
app.use('/profile', profileRoute)
app.use('/help', helpRoute)
app.use('/support', SupportRoute)
