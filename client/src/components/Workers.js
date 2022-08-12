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
import { setWorkers } from '../redux/actions/workerActions';
import axios from 'axios';
import Navbar from './Navbar';
export default function Workers() {

    const dispatch = useDispatch()
    const { serviceId } = useParams()


    // const response = [
    //     {
    //         "WORKER_ID": 1,
    //         "FIRST_NAME": "noieji",
    //         "LAST_NAME": "irnvoervno",
    //         "PHONE": "033323432134",
    //         "DOB": "13-23-9000",
    //         "CNIC": "42324423224314",
    //         "WORKER_IMAGE": "ornognrogir",
    //         "ADDRESS": "fiuehroiferire",
    //         "EMAIL": "jhnrhueie@gmail.com",
    //         "AVAILABLE": true
    //     },
    //     {
    //         "WORKER_ID": 2,
    //         "FIRST_NAME": "noiejitsbsb",
    //         "LAST_NAME": "irnvoervnosrgsrg",
    //         "PHONE": "031233413434",
    //         "DOB": "12-23-4332",
    //         "CNIC": "42313223224314",
    //         "WORKER_IMAGE": '../images/image.webp',
    //         "ADDRESS": "fiuehroiferireregerg",
    //         "EMAIL": "rferr44r@gmail.com",
    //         "AVAILABLE": false
    //     }
    // ]
    const fetchWorkers = async () => {
        const response = await axios
            .get(`https://murmuring-crag-65083.herokuapp.com/workersBySkill/${serviceId}`)
            .catch((err) => {
                console.log("Err: ", err);
            });
        // dispatch(setServices(response.data));
        console.log(response.data);
        dispatch(setWorkers([response.data.message[`${parseInt(serviceId) - 1}`].WORKER]))

    }
    const workers = useSelector((state) => state.allWorkers.workers)
    console.log(workers);


    useEffect(() => {
        fetchWorkers()
    }, [])
    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }}>




                {workers.map((workers) => {
                    const { WORKER_ID, FIRST_NAME, LAST_NAME, PHONE, DOB, CNIC, WORKER_IMAGE, ADDRESS, EMAIL, AVAILABLE } = workers;
                    return (
                        <Link to={`/services/${serviceId}/${WORKER_ID}`}>
                            <div style={{ margin: '1rem' }}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={WORKER_IMAGE}
                                            alt={FIRST_NAME}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {FIRST_NAME}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {AVAILABLE}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )

    // console.log(worker);
    // const fetchWorkers = () => {
    //     dispatch(setServices(response))
    // }
    // const workers = useSelector((state) => state.allServices.services)

    // console.log(workers);
    // useEffect(() => {
    //     fetchWorkers()
    // }, [])
}

