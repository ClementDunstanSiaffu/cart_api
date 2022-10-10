
const mongoose = require("mongoose");
import express,{Request,Response,NextFunction} from 'express'
const CartDbInstance = mongoose.model("CARTSCHEMA");
import {AppType} from '../types/types'

class Routes{

    getCartsRoutes(app:AppType){
        app.post("/postCartContents",(req:Request,res:Response)=>{
            const date = Date.now();
            const cartDbInstance = new CartDbInstance({id:date,...req.body});
            cartDbInstance.save((err,docs)=>{
                if(!err){
                    res.status(200).json({"status":true})
                }else{
                    res.status(200).json({"status":false})
                }
            })
        }),
        app.get("/getCartContents",(req:Request,res:Response)=>{
            CartDbInstance.find((err,docs)=>{
                if (!err){
                    res.status(200).json(docs);
                }else{
                    res.status(400).json({"status":false})
                }
            })
        })
    }
}

module.exports = new Routes();