
const mongoose = require("mongoose");
import express,{Request,Response,NextFunction} from 'express'
const CartDbInstance = mongoose.model("CARTSCHEMA");
import {AppType} from '../types/types'

class Routes{

    getCartsRoutes(app:AppType){

        app.post("/postCartContents",async(req:Request,res:Response)=>{
            const availableCart = await CartDbInstance.findOne({id:req.body.where.id});
            if (!availableCart){
                const cartDbInstance = new CartDbInstance(req.body.where);
                cartDbInstance.save((err,docs)=>{
                    if(!err){
                        res.status(200).json({"status":true})
                    }else{
                        res.status(200).json({"status":false})
                    }
                })
            }else{
                res.status(200).json({"status":"Already saved"});
            }
         
        }),

        app.post("/getCartContents",(req:Request,res:Response)=>{
            CartDbInstance.find((err,docs)=>{
                if (!err){
                    res.status(200).json(docs);
                }else{
                    res.status(400).json({"status":false})
                }
            })
        })

        app.delete("/deleteCart",async(req:Request,res:Response)=>{
            try{
                await CartDbInstance.findOneAndDelete({id:req.body.where.id});
                res.status(200).json({"status":true});
            }
            catch(err){
                res.status(400).json({"status":false})
            }
        })
    }
}

module.exports = new Routes();