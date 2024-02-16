const express = require('express')
const app = express();
const config = require('config')
require('./server/db')()
require('./server/apis')(app)

console.log(process.env.NODE_ENV);
console.log(config.get('production'));

const port = process.env.PORT || 9090;
app.listen(port , () => {
    console.log(`${port} chi port ishga tushdi`);
})