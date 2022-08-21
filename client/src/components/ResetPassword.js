import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

function ResetPassword() {
  const resetpass = () => {
    const user = firebase.auth().currentUser;
    console.log(user);
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
  };

  const deleteaccount = () => {
    const user = firebase.auth().currentUser;

    user.delete().then(() => {
        // User deleted.
        console.log("User deleted")
        alert("User deleted")
      })
      .catch((error) => {
        console.log(error)
        // An error ocurred
        // ...
      });
  };

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
