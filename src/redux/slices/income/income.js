import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



//reject with value mtlb ki response aayega wo user friendly response hoga


//reject with value mtlb ki response aayega wo user friendly response hoga
export const createIncome=createAsyncThunk("income/create",async(payload,{rejectWithValue,getState,dispatch})=>{

    const userToken=getState()?.users?.userAuth?.token;
    console.log(userToken);
    console.log('help');
    const config={
        headers:{
            "content-type":"application/json",
            Authorization:`Bearer ${userToken}`
        }
    }
try{
    const {data}=await axios.post('http://localhost:5000/api/income',
    {
        title:payload?.title,
        description:payload?.description,
        amount:payload?.amount,

    },config)
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
export const fetchAllIncome=createAsyncThunk("income/fetch",async(payload,{rejectWithValue,getState,dispatch})=>{

    const userToken=getState()?.users?.userAuth?.token;
    console.log(userToken);
    console.log('help');
    const config={
        headers:{
            "content-type":"application/json",
            Authorization:`Bearer ${userToken}`
        }
    }
try{
    const {data}=await axios.get(`http://localhost:5000/api/income?page=${payload}`,config)
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
const incomeSlice=createSlice({
    name:"income",
    initialState:{},
    //builder 3 choice handle krta hai 
    //1.fulfiled 2.reject 3.pending state
    extraReducers:builder=>{

builder.addCase(createIncome.rejected,(state,action)=>{
    state.userLoading=false;
    state.userServerErr=action?.payload?.msg;
    state.userAppErr=undefined;


})
builder.addCase(createIncome.pending,(state,action)=>{
    state.userLoading=true;
    state.userServerErr=undefined;
    state.userAppErr=undefined;



})
builder.addCase(createIncome.fulfilled,(state,action)=>{
state.IncCreated=action?.payload;
state.userLoading=false;
state.userServerErr=undefined;
state.userAppErr=undefined;


})
builder.addCase(fetchAllIncome.rejected,(state,action)=>{
    state.userLoading=false;
    state.userServerErr=action?.payload?.msg;
    state.userAppErr=undefined;


})
builder.addCase(fetchAllIncome.pending,(state,action)=>{
    state.userLoading=true;
    state.userServerErr=undefined;
    state.userAppErr=undefined;



})
builder.addCase(fetchAllIncome.fulfilled,(state,action)=>{
state.incomeList=action?.payload;
state.userLoading=false;
state.userServerErr=undefined;
state.userAppErr=undefined;


})

}

});

export default incomeSlice.reducer