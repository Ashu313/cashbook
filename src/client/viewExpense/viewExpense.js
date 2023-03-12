import React, { useEffect, useState } from 'react';
import {  MDBPagination } from 'mdb-react-ui-kit';
import { fetchAllExpense } from '../../redux/slices/expense/expense';
import { useDispatch,useSelector } from 'react-redux';
import { UserProfile } from '../../redux/slices/users/userslice';
import ExpenseTable from './userContent';




const ViewExpense=()=>
 {
  const[page,setPage]=useState(1);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(UserProfile());
  },[dispatch]);

  const state=useSelector(state=>state?.users);
  const {Profile}=state;
  console.log(state);
  return (
    <>
    {Profile?.expenses?.length<=0?
    (
    <h2>no Expense Found</h2>
    ):(
     Profile?.expenses?.map(exp=><h1>{exp?.title}</h1>)
    )
  }
    <div className="table-content">
      <h1>All Expense List</h1>
    </div>
    <table class="table" style={{backgroundColor:'white'}}>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>
    <>
    {
      Profile?.expenses?.map(exp=>(
        <ExpenseTable items={exp} key={exp?.id}/>
      ))
    }
    </>
 
  </tbody>
</table>
    <nav aria-label="...">
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item active" aria-current="page">
      <a class="page-link" href="#">2</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
</>
  )
}
export default ViewExpense;