
const express=require('express');
const {createExpense,fetchExpense,fetchSingleUser,updateExpense,deleteUser}=require('../../controllers/expenses/expensecntroller');
 

const expenseRoute=express.Router();
expenseRoute.post('/',createExpense);
expenseRoute.get('/',fetchExpense);
expenseRoute.get('/:id',fetchSingleUser);
expenseRoute.put('/:id',updateExpense);
expenseRoute.delete('/:id',deleteUser);



module.exports=expenseRoute; 