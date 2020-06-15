//Skeema viestin mallista tietokantaan

const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date : Date,
    username: {
        type: mongoose.Schema.Types.String,
        ref: 'User'
    }
})

messageSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Message', messageSchema)

