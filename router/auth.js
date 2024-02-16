const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config')

router.post('/login' , async(req , res) => {
    const {username , password} = req.body
    if(!username || !password)
    return res.status(400).json({
        status: false,
        message: "Ma'lumot to'lq emas"
    })
    const user = await User.findOne({username})

    if(!user)
        return res.status(400).json({
            status: false,
            message: "Parol yoki Username xato"
        });

    const validPassword = await bcrypt.compare(password , user.password)
    if(!validPassword)
        return res.status(400).json({
            status: false,
            message: "Parol yoki Username xato"
        });
    const token = jwt.sign({user: user._id} , config.get('tokenPrivateKey'), {expiresIn: '30d'})
    res.json({ 
        status: true,
        message: "Foidalanuvchi profilga kirdi",
        token: token
    })
})






module.exports = router