import React from "react";
 
import "./home.css";

const Home=()=>{

    return(
        <>
        <section className="homepage">
         <div class="header">
   <img src="https://img.icons8.com/ios/50/000000/speech-bubble-with-dots.png" alt="icons" />
  <img src="../logo.svg"alt="logo"/>

 
 </div>

 <div class="nav-main">
   <div class="item-1">
     <img src="../illustration-mockups.svg" alt="mockups"  />
   </div>
   <div class="item-2">
   
     <h1>Check your Expenses <br/> Increase your savings</h1>
     <p>Expense Tracker is an Web app where user can check and visualise there expenses and incomes in real time.User have multiple option provided for their smooth user Experience</p>
     <a href="/signup"><div class="button" style={{textAlign:'center'}}>
        Register 
     </div>
     </a>
   </div>
 </div>
 <div class="footer">
   <div class="icon">
   <i class="fa-brands fa-facebook"></i>
    
   </div>
   <div class="icon">
   <i class="fa-brands fa-twitter"></i>
   </div>
   <div class="icon">
   <i class="fa-brands fa-instagram"></i>
   </div>
 </div>
        </section>
        </>
    )
}
export default Home;