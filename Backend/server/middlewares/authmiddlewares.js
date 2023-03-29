const expressAsyncHandler=require('express-async-handler');
const jwt =require('jsonwebtoken');
const User=require('../model/user');

const authMiddlewares=expressAsyncHandler(async(req,res,next)=>{

   let token;
   if(req?.headers?.authorization?.startsWith('Bearer'))
   {
    token=req?.headers?.authorization?.split(" ")[1];
    console.log(token);
    try {
        if(token)
        {
            const decodeUser=jwt.verify(token,"jbhbhgvgvg333",process.env.JWT_KEY);
            console.log(decodeUser);
            const user= await User.findById(decodeUser?.id);
            req.user=user;
         
        
            next();
        }
    } catch (error) {
        throw new Error('not authorised');
    }
}
    else
    {
        console.log('token not exist');
    }
   }

);
module.exports=authMiddlewares;