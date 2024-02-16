const jwt = require('jsonwebtoken')
const {User} = require('../models/user')
const config = require('config')

const auth = async (req , res , next) => {
    const token = req.header('token')

    try {
        if(!token)
            return res.status(401).json({
            status: false,
            message: "To'ken bo'lmaganligi sababli so'ro'v to'htatildi"
        })
        const decoded = jwt.verify(token ,config.get('tokenPrivateKey'))
        const user = await User.findById(decoded.user)
        req.user = user
        next()

    }catch(err) {
        return res.status(400).json({
            status: false,
            message: "Yaroqsiz bo'lgan token"
        })
    }
}

module.exports = auth