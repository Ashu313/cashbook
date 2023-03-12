
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import "./dasboard.css";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
const dataGraph=({income,expenses})=>{

    var data = {
        labels: [
          'Income',
          'Expenses',
          
        ],
        datasets: [{
          label: '# expenses',
          data: [20,40],
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
        </>
      )
}
export default dataGraph;