import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function LoginNavBar() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/signin'; // Redirect to the login page
      };
  return (
    <div className="site-header">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="navbar-header">
                        <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#main-menu">
                            <span className="sr-only">Toggle navigation</span>
                            <i className="fa fa-bars"></i>
                        </button>
                        <Link itemProp='url' to="/loginhomepage" className="navbar-brand">Personal Budget</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="main-menu">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link itemProp='url' to="/loginhomepage">Home</Link></li>
                            <li><Link itemProp='url' to="/addbudget">Add Budget</Link></li>
                            <li><Link itemProp='url' to="/viewbudget">View Budget</Link></li>
                            <li><Link itemProp='url' to="/addexpense">Add Expense</Link></li>
                            <li><Link itemProp='url' to="/viewexpense">View Expense</Link></li>
                            <li><button onClick={handleLogout} style={{ padding: '15px', background: 'none', cursor: 'pointer', color: 'white' }}>LOGOUT</button></li>
                        </ul>
                    </div>
                </nav>         
            </div>
        </div>
    </div>
  );
}
export default LoginNavBar;
