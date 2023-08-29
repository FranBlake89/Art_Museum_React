const user_Model=require("../model/user_model");
const createError=require("../error");
const bcryptJs=require("bcrypt");
const registerUser=async(req,res)=>{
    if(!req.body){
        return res.json(createError(203,"Empty body"))
    }
    try {
        const {userId,password}=req.body;
        if(await user_Model.findOne({userId})){
            return res.json(createError(403,"User already exists , Login !"));
        }
        let hashPassword=await bcryptJs.hash(password,10);
        const newUser=new user_Model({
            userId,
            password:hashPassword
        });
        const isSaved=await newUser.save();
        if(isSaved){
            return res.status(201).json({message:"New user register succesfully", user:isSaved});
        }else{
            return res.json(createError(409,"Error while processing"))
        }
    } catch (error) {
        //console.log(error);
        return res.json(createError(500,"INTERNAL_SERVER_ERROR"));
    }
}

const loginUser=async(req,res)=>{
    
    if(!req.body){
        return res.json(createError(203,"Empty body"))
    }
    try {
        const {userId,password}=req.body;
        const isUser=await user_Model.findOne({userId});
        if(isUser){
            let decrpytPassword=await bcryptJs.compare(password,isUser.password);
            if(decrpytPassword){
                return res.json(createError(200,"Login successfully"));
            }else{
                return res.json(createError(403,"password not matched"));
            }  
        }else{
            return res.json(createError(203,"User not found"));
        }
    } catch (error) {
        //console.log(error);
        return res.json(createError(500,"INTERNAL_SERVER_ERROR")); 
    }
}
module.exports={registerUser,loginUser};