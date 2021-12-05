import jwt from 'jsonwebtoken'

const AuthWare = async (req, res, next) => {
  let decodedData
  try {
    const token = req.headers.authorization.split(' ')[1]
    const isInAppAuth = token.length < 500

    if (token && isInAppAuth) {
      decodedData =await jwt.verify(token, 'twigs')
      req.userId = decodedData?.id
    }
    next()
  } catch (error) {
    console.log(error)
  }
}

export default AuthWare
