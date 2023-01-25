const express=require('express');
const fetchUser = require('./controllers/users/usercntroller');

const app=express();
 const cors=require('cors')
const registerUser=require('./controllers/users/usercntroller');
const errorHandler = require('./middlewares/middlewares');
const expenseRoute = require('./routes/expense/expenseRoute');
const incomeRoute = require('./routes/income/incomeroutes');
const userRoute = require('./routes/user/userroute');

app.use(express.json());
 app.use(cors());
 app.get('/',(req,res)=>{
    res.end('hello world');
})

app.use('/api/users',userRoute);
//app.post('/register',registerUser);
//app.get('/users',fetchUser)

//income routes
app.use('/api/income',incomeRoute);
app.use('/api/expense',expenseRoute);
app.use(errorHandler);



module.exports=app;