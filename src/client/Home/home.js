import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { setDarkTheme, setDefaultTheme } from "../../redux/slices/darkmode/darkmode";
 
import "./home.css";

const Home=()=>{

  const [set,notSet]=useState(false);
  const dispatch=useDispatch();
  const theme1=useSelector(state=>state.theme);
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
    dispatch(darkMode ? setDefaultTheme() : setDarkTheme());
  };
    return(
        <>
        <section className="homepage">
         <div class="header">
   <img src="https://img.icons8.com/ios/50/000000/speech-bubble-with-dots.png" alt="icons" />
  <img src=""alt="logo"/>
  <button onClick={handleThemeClick} style={{background:'none',position: "absolute",right:'0'}}>
   {darkMode?<img src="https://ekeun.csb.app/images/night-mode.png" alt="" />:<img src="https://uploads.codesandbox.io/uploads/user/303cebe2-fbae-436e-9fc6-d422e691821a/rXl8-contrast.png" alt="" />}
  </button>
 
  

 
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