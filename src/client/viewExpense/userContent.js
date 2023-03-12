import React from "react";

const ExpenseTable=({items})=>{
    return(
        <>
       <tr>
      <th scope="row"></th>
      <td>{items?.title}</td>
      <td>{items?.description}</td>
      <td>{items?.amount}</td>
    </tr>
    
        </>
    )
}
export default ExpenseTable;