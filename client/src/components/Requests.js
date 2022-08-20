import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from "./Sidebar";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function Requests(props) {
    const [requests, setRequests] = useState([]);
    const [click, setClick] = useState(true);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const dispatch = useDispatch()
    // const requests = useSelector((state) => state.allRequests)


    let allRequests
    const getAllRequests = async () => {
        try {
            const response = await axios.get(`https://home-services-backend.azurewebsites.net/getJobsByStatus/${props.option}`)
                .then((response) => {
                    //   const allServices = response.data;
                    console.log(response)
                    setRequests(response.data.message)
                    // console.log(allRequests);
                    // getRequests(allRequests.data);
                    //   console.log(services);
                })
                .catch(error => console.error(error));

        }
        catch (error) {
            console.log(error);
        }
    }
    // CUSTOMER_ID: 3
    // DATE_TIME: "2022-12-10T15:12:12.000Z"
    // JOB_STATUS: "pending"
    // PAYMENT_METHOD: "COD"
    // SERVICE_DETAIL_ID: 5
    useEffect(() => {
        getAllRequests();
    }, [props.option, click]);

    return (
        <div>
            <h1>Requests</h1>
            <br></br>

            <TableContainer className="servicetable" style={{ width: "75%" }} component={Paper}>
                <Table style={{ marginLeft: "5px" }} sx={{ minWidth: 200 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {/* <StyledTableCell style={{ width: "15%" }}>ID</StyledTableCell> */}
                            <StyledTableCell style={{ width: "35%" }}>Customer ID</StyledTableCell>
                            <StyledTableCell style={{ width: "25%" }}>Worker ID</StyledTableCell>
                            <StyledTableCell style={{ width: "15%" }} >DATE/TIME</StyledTableCell>
                            <StyledTableCell style={{ width: "25%" }}>PAYMENT METHOD</StyledTableCell>
                            {props.option == "pending" &&
                                <StyledTableCell style={{ width: "25%" }}>OPTION</StyledTableCell>
                            }



                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((requests) => {
                            const { id, CUSTOMER_ID,
                                DATE_TIME,
                                JOB_STATUS,
                                PAYMENT_METHOD,
                                SERVICE_DETAIL_ID } = requests
                            const acceptRequest = async (e) => {
                                // console.log(id);

                                try {


                                    let response = await axios.put(`https://home-services-backend.azurewebsites.net/updateJobStatus/${id}/accepted`)

                                    // alert(response.data.message)
                                    setClick(!click)

                                } catch (err) {

                                    console.log(err)

                                }

                            }
                            const rejectRequest = async (e) => {

                                try {

                                    //   let job_id = requests[index].id;

                                    let response = await axios.put(`https://home-services-backend.azurewebsites.net/updateJobStatus/${id}/rejected`)

                                    // alert(response.data.message)
                                    setClick(!click)

                                } catch (err) {

                                    console.log(err)

                                }

                            }

                            return (
                                <>

                                    <StyledTableRow >
                                        <StyledTableCell style={{ width: "15%" }} > {CUSTOMER_ID}  </StyledTableCell>
                                        <StyledTableCell component="th" scope="row" style={{ width: "25%" }}><Link style={{ "textDecoration": "none" }} to={`/workerdetails/${SERVICE_DETAIL_ID}`}>
                                            {SERVICE_DETAIL_ID}
                                        </Link></StyledTableCell>
                                        <StyledTableCell style={{ width: "25%" }} > {DATE_TIME}  </StyledTableCell>
                                        <StyledTableCell style={{ width: "15%" }}>  {PAYMENT_METHOD}  </StyledTableCell>
                                        {props.option == "pending" && <StyledTableCell style={{ width: "25%" }}>
                                            <Button onClick={acceptRequest} style={{ margin: "3px" }} variant="contained" color="success">
                                                ACCEPT
                                            </Button>
                                            <Button onClick={rejectRequest} style={{ margin: "3px" }} variant="outlined" color="error">
                                                REJECT
                                            </Button>
                                        </StyledTableCell>}

                                    </StyledTableRow>
                                </>

                            )
                        })}




                    </TableBody>
                </Table>
            </TableContainer>


        </div>
    )
}

export default Requests 