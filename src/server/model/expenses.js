 
const mongoose=require('mongoose');
const mongoosePaginate=require('mongoose-paginate-v2');

const expensesSchema=mongoose.Schema({
    
    title:{

        required:[true,'first name is require'],
        type:String,
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
       ref:"User",
       required:[true,'user id is required'],
    }
},
{
    timestamp:true,
    toJSON:{
        virtuals:true,
    },
    toObject:{
       virtuals:true,
    }
}

)
 expensesSchema.plugin(mongoosePaginate);
const Expenses=mongoose.model('Expenses',expensesSchema);
module.exports=Expenses;