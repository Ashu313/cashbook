import React, { useEffect, useState } from 'react';

import { fetchAllIncome } from '../../redux/slices/income/income';
import { useDispatch,useSelector } from 'react-redux';
import { UserProfile } from '../../redux/slices/users/userslice';

import Pagination from './pagination';


import IncomeTable from './userContent';
import AddIncome from '../incomeTable/income';
import { setDarkTheme, setDefaultTheme } from "../../redux/slices/darkmode/darkmode";





const ViewIncome=()=>
 {

  const [showIncomeBox, setShowIncomeBox] = useState(false);
 
  const [filter1,setFilter]=useState("");

  // Function to toggle the state of the Income box
  const toggleIncomeBox = () => {
    
    setShowIncomeBox(!showIncomeBox);
  };
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(UserProfile());
  },[dispatch]);

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
	


  const state=useSelector(state=>state?.users);
  const {Profile}=state;
 
  const income=useSelector(state=>state?.income);//store wala
  const {incomeList}=income;
const[page,setPage]=useState(1);
useEffect(()=>{
  dispatch(fetchAllIncome(page))
},[page]);
 console.log(page);

 const rowsPerPage = 3;

 
 const filteredData =Profile?.incomes.filter(item => {
   const nameMatch = item?.title.toLowerCase().includes(filter1.toLowerCase());
   const emailMatch = item?.description.toLowerCase().includes(filter1.toLowerCase());
   return nameMatch || emailMatch;
 });

 
 const startIndex = (page - 1) * rowsPerPage;
const endIndex = startIndex + rowsPerPage;
const SortedData=filteredData?.sort((a, b) => {
  // Replace 'dateField' with the field name that contains your date data
  return new Date(b?.createdAt) - new Date(a?.createdAt);
});
const currentincomes = SortedData?.slice(startIndex, endIndex);


console.log(filteredData)
const handleFilter = event => {
  
  setFilter(event.target.value);
};
  return (
    <>
    
    <nav>
    <a href='/'><button style={{position:'initial'}}>Dashboard</button></a>
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
                <span className="space">   </span>
                <span>I</span>
                <span>N</span>
                <span>C</span>
                <span>O</span>
               
                <span>M</span>
                <span>E</span>
               

            </h1>

      <h1 style={{textDecoration:'none',textAlign:'center',textTransform:'capitalize'}}> HELLO ! {Profile?.firstname}</h1>
      <p style={{textAlign:'center',fontSize:'20px'}}>Below is the List of all your incomes</p>
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
    {currentincomes?.length <= 0 ? (
                      <h2>Noincome Found</h2>
                    ) :
    
      (currentincomes?.map(exp=>(
        <IncomeTable items={exp} key={exp?.id}/>
      ))
    )}
    </>
 
  </tbody>
</table>
<>
{
 currentincomes?.length>=1 &&(
    <Pagination
    setPage={setPage}
    items={Math.ceil((filteredData?.length)/(3))}
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