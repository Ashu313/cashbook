import react from 'react'
import "./signup.css";
import { Formik, useFormik } from 'formik';
import *as yup from 'yup'
import { useDispatch } from 'react-redux';
import { RegisterAction } from '../../redux/slices/users/userslice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ColorRing } from 'react-loader-spinner';

const formSchema=yup.object({
	firstname:yup.string().required('first name is required'),
	email:yup.string().required('email is required'),
	password:yup.string().required('password is required')
})
const Signup=()=>
{

	const dispatch=useDispatch();
	const user=useSelector(state=>state?.users)
	const {userAppErr,userServerErr,userLoading,userAuth}=user;

	 const formik=useFormik({
		initialValues:{
			firstname:"",
			email:"",
			password:"",
		},
		onSubmit:values=>{
			dispatch(RegisterAction(values));
			console.log(values);
		},
		validationSchema:formSchema,
		validate:values => {
			const errors = {};
			if (!values.email) {
			  errors.email = 'Required';
			} else if (
			  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
			) {
			  errors.email = 'Invalid email address';
			}
			return errors;
		}
	 })
	 const Navigate=useNavigate();
	 useEffect(()=>{
		 if(userAuth)
		 {
		  return Navigate('/dashboard');
		 }
	 },[userAuth])
    return(
        <>
					{!userLoading?
				<>
			<div className='svg-cont' style={{textAlign:'center'}}>
		<ColorRing
  visible={true}
  height="400"
  width="400"
  JustifyContent='center'
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
</div>
<h1>Please do not refresh the Page</h1>
</>
		:
		<>
        <div class="container">
	<div class="screen">
		<div class="screen__content">
		{userAppErr || userServerErr?<div style={{color:'red',textaAlign:'center'}}>Network error</div>:<div style={{color:'red',textAlign:'center'}}></div>}
			<form class="login" onSubmit={formik.handleSubmit}>
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input type="text" class="login__input" placeholder="User name" value={formik.values.firstname} onChange={formik.handleChange('firstname')} onBlur={formik.handleBlur('firstname is required')}/>
					<div className='formik-email'>
					{
						formik.touched.firstname && formik.errors.firstname
					}
					</div>
				</div>
                <div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input type="email" class="login__input" placeholder="Email"  value={formik.values.email} onChange={formik.handleChange('email')}  onBlur={formik.handleBlur('email is required')}/>
					<div className='formik-email'>
					{
						formik.touched.email && formik.errors.email
					}
					</div>
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="password" class="login__input" placeholder="Password" value={formik.values.password} onChange={formik.handleChange('password')} onBlur={formik.handleBlur('password is required')}/>
					<div className='formik-email'>
					{
						formik.touched.password && formik.errors.password
					}
					</div>
				</div>
                <div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="password" class="login__input" placeholder="Password"/>
				</div>
                
				<button class="button login__submit">
					<br>
					</br>
					<span class="button__text">Already have an account <a href='/login'>Login here</a></span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
</>
}
        </>
    )
}
export default Signup;