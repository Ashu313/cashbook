import React, { useEffect } from "react";
import "./dasboard.css";
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
import { ColorRing } from 'react-loader-spinner';





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
const {Profile,Loading}=state;
//console.log(Profile);
const account=useSelector(state=>state?.account);
const {AccountStats}=account;
const expense=AccountStats?.expenseStats
 const income=AccountStats?.IncomeStats;
console.log(income);

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
        <li><a href={Profile?.isAdmin===true?"admin":"/"}>
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
              <a href={Profile?.isAdmin===true?"allexpense":"seeexpense"}>
              <i class='bx bx-list-ul' ></i>Expense</a></li>
              <li>
            
              <a href={Profile?.isAdmin===true?"allincome":"seeincome"}>
              <i class='bx bx-list-ul' ></i>Income</a></li>
              <li>
                <a href="report">
            <i className="fas fa-th-large"
            ></i>Wallet</a></li>
          
            
            
        </ul>
  
      
        </div>
        {Loading?
				<>
				<div className='svg-cont' style={{textAlign:'center' ,marginTop:'20%', bottom:'50%',top:'50%'}}>
		<ColorRing
  visible={true}
  height="200"
  width="200"
  JustifyContent='center'
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
</div>

</>
:
<>
        <div className="main">
        {Profile?.isAdmin?
        <>        <div className="cards">
                <div className="card">
                    <div className="card-content">

                    <>
                     <p>Average Expense:<span>{expense?.[0]?.averageExp}</span></p>
                     <p>min Expense:<span>{expense?.[0]?.minExp}</span></p>
                     <p>max Expense:<span>{expense?.[0]?.maxExp}</span></p>
                     <p>expenseRecord:<span>{expense?.[0]?.totalRecordExp}</span></p>
                     </>
                

</div>
                   
                    <button type="button" >View Expense</button>
                </div>
                  
            
                   <div className="card">
                    <div className="card-content">
                    <p>Average income:<span>{income?.[0]?.averageinc}</span></p>
                     <p>min income:<span>{income?.[0]?.mininc}</span></p>
                     <p>max income:<span>{income?.[0]?.maxinc}</span></p>
                     <p>incomeRecord:<span>{income?.[0]?.totalRecordinc}</span></p>
                    </div>
                  
                </div>
            </div>
            </>
            :
            <>
            <div className="cards">
                <div className="card">
                    <div className="card-content">
                        <div className="number">{totalExpenses}</div>
                        <div className="card-name">Expenses</div>
                    
                    </div>
                    <div className="icon-box">
                    <i class='bx bx-cart-alt cart'></i>
                    </div>
 
                </div>
                   <div className="card">
                    <div className="card-content">
                        <div className="number">{totalincome}</div>
                        <div className="card-name">Income</div> 
                       
                     
                    </div>
                    <div className="icon-box">
                    <i class='bx bx-cart-alt cart'></i>
                    </div>
 
                </div>
                   <div className="card">
                    <div className="card-content">
                        <div className="number">{totalExpenses+totalincome}</div>
                        <div className="card-name">TotalPrice        
  </div>
                    </div>
                    <div className="icon-box">
                    <i class='bx bx-cart-alt cart'></i>
                    </div>
                </div>
                   <div className="card">
                    <div className="card-content">
                        <div className="number">1000$</div>
                        <div className="card-name">Expenses</div>
                    </div>
                    <div className="icon-box">
                    <i class='bx bx-cart-alt cart'></i>
                    </div>
                </div>
                
        
            </div>
            </>
}
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
      </>}
        </div>


</>
    )
}
export default Dashboard;