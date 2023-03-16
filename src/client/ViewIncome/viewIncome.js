import React, { useEffect, useState } from 'react';
import {  MDBPagination } from 'mdb-react-ui-kit';
import { fetchAllIncome } from '../../redux/slices/income/income';
import { useDispatch,useSelector } from 'react-redux';
import { UserProfile } from '../../redux/slices/users/userslice';

import Pagination from './pagination';
import AddExpense from '../expenseTable/expense';

import IncomeTable from './userContent';
import AddIncome from '../incomeTable/income';




const ViewIncome=()=>
 {

  const [showIncomeBox, setShowIncomeBox] = useState(false);

  // Function to toggle the state of the Income box
  const toggleIncomeBox = () => {
    console.log("bsdk")
    setShowIncomeBox(!showIncomeBox);
  };
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(UserProfile());
  },[dispatch]);


  const state=useSelector(state=>state?.users);
  const {Profile}=state;
  console.log(state);
  const income=useSelector(state=>state?.income);//store wala
  const {incomeList}=income;
console.log(Math.ceil((incomeList?.totalDocs)/(incomeList?.limit)));
const[page,setPage]=useState(1);
useEffect(()=>{
  dispatch(fetchAllIncome(page))
},[page]);
 console.log(page);
  return (
    <>
    
    <nav>
    <a href='/'><button style={{position:'initial'}}>Dashbaord</button></a>
    </nav>
    <div className="table-content">
      <h1 style={{textDecoration:'none',textAlign:'center'}}> HELLO ! {Profile?.firstname}</h1>
      <p style={{textAlign:'center'}}>Below is the List of all your incomes</p>
    </div>
    <AddIncome showIncomeBox={showIncomeBox} toggleIncomeBox={toggleIncomeBox} />
  <button type='button' onClick={toggleIncomeBox}>Add Income</button>

    <table class="table" style={{backgroundColor:'black',color:'white',position:'relative'}}>

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
 incomeList?.docs?.length>=1 &&(
    <Pagination
    setPage={setPage}
    items={ Math.ceil((incomeList?.totalDocs)/(incomeList?.limit))}
    page={page}
    limit={incomeList?.limit}
     />
  )
}
</>
</>
  )
}
export default ViewIncome;