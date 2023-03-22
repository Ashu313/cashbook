import { Formik, useFormik } from 'formik';
import react, { useEffect } from 'react'
import "./login.css";
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../../redux/slices/users/userslice';
import { useNavigate } from 'react-router-dom';

const formSchema=yup.object({
	email:yup.string().required('email is required'),
	password:yup.string().required('password is required'),
})


const Login=()=>
{

	const dispatch=useDispatch();
	const user=useSelector(state=>state?.users)
	console.log(user);
	const {userAppErr,userServerErr,userloading,userAuth}=user;

	const formik=useFormik({
		initialValues:{
			email:"",
			password:""
		},
		onSubmit:values=>{
			console.log('sjs');
			dispatch(LoginAction(values));
			
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
        
			return Navigate('/Dashboard');
		}
	},[userAuth])
	//console.log(formik);
    return(
        <>
        <div class="container">
	<div class="screen">
		<div class="screen__content">

			<form class="login" onSubmit={formik.handleSubmit}>
			{userAppErr || userServerErr?<div style={{color:'green'}}>betichod</div>:<div style={{color:'red',textAlign:'center'}}></div>}
				<div class="login__field">
			
					<i class="login__icon fas fa-user"></i>
					<input type="text" class="login__input" placeholder="Email" value={formik.values.email} onChange={formik.handleChange('email')} onBlur={formik.handleBlur('email is required')}/>
					<div className='formik-email'>
					{
						formik.touched.email && formik.errors.email
					}
					</div>
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="password" class="login__input" placeholder="Password" value={formik.values.password}  onChange={formik.handleChange('password')} onBlur={formik.handleBlur('password is required')}/>
					<div className='formik-passoword'>
					{
						formik.touched.password && formik.errors.password
					}
					</div>
				</div>
				<button class="button login__submit" type='submit' >
					<span class="button__text">Log In Now</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div class="social-login">
				<h3>log in via</h3>
				<div class="social-icons">
					<a href="#" class="social-login__icon fab fa-instagram"></a>
					<a href="#" class="social-login__icon fab fa-facebook"></a>
					<a href="#" class="social-login__icon fab fa-twitter"></a>
				</div>
			</div>
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
    )
}
export default Login;