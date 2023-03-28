
const errorHandler=(err,req,res,next)=>{
const statusCode=res.statusCode==200?500:req.statusCode;
res.status(statusCode);
res.json({
    msg:err?.message,
    stack:process.env.NODE_ENV==="production"?null:err?.stack,
})
}

module.exports=errorHandler;