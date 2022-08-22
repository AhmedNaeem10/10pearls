import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { reauthenticateWithCredential } from "firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import "./UserSignup.css";
// import { getAuth,  onAuthStateChanged } from "firebase/auth";

function UserSignup() {
  const initialValues = { username: "", email: "", password: "", first_name:"", last_name:"", cnic: "", address: "", phone: "", dob: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [autho, setAutho] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");
  // const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const notInitialRender = useRef(false);
  var getToken = false;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  
  
  const validate = (values) => {
    const errors = {};
    const emailFormat = new RegExp(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );
    const passwordFormat = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const phoneFormat = new RegExp(
      "[0-9]{4}-?[0-9]{7}$"
    )
    const cnicFormat = new RegExp(
      "[0-9]{5}-?[0-9]{7}-?[0-9]{1}$"
    )
    if (!values.username) {
      errors.username = "Username is required!";
    } else if (values.username.length < 6) {
      errors.username = "Username must be at least 6 characters";
    } else if (values.username.length > 15) {
      errors.username = "Username cannot exceed 15 characters";
    } else {
      axios.get("http://localhost:19720/getUsernames").then((res) => {
        console.log(res.data.message);
        var results = res.data.message;
        Object.values(results).forEach((val) => {
          if (values.username === val.USERNAME) {
            errors.username = "Username already exists!";
            document.getElementById('usernameError').innerHTML="Username already exists!";
            // alert("Username already exists!");
            console.log("Username already exists");
          }
        });
      });
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailFormat.test(values.email)) {
      errors.email = "This is not a valid email format!";
    } else {
      axios.get("http://localhost:19720/getEmails").then((res) => {
        console.log(res.data.message);
        var results = res.data.message;
        Object.values(results).forEach((val) => {
          if (values.email === val.EMAIL) {
            console.log("Email is already in use!");
            document.getElementById('emailError').innerHTML="Email is already in use!";
            // alert("Email is already in use!");
            errors.email = "Email is already in use!";
          }
        });
      });
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (!passwordFormat.test(values.password)) {
      errors.password =
        "Password must have at least 1 uppercase letter, 1 special character, 1 number and should be at least 8 characters long. ";
    }
    if (!values.first_name) {
      errors.first_name = "First name is required!";
    } 
    if (!values.phone) {
      errors.phone = "Phone number is required!";
    } else if (!phoneFormat.test(values.phone)) {
      errors.phone =
        "Phone no. format = XXXX-XXXXXXX ";
    }
    if (!values.dob) {
      errors.dob = "Date of birth is required!";
    } 
    if (!values.cnic) {
      errors.cnic = "CNIC is required!";
    } else if (!cnicFormat.test(values.cnic)) {
      errors.cnic =
        "Wrong format!";
    }
    if (!values.address) {
      errors.address = "Address is required!";
    } 
    return errors;
  };

  // after clicking register
  const signup = async () => {
    setFormErrors(validate(formValues));
    console.log(formValues);
    console.log(formErrors);
  };

  const handleFirebase = () => {
    if (Object.keys(formErrors).length === 0) {

      const enterDetails = async() =>{
        let response = await axios.post(
          "http://localhost:19720/userRegister",
          {
            USERNAME: formValues.username,
            EMAIL: formValues.email,
            FIRST_NAME: formValues.first_name,
            LAST_NAME: formValues.last_name,
            PHONE: formValues.phone,
            CNIC: formValues.cnic,
            DOB: formValues.dob,
            ADDRESS: formValues.address
          },
          { headers: { Authorization: "Bearer " + token, role: "user" } }
        );
        if (response.data.status == 200) {
          firebase
        .auth()
        .createUserWithEmailAndPassword(formValues.email, formValues.password)
        .then((userCredential) => {
          // Signed in to the created account
          var user = userCredential.user;
          console.log("User created on firebase");
          console.log(user);

          // reauthenticate into account with the same credentials
          var credential = firebase.auth.EmailAuthProvider.credential(
            formValues.email,
            formValues.password
          );
          user
            .reauthenticateWithCredential(credential)
            .then(() => {
              // User re-authenticated.
              console.log("User reauthenticated");
              // const enterDetails = async() =>{
              //   let response = await axios.post(
              //     "http://localhost:19720/userRegister",
              //     {
              //       USERNAME: formValues.username,
              //       EMAIL: formValues.email,
              //       FIRST_NAME: formValues.first_name,
              //       LAST_NAME: formValues.last_name,
              //       PHONE: formValues.phone,
              //       CNIC: formValues.cnic,
              //       DOB: formValues.dob,
              //       ADDRESS: formValues.address
              //     },
              //     { headers: { Authorization: "Bearer " + token, role: "user" } }
              //   );
              //   if (response.data.status == 200) {


              //     alert("User registered successfully!");
              //     navigate("/");
              //   } else {
              //     alert(response.data.message);
              //     alert("Couldn't register user!");
              //   }
                
              // }
              // enterDetails();
              

            })
            .catch((error) => {
              // An error occurred
              console.log("Error reauthenticating");
              console.log(error);
            });

          // set email on which email has to be sent
          user
            .updateEmail(formValues.email)
            .then(() => {
              // Update successful
              console.log("Email set to ", formValues.email);
            })
            .catch((error) => {
              // An error occurred
              console.log(error);
              console.log("Couldn't update email to ", formValues.email);
            });

          // send email verification
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(() => {
              console.log(user);
              console.log("Verification email sent!");
              // Email verification sent!
              // ...
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          console.log(error);
          alert(error.message);
        });


          alert("User registered successfully!");
          navigate("/");
        } else {
          alert(response.data.message);
          alert("Couldn't register user!");
        }
        
      }
      // firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(formValues.email, formValues.password)
      //   .then((userCredential) => {
      //     // Signed in to the created account
      //     var user = userCredential.user;
      //     console.log("User created on firebase");
      //     console.log(user);

      //     // reauthenticate into account with the same credentials
      //     var credential = firebase.auth.EmailAuthProvider.credential(
      //       formValues.email,
      //       formValues.password
      //     );
      //     user
      //       .reauthenticateWithCredential(credential)
      //       .then(() => {
      //         // User re-authenticated.
      //         console.log("User reauthenticated");
      //         // const enterDetails = async() =>{
      //         //   let response = await axios.post(
      //         //     "http://localhost:19720/userRegister",
      //         //     {
      //         //       USERNAME: formValues.username,
      //         //       EMAIL: formValues.email,
      //         //       FIRST_NAME: formValues.first_name,
      //         //       LAST_NAME: formValues.last_name,
      //         //       PHONE: formValues.phone,
      //         //       CNIC: formValues.cnic,
      //         //       DOB: formValues.dob,
      //         //       ADDRESS: formValues.address
      //         //     },
      //         //     { headers: { Authorization: "Bearer " + token, role: "user" } }
      //         //   );
      //         //   if (response.data.status == 200) {


      //         //     alert("User registered successfully!");
      //         //     navigate("/");
      //         //   } else {
      //         //     alert(response.data.message);
      //         //     alert("Couldn't register user!");
      //         //   }
                
      //         // }
      //         // enterDetails();
              

      //       })
      //       .catch((error) => {
      //         // An error occurred
      //         console.log("Error reauthenticating");
      //         console.log(error);
      //       });

      //     // set email on which email has to be sent
      //     user
      //       .updateEmail(formValues.email)
      //       .then(() => {
      //         // Update successful
      //         console.log("Email set to ", formValues.email);
      //       })
      //       .catch((error) => {
      //         // An error occurred
      //         console.log(error);
      //         console.log("Couldn't update email to ", formValues.email);
      //       });

      //     // send email verification
      //     firebase
      //       .auth()
      //       .currentUser.sendEmailVerification()
      //       .then(() => {
      //         console.log(user);
      //         console.log("Verification email sent!");
      //         // Email verification sent!
      //         // ...
      //       });
      //   })
      //   .catch((error) => {
      //     var errorCode = error.code;
      //     var errorMessage = error.message;
      //     // ..
      //     console.log(error);
      //     alert(error.message);
      //   });

       enterDetails();
  }}



  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
      if (userCred) {
        setAutho(true);
        console.log(userCred);
        window.localStorage.setItem("auth", "true");
        userCred.getIdToken().then((token) => {
          getToken = true;
          setToken(token);
          console.log("Token: ", token);
        });
      }
    });
  }, []);

  useEffect(() => {
     if (notInitialRender.current) {
      const checkErrors = async () => {
        if (Object.keys(formErrors).length === 0) {
          handleFirebase();
          // let response = await axios.post(
          //   "http://localhost:19720/userRegister",
          //   {
          //     username: formValues.username,
          //     email: formValues.email,
          //     first_name: formValues.first_name,
          //     last_name: formValues.last_name,
          //     phone: formValues.phone,
          //     cnic: formValues.cnic,
          //     dob: formValues.dob,
          //     address: formValues.address
          //   },
          //   { headers: { Authorization: "Bearer " + token, role: "user" } }
          // );
          // if (response.data.status == 200) {
          //   alert("User registered successfully!");
          //   handleFirebase();
          //   navigate("/");
          // } else {
          //   alert(response.data.message);
          //   alert("Couldn't register user!");
          // }
        }
      };
      checkErrors();
    } else notInitialRender.current = true;
    console.log(formErrors);
  }, [formErrors]);


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
        <div className="showError" >
          <p id="usernameError">{formErrors.username}</p>
        </div>
        <input
          type="text"
          className="register__textBox"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="E-mail Address"
        />
        <div className="showError">
          <p id="emailError">{formErrors.email}</p>
        </div>
        <input
          type="password"
          className="register__textBox"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <div className="showError">
          <p>{formErrors.password}</p>
        </div>
        <input
          type="text"
          className="register__textBox"
          name="first_name"
          value={formValues.first_name}
          onChange={handleChange}
          placeholder="First name"
        />
        <div className="showError">
          <p>{formErrors.first_name}</p>
        </div>
        <input
          type="text"
          className="register__textBox"
          name="last_name"
          value={formValues.last_name}
          onChange={handleChange}
          placeholder="Last name"
        />
          <input
          type="tel"
          className="register__textBox"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
          placeholder="Phone no."
        />
        <div className="showError">
          <p>{formErrors.phone}</p>
        </div>
        
        <input
          label = "DOB"
          type="date"
          className="register__textBox"
          name="dob"
          value={formValues.dob}
          onChange={handleChange}
          placeholder="Date of birth"
        />
        <div className="showError">
          <p>{formErrors.dob}</p>
        </div>
        <input
          type="text"
          className="register__textBox"
          name="cnic"
          value={formValues.cnic}
          onChange={handleChange}
          placeholder="CNIC"
        />
        <div className="showError">
          <p>{formErrors.cnic}</p>
        </div>
        <input
          type="text"
          className="register__textBox"
          name="address"
          value={formValues.address}
          onChange={handleChange}
          placeholder="Home address"
        />
        <div className="showError">
          <p>{formErrors.address}</p>
        </div>

        {/* <button className="register__btn" onClick={register}> */}
        <button className="register__btn" onClick={signup}>
          Register
        </button>
        
        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default UserSignup;
