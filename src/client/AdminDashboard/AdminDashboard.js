import React, { useEffect } from "react";
import "./AdminDashboard.css";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
//import Profile from "../container/profileView/profile";
import { useState } from "react";
//import AddExpense from "../expenseTable/expense";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAccount } from "../../redux/slices/accountDetail/account";
import { UserProfile } from "../../redux/slices/users/userslice";
import Profile1 from "../container/profileView/profile";
import { setDarkTheme, setDefaultTheme } from "../../redux/slices/darkmode/darkmode";





Chart.register(...registerables);
const Dashboard=()=>{

const data1 = {
  labels: ['january','february','march','april','may','june','july','august','september','october','november','december'],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const dispatch=useDispatch();
const [profile,setProfile]=useState(false);
const [set,notSet]=useState(false);
const [navbar,setNavbar]=useState(false);
const handleNav=()=>{
  setNavbar(!navbar);
}
const darkMode = useSelector((state) => state.theme.darkmode);
useEffect(() => {
    // Initialize the theme state from local storage, if available
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      dispatch(setDarkTheme());
    } else {
      dispatch(setDefaultTheme());
    }
    notSet(true);
  }, [dispatch]);
  useEffect(() => {
    // Update local storage when theme state changes
    if (set) {
      localStorage.setItem('theme', darkMode ? 'dark' : 'default');
    }
  }, [darkMode, set]); 
  useEffect(() => {
		document.body.classList.toggle('dark-mode', darkMode);
	  }, [darkMode]);  
  const handleThemeClick = () => {
    console.log("ss");
    dispatch(darkMode ? setDefaultTheme() : setDarkTheme());
  };
const handleClick=()=>{
    setProfile(!profile);
}
//console.log(profile);
useEffect(()=>{
    dispatch(UserProfile()); 
 },[dispatch]);

useEffect(()=>
    {
        dispatch(fetchAllAccount())

},[dispatch])
 
	
	
  
const state=useSelector(state=>state?.users);
const {Profile}=state;
//console.log(Profile);
const account=useSelector(state=>state?.account);
const {AccountStats}=account;
const expense=AccountStats?.expenseStats
 const income=AccountStats?.IncomeStats;
console.log(income);
const state1=useSelector(state=>state?.expense)
const{expenseList}=state1;

//console.log(profile);
const totalincome=Profile?.incomes?.reduce((acc,curr)=>{
   
    return acc+Number(curr?.amount)
},0)
const totalExpenses=Profile?.expenses?.reduce((acc,curr)=>{
    return acc+Number(curr?.amount)
},0)
//const account=useSelector(state=>state?.account);
//console.log(account);
///console.log({totalExpenses,totalincome})

var data = {
    labels: [
      'Income',
      'Expenses',
      'totalincome'
      
    ],
    datasets: [{
      label: '# expenses',
      data: [totalExpenses,totalincome,totalincome+totalExpenses],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };



    return(
<>
<div className="container-expense">
    <div className="topbar">
      <div className="menu-icons" onClick={handleNav}>
        {!navbar?<i class="fa-solid fa-bars"></i>:<i class="fa-sharp fa-regular fa-xmark"></i>}
      </div>
        <div className="logo" style={{display:'flex'}}>
            <h1 style={{color:"orange",marginTop:'10px'}}>expense</h1>
        </div>
      
        <div className="flex1">
        <div className="nightmode">
        <button onClick={handleThemeClick} style={{background:'none'}}>
   {darkMode?<i class="fa-solid fa-moon fa-spin-pulse" style={{fontSize:'40px'}}></i>:<i class="fa-solid fa-sun fa-spin-pulse" style={{fontSize:'40px'}}></i>}
  </button>
  </div>
        <div className="user">
        <i class="fa-solid fa-bell"></i>
        </div>
   
        <div className="user" onClick={handleClick}>
        <i class="fas fa-user" onClick={()=>{
            profile(true);
           }}></i>
        </div>
        {profile && <Profile1 setProfile={setProfile}/>}
    </div>
    </div>
    
    <div className={navbar?'sidebar':'sidebar active'}>
        <ul>
        <li><a href="/admin">
            <i className="fas fa-th-large"
            ></i>Dashboard</a></li>
             <li><a href="wallet">
            <i className="fas fa-wallet"
            ></i>wallet</a></li>
             <li>
                <a href="report">
            <i className="fas fa-phone"
            ></i>Report</a></li>
              <li>
                <a href="/allexpense">
              <i class='bx bx-list-ul' ></i>Expense</a></li>
              <li>
              <a href="/allincome">
              <i class='bx bx-list-ul' ></i>Income</a></li>
              <li>
                <a href="report">
            <i className="fas fa-th-large"
            ></i>Wallet</a></li>
              
              <div className="search">
            <input type="text" placeholder="search here"></input>
            <label for="search"><i className="fas fa-search"></i></label>
        </div>
            
            
        </ul>
  
      
        </div>
        <div className="main">
        
            <div class="charts">
                <div className="chart">
                    <h2>Earning expenses</h2>
                    <div>
                          <Line
                          data={data1}/>
                    </div>
                </div>
                  <div className="chart">
                    <h2>Earning expenses</h2>
                    <div>
                        <Doughnut data={data}
                        />
                        
                    </div>
                </div>
                 

            </div>
        </div>
        </div>
 


</>
    )
}
export default Dashboard;