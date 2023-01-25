
const mongoose=require('mongoose');
const dbConnect=async()=>{
try {
    await mongoose.connect('mongodb+srv://ashu:y3umnFNXkWcBIEkX@expense.wsn4oy6.mongodb.net/?retryWrites=true&w=majority',{
 
    
      useNewUrlParser:true,
 
    });
    console.log('database connected');
} catch (error) {
    console.log(`${error.message}`)
}
}
module.exports=dbConnect;
//nodemon me missing script hoga to json file me "nodemon":"nodemon";