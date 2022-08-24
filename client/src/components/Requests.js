import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TablePagination from '@mui/material/TablePagination';
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Oval } from "react-loader-spinner";

function Requests(props) {
  const [requests, setRequests] = useState([]);
  const [click, setClick] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const dispatch = useDispatch();
  // const requests = useSelector((state) => state.allRequests)

  let allRequests;
  const getAllRequests = async () => {
    setRequests("");
    try {
      const response = await axios
        .get(
          `https://home-services-new.azurewebsites.net/getJobsDetailsByStatus/${props.option}`
        )
        .then((response) => {
          //   const allServices = response.data;
          console.log(response);
          setRequests(response.data.message);
          // getRequests(allRequests.data);
          //   console.log(services);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };
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
      <br></br>
     {/* <Paper> */}
      <TableContainer
        style={{ width: "75%" , marginLeft: "300px" }}
        component={Paper}
      >
        <Table
          style={{ marginLeft: "5px" }}
          sx={{ minWidth: 200 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              {/* <StyledTableCell style={{ width: "15%" }}>ID</StyledTableCell> */}
              <StyledTableCell style={{ width: "15%", textAlign: "center" }}>
                Customer
              </StyledTableCell>
              <StyledTableCell style={{ width: "15%", textAlign: "center" }}>
                Worker 
              </StyledTableCell>
              <StyledTableCell style={{ width: "10%", textAlign: "center" }}>
                Service 
              </StyledTableCell>
              <StyledTableCell style={{ width: "27%", textAlign: "center" }}>
                Date & time of request
              </StyledTableCell>
              <StyledTableCell style={{ width: "27%", textAlign: "center" }}>
                Date & time of service
              </StyledTableCell>
              <StyledTableCell style={{ width: "25%", textAlign: "center" }}>
                Address
              </StyledTableCell>
              {props.option == "pending" && (
                <StyledTableCell style={{ width: "25%", textAlign: "center" }}>
                  Actions
                </StyledTableCell>
              )}
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
              
                {requests.reverse()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((requests) => {
                  const {JOB_ID, CUSTOMER_NAME, WORKER_NAME, SERVICE_NAME, DATE_TIME, DATE_TIME_REQUEST, ADDRESS,JOB_STATUS} = requests;
                  const acceptRequest = async (e) => {
                    // console.log(id);

                    try {
                      let response = await axios.put(
                        `https://home-services-new.azurewebsites.net/updateJobStatus/${JOB_ID}/accepted`
                      );

                      // alert(response.data.message)
                      setClick(!click);
                    } catch (err) {
                      console.log(err);
                    }
                  };
                  const rejectRequest = async (e) => {
                    try {
                      //   let job_id = requests[index].id;

                      let response = await axios.put(
                        `https://home-services-new.azurewebsites.net/updateJobStatus/${JOB_ID}/rejected`
                      );

                      // alert(response.data.message)
                      setClick(!click);
                    } catch (err) {
                      console.log(err);
                    }
                  };

                  return (
                    <>
                      <StyledTableRow >
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ width: "15%", textAlign: "center" }}
                        >
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/admin/workerdetails/${JOB_ID}`}
                          >
                            {CUSTOMER_NAME}
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ width: "15%", textAlign: "center" }}
                        >
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/admin/workerdetails/${JOB_ID}`}
                          >
                            {WORKER_NAME}
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell style={{ width: "10%", textAlign: "center" }}>
                          {" "}
                          {SERVICE_NAME}{" "}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: "27%", textAlign: "center" }}>
                          {" "}
                          {simplify_date_time(DATE_TIME_REQUEST)}{" "}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: "27%", textAlign: "center" }}>
                          {" "}
                          {simplify_date_time(DATE_TIME)}{" "}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: "25%", textAlign: "center" }}>
                          {" "}
                          {ADDRESS}{" "}
                        </StyledTableCell>
                        {props.option == "pending" && (
                          <StyledTableCell style={{ width: "25%", textAlign: "center" }}>
                            <Button
                              onClick={acceptRequest}
                              style={{ margin: "3px" }}
                              variant="contained"
                              color="success"
                            >
                              ACCEPT
                            </Button>
                            <Button
                              onClick={rejectRequest}
                              style={{ margin: "3px" }}
                              variant="outlined"
                              color="error"
                            >
                              REJECT
                            </Button>
                          </StyledTableCell>
                        )}
                      </StyledTableRow>
                    </>
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10, 25, 50]}
        component="div"
        style={{ width: "75%" }}
        count={requests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* </Paper> */}

    </div>
  );
}

export default Requests;
