import { Oval } from  'react-loader-spinner'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import classes from './Dashboard.module.css'
import { removeSelectedServices, setServices } from '../redux/actions/serviceActions';
import { removeAllWorkers, setWorkers } from '../redux/actions/workerActions';
import axios from 'axios';
import Navbar from './Navbar';
import './Workers.css'
import FacebookIcon from '@mui/icons-material/Facebook';
export default function Workers() {

    const dispatch = useDispatch()
    const { serviceId } = useParams()
    const WORKER_IMAGE = '../images/imagecopy.webp'

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
            .get(`https://home-services-backend.azurewebsites.net/workersBasicDetailsBySkill/${serviceId}`)
            .catch((err) => {
                console.log("Err: ", err);
            });
        // dispatch(setServices(response.data.message));
        console.log(response);
        dispatch(setWorkers(response.data.message))

    }
    const workers = useSelector((state) => state.allWorkers.workers)
    // console.log(workers);


    useEffect(() => {
        fetchWorkers()
        return () => {
            dispatch(removeAllWorkers())
        }
    }, [serviceId])
    return (
        <>

            {Object.keys(workers).length === 0 ? (
                // <div>...Loading</div>
                <Oval 
  height={50}
  width={80}
  color="black"
  wrapperStyle={{flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    position: "fixed", top: "50%", left: "50%",}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="grey"
  strokeWidth={2}
  strokeWidthSecondary={2}

/>
            ) : (
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex' }}>




                        {workers.map((workers) => {
                            console.log(workers);
                            const { id, FIRST_NAME, LAST_NAME, PHONE, DOB, CNIC, ADDRESS, EMAIL, AVAILABLE } = workers;
                            return (
                                <Link to={`/services/${serviceId}/${id}`}>
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
                                                        {FIRST_NAME} {LAST_NAME}
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


                </div>
            )}
        </>

    )
}

    // console.log(worker);
    // const fetchWorkers = () => {
    //     dispatch(setServices(response))
    // }
    // const workers = useSelector((state) => state.allServices.services)

    // console.log(workers);
    // useEffect(() => {
    //     fetchWorkers()
    // }, [])


