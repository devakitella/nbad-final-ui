import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
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
                        <Link itemProp='url' to="/" className="navbar-brand">Personal Budget</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="main-menu">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link itemProp='url' to="/">Home</Link></li>
                            <li><Link itemProp='url' to="/signup">Signup</Link></li>
                            <li><Link itemProp='url' to="/signin">Signin</Link></li>
                        </ul>
                    </div>
                </nav>         
            </div>
        </div>
    </div>
  );
}

export default NavBar;
