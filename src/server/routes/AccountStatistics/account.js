const express=require('express');

const AccountStats=require('../../controllers/AccountStats/accountStats');

const AccountStatusRoute=express.Router();
AccountStatusRoute.get('/status',AccountStats);
module.exports=AccountStatusRoute;