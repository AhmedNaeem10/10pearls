import React, { useState } from 'react'
import Sidebar from "./Sidebar";
import "./Settings.css";
import axios from 'axios';



function Settings  ()  {
    const [username, setUsername] = useState("");
    const [currentpassword, setCurrentpassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [confpassword, setConfpassword] = useState("");

    const checkPassword = async() => {
      if(newpassword!==confpassword){
        alert("Passwords don't match!")
      }
      else{
        let response = await axios.post("http://localhost:19720/adminLogin", { username, password: currentpassword });
        console.log(response)
        if (response.data.status === 200) {
          console.log("Correct admin credentials")
          let update = await axios.post("http://localhost:19720/adminChangePassword", { params: {username, password: newpassword} });
          if(update.data.status === 200){
            console.log(update)
            console.log("Paswword updated successfully")
          }

           
         } else {
      alert("Wrong credentials!");
    }
      }
      


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
          value={currentpassword} onChange={(e) => setCurrentpassword(e.target.value)}
          placeholder="Current password"
        />
        <br>
        </br>
        
        <input
          type="newpassword"
          className="login__textBox"
          value={newpassword} onChange={(e) => setNewpassword(e.target.value)}
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