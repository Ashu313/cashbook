
import react from 'react';
import "./navbar.css";

const Navbar=()=>{

    return(
  <>
        <div className='navbar-container'>
            <div className="menu-icons">
          {  /*    <img src='https://static.vecteezy.com/system/resources/previews/014/208/066/original/expense-ratio-3d-rendering-isometric-icon-png.png' alt="icons"></img>*/}
          <span style={{'color':'orange'}}>Expense Tracker</span>
            </div>
            <div className='content1'>
                <ul className='content-data'>
                    <li>Blog</li>
                    <li>content</li>
                    <li>features</li>
                  

                </ul>
            </div>
            </div>
          
    </>

    
    )
}
export default Navbar;