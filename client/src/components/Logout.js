import React from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useSelector } from 'react-redux';


function Logout() {
   const userId = useSelector((state) => state.user);
    const navigate = useNavigate();
    const signout = () => {
        
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log("Sign-out successful.")
            navigate("/")
          }).catch((error) => {
            // An error happened.
          });
        
    }
    
    
    
  return (
    <div>
        {signout}
        <Dashboard />
    </div>
  )
}

export default Logout