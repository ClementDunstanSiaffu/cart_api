
const mongoose = require("mongoose");
import express,{Request,Response,NextFunction} from 'express'
import helper from '../helper/helper';
const CartDbInstance = mongoose.model("CARTSCHEMA");
import {AppType} from '../types/types'

class Routes{

    getCartsRoutes(app:AppType){

        app.post("/postCartContents",async(req:Request,res:Response)=>{
            const availableCart = await CartDbInstance.findOne({deviceId:req.body.where.deviceId});
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
                const formattedCartObject = availableCart.toObject();
                const newCartArray = [...formattedCartObject["carts"]]
                newCartArray.push(req.body.where.carts)
                const newInstance = {
                    "deviceId":req.body.where.deviceId,
                    "carts":newCartArray
                }
                await CartDbInstance.replaceOne(formattedCartObject,newInstance);
                res.status(200).json({"status":true});
            }
        }),

        app.post("/getCartContents",async (req:Request,res:Response)=>{
            const availableCartInstance = await CartDbInstance.findOne({deviceId:req.body.where.deviceId});
            if (availableCartInstance){
                const newAvailableCarts = availableCartInstance.toObject();
                res.status(200).json(newAvailableCarts["carts"])
            }else{
                res.status(200).json([])
            }
        })

        app.delete("/deleteCart",async(req:Request,res:Response)=>{
            try{
                const availabaleCartsInstance = await CartDbInstance.findOne({deviceId:req.body.where.deviceId});
                const availableCartsInstanceInObjectFormat = availabaleCartsInstance.toObject(); 
                const newCartArraay = helper.deleteProduct(availableCartsInstanceInObjectFormat["carts"],req.body.where.id);
                const newOrderInstance = {
                    "deviceId":req.body.where.deviceId,
                    "carts":newCartArraay
                }
                await CartDbInstance.replaceOne(availableCartsInstanceInObjectFormat,newOrderInstance)
                res.status(200).json({"status":true});
            }
            catch(err){
                res.status(400).json({"status":false})
            }
        })
    }
}

module.exports = new Routes();