import React, { useState } from "react";
import "./income.css";



import * as yup from 'yup';

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { createIncome, fetchAllIncome } from "../../redux/slices/income/income";
import { UserProfile } from "../../redux/slices/users/userslice";


const formSchema=yup.object({
	title:yup.string().required('title is required'),
	description:yup.string().required('description is required'),
   amount:yup.string().required('amount is required'),

});


const AddIncome=({ showIncomeBox, toggleIncomeBox })=>{
    const [inc,setIncome]=useState(false);
    const dispatch=useDispatch();
    const income=useSelector(state=>state?.income);

   // const Incomes=useSelector(state=>state?.income);
 const {  IncCreated } =income;
  //  console.log(Incomes);
      const formik=useFormik({
          initialValues:{
          title:"",
          amount:"",
          description:"",
          },
          onSubmit:async(values,{resetForm})=>{
            dispatch(createIncome(values))
              resetForm();
              setIncome(showIncomeBox)
              toggleIncomeBox(false);
            
           
           dispatch(fetchAllIncome());
             dispatch(UserProfile());
              
               
          },
          validationSchema:formSchema,
          
          
      })
      
      useEffect(() => {
        if (IncCreated) {
          <Navigate to="/dashboard"/>
        }
      }, [IncCreated]); 
  
    return(
<>
   {showIncomeBox &&(
    <>
     <section className="content">
        <div className="expense-detail">
            <form onSubmit={formik.handleSubmit}>
            <h1 style={{textAlign:'center'}}>ADD INCOME DATA</h1>
            <div className="expense-dashboard">
                <input type="text" placeholder="enter title" value={formik.values.title} onChange={formik.handleChange('title')} onBlur={formik.handleBlur('title')}></input>
            </div>
            <div className="expense-dashboard">
                <input type="text" placeholder="enter description" value={formik.values.description} onChange={formik.handleChange('description')} onBlur={formik.handleBlur('description')}></input>
            </div>
            <div className="expense-dashboard">
                <input type="number" placeholder="enter number" value={formik.values.amount} onChange={formik.handleChange('amount')} onBlur={formik.handleBlur('amount')}></input>
            </div>
            <div className="add-button">
                <button type='submit'  >Record Income</button>
            </div>
            </form>
        </div>
    </section>
    </>
   )}
   </>
   )
}

export default AddIncome;