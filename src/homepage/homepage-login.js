import React from 'react';
import LoginNavBar from '../navbar/navbar-login';
import RefreshToken from '../signin/refreshtoken';
function LoginHomePage() {
  return (
    <>
    <LoginNavBar/>
        <div className="page-h promotion">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h3>Homepage</h3>
                    </div>
                </div>
            </div>
        </div>
        <div className="promotion-s">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="product-left">
                            
                            <div className="product-content">
                                <h3>Financial Mastery</h3>
                                <p>Effortlessly manage finances with our intuitive budget tracker web app. Stay on top of expenses, set goals, and achieve financial success.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="product-right">
                            
                            <div className="product-content">
                                <h3>Budget Brilliance</h3>
                                <p>Empower your financial journey with our intuitive budget tracker web app. Smartly monitor spending, set targets, and thrive in fiscal wellness.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    </>
  );
}

export default RefreshToken(LoginHomePage);
