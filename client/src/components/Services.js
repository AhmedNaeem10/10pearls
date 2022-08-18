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

function Services() {
    const [services, getServices] = useState([]);

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

    const getAllServices = async () => {
        try {
            const allServices = await axios.get("http://localhost:19720/getServices")
            // .then((response) => {
            //   const allServices = response.data;
            //   console.log(response)
            console.log(allServices);
            getServices(allServices.data);
            //   console.log(services);
            // })
            // .catch(error => console.error(error));

        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllServices();
    }, []);
    return (
        <>
            <Sidebar />
            <div className='servicecontent'>


                <h1>Services</h1>
                <h6>Add a service</h6>

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
                            {services.map(item => {
                                return (
                                    <>

                                        <StyledTableRow key={item.id}>
                                            <StyledTableCell component="th" scope="row" style={{ width: "25%" }}>
                                                {item.SERVICE_TITLE}
                                            </StyledTableCell>
                                            <StyledTableCell style={{ width: "25%" }} >{item.SERVICE_DESCRIPTION}</StyledTableCell>
                                            <StyledTableCell style={{ width: "25%" }}>{item.SERVICE_RATE}</StyledTableCell>
                                            <StyledTableCell style={{ width: "25%" }}>Edit Delete</StyledTableCell>

                                        </StyledTableRow>
                                    </>

                                );
                            })}



                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </>
    )
}

export default Services