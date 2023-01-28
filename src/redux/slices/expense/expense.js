import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



//reject with value mtlb ki response aayega wo user friendly response hoga


//reject with value mtlb ki response aayega wo user friendly response hoga
export const CreateExpense=createAsyncThunk("expense/create",async(payload,{rejectWithValue,getState,dispatch})=>{

    const userToken=getState()?.users?.userAuth?.token;
    console.log(userToken);
    const config={
        headers:{
            "content-type":"application/json",
            Authorisation:`Bearer${userToken}`
        }
    }
try{
    const {data}=await axios.post('http://localhost:5000/api/expense',payload,config)
    return data;
}
catch(error)
{
 if(!error?.response)
 {
    throw error;
 }
 return rejectWithValue(error?.respone?.data);

}
});
const expenseSlice=createSlice({
    name:"expense",
    initialState:{expense:['dhd','babe']},
    //builder 3 choice handle krta hai 
    //1.fulfiled 2.reject 3.pending state
    extraReducers:builder=>{

builder.addCase(CreateExpense.rejected,(state,action)=>{
    state.userLoading=false;
    state.userServerErr=action?.payload?.msg;
    state.userAppErr=undefined;


})
builder.addCase(CreateExpense.pending,(state,action)=>{
    state.userLoading=true;
    state.userServerErr=undefined;
    state.userAppErr=undefined;



})
builder.addCase(CreateExpense.fulfilled,(state,action)=>{
state.userAuth=action?.payload;
state.userLoading=false;
state.userServerErr=undefined;
state.userAppErr=undefined;


})


}

});

export default expenseSlice.reducer