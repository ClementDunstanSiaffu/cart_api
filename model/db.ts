
import mongoose from "mongoose";
const uri = "mongodb+srv://Clement:Cle*1995@cluster0-my6sq.mongodb.net/Product_Carts?retryWrites=true&w=majority"
mongoose.connect(uri)
require("./schema");