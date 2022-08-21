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


function Services() {
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
            const response = await axios.get("https://home-services-backend.azurewebsites.net/workers")
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
                    <Link style={{ "textDecoration": "none" }} to={`/addservice`}>ADD A NEW WORKER</Link>
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
                                <StyledTableCell style={{ width: "25%" }}>Service title</StyledTableCell>
                                <StyledTableCell style={{ width: "25%" }}>Description</StyledTableCell>
                                <StyledTableCell style={{ width: "25%" }} >Charges</StyledTableCell>
                                <StyledTableCell style={{ width: "25%" }}>Actions</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(services).length === 0 ? (
                                <div>...Loading</div>
                            ) : (

                                services.map(item => {
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
                                                    {item.SERVICE_TITLE}
                                                </StyledTableCell>
                                                <StyledTableCell style={{ width: "25%" }} >{item.SERVICE_DESCRIPTION}</StyledTableCell>
                                                <StyledTableCell style={{ width: "25%" }}>{item.SERVICE_RATE}</StyledTableCell>
                                                <Button onClick={deleteService} variant="outlined" startIcon={<DeleteIcon />}>
                                                    Delete
                                                </Button>
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

export default Services