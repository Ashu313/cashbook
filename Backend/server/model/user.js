const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const userSchema=mongoose.Schema({
    
    firstname:{

        required:[true,'first name is require'],
        type:String,
    },
    email:{
        required:[true,'first name is require'],
        type:String
    },
    password:{
    
        required:[true,'first name is require'],
        type:String
    },
    isAdmin:{

        type:Boolean,
        default:false,
    }
},
{
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
)
//virtual method to populate created post
userSchema.virtual("expenses", {
    ref: "Expenses",
    foreignField: "user",
    localField: "_id",
  });
  
  //virtual method to populate created post
  //iska mtlb ki user ek mandatory fields hai jisko hmko refernce dena hai income wale me
  userSchema.virtual("incomes", {
    ref: "Income", //ye refernce hai 
    foreignField: "user",
    localField: "_id",
  });
//hashpassword
userSchema.pre("save",async function(next){

  //  console.log(this);
  const salt=await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password,salt);
  next();

});
//verify password
userSchema.methods.isPasswordMatch=async function(enteredpassword)
{
return  await bcrypt.compare(enteredpassword,this.password);
}
const User=mongoose.model('User',userSchema);
module.exports=User;