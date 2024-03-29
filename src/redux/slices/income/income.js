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
    const {data}=await axios.post('https://cashbook-y25s.onrender.com/api/income',
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
export const deleteIncomeAction = createAsyncThunk(
    "income/delete",
    async (id, { rejectWithValue, getState, dispatch }) => {
      //get user token
      const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      //http call
      try {
        const { data } = await axios.delete(
          `https://cashbook-y25s.onrender.com/api/income/${id}`,
          config
        );
        //dispatch
      
        return data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );
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
    const {data}=await axios.get(`https://cashbook-y25s.onrender.com/api/income?page=${payload}`,config)
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

builder.addCase(deleteIncomeAction.pending, (state, action) => {
    state.expLoading = true;
    state.expAppErr = undefined;
    state.expServerErr = undefined;
  });
 
  builder.addCase(deleteIncomeAction.fulfilled, (state, action) => {
    state.expLoading = false;
    state.isDeleted = false;
    state.IncomeDeleted = action?.payload;
    state.expAppErr = undefined;
    state.expServerErr = undefined;
    state.isExpCreated = false;
  });
  builder.addCase(deleteIncomeAction.rejected, (state, action) => {
    state.expLoading = false;
    state.expAppErr = action?.payload?.message;
    state.expServerErr = action?.error?.message;
  });

}

});

export default incomeSlice.reducer