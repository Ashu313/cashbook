import React from "react";
import "./home.css";

const Home=()=>{

    return(
        <>
        <section className='expense-pic'>
        <div className='container-1'>
        <div className='expense-image'>
            <img src="./a1.png"></img>
            
            </div>
            <div className='container-1-text'>
                <div className='image'>
                <img src='https://static.vecteezy.com/system/resources/previews/014/208/066/original/expense-ratio-3d-rendering-isometric-icon-png.png'></img>
                </div>
                <h1>BALANCER</h1>
               <br></br>
                <p>Track your expenses in real time</p>
                <br></br>
                <div className='btn'>
                    <a href="/signup"><button>Check expenses</button></a>
                </div>
            </div>
           
        </div>


</section>
        <section className="home">
            <div className="stock-expense">
            <div className="image">
                <img src="./a2.png"></img>
            </div>
            <div className="text">
                <p1>understand your expenses 
                    <br>
                    </br>through graphs</p1>
            </div>
    </div>
        </section>
        </>
    )
}
export default Home;