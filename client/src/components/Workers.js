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

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import classes from './Dashboard.module.css'
import { setServices } from '../redux/actions/serviceActions';
export default function Workers() {

    const response = [
        {
            "id": 1,
            "SERVICE_TITLE": "Chef",
            "SERVICE_DESCRIPTION": "This is description",
            "SERVICE_IMAGE": "image/url",
            "SERVICE_RATE": 500
        },
        {
            "id": 2,
            "SERVICE_TITLE": "Maid",
            "SERVICE_DESCRIPTION": "This is description",
            "SERVICE_IMAGE": "image/url",
            "SERVICE_RATE": 500
        }
    ]
    const { service } = useParams();
    console.log(service);
    const fetchServices = () => {
        dispatch(setServices(response))
    }
    const dispatch = useDispatch()
    const services = useSelector((state) => state.allServices.services)

    console.log(services);
    useEffect(() => {
        fetchServices()
    }, [])
    return (
        <div style={{ display: 'flex' }}>




            {services.map((services) => {
                const { id, SERVICE_TITLE, SERVICE_DESCRIPTION, SERVICE_IMAGE, SERVICE_RATE } = services;
                return (
                    <Link to={`/services/${SERVICE_TITLE}`}>
                        <div style={{ margin: '1rem' }}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={SERVICE_IMAGE}
                                        alt={SERVICE_TITLE}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {SERVICE_TITLE}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {SERVICE_DESCRIPTION}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

