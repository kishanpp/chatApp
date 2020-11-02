const jwt = require('jsonwebtoken')

const jwtkey = 'my_secret_key'
const jwtExpirySeconds = 3000000

module.exports = {jwt, jwtkey, jwtExpirySeconds}