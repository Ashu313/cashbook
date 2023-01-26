
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



//reject with value mtlb ki response aayega wo user friendly response hoga
export const LoginAction=createAsyncThunk("users/login",async(payload,{rejectWithValue,getState,dispatch})=>{

    const config={
        headers:{
            "content-type":"application/json",
        }
    }
try{
    const {data}=await axios.post('http://localhost:5000/api/users/login',payload,config)
    localStorage.setItem('userinfo',JSON.stringify(data));
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

//reject with value mtlb ki response aayega wo user friendly response hoga
export const RegisterAction=createAsyncThunk("users/register",async(payload,{rejectWithValue,getState,dispatch})=>{

    const config={
        headers:{
            "content-type":"application/json",
        }
    }
try{
    const {data}=await axios.post('http://localhost:5000/api/users/register',payload,config)
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
const userloginfromlocalstorage=localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')):null;
const Userslices=createSlice({
    name:"users",
    initialState:{
        userAuth:userloginfromlocalstorage
    },
    
    //builder 3 choice handle krta hai 
    //1.fulfiled 2.reject 3.pending state
    extraReducers:builder=>{
        builder.addCase(LoginAction.pending,(state,action)=>{
            state.userLoading=true;
            state.userServerErr=undefined;
            state.userAppErr=undefined;
        
        

    })
    builder.addCase(LoginAction.fulfilled,(state,action)=>{
        
        console.log(action);
        state.userAuth=action?.payload;
        state.userLoading=false;
        state.userServerErr=undefined;
        state.userAppErr=undefined;
    
    
})
builder.addCase(LoginAction.rejected,(state,action)=>{
    console.log(action);
    state.userLoading=false;
    state.userAppErr=action?.payload?.msg;
    state.userServerErr=action?.error?.msg;
 
    
    
    })
        
        
 
builder.addCase(RegisterAction.rejected,(state,action)=>{
    state.userLoading=false;
    state.userServerErr=action?.payload?.msg;
    state.userAppErr=action?.payload?.msg;


})
builder.addCase(RegisterAction.pending,(state,action)=>{
    state.userLoading=true;
    state.userServerErr=undefined;
    state.userAppErr=undefined;



})
builder.addCase(RegisterAction.fulfilled,(state,action)=>{
state.userAuth=action?.payload;
state.userLoading=false;
state.userServerErr=undefined;
state.userAppErr=undefined;


})


}

});

export default Userslices.reducer