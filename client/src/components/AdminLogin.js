import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import './Navbar.css';
import { Navigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [autho, setAutho] = useState(
    false || window.localStorage.getItem('auth') === 'true'
);
const [token, setToken] = useState('');
  const login = async () => {
    firebase
            .auth()
            .signInWithRedirect(new firebase.auth.EmailAuthProvider())
            .then((userCred) => {
                if (userCred) {
                    setAutho(true);
                    window.localStorage.setItem('auth', 'true');
                }
            });
    let response = await axios.post("http://localhost:19720/adminLogin", { username, password });
    if (response.data.status === 200) {
      alert("Logged in successfully!");
    } else {
      alert(response.data.message);
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
        if (userCred) {
            setAutho(true);
            window.localStorage.setItem('auth', 'true');
            userCred.getIdToken().then((token) => {
              console.log(token);
                setToken(token);
            });
        }
    });
}, []);

  
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
                          
                            <li className="nav-item">
                                {/* <NavLink className="nav-link" to="/" exact>HOME</NavLink> */}
                            </li>
                        </ul>

                    </div>
                </div>
                {/* {location.pathname != "/admin" && <a href="/signup" class="btn btn-primary mx-2">SignUp</a>}
                <a href="/login" class="btn btn-primary mx-2">Login</a> */}

            </nav>


    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={username} onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          className="login__textBox"
          value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          // onClick={() => signInWithEmailAndPassword(email, password)}
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
    </div>
  )
}
