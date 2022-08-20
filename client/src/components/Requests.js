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

function Requests() {
    const [requests, getRequests] = useState([]);

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

      const getAllRequests = async() =>{
        try{
          const allRequests = await axios.get("http://localhost:19720/getRequests")
          // .then((response) => {
          //   const allServices = response.data;
          //   console.log(response)
            console.log(allRequests);
            getRequests(allRequests.data);
          //   console.log(services);
          // })
          // .catch(error => console.error(error));
          
        }
        catch(error){
          console.log(error);
        }
        }

        useEffect(() => {
            getAllRequests();
        }, []);
    
  return (
    <div>
         <Sidebar/>
         <h1>Requests</h1>
         <br></br>

         <TableContainer className="servicetable" style={{ width: "75%" }} component={Paper}>
      <Table sx={{ minWidth: 200 }}  aria-label="customized table">
        <TableHead>
        <TableRow>
            <StyledTableCell style={{ width: "15%" }}>Worker ID</StyledTableCell>
            <StyledTableCell style={{ width: "25%" }}>Customer ID</StyledTableCell>
            <StyledTableCell style={{ width: "25%" }} >Service type</StyledTableCell>
            <StyledTableCell style={{ width: "15%" }} >Time</StyledTableCell>
            <StyledTableCell style={{ width: "35%" }}>Customer address</StyledTableCell>
            <StyledTableCell style={{ width: "25%" }}>Status</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {workers.map(item => { */}
      {/* return ( */}
        <>

        <StyledTableRow >
        <StyledTableCell style={{ width: "15%" }} >   </StyledTableCell>
        <StyledTableCell component="th" scope="row" style={{ width: "25%" }}>
                {/* {item.FIRST_NAME + " " + item.LAST_NAME} */}
              </StyledTableCell>
              <StyledTableCell style={{ width: "25%" }} >   </StyledTableCell>
              <StyledTableCell style={{ width: "15%" }}>    </StyledTableCell>
              <StyledTableCell style={{ width: "35%" }}>Edit details</StyledTableCell>
              <StyledTableCell style={{ width: "25%" }}>Pending</StyledTableCell>
              
            </StyledTableRow>
        </>
        
      {/* ); */}
    
          
            
          
        </TableBody>
      </Table>
    </TableContainer>

         
        </div>
  )
}

export default Requests