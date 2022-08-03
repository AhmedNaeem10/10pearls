import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { auth, logInWithEmailAndPassword as signInWithEmailAndPassword, signInWithGoogle } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import "./UserLogin.css";

function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [autho, setAutho] = useState(
		false || window.localStorage.getItem('auth') === 'true'
	);
	const [token, setToken] = useState('');
    // const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    
    // const login = async() => {
    //     let response = await axios.post("http://localhost:5000/userLogin", {username: email, password});
    //     if(response.data.status == 200){
    //         alert("User logged in successfully!")
    //     }else{
    //         alert(response.data.message)
    //     }
       
    // }

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

    const login = async () => {
		firebase
			.auth()
			.signInWithRedirect(new firebase.auth.EmailAuthProvider())
			.then((userCred) => {
				if (userCred) {
					setAutho(true);
					window.localStorage.setItem('auth', 'true');
				}
			});
        let response = await axios.post("http://localhost:5000/userLogin", {username: email, password}, { headers: {Authorization: 'Bearer ' + token, role:"user" } });
        if(response.data.status == 200){
            alert("User logged in successfully!")
            // navigate("/dashboard");
        }else{
            alert(response.data.message)
        }
	};

    // useEffect(() => {
    //     if (loading) {
    //         // maybe trigger a loading screen
    //         return;
    //     }
    //     if (user) navigate("/dashboard");
    // }, [user, loading]);
    return (
        <div className="login">
            <div className="login__container">
                <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className="login__btn"
                    // onClick={() => signInWithEmailAndPassword(email, password)}
                    onClick={login}
                >
                    Login
                </button>
                <button className="login__btn login__google" onClick={login}>
                    Login with Google
                </button>
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