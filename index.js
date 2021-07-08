const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const connection = require('./config/db')

connection();
app.use(bodyParser.json())
app.use(cors())

app.use('/api/user',require('./routes/user'))
app.use('/api/program',require('./routes/program'))
app.use('/api/news',require('./routes/news'))

app.listen(3000, ()=>{
    console.log('Server is running')
})  