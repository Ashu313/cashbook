
const express=require('express');
const {fetchIncome,createIncome,fetchSingleUser, updateIncome, deleteUser}=require('../../controllers/income/incomecntroller');
const authmiddlewares = require('../../middlewares/authmiddlewares');
 

const incomeRoute=express.Router();
incomeRoute.post('/',authmiddlewares,createIncome);
incomeRoute.get('/',authmiddlewares, fetchIncome);
incomeRoute.get('/:id',authmiddlewares,fetchSingleUser);
incomeRoute.put('/:id',authmiddlewares,updateIncome);
incomeRoute.delete('/:id',authmiddlewares,deleteUser);



module.exports=incomeRoute; 