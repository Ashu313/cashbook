
import { configureStore } from "@reduxjs/toolkit";
import Userslices from "../slices/users/userslice";
//import userReducer from '../slices/users/userslice'
import expenseSlice from "../slices/expense/expense";
const store=configureStore({
    reducer:{
        users:Userslices,
        expense:expenseSlice,
    }, //ek object hai
})
export default store;