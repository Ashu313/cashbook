import logo from './logo.svg';
import './App.css';

import Home from './client/Home/home';
import Login from './client/login/login';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Signup from './client/signup/signup';
import Dashboard from './client/dashboard/dashboard';
import AddExpense from './client/expenseTable/expense';
import AddIncome from './client/incomeTable/income';
import Navbar from './client/container/Navbar/Navbar';
import ProtectedRoute from './client/container/Navbar/protected';
import { useSelector } from 'react-redux';
import Profile from './client/container/profileView/profile';
import ViewExpense from './client/viewExpense/viewExpense';
import AdminProtectedRoute from './client/container/Navbar/admin';
import AdminDashboard from './client/AdminDashboard/AdminDashboard';
import AdminDashboard1 from './client/AdminDashboard/AdminDashboard';
import ViewIncome from './client/ViewIncome/viewIncome';
import ContactFrom from './client/Report/Report';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDarkTheme, setDefaultTheme } from "./redux/slices/darkmode/darkmode"
import ViewExpenseData from './client/Adminexpense/viewExpense';
import ViewAllIncome from './client/AdminIncome/viewincome';
import { UserProfile } from './redux/slices/users/userslice';

//use selector select the element from the redux tool kit or from store
function App() {
 /* const val=localStorage.getItem('theme');
	useEffect(() => {
		document.body.classList.toggle('dark-mode', val);
	  }, [val]);
	
	const dispatch=useDispatch();
	if (val === 'dark') {
		console.log("S");
		dispatch(setDarkTheme());
	  } else if(val==='default')
     {
		dispatch(setDefaultTheme());
	  }
    console.log(val);*/
    const dispatch=useDispatch();
    const state=useSelector(state=>state?.users);
    const {Profile}=state;
  useEffect(()=>{
    dispatch(UserProfile());
  },[dispatch]);
   

  return (
    <>
    <Router>
{/*<Navbar/>*/}

{/*
{useSelector(state=>state?.users?.userAuth)?<Dashboard/>:<Navbar/>}
{useSelector(state=>state?.users?.userAuth)?<Dashboard/>:<Home/>}*/}
<Routes>
<Route path="/" element={useSelector(state=>state?.users?.userAuth)?<Dashboard/>:<Home/>}/>
  <Route path="/login" element={<Login></Login>}/>
  <Route path="/AddExpense" element={<ProtectedRoute><AddExpense/></ProtectedRoute>}/>
  <Route path="/AddIncome" element={<ProtectedRoute><AddIncome/></ProtectedRoute>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
  <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
  <Route path='/viewexpense' element={<ProtectedRoute><ViewExpense/></ProtectedRoute>}/>
  <Route path='/seeexpense' element={<ProtectedRoute>{Profile && Profile.isAdmin?<ViewExpenseData/>:<ViewExpense/>}</ProtectedRoute>}/>
  <Route path='/seeincome' element={<ProtectedRoute>{Profile && Profile.isAdmin?<ViewAllIncome/>:<ViewIncome/>}</ProtectedRoute>}/>
  <Route path='/report' element={<ProtectedRoute><ContactFrom/></ProtectedRoute>}/>
  <Route path='/admin' element={<ProtectedRoute><AdminDashboard1></AdminDashboard1></ProtectedRoute>}/>
  <Route path='/allexpense' element={<ProtectedRoute><ViewExpenseData/></ProtectedRoute>}/>
  <Route path='/allincome' element={<ProtectedRoute><ViewAllIncome/></ProtectedRoute>}/>
 
</Routes>
    </Router>
   
 
    </>
  )
}

export default App;
