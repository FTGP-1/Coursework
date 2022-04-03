const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Investee = new Schema(
    {
        companyName: { type: String, required: true },
        legalPerson: { type: String, required: true },
        account: { type: String, required: true },
        profile: { type: String, required: true },
        progress:{ type: String, required: true },
        fulfilled:{type:Boolean,required: true},
       
    },
    { timestamps: true },
)

module.exports = mongoose.model('investees',Investee)

// module.exports =  mongoose => {
//     var schema = mongoose.Schema(
//       {
//         companyName: String,
//         legalPerson:String,
//         account: String,
//         Profile:String,
//         progress:String,
//         fulfilled:Boolean,
//         // companyName: { type: String, required: true },
//         // legalPerson: { type: String, required: true },
//         // account: { type: String, required: true },
//         // profile: { type: String, required: true },
//         // progress:{ type: String, required: true },
//         // fulfilled:{type:Boolean,required: true},
//       },
//       { timestamps: true }
//     );
//     // schema.method("toJSON", function() {
//     //   const { __v, _id, ...object } = this.toObject();
//     //   object.id = _id;
//     //   return object;
//     // });
    
//     const Investee = mongoose.model("investee", schema);
//     return Investee;
//   };


