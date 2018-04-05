const API = require('./util')

module.exports = {
    jwtSecret: API.TOKEN_KEY,
    jwtSession: {
        session: false
    }
}