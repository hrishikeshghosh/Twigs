import axios from 'axios'
const BucketApi = axios.create({
  baseURL: 'https://twigs-bucket.herokuapp.com'
})
export default BucketApi
