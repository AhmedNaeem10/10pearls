import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";

function ResetPassword() {
  const resetpass = () => {
    const user = firebase.auth().currentUser;
    console.log(user);
    if(user==null){
        alert("Login required!");
    }
    const email = user.email;
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log("Password reset email sent!");
        alert("Reset password email sent!");
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        
        console.log(error);
      });
  }

  const deleteaccount = async() => {
    const user = firebase.auth().currentUser;
    if(user==null){
      alert("Login required!");
  }
  const email = user.email;
  console.log(email);

  const remove = async() =>{
    let response =  await axios.delete("http://localhost:19720/deleteUser/{email}");
    if(response.status === 200){
      console.log("User deleted successfully")
    }
    console.log(response);
  }


    user.delete().then(async() => {
        // User deleted.

      //  let response =  await axios.delete("/deleteUser/{email}", {email});
        remove();
       console.log("Firebase user deleted");
      })
      .catch((error) => {
        console.log(error)
        // An error ocurred
        // ...
      });
  }

  return (
    <>
       <br></br>
      <button className="register__btn" onClick={resetpass}>
        Reset Password
      </button>
      <br></br>
      <button className="register__btn" onClick={deleteaccount}>
        Delete account
      </button>
    </>
  );
}

export default ResetPassword;
