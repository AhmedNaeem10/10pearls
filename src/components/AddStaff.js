import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export default function AddStaff() {
    const navigate = useNavigate()
    const [serviceDetails, setServiceDetails] = useState({
        EMAIL: "",
        FIRST_NAME: "",
        LAST_NAME: "",
        DOB: "",
        PHONE: "",
        CNIC: "",
        ADDRESS: "",
    })
    const [formErrors, setFormErrors] = useState({});

    const inputEvent = (e) => {
        const { name, value } = e.target;
        setServiceDetails({ ...serviceDetails, [name]: value });
    };
    const submitService = async (e) => {
        e.preventDefault()
        // setFormErrors(validate(serviceDetails));
        console.log(serviceDetails);
        // if (Object.keys(formErrors).length === 0) {
        let response = await axios.post(
            "https://home-services-new.azurewebsites.net/registerWorker",

            {
                email: serviceDetails.EMAIL,
                first_name: serviceDetails.FIRST_NAME,
                last_name: serviceDetails.LAST_NAME,
                dob: serviceDetails.DOB,
                phone: serviceDetails.PHONE,
                cnic: serviceDetails.CNIC,
                address: serviceDetails.ADDRESS
            }

        );
        if (response.data.status == 200) {
            alert("Worker added successfully!");
            // Navigate("/admin/viewservices");
            navigate("../admin/viewstaff", { replace: true });
        } else {
            alert(response.data.message);
            alert("Couldn't add worker!");
        }
        // }
        // else {
        //     alert({ formErrors })
        // }
    };

    return (
        <>
            <Typography gutterBottom variant="h3" align="center">
                Add Worker Form
            </Typography>
            <Grid>
                <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            Add A New Worker
                        </Typography>
                        <form onSubmit={submitService}>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={6} item>
                                    <TextField name="FIRST_NAME" value={serviceDetails.FIRST_NAME} onChange={inputEvent} label="First Name" variant="outlined" fullWidth required />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField name="LAST_NAME" value={serviceDetails.LAST_NAME} onChange={inputEvent} label="Last name" variant="outlined" fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="EMAIL" value={serviceDetails.EMAIL} onChange={inputEvent} type="email" label="Email" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="DOB" type="date" value={serviceDetails.DOB} onChange={inputEvent} rows={4} variant="outlined" fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="PHONE" type="number" value={serviceDetails.PHONE} onChange={inputEvent} label="Phone Number" rows={4} variant="outlined" fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="CNIC" type="number" value={serviceDetails.CNIC} onChange={inputEvent} label="CNIC" rows={4} variant="outlined" fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="ADDRESS" type="text" multiline value={serviceDetails.ADDRESS} onChange={inputEvent} label="Address" rows={4} variant="outlined" fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                                </Grid>

                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>

        </>
    )
}
