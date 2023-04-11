// Importing the module
const express=require("express")
  
// Creating express Router
const router=express.Router()
  
// Handling login request
router.get("/",(req,res,next)=>{
    res.sendFile("recipelookup.html", {root: __dirname })
})
module.exports=router