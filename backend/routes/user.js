const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { authmiddleware } = require("../middleware");
const { User, Account } = require("../db");

const {JWT_SECRET} = require("../config");

const router = express.Router();

const signUpSchema = zod.object( {
        username: zod.string().email(),
        password: zod.string(),
        firstName : zod.string(),
        lastName : zod.string()
    }
)

const signInBody = zod.object({
    username: zod.string().email(),
    password : zod.string()
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.post("/signup", async (req,res)=>{
   
    
    const {success} = signUpSchema.safeParse(req.body);
   console.log(success);
   
    
    if(!success){
        return res.json({
            message: "Email already taken/ Incrrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username
    })
    
    if(user){
        return res.json(
            {
                message: "Email already taken/ Incrrect inputs"
            }
        )
    }
     
    const createUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    // console.log(createUser);
    
    
    
    const userId = createUser._id;
    // Account create
    await Account.create({
        userId,
        balance:1+Math.random()*10000
    })
    // ------  
    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })



})

router.post("/signin",async (req,res)=>{ 
    const {success} = signInBody.safeParse(req.body);
    
    if(!success){   
        return res.json({
            message:"Invalid input"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    // console.log(user);
    
    if(user){
        const token = jwt.sign({
            userId: user._id
        },JWT_SECRET);
    res.json({
        token: token,
        message: "User successfully signedIn"

    })
    return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })

})

router.put("/",authmiddleware,async (req,res)=>{
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:"Error while updating info"
        })
    }
    await User.updateOne({
        _id: req.userId,
    },req.body);

    res.json({
        message: "Update Successfully"
    })
})

router.get("/bulk",async(req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[
            {
                firstName:{
                    "$regex":filter
                }
            },
            {
                lastName:{
                    "$regex":filter
                }
            }
        ]
    })
    res.json({
        user: users.map(user =>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        })) 
    })
})


module.exports = router;






