import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Navbar.css';
import { setUser } from '../redux/actions/userActions';
import firebase from "firebase/app";
export default function Navbar() {
    const userId = useSelector((state) => state.user)

    let location = useLocation();

    const signout = () => {
        
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            // dispatch(setUser({}))
            // console.log(userId)
            // console.log(Object.keys(userId).length)
            console.log("Sign-out successful.")
            // navigate("/");
          }).catch((error) => {
            // An error happened.
          });
        
    }

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
                        {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-links">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin" exact>ADMIN</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" exact>USER</NavLink>
                            </li>
                        </ul> */}

                    </div>
                </div>
                {Object.keys(userId).length === 0 && <><Link to="/signup" class="btn btn-primary mx-2">SignUp</Link>
                    <Link to="/login" class="btn btn-primary mx-2">Login</Link></>
                }
                {Object.keys(userId).length != 0 && <><Link to="/viewrequests" class="btn btn-primary mx-2">Requests</Link>
                <Link to="/" onClick={signout} class="btn btn-primary mx-2">Sign out</Link>
                </>
                }


            </nav>
        </div>
    )
}