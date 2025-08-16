import React, { useContext, useEffect } from "react";
import DriverService from "../Service/DriverService";
import userContext from "../Context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import "../index.css";
import { Button, Paper, TextField, Grid, Typography } from "@mui/material";

const ShowAllDrivers = () => {
  let navigate = useNavigate();
  const { drivers = [], setdrivers } = useContext(userContext);
  let { id, customerid } = useParams();
  useEffect(() => {
    DriverService.getavailabledriver()
      .then((res) => {
        console.log(res.data);
        setdrivers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (drivers) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>All Drivers</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1px",
            justifyContent: "space-around",
          }}
        >
          {drivers.map((driver) => (
            <div
              key={id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                width: "300px",
                boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
                background: "#f9f9f9",
                paddingLeft: "40px",
                paddingBottom: "50px",
                display: "grid",
                rowGap: "14 px",
                marginTop: "20px",
                paddingTop: "30px",
              }}
            >
              <h5>ID:{driver.id}</h5>
              <h5>NAME:{driver.fullName}</h5>
              <h5>
                <strong>Age:</strong> {driver.age}
              </h5>
              <h5>
                <strong>Address:</strong> {driver.address}
              </h5>
              <h5>
                <strong>Phone:</strong> {driver.phNo}
              </h5>
              <h5>
                <strong>License:</strong> {driver.licenseNumber}
              </h5>
              <h5>
                <strong>Status:</strong> {driver.status}
              </h5>
              <Button
                variant="contained"
                style={{
                  height: "30px",
                  marginLeft: "40px",
                  marginTop: "20px",
                }}
                onClick={() => {
                  navigate("/bookingpage");
                }}
              >
                BOOK NOW
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <h1>NO Drivers found</h1>;
  }
};

export default ShowAllDrivers;
