import { async } from "@firebase/util";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import "./UserSignUp.css";
function UserSignup() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const register = async() => {
        let response = await axios.post("http://localhost:4000/userRegister", {username: formValues.username, password: formValues.password, email: formValues.email});
        // console.log(response);
        // if(response.data.status==200)
        alert(response.data.message)
        // else
        // setFormErrors({username: "Username already exists!", email: "", password: ""});

      }


  };

  // const register = () => {
  //   if (!username) alert("Please enter name");
  //   registerWithEmailAndPassword(username, email, password);
  // };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0) {
      console.log(formValues);

      const register = async() => {
        let response = await axios.post("http://localhost:4000/userRegister", {username: formValues.username, password: formValues.password, email: formValues.email});
        // console.log(response);
        // if(response.data.status==200)
        alert(response.data.message)
        // else
        // setFormErrors({username: "Username already exists!", email: "", password: ""});

      }
      register()
    }
    else{
      alert("Couldn't register user!")
    }
  }, [formErrors]);
  

  const signup = async() => {
    setFormValues({ username: formValues.username, email: formValues.email, password: formValues.password })
    setFormErrors(validate(formValues));
    // console.log(formErrors);
  //   if(Object.keys(formErrors).length === 0){
  //   let response = await axios.post("http://localhost:4000/userRegister", {username: formValues.username, password: formValues.password, email: formValues.email});
  //   alert(response.data.message)
  // }
  //   else{
  //     alert("Couldn't register user!")
  //   }
  }
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard", { replace: true });
  }, [user, loading]);


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

  return (
    <div className="backgroundImg">
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          name="username"
          value={formValues.username}
          // onChange={(e) => setUsername(e.target.value)}
          onChange={handleChange}
          placeholder="Username"
        />
        <div className = "showError">
        <p>{formErrors.username}</p>
        </div>
        <input
          type="text"
          name="email"
          className="register__textBox"
          value={formValues.email}
          // onChange={(e) => setEmail(e.target.value)}
          onChange={handleChange}
          placeholder="E-mail Address"
        />
        <div className = "showError">
        <p>{formErrors.email}</p>
        </div>
        
        <input
          type="password"
          name="password"
          className="register__textBox"
          value={formValues.password}
          // onChange={(e) => setPassword(e.target.value)}
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
    </div>
  );
}
export default UserSignup;