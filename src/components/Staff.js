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
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';


function Staff() {
    const [workers, setWorkers] = useState([]);
    // const deleteService=()=>{

    // }
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

    const getAllWorkers = async () => {
        try {
            const response = await axios.get("https://home-services-new.azurewebsites.net/workers")
                .then((response) => {
                    console.log(response)
                    setWorkers(response.data.message);
                })
                .catch(error => console.error(error));

        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllWorkers();
    }, [click]);
    return (
        <>
            <div className='servicecontent'>


                <h1>Services</h1>
                <Button variant="outlined" >
                    <Link style={{ "textDecoration": "none" }} to={`/admin/addstaff`}>ADD A NEW WORKER</Link>
                </Button>

                {/* {services.map(item => {
      return (
        <>
        <p>{item.SERVICE_TITLE}</p>
        <p>{item.SERVICE_DESCRIPTION}</p>
        <p>{item.SERVICE_CHARGES}</p>
        </>
        
      );
    })} */}
                <TableContainer className="servicetable" style={{ width: "65%" }} component={Paper}>
                    <Table sx={{ minWidth: 100 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{ width: "25%" }}>WORKER NAME</StyledTableCell>
                                <StyledTableCell style={{ width: "25%" }}>EMAIL</StyledTableCell>
                                <StyledTableCell style={{ width: "25%" }} >Date of birth</StyledTableCell>
                                <StyledTableCell style={{ width: "25%" }}>Phone</StyledTableCell>
                                <StyledTableCell style={{ width: "25%" }}>CNIC</StyledTableCell>
                                <StyledTableCell style={{ width: "25%" }}>ADDRESS</StyledTableCell>
                                <StyledTableCell style={{ width: "25%" }}>RATING</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(workers).length === 0 ? (
                                <div>...Loading</div>
                            ) : (

                                workers.map(item => {
                                    const { id, EMAIL, FIRST_NAME, LAST_NAME, DOB, PHONE, CNIC, ADDRESS, AVAILABLE, RATING } = item
                                    const deleteService = async () => {
                                        try {

                                            //   let job_id = requests[index].id;

                                            let response = await axios.delete(`https://home-services-backend.azurewebsites.net/deleteService/${item.id}`)

                                            // alert(response.data.message)
                                            setClick(!click)

                                        } catch (err) {

                                            console.log(err)

                                        }
                                    }
                                    return (
                                        <>

                                            <StyledTableRow key={item.id}>
                                                <StyledTableCell component="th" scope="row" style={{ width: "25%" }}>
                                                    {FIRST_NAME} {LAST_NAME}
                                                </StyledTableCell>
                                                <StyledTableCell style={{ width: "25%" }} >{EMAIL}</StyledTableCell>
                                                <StyledTableCell style={{ width: "25%" }}>{DOB}</StyledTableCell>
                                                <StyledTableCell style={{ width: "25%" }}>{PHONE}</StyledTableCell>
                                                <StyledTableCell style={{ width: "25%" }}>{CNIC}</StyledTableCell>
                                                <StyledTableCell style={{ width: "25%" }}>{ADDRESS}</StyledTableCell>
                                                <StyledTableCell style={{ width: "25%" }}>{RATING}</StyledTableCell>
                                                {/* <Button onClick={deleteService} variant="outlined" startIcon={<DeleteIcon />}>
                                                    Delete
                                                </Button> */}
                                            </StyledTableRow>
                                        </>

                                    );
                                })

                            )}



                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </>
    )
}

export default Staff