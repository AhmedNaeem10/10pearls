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
import { Button, TablePagination } from '@mui/material';
import { Oval } from "react-loader-spinner";

function UserRequests(props) {
    const userId = useSelector((state) => state.user.userId)
    const [requests, setRequests] = useState([]);
    const [click, setClick] = useState(true);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);

    const simplify_time = (date_time) => {

        let time = date_time.split("T")
    
        var time_ = new Date(time[0] + " " + time[1]);
    
        let new_time = time_.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    
        return String(new_time);
    
    }
    
    const simplify_date_time = (date_time) => {
    
      try{
    
          let date_ = date_time.split("T")
    
          const date = new Date(date_[0]);
    
          date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    
          let new_date = String(date);
    
          let new_date_splitted = new_date.split("GMT")[0]
    
          let parts = new_date_splitted.split(" ")
    
          let date_time_string = parts[0] + ", " + parts[1] + " " + parts[2] + " " + parts[3] + ", " + simplify_time(date_time)
    
          return date_time_string;
    
      }catch(err){
    
          return date_time;
    
      }
    
    }

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
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };


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
            <h3 style={{textAlign: 'center', paddingTop: "25px"}}>MY REQUESTS</h3>
            <br></br>

            <TableContainer className="servicetable" style={{ width: "85%", marginLeft: "90px" }} component={Paper}>
                <Table style={{ marginLeft: "5px" }} sx={{ minWidth: 200 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {/* <StyledTableCell style={{ width: "15%" }}>ID</StyledTableCell> */}
                            <StyledTableCell style={{ width: "15%", textAlign: "center"  }}>WORKER NAME</StyledTableCell>
                            <StyledTableCell style={{ width: "25%", textAlign: "center"  }}>SERVICE NAME</StyledTableCell>
                            <StyledTableCell style={{ width: "25%", textAlign: "center"  }} >DATE/TIME OF SERVICE</StyledTableCell>
                            <StyledTableCell style={{ width: "35%", textAlign: "center"  }} >ADDRESS</StyledTableCell>
                            <StyledTableCell style={{ width: "15%", textAlign: "center"  }} >STATUS</StyledTableCell>




                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(requests).length === 0 ? (
                            // <div>...Loading</div>
                            <Oval
                height={50}
                width={80}
                color="black"
                wrapperStyle={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                }}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="grey"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
                        ) : (
                            <>
                                {requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((requests) => {
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
                                                <StyledTableCell component="th" scope="row" style={{ width: "15%", textAlign: "center"  }}>
                                                    {WORKER_NAME}
                                                </StyledTableCell>
                                                <StyledTableCell style={{ width: "15%", textAlign: "center"  }} > {SERVICE_NAME}  </StyledTableCell>
                                                <StyledTableCell style={{ width: "25%", textAlign: "center"  }} > {simplify_date_time(DATE_TIME)}  </StyledTableCell>
                                                <StyledTableCell style={{ width: "35%", textAlign: "center"  }}>  {ADDRESS}  </StyledTableCell>
                                                <StyledTableCell style={{ width: "15%", textAlign: "center"  }}>  {JOB_STATUS}  </StyledTableCell>


                                            </StyledTableRow>

                                        </>

                                    )
                                })}
                            </>
                        )}




                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
        rowsPerPageOptions={[7, 10, 25, 50]}
        component="div"
        style={{ width: "75%" }}
        count={requests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />



        </div>
    )
}

export default UserRequests 