import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { auth, logInWithEmailAndPassword as signInWithEmailAndPassword, signInWithGoogle } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
import "./UserLogin.css";
import {
  multiFactor,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
} from "firebase/auth";
function UserLogin() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const notInitialRender = useRef(false)
  const [autho, setAutho] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");
  // const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  // const login = async() => {
  //     let response = await axios.post("http://localhost:19720/userLogin", {username: email, password});
  //     if(response.data.status == 200){
  //         alert("User logged in successfully!")
  //     }else{
  //         alert(response.data.message)
  //     }

  // }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const emailFormat = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    if (!values.email) {
      errors.email = "Email is required!";
    }else if (!emailFormat.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
      if (userCred) {
        setAutho(true);
        window.localStorage.setItem("auth", "true");
        userCred.getIdToken().then((token) => {
          setToken(token);
        });
      }
    });
  }, []);

  const login = async () => {
    setFormErrors(validate(formValues));
    const user = firebase.auth().currentUser;
    console.log(user);

    // log in to firebase account
    firebase
      .auth()
      .signInWithEmailAndPassword(formValues.email, formValues.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(userCredential);
        console.log(user);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    // let response = await axios.post(
    //   "http://localhost:19720/userLogin",
    //   { email: formValues.email, password: formValues.password },
    //   { headers: { Authorization: "Bearer " + token, role: "user" } }
    // );
    // if (response.data.status == 200) {
    //   alert("User logged in successfully!");
    //   console.log(token);
    //   navigate('/');
    //   // navigate("/dashboard");
    // } else {
    //   alert(response.data.message);
    // }

    
  };

  function handleFirebase(){
    // log in to firebase account
    firebase
      .auth()
      .signInWithEmailAndPassword(formValues.email, formValues.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(userCredential);
        console.log(user);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  // useEffect(() => {
  //     if (loading) {
  //         // maybe trigger a loading screen
  //         return;
  //     }
  //     if (user) navigate("/dashboard");
  // }, [user, loading]);
  useEffect(() => {
    if (notInitialRender.current) {
    const checkErrors = async() =>{
      if (Object.keys(formErrors).length === 0) {
        let response = await axios.post("http://localhost:19720/userLogin", { email: formValues.email, password: formValues.password}, { headers: {Authorization: 'Bearer ' + token, role:"user" } });
        if(response.data.status == 200){
          alert("User logged in successfully!");
          handleFirebase();
          navigate('/');
        }else{
            
            alert(response.data.message);
            alert("Couldn't register user!");
        }}
    }
    checkErrors()}
    else
    notInitialRender.current = true;
    console.log(formErrors)
  }, [formErrors]);
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="E-mail Address"
        />
        <div className = "showError">
        <p>{formErrors.email}</p>
        </div>
        <input
          type="password"
          className="login__textBox"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <div className = "showError">
        <p>{formErrors.password}</p>
        </div>
        <button
          className="login__btn"
          // onClick={() => signInWithEmailAndPassword(email, password)}
          onClick={login}
        >
          Login
        </button>
        {/* <button className="login__btn login__google" onClick={login}>
          Login with Google
        </button> */}
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/signup">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default UserLogin;
