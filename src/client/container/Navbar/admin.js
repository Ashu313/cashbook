import react, { useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { UserProfile } from '../../../redux/slices/users/userslice';




   
    
    const AdminProtectedRoute =({children})=>{

        const dispatch=useDispatch();
        useEffect(()=>{
            dispatch(UserProfile());
        },[dispatch])
    const state=useSelector(state=>state?.users);
  
    const{Profile}=state
  
    return (

        Profile?.isAdmin?children:<Navigate to='/admin'></Navigate>
    //remaining aruement as a parmeter;
    
    );
      //check if user is loggin
      
    };


export default AdminProtectedRoute;
