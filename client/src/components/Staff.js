import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TablePagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";

function Staff() {
  const [workers, setWorkers] = useState([]);
  // const deleteService=()=>{

  // }
  const [click, setClick] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const getAllWorkers = async () => {
    try {
      const response = await axios
        .get("https://home-services-new.azurewebsites.net/workers")
        .then((response) => {
          console.log(response);
          setWorkers(response.data.message);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllWorkers();
  }, [click]);
  return (
    <>
      <div>
        <h3 style={{ paddingTop: "15px", marginLeft: "300px" }}>WORKERS</h3>
        <Button variant="outlined" style={{  marginLeft: "300px" }}>
          <Link style={{ textDecoration: "none" }} to={`/admin/addstaff`}>
            ADD A NEW WORKER
          </Link>
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
        <TableContainer
          style={{ width: "75%", marginLeft: "300px", textAlign: "center", justifyContent: 'center', alignItems: 'center' }}
          component={Paper}
        >
          <Table sx={{ minWidth: 100 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ width: "25%", textAlign: "center" }}>
                  WORKER NAME
                </StyledTableCell>
                <StyledTableCell style={{ width: "25%", textAlign: "center" }}>
                  EMAIL
                </StyledTableCell>
                <StyledTableCell style={{ width: "25%", textAlign: "center" }}>
                  Date of birth
                </StyledTableCell>
                <StyledTableCell style={{ width: "25%", textAlign: "center" }}>
                  Phone
                </StyledTableCell>
                <StyledTableCell style={{ width: "65%", textAlign: "center" }}>CNIC</StyledTableCell>
                <StyledTableCell style={{ width: "25%", textAlign: "center" }}>
                  ADDRESS
                </StyledTableCell>
                <StyledTableCell style={{ width: "25%", textAlign: "center" }}>
                  RATING
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(workers).length === 0 ? (
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
                workers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => {
                  const {
                    id,
                    EMAIL,
                    FIRST_NAME,
                    LAST_NAME,
                    DOB,
                    PHONE,
                    CNIC,
                    ADDRESS,
                    AVAILABLE,
                    RATING,
                  } = item;
                  const deleteService = async () => {
                    try {
                      //   let job_id = requests[index].id;

                      let response = await axios.delete(
                        `https://home-services-new.azurewebsites.net/deleteService/${item.id}`
                      );

                      // alert(response.data.message)
                      setClick(!click);
                    } catch (err) {
                      console.log(err);
                    }
                  };
                  return (
                    <>
                      <StyledTableRow key={item.id} >
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ width: "25%", textAlign: "center" }}
                        >
                          {FIRST_NAME} {LAST_NAME}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: "25%", textAlign: "center"}}>
                          {EMAIL? EMAIL: 'N/A' }
                        </StyledTableCell>
                        <StyledTableCell style={{ width: "25%", textAlign: "center" }}>
                          {DOB}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: "25%", textAlign: "center" }}>
                          {PHONE}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: "65%", textAlign: "center" }}>
                          {CNIC}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: "25%", textAlign: "center"}}>
                          {ADDRESS}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: "25%", textAlign: "center" }}>
                          {RATING? RATING: 'N/A'}
                        </StyledTableCell>
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
        <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        style={{ width: "75%" }}
        count={workers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </div>
    </>
  );
}

export default Staff;
