import React, { useState } from "react";
import "./expense.css";
import { Formik } from "formik";
import { useFormik } from "formik";
import * as yup from 'yup';
import { CreateExpense, fetchAllExpense } from "../../redux/slices/expense/expense";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { setDarkTheme, setDefaultTheme } from "../../redux/slices/darkmode/darkmode";



const formSchema=yup.object({
	title:yup.string().required('title is required'),
	description:yup.string().required('description is required'),
   amount:yup.string().required('amount is required'),

});

const AddExpense=({ items,expense,showIncomeBox, toggleIncomeBox })=>{
 
    const dispatch=useDispatch();
    const val=localStorage.getItem('theme');


	if (val === 'dark') {
		console.log("S");
		dispatch(setDarkTheme());
	  } else {
		dispatch(setDefaultTheme());
	  }
	  useEffect(() => {
		document.body.classList.toggle('dark-mode', val==='dark');
	  }, [val,dispatch]);
	

    console.log(items?.id);
    
  const expenses=useSelector(state=>state?.expense);
  console.log(expenses)
  const { expLoading, expAppErr, expServerErr, isExpCreated } = expenses;
  console.log(expenses);
    const formik=useFormik({
        
            initialValues:{
            title:"",
            amount:"",
            description:"",
            },
		
		onSubmit:async (values,{resetForm})=>{
            await dispatch(CreateExpense(values))
			console.log('sjs');
			console.log(values);
            resetForm();
		
            toggleIncomeBox(false);
            await dispatch(fetchAllExpense());
			 
		},
		validationSchema:formSchema,
		
		
	})
    useEffect(() => {
        if (isExpCreated) {
          Navigate("user-profile-expenses", undefined);
        }
      }, [isExpCreated]); 
    return(
        <>
         {showIncomeBox &&(
    <>
       <section className="content">
        <div className="expense-detail">
         <form onSubmit={formik.handleSubmit}>
                 <h1 style={{textAlign:'center'}}>ADD EXPENSE DATA</h1>
                
                 <div className="expense-dashboard">
                     <input type="text" placeholder="enter title" value={formik.values.title} onChange={formik.handleChange('title')} onBlur={formik.handleBlur('title')}></input>
                 </div>
                 <div className="expense-dashboard">
                     <input type="text" placeholder="enter description" values={formik.values.description} onChange={formik.handleChange('description')} onBlur={formik.handleBlur('description')}></input>
                 </div>
                 <div className="expense-dashboard">
                     <input type="number" placeholder="enter number" value={formik.values.amount} onChange={formik.handleChange('amount')} onBlur={formik.handleBlur('amount')}></input>
                 </div>
                 <div className="add-button">
                     <button type="submit" >Record Expense</button>
                 </div>
                 </form>    
        </div>
    </section>
    </>
    )}
        </>
    )
}

export default AddExpense;