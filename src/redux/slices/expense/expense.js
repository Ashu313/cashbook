import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




//reject with value mtlb ki response aayega wo user friendly response hoga

 
//reject with value mtlb ki response aayega wo user friendly response hoga
export const CreateExpense=createAsyncThunk("expense/create",async(Expenses,{rejectWithValue,getState,dispatch})=>{

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
    const {data}=await axios.post('http://localhost:5000/api/expense',
    {
        title:Expenses?.title,
        description:Expenses?.description,
        amount:Expenses?.amount,

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
export const fetchAllExpense=createAsyncThunk("expense/fetch",async(page,{rejectWithValue,getState,dispatch})=>{
   
     
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
    const {data}=await axios.get(`http://localhost:5000/api/expense?page=${page}`,config)
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
export const deleteExpenseAction = createAsyncThunk(
    "expense/delete",
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
          `http://localhost:5000/api/expense/${id}`,
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
export const EditExpense=createAsyncThunk("expense/edit",async(payload,{rejectWithValue,getState,dispatch})=>{
   
     
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
    const {data}=await axios.get(`http://localhost:5000/api/expense?${payload?.id}`,
    {
        firstname:payload?.firstname,
        description:payload?.description,
        amount:payload?.amount,

       },
          config)
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
    initialState:{},
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
state.expenseCreated=action?.payload;
state.userLoading=false;
state.userServerErr=undefined;
state.userAppErr=undefined;


})
builder.addCase(fetchAllExpense.rejected,(state,action)=>{
    state.expLoading=false;
    state.expServerErr=action?.payload?.msg;
    state.expAppErr=undefined;


})
builder.addCase(fetchAllExpense.pending,(state,action)=>{
    state.expLoading=true;
    state.expServerErr=undefined;
    state.expAppErr=undefined;



})
builder.addCase(fetchAllExpense.fulfilled,(state,action)=>{
state.expenseList=action?.payload;
state.expLoading=false;
state.expServerErr=undefined;
state.expAppErr=undefined;


})
builder.addCase(EditExpense.pending, (state, action) => {
    state.expLoading = true;
    state.expAppErr = undefined;
    state.expServerErr = undefined;
  });

  builder.addCase(EditExpense.fulfilled, (state, action) => {
    state.expLoading = false;
    state.expenseUpdated = action?.payload;
    state.isExpUpdated = false;
    state.expAppErr = undefined;
    state.expServerErr = undefined;
    state.isExpCreated = false;
  });
  builder.addCase(EditExpense.rejected, (state, action) => {
    state.expLoading = false;
    state.expAppErr = action?.payload?.message;
    state.expServerErr = action?.error?.message;
  });
  builder.addCase(deleteExpenseAction.pending, (state, action) => {
    state.expLoading = true;
    state.expAppErr = undefined;
    state.expServerErr = undefined;
  });
 
  builder.addCase(deleteExpenseAction.fulfilled, (state, action) => {
    state.expLoading = false;
    state.isDeleted = false;
    state.expenseDeleted = action?.payload;
    state.expAppErr = undefined;
    state.expServerErr = undefined;
    state.isExpCreated = false;
  });
  builder.addCase(deleteExpenseAction.rejected, (state, action) => {
    state.expLoading = false;
    state.expAppErr = action?.payload?.message;
    state.expServerErr = action?.error?.message;
  });

}

});

export default expenseSlice.reducer