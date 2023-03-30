import react, { useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { UserProfile } from '../../../redux/slices/users/userslice';




    //check if user is loggin

    
    const AdminProtectedRoute =({children})=>{

        const dispatch=useDispatch();
        useEffect(()=>{
            dispatch(UserProfile());
        },[dispatch])
    const state=useSelector(state=>state?.users);
  
    const{Profile}=state
    console.log(Profile?.isAdmin);
    console.log(children);
  
    return (

        Profile?.isAdmin===false?children:<Navigate to='/allincome'></Navigate>
    //remaining aruement as a parmeter;
    
    );
      //check if user is loggin
      
    };

export default AdminProtectedRoute;
