const Expenses=require('../../model/expenses');
const expressAsyncHandler=require('express-async-handler');
 
const createExpense=expressAsyncHandler (async(req,res)=>{
   
    
    const {title,amount,description}=req.body;
    console.log(req.user);
    const {id}=req?.params;
    console.log(id);
    
 
    try{
        const expense=await Expenses.create({
          title,
          description,
          amount,
         
          user:req?.user?._id,
          //user,
        });
        res.json(expense);
    }
    catch(err)
    {
        res.json(err);
    }
});
//fetch all
const fetchExpense=expressAsyncHandler (async(req,res)=>{
    const {page}=req.query;
    try{
        const income=await Expenses.paginate({},{limit:2,page:Number(page),populate:"user" })
       
        res.json(income);
    }
    catch(err)
    {
        res.json(err);
    }
});
//fetch Single user
const fetchSingleUser=expressAsyncHandler (async(req,res)=>{
const {id}=req?.params
    try{
        const expense=await Expenses.findById(id);
       
        res.json(expense);
    }
    catch(err)
    {
        res.json(err);
    }
});
const  updateExpense=expressAsyncHandler (async(req,res)=>{
    const {id}=req?.params;
    const {title,amount,description}=req.body;
        try{
            const income=await Expenses.findByIdAndUpdate(id,{
                title,amount,description,

            },{
                new:true
            });
           
            res.json(income);
        }
        catch(err)
        {
            res.json(err);
        }
    });
    const deleteUser=expressAsyncHandler (async(req,res)=>{
        const {id}=req?.params
            try{
                const expense=await Expenses.findByIdAndDelete(id);
               
                res.json(expense);
            }
            catch(err)
            {
                res.json(err);
            }
        });
module.exports={createExpense,fetchExpense,fetchSingleUser,updateExpense,deleteUser};