import logo from './logo.svg';
import './App.css';

import Home from './client/Home/home';
import Login from './client/login/login';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Signup from './client/signup/signup';
import Dashboard from './client/dashboard/dashboard';
import AddExpense from './client/expenseTable/expense';
import AddIncome from './client/incomeTable/income';
import Navbar from './client/container/Navbar/Navbar';
function App() {
  return (
    <>
    <Router>
<Navbar/>
    
<Routes>
<Route path="/" element={<Home></Home>}/>
  <Route path="/login" element={<Login></Login>}/>
  <Route path="/AddExpense" element={<AddExpense/>}/>
  <Route path="/income" element={<AddIncome/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path='/dashboard' element={<Dashboard/>}/>
</Routes>
    </Router>
   
 
    </>
  )
}

export default App;
