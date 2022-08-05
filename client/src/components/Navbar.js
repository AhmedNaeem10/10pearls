import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navbar.css';
export default function Navbar() {
    let location = useLocation();

    useEffect(() => {
        console.log(location);
    }, [location]);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Home Services</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-links">
                            {/* <li className="nav-item">
                                <NavLink className="nav-link" to="/admin" exact>ADMIN</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signup" exact>USER</NavLink>
                            </li> */}
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" exact>HOME</NavLink>
                            </li>
                        </ul>

                    </div>
                </div>
                {location.pathname != "/admin" && <a href="/signup" class="btn btn-primary mx-2">SignUp</a>}
                <a href="/login" class="btn btn-primary mx-2">Login</a>

            </nav>
        </div>
    )
}
