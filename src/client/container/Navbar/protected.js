import react from 'react';
import { Navigate, Route } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Routes } from 'react-router-dom';

const ProtectedRoute=({children})=>{
    const UserLogin=useSelector(state=>state?.users?.userAuth);
    console.log(UserLogin);
  
    return (

        UserLogin?children:<Navigate to='/login'></Navigate>
    //remaining aruement as a parmeter;
    
    );
    

};
export default ProtectedRoute;
