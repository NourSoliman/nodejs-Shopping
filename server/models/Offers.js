const mongoose = require(`mongoose`)
const offersSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    img:{
        data:Buffer,
        contentType:String,
    },
    price:{
        type:Number,
        required:true
    },
    alt: {
        type:String,
        required:true
    }
})
module.exports = mongoose.model(`offers` , offersSchema)