const mongoose=require("mongoose");
const userSchmea=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        
    }
});
module.exports=new mongoose.model("User",userSchmea);