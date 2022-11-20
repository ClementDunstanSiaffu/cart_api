
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    deviceId:{type:String},
    carts:[
        {
            id:{type:String},
            productName:{type:String},
            productPrice:{type:Number},
            productImage:{type:String},
            available:{type:String}
        }
    ]
});
mongoose.model("CARTSCHEMA",cartSchema);


// const cartSchema = new mongoose.Schema({
//     id:{type:String},
//     deviceId:{type:String},
//     productName:{type:String},
//     productPrice:{type:Number},
//     productImage:{type:String},
//     available:{type:String}
// });