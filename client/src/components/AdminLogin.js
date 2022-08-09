import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import firebase from 'firebase/app';
import 'firebase/auth';

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
    let response = await axios.post("http://localhost:5000/adminLogin", { username, password });
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
    // <div className='container' style={{ marginTop: 50 }}>
    //   <div>
    //     <div className="mb-3">
    //       <label for="exampleInputEmail1" className="form-label">Username</label>
    //       <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' value={username} onChange={(e) => setUsername(e.target.value)} />
    //       {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
    //     </div>
    //     <div className="mb-3">
    //       <label for="exampleInputPassword1" className="form-label">Password</label>
    //       <input type="password" className="form-control" id="exampleInputPassword1" placeholder='' value={password} onChange={(e) => setPassword(e.target.value)} />
    //     </div>
    //     <div className="mb-3 form-check">
    //       <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    //       <label className="form-check-label" for="exampleCheck1">Check me out</label>
    //     </div>
    //     <button type="submit" className="btn btn-primary" onClick={login}>Submit</button>
    //   </div>
    // </div>
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
  )
}
