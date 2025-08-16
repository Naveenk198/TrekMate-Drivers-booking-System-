import { Paper, TextField, Button } from "@mui/material";

import React, { useContext, useState } from "react";
import DriverService from "../Service/DriverService";
import OrderService from "../Service/OrderService";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../Context/UserContext";

const BookingPage = () => {
  let navigate = useNavigate();
  let { drivers } = useContext(userContext);
  let [booking, setbooking] = useState({
    customerId: "",
    driverId: "",
    pickupLocation: "",
    dropLocation: "",
    date: "",
    hours: "",
  });
  const paperStyle = {
    width: "450px",
    margin: "30px auto",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f9f9f9",
    marginTop: "40px",
    paddingTop: "40px",
    paddingLeft: "30px",
    paddingRight: "30px",
  };
  let handlechange = (e) => {
    let { name, value } = e.target;
    setbooking({
      ...booking,
      [name]: value,
    });
  };
  let handlesubmit = () => {
    const allFieldsFilled = Object.values(booking).every(
      (val) => String(val).trim() !== ""
    );
    if (!allFieldsFilled) {
      alert("fill the all field");
    } else {
      OrderService.saveorder(booking)
        .then((res) => {
          setbooking(res.data);
          localStorage.setItem("customerid", booking.customerId);
          alert("booking  completed");
          navigate("/paymentpage");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <Paper elevation={7} style={paperStyle}>
        <TextField
          fullWidth
          label="CustomerId"
          name="customerId"
          style={{ marginBottom: "20px" }}
          onChange={handlechange}
          value={booking.customerId || ""}
        ></TextField>
        <TextField
          fullWidth
          label="DriverId"
          name="driverId"
          style={{ marginBottom: "20px" }}
          onChange={handlechange}
          value={drivers.driverId}
        ></TextField>
        <TextField
          fullWidth
          label="PickupLocation"
          name="pickupLocation"
          style={{ marginBottom: "20px" }}
          onChange={handlechange}
          value={booking.pickupLocation || ""}
        ></TextField>
        <TextField
          fullWidth
          label="DropLocation"
          name="dropLocation"
          style={{ marginBottom: "20px" }}
          onChange={handlechange}
          value={booking.dropLocation || ""}
        ></TextField>
        <TextField
          fullWidth
          label="Date"
          name="date"
          type="date"
          style={{ marginBottom: "20px" }}
          onChange={handlechange}
          value={booking.date || ""}
          InputLabelProps={{
            shrink: true,
          }}
        ></TextField>
        <TextField
          fullWidth
          label="Hours"
          name="hours"
          style={{ marginBottom: "20px" }}
          onChange={handlechange}
          value={booking.hours || ""}
        ></TextField>
        <Button
          variant="contained"
          fullWidth
          style={{ height: "40px" }}
          onClick={handlesubmit}
        >
          BOOK DRIVER
        </Button>
      </Paper>
    </div>
  );
};

export default BookingPage;
