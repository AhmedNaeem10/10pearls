import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle
} from "../firebase";
import firebase from 'firebase/app';
import 'firebase/auth';
import "./UserSignup.css";
// const [user, loading, error] = useAuthState(auth);
 

function UserSignup() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [autho, setAutho] = useState(
		false || window.localStorage.getItem('auth') === 'true'
	);
	const [token, setToken] = useState('');
  // const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const notInitialRender = useRef(false)
  // const register = () => {
  //   if (!name) alert("Please enter name");
  //   registerWithEmailAndPassword(name, email, password);
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    if (notInitialRender.current) {
    console.log(formErrors);
    // if (Object.keys(formErrors).length === 0 ) {
    //   console.log(formValues);
    // }
    const checkErrors = async() =>{
      if (Object.keys(formErrors).length === 0) {
        let response = await axios.post("http://localhost:5000/userRegister", {username: formValues.username, email: formValues.email, password: formValues.password}, { headers: {Authorization: 'Bearer ' + token, role:"user" } });
        if(response.data.status == 200){
          alert("User registered successfully!")
        }else{
            alert(response.data.message);
            alert("Couldn't register user!");
        }}

    }
    checkErrors()}
    else
    notInitialRender.current = true;
    
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const emailFormat = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    const passwordFormat = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (!values.username) {
      errors.username = "Username is required!";
    }else if (values.username.length < 6) {
      errors.username = "Username must be at least 6 characters";
    } else if (values.username.length > 15) {
      errors.username = "Password cannot exceed 15 characters";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailFormat.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (!passwordFormat.test(values.password)) {
      errors.password = "Password must have at least 1 uppercase letter, 1 special character, 1 number and should be at least 8 characters long. ";
    } 
    return errors;
  };

  const signup = async() => {
    firebase.auth().signInWithRedirect(new firebase.auth.EmailAuthProvider())
			.then((userCred) => {
				if (userCred) {
					setAutho(true);
					window.localStorage.setItem('auth', 'true');
				}
			});

    setFormErrors(validate(formValues));
    console.log(formValues)
    // console.log(formErrors);
    // if (Object.keys(formErrors).length === 0) {
    // let response = await axios.post("http://localhost:5000/userRegister", {username: formValues.username, email: formValues.email, password: formValues.password}, { headers: {Authorization: 'Bearer ' + token, role:"user" } });
    // if(response.data.status == 200){
    //   alert("User registered successfully!")
    // }else{
    //     alert(response.data.message);
    //     alert("Couldn't register user!");
    // }}
  }

  useEffect(() => {
		firebase.auth().onAuthStateChanged((userCred) => {
			if (userCred) {
				setAutho(true);
				window.localStorage.setItem('auth', 'true');
				userCred.getIdToken().then((token) => {  
					setToken(token);
				});
			}
		});
	}, []);

  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors]);

  // useEffect(() => {
  //   if (loading) return;
  //   if (user) navigate("/dashboard", { replace: true });
  // }, [user, loading]);
  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <div className = "showError">
        <p>{formErrors.username}</p>
        </div>
        <input
          type="text"
          className="register__textBox"
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
          className="register__textBox"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <div className = "showError">
        <p>{formErrors.password}</p>
        </div>
        {/* <button className="register__btn" onClick={register}> */}
        <button className="register__btn" onClick={signup}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default UserSignup;