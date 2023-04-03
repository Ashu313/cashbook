import React from "react";
import { useDispatch } from "react-redux";
import AddExpense from "../expenseTable/expense";
import { fetchAllExpense } from "../../redux/slices/expense/expense";
import { deleteExpenseAction } from "../../redux/slices/expense/expense";

import { useState } from "react";
import { UserProfile } from "../../redux/slices/users/userslice";
const ExpenseTable=({items,toggleIncomeBox})=>{
const dispatch = useDispatch();
const [editingExpense, setEditingExpense] = useState(null);
const [openId, setOpenId] = useState(null);


const handleEdit=(items)=>{
 
 console.log("hh");
  setOpenId(!openId);
  toggleIncomeBox(false);
  setEditingExpense(!editingExpense);
  console.log(items?.id);
}

async function handleDelete(id) {
  
 
  
 dispatch(deleteExpenseAction(id));
 
  dispatch(fetchAllExpense());
 dispatch(UserProfile());
}

   
    return(
        <>
        
       <tr>
      <th scope="row">{items?.title}</th>
      
      <td>{items?.description}</td>
      <td>{items?.amount}</td>
      <td>{items?.createdAt.split("T")[0].split("-").reverse().join("-")} at {items?.createdAt.split("T")[1].substring(0, 5)}</td>

    <td><button class="btn  btn-sm btn-success" onClick={() => handleEdit(items?.id)}>EDIT<i class="bi bi-pencil-square"></i></button></td>
      <td><button class="btn btn-sm btn-danger" onClick={() => handleDelete(items?.id)}>DELETE<i class="bi bi-trash"></i></button></td>
    
    </tr>
    {editingExpense && <AddExpense  items={items} expense={editingExpense} />}
    
      </>
    )
}
export default ExpenseTable; 