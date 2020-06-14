import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() { 
        return (
            <nav className="navbar">
                <div className="navbar-nav">
                    <ul>
                        <li className="nav-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/create" className="nav-link">Create Exercise</Link>
                        </li>
                        {/* <li>
                            <Link to="/edit" className="nav-link">Edit Exercise</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Exercises</Link>
                        </li>
                    </ul>
                </div>
       
            </nav>
        );
    }
}
 
export default Navbar;