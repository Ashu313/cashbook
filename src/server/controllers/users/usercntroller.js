const expressAsyncHandler=require('express-async-handler');
 

const  User = require('../../model/user');
const generateToken=require('../../middlewares/generateToken');



const registerUser=expressAsyncHandler(async(req,res)=>{

    const {firstname,email,password}=req?.body;
    const userExists=await User.findOne({email});
    if(userExists){

    
        throw new Error('user already exists');
    }
    
try{

    const user=await User.create({firstname,email,password});
    res.status(200).json(user);
}
catch(error)
{
    res.json(error);
}
});

const fetchUser=expressAsyncHandler(async(req,res)=>{
  
    try{
        const users=await User.find({});
        console.log(users);
    res.json(users);
    }catch(err)
    {
        res.json(err);
       
    }
}); 
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
    const { _id } = req?.user;
    console.log(_id);
  
    try {
      const myProfile = await User.findById(req?.user?._id).populate("expenses").populate("incomes");
  
      res.json(myProfile);
    } catch (error) {
      res.json(error);
    }
  });
  const updateUserCtrl = expressAsyncHandler(async (req, res) => {
    const { _id } = req?.user;
   
    const user = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(user);
  });
//login check;
const loginCredentials=expressAsyncHandler(async(req,res)=>{
const{email,password}=req?.body;
 
const userFound=await User.findOne({email});
console.log(userFound)
console.log(userFound?.id);
//&& (await userFound?.isPasswordMatch(password))
if(userFound && (await userFound?.isPasswordMatch(password)))
{
    
   res.json({

    _id:userFound?._id,
    firstname:userFound?.firstname,
    email:userFound?.email,
    password:userFound?.password,
    isadmin:userFound?.isadmin,
    token:generateToken(userFound?._id),
   })
}
else
{
res.status?Error.code : 500;
throw new Error('invalid login credintals');
}


});

module.exports={registerUser,fetchUser,loginCredentials,userProfileCtrl,updateUserCtrl};
//module.exports=fetchUser; 
//module.exports=LoginCredentials ;