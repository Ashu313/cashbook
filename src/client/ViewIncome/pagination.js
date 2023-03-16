
import React from "react";
import "./pagination.css";

const Pagination=({items,setPage,page,limit})=>{
  const startIndex = (page - 1) *limit;
  const endIndex = startIndex + limit;
  const arr = Array.from(Array(items).keys()) 
  return(
      <>
       <nav aria-label="...">
          <ul className="pagination">
          <li className={`page-item ${page<=1 ? 'disabled' : 'bbay'}`}>
                  <button onClick={() => setPage(page - 1)} className="page-link">Previous</button>
              </li>

              {arr?.map(num=>(
              
                  <li key={num} className={`page-item ${num+1 === page ? 'active' : ''}`}>
                      <button onClick={() => setPage(num+1)} className="page-link" disabled={page==num+1}>{num+1}</button>
                  </li>
              ))}

        

              <li className={`page-item ${page>=items ? 'disabled' : ''}`}>
                  <button onClick={() => setPage(page + 1)} className="page-link">Next</button>
              </li>
          </ul>
      </nav>
      </>
  )
}

export default Pagination;
