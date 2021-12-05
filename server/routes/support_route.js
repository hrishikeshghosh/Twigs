import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const {
  SERVER_URL,
  EMAIL_API,
  EMAIL_SERVICE_ID,
  EMAIL_TEMPLATE_ID,
  EMAIL_USER_ID
} = process.env

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    res.status(200).json({
      server_url: SERVER_URL,
      email_api: EMAIL_API,
      email_service_ID: EMAIL_SERVICE_ID,
      email_template_id: EMAIL_TEMPLATE_ID,
      email_user_id: EMAIL_USER_ID
    })
  } catch (error) {
    console.log(error)
  }
})

export default router
