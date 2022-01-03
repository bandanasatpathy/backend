const mongoose = require("mongoose")

const { Schema, model } = mongoose;

const OrderSchema = new Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "prodct"
    },
    orderDate:{
        type:Date
    },
    transactionId:{
        type:String
    },
    address:{
        type:String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
});

const OderModal = model("order",OrderSchema);

module.exports = OderModal