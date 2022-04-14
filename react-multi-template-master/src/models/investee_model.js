const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Investee = new Schema(
    {
        companyName: { type: String, required: true },
        legalPerson: { type: String, required: true },
        account: { type: String, required: true },
        ico:{type: String, required: true},
        tickerName:{type: String, required: true },
        tickerPrice:{type: String, required: true },
        profile: { type: String, required: true },
        progress:{ type: String, required: true },
        fulfilled:{type:Boolean,required: true},
       
    },
    { timestamps: true },
)

module.exports = mongoose.model('investees',Investee)
