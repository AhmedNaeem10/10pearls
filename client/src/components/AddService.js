import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export default function AddService() {
    const navigate = useNavigate()
    const [serviceDetails, setServiceDetails] = useState({
        serviceName: "",
        serviceDescription: "",
        servicecharges: "",
        serviceImage: ""
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
            "https://home-services-backend.azurewebsites.net/addService",

            {
                SERVICE_TITLE: serviceDetails.serviceName,
                SERVICE_DESCRIPTION: serviceDetails.serviceDescription,
                SERVICE_IMAGE: serviceDetails.serviceImage,
                SERVICE_RATE: serviceDetails.servicecharges
            }

        );
        if (response.data.status == 200) {
            alert("Service added successfully!");
            // Navigate("/admin/viewservices");
            navigate("../admin/viewservices", { replace: true });
        } else {
            alert(response.data.message);
            alert("Couldn't add service!");
        }
        // }
        // else {
        //     alert({ formErrors })
        // }
    };

    return (
        <>
            <Typography gutterBottom variant="h3" align="center">
                Add Service Form
            </Typography>
            <Grid>
                <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            Add A New Service
                        </Typography>
                        <form onSubmit={submitService}>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={6} item>
                                    <TextField name="serviceName" value={serviceDetails.serviceName} onChange={inputEvent} placeholder="Enter service name" label="Service Name" variant="outlined" fullWidth required />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField name="serviceDescription" value={serviceDetails.serviceDescription} onChange={inputEvent} placeholder="Enter Some Description of the Service" label="Service Description" variant="outlined" fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="servicecharges" value={serviceDetails.servicecharges} onChange={inputEvent} type="number" placeholder="Enter Servce Charges" label="Service Charges" variant="outlined" fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="serviceImage" value={serviceDetails.serviceImage} onChange={inputEvent} label="Image" multiline rows={4} placeholder="Upload an Image" variant="outlined" fullWidth required />
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
