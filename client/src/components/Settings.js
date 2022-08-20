import React, { useState } from 'react'
import Sidebar from "./Sidebar";
import "./Settings.css";


function Settings() {
    const [username, setUsername] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [confpassword, setConfpassword] = useState("");

    const checkPassword = () => {

    }
    
  return (
    
    <div>
        <Sidebar/>
        <h3>Change password</h3>
        <div className="updatepass">
      <div className="login__container">
      <input
          type="text"
          className="login__textBox"
          value={username} onChange={(e) => setUsername(e.target.value)}
          placeholder="Admin username"
        />
        <input
          type="password"
          className="login__textBox"
          value={username} onChange={(e) => setUsername(e.target.value)}
          placeholder="Current password"
        />
        <br>
        </br>
        
        <input
          type="newpassword"
          className="login__textBox"
          value={newpassword} onChange={(e) => setnewpassword(e.target.value)}
          placeholder="New Password"
        />
        <input
          type="confpassword"
          className="login__textBox"
          value={confpassword} onChange={(e) => setConfpassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <br></br>
        <button
          className="login__btn"
          // onClick={() => signInWithEmailAndPassword(email, password)}
          onClick={checkPassword}
          
        >
          Submit
        </button>
      </div>
    </div>
    
       



        
        </div>
  )
}

export default Settings