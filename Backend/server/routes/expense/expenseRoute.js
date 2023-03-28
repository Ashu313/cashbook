
const express=require('express');
const {createExpense,fetchExpense,fetchSingleUser,updateExpense,deleteUser}=require('../../controllers/expenses/expensecntroller');
 const authmiddlewares=require("../../middlewares/authmiddlewares")

const expenseRoute=express.Router();
expenseRoute.post('/',authmiddlewares,createExpense);
expenseRoute.get('/',authmiddlewares,fetchExpense);
expenseRoute.get('/:id',authmiddlewares,fetchSingleUser);
expenseRoute.put('/:id',authmiddlewares,updateExpense);
expenseRoute.delete('/:id',authmiddlewares,deleteUser);



module.exports=expenseRoute; 