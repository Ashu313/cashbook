
import React from "react";
import "./pagination.css";
import { useNavigate } from 'react-router-dom';

const Pagination=({items,setPage,page,limit})=>{
    const history = useNavigate();
  const  handleChange=(val)=>{
   
  
    setPage(val);
    history(`?page=${val}`);
  }
 
  const arr = Array.from(Array(items).keys()) 
  return(
      <>
       <nav aria-label="...">
          <ul className="pagination">
          <li className={`page-item ${page<=1 ? 'disabled' : 'bbay'}`}>
                  <button onClick={() =>handleChange(page - 1)} className="page-link">Previous</button>
              </li>

              {arr?.map(num=>(
              
                  <li key={num} className={`page-item ${num+1 === page ? 'active' : ''}`}>
                      <button onClick={() => handleChange(num+1)} className="page-link" disabled={page===num+1}>{num+1}</button>
                  </li>
              ))}

        

              <li className={`page-item ${page>=items ? 'disabled' : ''}`}>
                  <button onClick={() => handleChange(page + 1)} className="page-link">Next</button>
              </li>
          </ul>
      </nav>
      </>
  )
}

export default Pagination;
