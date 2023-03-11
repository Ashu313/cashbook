
import { configureStore } from "@reduxjs/toolkit";
import Userslices from "../slices/users/userslice";
//import userReducer from '../slices/users/userslice'
import expenseSlice from "../slices/expense/expense";
//import income from "../slices/income/income";
import AccountSlice from "../slices/accountDetail/account"
import incomeSlice from "../slices/income/income";
const store=configureStore({
    reducer:{
        users:Userslices,
        expense:expenseSlice,
        account:AccountSlice,
        income:incomeSlice,
       
    }, //ek object hai
})
export default store;