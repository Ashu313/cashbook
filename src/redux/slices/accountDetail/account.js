import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAllAccount=createAsyncThunk("account/fetch",async(payload,{rejectWithValue,getState,dispatch})=>{

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
    const {data}=await axios.get(`https://cashbook-y25s.onrender.com/api/status`,payload,config)
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

const AccountSlice=createSlice({
    name:"account",
    initialState:{},
    //builder 3 choice handle krta hai 
    //1.fulfiled 2.reject 3.pending state
    extraReducers:builder=>{


builder.addCase(fetchAllAccount.rejected,(state,action)=>{
    state.userLoading=false;
    state.userServerErr=action?.payload?.msg;
    state.userAppErr=undefined;


})
builder.addCase(fetchAllAccount.pending,(state,action)=>{
    state.userLoading=true;
    state.userServerErr=undefined;
    state.userAppErr=undefined;



})
builder.addCase(fetchAllAccount.fulfilled,(state,action)=>{
state.AccountStats=action?.payload;
state.userLoading=false;
state.userServerErr=undefined;
state.userAppErr=undefined;


})

}

});

export default AccountSlice.reducer