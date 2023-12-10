import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import LoginNavBar from '../navbar/navbar-login';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Import jwtDecode
import axios from 'axios';
import RefreshToken from '../signin/refreshtoken';
function UserBudgetsTable() {
  const navigate = useNavigate();
  const [userBudgets, setUserBudgets] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Fetch user budgets when the component mounts
    fetchUserBudgets();
  }, []);

  const fetchUserBudgets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://192.81.209.146:4005/api/userBudgets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserBudgets(data);
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        alert('Token expired or invalid. Please log in again.');
        navigate('/');
      } else {
        console.error('Failed to fetch user budgets:', response.statusText);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBudget = async (budgetId) => {
    const confirmed = window.confirm("Are you sure you want to delete this budget?");

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://192.81.209.146:4005/api/deleteBudget/${budgetId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setUserBudgets(userBudgets.filter(budget => budget.id !== budgetId));
        alert('Budget deleted successfully');
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        alert('Token expired or invalid. Please log in again.');
        navigate('/');
      } else {
        console.error('Failed to delete budget:', response.statusText);
        alert('Failed to delete budget');
      }
    } catch (error) {
      console.error('Error during budget deletion:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <LoginNavBar/>
      <div className="page-h">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3>View Budget</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-2 text-center"></div>
          <div className="col-md-8 text-center">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Budget Amount</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {userBudgets.map((budget) => (
                  <tr key={budget.id}>
                    <td>{budget.category}</td>
                    <td>{budget.budget_amount}</td>
                    <td><button style={{ padding: '15px', background: 'Red', cursor: 'pointer', color: 'White' }} onClick={() => handleDeleteBudget(budget.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default RefreshToken(UserBudgetsTable);
