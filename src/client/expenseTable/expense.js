import React from "react";
import "./expense.css";
import { Formik } from "formik";
import { useFormik } from "formik";
import * as yup from 'yup';
import { CreateExpense } from "../../redux/slices/expense/expense";
import { useDispatch } from "react-redux";

const formSchema=yup.object({
	title:yup.string().required('title is required'),
	description:yup.string().required('description is required'),
   amount:yup.string().required('amount is required'),

});

const AddExpense=()=>{
    const dispatch=useDispatch();
    const formik=useFormik({
		initialValues:{
		title:"",
        amount:"",
        description:"",
		},
		onSubmit:values=>{
            dispatch(CreateExpense(values))
			console.log('sjs');
			console.log(values);
			
			 
		},
		validationSchema:formSchema,
		
		
	})
    return(

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
    )
}

export default AddExpense;