 
const expressAsyncHandler=require('express-async-handler');
 const Income=require("../../model/income")

const createIncome=expressAsyncHandler (async(req,res)=>{
    console.log(req.user);
    const {title,amount,description}=req.body;
    console.log(req.user);
    console.log(req.user);
    try{
        const income=await Income.create({
          title,
          description,
          amount,
          user:req?.user?._id,
        });
        res.json(income);
    }
    catch(err)
    {
        res.json(err);
    }
});
//fetch all
const fetchIncome=expressAsyncHandler (async(req,res)=>{
    const {page}=req.query;
    const {limit}=req.query;
    try{
        const income=await Income.paginate({},{limit:2,page:Number(page), sort:{createdAt: -1 } ,populate:"user"})
       
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
        const income=await Income.findById(id);
       
        res.json(income);
    }
    catch(err)
    {
        res.json(err);
    }
});
const  updateIncome=expressAsyncHandler (async(req,res)=>{
    const {id}=req?.params;
    const {title,amount,description}=req.body;
        try{
            const income=await Income.findByIdAndUpdate(id,{
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
                const income=await Income.findByIdAndDelete(id);
               
                res.json(income);
            }
            catch(err)
            {
                res.json(err);
            }
        });
module.exports={createIncome,fetchIncome,fetchSingleUser,updateIncome,deleteUser};