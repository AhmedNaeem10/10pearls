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

function UserRequests(props) {
    const userId = useSelector((state) => state.user.userId)
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
        setRequests("")
        try {
            const response = await axios.get(`https://home-services-new.azurewebsites.net/getJobsForCustomer/${userId}`)
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
    }, []);

    return (
        // <>hi</>
        <div>
            <h1>Requests</h1>
            <br></br>

            <TableContainer className="servicetable" style={{ width: "75%" }} component={Paper}>
                <Table style={{ marginLeft: "5px" }} sx={{ minWidth: 200 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {/* <StyledTableCell style={{ width: "15%" }}>ID</StyledTableCell> */}
                            <StyledTableCell style={{ width: "25%" }}>Worker Name</StyledTableCell>
                            <StyledTableCell style={{ width: "25%" }}>Service Name</StyledTableCell>
                            <StyledTableCell style={{ width: "15%" }} >DATE/TIME</StyledTableCell>
                            <StyledTableCell style={{ width: "15%" }} >ADDRESS</StyledTableCell>
                            <StyledTableCell style={{ width: "15%" }} >STATUS</StyledTableCell>




                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(requests).length === 0 ? (
                            <div>...Loading</div>
                        ) : (
                            <>
                                {requests.map((requests) => {
                                    const { JOB_ID,
                                        CUSTOMER_NAME,
                                        WORKER_NAME,
                                        SERVICE_NAME,
                                        DATE_TIME,
                                        ADDRESS,
                                        JOB_STATUS } = requests


                                    return (
                                        <>

                                            <StyledTableRow >
                                                {/* <StyledTableCell component="th" scope="row" style={{ width: "25%" }}>
                                                    {CUSTOMER_NAME}
                                                </StyledTableCell> */}
                                                <StyledTableCell component="th" scope="row" style={{ width: "25%" }}>
                                                    {WORKER_NAME}
                                                </StyledTableCell>
                                                <StyledTableCell style={{ width: "15%" }} > {SERVICE_NAME}  </StyledTableCell>
                                                <StyledTableCell style={{ width: "25%" }} > {DATE_TIME}  </StyledTableCell>
                                                <StyledTableCell style={{ width: "15%" }}>  {ADDRESS}  </StyledTableCell>
                                                <StyledTableCell style={{ width: "15%" }}>  {JOB_STATUS}  </StyledTableCell>


                                            </StyledTableRow>

                                        </>

                                    )
                                })}
                            </>
                        )}




                    </TableBody>
                </Table>
            </TableContainer>


        </div>
    )
}

export default UserRequests 