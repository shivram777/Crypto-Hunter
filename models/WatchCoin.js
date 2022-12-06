const mongoose = require('mongoose')
const { Schema } = mongoose;

const WatchCoin = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'

    },
    coinName:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const Watchcoin = mongoose.model('watchcoin', WatchCoin);
module.exports = Watchcoin;