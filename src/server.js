const http=require('http');
const PORT=process.env.PORT||5000;
const app=require('./server/app');
const dbConnect=require('./server/database/dbconnect');
dbConnect();
const server=http.createServer(app);
 
server.listen(PORT,console.log(`server is running at ${PORT}`));

//mongodb+srv://ashu:<password>@expense.wsn4oy6.mongodb.net/?retryWrites=true&w=majority