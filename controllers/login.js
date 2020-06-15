//Kirjautumista varten endpoint
const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


loginRouter.post('/', async ( request, response) => {
    const body = request.body

    const user = await User.findOne({ username: body.username })

    //Tarkista salasana ja palauta boolean arvo true, jos salasana on oikein
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)
    
    if(!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    //Luodaan token kirjautumista varten. Käytetään Json Web Tokenia.
    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })

})

module.exports = loginRouter