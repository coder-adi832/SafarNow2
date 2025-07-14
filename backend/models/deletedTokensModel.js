const mongoose = require('mongoose')

const deletedTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true,
        unique: true,
    },
    created : {
        type: Date,
        default: Date.now,
        expires: 86400
    } 
})

module.exports = mongoose.model('deletedTokens', deletedTokenSchema);