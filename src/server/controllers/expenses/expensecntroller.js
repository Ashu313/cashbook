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
    const {limit}=req.query
    const searchText=req.query.searchText;
    const query = searchText ? { $or: [{ 'title': { $regex: searchText, $options: 'i' } }, { 'description': { $regex: searchText, $options: 'i' } }] } : {};
    console.log(query);
    console.log(searchText);
       const options = {
        page: Number(page),
        limit: 10,
       // populate: 'task_list',
        select: 'name description periodType period dueDate'
      };
    try{
        const income=await Expenses.paginate(query,{limit:3,page:Number(page),sort:{ date: -1 },populate:"user" })
       
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