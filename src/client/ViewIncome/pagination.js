
import React from "react";
import "./pagination.css";

const Pagination=({items,setPage,page})=>{

  const arr = Array.from(Array(items).keys());
  return(
      <>
       <nav aria-label="...">
          <ul className="pagination">
          <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                  <button onClick={() => setPage(page - 1)} className="page-link">Previous</button>
              </li>

              {arr?.map(num=>(
                  <li key={num} className={`page-item ${num === page ? 'active' : ''}`}>
                      <button onClick={() => setPage(num)} className="page-link">{num + 1}</button>
                  </li>
              ))}

            

              <li className={`page-item ${page === items - 1 ? 'disabled' : ''}`}>
                  <button onClick={() => setPage(page + 1)} className="page-link">Next</button>
              </li>
          </ul>
      </nav>
      </>
  )
}

export default Pagination;
