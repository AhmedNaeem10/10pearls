import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { removeSelectedWorker, selectedWorker, setWorkers } from '../redux/actions/workerActions'
import '../App.css'
import Navbar from './Navbar'
import axios from 'axios'
import { Button, CardMedia, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { addRequest } from '../redux/actions/requestActions'
export default function RequestWorker() {
    const navigate = useNavigate()
    const userId = useSelector((state) => state.user.userId)

    const WORKER_IMAGE = '../images/imagecopy.webp'
    const [serviceDetails, setServiceDetails] = useState({
        time: "",
        address: ""
    })

    const inputEvent = (e) => {
        const { name, value } = e.target;
        setServiceDetails({ ...serviceDetails, [name]: value });
    };
    const slots = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7]
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
    const { workerId, serviceId } = useParams()

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
        return () => {
            dispatch(removeSelectedWorker())
        }
    }, [workerId])

    const submitService = async (e) => {
        e.preventDefault()
        // setFormErrors(validate(serviceDetails));
        console.log(serviceDetails);
        // if (Object.keys(formErrors).length === 0) {
        let response = await axios.post(
            "https://home-services-backend.azurewebsites.net/request",

            {
                CUSTOMER_ID: userId,
                SERVICE_ID: serviceId,
                WORKER_ID: workerId,
                DATE_TIME: String(serviceDetails.time) + ":00",
                ADDRESS: serviceDetails.address
            }

        );
        console.log(userId,
            serviceId,
            workerId,
            String(serviceDetails.time) + ":00",
            serviceDetails.address);
        if (response.data.status == 200) {
            alert("request submitted successfully!");
            // Navigate("/viewservices");
            navigate("../", { replace: true });
        } else {
            alert(response.data.message);
            alert("Couldn't add request!");
        }
        // }
        // else {
        //     alert({ formErrors })
        // }
    };



    return (
        <>
            {Object.keys(worker).length === 0 ? (
                <div>...Loading</div>
            ) : (

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
                                    <form onSubmit={submitService}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Time</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={serviceDetails.time}
                                                label="Time"
                                                onChange={inputEvent}
                                                name="time"
                                            >
                                                {slots.map((slot) =>
                                                    <MenuItem value={slot}>{slot} : 00</MenuItem>
                                                )}


                                            </Select>

                                            <TextField name="address" type="text" multiline value={serviceDetails.address} onChange={inputEvent} label="Address" rows={4} variant="outlined" fullWidth required />

                                        </FormControl>
                                        <Button type='submit'>Request</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            )}
        </>

    )
}
