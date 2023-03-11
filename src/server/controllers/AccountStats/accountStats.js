const Expenses=require('../../model/expenses');
const expressAsyncHandler=require('express-async-handler');
const Income = require('../../model/income');

const AccountStats=expressAsyncHandler(async(req,res)=>{
    const {id}=req?.params;
    console.log(id);
    try{
const expenseStats=await Expenses.aggregate([
    
    {$match:{amount:{$gte:0}}},
 //   {$match: {userId:{ $exists: true, $ne: null }}},
    
    {
        $group:{

            _id:null,
            averageExp:{$avg:"$amount"},
            totalExp:{$sum:"$amount"},
            minExp:{$min:"$amount"},
            maxExp:{$max:'$amount'},
            totalRecordExp:{$sum:1},
        }
    }
]) 
const IncomeStats=await Income.aggregate([
    
    
    {$match:{amount:{$gte:0}}},
    {
        $group:{

            _id: null,
            averageinc:{$avg:"$amount"},
            totalinc:{$sum:"$amount"},
            mininc:{$min:"$amount"},
            maxinc:{$max:'$amount'},
            totalRecordinc:{$sum:1},
        }
    }
]) 
res.json({expenseStats,IncomeStats})
}
catch(error)
{
res.json(error);
}
});
module.exports=AccountStats;

 