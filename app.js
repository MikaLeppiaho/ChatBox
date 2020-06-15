const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const messagesRouter = require('./controllers/messages')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const cors = require('cors')


//Yhdistä MongoDB
getConnection = async () =>  {
    try{
        await mongoose.connect(config.MONGODB_URI, { useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology: true})
        console.log(`Connection to database succesfull`)
    } catch (err) {
        console.log(`Connection to database failed ${config.MONGODB_URI}`)
    }
}
getConnection()

app.use(cors())
app.use(express.json())
app.use('/api/messages', messagesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app