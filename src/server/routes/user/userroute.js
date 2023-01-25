
const {registerUser}=require('../../controllers/users/usercntroller')
const express=require('express');
const {fetchUser} = require('../../controllers/users/usercntroller');
const {loginCredentials} = require('../../controllers/users/usercntroller');
const userRoute=express.Router();
userRoute.post('/register',registerUser);
userRoute.get('/',fetchUser);
userRoute.post('/login',loginCredentials);
userRoute.use('/login',loginCredentials);

module.exports=userRoute;