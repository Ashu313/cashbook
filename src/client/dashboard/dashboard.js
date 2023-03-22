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
const [profile,setProfile]=useState(false);

const handleClick=()=>{
    setProfile(!profile);
}
console.log(profile);
const dispatch=useDispatch();
useEffect(()=>{
    dispatch(UserProfile()); 
 },[dispatch]);

useEffect(()=>
    {
        dispatch(fetchAllAccount())

},[dispatch])

const state=useSelector(state=>state?.users);
const {Profile}=state;
console.log(Profile);
const account=useSelector(state=>state?.account);
console.log(account);
//console.log(profile);
const totalincome=Profile?.incomes?.reduce((acc,curr)=>{
   
    return acc+Number(curr?.amount)
},0)
const totalExpenses=Profile?.expenses?.reduce((acc,curr)=>{
    return acc+Number(curr?.amount)
},0)
//const account=useSelector(state=>state?.account);
//console.log(account);
console.log({totalExpenses,totalincome})

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
        <div className="logo">
            <h1>expense</h1>
        </div>
        <div className="search">
            <input type="text" placeholder="search here"></input>
            <label for="search"><i className="fas fa-search"></i></label>
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
              <li>
                <a href="/seeexpense">
            <i className="fas fa-th-large"
            ></i>Expense</a></li>
              <li>
              <a href="/seeincome">
            <i className="fas fa-th-large"
            ></i>Income</a></li>
              <li>
                <a href="report">
            <i className="fas fa-th-large"
            ></i>Wallet</a></li>
              
           
            
            
        </ul>
        </div>
        <div className="main">
            <div className="cards">
                <div className="card">
                    <div className="card-content">
                        <div className="number">{totalExpenses}</div>
                        <div className="card-name">expenses</div>
                    
                    </div>
                    <div className="icon-box">
                        <i className="fas fa-user-graduate"></i>
                    </div>
 
                </div>
                   <div className="card">
                    <div className="card-content">
                        <div className="number">{totalincome}</div>
                        <div className="card-name">income</div>
                     
                    </div>
                    <div className="icon-box">
                        <i className="fas fa-user-graduate"></i>
                    </div>
 
                </div>
                   <div className="card">
                    <div className="card-content">
                        <div className="number">{totalExpenses+totalincome}</div>
                        <div className="card-name">TotalPrice</div>
                    </div>
                    <div className="icon-box">
                        <i className="fas fa-user-graduate"></i>
                    </div>
                </div>
                   <div className="card">
                    <div className="card-content">
                        <div className="number">1000$</div>
                        <div className="card-name">expenses</div>
                    </div>
                    <div className="icon-box">
                        <i className="fas fa-user-graduate"></i>
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