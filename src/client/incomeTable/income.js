import React from "react";
import "./income.css";


import { Formik } from "formik";
import * as yup from 'yup';

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { createIncome } from "../../redux/slices/income/income";


const formSchema=yup.object({
	title:yup.string().required('title is required'),
	description:yup.string().required('description is required'),
   amount:yup.string().required('amount is required'),

});


const AddIncome=()=>{
    const dispatch=useDispatch();
    const income=useSelector(state=>state?.income);
    console.log(income);
    console.log('hello_baby');
   // const Incomes=useSelector(state=>state?.income);
 const {  IncCreated } =income;
  //  console.log(Incomes);
      const formik=useFormik({
          initialValues:{
          title:"",
          amount:"",
          description:"",
          },
          onSubmit:values=>{
              dispatch(createIncome(values))
              console.log('sjs');
              console.log(values);
              
               
          },
          validationSchema:formSchema,
          
          
      })
      
      useEffect(() => {
        if (IncCreated) {
          <Navigate to="/dashboard"/>
        }
      }, [IncCreated]); 
  
    return(

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
                <button type="submit">Record Income</button>
            </div>
            </form>
        </div>
    </section>
    )
}

export default AddIncome;