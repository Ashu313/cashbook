import React from "react";
import "./dasboard.css";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);
const Dashboard=()=>{
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
            <img src="./a1.png"></img>
        </div>
    </div>
  
    <div className="sidebar">
        <ul>
        <li><a href="#">
            <i className="fas fa-th-large"
            ></i>Dashboard</a></li>
             <li><a href="#">
            <i className="fas fa-th-large"
            ></i>wallet</a></li>
             <li><a href="#">
            <i className="fas fa-th-large"
            ></i>Report</a></li>
        </ul>
        </div>
        <div className="main">
            <div className="cards">
                <div className="card">
                    <div className="card-content">
                        <div className="number">1000$</div>
                        <div className="card-name">expenses</div>
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
                   <div className="card">
                    <div className="card-content">
                        <div className="number">1000$</div>
                        <div className="card-name">expenses</div>
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
export default Dashboard;