import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectedWorker, setWorkers } from '../redux/actions/workerActions'
import '../App.css'
import Navbar from './Navbar'
import axios from 'axios'
import { Button, CardMedia } from '@mui/material'
import { addRequest } from '../redux/actions/requestActions'
export default function Worker() {
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
    //     }
    // ]
    const dispatch = useDispatch()
    const { workerId } = useParams()

    const fetchWorkers = async () => {
        const response = await axios
            .get(`https://home-services-backend.azurewebsites.net/worker/${workerId}`)
            .catch((err) => {
                console.log("Err: ", err);
            });
        // dispatch(setServices(response.data.message));
        console.log(response);
        dispatch(selectedWorker(response.data.message))

    }
    const worker = useSelector((state) => state.worker)
    const { id, FIRST_NAME, LAST_NAME, PHONE, DOB, CNIC, ADDRESS, EMAIL, AVAILABLE } = worker

    // console.log(workers);


    useEffect(() => {
        fetchWorkers()
    }, [workerId])

    const requestHandler = () => {
        dispatch(addRequest({ user: 2, worker: id }))
    }
    const WORKER_IMAGE = '../images/imagecopy.webp'

    return (
        <>

            <div className="ui grid container">
                <div className="ui placeholder segment">
                    <div className="ui two column stackable center aligned grid">
                        <div className="middle aligned row">
                            <div className="column lp">
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={WORKER_IMAGE}
                                    alt={FIRST_NAME}
                                />                            </div>
                            <div className="column rp">
                                <h1>{FIRST_NAME}</h1>
                                <h2>
                                    <a className="ui teal tag label">{PHONE}</a>
                                </h2>
                                <h3 className="ui brown block header">{EMAIL}</h3>
                                <p>{ADDRESS}</p>
                                <Button onClick={requestHandler}>Request</Button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>

    )
}
