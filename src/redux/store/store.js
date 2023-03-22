
import { configureStore } from "@reduxjs/toolkit";
import Userslices from "../slices/users/userslice";
//import userReducer from '../slices/users/userslice'
import expenseSlice from "../slices/expense/expense";
//import income from "../slices/income/income";
import AccountSlice from "../slices/accountDetail/account"
import incomeSlice from "../slices/income/income";
import themeSlice from "../slices/darkmode/darkmode"
const store=configureStore({
    reducer:{
        users:Userslices,
        expense:expenseSlice,
        account:AccountSlice,
        income:incomeSlice,
        theme:themeSlice,
       
    }, //ek object hai
})
export default store;