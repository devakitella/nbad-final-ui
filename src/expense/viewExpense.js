import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoginNavBar from '../navbar/navbar-login';
import { useNavigate } from 'react-router-dom';
import ChartContainer from './charts';  // Adjust the path accordingly
import RefreshToken from '../signin/refreshtoken';
function ViewExpenses() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [serverMessage, setServerMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Fetch expenses from the server
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    return;
                }

                const formattedDate = selectedDate.toISOString().split('T')[0];

                const response = await axios.get(`http://192.81.209.146:4005/api/getExpenses?date=${formattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setExpenses(response.data.expenses);
                } else {
                    setServerMessage('');
                    setErrorMessage(`Failed to fetch expenses: ${response.data.error}`);
                }
            } catch (error) {
                console.error('Error fetching expenses:', error.message);
                if (error.response.status === 401) {
                    localStorage.removeItem('token');
                    alert("Token Expired!! You'll be logged out now.")
                    navigate('/');
                } else if (error.response.status === 500) {
                    setServerMessage('');
                    setErrorMessage(`Failed to fetch expenses: ${error.response.data.error}`);
                } else {
                    setServerMessage('');
                    setErrorMessage(`Failed to fetch expenses: ${error.message}`);
                }
            }
        };

        if (selectedDate) {
            fetchExpenses();
        }
    }, [selectedDate]); // Run the effect when selectedDate changes

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setExpenses([]); // Reset expenses when date changes
    };

    const handleDeleteExpense = async (expenseId) => {
        const confirmed = window.confirm("Are you sure you want to delete this expense?");

        if (!confirmed) {
            return; // Do nothing if the user cancels the deletion
        }

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return;
            }

            const response = await axios.delete(`http://192.81.209.146:4005/api/deleteExpense/${expenseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setExpenses(expenses.filter(expense => expense.id !== expenseId));
                setServerMessage('Expense deleted successfully');
            } else {
                setErrorMessage(`Failed to delete expense: ${response.data.error}`);
            }
        } catch (error) {
            console.error('Error deleting expense:', error.message);
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                alert("Token Expired!! You'll be logged out now.")
                navigate('/');
            } else if (error.response.status === 500) {
                setErrorMessage(`Failed to delete expense: ${error.response.data.error}`);
            } else {
                setErrorMessage(`Failed to delete expense: ${error.message}`);
            }
        }
    };


    return (
        <>
            <LoginNavBar />
            <div className="page-h">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h3>View Expenses</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-5 bg-light">
                <div className="container bg-white">
                    <div className="row">
                        <div className="col-md-12 mb-5">
                            <form className="p-5">
                                <div className="row form-group">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <label className="font-weight-bold" htmlFor="date">Date</label>
                                        <div style={{ width: '100%' }}>
                                            <DatePicker
                                                dateFormat="MMMM yyyy"
                                                showMonthYearPicker
                                                selected={selectedDate}
                                                onChange={(date) => handleDateChange(date)}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                            {serverMessage && (
                                <div className="alert alert-success mt-3">
                                    {serverMessage}
                                </div>
                            )}
                            {/* Display server error message */}
                            {errorMessage && (
                                <div className="alert alert-danger mt-3">
                                    {errorMessage}
                                </div>
                            )}
                            {/* Display expenses conditionally */}
                            {expenses.length > 0 ? (<>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Category</th>
                                            <th>Amount</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expenses.map((expense) => (
                                            <tr key={expense.id}>
                                                <td>{expense.date}</td>
                                                <td>{expense.categoryName}</td>
                                                <td>{expense.amount}</td>
                                                <td><button style={{ padding: '15px', background: 'Red', cursor: 'pointer', color: 'White' }} onClick={() => handleDeleteExpense(expense.id)}>Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <ChartContainer expenses={expenses} />
                            </>
                            ) : (
                                <p>No expenses to display.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RefreshToken(ViewExpenses);
