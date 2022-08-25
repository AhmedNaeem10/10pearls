import React, { useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { setServices } from "../redux/actions/serviceActions";
import axios from "axios";
export default function Dashboard() {
  const SERVICE_IMAGE = "../images/image.webp";
  const userId = useSelector((state) => state.user);
  // const response = [
  //     {
  //         "id": 1,
  //         "SERVICE_TITLE": "Chef",
  //         "SERVICE_DESCRIPTION": "This is description",
  //         "SERVICE_IMAGE": "image/url",
  //         "SERVICE_RATE": 500
  //     },
  //     {
  //         "id": 2,
  //         "SERVICE_TITLE": "Maid",
  //         "SERVICE_DESCRIPTION": "This is description",
  //         "SERVICE_IMAGE": "image/url",
  //         "SERVICE_RATE": 500
  //     }
  // ]
  const fetchServices = async () => {
    const response = await axios
      .get(`https://home-services-new.azurewebsites.net/getServices`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    response.data["SERVICE_IMAGE"] = "../images/image.webp";
    dispatch(setServices(response.data));
  };

  const dispatch = useDispatch();
  const services = useSelector((state) => state.allServices.services);

  console.log(services);
  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <>
      {/* <Navbar /> */}
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
        <div style={{ display: "flex" }}>
          {services.map((services) => {
            const { id, SERVICE_TITLE, SERVICE_DESCRIPTION, SERVICE_RATE } =
              services;
            let link = `/services/${id}`;
            if (Object.keys(userId).length === 0) {
              link = `/login`;
            }
            return (
              <Link to={link}>
                <div style={{ margin: "1rem" }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={SERVICE_IMAGE}
                        alt={SERVICE_TITLE}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {SERVICE_TITLE}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {SERVICE_DESCRIPTION}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
