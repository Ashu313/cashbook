const jwt=require("jsonwebtoken");

//jwt token must have some value
//it passes three parameter;
const generateToken=id=>{
    return jwt.sign({id},"jbhbhgvgvg333",process.env.JWT_KEY,{expiresIn:"30d"})
}
module.exports=generateToken;
