import React from "react";
import { useDispatch } from "react-redux";
import { deleteIncomeAction, fetchAllIncome } from "../../redux/slices/income/income";

const IncomeTable=({items})=>{
    const dispatch=useDispatch();
    async function handleDelete(id)
    {
        console.log(items?.id);
        console.log(id);
        await dispatch(deleteIncomeAction(id));
        await dispatch(fetchAllIncome());
    }
    return(
        <>
       <tr>
      <th scope="row">{items?.title}</th>
      
      <td>{items?.description}</td>
      <td>{items?.amount}</td>
      <td>{items?.date.split("T")[0].split("-").reverse().join("-")} at {items?.date.split("T")[1].substring(0, 5)}</td>

      <td><button class="btn  btn-sm btn-success" >EDIT<i class="bi bi-pencil-square"></i></button></td>
      <td><button class="btn btn-sm btn-danger" onClick={()=>handleDelete(items?.id)}>DELETE<i class="bi bi-trash"></i></button></td>
    
    </tr>
    
        </>
    )
}
export default IncomeTable;