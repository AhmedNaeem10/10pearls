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

function Services() {
  const [services, setServices] = useState([]);
  // const deleteService=()=>{

  // }
  const [click, setClick] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

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

  const getAllServices = async () => {
    try {
      const response = await axios
        .get("https://home-services-backend.azurewebsites.net/getServices")
        .then((response) => {
          console.log(response);
          setServices(response.data);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, [click]);
  return (
    <>
      <div className="servicecontent">
        <h3 style={{ paddingTop: "15px", marginLeft: "300px" }}>SERVICES</h3>
        <br></br>
        <Button variant="outlined" style={{  marginLeft: "300px" }}>
          <Link style={{ textDecoration: "none" }} to={`/admin/addservice`}>
            ADD A NEW SERVICE
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
          className="servicetable"
          style={{ width: "75%", marginLeft: "300px" }}
          component={Paper}
        >
          <Table sx={{ minWidth: 100 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ width: "15%", textAlign: "center" }}>
                  Service title
                </StyledTableCell>
                <StyledTableCell style={{ width: "35%", textAlign: "center" }}>
                  Description
                </StyledTableCell>
                <StyledTableCell style={{ width: "15%", textAlign: "center" }}>
                  Charges
                </StyledTableCell>
                <StyledTableCell style={{ width: "25%", textAlign: "center" }}>
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(services).length === 0 ? (
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
                services
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => {
                  const deleteService = async () => {
                    try {
                      //   let job_id = requests[index].id;

                      let response = await axios.delete(
                        `https://home-services-backend.azurewebsites.net/deleteService/${item.id}`
                      );

                      // alert(response.data.message)
                      setClick(!click);
                    } catch (err) {
                      console.log(err);
                    }
                  };
                  return (
                    <>
                      <StyledTableRow key={item.id}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ width: "15%", textAlign: "center" }}
                        >
                          {item.SERVICE_TITLE}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: "35%", textAlign: "center" }}>
                          {item.SERVICE_DESCRIPTION}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: "15%", textAlign: "center" }}>
                          {item.SERVICE_RATE}
                        </StyledTableCell >
                        <StyledTableCell style={{ width: "25%", textAlign: "center", alignItems: "center"}}>
                        <Button
                          onClick={deleteService}
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                        </StyledTableCell >
                        
                        
                      </StyledTableRow>
                    </>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[6, 10, 25, 50]}
        component="div"
        style={{ width: "75%" }}
        count={services.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </div>
    </>
  );
}

export default Services;
