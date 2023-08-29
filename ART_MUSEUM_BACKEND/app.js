const express=require("express");
const port =process.env.PORT || 3001;
require('dotenv').config();
//connecting to db 
require("./db/connection");

const bodyParser=require("body-parser");
const cors=require("cors");
//importing route
const UserAuth=require("./router/auth_router");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({
    type: ["application/x-www-form-urlencoded", "application/json"], // Support json encoded bodies
  }));
app.use(cors({origin:"http://localhost:3000",credentials:true }));

app.use("/api",UserAuth);

app.listen(port,()=>{
    console.log(`server is listening on : http:localhost:${port}`);
})
