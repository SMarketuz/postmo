const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {Posts} = require('../models/postImage');
// const auth = require('../middleware/tokenVer');

const storage = multer.diskStorage({
    destination:(req , file , cb) => {
        cb(null , './public/images')
    },
    filename: (res , file , cb) => {
        cb(null , file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})
router.post('/create', upload.single('file'),async (req , res) => {
   try {
    const {name , username , password} = req.body;
    const posts = await Posts.create({
        title: req.body.title,
        image: req.file.filename,
        desc: req.body.desc,
        user: req.user
    })
    res.json(posts)

   } catch(err) {
    res.status(500).json({
        message: "Serverda muammo mavjud"
    })
   }
})
 

router.get('/get/all' ,async (req , res) => {
    const posts = await Posts.find()
    .populate('user' ,'-password')
    res.json({data: posts})
})

router.get('/get' ,async (req , res) => {
    const posts = await Posts.find({user: req.user})
    .populate('user' ,'-password')
    res.json({data: posts})
})




module.exports = router