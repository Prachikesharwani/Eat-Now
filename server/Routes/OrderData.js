const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')

router.post('/OrderData',async(req,res)=>{
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    let eId = await Order.findOne({'email':req.body.email})
    console.log(eId)
    if(eId === null){
        try{
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        }catch(error){
            console.log(error.message)
            // res.send("Server Error",error.message)
            res.status(500).json({ success: false, message: "Server Error" });
        }
    }
    else{
        try {
            await Order.findOneAndUpdate({email:req.body.email},{$push:{order_data:data}}).then(()=>{res.json({success:true})})
        } catch (error) {
            // res.send("Server Error",error.message)
            res.status(500).json({ success: false, message: "Server Error" });
        }
    }
})

router.post('/myOrderData',async(req,res)=>{
    try {
        let myData=await Order.findOne({'email':req.body.email})
        res.json({orderData:myData})
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
})

module.exports=router


