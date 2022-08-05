// import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import "./Dashboard.css";
// import { auth, db, logout } from "../firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";
// function Dashboard() {
//     const [user, loading, error] = useAuthState(auth);
//     const [name, setName] = useState("");
//     const navigate = useNavigate();
//     const fetchUserName = async () => {
//         try {
//             const q = query(collection(db, "users"), where("uid", "==", user?.uid));
//             const doc = await getDocs(q);
//             const data = doc.docs[0].data();
//             setName(data.name);
//         } catch (err) {
//             console.error(err);
//             alert("An error occured while fetching user data");
//         }
//     };
//     useEffect(() => {
//         if (loading) return;
//         if (!user) return navigate("/");
//         fetchUserName();
//     }, [user, loading]);
//     return (
//         <div className="dashboard">
//             <div className="dashboard__container">
//                 Logged in as
//                 <div>{name}</div>
//                 <div>{user?.email}</div>
//                 <button className="dashboard__btn" onClick={logout}>
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
// }
// export default Dashboard;

import React from 'react'
import { useSelector } from 'react-redux'
import classes from './Dashboard.module.css'
export default function Dashboard() {
    const services = useSelector((state) => state.allServices.services)
    console.log(services);
    return (
        services.map((services) => {
            const { id, title } = services;
            return (
                <>
                    <div className={classes['card-container']}>
                        <div className={classes['image-container']}>
                            <img src="" alt={title} />
                        </div>
                        <div>
                            <p className={classes['card-title']}>{title}</p>
                        </div>
                    </div>
                </>
            )
        })
    )
}
