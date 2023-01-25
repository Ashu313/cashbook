
const express=require('express');
const {fetchIncome,createIncome,fetchSingleUser, updateIncome, deleteUser}=require('../../controllers/income/incomecntroller');
const authMiddlewares = require('../../middlewares/authmiddlewares');
 

const incomeRoute=express.Router();
incomeRoute.post('/',createIncome);
incomeRoute.get('/',authMiddlewares, fetchIncome);
incomeRoute.get('/:id',fetchSingleUser);
incomeRoute.put('/:id',updateIncome);
incomeRoute.delete('/:id',deleteUser);



module.exports=incomeRoute; 