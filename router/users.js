const express = require('express');
const router = express.Router();
const {User} = require('../models/user')
const bcrypt = require('bcrypt');
const auth = require('../middleware/tokenVer');

router.post('/create' ,async (req , res) => {
   try {
    const {name , username , password} = req.body;
    if(!name || !username || !password)
        return res.status(400).json({
            status: false,
            message: "Ma'lumot to'lq emas"
        })
    const validUser = await User.findOne({username})
    if(validUser)
        return res.status(400).json({
            status: false,
            message: "Bunday username mavjud"
        })
   
    const hashpassword = await bcrypt.hash(password , 10);
    const userData = {
        name,
        username, 
        password: hashpassword
    };
    const user = await User.create(userData)
    res.json({
        status: true,
        message: "Foidalanuvchi ro'yxatdan o'tdi"
    })
   } catch(err) {
    res.status(500).json({
        message: "Serverda muammo mavjud"
    })
   }
})

router.get('/get',auth, async (req , res) => {
    const data = await User.findById({_id: req.user._id})
    .select({password: 0})
    res.json(data)
})

module.exports = router