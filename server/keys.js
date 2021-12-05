import dotenv from 'dotenv'
dotenv.config()

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE } = process.env

const keys = {
  MONGO_URI: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@twigs.2fhgh.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`
}

export default keys
