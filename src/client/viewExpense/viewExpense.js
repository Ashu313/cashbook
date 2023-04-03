import React, { useEffect, useState } from 'react';
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
 
  const [showExpense,setShowExpense]=useState(false);
   const [filter1,setFilter]=useState("");
  
 
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
  dispatch(EditExpense());
},[dispatch]);
 

  const state=useSelector(state=>state?.users);
  const {Profile}=state;
    useEffect(()=>{
    dispatch(UserProfile());
  },[dispatch]);
  
 
  console.log(Profile?.expenses);
  
  const rowsPerPage = 3;   
 
  const filteredData =Profile?.expenses.filter(item => {
    const nameMatch = item?.title.toLowerCase().includes(filter1.toLowerCase());
    const emailMatch = item?.description.toLowerCase().includes(filter1.toLowerCase());
    return nameMatch || emailMatch;
  });
  console.log(filteredData)

  

  const startIndex = (page-1) * rowsPerPage;
const endIndex = startIndex + rowsPerPage;


const SortedData=filteredData?.sort((a, b) => {
  // Replace 'dateField' with the field name that contains your date data
  return new Date(b?.createdAt) - new Date(a?.createdAt);
});
const currentExpenses = SortedData?.slice(startIndex,endIndex);

const handleFilter = event => {
  
  setFilter(event.target.value);
};
  
  

  return (
    <>
    
   <nav>
    <a href='/'><button>Dashboard</button></a>
     
   </nav>
    <div className="table-content">

    <div className="search">
            <input type="text" placeholder="search here" value={filter1} onChange={handleFilter}></input>
           <label for="search" ><i className="fas fa-search"></i></label>
        </div>
            
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
    {Profile?.expenses?.length <= 0 ? (
                      <h2>No Expense Found</h2>
                    ) :
    
      ( currentExpenses?.map(exp=>(
        <ExpenseTable items={exp} toggleIncomeBox={toggleExpense} key={exp?.id}/>
      ))
    )}
    </>
 
  </tbody>
</table>
<>
{
   currentExpenses?.length>=1 &&(
    <Pagination
    setPage={setPage}
    items={Math.ceil((filteredData?.length)/(3))}
    page={page}
     />
  )
}
</>
</>
  )
}
export default ViewExpense;