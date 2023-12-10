import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './css/bootstrap.min.css'
import './css/font-awesome.min.css'
import './css/normalize.min.css'
import './css/templatemo-style.css'

import NavBar from './navbar/navbar';
import HomePage from './homepage/homepage';
import SignUp from './signup/signup'
import SignIn from './signin/signin';
import AddBudget from './budget/addbudget';
import UserBudgetsTable from './budget/viewbudget';
import LoginHomePage from './homepage/homepage-login';
import AddExpenses from './expense/addExpense';
import ViewExpenses from './expense/viewExpense';
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loginhomepage" element={<LoginHomePage />} />
          <Route path="/viewbudget" element={<UserBudgetsTable />} />
          <Route path="/addexpense" element={<AddExpenses />} />
          <Route path="/viewexpense" element={<ViewExpenses />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/addbudget" element={<AddBudget />} />
        </Routes>
    </Router>
  );
}

export default App;
