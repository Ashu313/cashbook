import React, { useEffect, useState } from 'react';
import {  MDBPagination } from 'mdb-react-ui-kit';
import { fetchAllIncome } from '../../redux/slices/income/income';
import { useDispatch,useSelector } from 'react-redux';
import { UserProfile } from '../../redux/slices/users/userslice';

import Pagination from './pagination';

import IncomeTable from './userContent';




const ViewIncome=()=>
 {
  const[page,setPage]=useState(1);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(UserProfile());
  },[dispatch]);

useEffect(()=>{
  dispatch(fetchAllIncome(page))
},[page]);
  const state=useSelector(state=>state?.users);
  const {Profile}=state;
  console.log(state);
  const income=useSelector(state=>state?.income);//store wala
  const {incomeList}=income;
console.log(income);
 
  return (
    <>
    

    <div className="table-content">
      <h1 style={{textDecoration:'none',textAlign:'center'}}> HELLO ! {Profile?.firstname}</h1>
      <p style={{textAlign:'center'}}>This is your incomes</p>
    </div>
    <table class="table" style={{backgroundColor:'black',color:'white'}}>
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Amount</th>
      <th scope="col">Date</th>
      <th scope="col">Edit</th>
      <th scope='col'>delete</th>
    </tr>
  </thead>
  <tbody>
    <>
    {incomeList?.length <= 0 ? (
                      <h2>Noincome Found</h2>
                    ) :
    
      (incomeList?.docs?.map(exp=>(
        <IncomeTable items={exp} key={exp?.id}/>
      ))
    )}
    </>
 
  </tbody>
</table>
<>
{
 incomeList?.docs?.length>1 &&(
    <Pagination
    setPage={setPage}
    items={incomeList?.totalPages}
    page={page}
     />
  )
}
</>
</>
  )
}
export default ViewIncome;