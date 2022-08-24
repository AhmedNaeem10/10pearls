import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    let response = await axios.post("https://home-services-new.azurewebsites.net/adminLogin", { username, password });
    if (response.data.status === 200) {
      // alert("Logged in successfully!");
      navigate("../admin/adminpanel", { replace: true });
    } else {
      alert(response.data.message);
    }
  }
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
          placeholder="E-mail Address"
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