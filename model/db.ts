
import mongoose from "mongoose";
mongoose.connect(process.env.mongoURI);
require("./schema");