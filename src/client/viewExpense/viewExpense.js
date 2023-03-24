import React, { useEffect, useState } from 'react';
import {  MDBPagination } from 'mdb-react-ui-kit';
import { fetchAllExpense } from '../../redux/slices/expense/expense';
import { useDispatch,useSelector } from 'react-redux';
import { UserProfile } from '../../redux/slices/users/userslice';
import ExpenseTable from './userContent';
import Pagination from './pagination';
import AddExpense from '../expenseTable/expense';
import { EditExpense } from '../../redux/slices/expense/expense';
import "./pagination.css"
import { setDarkTheme, setDefaultTheme } from "../../redux/slices/darkmode/darkmode";




const ViewExpense=()=>
 {
  const[page,setPage]=useState(1);
  const [openId, setOpenId] = useState(null);
  const [showExpense,setShowExpense]=useState(false);
 
  const toggleExpense=()=>{
    setShowExpense(!showExpense)
  }


  const dispatch=useDispatch();
  const val=localStorage.getItem('theme');


	if (val === 'dark') {
		console.log("S");
		dispatch(setDarkTheme());
	  } else {
		dispatch(setDefaultTheme());
	  }
	  useEffect(() => {
		document.body.classList.toggle('dark-mode', val==='dark');
	  }, [val,dispatch]);
	
    useEffect(()=>{
      dispatch(fetchAllExpense(page));
    },[page]);



  useEffect(()=>{
    dispatch(UserProfile());
  },[dispatch]);

 
useEffect(()=>{
  dispatch(EditExpense());
},[dispatch]);
 
 
  const state=useSelector(state=>state?.users);
  const {Profile}=state;
  console.log(state);
  const expense=useSelector(state=>state?.expense);
  const {expenseList}=expense;
  console.log(expense);
  console.log(expenseList?.docs);
  const state1=useSelector(state=>state?.users);
  const{expenseUpdated}=state1;
  console.log(state);
 
  return (
    <>
    
   <nav>
    <a href='/'><button>Dashboard</button></a>
   </nav>
    <div className="table-content">
    <h1 class="heading">
                <span>Y</span>
                <span>O</span>
                <span>U</span>
                <span>R</span>
                <span className="space"></span>
                <span>E</span>
                <span>X</span>
                <span>P</span>
                <span>E</span>
               
                <span>N</span>
                <span>C</span>
                <span>E</span>

            </h1>

      <h1 style={{textDecoration:'none',textAlign:'center',textTransform:'capitalize'}}> HELLO ! {Profile?.firstname}</h1>
      <p style={{textAlign:'center',fontSize:'20px'}}>THIS IS YOUR EXPENSE</p>
    </div>
    <button onClick={toggleExpense} >Add expense</button>
    <AddExpense  showIncomeBox={showExpense} toggleIncomeBox={toggleExpense}/>
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
    {expenseList?.length <= 0 ? (
                      <h2>No Expense Found</h2>
                    ) :
    
      (expenseList?.docs?.map(exp=>(
        <ExpenseTable items={exp} toggleIncomeBox={toggleExpense} key={exp?.id}/>
      ))
    )}
    </>
 
  </tbody>
</table>
<>
{
  expenseList?.docs?.length>=1 &&(
    <Pagination
    setPage={setPage}
    items={ Math.ceil((expenseList?.totalDocs)/(expenseList?.limit))}
    page={page}
     />
  )
}
</>
</>
  )
}
export default ViewExpense;