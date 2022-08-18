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

function Staff() {
    const [workers, getWorkers] = useState([]);

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

      const getAllWorkers = async() =>{
        try{
          const allWorkers = await axios.get("http://localhost:19720/workers")
          // .then((response) => {
          //   const allServices = response.data;
          //   console.log(response)
            console.log(allWorkers.data.message);
            getWorkers(allWorkers.data.message);
          //   console.log(services);
          // })
          // .catch(error => console.error(error));
          
        }
        catch(error){
          console.log(error);
        }
        }
    useEffect(() => {
            getAllWorkers();
        }, []);
  return (
    <div>
        <Sidebar/>
        <h1>Staff</h1>
        <h6>Add staff</h6>

        <TableContainer className="servicetable" style={{ width: "65%" }} component={Paper}>
      <Table sx={{ minWidth: 100 }}  aria-label="customized table">
        <TableHead>
        <TableRow>
            <StyledTableCell style={{ width: "25%" }}>Worker ID</StyledTableCell>
            <StyledTableCell style={{ width: "25%" }}>Worker Name</StyledTableCell>
            <StyledTableCell style={{ width: "25%" }}>Contact no.</StyledTableCell>
            <StyledTableCell style={{ width: "25%" }} >Services</StyledTableCell>
            <StyledTableCell style={{ width: "25%" }}>Actions</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.map(item => {
      return (
        <>

        <StyledTableRow key = {item.id}>
        <StyledTableCell style={{ width: "25%" }} >{item.id}</StyledTableCell>
        <StyledTableCell component="th" scope="row" style={{ width: "25%" }}>
                {item.FIRST_NAME + " " + item.LAST_NAME}
              </StyledTableCell>
              <StyledTableCell style={{ width: "25%" }} >{item.PHONE}</StyledTableCell>
              <StyledTableCell style={{ width: "25%" }}>{item.SERVICE_RATE}</StyledTableCell>
              <StyledTableCell style={{ width: "25%" }}>Edit details</StyledTableCell>
              
            </StyledTableRow>
        </>
        
      );
    })}
          
            
          
        </TableBody>
      </Table>
    </TableContainer>
    
        </div>
  )
}

export default Staff