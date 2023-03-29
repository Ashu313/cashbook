import React, { useEffect } from "react";

import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import Profile from "../container/profileView/profile";
import { useState } from "react";
import AddExpense from "../expenseTable/expense";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAccount } from "../../redux/slices/accountDetail/account";
import { UserProfile } from "../../redux/slices/users/userslice";
import "./AdminDashboard.css"


Chart.register(...registerables);
const AdminDashboard1=()=>{
var data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

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
const [profile,setProfile]=useState(false);

const handleClick=()=>{
    setProfile(!profile);
}
console.log(profile);
const dispatch=useDispatch();
useEffect(()=>
    {
        dispatch(fetchAllAccount())

},[dispatch])
useEffect(()=>{
    dispatch(UserProfile()); 
 },[dispatch]);

const account=useSelector(state=>state?.account);
const {AccountStats}=account;
const expense=AccountStats?.expenseStats
console.log("hd");
const income=AccountStats?.IncomeStats;
console.log(income);


console.log(AccountStats);
    return(
<>
<div className="container-expense">
    <div className="topbar">
        <div className="logo">
            <h1>expense</h1>
        </div>
        <div className="search">
            <input type="text" placeholder="search here"></input>
            <label for="search"><i className="fas fa-search"></i></label>
        </div>
        <div className="user" onClick={handleClick}>
        <i class="fas fa-user" onClick={()=>{
            Profile(true);
           }}></i>
        </div>
        {profile && <Profile setProfile={setProfile}/>}
    </div>
  
    <div className="sidebar">
        <ul>
        <li><a href="/dashboard">
            <i className="fas fa-th-large"
            ></i>Dashboard</a></li>
             <li><a href="wallet">
            <i className="fas fa-th-large"
            ></i>wallet</a></li>
             <li>
                <a href="report">
            <i className="fas fa-th-large"
            ></i>Report</a></li>
              <li >
                <a href="/AddExpense">
            <i className="fas fa-th-large"
            ></i>Addexpense</a>
         
            </li>
              <li>
                <a href="/AddIncome">
            <i className="fas fa-th-large"
            ></i>Add Income</a></li>
             <li>
                <a href="/viewExpense">
            <i className="fas fa-th-large"
            ></i>Add Income</a></li>
            
        </ul>
        </div>
        <div className="main">
            <div className="cards">
                <div className="card">
                    <div className="card-content">
                    {Array.isArray(expense) && expense?.length > 0?
                    <>
                     <p>Average Expense:<span>{expense?.[0]?.averageExp}</span></p>
                     <p>min Expense:<span>{expense?.[0]?.minExp}</span></p>
                     <p>max Expense:<span>{expense?.[0]?.maxExp}</span></p>
                     <p>expenseRecord:<span>{expense?.[0]?.totalRecordExp}</span></p>
                     </>
                    :"emeptu"
}
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
                        <Doughnut
                        data={data}/>
                    </div>
                </div>
                 

            </div>
        </div>
        </div>
 


</>
    )
}
export default AdminDashboard1;