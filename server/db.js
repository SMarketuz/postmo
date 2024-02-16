const mongoose = require('mongoose')
module.exports =  function () {
    mongoose.connect('mongodb://127.0.0.1:27017/postmo')
    .then(() => {
        console.log('Mongo ishladi');
    }).catch((err) => {
        console.log('Mongoda hatolik bor', err);
    })
}