import JWTdecode from 'jwt-decode'

const TOKEN_DECODER = (token) => {
    if (localStorage.getItem('profile')) {
        return JWTdecode(token)
    }
   
}

export default TOKEN_DECODER
