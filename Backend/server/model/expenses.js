 
const mongoose=require('mongoose');
const mongoosePaginate=require('mongoose-paginate-v2');
const User=require('./user');

const expensesSchema=mongoose.Schema({
    
    title:{

        required:[true,'first name is require'],
        type:String,
    },
    type: {
        type: String,
        default: "expense",
      },
    description:{
        required:[true,'description name is require'],
        type:String
    },
    
    amount:{
    
        required:[true,'amount  is require'],
        type:Number
    },
 user:{

       type:mongoose.Schema.Types.ObjectId,
      // type:String,
       ref:"User",
       required:true,
       validate: {
        validator: function(value) {
          // check if value is a valid ObjectId
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid user id"
      }
       //required:[true,'user id is required'],
    },
    date: {
        type: Date, // add a new date field to the schema
        default: Date.now(), // set the default value to the current date and time
      },
},
{
    timestamp:true,
    toJSON:{
        virtuals:true,
    },
    toObject:{
       virtuals:true,
    },
    timestamps: true,
}

)
 expensesSchema.plugin(mongoosePaginate);
const Expenses=mongoose.model('Expenses',expensesSchema);
module.exports=Expenses;