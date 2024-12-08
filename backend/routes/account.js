const express = require("express");

const router = express.Router();
const { authmiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");



router.get("/balance",authmiddleware,async (req,res)=>{
    const account = await Account.findOne({
        userId: req.userId
    });
    // console.log(account);
    
    res.json({
        balance: account.balance
    })
});

router.post("/transfer",authmiddleware,async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount, to} = req.body;
    // console.log(amount);
    
    // fetch account for the user id
    const account = await Account.findOne({userId: req.userId}).session(session);
    // console.log(account);
    
    if(!account || account.balance < amount){
        await session.abortTransaction();
        
        
        return res.status(400).json(
            {
                message:"Invalid account"
            }
        );
    }

    const toAccount = await Account.findOne({userId:to}).session(session);
    // console.log(toAccount);
    
    if(!toAccount){
        // console.log("Check");
        await session.abortTransaction();
        return res.status(400).json(
            {
                message:"Invalid account"
            }
        );
    }
    // Perform the transaction
    await Account.updateOne({userId: req.userId},
        {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to},{$inc: {balance: amount}}).session(session);
    
    await session.commitTransaction();

    res.json({
        message: "Transfer successfully"
    })
})







module.exports = router;